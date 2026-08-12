"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/admin/dashboard"); }, [router]);
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-[#003262] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
