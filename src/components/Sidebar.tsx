import { LayoutDashboard, TrendingUp, DollarSign, MessageSquare, MapPin, Megaphone } from "lucide-react";
import { data } from "../data";

export type Panel = "overview" | "pipeline" | "pricing" | "advisor" | "coverage" | "marketing";

const navItems: { id: Panel; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "pipeline", label: "Pipeline Health", icon: <TrendingUp size={18} /> },
  { id: "pricing", label: "Pricing Leakage", icon: <DollarSign size={18} /> },
  { id: "coverage", label: "Sales Coverage", icon: <MapPin size={18} /> },
  { id: "marketing", label: "Marketing ROI", icon: <Megaphone size={18} /> },
  { id: "advisor", label: "AI Advisor", icon: <MessageSquare size={18} /> },
];

interface SidebarProps {
  active: Panel;
  onNavigate: (panel: Panel) => void;
  criticalCount: number;
}

export default function Sidebar({ active, onNavigate, criticalCount }: SidebarProps) {
  return (
    <aside className="w-60 bg-navy-dark border-r border-white/10 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-5 border-b border-white/10">
        <h1 className="text-lg font-bold text-white tracking-tight">Commercial Pulse</h1>
        <p className="text-xs text-white/50 mt-1">{data.client}</p>
        <p className="text-xs text-white/35">{data.period}</p>
      </div>
      <nav className="flex-1 py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors cursor-pointer ${
              active === item.id
                ? "text-white bg-white/10 border-l-2 border-bain-red font-medium"
                : "text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      {criticalCount > 0 && (
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => onNavigate("overview")}
            className="w-full bg-bain-red-bg border border-bain-red/20 rounded-lg px-3 py-2 text-xs text-bain-red-light cursor-pointer hover:bg-bain-red/25 transition-colors text-left"
          >
            {criticalCount} critical gap{criticalCount > 1 ? "s" : ""} detected
          </button>
        </div>
      )}
    </aside>
  );
}
