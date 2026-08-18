import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Governance | Birla Heritage International School Siwan",
  description:
    "Meet the leadership team of Birla Heritage International School Siwan: Chairman Nitya Singh, Director Subash Singh, and school leadership.",
};

export default function LeadershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
