"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

interface Disclosure {
  _id: string;
  title: string;
  pdfUrl: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function DisclosuresGrid() {
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/disclosures`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDisclosures(data.data);
        }
      })
      .catch((err) => console.error("Error fetching disclosures:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003262]"></div>
      </div>
    );
  }

  if (disclosures.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No documents available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {disclosures.map((doc) => (
        <a
          key={doc._id}
          href={`${BACKEND_URL}${doc.pdfUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-[#cc0000] hover:bg-[#a30000] transition-colors duration-300 p-6 flex items-center justify-center min-h-[100px] shadow-md border-b-4 border-[#8a0000]"
        >
          <span className="text-white text-center font-medium tracking-wide text-sm md:text-base z-10">
            {doc.title}
          </span>
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
        </a>
      ))}
    </div>
  );
}


export default function MandatoryDisclosurePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[550px] mt-[100px] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_main.png"
            fill
            className="object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite]"
            alt="Mandatory Disclosure Banner"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/70 to-[#003262]/40 mix-blend-multiply"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left">
          <div className="inline-block mb-4 px-4 py-1.5 bg-[#FDB515]/20 backdrop-blur-md border border-[#FDB515]/30 rounded-full">
            <span className="text-[#FDB515] font-semibold tracking-wider text-sm uppercase">Transparency & Trust</span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Mandatory Disclosure
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light">
            All essential information and documents transparently available for our community.
          </p>
        </div>

        {/* Decorative Bottom Wave/Curve */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-20"></div>

      </section>

      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
        <DisclosuresGrid />
      </section>

      <Footer />
    </main>
  );
}
