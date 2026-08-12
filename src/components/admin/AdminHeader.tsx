"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { clearToken } from "@/lib/adminAuth";
import { adminApi } from "@/lib/adminApi";

interface Notification {
  id: string;
  type: "admission" | "contact";
  message: string;
  time: string;
  read: boolean;
}

interface AdminHeaderProps {
  title: string;
  onMenuClick: () => void;
  notifications?: Notification[];
  onClearNotifications?: () => void;
}

export default function AdminHeader({ title, onMenuClick, notifications = [], onClearNotifications }: AdminHeaderProps) {
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await adminApi.logout();
    clearToken();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center gap-4 px-4 md:px-6 flex-shrink-0">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page title */}
      <h1 className="text-lg font-bold text-gray-800 flex-1 truncate">{title}</h1>

      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(o => !o)}
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none animate-pulse">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-800 text-sm">Notifications</span>
                {notifications.length > 0 && (
                  <button onClick={onClearNotifications} className="text-xs text-blue-600 hover:underline">
                    Clear all
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-400 text-sm">
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === 'admission' ? 'bg-[#003262]' : 'bg-[#FDB515]'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 leading-tight">{n.message}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
