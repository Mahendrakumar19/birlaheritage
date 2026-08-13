"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HomeNavbar from '@/components/HomeNavbar';
import Footer from '@/components/Footer';

const BACKEND_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')) ||
  'http://localhost:5000';

// ─── Types ────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: number | string;
  collection: string;
  albumId?: string;
  albumTitle?: string;
  title: string;
  description?: string;
  imagePath: string;
  altText?: string;
  sortOrder?: number;
  createdAt?: string;
}

interface Album {
  id: string;
  title: string;
  collection: string;
  categoryLabel: string;
  description: string;
  coverImage: string;
  photos: GalleryItem[];
  date?: string;
  location?: string;
}

// ─── Pre-configured Sample Albums ─────────────────────────────────────────────
const STATIC_ALBUMS: Album[] = [
  {
    id: 'album-campus-infra',
    title: 'Campus Infrastructure & Architecture',
    collection: 'campus',
    categoryLabel: 'Campus',
    description: 'Explore our state-of-the-art academic buildings, modern classrooms, and serene green campus environments.',
    coverImage: '/creative_college_bg.png',
    date: 'Academic Year 2024-25',
    location: 'Main Campus',
    photos: [
      { id: 'c1', collection: 'campus', title: 'Main School Complex', description: 'Grand front view of our main academic block.', imagePath: '/creative_college_bg.png' },
      { id: 'c2', collection: 'campus', title: 'Modern Smart Classroom', description: 'Digital interactive whiteboards and comfortable seating.', imagePath: '/a30a8a_1dd13b7e94a54436908f58a57951ea45~mv2.avif' },
      { id: 'c3', collection: 'campus', title: 'Central Knowledge Library', description: 'Quiet research zones with comprehensive literary collections.', imagePath: '/about_small.png' },
      { id: 'c4', collection: 'campus', title: 'Interactive Learning Wing', description: 'Dedicated spaces for project-based collaboration.', imagePath: '/about_main.png' },
      { id: 'c5', collection: 'campus', title: 'Campus Greenery & Walkways', description: 'Eco-friendly, lush green pathways nurturing peace of mind.', imagePath: '/hero_slider/1.png' }
    ]
  },
  {
    id: 'album-annual-events',
    title: 'Cultural Festivals & Annual Day',
    collection: 'campus',
    categoryLabel: 'Events',
    description: 'A vibrant showcase of student talents, musical performances, dance dramas, and grand award celebrations.',
    coverImage: '/event_bihar_1_1785832999825.png',
    date: 'December 2024',
    location: 'Open Air Auditorium',
    photos: [
      { id: 'e1', collection: 'campus', title: 'Grand Cultural Performance', description: 'Traditional & contemporary dance drama by senior students.', imagePath: '/event_bihar_1_1785832999825.png' },
      { id: 'e2', collection: 'campus', title: 'Annual Excellence Awards', description: 'Honoring academic toppers and outstanding achievements.', imagePath: '/event_bihar_2_1785833010076.png' },
      { id: 'e3', collection: 'campus', title: 'Lighting of the Ceremonial Lamp', description: 'Inaugural lighting ceremony with chief dignitaries.', imagePath: '/event_bihar_3_1785833022146.png' },
      { id: 'e4', collection: 'campus', title: 'Music & Choir Performance', description: 'Harmonious vocal & instrumental musical evening.', imagePath: '/event_bihar_4_1785833035313.png' }
    ]
  },
  {
    id: 'album-sports-athletics',
    title: 'Annual Sports Meet & Championship',
    collection: 'students-corner',
    categoryLabel: 'Sports',
    description: 'High energy athletic competitions, track events, team championships, and sportsmanship on full display.',
    coverImage: '/WhatsApp Image 2024-12-21 at 17_07_edite.avif',
    date: 'November 2024',
    location: 'Sports Complex Grounds',
    photos: [
      { id: 's1', collection: 'students-corner', title: 'Track & Field Sprint Finals', description: 'Adrenaline packed 100m sprint race finals.', imagePath: '/WhatsApp Image 2024-12-21 at 17_07_edite.avif' },
      { id: 's2', collection: 'students-corner', title: 'Inter-House Sports Champions', description: 'Winning house hoisting the championship trophy.', imagePath: '/test_student_1_1785833398588.png' },
      { id: 's3', collection: 'students-corner', title: 'Outdoor Sports Activities', description: 'Encouraging physical fitness, agility, and team spirit.', imagePath: '/hero_slider/2.png' }
    ]
  },
  {
    id: 'album-science-tech',
    title: 'Science Expo & Innovation Fair',
    collection: 'students-corner',
    categoryLabel: 'Academics',
    description: 'Budding young scientists demonstrating robotics, environmental models, and innovative STEM projects.',
    coverImage: '/obj_research_1785831334762.png',
    date: 'October 2024',
    location: 'Science & Robotics Lab',
    photos: [
      { id: 'sc1', collection: 'students-corner', title: 'Robotics & AI Model Demo', description: 'Students presenting automated working robotic arms.', imagePath: '/obj_research_1785831334762.png' },
      { id: 'sc2', collection: 'students-corner', title: 'Sustainable Energy Project', description: 'Eco-friendly solar energy model exhibition.', imagePath: '/obj_courses_1785831347955.png' },
      { id: 'sc3', collection: 'students-corner', title: 'Young Researchers Forum', description: 'Interactive Q&A session with visiting scientists.', imagePath: '/obj_quality_1785831369236.png' }
    ]
  },
  {
    id: 'album-student-life',
    title: 'Student Life & Creative Workshops',
    collection: 'students-corner',
    categoryLabel: "Student's Corner",
    description: 'Memorable moments of everyday campus life, art & craft exhibitions, club activities, and group learning.',
    coverImage: '/course_pre_primary.png',
    date: 'Ongoing 2024-25',
    location: 'Activity & Art Studios',
    photos: [
      { id: 'sl1', collection: 'students-corner', title: 'Early Years Play & Learn', description: 'Joyful foundational learning activities for pre-primary.', imagePath: '/course_pre_primary.png' },
      { id: 'sl2', collection: 'students-corner', title: 'Primary Art Studio', description: 'Color exploration, painting, and pottery creation.', imagePath: '/course_primary.png' },
      { id: 'sl3', collection: 'students-corner', title: 'Collaborative Group Workshops', description: 'Group discussion and creative problem solving.', imagePath: '/course_middle.png' },
      { id: 'sl4', collection: 'students-corner', title: 'Graduation & Achievement Day', description: 'Celebrating academic milestones and growth.', imagePath: '/obj_graduation_1785831358808.png' }
    ]
  }
];

