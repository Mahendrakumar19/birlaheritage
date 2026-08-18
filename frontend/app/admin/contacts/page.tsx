"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/lib/adminApi";
import AdminModal, { ConfirmDialog } from "@/components/admin/AdminModal";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  ipAddress?: string;
  createdAt: string;
}

const STATUSES = ["new", "read", "replied", "archived"];
const STATUS_COLOR: Record<string, string> = {
  new:      "bg-blue-100 text-blue-700",
  read:     "bg-gray-100 text-gray-600",
  replied:  "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-400",
};

export default function AdminContactsPage() {
  const toast = useToast();
  const [items, setItems]       = useState<ContactMessage[]>([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");
  const [page, setPage]         = useState(1);
  const [viewItem, setViewItem] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [statusLoading, setStatusLoading] = useState<number | null>(null);
  const [refetch, setRefetch] = useState(0);

  const PER_PAGE = 15;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchItems() {
      setLoading(true);
      const params = [
        `limit=${PER_PAGE}`,
        `offset=${(page - 1) * PER_PAGE}`,
        filter !== "all" ? `status=${filter}` : "",
      ].filter(Boolean).join("&");

      const res = await adminApi.contacts.list(params);
      if (controller.signal.aborted) return;

      if (res.ok) {
        const arr = Array.isArray(res.data) ? res.data : [];
        setItems(arr as ContactMessage[]);
        setTotal(res.meta?.total ?? arr.length);
      } else {
        toast.error("Failed to load messages");
      }
      setLoading(false);
    }

    fetchItems();
    return () => controller.abort();
  }, [filter, page, refetch]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStatus = async (id: number, status: string) => {
    setStatusLoading(id);
    const res = await adminApi.contacts.updateStatus(id, status);
    setStatusLoading(null);
    if (res.ok) { toast.success("Status updated"); setRefetch(r => r + 1); }
    else toast.error((res as { ok: false; message: string }).message);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await adminApi.contacts.delete(deleteId);
    setDeleting(false);
    if (res.ok) { toast.success("Message deleted"); setDeleteId(null); setRefetch(r => r + 1); }
    else toast.error((res as { ok: false; message: string }).message);
  };

  const openView = (item: ContactMessage) => {
    setViewItem(item);
    if (item.status === "new") handleStatus(item.id, "read");
  };

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-gray-900">Contact Messages</h2>
          <p className="text-sm text-gray-400">{total} total messages</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${filter === s ? "bg-[#003262] text-white shadow" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Message list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["#", "Name", "Email", "Subject", "Message Preview", "Date", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(8)].map((_, j) => (
                      <td key={j} className="px-4 py-3.5"><div className="h-3 bg-gray-100 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400">No messages found</td></tr>
              ) : (
                items.map(item => (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${item.status === "new" ? "font-semibold bg-blue-50/30" : ""}`}
                    onClick={() => openView(item)}
                  >
                    <td className="px-4 py-3.5 text-xs text-gray-400 font-mono" onClick={e => e.stopPropagation()}>{item.id}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {item.name[0].toUpperCase()}
                        </div>
                        <span className="text-gray-800 whitespace-nowrap">{item.name}</span>
                        {item.status === "new" && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs">{item.email}</td>
                    <td className="px-4 py-3.5 text-gray-600 text-xs max-w-[120px] truncate">{item.subject || "—"}</td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs max-w-[200px]">
                      <span className="line-clamp-1">{item.message}</span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                      <select
                        value={item.status}
                        disabled={statusLoading === item.id}
                        onChange={e => handleStatus(item.id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLOR[item.status]} disabled:opacity-50`}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}>
                      <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
            <p className="text-xs text-gray-400">Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, total)} of {total}</p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">← Prev</button>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const n = i + 1;
                return <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${page === n ? 'bg-[#003262] text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>{n}</button>;
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50">Next →</button>
            </div>
          </div>
        )}
      </div>

      {/* Message View Modal */}
      <AdminModal open={!!viewItem} onClose={() => setViewItem(null)} title="Contact Message" size="lg">
        {viewItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 font-black text-lg flex items-center justify-center">
                {viewItem.name[0]}
              </div>
              <div>
                <p className="font-black text-gray-900">{viewItem.name}</p>
                <p className="text-sm text-gray-400">{viewItem.email}</p>
              </div>
              <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_COLOR[viewItem.status]}`}>{viewItem.status.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Phone", viewItem.phone || "—"],
                ["Subject", viewItem.subject || "—"],
                ["Submitted", new Date(viewItem.createdAt).toLocaleString('en-IN')],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{k}</p>
                  <p className="text-gray-800 font-medium mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Message</p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{viewItem.message}</div>
            </div>
            <div className="flex gap-2 flex-wrap pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400 w-full mb-1">Update status:</p>
              {STATUSES.map(s => (
                <button key={s} onClick={() => { handleStatus(viewItem.id, s); setViewItem({...viewItem, status: s}); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${viewItem.status === s ? STATUS_COLOR[s] + ' ring-2 ring-offset-1 ring-current' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </AdminModal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Message" message="This contact message will be permanently deleted." confirmLabel="Delete" danger loading={deleting} />
      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
