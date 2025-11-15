'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { ArrowLeft, X } from 'lucide-react';

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [stage, setStage] = useState<'intro' | 'chat' | 'log'>('intro');
    const [messages, setMessages] = useState<ChatMessage[]>(
        [{ role: 'assistant', content: 'Hai! Saya asisten virtual Aghatis. Ada yang bisa saya bantu hari ini?' }]
    );
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const logRef = useRef<HTMLDivElement>(null);
    const chatLenisRef = useRef<Lenis | null>(null);
    const logLenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

    useEffect(() => {
        if (stage === 'chat') {
            inputRef.current?.focus();
        }
    }, [stage]);

    useEffect(() => {
        if (stage === 'chat' && listRef.current) {
            chatLenisRef.current?.destroy?.();
            chatLenisRef.current = new Lenis({
                wrapper: listRef.current,
                eventsTarget: listRef.current,
                autoRaf: true,
                smoothWheel: true,
                overscroll: true,
            });
        }
        return () => {
            chatLenisRef.current?.destroy?.();
            chatLenisRef.current = null;
        };
    }, [stage]);

    useEffect(() => {
        if (stage === 'log' && logRef.current) {
            logLenisRef.current?.destroy?.();
            logLenisRef.current = new Lenis({
                wrapper: logRef.current,
                eventsTarget: logRef.current,
                autoRaf: true,
                smoothWheel: true,
                overscroll: true,
            });
        }
        return () => {
            logLenisRef.current?.destroy?.();
            logLenisRef.current = null;
        };
    }, [stage]);

    const canSend = useMemo(() => input.trim().length > 0 && !isTyping, [input, isTyping]);

    const isDisallowedContent = (text: string) => {
        // Normalisasi sederhana untuk menangkap variasi/obfuscation
        const normalize = (s: string) => s
            .toLowerCase()
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '') // hapus diacritics
            .replace(/[@]/g, 'a')
            .replace(/3/g, 'e')
            .replace(/1/g, 'i')
            .replace(/0/g, 'o')
            .replace(/\$/g, 's')
            .replace(/[^a-z0-9]/g, '');

        const t = normalize(text);
        // Daftar kata kasar umum (ID/EN + beberapa regional)
        const banned = [
            // Indonesia
            'anjing', 'bangsat', 'bajingan', 'brengsek', 'keparat', 'kampret', 'asu', 'jancuk', 'kontol', 'memek', 'pepek', 'perek', 'toket', 'sarap', 'goblok', 'tolol', 'bodoh', 'idiot', 'babi', 'setan', 'pantek',
            // Melayu/Regional
            'puki', 'pukimak', 'cibai', 'kentot',
            // English
            'fuck', 'shit', 'bastard', 'asshole', 'dick', 'cunt', 'bitch', 'motherfucker', 'slut', 'whore',
            // Hate slurs (disensor sebagian agar tidak tampil namun tetap terdeteksi)
            'racist', 'sexist', 'retard', 'faggot', 'ch*nk', 'n*gger', 'kike',
            // Tagalog/Filipino
            'gago', 'putangina', 'potangina', 'puta', 'pota', 'puchangina', 'ulol', 'tanga', 'bobo', 'lintik',
            // Italian
            'cazzo',
        ].map(normalize);

        return banned.some((b) => t.includes(b));
    };

    const sendMessage = async () => {
        const text = input.trim();
        if (!text) return;

        // Blokir kata kasar: silent block (tidak tampil, tidak kirim, tanpa balasan)
        if (isDisallowedContent(text)) {
            setInput('');
            setIsTyping(false);
            return;
        }
        setInput('');

        const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text },];
        setMessages(nextMessages);
        setIsTyping(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: nextMessages }),
            });

            if (!res.ok) {
                throw new Error('Gagal memanggil API chat');
            }
            const data = await res.json();
            const reply = (data?.reply as string) ?? 'Maaf, terjadi kesalahan.';

            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Maaf, terjadi kesalahan pada server. Coba lagi nanti.' },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter' && canSend) {
            e.preventDefault();
            sendMessage();
        }
    };

    

    return (
        <div className="fixed bottom-4 right-4 z-[60]">
            {/* Toggle Button (selalu terlihat, untuk buka/tutup) */}
            <button
                aria-label="Buka Aghatis Assistant"
                className="bg-[#00704A] text-white rounded-full border-[3px] border-white w-14 h-14 shadow-lg flex items-center justify-center text-2xl hover:bg-[#16A34A]/90 transition-colors"
                onClick={() => setIsOpen((v) => !v)}
            >
                <Image
                    src="/app/img/messages.svg"
                    alt="Buka chat"
                    width={24}
                    height={24}
                    priority
                    unoptimized
                />
            </button>

            {/* Chat Window */}
            <div
                className={[
                    'fixed bottom-[88px] right-4 max-w-[calc(100vw-2rem)]',
                    'rounded-2xl shadow-2xl overflow-hidden',
                    'transition-all duration-300',
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
                ].join(' ')}
                style={{
                    width: 400,
                    height: stage === 'log' ? 600 : 600,
                    background:
                        'linear-gradient(180deg, #001A11 0%, #009C67 44.21%, #FFF 88.42%)',
                }}
            >
                {/* Container (padding 16, column, space-between) */}
                <div className="h-full w-full p-4 flex flex-col justify-between">
                    {/* Intro Header */}
                    {stage === 'intro' && (
                        <div className="text-white flex flex-col w-full h-full items-center justify-center text-center">
                            <Image
                                src="/app/img/logo%20circle.svg"
                                alt="Aghatis Logo"
                                width={60}
                                height={60}
                                className="drop-shadow"
                                priority
                            />
                            <h1 className="text-2xl mt-2.5">Discover Aghatis AI</h1>
                            <p className="text-sm text-white/60 mt-2">Chat or see what&apos;s new on our platform.</p>
                            <div className="flex flex-col w-full h-full items-center justify-center">
                                <button
                                    className="flex flex-col items-center justify-center mt-4 bg-white w-full h-full text-black cursor-pointer px-4 py-2 rounded-xl border border-black/10 hover:bg-white/90 transition-colors"
                                    onClick={() => setStage('chat')}
                                    aria-label="Chat with Aghatis AI"
                                >
                                    <Image
                                        src="/app/img/icons/Messages.svg"
                                        alt="Buka chat"
                                        width={44}
                                        height={44}
                                        priority
                                        unoptimized
                                    />
                                    <h1 className="text-xl my-2.5">Chat with Aghatis AI</h1>
                                    <p className="text-sm text-black/60">Ask anything about Aghatis and get instant, helpful answers.</p>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center mt-4 bg-white w-full h-full text-black cursor-pointer px-4 py-2 rounded-xl border border-black/10 hover:bg-white/90 transition-colors"
                                    onClick={() => setStage('log')}
                                    aria-label="What's new in Aghatis"
                                >
                                    <Image
                                        src="/app/img/icons/Whats-new.svg"
                                        alt="Buka chat"
                                        width={44}
                                        height={44}
                                        priority
                                        unoptimized
                                    />
                                    <h1 className="text-xl my-2.5">What&apos;s new in Aghatis</h1>
                                    <p className="text-sm text-black/60">See the latest features and improvements on our platform.</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === 'log' && (
                        <div className="flex flex-col h-full text-white justify-center items-center">
                            <div className="mb-2.5 w-full flex items-center justify-between">
                                <button
                                    className="text-sm p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                                    onClick={() => setStage('intro')}
                                    aria-label="Kembali"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <Image
                                    src="/app/img/logo%20circle.svg"
                                    alt="Aghatis Logo"
                                    width={60}
                                    height={60}
                                    className="drop-shadow"
                                    priority
                                />
                                <button
                                    className="text-sm p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Tutup"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <h1 className="text-2xl">What&apos;s new in Aghatis</h1>
                            <p className="text-sm text-white/60 mt-2 text-center font-normal">See the latest features and improvements on our platform</p>
                            <div
                                ref={logRef}
                                className="mt-6 flex-1 overflow-y-auto no-scrollbar overscroll-contain"
                                style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
                            >
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">November 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">AI Assistant Improvements</div>
                                    <p className="text-sm mt-1">Respons lebih cepat dan render Markdown lebih baik.</p>
                                    <p className="text-sm">Optimasi pemanggilan API dan pengurangan latensi rata-rata 30%.</p>
                                    <p className="text-sm">Pembaruan UI untuk konsistensi tipografi dan spacing.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">Oktober 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">Peningkatan Keamanan</div>
                                    <p className="text-sm mt-1">Validasi konten pengguna dan penanganan error diperkuat.</p>
                                    <p className="text-sm">Tambah rate-limit untuk mencegah spam dan abuse.</p>
                                    <p className="text-sm">Audit dependensi dan patch kerentanan kecil.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">September 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">Performance & Accessibility</div>
                                    <p className="text-sm mt-1">Perbaikan ARIA labels untuk aksesibilitas.</p>
                                    <p className="text-sm">Lazy-load komponen non-kritis untuk TTI lebih cepat.</p>
                                    <p className="text-sm">Pengurangan layout shift pada elemen interaktif.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">Agustus 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">New Chat Features</div>
                                    <p className="text-sm mt-1">Auto-scroll daftar pesan dengan overscroll containment.</p>
                                    <p className="text-sm">Shortcut Enter untuk kirim dan fokus otomatis ke input.</p>
                                    <p className="text-sm">Penataan balon chat untuk keterbacaan konten.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">Juli 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">API Stability</div>
                                    <p className="text-sm mt-1">Fallback pesan saat server error untuk pengalaman mulus.</p>
                                    <p className="text-sm">Retry ringan untuk intermiten jaringan.</p>
                                    <p className="text-sm">Monitoring dasar waktu respons.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">Juni 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">UI Polish</div>
                                    <p className="text-sm mt-1">Penyatuan warna tombol dan efek hover.</p>
                                    <p className="text-sm">Penyesuaian border dan radius untuk konsistensi.</p>
                                    <p className="text-sm">Perbaikan kontras teks pada background gradasi.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">Mei 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">Content Filtering</div>
                                    <p className="text-sm mt-1">Normalisasi input dan blokir kata kasar lintas bahasa.</p>
                                    <p className="text-sm">Silent-block untuk mencegah balasan tidak pantas.</p>
                                    <p className="text-sm">Penambahan daftar kata yang sering disalahgunakan.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">April 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">Markdown Rendering</div>
                                    <p className="text-sm mt-1">Dukungan GFM: list, bold, italic, dan heading.</p>
                                    <p className="text-sm">Penyetelan komponen ReactMarkdown agar tipografi rapi.</p>
                                    <p className="text-sm">Perbaikan whitespace untuk pesan panjang.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">Maret 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">Widget Controls</div>
                                    <p className="text-sm mt-1">Tombol toggle tetap terlihat untuk buka/tutup widget.</p>
                                    <p className="text-sm">Animasi transisi masuk/keluar yang halus.</p>
                                    <p className="text-sm">Posisi fixed agar mudah diakses.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">Februari 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">Intro Experience</div>
                                    <p className="text-sm mt-1">Halaman intro dengan pilihan Chat dan What’s New.</p>
                                    <p className="text-sm">Logo bundar dan teks pengantar ringkas.</p>
                                    <p className="text-sm">Navigasi antar stage yang intuitif.</p>
                                </div>
                                <div className="bg-white rounded-xl border border-black/10 p-4 mb-3 text-black/70">
                                    <div className="text-xs text-black/50">Januari 2025</div>
                                    <div className="text-sm font-medium mt-1 text-[#00A06A]">Initial Release</div>
                                    <p className="text-sm mt-1">Rilis awal widget chat Aghatis AI.</p>
                                    <p className="text-sm">Kirim pesan, balasan asisten, dan scroll daftar.</p>
                                    <p className="text-sm">Struktur komponen dasar dan state manajemen.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Messages (visible in chat stage) */}
                    {stage === 'chat' && (
                        <>
                            <div className="flex flex-col text-white justify-center items-center">
                                <div className="mb-2.5 w-full flex items-center justify-between">
                                    <button
                                        className="text-sm p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                                        onClick={() => setStage('intro')}
                                        aria-label="Kembali"
                                    >
                                        <ArrowLeft size={18} />
                                    </button>
                                    <Image
                                        src="/app/img/logo%20circle.svg"
                                        alt="Aghatis Logo"
                                        width={60}
                                        height={60}
                                        className="drop-shadow"
                                        priority
                                    />
                                    <button
                                        className="text-sm p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                        aria-label="Tutup"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <h1 className="text-2xl text-white">Chat with Aghatis AI</h1>
                                <p className="text-sm text-center text-white/60 mt-2">Ask anything about Aghatis and get instant, helpful answers</p>
                            </div>
                            <div
                                ref={listRef}
                                className="mt-6 flex-1 min-h-0 mb-4 overflow-y-auto no-scrollbar overscroll-contain"
                                style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
                            >
                                <div className="flex flex-col gap-2">
                                {messages.map((m, idx) => (
                                    <div
                                        key={idx}
                                        className={[
                                            'text-sm rounded-lg w-[300px] px-4 py-4 leading-relaxed',
                                            m.role === 'assistant'
                                                ? 'bg-white rounded-tl-none text:black/60 border border-black/10 self-start'
                                                : 'bg-white rounded-tr-none text-black/60 border border-black/10 self-end',
                                        ].join(' ')}
                                    >
                                        {m.role === 'assistant' ? (
                                            <>
                                                <div className="text-sm text-[#00A06A] font-medium mb-1">Aghatis AI</div>
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        p: ({ children }) => (
                                                            <p className="whitespace-pre-line text-black/60">{children}</p>
                                                        ),
                                                        ul: ({ children }) => (
                                                            <ul className="list-disc pl-5 space-y-1 mb-2">{children}</ul>
                                                        ),
                                                        ol: ({ children }) => (
                                                            <ol className="list-decimal pl-5 space-y-1 mb-2">{children}</ol>
                                                        ),
                                                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                                        em: ({ children }) => <em className="italic">{children}</em>,
                                                        h1: ({ children }) => <h1 className="text-base font-semibold mb-2">{children}</h1>,
                                                        h2: ({ children }) => <h2 className="text-sm font-semibold mb-2">{children}</h2>,
                                                        br: () => <br />,
                                                    }}
                                                >
                                                    {m.content}
                                                </ReactMarkdown>
                                            </>
                                        ) : (
                                            <span className="whitespace-pre-line">{m.content}</span>
                                        )}
                                    </div>
                                ))}
                            {isTyping && (
                                <div className="text-sm rounded-lg rounded-tl-none px-4 py-4 bg-white w-[300px] text-gray-600 border border-black/10 italic">… mengetik</div>
                            )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Input pill (visible in chat stage) */}
                    {stage === 'chat' && (
                        <div className="w-full">
                            <div className="bg-white rounded-full border border-black/10 px-2 py-2 flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Ask a questions…"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 px-4 text-sm bg-transparent focus:outline-none"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!canSend}
                                    className="w-[38px] h-[38px] rounded-full bg-[#00704A] text-white flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#00A06A]/90 transition-colors"
                                    aria-label="Kirim"
                                >
                                    <Image
                                        src="/app/img/send.svg"
                                        alt="Kirim"
                                        width={24}
                                        height={24}
                                        priority
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}