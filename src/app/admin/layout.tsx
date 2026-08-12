"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { clearSession, saveSession } from "@/lib/adminAuth";
import { adminApi } from "@/lib/adminApi";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface Notification {
  id: string;
  type: "admission" | "contact";
  message: string;
  time: string;
  read: boolean;
}

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard":     "Dashboard",
  "/admin/gallery":       "Gallery Manager",
  "/admin/announcements": "Announcement Manager",
  "/admin/admissions":    "Admission Enquiries",
  "/admin/contacts":      "Contact Messages",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const toast    = useToast();

  // All hooks declared unconditionally (Rules of Hooks)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newAdmissions, setNewAdmissions] = useState(0);
  const [newContacts, setNewContacts]     = useState(0);

  const prevAdm    = useRef(0);
  const prevCon    = useRef(0);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollInitialized = useRef(false);

  const isPublicPage = pathname === "/admin/login" || pathname === "/admin/signup";
  const pageTitle   = PAGE_TITLES[pathname] || "Admin Panel";

  // Verify the HttpOnly-cookie session with the backend on every protected load.
  useEffect(() => {
    if (isPublicPage) return;
    let active = true;
    adminApi.verify().then((result) => {
      if (!active) return;
      if (!result.ok) {
        clearSession();
        router.replace("/admin/login");
        return;
      }
      const payload = result.data as { user?: Parameters<typeof saveSession>[1] };
      if (payload.user) saveSession(undefined, payload.user);
      setAuthChecked(true);
    });
    return () => { active = false; };
  }, [router, isPublicPage]);

  // Live polling — every 30 seconds
  const poll = useCallback(async () => {
    try {
      const [admResult, conResult] = await Promise.all([
        adminApi.admissions.list("limit=1&status=new"),
        adminApi.contacts.list("limit=1&status=new"),
      ]);

      if (!admResult.ok || !conResult.ok) return;
      const admCount = admResult.meta?.total ?? 0;
      const conCount = conResult.meta?.total ?? 0;

      setNewAdmissions(admCount);
      setNewContacts(conCount);

      const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

      if (pollInitialized.current && admCount > prevAdm.current) {
        const diff = admCount - prevAdm.current;
        const notif: Notification = {
          id: `adm-${Date.now()}`,
          type: "admission",
          message: `${diff} new admission enquir${diff > 1 ? "ies" : "y"} received`,
          time: now, read: false,
        };
        setNotifications(p => [notif, ...p].slice(0, 20));
        toast.info(notif.message);
      }
      if (pollInitialized.current && conCount > prevCon.current) {
        const diff = conCount - prevCon.current;
        const notif: Notification = {
          id: `con-${Date.now()}`,
          type: "contact",
          message: `${diff} new contact message${diff > 1 ? "s" : ""} received`,
          time: now, read: false,
        };
        setNotifications(p => [notif, ...p].slice(0, 20));
        toast.info(notif.message);
      }

      prevAdm.current = admCount;
      prevCon.current = conCount;
      pollInitialized.current = true;
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    poll();
    pollingRef.current = setInterval(poll, 30_000);
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [authChecked, poll]);

  // ─── LOGIN PAGE: render children only (no sidebar, no auth spinner) ──────────
  if (isPublicPage) {
    return <>{children}</>;
  }

  // ─── Protected pages: show spinner while verifying ───────────────────────────
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#FDB515] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/50 text-sm">Verifying session…</p>
        </div>
      </div>
    );
  }

  // ─── Authenticated shell ──────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <AdminSidebar newAdmissions={newAdmissions} newContacts={newContacts} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <AdminSidebar
              newAdmissions={newAdmissions}
              newContacts={newContacts}
              mobile
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          title={pageTitle}
          onMenuClick={() => setSidebarOpen(true)}
          notifications={notifications}
          onClearNotifications={() => setNotifications([])}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>

      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
