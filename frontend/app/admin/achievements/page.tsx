"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/lib/adminApi";
import AdminModal, { ConfirmDialog } from "@/components/admin/AdminModal";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface AchievementItem {
  id: number;
  studentName: string;
  grade: string;
  title: string;
  category: string;
  achievementDate: string;
  description?: string;
  imagePath?: string;
  isPublished: number;
  sortOrder: number;
  createdAt: string;
}

const EMPTY: Omit<AchievementItem, "id" | "createdAt"> = {
  studentName: "",
  grade: "Class 7",
  title: "",
  category: "Academic",
  achievementDate: new Date().toISOString().split("T")[0],
  description: "",
  imagePath: "",
  isPublished: 1,
  sortOrder: 0,
};

export default function AdminAchievementsPage() {
  const toast = useToast();
  const [items, setItems] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Partial<AchievementItem>>(EMPTY);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await adminApi.achievements.list("limit=100");
    if (res.ok) {
      setItems(Array.isArray(res.data) ? (res.data as AchievementItem[]) : []);
    } else {
      toast.error("Failed to load achievements");
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
  const openEdit = (item: AchievementItem) => {
    setEditItem({ ...item });
    setIsEdit(true);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem.studentName?.trim() || !editItem.title?.trim()) {
      toast.error("Student name and achievement title are required");
      return;
    }
    setSaving(true);
    const payload = {
      studentName: editItem.studentName?.trim(),
      grade: editItem.grade?.trim() || "N/A",
      title: editItem.title?.trim(),
      category: editItem.category || "Academic",
      achievementDate: editItem.achievementDate || new Date().toISOString().split("T")[0],
      description: editItem.description?.trim() || undefined,
      imagePath: editItem.imagePath?.trim() || undefined,
      isPublished: editItem.isPublished,
      sortOrder: Number(editItem.sortOrder ?? 0),
    };
    const res =
      isEdit && editItem.id
        ? await adminApi.achievements.update(editItem.id, payload)
        : await adminApi.achievements.create(payload);
    setSaving(false);
    if (res.ok) {
      toast.success(isEdit ? "Achievement updated" : "Achievement created");
      setModalOpen(false);
      fetchItems();
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  const handleToggle = async (id: number) => {
    const res = await adminApi.achievements.toggle(id);
    if (res.ok) {
      toast.success("Status updated");
      fetchItems();
    } else toast.error("Failed to update status");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await adminApi.achievements.delete(deleteId);
    setDeleting(false);
    if (res.ok) {
      toast.success("Achievement deleted");
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
          <h2 className="text-xl font-black text-gray-900">Student Achievements</h2>
          <p className="text-sm text-gray-400">{items.length} total • Manage student awards, competition wins, and honors</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#003262] text-[#FFFFFF] text-sm font-bold rounded-xl hover:bg-[#002855] transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Achievement
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Student Name", "Grade", "Title / Honor", "Category", "Date", "Status", "Actions"].map((h) => (
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
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-4 py-3.5">
                        <div className="h-3 bg-gray-100 rounded animate-pulse" style={{ width: `${40 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                    No student achievements published yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-900">{item.studentName}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-600 font-medium">{item.grade}</td>
                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="text-xs font-bold text-gray-800 line-clamp-1">{item.title}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800">{item.category}</span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500 font-medium whitespace-nowrap">{item.achievementDate}</td>
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

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={isEdit ? "Edit Achievement" : "New Achievement"} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Student Name *">
              <input value={editItem.studentName || ""} onChange={(e) => setEditItem({ ...editItem, studentName: e.target.value })} placeholder="e.g. Aarav Verma" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" required />
            </Field>
            <Field label="Grade / Class">
              <input value={editItem.grade || ""} onChange={(e) => setEditItem({ ...editItem, grade: e.target.value })} placeholder="e.g. Class 7" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
          </div>
          <Field label="Achievement Title / Honor *">
            <input value={editItem.title || ""} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} placeholder="e.g. 1st Rank in Regional Science Olympiad" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select value={editItem.category || "Academic"} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]">
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Arts">Arts & Culture</option>
                <option value="Innovation">Innovation & STEM</option>
              </select>
            </Field>
            <Field label="Achievement Date">
              <input type="date" value={editItem.achievementDate || ""} onChange={(e) => setEditItem({ ...editItem, achievementDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </Field>
          </div>
          <Field label="Description (optional)">
            <textarea value={editItem.description || ""} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} rows={3} placeholder="Details about the award or competition…" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262] resize-none" />
          </Field>
          <Field label="Photo URL (optional)">
            <input value={editItem.imagePath || ""} onChange={(e) => setEditItem({ ...editItem, imagePath: e.target.value })} placeholder="/test_student_1_1785833398588.png" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
          </Field>
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

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Achievement" message="This achievement will be permanently deleted." confirmLabel="Delete" danger loading={deleting} />
      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