// Helper to construct backend URLs
function resolveImageUrl(imagePath: string): string {
  if (!imagePath) return '/about_main.png';
  if (imagePath.startsWith('/uploads/')) return `${BACKEND_URL}${imagePath}`;
  return imagePath;
}

export default function GalleryView({ initialFilter = 'All' }: { initialFilter?: string }) {
  const [activeCategory, setActiveCategory] = useState<string>(initialFilter);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'albums' | 'all-photos'>('albums');
  const [layoutStyle, setLayoutStyle] = useState<'grid' | 'masonry' | 'mosaic'>('grid');

  // Lightbox State
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    currentIndex: number;
    photosList: GalleryItem[];
  }>({
    isOpen: false,
    currentIndex: 0,
    photosList: [],
  });

  // API State
  const [liveItems, setLiveItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  // Categories list
  const categories = [
    { key: 'All', label: 'All Collections' },
    { key: 'Campus', label: 'Campus & Infrastructure' },
    { key: "Student's Corner", label: "Student Life & Clubs" },
    { key: 'Events', label: 'Events & Celebrations' },
    { key: 'Sports', label: 'Sports & Athletics' },
    { key: 'Academics', label: 'Science & Academics' },
  ];

  // Fetch live items from backend if available
  const fetchBackendGallery = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/gallery?active=true&limit=100`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Backend failed');
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setLiveItems(json.data);
        setUsingFallback(false);
      } else {
        throw new Error('Empty backend data');
      }
    } catch {
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBackendGallery();
  }, [fetchBackendGallery]);

  // Combine backend items with static albums into structured Albums
  const computedAlbums = useMemo(() => {
    if (!usingFallback && liveItems.length > 0) {
      // Group backend items into albums by collection/title
      const albumMap = new Map<string, Album>();

      liveItems.forEach((item, idx) => {
        const colKey = item.collection || 'campus';
        const albumKey = `backend-album-${colKey}`;
        const isCampus = colKey === 'campus';

        if (!albumMap.has(albumKey)) {
          albumMap.set(albumKey, {
            id: albumKey,
            title: isCampus ? 'Campus Life & Facilities' : "Student's Activities & Corner",
            collection: colKey,
            categoryLabel: isCampus ? 'Campus' : "Student's Corner",
            description: isCampus
              ? 'Photos highlighting our campus environment and infrastructure.'
              : 'Memorable shots of student activities, achievements, and club events.',
            coverImage: resolveImageUrl(item.imagePath),
            date: 'Uploaded Collection',
            photos: [],
          });
        }

        const album = albumMap.get(albumKey)!;
        album.photos.push({
          id: item.id || `live-${idx}`,
          collection: item.collection,
          title: item.title || `Photo #${idx + 1}`,
          description: item.description || '',
          imagePath: resolveImageUrl(item.imagePath),
          altText: item.altText || item.title,
        });
      });

      return Array.from(albumMap.values());
    }

    return STATIC_ITEMS_TO_ALBUMS();
  }, [liveItems, usingFallback]);

  function STATIC_ITEMS_TO_ALBUMS(): Album[] {
    return STATIC_ALBUMS;
  }

  // Filter Albums by activeCategory & searchQuery
  const filteredAlbums = useMemo(() => {
    return computedAlbums.filter((album) => {
      // Category check
      const matchesCategory =
        activeCategory === 'All' ||
        album.categoryLabel.toLowerCase() === activeCategory.toLowerCase() ||
        album.collection.toLowerCase() === activeCategory.toLowerCase() ||
        (activeCategory === 'Campus' && album.collection === 'campus') ||
        (activeCategory === "Student's Corner" && album.collection === 'students-corner');

      // Search check
      const matchesSearch =
        !searchQuery ||
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.photos.some((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [computedAlbums, activeCategory, searchQuery]);

  // Selected Album details (if viewing single album)
  const currentAlbum = useMemo(() => {
    if (!selectedAlbumId) return null;
    return computedAlbums.find((a) => a.id === selectedAlbumId) || null;
  }, [selectedAlbumId, computedAlbums]);

  // All photos flat array for "All Photos" mode
  const allPhotosFlat = useMemo(() => {
    const photos: GalleryItem[] = [];
    filteredAlbums.forEach((a) => {
      a.photos.forEach((p) => {
        photos.push({
          ...p,
          albumId: a.id,
          albumTitle: a.title,
        });
      });
    });
    return photos;
  }, [filteredAlbums]);

  // Lightbox Navigation Functions
  const openLightbox = (photosList: GalleryItem[], index: number) => {
    setLightboxState({
      isOpen: true,
      currentIndex: index,
      photosList,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const nextPhoto = useCallback(() => {
    setLightboxState((prev) => {
      if (prev.photosList.length === 0) return prev;
      const nextIndex = (prev.currentIndex + 1) % prev.photosList.length;
      return { ...prev, currentIndex: nextIndex };
    });
  }, []);

  const prevPhoto = useCallback(() => {
    setLightboxState((prev) => {
      if (prev.photosList.length === 0) return prev;
      const prevIndex = (prev.currentIndex - 1 + prev.photosList.length) % prev.photosList.length;
      return { ...prev, currentIndex: prevIndex };
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxState.isOpen) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState.isOpen, nextPhoto, prevPhoto]);

  return (
    <main className="min-h-screen bg-[#060D17] text-white flex flex-col pt-[136px]">
      <HomeNavbar />

      {/* Hero Header */}
      <section className="relative w-full py-16 md:py-24 px-6 bg-gradient-to-b from-[#0A1628] via-[#0D1D35] to-[#060D17] border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FDB515_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Glow Spheres */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#003262]/50 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FDB515]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDB515]/10 border border-[#FDB515]/30 text-[#FDB515] text-xs md:text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            Birla Heritage Media Archives
          </div>
          
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Photo Albums & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDB515] via-[#FFF0B3] to-[#FDB515]">Collections</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-300 text-base md:text-xl font-medium leading-relaxed">
            Immerse yourself in our visual story. Browse curated photo albums capturing vibrant campus life, athletic meets, cultural festivals, and academic achievements.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search photo collections or events..."
              className="w-full pl-12 pr-10 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDB515] focus:border-transparent transition-all shadow-xl"
            />
            <svg className="w-5 h-5 absolute left-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-gray-400 hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full flex-1">
        
        {/* Navigation Controls: Categories & View Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setSelectedAlbumId(null);
                }}
                className={`px-5 py-2 rounded-full font-semibold text-xs md:text-sm transition-all duration-300 ${
                  activeCategory === cat.key && !selectedAlbumId
                    ? 'bg-[#FDB515] text-[#060D17] shadow-lg shadow-[#FDB515]/20 scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/15 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mode Switcher: Albums vs All Photos */}
          <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10 self-center md:self-auto">
            <button
              onClick={() => {
                setViewMode('albums');
                setSelectedAlbumId(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'albums' && !selectedAlbumId
                  ? 'bg-[#003262] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Albums View
            </button>
            <button
              onClick={() => {
                setViewMode('all-photos');
                setSelectedAlbumId(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'all-photos' && !selectedAlbumId
                  ? 'bg-[#003262] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              All Photos ({allPhotosFlat.length})
            </button>
          </div>
        </div>

        {/* Status notice if backend offline */}
        {usingFallback && !loading && (
          <div className="mb-8 px-4 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs md:text-sm rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Showing static sample photo albums. Connect to backend to sync live galleries.</span>
            </div>
            <button
              onClick={fetchBackendGallery}
              className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded-lg text-xs font-semibold"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* SINGLE ALBUM DETAILED VIEW */}
        {selectedAlbumId && currentAlbum && (
          <div className="animate-fadeIn">
            {/* Album Header Banner */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 mb-10 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-[#003262]/40 to-transparent pointer-events-none" />
              
              {/* Back Button */}
              <button
                onClick={() => setSelectedAlbumId(null)}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs md:text-sm font-semibold transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Albums
              </button>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-[#FDB515] text-[#060D17] rounded-full text-xs font-bold uppercase tracking-wider">
                      {currentAlbum.categoryLabel}
                    </span>
                    {currentAlbum.date && (
                      <span className="text-gray-400 text-xs font-medium">{currentAlbum.date}</span>
                    )}
                  </div>
                  <h2
                    className="text-2xl md:text-4xl font-bold text-white mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {currentAlbum.title}
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base max-w-3xl leading-relaxed">
                    {currentAlbum.description}
                  </p>
                </div>

                {/* Layout Style Toggles */}
                <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-xl border border-white/10">
                  <span className="text-xs text-gray-400 px-2 font-medium">Layout:</span>
                  <button
                    onClick={() => setLayoutStyle('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      layoutStyle === 'grid' ? 'bg-[#FDB515] text-[#060D17]' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Grid Layout"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 002-2h2a2 2 0 002 2v2a2 2 0 00-2 2h-2a2 2 0 00-2-2V5zM11 13a2 2 0 002-2h2a2 2 0 002 2v2a2 2 0 00-2 2h-2a2 2 0 00-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setLayoutStyle('mosaic')}
                    className={`p-2 rounded-lg transition-all ${
                      layoutStyle === 'mosaic' ? 'bg-[#FDB515] text-[#060D17]' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Featured Mosaic Layout"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Album Photo Grid */}
            <div
              className={
                layoutStyle === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
                  : 'grid grid-cols-1 md:grid-cols-3 gap-6'
              }
            >
              {currentAlbum.photos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(currentAlbum.photos, idx)}
                  className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-[#FDB515]/50 hover:shadow-2xl hover:shadow-[#FDB515]/10 ${
                    layoutStyle === 'mosaic' && idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={resolveImageUrl(photo.imagePath)}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    unoptimized
                  />
                  {/* Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060D17] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Photo Info Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="inline-block px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-md text-[11px] font-medium text-[#FDB515] mb-2">
                      Photo {idx + 1} of {currentAlbum.photos.length}
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {photo.title}
                    </h3>
                    {photo.description && (
                      <p className="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {photo.description}
                      </p>
                    )}
                  </div>

                  {/* Expand Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALBUMS STACKED VIEW (DEFAULT) */}
        {!selectedAlbumId && viewMode === 'albums' && (
          <div className="space-y-12">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-white/5 border border-white/10 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filteredAlbums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filteredAlbums.map((album) => (
                  <div
                    key={album.id}
                    onClick={() => setSelectedAlbumId(album.id)}
                    className="group relative cursor-pointer flex flex-col"
                  >
                    {/* 3D Stacked Card Effect Behind Main Cover */}
                    <div className="relative w-full aspect-[4/3] mb-4">
                      {/* Background Stack Layer 2 */}
                      <div className="absolute inset-0 bg-[#003262]/40 border border-white/10 rounded-2xl transform rotate-3 translate-x-2 translate-y-2 group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-3 transition-all duration-500 ease-out pointer-events-none" />
                      
                      {/* Background Stack Layer 1 */}
                      <div className="absolute inset-0 bg-[#FDB515]/20 border border-white/10 rounded-2xl transform -rotate-2 -translate-x-1 translate-y-1 group-hover:-rotate-4 group-hover:-translate-x-3 group-hover:translate-y-2 transition-all duration-500 ease-out pointer-events-none" />

                      {/* Main Album Front Cover Card */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-xl group-hover:border-[#FDB515]/80 group-hover:shadow-2xl group-hover:shadow-[#FDB515]/20 transition-all duration-500">
                        <Image
                          src={resolveImageUrl(album.coverImage)}
                          alt={album.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                          unoptimized
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060D17] via-black/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                        {/* Top Category Badge & Photo Count Pill */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-[#FDB515] font-bold text-xs rounded-full uppercase tracking-wider">
                            {album.categoryLabel}
                          </span>
                          <span className="px-3 py-1 bg-[#003262] backdrop-blur-md border border-white/20 text-white font-bold text-xs rounded-full flex items-center gap-1.5 shadow-md">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {album.photos.length} Photos
                          </span>
                        </div>

                        {/* Open Album Hover Prompt */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="px-5 py-2.5 bg-[#FDB515] text-[#060D17] font-extrabold text-sm rounded-full shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Open Album
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Album Metadata Info */}
                    <div className="px-1">
                      <div className="text-xs text-gray-400 font-medium mb-1 flex items-center gap-2">
                        <span>{album.date || 'Album Collection'}</span>
                        {album.location && (
                          <>
                            <span>•</span>
                            <span>{album.location}</span>
                          </>
                        )}
                      </div>
                      <h3
                        className="text-xl font-bold text-white group-hover:text-[#FDB515] transition-colors duration-300 line-clamp-1"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {album.title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm mt-1 line-clamp-2 leading-relaxed">
                        {album.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
                <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">No photo albums found</h3>
                <p className="text-gray-400 text-sm">Try choosing a different category filter or clearing your search term.</p>
              </div>
            )}
          </div>
        )}

        {/* ALL PHOTOS UNIFIED GRID VIEW */}
        {!selectedAlbumId && viewMode === 'all-photos' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allPhotosFlat.map((photo, idx) => (
                <div
                  key={`${photo.id}-${idx}`}
                  onClick={() => openLightbox(allPhotosFlat, idx)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer transition-all hover:border-[#FDB515]/60 hover:shadow-xl"
                >
                  <Image
                    src={resolveImageUrl(photo.imagePath)}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[10px] text-[#FDB515] font-bold uppercase tracking-wider block mb-0.5">
                      {photo.albumTitle || photo.collection}
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{photo.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* LIGHTBOX / FULLSCREEN MODAL */}
      {lightboxState.isOpen && lightboxState.photosList[lightboxState.currentIndex] && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 animate-fadeIn">
          
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-xs font-semibold">
                Photo {lightboxState.currentIndex + 1} of {lightboxState.photosList.length}
              </span>
              <span className="hidden sm:inline text-gray-400 text-xs">
                Use ← → arrow keys to navigate
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center justify-center"
              title="Close (Esc)"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Photo View with Left/Right Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 max-w-7xl mx-auto w-full">
            
            {/* Previous Arrow */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 md:left-4 z-20 p-3 md:p-4 bg-black/50 hover:bg-[#003262] text-white rounded-full border border-white/20 transition-all hover:scale-110"
              title="Previous Photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center">
              <Image
                src={resolveImageUrl(lightboxState.photosList[lightboxState.currentIndex].imagePath)}
                alt={lightboxState.photosList[lightboxState.currentIndex].title}
                fill
                sizes="100vw"
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Next Arrow */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 md:right-4 z-20 p-3 md:p-4 bg-black/50 hover:bg-[#003262] text-white rounded-full border border-white/20 transition-all hover:scale-110"
              title="Next Photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Photo Caption Details */}
          <div className="w-full max-w-4xl mx-auto text-center z-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {lightboxState.photosList[lightboxState.currentIndex].title}
            </h3>
            {lightboxState.photosList[lightboxState.currentIndex].description && (
              <p className="text-gray-300 text-sm max-w-2xl mx-auto">
                {lightboxState.photosList[lightboxState.currentIndex].description}
              </p>
            )}
          </div>
        </div>
      )}

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.35s ease-out forwards; }
      `}} />
    </main>
  );
}
