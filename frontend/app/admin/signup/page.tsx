"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/adminApi";
import { saveSession, isAuthenticated } from "@/lib/adminAuth";

interface FieldError { field: string; message: string; }

function PasswordStrength({ pwd }: { pwd: string }) {
  if (!pwd) return null;
  const checks = [
    { label: "8+ characters",     ok: pwd.length >= 8 },
    { label: "Uppercase letter",  ok: /[A-Z]/.test(pwd) },
    { label: "Lowercase letter",  ok: /[a-z]/.test(pwd) },
    { label: "Number",            ok: /\d/.test(pwd) },
    { label: "Special character", ok: /[^A-Za-z0-9]/.test(pwd) },
  ];
  const score = checks.filter(c => c.ok).length;
  const barColor = score <= 2 ? "bg-red-400" : score === 3 ? "bg-yellow-400" : score === 4 ? "bg-blue-400" : "bg-green-500";
  const label    = ["", "Weak", "Weak", "Fair", "Good", "Strong"][score];

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1 h-1.5">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={`flex-1 rounded-full transition-all ${i <= score ? barColor : "bg-gray-100"}`} />
        ))}
        <span className="text-xs text-gray-400 ml-1 leading-none">{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {checks.map(c => (
          <p key={c.label} className={`text-[11px] flex items-center gap-1 ${c.ok ? "text-green-600" : "text-gray-400"}`}>
            <span>{c.ok ? "✓" : "○"}</span> {c.label}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function AdminSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "", confirm: "" });
  const [bootstrapToken, setBootstrapToken] = useState("");
  const [showPwd, setShowPwd]     = useState(false);
  const [showCfm, setShowCfm]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  useEffect(() => {
    if (isAuthenticated()) router.replace("/admin/dashboard");
  }, [router]);

  const fe = (f: string) => fieldErrors.find(e => e.field === f)?.message;
  const set = (k: keyof typeof form) => (v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    setError("");
    setFieldErrors(p => p.filter(x => x.field !== k));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setFieldErrors([]);

    const errs: FieldError[] = [];
    if (!form.username.trim())  errs.push({ field: "username", message: "Username is required" });
    if (!form.email.trim())     errs.push({ field: "email",    message: "Email is required" });
    if (!form.password)         errs.push({ field: "password", message: "Password is required" });
    if (form.password.length < 12) errs.push({ field: "password", message: "Password must be at least 12 characters" });
    if (!bootstrapToken.trim()) errs.push({ field: "bootstrapToken", message: "Bootstrap token is required" });
    if (form.password !== form.confirm) errs.push({ field: "confirm", message: "Passwords do not match" });
    if (errs.length) { setFieldErrors(errs); return; }

    setLoading(true);
    const res = await adminApi.signup({
      username: form.username.trim(),
      email:    form.email.trim().toLowerCase(),
      password: form.password,
      fullName: form.fullName.trim() || undefined,
    }, bootstrapToken.trim());
    setLoading(false);

    if (!res.ok) {
      const r = res as { ok: false; message: string; errors?: FieldError[] };
      if (r.errors?.length) setFieldErrors(r.errors);
      else setError(r.message || "Signup failed");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = res.data as any;
    saveSession(data.token, data.user, data.expiresIn);
    router.replace("/admin/dashboard");
  };

  const inputClass = (f: string) =>
    `w-full pl-10 pr-4 py-3 border rounded-xl text-sm bg-gray-50 text-gray-900 outline-none transition-all ${
      fe(f)
        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:border-[#003262] focus:ring-2 focus:ring-[#003262]/10"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#003262] to-[#0a1a3a] flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle, #FDB515 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#003262] via-[#FDB515] to-[#003262]" />

          <div className="px-8 py-9">
            {/* Logo */}
            <div className="flex flex-col items-center mb-7">
              <div className="w-14 h-14 rounded-2xl bg-[#003262] flex items-center justify-center mb-3 shadow-lg shadow-[#003262]/30">
                <span className="text-[#FDB515] font-black text-lg">BH</span>
              </div>
              <h1 className="text-2xl font-black text-gray-900">Create Account</h1>
              <p className="text-sm text-gray-400 mt-1">Admin Portal — Birla Heritage School</p>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              <div>
                <label htmlFor="bootstrap-token" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  One-time Bootstrap Token *
                </label>
                <input
                  id="bootstrap-token"
                  type="password"
                  value={bootstrapToken}
                  onChange={(event) => {
                    setBootstrapToken(event.target.value);
                    setFieldErrors((previous) => previous.filter((item) => item.field !== "bootstrapToken"));
                  }}
                  autoComplete="off"
                  className={inputClass("bootstrapToken")}
                />
                {fe("bootstrapToken") && <p className="mt-1 text-xs text-red-500">{fe("bootstrapToken")}</p>}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </span>
                  <input type="text" value={form.fullName} onChange={e => set("fullName")(e.target.value)} placeholder="Pawan Kumar" autoComplete="name" className={inputClass("fullName")} />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </span>
                  <input type="text" value={form.username} onChange={e => set("username")(e.target.value)} placeholder="admin" autoComplete="username" autoFocus className={inputClass("username")} />
                </div>
                {fe("username") && <p className="mt-1 text-xs text-red-500">{fe("username")}</p>}
                <p className="mt-1 text-[11px] text-gray-400">Letters, numbers, dots, hyphens, underscores only</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </span>
                  <input type="email" value={form.email} onChange={e => set("email")(e.target.value)} placeholder="admin@school.com" autoComplete="email" className={inputClass("email")} />
                </div>
                {fe("email") && <p className="mt-1 text-xs text-red-500">{fe("email")}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </span>
                  <input type={showPwd ? "text" : "password"} value={form.password} onChange={e => set("password")(e.target.value)} placeholder="Min 8 characters" autoComplete="new-password"
                    className={inputClass("password").replace("pr-4", "pr-12")} />
                  <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPwd
                      ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
                {fe("password") && <p className="mt-1 text-xs text-red-500">{fe("password")}</p>}
                <PasswordStrength pwd={form.password} />
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </span>
                  <input type={showCfm ? "text" : "password"} value={form.confirm} onChange={e => set("confirm")(e.target.value)} placeholder="Re-enter password" autoComplete="new-password"
                    className={inputClass("confirm").replace("pr-4", "pr-12")} />
                  <button type="button" onClick={() => setShowCfm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showCfm
                      ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
                {fe("confirm") && <p className="mt-1 text-xs text-red-500">{fe("confirm")}</p>}
                {form.confirm && form.password === form.confirm && (
                  <p className="mt-1 text-xs text-green-600 flex items-center gap-1">✓ Passwords match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#FDB515] hover:bg-[#e5a010] text-[#003262] font-black rounded-xl transition-all text-sm tracking-wide disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-[#FDB515]/30 mt-1"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-[#003262]/30 border-t-[#003262] rounded-full animate-spin" />Creating Account…</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>Create Admin Account</>
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/admin/login" className="text-[#003262] font-bold hover:text-[#FDB515] transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">© {new Date().getFullYear()} Birla Heritage International School</p>
      </div>
    </div>
  );
}
