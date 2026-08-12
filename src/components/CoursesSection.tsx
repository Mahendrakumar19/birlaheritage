import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    id: 1,
    badge: "Pre-Primary",
    durationText: "1 Year",
    title: "Nursery",
    description: "Early childhood education focusing on foundational skills and play-based learning.",
    seats: "40 Seats",
    image: "/course_pre_primary.png",
  },
  {
    id: 2,
    badge: "Pre-Primary",
    durationText: "1 Year",
    title: "L.K.G",
    description: "Lower Kindergarten, introducing alphabets, numbers, and basic social skills.",
    seats: "40 Seats",
    image: "/course_pre_primary.png",
  },
  {
    id: 3,
    badge: "Pre-Primary",
    durationText: "1 Year",
    title: "U.K.G",
    description: "Upper Kindergarten, preparing students for primary school with enhanced learning.",
    seats: "40 Seats",
    image: "/course_pre_primary.png",
  },
  {
    id: 4,
    badge: "Primary",
    durationText: "1 Year",
    title: "Class 1",
    description: "First grade focusing on basic reading, writing, and mathematical concepts.",
    seats: "40 Seats",
    image: "/course_primary.png",
  },
  {
    id: 5,
    badge: "Primary",
    durationText: "1 Year",
    title: "Class 2",
    description: "Second grade continuing core foundational knowledge and discovery.",
    seats: "40 Seats",
    image: "/course_primary.png",
  },
  {
    id: 6,
    badge: "Primary",
    durationText: "1 Year",
    title: "Class 3",
    description: "Third grade introducing more complex problem solving and reading comprehension.",
    seats: "40 Seats",
    image: "/course_primary.png",
  },
  {
    id: 7,
    badge: "Primary",
    durationText: "1 Year",
    title: "Class 4",
    description: "Fourth grade expanding on sciences, environmental studies, and mathematics.",
    seats: "40 Seats",
    image: "/course_primary.png",
  },
  {
    id: 8,
    badge: "Primary",
    durationText: "1 Year",
    title: "Class 5",
    description: "Fifth grade transitioning students towards middle school expectations.",
    seats: "40 Seats",
    image: "/course_primary.png",
  },
  {
    id: 9,
    badge: "Middle",
    durationText: "1 Year",
    title: "Class 6",
    description: "Sixth grade introducing specialized subjects and deeper analytical thinking.",
    seats: "40 Seats",
    image: "/course_middle.png",
  },
  {
    id: 10,
    badge: "Middle",
    durationText: "1 Year",
    title: "Class 7",
    description: "Seventh grade advancing in sciences, social studies, and languages.",
    seats: "40 Seats",
    image: "/course_middle.png",
  }
];

export default function CoursesSection() {
  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-[#f8fafc] relative overflow-hidden border-t border-black/5">
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      {/* Top fade gradient to blend grid smoothly */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f8fafc] to-transparent z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-14 max-w-2xl mx-auto text-center flex flex-col items-center">
          <p className="section-eyebrow mb-4">Our Programs</p>
          <h2 className="heading-xl text-3xl md:text-4xl mb-5">
            Let's Check Our Courses
          </h2>
          <p className="text-gray-600 text-[16px] md:text-lg leading-relaxed">
            Discover insightful programs and expert guidance from our seasoned faculty team to elevate your knowledge and build a strong career foundation.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
          {courses.map((course) => (
            <Link href="#" key={course.id} className="group flex flex-col bg-white rounded-none overflow-hidden border border-black/10 hover:border-[#FDB515]/60 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl">
              
              {/* Image Section */}
              <div className="relative w-full h-[180px] overflow-hidden bg-gray-100">
                <Image 
                  src={course.image}
                  fill
                  alt={course.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Badge Overlay */}
                <div className="absolute top-4 right-4 bg-[#F9C301] text-[#111111] text-[11px] font-bold px-3 py-1.5 rounded-none flex items-center gap-1.5 shadow-md">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                  {course.badge}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 md:p-6 flex flex-col flex-1">
                
                {/* Duration / Type */}
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-[#F9C301]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-[#F9C301] font-semibold text-[13px] tracking-wide uppercase">
                    {course.durationText}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-[#111] mb-2 group-hover:text-[#FDB515] transition-colors leading-tight">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-[13.5px] leading-relaxed mb-5 flex-1 line-clamp-3">
                  {course.description}
                </p>


              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
