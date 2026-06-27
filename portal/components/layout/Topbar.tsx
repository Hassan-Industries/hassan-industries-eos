"use client";

import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1b2a3d] bg-[#071426]">
      <div className="flex h-[88px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-[0.04em] text-white sm:text-3xl">
            Enterprise Operations Center
          </h1>
          <p className="mt-1 text-sm font-medium text-white">
            Unified. Governed. Purpose-Driven.
          </p>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex h-10 w-44 items-center gap-2 rounded-lg bg-[#1b2a3d] px-4 text-sm text-white">
            <Search size={16} />
            <span>Search HIEOS...</span>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-[#1b2a3d]"
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