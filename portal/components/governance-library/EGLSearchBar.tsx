"use client";

import { Search, X } from "lucide-react";

interface EGLSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function EGLSearchBar({
  value,
  onChange,
  onSubmit,
}: EGLSearchBarProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex h-[48px] overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm focus-within:border-amber-500"
    >
      <div className="flex flex-1 items-center gap-3 px-4">
        <Search className="h-4 w-4 shrink-0 text-slate-400" />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search EGL records, registries, queues, forms, templates, certified copies, or classifications..."
          className="h-full w-full bg-transparent text-xs text-slate-950 outline-none placeholder:text-slate-400"
        />

        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-slate-500 transition hover:text-slate-950"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="w-[96px] bg-slate-950 text-xs font-extrabold text-white transition hover:bg-slate-800"
      >
        Search
      </button>
    </form>
  );
}