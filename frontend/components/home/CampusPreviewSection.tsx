"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const facilityPreviews = [
  {
    title: "Interactive Learning Spaces",
    desc: "Modern classrooms designed to foster active participation, collaborative problem solving, and student engagement.",
    image: "/obj_courses_1785831347955.png",
  },
  {
    title: "STEM & Practical Discovery",
    desc: "Dedicated environments for scientific exploration, hands-on experiments, and analytical skill development.",
    image: "/obj_research_1785831334762.png",
  },
  {
    title: "Library & Resource Center",
    desc: "Curated collections of reading materials, reference guides, and quiet reading spaces for students.",
    image: "/about_small.png",
  },
];

export default function CampusPreviewSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#f8fafc] border-t border-b border-gray-100">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-eyebrow mb-2">School Environment</p>
            <h2 className="heading-xl text-3xl md:text-4xl text-gray-900">
              Campus & Infrastructure
            </h2>
          </div>
          <Link href="/campus-life" className="btn-outline-primary whitespace-nowrap text-xs">
            Explore Campus Life &rarr;
          </Link>
        </div>

        {/* Visual Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilityPreviews.map((facility, idx) => (
            <div key={idx} className="card-base overflow-hidden group flex flex-col">
              <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg leading-snug">{facility.title}</h3>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {facility.desc}
                </p>
                <Link
                  href="/campus-life#infrastructure"
                  className="text-[#003262] font-semibold text-xs uppercase tracking-wider hover:text-[#FDB515] transition-colors"
                >
                  Explore Space &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
