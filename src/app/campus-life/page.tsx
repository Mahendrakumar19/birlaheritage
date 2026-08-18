"use client";

import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

const campusSpaces = [
  {
    title: "Interactive Classrooms",
    subtitle: "Modern Learning Spaces",
    desc: "Designed to foster active student participation, collaborative project work, and an engaging learning atmosphere.",
    image: "/about_main.png",
    status: "VERIFIED",
  },
  {
    title: "Practical Discovery Spaces",
    subtitle: "Science & Analytical Exploration",
    desc: "Dedicated facilities for hands-on experimentation, scientific inquiry, and structured analytical skill development.",
    image: "/obj_research_1785831334762.png",
    status: "VERIFIED",
  },
  {
    title: "Library & Knowledge Resource Center",
    subtitle: "Literary & Research Access",
    desc: "Curated collections of reading materials, reference guides, and quiet reading areas supporting independent study.",
    image: "/about_small.png",
    status: "VERIFIED",
  },
];

export default function CampusLifePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col font-sans">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative w-full h-[380px] md:h-[480px] mt-[100px] flex flex-col justify-center items-center overflow-hidden bg-[#003262]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_main.png"
            fill
            className="object-cover object-center scale-105"
            alt="Campus Life Banner"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001f3d]/90 via-[#003262]/80 to-[#003262]/60 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center md:text-left">
          <div className="inline-block mb-3 px-4 py-1.5 bg-[#FDB515]/20 backdrop-blur-md border border-[#FDB515]/30 rounded-full">
            <span className="text-[#FDB515] font-bold tracking-wider text-xs md:text-sm uppercase">Student Experience</span>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Campus & Student Life
          </h1>
          <p className="text-white/90 text-base md:text-xl max-w-2xl font-light leading-relaxed">
            A vibrant environment fostering academic discovery, physical wellness, creative expression, and community spirit.
          </p>
        </div>

        {/* Decorative Bottom Fade */}
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20" />
      </section>

      {/* 1. Infrastructure & Learning Spaces */}
      <section id="infrastructure" className="py-16 md:py-24 container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-eyebrow mb-2">Campus Facilities</p>
            <h2 className="heading-xl text-3xl md:text-4xl text-gray-900">
              Infrastructure & Learning Spaces
            </h2>
          </div>
          <Link href="/gallery/campus" className="btn-outline-primary whitespace-nowrap text-xs uppercase tracking-wider">
            Explore Full Campus Gallery &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campusSpaces.map((space, idx) => (
            <div key={idx} className="card-base overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="badge-gold text-[10px] mb-1">{space.subtitle}</span>
                    <h3 className="font-bold text-lg leading-snug">{space.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {space.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Sports & Physical Wellness */}
      <section id="sports" className="py-16 md:py-24 bg-[#f8fafc] border-t border-b border-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="section-eyebrow mb-2">Physical Wellness & Athletics</p>
            <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
              Liberal Arts & Sports Tradition
            </h2>
            <div className="accent-line mx-auto mb-6" />
            <p className="text-gray-700 text-base leading-relaxed">
              We value the role of sports and creative expression as integral components of learning. Participating in athletic activities fosters discipline, resilience, sportsmanship, and teamwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-4">
              <h3 className="heading-lg text-2xl text-[#003262]">Fostering Healthy Habits & Team Spirit</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Physical education at Birla Heritage is designed to offer children varied opportunities to experience physical activity in an atmosphere of encouragement, personal development, and healthy competition.
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded text-amber-900 text-xs">
                <strong>Sports Roster Notice:</strong> Specific sports rosters, coach profiles, and annual tournament schedules are updated per academic term upon administrative release.
              </div>
            </div>
            <div className="relative h-[280px] rounded-lg overflow-hidden border-2 border-white shadow-md">
              <Image
                src="/test_student_1_1785833398588.png"
                alt="Student participating in physical wellness activities"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Student Community & Culture */}
      <section id="community" className="py-16 md:py-24 container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <p className="section-eyebrow mb-2">Student Life</p>
            <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-2">
              Student Community & Creative Corner
            </h2>
            <p className="text-gray-600 text-sm max-w-xl">
              A vibrant platform celebrating student accomplishments, cultural festivals, art exhibitions, and collaborative learning.
            </p>
          </div>
          <Link href="/gallery/students-corner" className="btn-primary text-xs uppercase tracking-wider whitespace-nowrap">
            View Students&apos; Corner Gallery &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-base p-6 border-t-4 border-t-[#003262]">
            <h3 className="heading-md text-lg text-gray-900 mb-2">Annual Festivals & Events</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Celebrating cultural heritage, spring festivals, sports meets, and student exhibitions throughout the academic year.
            </p>
            <Link href="/gallery" className="text-[#003262] font-semibold text-xs uppercase tracking-wider hover:text-[#FDB515]">
              Explore Event Gallery &rarr;
            </Link>
          </div>

          <div className="card-base p-6 border-t-4 border-t-[#FDB515]">
            <h3 className="heading-md text-lg text-gray-900 mb-2">Co-Curricular Engagement</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Interactive workshops, art exhibitions, and project showcases encouraging creative expression and teamwork.
            </p>
            <Link href="/gallery/students-corner" className="text-[#003262] font-semibold text-xs uppercase tracking-wider hover:text-[#FDB515]">
              View Student Projects &rarr;
            </Link>
          </div>

          <div className="card-base p-6 border-t-4 border-t-[#003262]">
            <h3 className="heading-md text-lg text-gray-900 mb-2">Child-Centric Environment</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Guided by the 4 C&apos;s — Care, Co-operation, Collaboration, and Courtesy — ensuring every child feels valued.
            </p>
            <Link href="/about-us" className="text-[#003262] font-semibold text-xs uppercase tracking-wider hover:text-[#FDB515]">
              Read About School Ethos &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Transport & Sustainability Status Section */}
      <section className="py-16 bg-[#f8fafc] border-t border-b border-gray-100">
        <div className="container-custom space-y-8">
          {/* Transport Status Card */}
          <div id="transport" className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="badge-gold text-xs">Transportation Services</span>
              <h3 className="heading-md text-xl text-gray-900">School Transport & Coverage Information</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                School bus transportation details, route coverage, vehicle specifications, and safety guidelines are managed by the school transport office.
              </p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded md:w-80 shrink-0 font-medium">
              <strong>Official Content Notice:</strong> Formal route schedules, coverage areas, fleet details, and transport desk contact numbers are pending web publication.
            </div>
          </div>

          {/* Sustainability Status Card */}
          <div id="sustainability" className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="badge-gold text-xs">Environmental Responsibility</span>
              <h3 className="heading-md text-xl text-gray-900">Green Campus & Sustainability Initiatives</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Birla Heritage is committed to maintaining a clean, green, and eco-friendly campus environment supporting environmental awareness among students.
              </p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded md:w-80 shrink-0 font-medium">
              <strong>Official Content Notice:</strong> Formal sustainability specifications and eco-club project details are pending administrative publication.
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Conversion Banner */}
      <section className="w-full py-16 bg-[#003262] text-white text-center px-4 border-t-4 border-[#FDB515]">
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Experience Campus Life at Birla Heritage
        </h2>
        <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base mb-6">
          Schedule a visit or submit an application for Nursery through Class 9.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/admissions" className="btn-primary text-sm font-bold px-8 py-3.5">
            Apply for Admissions &rarr;
          </Link>
          <Link href="/gallery/campus" className="border-2 border-white text-white hover:bg-white hover:text-[#003262] transition-colors rounded-sm text-sm font-bold px-8 py-3.5 no-underline" style={{ fontFamily: 'var(--font-heading)' }}>
            View Campus Gallery
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
