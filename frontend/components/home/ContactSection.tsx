"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { apiPost } from "@/lib/api";

const initialContactForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState(initialContactForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setFieldErrors({});
    setSubmitting(true);

    const result = await apiPost("/api/contact", form);
    setSubmitting(false);

    if (!result.ok) {
      // Map field-level errors from backend
      if (result.errors && result.errors.length > 0) {
        const map: Record<string, string> = {};
        result.errors.forEach((e: any) => { if (e.field) map[e.field] = e.message; });
        setFieldErrors(map);
        setFeedback({ type: "error", text: "Please fix the errors below and try again." });
      } else {
        setFeedback({ type: "error", text: result.message });
      }
      return;
    }

    setForm(initialContactForm);
    setFeedback({
      type: "success",
      text: "✓ Thank you! Your message has been sent. We'll be in touch shortly.",
    });
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-stretch">

        {/* Left Side: Contact Information */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full py-2">
          <div className="mb-6 lg:mb-0">
            <h2 className="heading-lg text-3xl mb-3">Get in Touch</h2>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              We'd love to hear from you. Reach out to us with any questions or inquiries, and our team will get back to you promptly.
            </p>
          </div>

          <div className="flex flex-col justify-between flex-1 lg:mt-8 space-y-6 lg:space-y-0">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#FDB515]/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#FDB515]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h3 className="heading-md text-xl mb-2">School Address</h3>
                <p className="text-gray-600 font-medium">Birla Heritage International School</p>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  Survey No 813 - 817 Markan, Near Andar Dhala,<br />
                  Siwan, Bihar - 841226
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#FDB515]/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#FDB515]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <h3 className="heading-md text-xl mb-2">Contact Numbers</h3>
                <p className="text-gray-600 flex flex-col gap-1">
                  <a href="tel:+919122899149" className="hover:text-[#FDB515] transition-colors">+91 9122899149</a>
                  <a href="tel:+917633800196" className="hover:text-[#FDB515] transition-colors">+91 7633800196</a>
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#FDB515]/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#FDB515]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h3 className="heading-md text-xl mb-2">Email Address</h3>
                <p className="text-gray-600 flex flex-col gap-1">
                  <a href="mailto:info@birlaheritagesiwan.com" className="hover:text-[#FDB515] transition-colors">info@birlaheritagesiwan.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <div className="bg-[#FDB515] rounded-xl p-6 md:p-8 w-full h-full relative shadow-sm flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#003262] mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Get In Touch
            </h2>

            <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>

              {/* Row 1: Name */}
              <div className="flex flex-col">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  type="text"
                  placeholder="Name"
                  className={`w-full bg-transparent border-0 border-b border-[#333333]/40 px-0 py-2 text-[#333333] placeholder-[#333333]/70 focus:outline-none focus:ring-0 focus:border-[#333333] transition-colors text-base ${fieldErrors.name ? 'border-red-500' : ''
                    }`}
                  required
                />
                {fieldErrors.name && <span className="text-red-500 text-xs mt-1">{fieldErrors.name}</span>}
              </div>

              {/* Row 2: Email and Mobile Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex flex-col">
                  <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    type="email"
                    placeholder="Email ID"
                    className={`w-full bg-transparent border-0 border-b border-[#333333]/40 px-0 py-2 text-[#333333] placeholder-[#333333]/70 focus:outline-none focus:ring-0 focus:border-[#333333] transition-colors text-base ${fieldErrors.email ? 'border-red-500' : ''
                      }`}
                    required
                  />
                  {fieldErrors.email && <span className="text-red-500 text-xs mt-1">{fieldErrors.email}</span>}
                </div>
                <div className="flex flex-col">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    type="tel"
                    placeholder="Mobile Number"
                    className={`w-full bg-transparent border-0 border-b border-[#333333]/40 px-0 py-2 text-[#333333] placeholder-[#333333]/70 focus:outline-none focus:ring-0 focus:border-[#333333] transition-colors text-base ${fieldErrors.phone ? 'border-red-500' : ''
                      }`}
                    required
                  />
                  {fieldErrors.phone && <span className="text-red-500 text-xs mt-1">{fieldErrors.phone}</span>}
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="flex flex-col">
                <input
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  type="text"
                  placeholder="Your message/query"
                  className={`w-full bg-transparent border-0 border-b border-[#333333]/40 px-0 py-2 text-[#333333] placeholder-[#333333]/70 focus:outline-none focus:ring-0 focus:border-[#333333] transition-colors text-base ${fieldErrors.message ? 'border-red-500' : ''
                    }`}
                  required
                />
                {fieldErrors.message && <span className="text-red-500 text-xs mt-1">{fieldErrors.message}</span>}
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 mt-2">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  className="mt-[2px] w-4 h-4 rounded-sm border-2 border-[#003262]/60 text-[#003262] focus:ring-[#FDB515] focus:ring-offset-0 bg-transparent shrink-0 cursor-pointer"
                />
                <label htmlFor="consent" className="text-[#333333]/80 text-[15px] cursor-pointer">
                  By clicking on Submit, I allow all communication from Birla Heritage International School
                </label>
              </div>

              {feedback && (
                <p className={`text-center text-[15px] mt-1 ${feedback.type === "success" ? "text-green-700" : "text-red-600"}`}>
                  {feedback.text}
                </p>
              )}

              {/* Submit Button */}
              <div className="mt-3 w-full">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#003262] hover:bg-[#001f3d] disabled:opacity-60 text-[#FDB515] font-bold py-3 px-6 rounded-xl transition-colors duration-300 text-lg tracking-wide shadow-md"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
