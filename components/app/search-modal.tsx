// components/app/search-modal.tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function SearchModal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [q, setQ] = useState("");

  function open() {
    dialogRef.current?.showModal();
    // foca o input após abrir
    setTimeout(() => inputRef.current?.focus(), 0);
  }
  function close() {
    dialogRef.current?.close();
  }

  // Atalho: Ctrl/Cmd+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      if ((isMac && e.metaKey && e.key.toLowerCase() === "k") ||
          (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        open();
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Exponha no window para o header chamar
  useEffect(() => {
    (window as any).openSearchModal = open;
  }, []);

  function submit() {
    // TODO: navegar para /app/listings?q=...
    window.location.href = `/app/listings?q=${encodeURIComponent(q)}`;
  }

  return (
    <dialog ref={dialogRef} className="modal modal-middle">
      <div className="modal-box max-w-2xl p-0">
        {/* Botão de fechar ABSOLUTO para não deslocar o conteúdo */}
        <button
          onClick={close}
          aria-label="Fechar"
          className="btn btn-ghost btn-sm absolute right-2 top-2"
        >
          ✕
        </button>

        {/* Conteúdo centralizado e sem 'pulo' */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Buscar</h3>
          <div className="join w-full">
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="input input-bordered join-item w-full"
              placeholder="Procure por jogo, expansão, edição..."
              aria-label="Buscar"
            />
            <button onClick={submit} className="btn btn-primary join-item">
              Buscar
            </button>
          </div>
          <p className="text-xs opacity-70">
            Atalho: <kbd className="kbd kbd-sm">Ctrl</kbd>+<kbd className="kbd kbd-sm">K</kbd>
          </p>
        </div>
      </div>

      {/* backdrop padrão DaisyUI */}
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Fechar">close</button>
      </form>
    </dialog>
  );
}
