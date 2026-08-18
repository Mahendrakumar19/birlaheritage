import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Curriculum | Birla Heritage International School Siwan",
  description:
    "Explore the academic curriculum at Birla Heritage International School Siwan: structured progression from Pre-Primary (Nursery, LKG, UKG) through Primary (Classes 1–5), Middle (Classes 6–8), and Secondary (Class 9).",
};

export default function CurriculumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
