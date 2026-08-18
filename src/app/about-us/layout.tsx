import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Birla Heritage International School Siwan",
  description:
    "Learn about Birla Heritage International School Siwan: our Tagorean educational ethos, 21st-century skills foundation, values, and core pillars of success.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
