'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>(
        [{ role: 'assistant', content: 'Hai! Saya asisten virtual Aghatis. Ada yang bisa saya bantu hari ini?' }]
    );
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

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
                className="bg-[#00704A] text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-2xl hover:bg-[#16A34A]/90 transition-colors"
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
                    height: 600,
                    background:
                        'linear-gradient(180deg, #001A11 0%, #009C67 44.21%, #FFF 88.42%)',
                }}
            >
                {/* Container (padding 16, column, space-between) */}
                <div className="h-full w-full p-4 flex flex-col justify-between">
                    {/* Header */}
                    <div className="text-white flex flex-col w-full items-center justify-center text-center">
                        <Image
                          src="/app/img/logo%20circle.svg"
                          alt="Aghatis Logo"
                          width={60}
                          height={60}
                          className="mb-3 drop-shadow"
                          priority
                        />
                        <h1 className="text-2xl">Our assistant answers instantly</h1>
                        <p className="text-sm text-white/60 mt-2">We&apos;re here to help you with any questions you may have.</p>
                    </div>

                    {/* Messages */}
                    <div
                        ref={listRef}
                        className="flex flex-col gap-2 mt-6 h-[calc(100%-160px)] mb-4 overflow-y-auto no-scrollbar overscroll-contain"
                        style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
                        onWheel={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (listRef.current) {
                            listRef.current.scrollTop += e.deltaY;
                          }
                        }}
                        onScroll={(e) => {
                          e.stopPropagation();
                        }}
                    >
                        {messages.map((m, idx) => (
                            <div
                                key={idx}
                                className={[
                                    'text-sm rounded-lg w-[300px] px-4 py-4 leading-relaxed',
                                    m.role === 'assistant'
                                        ? 'bg-white rounded-tl-none text-black/60 border border-black/10 self-start'
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

                    {/* Input pill */}
                    <div className="w-full">
                        <div className="bg-white rounded-full border border-black/10 px-2 py-2 flex items-center gap-2">
                            <input
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
                </div>
            </div>
        </div>
    );
}