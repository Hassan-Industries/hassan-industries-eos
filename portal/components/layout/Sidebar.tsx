import { navItems } from "@/data/dashboard";
import { LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex w-72 flex-col bg-[#071426] text-white">
      <div className="border-b border-white/10 p-6">
        <div className="text-xl font-bold tracking-wide text-amber-400">
          HASSAN INDUSTRIES
        </div>
        <div className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-300">
          Enterprise Operating System
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {navItems.map(([item, Icon], index) => {
          const IconComponent = Icon as typeof LayoutDashboard;

          return (
            <div
              key={item as string}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${
                index === 0
                  ? "bg-amber-400 text-slate-950"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              <IconComponent size={18} />
              {item as string}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 p-6 text-xs text-slate-400">
        <div className="font-semibold text-amber-400">Hassan Industries</div>
        <div>Building Generations of Legacy</div>
      </div>
    </aside>
  );
}