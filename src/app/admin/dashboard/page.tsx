"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/adminApi";
import AdminStatsCard from "@/components/admin/AdminStatsCard";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalGallery: 0, activeGallery: 0,
    totalAnnouncements: 0,
    totalAdmissions: 0, newAdmissions: 0,
    totalContacts: 0, newContacts: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState<unknown[]>([]);
  const [recentContacts, setRecentContacts] = useState<unknown[]>([]);

  useEffect(() => {
    async function load() {

      setLoading(true);

      // ── Stats ──────────────────────────────────────────────────────────────
      const [gallAll, gallActive, annAll, admAll, admNew, conAll, conNew] =
        await adminApi.stats();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getTotal = (r: any): number => {
        if (!r.ok) return 0;
        // meta.total at top level (from request() which copies json.meta)
        if (typeof r.meta?.total === 'number') return r.meta.total;
        // fallback: count items in data array
        if (Array.isArray(r.data)) return r.data.length;
        return 0;
      };

      setStats({
        totalGallery:       getTotal(gallAll),
        activeGallery:      getTotal(gallActive),
        totalAnnouncements: getTotal(annAll),
        totalAdmissions:    getTotal(admAll),
        newAdmissions:      getTotal(admNew),
        totalContacts:      getTotal(conAll),
        newContacts:        getTotal(conNew),
      });

      // ── Recent items ───────────────────────────────────────────────────────
      const [admRecent, conRecent] = await Promise.all([
        adminApi.admissions.list('limit=5&offset=0'),
        adminApi.contacts.list('limit=5&offset=0'),
      ]);

      if (admRecent.ok) {
        // data is already the items array (request() does: data = json.data ?? json)
        const arr = Array.isArray(admRecent.data)
          ? admRecent.data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          : ((admRecent.data as any)?.data ?? []);
        setRecentAdmissions(arr as unknown[]);
      }

      if (conRecent.ok) {
        const arr = Array.isArray(conRecent.data)
          ? conRecent.data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          : ((conRecent.data as any)?.data ?? []);
        setRecentContacts(arr as unknown[]);
      }

      setLoading(false);
    }
    load();
  }, []);

  const iconGallery = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
  const iconAnn = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>;
  const iconAdm = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
  const iconCon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-gray-900">Overview</h2>
          <p className="text-sm text-gray-400 mt-0.5">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/admissions" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#003262] text-white text-sm font-semibold rounded-xl hover:bg-[#002855] transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Admissions
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatsCard label="Total Gallery" value={stats.totalGallery} sub={`${stats.activeGallery} active`} icon={iconGallery} color="blue" loading={loading} />
        <AdminStatsCard label="Announcements" value={stats.totalAnnouncements} sub="banner items" icon={iconAnn} color="gold" loading={loading} />
        <AdminStatsCard label="Admissions" value={stats.totalAdmissions} sub={stats.newAdmissions > 0 ? `${stats.newAdmissions} new 🔴` : "all reviewed"} icon={iconAdm} color="green" loading={loading} />
        <AdminStatsCard label="Contact Messages" value={stats.totalContacts} sub={stats.newContacts > 0 ? `${stats.newContacts} unread 🔴` : "all read"} icon={iconCon} color="purple" loading={loading} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: "/admin/gallery", label: "Add Image", icon: "M12 4v16m8-8H4", color: "bg-[#003262]" },
          { href: "/admin/announcements", label: "New Announcement", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", color: "bg-[#FDB515]" },
          { href: "/admin/admissions", label: "View Admissions", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "bg-emerald-600" },
          { href: "/admin/contacts", label: "View Messages", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "bg-purple-600" },
        ].map(a => (
          <Link key={a.href} href={a.href} className={`${a.color} text-white rounded-xl p-4 flex items-center gap-3 hover:opacity-90 transition-opacity shadow-sm`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
            </svg>
            <span className="font-semibold text-sm leading-tight">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent tables */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent Admissions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">Recent Admissions</h3>
            <Link href="/admin/admissions" className="text-xs text-[#003262] font-semibold hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                    <div className="h-2.5 bg-gray-100 rounded animate-pulse w-1/3" />
                  </div>
                </div>
              ))
            ) : recentAdmissions.length === 0 ? (
              <p className="px-5 py-8 text-center text-gray-400 text-sm">No admissions yet</p>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (recentAdmissions as any[]).map((item: any) => (
                <div key={item.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#003262]/10 text-[#003262] flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {(item.studentFirstName?.[0] || 'A').toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.studentFirstName} {item.studentLastName}
                    </p>
                    <p className="text-xs text-gray-400">Grade {item.grade} • {item.phone}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    item.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    item.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status?.toUpperCase()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">Recent Messages</h3>
            <Link href="/admin/contacts" className="text-xs text-[#003262] font-semibold hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                    <div className="h-2.5 bg-gray-100 rounded animate-pulse w-2/3" />
                  </div>
                </div>
              ))
            ) : recentContacts.length === 0 ? (
              <p className="px-5 py-8 text-center text-gray-400 text-sm">No messages yet</p>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (recentContacts as any[]).map((item: any) => (
                <div key={item.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {(item.name?.[0] || 'M').toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 truncate">{item.message?.slice(0, 60)}…</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    item.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'replied' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status?.toUpperCase()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
