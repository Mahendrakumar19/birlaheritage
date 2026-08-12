import Image from "next/image";
import Link from "next/link";
import React from "react";

const galleryHighlights = [
  {
    id: 1,
    title: "Annual Spring Festival (Fete) 2026",
    link: "/gallery#campus",
    image: "/event_bihar_1_1785832999825.png"
  },
  {
    id: 2,
    title: "Annual Function Class 6-12",
    link: "/gallery#students-corner",
    image: "/event_bihar_2_1785833010076.png"
  },
  {
    id: 3,
    title: "Annual Function for Grades I & II",
    link: "/gallery#campus",
    image: "/event_bihar_3_1785833022146.png"
  },
  {
    id: 4,
    title: "Annual Function for Nursery to Sr. KG 2025",
    link: "/gallery#students-corner",
    image: "/event_bihar_4_1785833035313.png"
  },
  {
    id: 5,
    title: "Super Sports 2025",
    link: "/gallery#campus",
    image: "/event_bihar_1_1785832999825.png"
  },
  {
    id: 6,
    title: "Innovation Day 2025",
    link: "/gallery#students-corner",
    image: "/event_bihar_2_1785833010076.png"
  }
];

export default function EventsSection() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="section-eyebrow mb-4">See and feel it</p>
          <h2 className="heading-xl text-3xl md:text-4xl">
            Gallery Highlights
          </h2>
        </div>

        {/* Grid - Sharp boxes, zero gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#0f2142]">
          {galleryHighlights.map((item) => (
            <React.Fragment key={item.id}>
              {/* Image Box */}
              <div className="relative aspect-[4/3] w-full bg-[#111111] overflow-hidden group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Box */}
              <div className="bg-[#0f2142] text-white flex flex-col items-center justify-center p-8 aspect-[4/3] relative">
                <h3 className="text-center text-[15px] leading-relaxed font-medium mb-8 max-w-[200px]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <Link
                  href={item.link}
                  className="border border-white/60 px-5 py-2.5 text-[12px] tracking-wider hover:bg-white hover:text-[#0f2142] transition-colors"
                >
                  VIEW MORE &gt;
                </Link>
              </div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
