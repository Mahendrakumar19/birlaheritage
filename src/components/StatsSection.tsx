import React from 'react';

export default function StatsSection() {
  const stats = [
    {
      value: "18+",
      description: "Years of Excellence in providing quality education and shaping bright futures."
    },
    {
      value: "3000+",
      description: "Happy Students currently learning and growing in our nurturing environment."
    },
    {
      value: "150+",
      description: "Dedicated Teachers and staff committed to holistic student development."
    },
    {
      value: "100%",
      description: "Success Rate in board examinations, reflecting our academic rigor."
    }
  ];

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-[#F9C301] relative overflow-hidden flex justify-center">
      {/* Subtle bottom glow removed as gold is bright, adding a sleek dark geometric shape instead */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10 w-full">
        <h2 className="heading-xl text-3xl md:text-4xl lg:text-5xl text-center mb-4" style={{ color: 'var(--color-text)' }}>
          Trusted by parents all over the region
        </h2>
        <p className="text-[#111111]/80 font-medium text-center max-w-2xl mb-16 text-[16px] leading-relaxed">
          We are a team of dedicated educators passionate about nurturing young minds and helping them build a strong foundation for a successful future.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#111111] rounded-2xl p-8 border border-white/10 hover:border-[#F9C301]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-2xl" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="text-4xl md:text-5xl lg:text-[52px] font-bold text-white mb-4">
                {stat.value}
              </div>
              <div className="text-gray-400 text-[15px] leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
