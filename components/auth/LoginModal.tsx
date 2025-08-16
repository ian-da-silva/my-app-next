"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type LoginModalRef = { open: () => void; close: () => void };

const LoginModal = forwardRef<LoginModalRef>((_, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      setErr(null);
      setLoading(false);
      dialogRef.current?.showModal();
    },
    close: () => dialogRef.current?.close(),
  }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const payload = Object.fromEntries(form.entries());
      // TODO: troque por sua chamada real (ex.: POST /api/auth/login)
      console.log("login payload →", payload);

      // simulação rápida
      await new Promise((r) => setTimeout(r, 600));

      dialogRef.current?.close();
    } catch (error: any) {
      setErr(error?.message ?? "Não foi possível entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box w-full max-w-xl rounded-2xl">
        {/* Fechar */}
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
          <h3 className="text-2xl font-bold tracking-tight">Entrar</h3>
          <p className="text-sm text-base-content/70">
            Acesse sua conta do MercadoBG para continuar.
          </p>
        </div>

        {/* Social */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => console.log("Google OAuth")}
            aria-label="Entrar com Google"
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M21.35 11.1H12v2.9h5.3c-.23 1.49-1.6 4.36-5.3 4.36-3.19 0-5.79-2.63-5.79-5.86s2.6-5.86 5.79-5.86c1.82 0 3.05.77 3.75 1.43l2.56-2.47C16.9 3.72 14.71 2.8 12 2.8 6.98 2.8 2.9 6.9 2.9 12s4.08 9.2 9.1 9.2c5.24 0 8.7-3.67 8.7-8.84 0-.6-.06-1.05-.15-1.26Z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => console.log("Facebook OAuth")}
            aria-label="Entrar com Facebook"
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path fill="currentColor" d="M13 22v-9h3l.5-3H13V8.5c0-.9.3-1.5 1.8-1.5H17V4.1C16.6 4 15.5 4 14.3 4 11.8 4 10 5.5 10 8.2V10H7v3h3v9h3Z" />
            </svg>
            Facebook
          </button>
        </div>

        <div className="divider my-3">ou</div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {err && (
            <div className="alert alert-error">
              <span>{err}</span>
            </div>
          )}

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
              disabled={loading}
            />
          </div>

          {/* Password + toggle */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-medium">Senha</span>
            </label>
            <div className="join w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="input input-bordered join-item w-full"
                disabled={loading}
              />
              <button
                type="button"
                className="btn btn-ghost join-item"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                disabled={loading}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <label className="label pt-1">
              <span className="label-text-alt">
                <a href="/recuperar-senha" className="link link-primary">
                  Esqueceu a senha?
                </a>
              </span>
            </label>
          </div>

          {/* Remember me */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input type="checkbox" name="remember" className="checkbox checkbox-sm" disabled={loading} />
              <span className="label-text">Manter conectado</span>
            </label>
          </div>

          {/* Actions */}
          <div className="mt-1 flex flex-col sm:flex-row gap-2">
            <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
            <button
              type="button"
              className="btn btn-ghost w-full sm:w-auto"
              onClick={() => dialogRef.current?.close()}
              disabled={loading}
            >
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

LoginModal.displayName = "LoginModal";
export default LoginModal;
