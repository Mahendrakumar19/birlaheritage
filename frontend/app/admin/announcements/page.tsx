"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/lib/adminApi";
import AdminModal, { ConfirmDialog } from "@/components/admin/AdminModal";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface Announcement {
  id: number;
  text: string;
  emoji?: string;
  linkUrl?: string;
  linkLabel?: string;
  priority: number;
  isActive: number;
  startsAt?: string;
  endsAt?: string;
  createdAt: string;
}

const EMPTY: Omit<Announcement, "id" | "createdAt"> = {
  text: "", emoji: "", linkUrl: "", linkLabel: "",
  priority: 0, isActive: 1, startsAt: "", endsAt: "",
};

export default function AdminAnnouncementsPage() {
  const toast = useToast();
  const [items, setItems]     = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem]   = useState<Partial<Announcement>>(EMPTY);
  const [isEdit, setIsEdit]       = useState(false);
  const [saving, setSaving]       = useState(false);
  const [deleteId, setDeleteId]   = useState<number | null>(null);
  const [deleting, setDeleting]   = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await adminApi.announcements.list("limit=100");
    if (res.ok) {
      setItems(Array.isArray(res.data) ? res.data as Announcement[] : []);
    } else {
      toast.error("Failed to load announcements");
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openCreate = () => { setEditItem(EMPTY); setIsEdit(false); setModalOpen(true); };
  const openEdit   = (item: Announcement) => { setEditItem({...item}); setIsEdit(true); setModalOpen(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem.text?.trim()) { toast.error("Text is required"); return; }
    setSaving(true);
    const payload = {
      text:      editItem.text?.trim(),
      emoji:     editItem.emoji?.trim() || undefined,
      linkUrl:   editItem.linkUrl?.trim() || undefined,
      linkLabel: editItem.linkLabel?.trim() || undefined,
      priority:  Number(editItem.priority ?? 0),
      isActive:  editItem.isActive,
      startsAt:  editItem.startsAt || undefined,
      endsAt:    editItem.endsAt   || undefined,
    };
    const res = isEdit && editItem.id
      ? await adminApi.announcements.update(editItem.id!, payload)
      : await adminApi.announcements.create(payload);
    setSaving(false);
    if (res.ok) {
      toast.success(isEdit ? "Announcement updated" : "Announcement created");
      setModalOpen(false);
      fetchItems();
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  const handleToggle = async (id: number) => {
    const res = await adminApi.announcements.toggle(id);
    if (res.ok) { toast.success("Status updated"); fetchItems(); }
    else toast.error("Failed to update");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await adminApi.announcements.delete(deleteId);
    setDeleting(false);
    if (res.ok) { toast.success("Announcement deleted"); setDeleteId(null); fetchItems(); }
    else toast.error((res as { ok: false; message: string }).message);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-gray-900">Announcements</h2>
          <p className="text-sm text-gray-400">{items.length} total • Manage the banner scrolling text</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#003262] text-white text-sm font-bold rounded-xl hover:bg-[#002855] transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Announcement
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Text", "Emoji", "Link", "Priority", "Status", "Schedule", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-4 py-3.5"><div className="h-3 bg-gray-100 rounded animate-pulse" style={{ width: `${40 + Math.random() * 40}%` }} /></td>
                    ))}
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No announcements yet. Create one to populate the banner.</td></tr>
              ) : (
                items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="text-sm text-gray-800 line-clamp-2 leading-snug">{item.text}</p>
                    </td>
                    <td className="px-4 py-3.5 text-xl">{item.emoji || "—"}</td>
                    <td className="px-4 py-3.5">
                      {item.linkUrl ? (
                        <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="text-[#003262] text-xs hover:underline flex items-center gap-1">
                          {item.linkLabel || item.linkUrl}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      ) : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{item.priority}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => handleToggle(item.id)} className={`text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${item.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                        {item.isActive ? "ACTIVE" : "INACTIVE"}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">
                      {item.startsAt ? <span>{item.startsAt.slice(0, 10)}</span> : "—"}
                      {item.endsAt ? <><br />→ {item.endsAt.slice(0, 10)}</> : ""}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-[#003262] hover:bg-[#003262]/10 rounded-lg transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
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
      </div>

      {/* Create/Edit Modal */}
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={isEdit ? "Edit Announcement" : "New Announcement"} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Announcement Text *">
            <textarea value={editItem.text || ""} onChange={e => setEditItem({...editItem, text: e.target.value})} rows={3} placeholder="Scrolling banner text…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262] resize-none" required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Emoji (optional)">
              <input value={editItem.emoji || ""} onChange={e => setEditItem({...editItem, emoji: e.target.value})} placeholder="🎓" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
            <Field label="Priority (higher = first)">
              <input type="number" value={editItem.priority ?? 0} onChange={e => setEditItem({...editItem, priority: Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
            <Field label="Link URL (optional)">
              <input value={editItem.linkUrl || ""} onChange={e => setEditItem({...editItem, linkUrl: e.target.value})} placeholder="/admissions" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
            <Field label="Link Label (optional)">
              <input value={editItem.linkLabel || ""} onChange={e => setEditItem({...editItem, linkLabel: e.target.value})} placeholder="Apply Now" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
            <Field label="Start Date (optional)">
              <input type="date" value={editItem.startsAt?.slice(0, 10) || ""} onChange={e => setEditItem({...editItem, startsAt: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
            <Field label="End Date (optional)">
              <input type="date" value={editItem.endsAt?.slice(0, 10) || ""} onChange={e => setEditItem({...editItem, endsAt: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button type="button" onClick={() => setEditItem({...editItem, isActive: editItem.isActive ? 0 : 1})} className={`relative w-11 h-6 rounded-full transition-colors ${editItem.isActive ? 'bg-[#003262]' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${editItem.isActive ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-gray-600">Active (show in banner)</span>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-bold text-white bg-[#003262] rounded-lg disabled:opacity-60">{saving ? "Saving…" : isEdit ? "Update" : "Create"}</button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Announcement" message="This announcement will be permanently deleted." confirmLabel="Delete" danger loading={deleting} />
      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
