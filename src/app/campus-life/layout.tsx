import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus & Student Life | Birla Heritage International School Siwan",
  description:
    "Explore campus life, infrastructure, facilities, sports tradition, and student community activities at Birla Heritage International School Siwan.",
};

export default function CampusLifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
