"use client";

import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

export default function LeadershipPage() {
  const leaders = [
    {
      role: "Chairman's Office",
      name: "Nitya Singh",
      designation: "Chairman",
      image: "/chairman_placeholder.jpeg",
      reverse: false,
      quote: "Education is the manifestation of perfection already in man.",
      bio: "Nitya Singh is a seasoned technology leader with 16 years of management experience at Microsoft. She holds a post-graduate degree in Computer Science from Hyderabad Central University, where she graduated with distinction. Currently managing engineering teams at Microsoft, she is passionate about creating innovative solutions and mentoring young professionals.",
      message: (
        <>
          <p className="mb-4">
            &ldquo;Education is the manifestation of perfection already in man,&rdquo; as Swami Vivekananda once said. At Birla Heritage International School Siwan, we have taken it upon ourselves to unlock this latent perfection and talent in every child under our care.
          </p>
          <p>
            Our vision is to empower young minds with knowledge, character, and 21st-century skills, preparing them to excel in an interconnected global world while remaining grounded in our rich cultural values.
          </p>
        </>
      ),
    },
    {
      role: "Director's Office",
      name: "Subash Singh",
      designation: "Director",
      image: "/team_placeholder.jpeg",
      reverse: true,
      quote: "Giving children a smooth learning environment so they can reach their greatest potential.",
      bio: "Subash Singh guides the institutional development and strategic growth of Birla Heritage International School Siwan, focusing on inclusive learning and student-centric facilities.",
      message: (
        <>
          <p className="mb-4">
            The goal of Birla Heritage International School Siwan is to give kids a smooth learning environment so they can reach their greatest potential. We wanted to offer something special where a child can examine all options before starting the journey of academic learning.
          </p>
          <p>
            In order to ensure that a person&apos;s creativity and learning are unrestricted, we sought to maintain the formative years as open and inclusive as possible.
          </p>
        </>
      ),
    },
    {
      role: "Principal's Office",
      name: "[Principal Information Pending]",
      designation: "Principal",
      image: "/team_placeholder.jpeg",
      reverse: false,
      isPlaceholder: true,
      quote: "Fostering academic excellence, character development, and future-ready skills in every learner.",
      bio: "Academic Leadership & School Administration.",
      message: (
        <>
          <p className="mb-4">
            Welcome to Birla Heritage International School Siwan. Our school is committed to nurturing curiosity, intellectual growth, and strong ethical values in every student.
          </p>
          <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs md:text-sm rounded font-medium">
            <strong>Official Content Notice:</strong> Official Principal name, designation, message copy, and portrait photograph are pending final content delivery from school administration.
          </div>
        </>
      ),
    }
  ];

  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative w-full h-[380px] md:h-[480px] mt-[100px] flex flex-col justify-center items-center overflow-hidden bg-[#003262]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_main.png"
            fill
            className="object-cover object-center scale-105"
            alt="Leadership Banner"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001f3d]/90 via-[#003262]/80 to-[#003262]/60 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center md:text-left">
          <div className="inline-block mb-3 px-4 py-1.5 bg-[#FDB515]/20 backdrop-blur-md border border-[#FDB515]/30 rounded-full">
            <span className="text-[#FDB515] font-bold tracking-wider text-xs md:text-sm uppercase">Guiding the Future</span>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Leadership & Governance
          </h1>
          <p className="text-white/90 text-base md:text-xl max-w-2xl font-light leading-relaxed">
            Meet the visionaries who inspire excellence and shape the future of Birla Heritage International School Siwan.
          </p>
        </div>

        {/* Decorative Bottom Fade */}
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-[#fcfcfc] to-transparent z-20" />
      </section>

      {/* Leadership Content Section */}
      <section className="py-16 md:py-24 container-custom flex-1">
        <div className="flex flex-col gap-16 md:gap-24">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className={`flex flex-col ${leader.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-start group`}
            >

              {/* Image Container */}
              <div className="w-full lg:w-4/12 shrink-0 relative">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {leader.isPlaceholder && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                      <span className="badge-gold text-xs">Official Photo Pending</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Container */}
              <div className="w-full lg:w-8/12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-[#FDB515]" />
                  <h3 className="text-[#FDB515] font-bold tracking-widest uppercase text-xs md:text-sm">
                    {leader.role}
                  </h3>
                </div>

                <h2 className="text-3xl md:text-4xl text-[#003262] font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {leader.name}
                </h2>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-5">{leader.designation}</p>

                {/* Profile / Bio Summary */}
                <div className="mb-6 bg-gray-50 p-4 rounded border-l-4 border-[#003262]">
                  <h4 className="text-[#003262] font-bold text-xs uppercase tracking-wider mb-1">Profile Overview</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{leader.bio}</p>
                </div>

                {/* Formal Message */}
                <div>
                  <h4 className="text-[#003262] font-bold text-xs uppercase tracking-wider mb-2">Message to the Community</h4>
                  <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
                    {leader.message}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Bottom Admissions CTA */}
      <section className="w-full py-16 bg-[#003262] text-white text-center px-4 border-t-4 border-[#FDB515]">
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Join Our Vision
        </h2>
        <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base mb-6">
          Experience the extraordinary learning environment cultivated by our dedicated leadership team.
        </p>
        <Link href="/admissions" className="btn-primary text-sm font-bold px-8 py-3.5">
          Apply for Admissions &rarr;
        </Link>
      </section>

      <Footer />
    </main>
  );
}

