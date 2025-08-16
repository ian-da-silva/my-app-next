// components/auth/SignUpModal.tsx
"use client";
import { useRef, useState } from "react";

export default function SignUpModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);

  const passwordsMatch = password.length > 0 && password === confirm;

  function open() {
    dialogRef.current?.showModal();
  }
  function close() {
    dialogRef.current?.close();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: troque por sua chamada de API
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    console.log("signup payload →", payload);
    close();
  }

  return (
    <>
      {/* Botão que abre o modal */}
      <button className="btn btn-primary" onClick={open}>
        Criar conta
      </button>

      {/* Modal */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box w-full max-w-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3" aria-label="Fechar">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-xl mb-1">Crie sua conta</h3>
          <p className="text-sm text-base-content/70 mb-4">
            Junte-se ao MercadoBG para comprar e vender jogos de tabuleiro.
          </p>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => console.log("Sign in with Google")}
              aria-label="Registrar com Google"
            >
              {/* ícone Google (SVG simples) */}
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path fill="currentColor" d="M21.35 11.1H12v2.9h5.3c-.23 1.49-1.6 4.36-5.3 4.36-3.19 0-5.79-2.63-5.79-5.86s2.6-5.86 5.79-5.86c1.82 0 3.05.77 3.75 1.43l2.56-2.47C16.9 3.72 14.71 2.8 12 2.8 6.98 2.8 2.9 6.9 2.9 12s4.08 9.2 9.1 9.2c5.24 0 8.7-3.67 8.7-8.84 0-.6-.06-1.05-.15-1.26Z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => console.log("Sign in with Facebook")}
              aria-label="Registrar com Facebook"
            >
              {/* ícone Facebook */}
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path fill="currentColor" d="M13 22v-9h3l.5-3H13V8.5c0-.9.3-1.5 1.8-1.5H17V4.1C16.6 4 15.5 4 14.3 4 11.8 4 10 5.5 10 8.2V10H7v3h3v9h3Z"/>
              </svg>
              Facebook
            </button>
          </div>

          <div className="divider my-3">ou preencha seus dados</div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="form-control">
              <span className="label-text">Nome de usuário</span>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                className="input input-bordered"
                placeholder="ex.: segobio"
              />
            </label>

            <label className="form-control">
              <span className="label-text">E-mail</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input input-bordered"
                placeholder="voce@exemplo.com"
              />
            </label>

            <div className="grid md:grid-cols-2 gap-3">
              <label className="form-control">
                <span className="label-text">Senha</span>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="input input-bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <label className="form-control">
                <span className="label-text">Confirmar senha</span>
                <input
                  name="password_confirm"
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className={`input input-bordered ${confirm && !passwordsMatch ? "input-error" : ""}`}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                {!passwordsMatch && confirm && (
                  <span className="text-error text-xs mt-1">As senhas não coincidem.</span>
                )}
              </label>
            </div>

            <label className="label cursor-pointer justify-start gap-3">
              <input type="checkbox" name="newsletter" className="checkbox checkbox-sm" />
              <span className="label-text">Quero receber newsletter e novidades</span>
            </label>

            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-sm"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                required
              />
              <span className="label-text">
                Li e aceito os{" "}
                <a href="/termos" className="link link-primary" target="_blank" rel="noopener noreferrer">
                  Termos de Uso
                </a>{" "}
                e a{" "}
                <a href="/privacidade" className="link link-primary" target="_blank" rel="noopener noreferrer">
                  Política de Privacidade
                </a>.
              </span>
            </label>

            <div className="mt-2 flex items-center gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!passwordsMatch || !terms}
              >
                Criar conta
              </button>
              <button type="button" className="btn btn-ghost" onClick={close}>
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button aria-label="Fechar" />
        </form>
      </dialog>
    </>
  );
}