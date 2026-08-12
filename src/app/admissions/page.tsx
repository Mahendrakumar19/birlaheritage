"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { apiPost } from "@/lib/api";

const initialAdmissionForm = {
  studentFirstName: "",
  studentLastName: "",
  studentDob: "",
  studentAadhaar: "",
  grade: "",
  parentGuardianName: "",
  phone: "",
  email: "",
  streetAddress: "",
  streetAddressLine2: "",
  city: "",
  state: "",
  pinCode: "",
  country: "",
};

export default function AdmissionsPage() {
  const [form, setForm] = useState(initialAdmissionForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setFieldErrors({});
    setSubmitting(true);

    const result = await apiPost("/api/admissions", form);
    setSubmitting(false);

    if (!result.ok) {
      if (result.errors && result.errors.length > 0) {
        const map: Record<string, string> = {};
        result.errors.forEach((e) => { if (e.field) map[e.field] = e.message; });
        setFieldErrors(map);
        setFeedback({ type: "error", text: result.message });
      } else {
        setFeedback({ type: "error", text: result.message });
      }
      return;
    }

    setForm(initialAdmissionForm);
    setFeedback({
      type: "success",
      text: "✓ Your admission enquiry has been submitted! Our team will contact you soon.",
    });
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative w-full h-[350px] md:h-[500px] mt-[120px] flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_main.png"
            fill
            className="object-cover"
            alt="Students smiling"
            priority
          />
          <div className="absolute inset-0 bg-[#003262]/20"></div>
        </div>

        {/* Teal Bottom Bar */}
        <div className="relative z-10 w-full bg-[#003262]/95 backdrop-blur-sm py-4 md:py-6 flex items-center justify-center shadow-lg">
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            Admissions Enquiry
          </h1>
        </div>

      </section>

      {/* Form Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">

          <div className="mb-12 text-center">
            <p className="section-eyebrow text-lg md:text-xl mb-3">
              Admissions open for 2026-2027
            </p>
            <h2 className="heading-xl text-4xl md:text-5xl lg:text-6xl">
              A school where learning leads tomorrow
            </h2>
            <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-2xl mx-auto">
              Join Birla Heritage International School and give your child the foundation they need to succeed. Fill out the enquiry form to get started on your admission journey with us.
            </p>
          </div>

          <div className="w-full bg-white rounded-md p-8 md:p-12 shadow-2xl border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003262] mb-8 pb-4 border-b-2 border-[#FDB515]">
              Enquiry Form
            </h2>

            <form className="flex flex-col gap-6" onSubmit={onSubmit}>
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Student First Name *</label>
                  <input name="studentFirstName" value={form.studentFirstName} onChange={onChange} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Student Last Name</label>
                  <input name="studentLastName" value={form.studentLastName} onChange={onChange} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Student DOB *</label>
                  <input name="studentDob" value={form.studentDob} onChange={onChange} type="date" max={new Date().toISOString().split("T")[0]} className="w-full bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Student aadhaar number *</label>
                  <input name="studentAadhaar" value={form.studentAadhaar} onChange={onChange} type="text" placeholder="xxxx xxxx xxxx" className="w-full bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Grade *</label>
                  <div className="relative">
                    <select name="grade" value={form.grade} onChange={onChange} className={`w-full bg-gray-50 border text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none appearance-none ${fieldErrors.grade ? 'border-red-500' : 'border-gray-300'}`} required>
                      <option value="" disabled hidden>Select Class</option>
                      <option value="nursery">Nursery</option>
                      <option value="lkg">L.K.G</option>
                      <option value="ukg">U.K.G</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                    <svg className="w-4 h-4 absolute right-3 top-3.5 pointer-events-none text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                  {fieldErrors.grade && <span className="text-red-500 text-[11px]">{fieldErrors.grade}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Parent/Guardian Name *</label>
                  <input name="parentGuardianName" value={form.parentGuardianName} onChange={onChange} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Phone *</label>
                  <input name="phone" value={form.phone} onChange={onChange} type="tel" placeholder="Phone" className="w-full bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Email *</label>
                  <input name="email" value={form.email} onChange={onChange} type="email" className="w-full bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Street Address *</label>
                  <input name="streetAddress" value={form.streetAddress} onChange={onChange} type="text" placeholder="Street Address" className="w-full bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Street Address Line 2 (optional)</label>
                  <input name="streetAddressLine2" value={form.streetAddressLine2} onChange={onChange} type="text" placeholder="Apartment, landmark, etc." className="w-full bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" />
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">City *</label>
                  <input name="city" value={form.city} onChange={onChange} type="text" placeholder="City" className="w-full bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">State *</label>
                  <input name="state" value={form.state} onChange={onChange} type="text" placeholder="State" className="w-full bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Pin Code *</label>
                  <input name="pinCode" value={form.pinCode} onChange={onChange} type="text" placeholder="Pin Code" className="w-full bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-700 text-[13px] font-medium">Country *</label>
                  <div className="relative">
                    <select name="country" value={form.country} onChange={onChange} className="w-full bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003262] py-2.5 px-3 rounded-none appearance-none" required>
                      <option value="" disabled hidden>Country</option>
                      <option value="india">India</option>
                      <option value="other">Other</option>
                    </select>
                    <svg className="w-4 h-4 absolute right-3 top-3.5 pointer-events-none text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {feedback && (
                <div className={`text-center text-sm ${feedback.type === "success" ? "text-green-700" : "text-red-600"}`}>
                  <p>{feedback.text}</p>
                  {feedback.type === "error" && Object.keys(fieldErrors).length > 0 && (
                    <ul className="mt-2 list-disc list-inside">
                      {Object.entries(fieldErrors).map(([field, message]) => (
                        <li key={field}>{message}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#003262] hover:bg-[#002855] disabled:opacity-60 text-white font-bold text-lg py-3 px-8 transition-colors duration-300 rounded-sm"
                >
                  {submitting ? "Submitting..." : "Submit Form >"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Admissions Info & Contact Sections */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="heading-xl text-3xl md:text-4xl mb-8">
            Admissions
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Welcome Card */}
            <div className="bg-white border border-gray-200 border-t-4 border-t-[#FDB515] p-8 md:p-10 shadow-sm flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#003262] mb-2">
                Welcome to Birla Heritage International School Siwan!
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                Thank you for expressing interest in our school.
              </p>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                Birla Heritage International School Siwan has an admissions policy that is inclusive, accepting students across the ability range. All students are eligible for admission if it is believed that the school can provide an educational programme that can meet their particular needs.
              </p>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                While most students will join school at the beginning of each academic year, we understand that some may arrive at a later date. Based on the availability of places, we are happy to admit students throughout the year.
              </p>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                We invite families to visit us and share in the Birla Heritage experience.
              </p>
            </div>

            {/* Contact Card */}
            <div className="bg-white border border-gray-200 border-t-4 border-t-[#FDB515] p-8 md:p-10 shadow-sm flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-[#003262] mb-6">
                Contact Us Details
              </h3>
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-semibold text-[#003262] mb-2">Phone number</h4>
                  <p className="text-gray-700 text-[15px]">+91 9122899149</p>
                  <p className="text-gray-700 text-[15px]">+91 7633800196</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#003262] mb-2">Address</h4>
                  <p className="text-gray-700 text-[15px] leading-relaxed">
                    Survey No 813 - 817 Markan, Near Andar Dhala, Siwan, Bihar - 841226
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SchoolAdvantages />

      <AdmissionsVideo />

      <Footer />
    </main>
  );
}

function AdmissionsVideo() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="heading-xl text-3xl md:text-4xl mb-4">
            Experience Birla Heritage
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Take a glimpse into our campus life, state-of-the-art facilities, and the vibrant student community that makes our school special.
          </p>
        </div>

        <div className="flex justify-center">
          <HoverBorderGradient
            containerClassName="rounded-xl w-full max-w-4xl"
            as="div"
            className="p-1 bg-gray-100 w-full overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/anS9pY2ofx0"
                title="Birla Heritage International School Video"
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </HoverBorderGradient>
        </div>
      </div>
    </section>
  );
}

