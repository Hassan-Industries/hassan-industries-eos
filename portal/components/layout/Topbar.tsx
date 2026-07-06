import { Bell, Search } from "lucide-react";

type TopbarProps = {
  /**
   * Only the root app shell should render the permanent topbar.
   * Legacy page-level imports without shellOwner will safely render nothing.
   */
  shellOwner?: "root" | "page";
};

export default function Topbar({ shellOwner = "page" }: TopbarProps) {
  if (shellOwner !== "root") {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 h-[88px] border-b border-[#203044] bg-[#071426] text-white shadow-sm">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-[0.06em] text-white lg:text-3xl">
            Enterprise Operations Center
          </h1>
          <p className="mt-1 text-sm font-semibold text-white">
            Unified. Governed. Purpose-Driven.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden h-11 items-center gap-2 rounded-lg bg-[#17263a] px-4 text-sm font-semibold text-white sm:flex">
            <Search size={17} />
            <span>Search HIEOS...</span>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-[#17263a]"
          >
            <Bell size={18} />
          </button>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ffbf00] text-sm font-black text-[#ffbf00]">
            JH
          </div>
        </div>
      </div>
    </header>
  );
}