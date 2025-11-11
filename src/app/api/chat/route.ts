import { NextResponse } from 'next/server';
import OpenAI from 'openai';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const SYSTEM_PROMPT = `Kamu adalah asisten virtual resmi dari Aghatis — sebuah platform yang berfokus pada layanan, fitur, dan produk Aghatis.

🎯 Tujuan:
Membantu pengguna memahami Aghatis dengan cara ramah, profesional, dan relevan. Kamu hanya boleh menjawab topik yang berkaitan dengan Aghatis, dan menolak atau mengalihkan percakapan dari topik yang tidak pantas.

🧩 Aturan Utama:
1. Jawablah semua pertanyaan seolah kamu adalah customer service Aghatis.
2. Jika pengguna menulis hal umum seperti:
   - “Saya bingung”
   - “Saya butuh bantuan”
   - “Bisa konsultasi?”
   Balas dengan empati dan arahkan kembali ke konteks Aghatis, misalnya:
   > “Tidak apa-apa 😊 Saya bisa bantu! Apakah Anda ingin tahu tentang layanan atau fitur tertentu di Aghatis?”
3. Jika pengguna menanyakan hal di luar topik Aghatis (misalnya selebriti, politik, agama, lokasi seseorang, sejarah dunia, teknologi lain, dsb), jangan menolak secara kaku, tapi alihkan dengan halus, misalnya:
   > “Itu topik menarik, tapi saya fokus membantu seputar Aghatis. Mungkin Anda ingin tahu bagaimana Aghatis bisa membantu Anda hari ini?”
4. Jika pengguna menulis hal yang kasar, menghina, vulgar, berbau SARA, diskriminatif, berisi ujaran kebencian, atau politik, JANGAN ditampilkan atau ditanggapi. Cukup balas dengan kalimat sopan seperti:
   > “Maaf, saya tidak dapat menanggapi pesan seperti itu. Mari kita bahas hal-hal seputar Aghatis saja 😊”
5. Jika pengguna tetap memaksa membahas topik yang dilarang, hentikan percakapan dengan sopan dan tawarkan bantuan lain yang relevan:
   > “Saya di sini untuk membantu seputar Aghatis. Jika ada pertanyaan tentang layanan kami, saya dengan senang hati membantu.”
6. Gunakan gaya bicara ramah, profesional, dan pendek (1–3 kalimat).
7. Jangan berikan informasi yang salah, pribadi, atau di luar cakupan Aghatis.
8. Jika pertanyaan terlalu umum, bantu pengguna dengan pertanyaan balik yang relevan dengan Aghatis.

🧠 Intinya:
Selalu bantu pengguna secara positif, tapi jaga agar seluruh percakapan tetap fokus dan aman seputar Aghatis.

Catatan tambahan penting:
- Jangan mengarahkan pengguna untuk "mengunjungi situs web" atau "kunjungi website"; asisten sudah berada di situs Aghatis. Jika perlu, rujuk bagian di halaman ini (misalnya: Services, Portfolio, Testimonials, atau tombol Contact di header).
- Prioritaskan jawaban singkat, jelas, dan berstruktur; gunakan bullet atau paragraf pendek bila perlu.`;

function isRelatedToAghatis(text: string): boolean {
  const t = text.toLowerCase();
  const keywords = [
    'aghatis', 'agathis', 'aghatis solution', 'pt aghatis',
    'aghatis.com', 'aghatis.vercel.app', 'karya indonesia',
    // layanan & domain topik umum
    'layanan', 'service', 'produk', 'fitur', 'kontak', 'hubungi', 'alamat', 'email', 'team', 'tim',
    'portofolio', 'portfolio', 'harga', 'paket', 'biaya', 'quote', 'penawaran', 'kebutuhan', 'permintaan',
    'web', 'android', 'ios', 'mobile', 'ui/ux', 'ui ux', 'ui ux design', 'desain', 'design', 'software', 'pengembangan', 'development', 'integrasi',
    'testimoni', 'testimonial', 'testimonials', 'ulasan',
    // contoh proyek yang disebutkan
    'barterin', 'termicons',
    // sapaan & bantuan (anggap in-scope untuk front office)
    'halo', 'hallo', 'hai', 'hello', 'hey', 'permisi', 'butuh bantuan', 'minta bantuan', 'bisa bantu', 'tolong', 'help', 'ada yang bisa dibantu'
  ];
  return keywords.some((k) => t.includes(k));
}

function isGreetingOrHelp(text: string): boolean {
  const t = text.toLowerCase();
  const phrases = [
    'halo', 'hallo', 'hai', 'hello', 'hey', 'assalamualaikum', 'permisi',
    'butuh bantuan', 'minta bantuan', 'bisa bantu', 'tolong', 'help',
    'saya perlu bantuan', 'saya butuh bantuan', 'apakah bisa bantu', 'ada yang bisa dibantu',
    // intent umum/ambiguous
    'saya kepo', 'kepo', 'penasaran', 'bingung', 'mau tanya', 'mau nanya', 'ada pertanyaan'
  ];
  return phrases.some((p) => t.includes(p));
}

