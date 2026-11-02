"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import AdminModal from "@/components/admin/AdminModal";
import { adminApi, BACKEND } from "@/lib/adminApi";

interface MediaItem {
  id: number;
  collection: string;
  title: string;
  imagePath: string;
  altText?: string;
}

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string, item?: MediaItem) => void;
  title?: string;
  currentUrl?: string;
}

function resolveImg(p: string) {
  if (!p) return "";
  return p.startsWith("/uploads/") ? `${BACKEND}${p}` : p;
}

export default function MediaPickerModal({
  open,
  onClose,
  onSelect,
  title = "Select Image from Media Library",
  currentUrl = "",
}: MediaPickerModalProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [selectedUrl, setSelectedUrl] = useState<string>(currentUrl);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Upload tab state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCol, setUploadCol] = useState("campus");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await adminApi.gallery.list("limit=100&active=true");
    if (res.ok && Array.isArray(res.data)) {
      setItems(res.data as MediaItem[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (open) {
      fetchItems();
      setSelectedUrl(currentUrl);
    }
  }, [open, currentUrl, fetchItems]);

  const handleUploadNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);

    const form = new FormData();
    form.append("image", uploadFile);
    form.append("collection", uploadCol);
    form.append("title", uploadTitle.trim() || uploadFile.name);

    const res = await adminApi.gallery.create(form);
    setUploading(false);

    if (res.ok && res.data) {
      const created = res.data as MediaItem;
      const resolved = resolveImg(created.imagePath);
      onSelect(resolved, created);
      onClose();
    }
  };

  const handleConfirmSelect = () => {
    if (selectedUrl) {
      onSelect(selectedUrl, selectedItem || undefined);
      onClose();
    }
  };

  return (
    <AdminModal open={open} onClose={onClose} title={title} size="xl">
      <div className="space-y-4">
        {/* Tab switch */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab("library")}
            className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-px ${
              activeTab === "library"
                ? "border-[#003262] text-[#003262]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Media Library ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-px ${
              activeTab === "upload"
                ? "border-[#003262] text-[#003262]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Upload New File
          </button>
        </div>

        {/* Tab 1: Library Grid */}
        {activeTab === "library" && (
          <div>
            {loading ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto p-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="font-semibold text-sm">No media files in library</p>
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className="mt-3 text-xs font-bold text-[#003262] underline"
                >
                  Upload your first image now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto p-1 custom-scrollbar">
                {items.map((item) => {
                  const resolved = resolveImg(item.imagePath);
                  const isChosen = selectedUrl === resolved || selectedUrl === item.imagePath;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedUrl(resolved);
                        setSelectedItem(item);
                      }}
                      className={`group relative aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        isChosen
                          ? "border-[#003262] ring-3 ring-[#003262]/30 shadow-md scale-[1.02]"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={resolved}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {isChosen && (
                        <div className="absolute top-1.5 right-1.5 bg-[#003262] text-white p-1 rounded-full shadow">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-black/70 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[10px] text-white font-medium truncate">{item.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
              <span className="text-xs text-gray-400 truncate max-w-sm">
                {selectedUrl ? `Selected: ${selectedUrl}` : "Select an image above"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!selectedUrl}
                  onClick={handleConfirmSelect}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#003262] hover:bg-[#002147] rounded-xl disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
                >
                  Apply Image
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Upload New Directly Inside Modal */}
        {activeTab === "upload" && (
          <form onSubmit={handleUploadNew} className="space-y-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) {
                  setUploadFile(f);
                  if (!uploadTitle) setUploadTitle(f.name.replace(/\.[^/.]+$/, ""));
                }
              }}
              onClick={() => document.getElementById("modalPickerFile")?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                dragOver
                  ? "border-[#003262] bg-[#003262]/5"
                  : uploadFile
                  ? "border-green-400 bg-green-50/50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                id="modalPickerFile"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setUploadFile(f);
                    if (!uploadTitle) setUploadTitle(f.name.replace(/\.[^/.]+$/, ""));
                  }
                }}
              />
              {uploadFile ? (
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-gray-800">{uploadFile.name}</span>
                  <span className="text-xs text-gray-400 mt-0.5">Click to choose another</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-xs font-bold text-gray-700">Drag &amp; drop an image here or click to browse</p>
                  <p className="text-[11px] text-gray-400 mt-1">Supports JPG, PNG, WebP up to 10MB</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Image Title</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Campus Library"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#003262]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Collection</label>
                <select
                  value={uploadCol}
                  onChange={(e) => setUploadCol(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#003262] bg-white"
                >
                  <option value="campus">Campus</option>
                  <option value="students-corner">Student&apos;s Corner</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!uploadFile || uploading}
                className="px-5 py-2 text-xs font-bold text-white bg-[#003262] hover:bg-[#002147] rounded-lg disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
              >
                {uploading ? "Uploading & Applying…" : "Upload & Select"}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminModal>
  );
}

