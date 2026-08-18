import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://birlaheritage.com';

export const metadata: Metadata = {
  title: {
    default: "Birla Heritage International School Siwan",
    template: "%s | Birla Heritage International School Siwan",
  },
  description:
    "Birla Heritage International School Siwan offers holistic education from Nursery through Class 9, fostering academic excellence, Tagorean philosophy, and future-ready skills.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Birla Heritage International School Siwan",
    description:
      "Nurturing future leaders from Nursery to Class 9 through constructivist pedagogy, sports, and holistic development in Siwan, Bihar.",
    url: siteUrl,
    siteName: "Birla Heritage International School",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birla Heritage International School Siwan",
    description:
      "Nurturing future leaders from Nursery to Class 9 through constructivist pedagogy and holistic development.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Birla Heritage International School Siwan",
  "url": siteUrl,
  "logo": `${siteUrl}/modern-school-logo-featuring-stylized-book-icon-symbolizing-education-learning-sleek-design-graduation-cap-315282989.webp`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Survey No 813 - 817 Markan",
    "addressLocality": "Siwan",
    "addressRegion": "Bihar",
    "addressCountry": "IN"
  },
  "telephone": "+91 9122899149",
  "email": "info@birlaheritage.com",
  "sameAs": [
    "https://www.instagram.com/birlaheritage_Siwan",
    "https://x.com/openminds_Siwan",
    "https://www.youtube.com/@openiminds_Siwan/about"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