const advantagesData = [
  {
    desc: "Trained, well qualified and dedicated faculty.",
    icon: <svg className="w-10 h-10 text-[#ea580c] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
  },
  {
    desc: "Individual attention given to students.",
    icon: <svg className="w-10 h-10 text-[#ea580c] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
  },
  {
    desc: "Essential communication for career guidance.",
    icon: <svg className="w-10 h-10 text-[#ea580c] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
  },
  {
    desc: "Making them more empathetic and responsible citizens/Human Beings.",
    icon: <svg className="w-10 h-10 text-[#ea580c] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
  },
  {
    desc: "Establishing emotional connect and close bonding between teachers and students.",
    icon: <svg className="w-10 h-10 text-[#ea580c] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
  },
  {
    desc: "Comfort of a positive and motivating school ambience.",
    icon: <svg className="w-10 h-10 text-[#ea580c] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
  }
];

function SchoolAdvantages() {
  return (
    <section className="w-full bg-[#118a92] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

        {/* Left Side: Advantages Grid */}
        <div className="w-full lg:w-7/12">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-10 leading-tight">
            The Birla Heritage <br className="hidden md:block" /> Advantage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantagesData.map((adv, idx) => (
              <div key={idx} className="bg-white px-6 py-8 flex flex-col items-center justify-center text-center rounded-sm h-full shadow-lg border-b-4 border-transparent hover:border-[#ea580c] hover:-translate-y-1 transition-all duration-300">
                {adv.icon}
                <span className="text-gray-800 text-[14px] font-bold leading-relaxed">
                  {adv.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image and Logo */}
        <div className="w-full lg:w-5/12 relative flex flex-col items-center justify-center mt-12 lg:mt-0 py-8 z-0">

          {/* Orange Bench line (decorative behind circle) */}
          <div className="absolute bottom-[25%] w-[120%] h-14 bg-[#ea580c] z-0 -left-[10%] rounded-sm"></div>

          {/* White Background Circle */}
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] bg-[#e4f6f9] rounded-full z-10 flex flex-col items-center justify-center overflow-hidden shadow-2xl">

            {/* Logo Area Inside Circle */}
            <div className="absolute top-8 md:top-10 z-20 flex flex-col items-center gap-1 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl w-[80%] text-center shadow-md border border-gray-100">
              <span className="text-black font-extrabold text-[14px] md:text-[16px] leading-tight uppercase">
                Birla Heritage <br /> International School
              </span>
              <span className="text-[9px] md:text-[10px] text-gray-700 font-bold tracking-widest mt-1">
                Siwan, BIHAR
              </span>
            </div>

            {/* Image */}
            <div className="absolute bottom-0 w-full h-[65%]">
              <Image
                src="/about_small.png"
                alt="Students"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