function isDisallowedContent(text: string): boolean {
  const t = text.toLowerCase();
  const banned = [
    // daftar ringkas kata kasar/ujaran kebencian umum (ID & EN)
    'anjing', 'bangsat', 'kontol', 'memek', 'sarap', 'babi', 'bodoh', 'goblok',
    'fuck', 'shit', 'bastard', 'asshole', 'slur', 'hate', 'racist', 'sexist',
  ];
  return banned.some((b) => t.includes(b));
}

function sanitizeReply(text: string): string {
  // Hapus kalimat yang menyuruh pengguna mengunjungi situs/website
  const forbidden = [
    'kunjungi situs', 'kunjungi website', 'kunjungi laman', 'kunjungi halaman',
    'visit our website', 'visit website', 'lihat situs', 'pergi ke situs', 'https://', 'http://', 'www.',
  ];
  const sentences = text.split(/(?<=[.!?])\s+/);
  const filtered = sentences.filter((s) => !forbidden.some((f) => s.toLowerCase().includes(f)));
  return filtered.join(' ').trim() || 'Maaf, saya hanya bisa menjawab pertanyaan seputar Aghatis 😊';
}

async function isFlaggedByModeration(text: string, openai?: OpenAI) {
  if (!openai) return false;
  try {
    const resp = await openai.moderations.create({
      model: 'omni-moderation-latest',
      input: text,
    });
    // SDK v4: results[0].flagged
    // @ts-ignore
    return Boolean(resp.results?.[0]?.flagged);
  } catch {
    return false;
  }
}

function generateFallbackReply(text: string): string {
  const t = text.toLowerCase();
  if (isDisallowedContent(t)) {
    return 'Maaf, saya tidak dapat menanggapi pesan seperti itu. Mari kita bahas hal-hal seputar Aghatis saja 😊';
  }
  if (isGreetingOrHelp(t)) {
    return 'Halo! Terima kasih sudah menghubungi Aghatis 👋\n\nSaya Aghatis Assistant, siap membantu. Anda bisa menanyakan hal-hal seputar Aghatis seperti layanan (UI/UX, web/mobile, integrasi data), harga/penawaran, portfolio & testimonials, atau cara menghubungi tim. Apa yang bisa saya bantu saat ini?';
  }
  if (!isRelatedToAghatis(t)) {
    return 'Itu topik menarik, tapi saya fokus membantu seputar Aghatis. Mungkin Anda ingin tahu bagaimana Aghatis bisa membantu Anda hari ini?';
  }
  return 'Baik, saya siap membantu seputar Aghatis. Ingin informasi layanan, fitur, harga/penawaran, portfolio/testimonials, atau cara menghubungi tim?';
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    const history = body.messages ?? [];

    const lastUser = [...history].reverse().find((m) => m.role === 'user');
    const lastUserText = lastUser?.content ?? '';

    // Tambahkan petunjuk dinamis sebagai system messages agar jawaban mengikuti aturan
    const extraSystem: { role: 'system'; content: string }[] = [];
    if (isGreetingOrHelp(lastUserText)) {
      extraSystem.push({
        role: 'system',
        content:
          'Pengguna menyapa/menyatakan butuh bantuan. Sambut hangat dan tawarkan bantuan relevan (1–3 kalimat).',
      });
    }
    if (isDisallowedContent(lastUserText)) {
      extraSystem.push({
        role: 'system',
        content:
          'Input mengandung konten terlarang/menyinggung. Balas sopan sesuai aturan, alihkan ke topik Aghatis.',
      });
    }
    if (!isRelatedToAghatis(lastUserText)) {
      extraSystem.push({
        role: 'system',
        content:
          'Pertanyaan tampaknya di luar Aghatis. Alihkan dengan halus sesuai aturan, tanpa menolak keras.',
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const reply = sanitizeReply(generateFallbackReply(lastUserText));
      return NextResponse.json({ reply });
    }

    const openai = new OpenAI({ apiKey });

    // Moderasi AI lintas bahasa sebelum menyusun jawaban
    if (await isFlaggedByModeration(lastUserText, openai)) {
      const reply = 'Maaf, saya tidak dapat menanggapi pesan seperti itu. Mari kita bahas hal-hal seputar Aghatis saja 😊';
      return NextResponse.json({ reply });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...extraSystem,
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ] as { role: 'system' | 'user' | 'assistant'; content: string }[];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.4,
    });

    const raw = completion.choices?.[0]?.message?.content?.trim() || generateFallbackReply(lastUserText);
    const reply = sanitizeReply(raw);
    return NextResponse.json({ reply });
  } catch (err) {
    // Fallback tanpa error status agar UI tidak memunculkan pesan gagal server
    const reply = sanitizeReply(generateFallbackReply(''));
    return NextResponse.json({ reply });
  }
}