"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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

interface QueuedFile {
  id: string;
  file: File;
  previewUrl: string;
  title: string;
  collection: string;
  sizeFormatted: string;
}

const COLLECTIONS = [
  { id: "campus", label: "Campus & Infrastructure" },
  { id: "students-corner", label: "Student's Corner" },
];

function resolveImg(p: string) {
  if (!p) return "";
  return p.startsWith("/uploads/") ? `${BACKEND}${p}` : p;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function AdminGalleryPage() {
  const toast = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawers
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [detailItem, setDetailItem] = useState<GalleryItem | null>(null);

  // Drag-and-drop state
  const [isWindowDragging, setIsWindowDragging] = useState(false);
  const [isDropzoneDragging, setIsDropzoneDragging] = useState(false);
  const [queuedFiles, setQueuedFiles] = useState<QueuedFile[]>([]);
  const [batchCollection, setBatchCollection] = useState("campus");

  // Loading flags
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // ── Fetch Items ─────────────────────────────────────────────────────────────
  const fetchItems = useCallback(async () => {
    setLoading(true);
    const params = filter !== "all" ? `collection=${filter}&limit=200` : "limit=200";
    const res = await adminApi.gallery.list(params);
    if (res.ok) {
      setItems(Array.isArray(res.data) ? (res.data as GalleryItem[]) : []);
    } else {
      toast.error("Failed to load gallery items");
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ── Window-Level Drag & Drop Listeners (WordPress / Wix style) ─────────────
  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounter++;
      if (e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files")) {
        setIsWindowDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        setIsWindowDragging(false);
        dragCounter = 0;
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleWindowDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounter = 0;
      setIsWindowDragging(false);
      setIsDropzoneDragging(false);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        handleIncomingFiles(Array.from(e.dataTransfer.files));
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleWindowDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleWindowDrop);
    };
  }, [batchCollection]);

  // ── File Ingestion Helper ──────────────────────────────────────────────────
  const handleIncomingFiles = (fileList: File[]) => {
    const validImages = fileList.filter((f) => f.type.startsWith("image/"));
    if (validImages.length === 0) {
      toast.error("Please drop valid image files (JPG, PNG, WebP, etc.)");
      return;
    }

    const newQueued: QueuedFile[] = validImages.map((file) => {
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      return {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
        collection: batchCollection,
        sizeFormatted: formatBytes(file.size),
      };
    });

    setQueuedFiles((prev) => [...prev, ...newQueued]);
    setUploadOpen(true);
    toast.success(`Added ${newQueued.length} image${newQueued.length > 1 ? "s" : ""} to upload queue!`);
  };

  const removeQueuedFile = (id: string) => {
    setQueuedFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  const clearQueue = () => {
    queuedFiles.forEach((q) => URL.revokeObjectURL(q.previewUrl));
    setQueuedFiles([]);
  };

  // ── Upload Batch to Server ─────────────────────────────────────────────────
  const handleExecuteBatchUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (queuedFiles.length === 0) {
      toast.error("No images in queue to upload");
      return;
    }

    setSaving(true);
    try {
      const form = new FormData();
      queuedFiles.forEach((item) => {
        form.append("images", item.file);
      });
      form.append("collection", batchCollection);
      if (queuedFiles.length === 1) {
        form.append("title", queuedFiles[0].title);
      }

      const res = await adminApi.gallery.batchCreate(form);
      if (res.ok) {
        toast.success(`Successfully uploaded ${queuedFiles.length} images to Media Library!`);
        clearQueue();
        setUploadOpen(false);
        fetchItems();
      } else {
        toast.error((res as { ok: false; message: string }).message || "Upload failed");
      }
    } catch {
      toast.error("Network error during upload");
    } finally {
      setSaving(false);
    }
  };

  // ── Quick Metadata Edit ────────────────────────────────────────────────────
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;
    setSaving(true);
    const res = await adminApi.gallery.update(editItem.id, {
      title: editItem.title.trim(),
      description: editItem.description?.trim(),
      altText: editItem.altText?.trim(),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Image details updated successfully");
      setEditItem(null);
      if (detailItem?.id === editItem.id) {
        setDetailItem({ ...editItem });
      }
      fetchItems();
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  // ── Toggle Active Visibility ───────────────────────────────────────────────
  const handleToggle = async (id: number) => {
    const res = await adminApi.gallery.toggle(id);
    if (res.ok) {
      toast.success("Visibility updated");
      fetchItems();
    } else {
      toast.error("Failed to update visibility");
    }
  };

  // ── Delete Image ───────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await adminApi.gallery.delete(deleteId);
    setDeleting(false);
    if (res.ok) {
      toast.success("Image and file deleted from server");
      setDeleteId(null);
      if (detailItem?.id === deleteId) setDetailItem(null);
      fetchItems();
    } else {
      toast.error((res as { ok: false; message: string }).message);
    }
  };

  // ── Copy Link Helper ───────────────────────────────────────────────────────
  const handleCopyLink = (p: string, id: number) => {
    const fullUrl = resolveImg(p);
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    toast.success("Image link copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2500);
  };

  // ── Filtered & Searched Items ──────────────────────────────────────────────
  const displayedItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.altText && item.altText.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [items, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* ══════════════════════════════════════════════════════════════════════
          1. FULL-WINDOW DROPZONE OVERLAY (WordPress / Wix Experience)
         ══════════════════════════════════════════════════════════════════════ */}
      {isWindowDragging && (
        <div className="fixed inset-0 z-50 bg-[#003262]/85 backdrop-blur-md flex flex-col items-center justify-center border-4 border-dashed border-[#FDB515] p-8 pointer-events-none transition-all duration-300 animate-fadeIn">
          <div className="w-24 h-24 rounded-full bg-[#FDB515] flex items-center justify-center text-[#003262] mb-6 shadow-2xl animate-bounce">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center tracking-tight mb-2">
            Drop images anywhere to add to Media Library
          </h2>
          <p className="text-white/80 text-sm md:text-base font-medium">
            You can drop single or multiple images (JPG, PNG, WebP)
          </p>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003262] flex items-center justify-center text-white shadow">
              <svg className="w-5 h-5 text-[#FDB515]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Media Library</h1>
              <p className="text-xs sm:text-sm text-gray-400">
                {items.length} items total • Drag and drop anywhere to upload
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setUploadOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003262] hover:bg-[#002147] text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#FDB515]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Upload Images
          </button>
        </div>
      </div>

      {/* ── Modern Wix-Style Toolbar: Search, Collection Tabs, Quick Actions ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
        {/* Collection Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#003262] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Media ({items.length})
          </button>
          {COLLECTIONS.map((c) => {
            const count = items.filter((i) => i.collection === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filter === c.id
                    ? "bg-[#003262] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {c.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Instant Search Bar */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search images by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#003262]/20 focus:border-[#003262] transition-all"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* ── Main Media Grid ── */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : displayedItems.length === 0 ? (
        <div
          onClick={() => setUploadOpen(true)}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 hover:border-[#003262]/40 transition-colors cursor-pointer group p-8"
        >
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#003262] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-800 mb-1">No media files found</h3>
          <p className="text-xs text-gray-400 max-w-sm text-center">
            Drag and drop images anywhere on this window, or click to upload your first image.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayedItems.map((item) => {
            const isSelected = detailItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setDetailItem(item)}
                className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col ${
                  isSelected
                    ? "ring-3 ring-[#003262] border-[#003262] shadow-lg"
                    : "border-gray-200/80 hover:border-[#003262]/40 hover:shadow-md"
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={resolveImg(item.imagePath)}
                    alt={item.altText || item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />

                  {/* Status Badge */}
                  {!item.isActive && (
                    <div className="absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Hidden
                    </div>
                  )}

                  {/* Quick Action Overlay (Wix style) */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditItem(item);
                      }}
                      className="p-2 bg-white/95 hover:bg-white text-[#003262] rounded-lg shadow transition-all hover:scale-105"
                      title="Edit metadata"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyLink(item.imagePath, item.id);
                      }}
                      className="p-2 bg-white/95 hover:bg-white text-[#003262] rounded-lg shadow transition-all hover:scale-105"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(item.id);
                      }}
                      className={`p-2 rounded-lg shadow transition-all hover:scale-105 text-white ${
                        item.isActive ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                      title={item.isActive ? "Hide from public" : "Show on website"}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.isActive ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(item.id);
                      }}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition-all hover:scale-105"
                      title="Delete permanently"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Caption / Card Footer */}
                <div className="p-2.5">
                  <p className="text-xs font-bold text-gray-800 truncate" title={item.title}>
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mt-0.5">
                    <span className="uppercase tracking-wider font-semibold text-[#003262]">
                      {item.collection === "campus" ? "Campus" : "Student"}
                    </span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          2. WORDPRESS-STYLE ATTACHMENT DETAILS DRAWER (Bottom / Side)
         ══════════════════════════════════════════════════════════════════════ */}
      {detailItem && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-5 mt-6 animate-fadeIn">
          <div className="flex items-start justify-between border-b pb-4 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FDB515]">
                Attachment Details
              </span>
              <h3 className="text-lg font-black text-gray-900">{detailItem.title}</h3>
            </div>
            <button
              onClick={() => setDetailItem(null)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 relative h-48 md:h-56 bg-gray-50 rounded-xl overflow-hidden border">
              <Image
                src={resolveImg(detailItem.imagePath)}
                alt={detailItem.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="md:col-span-8 space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 text-gray-600">
                <div>
                  <span className="font-semibold text-gray-900 block">Collection:</span>
                  {detailItem.collection === "campus" ? "Campus & Infrastructure" : "Student's Corner"}
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block">Uploaded On:</span>
                  {new Date(detailItem.createdAt).toLocaleString()}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-gray-900 block">Direct URL:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      readOnly
                      value={resolveImg(detailItem.imagePath)}
                      className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-mono w-full text-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyLink(detailItem.imagePath, detailItem.id)}
                      className="px-3 py-1.5 bg-[#003262] text-white font-bold rounded-lg hover:bg-[#002147] transition-colors whitespace-nowrap text-xs cursor-pointer"
                    >
                      {copiedId === detailItem.id ? "Copied!" : "Copy URL"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditItem(detailItem)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={() => handleToggle(detailItem.id)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {detailItem.isActive ? "Hide from Website" : "Show on Website"}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(detailItem.id)}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Delete Attachment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          3. MULTI-FILE UPLOAD MODAL WITH VISUAL PREVIEW QUEUE
         ══════════════════════════════════════════════════════════════════════ */}
      <AdminModal
        open={uploadOpen}
        onClose={() => {
          setUploadOpen(false);
          clearQueue();
        }}
        title="Upload Media (Drag & Drop Multiple Files)"
        size="xl"
      >
        <form onSubmit={handleExecuteBatchUpload} className="space-y-5">
          {/* Main Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDropzoneDragging(true);
            }}
            onDragLeave={() => setIsDropzoneDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDropzoneDragging(false);
              if (e.dataTransfer?.files) {
                handleIncomingFiles(Array.from(e.dataTransfer.files));
              }
            }}
            onClick={() => document.getElementById("fileInputMulti")?.click()}
            className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
              isDropzoneDragging
                ? "border-[#003262] bg-[#003262]/5 scale-[1.01]"
                : "border-gray-300 hover:border-[#003262] hover:bg-gray-50"
            }`}
          >
            <input
              id="fileInputMulti"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                if (e.target.files) {
                  handleIncomingFiles(Array.from(e.target.files));
                }
              }}
            />

            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-blue-50 text-[#003262] flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-base font-bold text-gray-800">
              Drag &amp; drop images here, or <span className="text-[#003262] underline">browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supports bulk upload (up to 30 images at once) • JPG, PNG, WebP up to 10MB each
            </p>
          </div>

          {/* Collection Selector */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
              Upload Destination Collection:
            </span>
            <div className="flex items-center gap-3">
              {COLLECTIONS.map((c) => (
                <label key={c.id} className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="batchCol"
                    checked={batchCollection === c.id}
                    onChange={() => setBatchCollection(c.id)}
                    className="accent-[#003262]"
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>

          {/* Visual Queued Images List (WordPress Style) */}
          {queuedFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
                  Ready to Upload ({queuedFiles.length} file{queuedFiles.length > 1 ? "s" : ""})
                </h4>
                <button
                  type="button"
                  onClick={clearQueue}
                  className="text-xs text-red-600 hover:underline font-semibold"
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {queuedFiles.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-xl gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border">
                        <Image src={q.previewUrl} alt={q.title} fill className="object-cover" unoptimized />
                      </div>
                      <div className="min-w-0">
                        <input
                          type="text"
                          value={q.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setQueuedFiles((prev) =>
                              prev.map((item) => (item.id === q.id ? { ...item, title: val } : item))
                            );
                          }}
                          className="text-xs font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-[#003262] focus:outline-none w-full bg-transparent"
                          title="Click to customize title"
                        />
                        <p className="text-[11px] text-gray-400 mt-0.5">{q.sizeFormatted}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeQueuedFile(q.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove from queue"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={() => {
                setUploadOpen(false);
                clearQueue();
              }}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || queuedFiles.length === 0}
              className="px-6 py-2.5 text-sm font-extrabold text-white bg-[#003262] hover:bg-[#002147] rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {saving
                ? `Uploading ${queuedFiles.length} file(s)…`
                : `Upload ${queuedFiles.length} Image${queuedFiles.length > 1 ? "s" : ""} to Library`}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* ── Edit Modal ── */}
      <AdminModal open={!!editItem} onClose={() => setEditItem(null)} title="Edit Media Details" size="md">
        {editItem && (
          <form onSubmit={handleEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Title (Optional)</label>
              <input
                value={editItem.title}
                onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#003262]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Alt Text (Accessibility)</label>
              <input
                value={editItem.altText || ""}
                onChange={(e) => setEditItem({ ...editItem, altText: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#003262]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <textarea
                value={editItem.description || ""}
                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#003262] resize-none"
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setEditItem(null)}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 text-sm font-bold text-white bg-[#003262] hover:bg-[#002147] rounded-xl disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Image Attachment"
        message="This will permanently delete this image and its physical file from the server. Any links pointing to it will stop working."
        confirmLabel="Delete Attachment"
        danger
        loading={deleting}
      />

      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}
