"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Helper: build API base URL from env with sensible fallback for your current backend
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.65.128:3000";

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export default function FinalizeProfilePage() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    country: "Brazil",
    state: "",
    city: "",
    phone: "",
    isSeller: false,
    storeName: "",
    newsletter: true,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load current user basic data from session
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, { credentials: "include" });
        if (!res.ok) throw new Error("Falha ao carregar seu perfil.");
        const user = await res.json();
        setForm((f) => ({
          ...f,
          name: user?.name || "",
          username: user?.username || "",
          email: user?.email || "",
          country: user?.country || f.country,
          state: user?.state || "",
          city: user?.city || "",
          phone: user?.phone || "",
          isSeller: Boolean(user?.isSeller),
          storeName: user?.storeName || "",
          newsletter: user?.newsletter ?? true,
        }));
        if (user?.avatarUrl) setAvatarPreview(user.avatarUrl);
      } catch (e: any) {
        setMessage({ type: "error", text: e.message || "Não foi possível carregar seus dados." });
      } finally {
        setLoadingProfile(false);
      }
    })();
  }, []);

  function handleChange<T extends HTMLInputElement | HTMLTextAreaElement>(e: React.ChangeEvent<T>) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!form.name.trim()) return setMessage({ type: "error", text: "Informe seu nome." });
    if (!isValidEmail(form.email)) return setMessage({ type: "error", text: "E-mail inválido." });

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("username", form.username.trim());
      body.append("email", form.email.trim().toLowerCase());
      body.append("country", form.country.trim());
      body.append("state", form.state.trim());
      body.append("city", form.city.trim());
      body.append("phone", form.phone.trim());
      body.append("newsletter", String(form.newsletter));
      body.append("isSeller", String(form.isSeller));
      if (form.isSeller && form.storeName) body.append("storeName", form.storeName.trim());
      if (avatarFile) body.append("avatar", avatarFile);

      // Endpoint para concluir o perfil após pré-cadastro
      const res = await fetch(`${API_BASE}/api/users/profile`, {
        method: "PUT",
        body,
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Falha ao salvar seu perfil.");
      }

      setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
      setAvatarFile(null);
      fileInputRef.current && (fileInputRef.current.value = "");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Erro inesperado ao salvar o perfil." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li><Link href="/">Início</Link></li>
            <li><span>Conta</span></li>
            <li className="font-semibold">Finalizar perfil</li>
          </ul>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl">Finalize seu perfil</h1>
            <p className="text-sm opacity-80">Conclua seu cadastro adicionando seus dados públicos e preferências. Seu e-mail e usuário já foram definidos no passo anterior.</p>

            {message && (
              <div className={`alert ${message.type === "success" ? "alert-success" : "alert-error"} mt-2`}>
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Avatar */}
                <label className="md:text-right self-center">Avatar</label>
                <div className="md:col-span-2 flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-base-300">
                      {avatarPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avatarPreview} alt="Prévia do avatar" className="w-16 h-16 object-cover" />
                      ) : (
                        <Image src="/avatar-placeholder.png" alt="Avatar" width={64} height={64} className="object-cover" />
                      )}
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered"
                    onChange={handleAvatar}
                    disabled={loadingProfile}
                  />
                </div>

                {/* Nome completo */}
                <label htmlFor="name" className="md:text-right self-center">Nome completo<span className="text-error"> *</span></label>
                <div className="md:col-span-2">
                  <input id="name" name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" placeholder="Ex.: João da Silva" required disabled={loadingProfile} />
                </div>

                {/* Username (bloqueado) */}
                <label htmlFor="username" className="md:text-right self-center">Usuário</label>
                <div className="md:col-span-2">
                  <input id="username" name="username" value={form.username} onChange={handleChange} className="input input-bordered w-full" placeholder="Ex.: joaosilva" disabled readOnly />
                  <div className="text-xs opacity-70 mt-1">Definido no cadastro inicial.</div>
                </div>

                {/* E-mail (bloqueado) */}
                <label htmlFor="email" className="md:text-right self-center">E-mail<span className="text-error"> *</span></label>
                <div className="md:col-span-2">
                  <input id="email" type="email" name="email" value={form.email} onChange={handleChange} className="input input-bordered w-full" placeholder="seu@email.com" disabled readOnly />
                  <div className="text-xs opacity-70 mt-1">Definido no cadastro inicial.</div>
                </div>

                {/* Localização */}
                <label className="md:text-right self-center">Localização</label>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="label"><span className="label-text">País</span></label>
                    <input name="country" value={form.country} onChange={handleChange} className="input input-bordered w-full" disabled={loadingProfile} />
                  </div>
                  <div>
                    <label className="label"><span className="label-text">Estado</span></label>
                    <input name="state" value={form.state} onChange={handleChange} className="input input-bordered w-full" placeholder="Ex.: RS" disabled={loadingProfile} />
                  </div>
                  <div>
                    <label className="label"><span className="label-text">Cidade</span></label>
                    <input name="city" value={form.city} onChange={handleChange} className="input input-bordered w-full" placeholder="Ex.: São Leopoldo" disabled={loadingProfile} />
                  </div>
                </div>

                {/* Telefone */}
                <label htmlFor="phone" className="md:text-right self-center">Telefone</label>
                <div className="md:col-span-2">
                  <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="input input-bordered w-full" placeholder="(xx) xxxxx-xxxx" disabled={loadingProfile} />
                </div>

                {/* Perfil vendedor */}
                <label className="md:text-right self-center">Quero vender</label>
                <div className="md:col-span-2">
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox" name="isSeller" checked={form.isSeller} onChange={handleChange} disabled={loadingProfile} />
                      <span className="label-text">Ativar perfil de vendedor</span>
                    </label>
                  </div>
                  {form.isSeller && (
                    <div className="mt-2">
                      <input name="storeName" value={form.storeName} onChange={handleChange} className="input input-bordered w-full" placeholder="Nome da loja (opcional)" disabled={loadingProfile} />
                      <p className="text-xs opacity-70 mt-1">Você poderá publicar anúncios, leilões e gerenciar vendas.</p>
                    </div>
                  )}
                </div>

                {/* Newsletter */}
                <label className="md:text-right self-center">Newsletter</label>
                <div className="md:col-span-2">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" className="checkbox" name="newsletter" checked={form.newsletter} onChange={handleChange} disabled={loadingProfile} />
                    <span className="label-text">Quero receber novidades por e-mail</span>
                  </label>
                </div>

                {/* Verificação (placeholder) */}
                <label className="md:text-right self-center">Verificação</label>
                <div className="md:col-span-2">
                  <div className="mockup-window border bg-base-200">
                    <div className="px-4 py-6">[Captcha / Honeypot / Rate-limit — implementar no backend]</div>
                  </div>
                </div>

                {/* Submit */}
                <div className="md:col-start-2 md:col-span-2 flex items-center gap-3 mt-2">
                  <button type="submit" className={`btn btn-primary ${submitting ? "btn-disabled" : ""}`} disabled={submitting || loadingProfile}>
                    {submitting ? <span className="loading loading-spinner"></span> : null}
                    Salvar e continuar
                  </button>
                  <Link href="/app" className="btn btn-ghost">Pular por enquanto</Link>
                </div>
              </div>
            </form>

            <div className="divider my-8" />
            <div className="text-sm opacity-70">
              <p>Você pode editar estas informações mais tarde em Configurações &gt; Perfil.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}