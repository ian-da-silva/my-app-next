"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type SignUpModalRef = { open: () => void; close: () => void };

const SignUpModal = forwardRef<SignUpModalRef>((_, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [apiMsg, setApiMsg] = useState<string | null>(null);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);

  const passwordsMatch = password.length > 0 && password === confirm;

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  // ✅ capture o form ANTES de qualquer await
  const formEl = e.currentTarget as HTMLFormElement;

  setApiErrors([]);
  setApiMsg(null);
  setVerifyUrl(null);

  if (!passwordsMatch) {
    setApiErrors(["As senhas não coincidem."]);
    return;
  }
  if (!terms) {
    setApiErrors(["É necessário aceitar os Termos de Uso e a Política de Privacidade."]);
    return;
  }

  const form = new FormData(formEl);
  const payload = {
    username: String(form.get("username") || "").trim(),
    email: String(form.get("email") || "").trim(),
    password: String(form.get("password") || ""),
  };

  setLoading(true);
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({} as any));

    if (!res.ok) {
      const msgs = Array.isArray((data as any)?.errors)
        ? (data as any).errors.map((x: any) => x.msg || `${x.path}: inválido`)
        : [(data as any)?.message || (data as any)?.detail || "Falha no cadastro"];
      setApiErrors(msgs);
      return;
    }

    setApiMsg(data.message || "Cadastro criado. Verifique seu e-mail.");
    if (data.verifyUrl) setVerifyUrl(data.verifyUrl);

    // ✅ agora pode resetar com segurança
    formEl.reset();
    setPassword("");
    setConfirm("");
    setTerms(false);

    // se quiser fechar o modal, faça DEPOIS do reset:
    // dialogRef.current?.close();
  } catch (err: any) {
    setApiErrors([err?.message || "Erro inesperado"]);
  } finally {
    setLoading(false);
  }
}


  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box w-full max-w-xl rounded-2xl">
        {/* Close (sem form) */}
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          aria-label="Fechar"
          onClick={() => dialogRef.current?.close()}
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-5">
          <h3 className="text-2xl font-bold tracking-tight">Crie sua conta</h3>
          <p className="text-sm text-base-content/70">
            Junte-se ao MercadoBG para comprar e vender jogos de tabuleiro.
          </p>
        </div>

        {/* Social */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button type="button" className="btn btn-outline w-full" onClick={() => console.log("Google OAuth")} aria-label="Continuar com Google">
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M21.35 11.1H12v2.9h5.3c-.23 1.49-1.6 4.36-5.3 4.36-3.19 0-5.79-2.63-5.79-5.86s2.6-5.86 5.79-5.86c1.82 0 3.05.77 3.75 1.43l2.56-2.47C16.9 3.72 14.71 2.8 12 2.8 6.98 2.8 2.9 6.9 2.9 12s4.08 9.2 9.1 9.2c5.24 0 8.7-3.67 8.7-8.84 0-.6-.06-1.05-.15-1.26Z"
              />
            </svg>
            Google
          </button>
          <button type="button" className="btn btn-outline w-full" onClick={() => console.log("Facebook OAuth")} aria-label="Continuar com Facebook">
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path fill="currentColor" d="M13 22v-9h3l.5-3H13V8.5c0-.9.3-1.5 1.8-1.5H17V4.1C16.6 4 15.5 4 14.3 4 11.8 4 10 5.5 10 8.2V10H7v3h3v9h3Z" />
            </svg>
            Facebook
          </button>
        </div>

        <div className="divider my-3">ou</div>

        {/* Form (sem form aninhado) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-medium">Nome de usuário</span>
            </label>
            <input
              name="username"
              type="text"
              required
              autoComplete="username"
              placeholder="ex.: segobio"
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-medium">E-mail</span>
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="voce@exemplo.com"
              className="input input-bordered w-full"
            />
          </div>

          {/* Passwords */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Senha</span>
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={8} // <- backend exige 8+
                autoComplete="new-password"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label pt-1">
                <span className="label-text-alt text-base-content/60">Mínimo de 8 caracteres</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Confirmar senha</span>
              </label>
              <input
                name="password_confirm"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className={`input input-bordered w-full ${confirm && !passwordsMatch ? "input-error" : ""}`}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <label className="label pt-1 h-5">
                {!passwordsMatch && confirm ? (
                  <span className="label-text-alt text-error">As senhas não coincidem</span>
                ) : (
                  <span className="label-text-alt">&nbsp;</span>
                )}
              </label>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-2">
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
          </div>

          {/* Feedback da API */}
          {(apiErrors.length > 0 || apiMsg) && (
            <div className="mt-2 space-y-2">
              {apiErrors.length > 0 && (
                <div className="alert alert-error">
                  <ul className="list-disc ml-5">
                    {apiErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
              {apiMsg && (
                <div className="alert">
                  <span>{apiMsg}</span>
                </div>
              )}
              {verifyUrl && (
                <div className="text-sm opacity-70">
                  Link de verificação (DEV):{" "}
                  <a className="link" href={verifyUrl}>
                    {verifyUrl}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-1 flex flex-col sm:flex-row gap-2">
            <button type="submit" className="btn btn-primary flex-1" disabled={!passwordsMatch || !terms || loading}>
              {loading ? "Enviando..." : "Criar conta"}
            </button>
            <button type="button" className="btn btn-ghost w-full sm:w-auto" onClick={() => dialogRef.current?.close()}>
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Fechar" />
      </form>
    </dialog>
  );
});

SignUpModal.displayName = "SignUpModal";
export default SignUpModal;
