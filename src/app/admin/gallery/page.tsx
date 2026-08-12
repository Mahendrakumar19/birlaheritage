"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { adminApi, BACKEND } from "@/lib/adminApi";
import AdminModal, { ConfirmDialog } from "@/components/admin/AdminModal";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface GalleryItem {
  id: number;
  collection: string;
  title: string;
  description?: string;
  imagePath: string;
  altText?: string;
  sortOrder: number;
  isActive: number;
  createdAt: string;
}

const COLLECTIONS = ["campus", "students-corner"];

function resolveImg(p: string) {
  if (!p) return "";
  return p.startsWith("/uploads/") ? `${BACKEND}${p}` : p;
}

export default function AdminGalleryPage() {
  const toast = useToast();
  const [items, setItems]           = useState<GalleryItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editItem, setEditItem]     = useState<GalleryItem | null>(null);
  const [deleteId, setDeleteId]     = useState<number | null>(null);
  const [deleting, setDeleting]     = useState(false);
  const [saving, setSaving]         = useState(false);

  // Upload state
  const [uploadFile, setUploadFile]   = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc]   = useState("");
  const [uploadAlt, setUploadAlt]     = useState("");
  const [uploadCol, setUploadCol]     = useState("campus");
  const [dragOver, setDragOver]       = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const params = filter !== "all" ? `collection=${filter}&limit=100` : "limit=100";
    const res = await adminApi.gallery.list(params);
    if (res.ok) {
      setItems(Array.isArray(res.data) ? res.data as GalleryItem[] : []);
    } else {
      toast.error("Failed to load gallery");
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) { toast.error("Please select an image"); return; }
    if (!uploadTitle.trim()) { toast.error("Title is required"); return; }
    setSaving(true);
    const form = new FormData();
    form.append("image", uploadFile);
    form.append("collection", uploadCol);
    form.append("title", uploadTitle.trim());
    if (uploadDesc.trim()) form.append("description", uploadDesc.trim());
    if (uploadAlt.trim()) form.append("altText", uploadAlt.trim());
    const res = await adminApi.gallery.create(form);
    setSaving(false);
    if (res.ok) {
      toast.success("Image uploaded successfully!");
      setUploadOpen(false);
      setUploadFile(null); setUploadTitle(""); setUploadDesc(""); setUploadAlt(""); setUploadCol("campus");
      fetchItems();
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    setSaving(true);
    const res = await adminApi.gallery.update(editItem.id, {
      title: editItem.title,
      description: editItem.description,
      altText: editItem.altText,
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Item updated");
      setEditItem(null);
      fetchItems();
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  const handleToggle = async (id: number) => {
    const res = await adminApi.gallery.toggle(id);
    if (res.ok) { toast.success("Visibility updated"); fetchItems(); }
    else toast.error("Failed to update");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await adminApi.gallery.delete(deleteId);
    setDeleting(false);
    if (res.ok) { toast.success("Item deleted"); setDeleteId(null); fetchItems(); }
    else toast.error((res as { ok: false; message: string }).message);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadFile(file);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black text-gray-900">Gallery</h2>
          <p className="text-sm text-gray-400">{items.length} total images</p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#003262] text-white text-sm font-bold rounded-xl hover:bg-[#002855] transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Upload Image
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", "campus", "students-corner"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              filter === f ? "bg-[#003262] text-white shadow" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f === "all" ? "All" : f === "campus" ? "Campus" : "Student's Corner"}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <svg className="w-14 h-14 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <p className="font-semibold">No images found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image src={resolveImg(item.imagePath)} alt={item.altText || item.title} fill className="object-cover" unoptimized />
                {!item.isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">HIDDEN</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-gray-800 truncate">{item.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{item.collection === "campus" ? "Campus" : "Student's Corner"}</p>
              </div>
              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-2xl">
                <button onClick={() => setEditItem(item)} className="p-2 bg-white rounded-lg text-[#003262] hover:bg-[#FDB515] transition-colors" title="Edit">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleToggle(item.id)} className={`p-2 rounded-lg text-white transition-colors ${item.isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`} title={item.isActive ? "Hide" : "Show"}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.isActive ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} /></svg>
                </button>
                <button onClick={() => setDeleteId(item.id)} className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors" title="Delete">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <AdminModal open={uploadOpen} onClose={() => { setUploadOpen(false); setUploadFile(null); }} title="Upload Gallery Image" size="lg">
        <form onSubmit={handleUpload} className="space-y-4">
          {/* Dropzone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
              dragOver ? 'border-[#003262] bg-[#003262]/5'
              : uploadFile ? 'border-green-400 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={(e) => { e.stopPropagation(); document.getElementById('fileInput')?.click(); }}
          >
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onClick={(e) => e.stopPropagation()}
              onChange={e => { e.stopPropagation(); setUploadFile(e.target.files?.[0] || null); }}
            />
            {uploadFile ? (
              <div className="flex items-center gap-3 justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">{uploadFile.name}</p>
                  <p className="text-xs text-gray-400">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB — click to change</p>
                </div>
              </div>
            ) : (
              <>
                <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <p className="text-sm text-gray-500">Drag &amp; drop or <span className="text-[#003262] font-semibold">click to upload</span></p>
                <p className="text-xs text-gray-400 mt-1">Any image format — max 10 MB</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
              <input value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} placeholder="Image title" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262] focus:ring-1 focus:ring-[#003262]/20" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Collection *</label>
              <select value={uploadCol} onChange={e => setUploadCol(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262] bg-white">
                <option value="campus">Campus</option>
                <option value="students-corner">Student&apos;s Corner</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Alt Text</label>
              <input value={uploadAlt} onChange={e => setUploadAlt(e.target.value)} placeholder="Accessibility description" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea value={uploadDesc} onChange={e => setUploadDesc(e.target.value)} rows={2} placeholder="Optional description" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262] resize-none" />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setUploadOpen(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-bold text-white bg-[#003262] hover:bg-[#002855] rounded-lg transition-colors disabled:opacity-60">
              {saving ? "Uploading…" : "Upload Image"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Edit Modal */}
      <AdminModal open={!!editItem} onClose={() => setEditItem(null)} title="Edit Gallery Item" size="md">
        {editItem && (
          <form onSubmit={handleEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
              <input value={editItem.title} onChange={e => setEditItem({...editItem, title: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Alt Text</label>
              <input value={editItem.altText || ""} onChange={e => setEditItem({...editItem, altText: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea value={editItem.description || ""} onChange={e => setEditItem({...editItem, description: e.target.value})} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003262] resize-none" />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={() => setEditItem(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
              <button type="submit" disabled={saving} className="px-5 py-2 text-sm font-bold text-white bg-[#003262] rounded-lg disabled:opacity-60">{saving ? "Saving…" : "Save Changes"}</button>
            </div>
          </form>
        )}
      </AdminModal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Image" message="This will permanently delete the image and its file. This action cannot be undone." confirmLabel="Delete" danger loading={deleting} />
      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
