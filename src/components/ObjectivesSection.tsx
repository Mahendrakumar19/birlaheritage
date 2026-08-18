"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const content = [
  {
    id: 1,
    title: "Holistic Development",
    description: "Focusing on the intellectual, physical, and emotional growth of every student to nurture well-rounded individuals ready for tomorrow's challenges.",
    image: "/obj_research_1785831334762.png"
  },
  {
    id: 2,
    title: "State-of-the-Art Infrastructure",
    description: "Providing world-class facilities, from advanced science and robotics labs to modern sports complexes, ensuring an optimal learning environment.",
    image: "/obj_courses_1785831347955.png"
  },
  {
    id: 3,
    title: "Global Curriculum",
    description: "Integrating international pedagogical standards with deep-rooted Indian values to foster responsible global citizens and critical thinkers.",
    image: "/obj_graduation_1785831358808.png"
  },
  {
    id: 4,
    title: "Academic Excellence",
    description: "A legacy of outstanding academic results, driven by experienced faculty, personalized attention, and innovative teaching methodologies.",
    image: "/obj_quality_1785831369236.png"
  },
  {
    id: 5,
    title: "Future-Ready Skills",
    description: "Equipping students with essential life skills, digital literacy, and leadership qualities to confidently navigate a rapidly changing world.",
    isCta: true
  },
];

export default function ObjectivesSection() {
  const [activeId, setActiveId] = useState(content[0].id);
  const activeItem = content.find(item => item.id === activeId) || content[0];

  return (
    <section className="w-full py-16 bg-[#fffdf5] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header Section */}
        <div className="mb-12 text-center flex flex-col items-center">
          <h2 className="heading-xl text-3xl md:text-4xl mb-4 font-light text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Birla Heritage International School Siwan Advantage
          </h2>
          <p className="text-gray-600 text-[15px] md:text-[16px] max-w-2xl font-light">
            We are committed to providing a nurturing environment that fosters the holistic development of every child, guided by the rich Birla heritage.
          </p>
        </div>

        {/* Compact Interactive Container */}
        <div className="bg-white p-6 md:p-10 shadow-sm border border-gray-100 rounded-lg flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* Left Column: Accordion Tabs */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-1">
            {content.map((item) => {
              const isActive = item.id === activeId;
              return (
                <div key={item.id} className="border-b border-gray-100 last:border-0 pb-1">
                  <button
                    onClick={() => setActiveId(item.id)}
                    className={`w-full text-left py-4 text-[18px] md:text-[22px] font-bold transition-all duration-300 ${isActive ? 'text-[#003262]' : 'text-gray-400 hover:text-gray-600'
                      }`}
                  >
                    {item.title}
                  </button>

                  {/* Accordion Description */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[200px] opacity-100 pb-4' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed font-light pr-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Image / CTA */}
          <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[300px] lg:min-h-full">
            <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[450px] relative rounded-lg overflow-hidden shadow-md">
              {activeItem.isCta ? (
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#FDB515] text-[#003262] relative p-6 text-center absolute inset-0">
                  <div className="mb-4">
                    <svg className="w-14 h-14 mx-auto text-[#003262]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-extrabold mb-3 text-[#003262]">Admissions Open</h3>
                  <p className="text-[#003262]/90 font-medium mb-6 max-w-sm">Enroll your child today at Birla Heritage International School Siwan.</p>
                  <Link href="/admissions" className="bg-[#003262] text-[#FDB515] px-8 py-3 rounded-full font-bold uppercase tracking-wider text-[14px] hover:bg-[#001f3d] transition-colors flex items-center gap-2">
                    APPLY NOW <span className="text-lg leading-none">&rarr;</span>
                  </Link>
                </div>
              ) : (
                <>
                  <Image
                    src={activeItem.image!}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-full w-full object-cover transition-opacity duration-500"
                    alt={activeItem.title}
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
