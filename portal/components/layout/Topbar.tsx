import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-[#071426] px-8 py-5 text-white">
      <div>
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Enterprise Operations Center
        </h1>
        <p className="text-sm text-slate-300">
          Unified. Governed. Purpose-Driven.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
          <Search size={16} />
          Search HIEOS...
        </div>
        <Bell size={20} />
        <div className="rounded-full border border-amber-400 px-3 py-2 text-sm text-amber-300">
          JH
        </div>
      </div>
    </header>
  );
}