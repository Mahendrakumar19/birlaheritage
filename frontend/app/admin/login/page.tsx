"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/adminApi";
import { saveSession, isAuthenticated } from "@/lib/adminAuth";

interface FieldError { field: string; message: string; }

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  useEffect(() => {
    if (isAuthenticated()) router.replace("/admin/dashboard");
  }, [router]);

  const fieldError = (f: string) => fieldErrors.find(e => e.field === f)?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setFieldErrors([]);

    const errs: FieldError[] = [];
    if (!username.trim()) errs.push({ field: "username", message: "Username or email is required" });
    if (!password)        errs.push({ field: "password", message: "Password is required" });
    if (errs.length) { setFieldErrors(errs); return; }

    setLoading(true);
    const res = await adminApi.login(username.trim(), password);
    setLoading(false);

    if (!res.ok) {
      const r = res as { ok: false; message: string; errors?: FieldError[] };
      if (r.errors?.length) setFieldErrors(r.errors);
      else setError(r.message || "Login failed");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = res.data as any;
    saveSession(data.token, data.user, data.expiresIn);
    router.replace("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#003262] to-[#0a1a3a] flex items-center justify-center p-4">
      {/* dot grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle, #FDB515 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#003262] via-[#FDB515] to-[#003262]" />

          <div className="px-8 py-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#003262] flex items-center justify-center mb-4 shadow-lg shadow-[#003262]/30">
                <span className="text-[#FDB515] font-black text-xl">BH</span>
              </div>
              <h1 className="text-2xl font-black text-gray-900">Welcome Back</h1>
              <p className="text-sm text-gray-400 mt-1 text-center">Birla Heritage International School — Admin Portal</p>
            </div>

            {/* Global error */}
            {error && (
              <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username or Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={e => { setUsername(e.target.value); setError(""); setFieldErrors(p => p.filter(x => x.field !== "username")); }}
                    placeholder="admin or admin@school.com"
                    autoComplete="username"
                    autoFocus
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm bg-gray-50 text-gray-900 outline-none transition-all ${
                      fieldError("username")
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#003262] focus:ring-2 focus:ring-[#003262]/10"
                    }`}
                  />
                </div>
                {fieldError("username") && <p className="mt-1.5 text-xs text-red-500">{fieldError("username")}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); setFieldErrors(p => p.filter(x => x.field !== "password")); }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl text-sm bg-gray-50 text-gray-900 outline-none transition-all ${
                      fieldError("password")
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-[#003262] focus:ring-2 focus:ring-[#003262]/10"
                    }`}
                  />
                  <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPwd
                      ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
                {fieldError("password") && <p className="mt-1.5 text-xs text-red-500">{fieldError("password")}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#003262] hover:bg-[#002855] text-white font-bold rounded-xl transition-all text-sm tracking-wide disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-[#003262]/20 mt-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>Sign In</>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/admin/signup" className="text-[#003262] font-bold hover:text-[#FDB515] transition-colors">
                  Create Account
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
