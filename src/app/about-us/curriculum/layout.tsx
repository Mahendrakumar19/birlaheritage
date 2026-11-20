import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Curriculum | Birla Heritage International School Siwan",
  description:
    "Explore the academic curriculum at Birla Heritage International School Siwan: structured progression from Pre-Primary (Nursery, JKG, SKG) through Primary (Class I–V), Middle (Class VI–VIII), and Secondary (Class IX–X).",
};

export default function CurriculumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
