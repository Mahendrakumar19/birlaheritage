"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/lib/adminApi";
import AdminModal, { ConfirmDialog } from "@/components/admin/AdminModal";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface Admission {
  id: number;
  studentFirstName: string;
  studentLastName?: string;
  studentDob: string;
  studentAadhaar: string;
  grade: string;
  parentGuardianName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  pinCode: string;
  status: string;
  createdAt: string;
}

const STATUSES = ["new", "under_review", "accepted", "rejected", "archived"];
const STATUS_COLOR: Record<string, string> = {
  new:          "bg-blue-100 text-blue-700",
  under_review: "bg-yellow-100 text-yellow-700",
  accepted:     "bg-green-100 text-green-700",
  rejected:     "bg-red-100 text-red-700",
  archived:     "bg-gray-100 text-gray-500",
};

export default function AdminAdmissionsPage() {
  const toast = useToast();
  const [items, setItems]       = useState<Admission[]>([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");
  const [page, setPage]         = useState(1);
  const [viewItem, setViewItem] = useState<Admission | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [statusLoading, setStatusLoading] = useState<number | null>(null);
  const [refetch, setRefetch] = useState(0); // increment to re-trigger fetch

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

      const res = await adminApi.admissions.list(params);
      if (controller.signal.aborted) return;

      if (res.ok) {
        const arr = Array.isArray(res.data) ? res.data : [];
        setItems(arr as Admission[]);
        setTotal(res.meta?.total ?? arr.length);
      } else {
        toast.error("Failed to load admissions");
      }
      setLoading(false);
    }

    fetchItems();
    return () => controller.abort();
  }, [filter, page, refetch]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStatus = async (id: number, status: string) => {
    setStatusLoading(id);
    const res = await adminApi.admissions.updateStatus(id, status);
    setStatusLoading(null);
    if (res.ok) { toast.success("Status updated"); setRefetch(r => r + 1); }
    else toast.error((res as { ok: false; message: string }).message);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await adminApi.admissions.delete(deleteId);
    setDeleting(false);
    if (res.ok) { toast.success("Record deleted"); setDeleteId(null); setRefetch(r => r + 1); }
    else toast.error((res as { ok: false; message: string }).message);
  };

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-gray-900">Admission Enquiries</h2>
          <p className="text-sm text-gray-400">{total} total enquiries</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${filter === s ? "bg-[#003262] text-white shadow" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["#", "Student", "Grade", "Parent/Guardian", "Phone", "Date", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(8)].map((_, j) => (
                      <td key={j} className="px-4 py-3.5"><div className="h-3 bg-gray-100 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400">No records found</td></tr>
              ) : (
                items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 text-xs text-gray-400 font-mono">{item.id}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-gray-800">{item.studentFirstName} {item.studentLastName}</p>
                      <p className="text-xs text-gray-400">{item.email}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="bg-[#003262]/10 text-[#003262] text-xs font-bold px-2 py-0.5 rounded-full uppercase">{item.grade}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{item.parentGuardianName}</td>
                    <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{item.phone}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3.5">
                      <select
                        value={item.status}
                        disabled={statusLoading === item.id}
                        onChange={e => handleStatus(item.id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLOR[item.status]} disabled:opacity-50`}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s.replace("_", " ").toUpperCase()}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewItem(item)} className="p-1.5 text-gray-400 hover:text-[#003262] hover:bg-[#003262]/10 rounded-lg transition-colors" title="View">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                        <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
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
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors">← Prev</button>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                const n = i + 1;
                return (
                  <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${page === n ? 'bg-[#003262] text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>{n}</button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors">Next →</button>
            </div>
          </div>
        )}
      </div>

      {/* View Detail Modal */}
      <AdminModal open={!!viewItem} onClose={() => setViewItem(null)} title="Admission Enquiry Details" size="lg">
        {viewItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-[#003262]/10 text-[#003262] font-black text-lg flex items-center justify-center">
                {viewItem.studentFirstName[0]}
              </div>
              <div>
                <p className="font-black text-gray-900">{viewItem.studentFirstName} {viewItem.studentLastName}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLOR[viewItem.status]}`}>{viewItem.status.toUpperCase()}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Grade", viewItem.grade.toUpperCase()],
                ["DOB", viewItem.studentDob],
                ["Aadhaar", `XXXX XXXX ${viewItem.studentAadhaar?.slice(-4)}`],
                ["Parent/Guardian", viewItem.parentGuardianName],
                ["Phone", viewItem.phone],
                ["Email", viewItem.email],
                ["Address", `${viewItem.streetAddress}, ${viewItem.city}, ${viewItem.state} - ${viewItem.pinCode}`],
                ["Submitted", new Date(viewItem.createdAt).toLocaleString('en-IN')],
              ].map(([k, v]) => (
                <div key={k} className={k === "Address" ? "col-span-2" : ""}>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{k}</p>
                  <p className="text-gray-800 font-medium mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100 flex-wrap">
              {STATUSES.map(s => (
                <button key={s} onClick={() => { handleStatus(viewItem.id, s); setViewItem({...viewItem, status: s}); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${viewItem.status === s ? STATUS_COLOR[s] + ' ring-2 ring-offset-1 ring-current' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {s.replace("_", " ").toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </AdminModal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Record" message="This admission record will be permanently deleted." confirmLabel="Delete" danger loading={deleting} />
      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
