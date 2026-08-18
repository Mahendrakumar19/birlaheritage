interface AdminStatsCardProps {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ReactNode;
  color?: "blue" | "gold" | "green" | "red" | "purple";
  loading?: boolean;
}

const COLOR_MAP = {
  blue:   { bg: "bg-[#003262]/10", icon: "text-[#003262]", bar: "bg-[#003262]" },
  gold:   { bg: "bg-[#FDB515]/15", icon: "text-[#d49400]", bar: "bg-[#FDB515]" },
  green:  { bg: "bg-green-100",    icon: "text-green-600",  bar: "bg-green-500" },
  red:    { bg: "bg-red-100",      icon: "text-red-600",    bar: "bg-red-500" },
  purple: { bg: "bg-purple-100",   icon: "text-purple-600", bar: "bg-purple-500" },
};

export default function AdminStatsCard({ label, value, sub, icon, color = "blue", loading = false }: AdminStatsCardProps) {
  const c = COLOR_MAP[color];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider truncate">{label}</p>
          {loading ? (
            <div className="mt-2 h-8 w-16 bg-gray-100 rounded animate-pulse" />
          ) : (
            <p className="mt-1 text-3xl font-black text-gray-900">{value}</p>
          )}
          {sub && !loading && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 ${c.icon}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
