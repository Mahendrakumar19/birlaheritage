"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/lib/adminApi";
import AdminModal, { ConfirmDialog } from "@/components/admin/AdminModal";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface LeadershipItem {
  id: number;
  name: string;
  designation: string;
  roleTag: string;
  imagePath: string;
  bio: string;
  message: string;
  sortOrder: number;
  isPlaceholder: number;
  isPublished: number;
  createdAt: string;
}

const EMPTY: Omit<LeadershipItem, "id" | "createdAt"> = {
  name: "",
  designation: "Principal",
  roleTag: "Principal's Office",
  imagePath: "/team_placeholder.jpeg",
  bio: "",
  message: "",
  sortOrder: 3,
  isPlaceholder: 1,
  isPublished: 0, // Unpublished by default for safe principal placeholders!
};

export default function AdminLeadershipPage() {
  const toast = useToast();
  const [items, setItems] = useState<LeadershipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Partial<LeadershipItem>>(EMPTY);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await adminApi.leadership.list("limit=100");
    if (res.ok) {
      setItems(Array.isArray(res.data) ? (res.data as LeadershipItem[]) : []);
    } else {
      toast.error("Failed to load leadership profiles");
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    setEditItem(EMPTY);
    setIsEdit(false);
    setModalOpen(true);
  };
  const openEdit = (item: LeadershipItem) => {
    setEditItem({ ...item });
    setIsEdit(true);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem.name?.trim() || !editItem.designation?.trim()) {
      toast.error("Name and designation are required");
      return;
    }
    setSaving(true);
    const payload = {
      name: editItem.name?.trim(),
      designation: editItem.designation?.trim(),
      roleTag: editItem.roleTag?.trim() || "Leadership Office",
      imagePath: editItem.imagePath?.trim() || "/team_placeholder.jpeg",
      bio: editItem.bio?.trim() || "",
      message: editItem.message?.trim() || "",
      sortOrder: Number(editItem.sortOrder ?? 0),
      isPlaceholder: editItem.isPlaceholder,
      isPublished: editItem.isPublished,
    };
    const res =
      isEdit && editItem.id
        ? await adminApi.leadership.update(editItem.id, payload)
        : await adminApi.leadership.create(payload);
    setSaving(false);
    if (res.ok) {
      toast.success(isEdit ? "Leadership profile updated" : "Leadership profile created");
      setModalOpen(false);
      fetchItems();
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  const handleToggle = async (id: number) => {
    const res = await adminApi.leadership.toggle(id);
    if (res.ok) {
      toast.success("Publication status updated");
      fetchItems();
    } else toast.error("Failed to update status");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await adminApi.leadership.delete(deleteId);
    setDeleting(false);
    if (res.ok) {
      toast.success("Leadership profile deleted");
      setDeleteId(null);
      fetchItems();
    } else toast.error((res as { ok: false; message: string }).message);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-gray-900">Leadership Profiles</h2>
          <p className="text-sm text-gray-400">{items.length} total • Manage Chairman, Director, and Principal profiles</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#003262] text-white text-sm font-bold rounded-xl hover:bg-[#002855] transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Profile
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Name", "Designation", "Role Tag", "Order", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-4 py-3.5">
                        <div className="h-3 bg-gray-100 rounded animate-pulse" style={{ width: `${40 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    No leadership profiles configured yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-900">{item.name}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-700 font-semibold">{item.designation}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-500">{item.roleTag}</td>
                    <td className="px-4 py-3.5 text-xs font-bold text-gray-600">{item.sortOrder}</td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleToggle(item.id)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${
                          item.isPublished ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        {item.isPublished ? "PUBLISHED" : "UNPUBLISHED"}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-[#003262] hover:bg-[#003262]/10 rounded-lg transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={isEdit ? "Edit Leadership Profile" : "New Leadership Profile"} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name *">
              <input value={editItem.name || ""} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} placeholder="e.g. Nitya Singh" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" required />
            </Field>
            <Field label="Designation *">
              <input value={editItem.designation || ""} onChange={(e) => setEditItem({ ...editItem, designation: e.target.value })} placeholder="e.g. Chairman / Principal" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" required />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Role Tag">
              <input value={editItem.roleTag || ""} onChange={(e) => setEditItem({ ...editItem, roleTag: e.target.value })} placeholder="e.g. Chairman's Message" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
            <Field label="Photo URL">
              <input value={editItem.imagePath || ""} onChange={(e) => setEditItem({ ...editItem, imagePath: e.target.value })} placeholder="/team_placeholder.jpeg" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
          </div>
          <Field label="Biography Summary">
            <textarea value={editItem.bio || ""} onChange={(e) => setEditItem({ ...editItem, bio: e.target.value })} rows={2} placeholder="Leadership background summary…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262] resize-none" />
          </Field>
          <Field label="Official Message">
            <textarea value={editItem.message || ""} onChange={(e) => setEditItem({ ...editItem, message: e.target.value })} rows={4} placeholder="Official institutional message to parents and students…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262] resize-none" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sort Order">
              <input type="number" value={editItem.sortOrder ?? 0} onChange={(e) => setEditItem({ ...editItem, sortOrder: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" id="placeholderCheck" checked={!!editItem.isPlaceholder} onChange={(e) => setEditItem({ ...editItem, isPlaceholder: e.target.checked ? 1 : 0 })} className="rounded border-gray-300 text-[#003262]" />
              <label htmlFor="placeholderCheck" className="text-xs text-gray-700 font-medium">Mark as Pending Placeholder</label>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button type="button" onClick={() => setEditItem({ ...editItem, isPublished: editItem.isPublished ? 0 : 1 })} className={`relative w-11 h-6 rounded-full transition-colors ${editItem.isPublished ? "bg-[#003262]" : "bg-gray-200"}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${editItem.isPublished ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-sm text-gray-600">Published (visible on website)</span>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-bold text-white bg-[#003262] rounded-lg disabled:opacity-60">{saving ? "Saving…" : isEdit ? "Update" : "Create"}</button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Leadership Profile" message="This profile will be permanently deleted." confirmLabel="Delete" danger loading={deleting} />
      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
