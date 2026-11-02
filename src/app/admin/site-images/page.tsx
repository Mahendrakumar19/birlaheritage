"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { adminApi, BACKEND } from "@/lib/adminApi";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import AdminModal from "@/components/admin/AdminModal";
import AdminToast, { useToast } from "@/components/admin/AdminToast";

interface SiteImageSlot {
  id: number;
  slotKey: string;
  label: string;
  category: string;
  description?: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  altText?: string;
  updatedAt: string;
}

const CATEGORIES = [
  "All",
  "Hero Banner",
  "Campus Facilities",
  "About School",
  "Leadership",
];

function resolveImg(p: string) {
  if (!p) return "/about_main.png";
  return p.startsWith("/uploads/") ? `${BACKEND}${p}` : p;
}

export default function AdminSiteImagesPage() {
  const toast = useToast();
  const [slots, setSlots] = useState<SiteImageSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Media Picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<SiteImageSlot | null>(null);

  // Edit details modal state
  const [editSlot, setEditSlot] = useState<SiteImageSlot | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    const cat = activeCategory === "All" ? "" : activeCategory;
    const res = await adminApi.siteImages.list(cat);
    if (res.ok && Array.isArray(res.data)) {
      setSlots(res.data as SiteImageSlot[]);
    } else {
      toast.error("Failed to load site image slots");
    }
    setLoading(false);
  }, [activeCategory]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  // Handle direct image change via picker
  const handleImageSelected = async (newUrl: string) => {
    if (!activeSlot) return;
    setSaving(true);
    const res = await adminApi.siteImages.updateSlot(activeSlot.slotKey, {
      imageUrl: newUrl,
    });
    setSaving(false);

    if (res.ok) {
      toast.success(`Updated image for "${activeSlot.label}"!`);
      setActiveSlot(null);
      fetchSlots();
    } else {
      toast.error((res as { ok: false; message: string }).message || "Failed to update slot");
    }
  };

  // Handle full metadata update (title, subtitle, caption, alt text)
  const handleSaveEditSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSlot) return;
    setSaving(true);

    const res = await adminApi.siteImages.updateSlot(editSlot.slotKey, {
      imageUrl: editSlot.imageUrl,
      title: editSlot.title,
      subtitle: editSlot.subtitle,
      caption: editSlot.caption,
      altText: editSlot.altText,
    });
    setSaving(false);

    if (res.ok) {
      toast.success(`Successfully saved settings for "${editSlot.label}"!`);
      setEditSlot(null);
      fetchSlots();
    } else {
      toast.error((res as { ok: false; message: string }).message || "Failed to save settings");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#003262] text-white flex items-center justify-center shadow">
            <svg className="w-6 h-6 text-[#FDB515]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Site Images &amp; Banners Manager</h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Edit hero sliders, facilities, campus photos, and leadership portraits anywhere across the website
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-[#003262] text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Slots */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed text-gray-400">
          No image slots found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((slot) => {
            const resolved = resolveImg(slot.imageUrl);

            return (
              <div
                key={slot.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Slot Image Preview with change button */}
                  <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden border-b">
                    <Image
                      src={resolved}
                      alt={slot.altText || slot.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 bg-[#003262]/80 backdrop-blur-md text-[#FDB515] border border-[#FDB515]/30 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm">
                      {slot.category}
                    </div>

                    {/* Change Image Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSlot(slot);
                          setPickerOpen(true);
                        }}
                        className="px-4 py-2 bg-[#FDB515] hover:bg-[#e5a210] text-[#003262] font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Change Image
                      </button>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-bold truncate text-[#FDB515]">
                        {slot.subtitle || slot.slotKey}
                      </p>
                      <h3 className="text-sm font-extrabold leading-snug line-clamp-1">
                        {slot.title || slot.label}
                      </h3>
                    </div>
                  </div>

                  {/* Slot Details Description */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-gray-900">{slot.label}</h4>
                    </div>
                    {slot.description && (
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {slot.description}
                      </p>
                    )}
                    {slot.caption && (
                      <p className="text-[11px] text-gray-400 italic line-clamp-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        &ldquo;{slot.caption}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-gray-400 font-medium">
                    Updated: {new Date(slot.updatedAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditSlot(slot)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Edit Text / Alt
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSlot(slot);
                        setPickerOpen(true);
                      }}
                      className="px-3 py-1.5 bg-[#003262] hover:bg-[#002147] text-white font-bold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                    >
                      Replace Image
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── WordPress / Wix Style Media Picker Modal ── */}
      <MediaPickerModal
        open={pickerOpen}
        onClose={() => {
          setPickerOpen(false);
          setActiveSlot(null);
        }}
        onSelect={handleImageSelected}
        title={activeSlot ? `Select New Image for: ${activeSlot.label}` : "Choose Image"}
        currentUrl={activeSlot ? activeSlot.imageUrl : ""}
      />

      {/* ── Edit Slot Metadata Modal ── */}
      <AdminModal
        open={!!editSlot}
        onClose={() => setEditSlot(null)}
        title={editSlot ? `Edit Details: ${editSlot.label}` : "Edit Image Slot"}
        size="lg"
      >
        {editSlot && (
          <form onSubmit={handleSaveEditSlot} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Image URL / Path *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editSlot.imageUrl}
                    onChange={(e) => setEditSlot({ ...editSlot, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#003262]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSlot(editSlot);
                      setPickerOpen(true);
                    }}
                    className="px-3 py-2 bg-[#003262] text-white text-xs font-bold rounded-lg shrink-0 hover:bg-[#002147] cursor-pointer"
                  >
                    Browse…
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Alt Text (Accessibility)</label>
                <input
                  type="text"
                  value={editSlot.altText || ""}
                  onChange={(e) => setEditSlot({ ...editSlot, altText: e.target.value })}
                  placeholder="Image alt description"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#003262]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Heading / Main Title</label>
                <input
                  type="text"
                  value={editSlot.title || ""}
                  onChange={(e) => setEditSlot({ ...editSlot, title: e.target.value })}
                  placeholder="Main Title"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#003262]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle / Role Tag</label>
                <input
                  type="text"
                  value={editSlot.subtitle || ""}
                  onChange={(e) => setEditSlot({ ...editSlot, subtitle: e.target.value })}
                  placeholder="e.g. BIRLA HERITAGE or Modern Classrooms"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#003262]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Caption / Paragraph Description</label>
                <textarea
                  rows={3}
                  value={editSlot.caption || ""}
                  onChange={(e) => setEditSlot({ ...editSlot, caption: e.target.value })}
                  placeholder="Supporting text for this image..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#003262] resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setEditSlot(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 text-xs font-bold text-white bg-[#003262] hover:bg-[#002147] rounded-xl disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      <AdminToast toasts={toast.toasts} onDismiss={toast.dismiss} />
    </div>
  );
}

