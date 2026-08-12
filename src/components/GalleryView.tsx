"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HomeNavbar from '@/components/HomeNavbar';
import Footer from '@/components/Footer';

const BACKEND_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')) ||
  'http://localhost:5000';

// ─── Types ────────────────────────────────────────────────────────────────────
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
  updatedAt: string;
}

// ─── Static fallback (shown while backend loads or is unreachable) ────────────
const STATIC_ITEMS = [
  { id: 1,  collection: 'campus',           title: 'School Building',    imagePath: '/creative_college_bg.png' },
  { id: 2,  collection: 'students-corner',  title: 'Annual Sports Day',  imagePath: '/WhatsApp Image 2024-12-21 at 17_07_edite.avif' },
  { id: 3,  collection: 'campus',           title: 'Cultural Event',     imagePath: '/event_bihar_1_1785832999825.png' },
  { id: 4,  collection: 'students-corner',  title: 'Students in Library',imagePath: '/about_small.png' },
  { id: 5,  collection: 'campus',           title: 'Science Exhibition', imagePath: '/event_bihar_2_1785833010076.png' },
  { id: 6,  collection: 'campus',           title: 'Prize Distribution', imagePath: '/event_bihar_3_1785833022146.png' },
  { id: 7,  collection: 'students-corner',  title: 'Student Activities', imagePath: '/test_student_1_1785833398588.png' },
  { id: 8,  collection: 'students-corner',  title: 'Art & Craft Seminar',imagePath: '/about_main.png' },
  { id: 9,  collection: 'campus',           title: 'Guest Lecture',      imagePath: '/event_bihar_4_1785833035313.png' },
  { id: 10, collection: 'campus',           title: 'Modern Classrooms',  imagePath: '/a30a8a_1dd13b7e94a54436908f58a57951ea45~mv2.avif' },
];

// Map filter label → backend collection value
const COLLECTION_MAP: Record<string, string | null> = {
  'All':               null,
  'Campus':            'campus',
  "Student's Corner":  'students-corner',
};

function resolveImageUrl(imagePath: string): string {
  if (!imagePath) return '/about_main.png';
  // Uploaded images from backend start with /uploads/
  if (imagePath.startsWith('/uploads/')) return `${BACKEND_URL}${imagePath}`;
  return imagePath;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function GalleryView({ initialFilter = 'All' }: { initialFilter?: string }) {
  const [items, setItems]               = useState<GalleryItem[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [currentPage, setCurrentPage]   = useState(1);
  const [total, setTotal]               = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);

  const ITEMS_PER_PAGE = 9;

  const categories = [
    { name: 'All',               path: '/gallery' },
    { name: 'Campus',            path: '/gallery/campus' },
    { name: "Student's Corner",  path: '/gallery/students-corner' },
  ];

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const collection = COLLECTION_MAP[initialFilter];
      const params = new URLSearchParams({
        active: 'true',
        limit:  String(ITEMS_PER_PAGE),
        offset: String((currentPage - 1) * ITEMS_PER_PAGE),
      });
      if (collection) params.set('collection', collection);

      const res = await fetch(`${BACKEND_URL}/api/gallery?${params.toString()}`, {
        cache: 'no-store',
      });

      if (!res.ok) throw new Error('API error');
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setItems(json.data);
        setTotal(json.meta?.total ?? json.data.length);
        setUsingFallback(false);
      } else {
        throw new Error('Unexpected response');
      }
    } catch {
      // Backend unreachable — show static fallback
      const col = COLLECTION_MAP[initialFilter];
      const filtered = col
        ? STATIC_ITEMS.filter(i => i.collection === col)
        : STATIC_ITEMS;
      setItems(filtered as unknown as GalleryItem[]);
      setTotal(filtered.length);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, [initialFilter, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [initialFilter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-[136px]">
      <HomeNavbar />

      {/* Hero Banner */}
      <section className="relative w-full h-[40vh] md:h-[55vh]">
        <Image
          src="/creative_college_bg.png"
          alt="Gallery Campus Banner"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
      </section>

      {/* Title Bar */}
      <div className="w-full bg-[#003262] py-5 md:py-7 flex items-center justify-center border-b-4 border-[#FDB515]">
        <h1
          className="text-white text-3xl md:text-4xl font-bold tracking-wide shadow-sm"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Photo Gallery
        </h1>
      </div>

      {/* Gallery Content */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.path}
              className={`px-6 py-2.5 font-bold transition-all duration-300 text-sm md:text-base no-underline ${
                initialFilter === cat.name
                  ? 'bg-[#003262] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-[#003262] border border-gray-200'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Status indicators */}
        {usingFallback && !loading && (
          <div className="text-center mb-8 px-4 py-3 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm rounded-sm">
            Showing sample images — backend is offline. Start the backend server to load live gallery.
          </div>
        )}

        <div className="flex flex-col min-h-[600px]">
          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse rounded-sm" />
              ))}
            </div>
          )}

          {/* Image Grid */}
          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative group cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white flex flex-col"
                  onClick={() => setSelectedImage({ src: resolveImageUrl(item.imagePath), title: item.title })}
                >
                  <div className="relative w-full aspect-[4/3] bg-gray-100">
                    <Image
                      src={resolveImageUrl(item.imagePath)}
                      alt={item.altText || item.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      unoptimized
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003262]/90 via-[#003262]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[#FDB515] font-semibold text-sm uppercase tracking-wider mb-1">
                      {item.collection === 'campus' ? 'Campus' : "Student's Corner"}
                    </span>
                    <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-white/80 text-sm mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && items.length === 0 && (
            <div className="text-center py-20 flex-1 flex flex-col items-center justify-center gap-4">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-400">No images in this collection yet.</h3>
              <p className="text-gray-400 text-sm">Upload images via the Admin API to populate this gallery.</p>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 pt-8 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-[#003262] hover:text-white hover:border-[#003262] disabled:opacity-40 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#003262] text-white shadow-md'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-[#003262] hover:text-white hover:border-[#003262] disabled:opacity-40 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm px-4">
          <button
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="relative flex flex-col items-center gap-4 w-full max-w-5xl animate-zoom-in">
            <div className="relative w-full aspect-video">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            {selectedImage.title && (
              <p className="text-white/80 text-lg font-semibold">{selectedImage.title}</p>
            )}
          </div>

          <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedImage(null)} />
        </div>
      )}

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes zoom-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in { animation: zoom-in 0.3s ease-out forwards; }
      `}} />
    </main>
  );
}
