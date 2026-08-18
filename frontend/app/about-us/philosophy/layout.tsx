import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educational Philosophy | Birla Heritage International School Siwan",
  description:
    "Discover the constructivist learning approach at Birla Heritage: progressing from known to unknown, concrete to abstract, and local to global.",
};

export default function PhilosophyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
