"use client";

import Image from "next/image";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

export default function LeadershipPage() {
  const leaders = [
    {
      role: "Chairman's Message",
      name: "Nitya Singh",
      image: "/chairman_placeholder.jpeg",
      reverse: false,
      quote: "Education is the manifestation of perfection already in man, as Swami Vivekananda once said.",
      description: (
        <>
          <p className="mb-4">
            At Birla Heritage International School Siwan, we have taken it upon ourselves to unlock this latent perfection and talent in every child under our care.
          </p>
          <p className="mb-4">
            Nitya Singh is a software professional with 16 years of experience in Microsoft, one of the world&apos;s leading technology companies. She has a post-graduate degree in Computer Science from Hyderabad Central University, where she graduated with distinction. She is currently working as a Manager in Microsoft, leading a team of talented developers and engineers.
          </p>
          <p>
            Nitya Singh has a passion for creating innovative solutions that can improve the lives of millions of people. She has been involved in various projects and is recognized for her outstanding contributions and leadership. She is also a mentor and coach for aspiring software professionals, helping them to achieve their goals and dreams.
          </p>
        </>
      ),
    },
    {
      role: "Director's Message",
      name: "Subash Singh",
      image: "/team_placeholder.jpeg",
      reverse: true,
      quote: "Giving kids a smooth learning environment so they can reach their greatest potential.",
      description: (
        <>
          <p className="mb-4">
            The goal of Birla Heritage International School Siwan is to give kids a smooth learning environment so they can reach their greatest potential. We wanted to offer something special where a child can examine all options before starting the journey of academic learning.
          </p>
          <p>
            As there are so many schools popping up all over the place but they are all limited to a certain area of learning approach. In order to ensure that a person&apos;s creativity and learning are unrestricted, we sought to maintain the formative years as open and inclusive as possible.
          </p>
        </>
      ),
    }
  ];

  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans selection:bg-[#003262] selection:text-white">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[550px] mt-[100px] flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_main.png"
            fill
            className="object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite]"
            alt="Leadership Banner"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/70 to-[#003262]/40 mix-blend-multiply"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left">
          <div className="inline-block mb-4 px-4 py-1.5 bg-[#FDB515]/20 backdrop-blur-md border border-[#FDB515]/30 rounded-full">
            <span className="text-[#FDB515] font-semibold tracking-wider text-sm uppercase">Guiding the Future</span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Our Leaders & Advisors
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light">
            Meet the visionaries who inspire excellence and shape the future of Birla Heritage International School Siwan.
          </p>
        </div>

        {/* Decorative Bottom Wave/Curve (Optional, just using a gradient transition for now) */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#fcfcfc] to-transparent z-20"></div>
      </section>

      {/* Leadership Content Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">

        <div className="flex flex-col gap-12 md:gap-16">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className={`flex flex-col ${leader.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center group`}
            >

              {/* Image Container */}
              <div className="w-full lg:w-5/12 shrink-0 relative">
                {/* Decorative background shape */}
                <div className={`absolute top-4 ${leader.reverse ? '-left-4' : '-right-4'} w-full h-full bg-[#003262]/10 rounded-sm transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0 -z-10`}></div>

                <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-[#003262]/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Glassmorphism Name Tag (visible on small screens or as a stylistic element) */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-sm border border-white/40 shadow-md z-20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 lg:hidden">
                    <p className="text-[#003262] font-bold text-xs uppercase tracking-wider mb-1">{leader.role}</p>
                    <p className="text-gray-900 font-bold text-lg">{leader.name}</p>
                  </div>
                </div>
              </div>

              {/* Text Container */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-[2px] bg-[#FDB515]"></span>
                  <h3 className="text-[#FDB515] font-bold tracking-widest uppercase text-sm md:text-base">
                    {leader.role}
                  </h3>
                </div>

                <h2 className="text-3xl md:text-4xl text-[#003262] font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  {leader.name}
                </h2>

                <div className="relative mb-6">
                  {/* Large Quote Icon Background */}
                  <svg className="absolute -top-4 -left-4 w-12 h-12 text-[#FDB515]/20 -z-10 transform -rotate-6" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h4V8h-4zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h4V8h-4z" />
                  </svg>
                  <h4 className="text-lg md:text-xl text-[#003262]/80 font-medium italic leading-relaxed">
                    &ldquo;{leader.quote}&rdquo;
                  </h4>
                </div>

                <div className="text-gray-700 text-sm md:text-base leading-relaxed font-light text-justify">
                  {leader.description}
                </div>

                {/* Optional subtle interactive element */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center">
                  <a href={`mailto:info@birlaheritage.com?subject=Message for ${leader.name}`} className="inline-flex items-center gap-2 text-[#003262] font-semibold hover:text-[#FDB515] transition-colors duration-300 group/link">
                    Connect with {leader.name.split(' ')[0]}
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Bottom CTA / Banner */}
      <section className="w-full py-12 md:py-16 bg-[#003262] text-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Join Our Vision
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg mb-8">
          Experience the extraordinary learning environment cultivated by our dedicated leadership team.
        </p>
        <a href="/admissions" className="inline-block bg-[#FDB515] hover:bg-white text-[#003262] font-bold py-3 px-8 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
          Apply for Admissions
        </a>
      </section>

      <Footer />
    </main>
  );
}
