"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/lib/adminApi";
import AdminModal, { ConfirmDialog } from "@/components/admin/AdminModal";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  quote: string;
  imagePath: string;
  rating: number;
  sortOrder: number;
  isPublished: number;
  createdAt: string;
}

const EMPTY: Omit<TestimonialItem, "id" | "createdAt"> = {
  name: "",
  role: "Mother of Class 2 Student",
  quote: "",
  imagePath: "/parent_avatar_1.png",
  rating: 5,
  sortOrder: 0,
  isPublished: 1,
};

export default function AdminTestimonialsPage() {
  const toast = useToast();
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Partial<TestimonialItem>>(EMPTY);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await adminApi.testimonials.list("limit=100");
    if (res.ok) {
      setItems(Array.isArray(res.data) ? (res.data as TestimonialItem[]) : []);
    } else {
      toast.error("Failed to load testimonials");
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
  const openEdit = (item: TestimonialItem) => {
    setEditItem({ ...item });
    setIsEdit(true);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem.name?.trim() || !editItem.quote?.trim()) {
      toast.error("Name and quote are required");
      return;
    }
    setSaving(true);
    const payload = {
      name: editItem.name?.trim(),
      role: editItem.role?.trim() || "Parent",
      quote: editItem.quote?.trim(),
      imagePath: editItem.imagePath?.trim() || "/parent_avatar_1.png",
      rating: Number(editItem.rating ?? 5),
      sortOrder: Number(editItem.sortOrder ?? 0),
      isPublished: editItem.isPublished,
    };
    const res =
      isEdit && editItem.id
        ? await adminApi.testimonials.update(editItem.id, payload)
        : await adminApi.testimonials.create(payload);
    setSaving(false);
    if (res.ok) {
      toast.success(isEdit ? "Testimonial updated" : "Testimonial created");
      setModalOpen(false);
      fetchItems();
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  const handleToggle = async (id: number) => {
    const res = await adminApi.testimonials.toggle(id);
    if (res.ok) {
      toast.success("Status updated");
      fetchItems();
    } else toast.error("Failed to update status");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await adminApi.testimonials.delete(deleteId);
    setDeleting(false);
    if (res.ok) {
      toast.success("Testimonial deleted");
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
          <h2 className="text-xl font-black text-gray-900">Parent Testimonials</h2>
          <p className="text-sm text-gray-400">{items.length} total • Manage verified parent reviews & feedback</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#003262] text-white text-sm font-bold rounded-xl hover:bg-[#002855] transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Testimonial
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Parent Name", "Role / Student", "Quote", "Rating", "Status", "Actions"].map((h) => (
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
                    No testimonials published yet. Create one to display parent reviews.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-900">{item.name}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-600 font-medium">{item.role}</td>
                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="text-xs text-gray-700 italic line-clamp-2">&quot;{item.quote}&quot;</p>
                    </td>
                    <td className="px-4 py-3.5 text-xs font-bold text-amber-500">{"★".repeat(item.rating)}</td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => handleToggle(item.id)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${
                          item.isPublished ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {item.isPublished ? "PUBLISHED" : "DRAFT"}
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

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={isEdit ? "Edit Testimonial" : "New Testimonial"} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Parent Name *">
              <input value={editItem.name || ""} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} placeholder="e.g. Priya Sharma" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" required />
            </Field>
            <Field label="Parent Role / Student *">
              <input value={editItem.role || ""} onChange={(e) => setEditItem({ ...editItem, role: e.target.value })} placeholder="e.g. Mother of Class 2 Student" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" required />
            </Field>
          </div>
          <Field label="Testimonial Quote *">
            <textarea value={editItem.quote || ""} onChange={(e) => setEditItem({ ...editItem, quote: e.target.value })} rows={3} placeholder="Parent feedback and testimonial statement…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262] resize-none" required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Avatar Image URL">
              <input value={editItem.imagePath || ""} onChange={(e) => setEditItem({ ...editItem, imagePath: e.target.value })} placeholder="/parent_avatar_1.png" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
            <Field label="Rating (1 to 5)">
              <input type="number" min={1} max={5} value={editItem.rating ?? 5} onChange={(e) => setEditItem({ ...editItem, rating: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
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

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Testimonial" message="This testimonial will be permanently deleted." confirmLabel="Delete" danger loading={deleting} />
      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
