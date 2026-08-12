"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface AdminSidebarProps {
  newAdmissions?: number;
  newContacts?: number;
  onClose?: () => void;
  mobile?: boolean;
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export default function AdminSidebar({ newAdmissions = 0, newContacts = 0, onClose, mobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <NavIcon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    },
    {
      label: "Gallery",
      href: "/admin/gallery",
      icon: <NavIcon d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    },
    {
      label: "Announcements",
      href: "/admin/announcements",
      icon: <NavIcon d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />,
    },
    {
      label: "Admissions",
      href: "/admin/admissions",
      badge: newAdmissions,
      icon: <NavIcon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    },
    {
      label: "Contact Messages",
      href: "/admin/contacts",
      badge: newContacts,
      icon: <NavIcon d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    },
    {
      label: "Mandatory Disclosures",
      href: "/admin/disclosures",
      icon: <NavIcon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    },
  ];

  return (
    <aside className={`flex flex-col h-full bg-[#0f172a] text-white ${mobile ? 'w-72' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-[#FDB515] flex items-center justify-center flex-shrink-0">
          <span className="text-[#003262] font-black text-sm">BH</span>
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm text-white leading-tight truncate">Birla Heritage</p>
          <p className="text-[11px] text-white/50 leading-tight">Admin Panel</p>
        </div>
        {mobile && onClose && (
          <button onClick={onClose} className="ml-auto text-white/50 hover:text-white p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-3 pb-2">Main Menu</p>
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                active
                  ? 'bg-[#003262] text-white shadow-lg shadow-[#003262]/30'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              }`}
            >
              <span className={active ? 'text-[#FDB515]' : 'text-white/50 group-hover:text-white/80 transition-colors'}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              ) : null}
              {active && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#FDB515] rounded-l-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all"
        >
          <NavIcon d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          View Website
        </Link>
      </div>
    </aside>
  );
}
