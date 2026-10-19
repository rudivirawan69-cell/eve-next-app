"use client";

import { useEveAgent } from "eve/react";
import { useState, FormEvent } from "react";

export default function Home() {
  const agent = useEveAgent({ prewarm: true });
  const [input, setInput] = useState("");
  const isBusy =
    agent.status === "submitted" ||
    agent.status === "streaming" ||
    agent.status === "resuming";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = input.trim();
    if (message.length === 0 || isBusy) return;
    void agent.send(message);
    setInput("");
  };

  const messages = agent.data?.messages ?? [];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">eve + Next.js</h1>
          <p className="text-sm text-zinc-400">
            Durable agent harness (status: {agent.status})
          </p>
        </header>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 min-h-[320px] max-h-[60vh] overflow-y-auto space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <article
                key={message.id}
                className={`rounded-lg px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "bg-blue-600/20 border border-blue-500/30 ml-8"
                    : "bg-zinc-800/80 border border-zinc-700/50 mr-8"
                }`}
              >
                <header className="text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wide">
                  {message.role}
                </header>
                {(message.parts ?? []).map((part, index) =>
                  part.type === "text" ? (
                    <p key={part.id ?? index} className="whitespace-pre-wrap">
                      {part.text}
                    </p>
                  ) : null
                )}
              </article>
            ))
          ) : (
            <p className="text-zinc-500 text-sm">
              Kirim pesan untuk memulai sesi durable. Sesi bertahan terhadap
              crash, timeout, dan redeploy.
            </p>
          )}
        </div>

        {agent.error ? (
          <p className="text-sm text-red-400">
            Error: {String((agent.error as { message?: string })?.message ?? agent.error)}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan..."
            disabled={agent.status === "resuming"}
          />
          <button
            type="submit"
            disabled={isBusy || input.trim().length === 0}
            className="rounded-lg bg-white text-zinc-900 px-4 py-2 text-sm font-medium disabled:opacity-40"
          >
            Kirim
          </button>
        </form>
      </div>
    </main>
  );
}
