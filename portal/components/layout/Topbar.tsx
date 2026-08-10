import { Bell, Search } from "lucide-react";

type TopbarProps = {
  shellOwner?: "root" | "page";
};

export default function Topbar({ shellOwner = "page" }: TopbarProps) {
  if (shellOwner !== "root") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-[#1d3048] bg-[#071426] px-6 text-white shadow-sm lg:px-8">
      <div>
        <h1 className="text-2xl font-black uppercase leading-none tracking-[0.08em] text-white lg:text-3xl">
          Enterprise Operations Center
        </h1>
        <p className="mt-2 text-sm font-semibold text-white">
          Unified. Governed. Purpose-Driven.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden h-11 items-center gap-3 rounded-lg bg-[#1a2b42] px-4 text-sm font-bold text-white md:flex">
          <Search className="h-4 w-4 text-white" />
          <span>Search HIEOS...</span>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-[#1a2b42]"
        >
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ffbf00] text-sm font-black text-[#ffbf00]">
          JH
        </div>
      </div>
    </header>
  );
}