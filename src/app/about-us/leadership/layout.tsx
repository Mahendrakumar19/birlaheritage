import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Leadership Team | Birla Heritage International School Siwan",
  description:
    "Meet Our Leadership Team at Birla Heritage International School Siwan: Chairman Nitya Singh, Director Subash Singh, Principal, Vice Principal, and School Coordinator.",
};

export default function LeadershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
