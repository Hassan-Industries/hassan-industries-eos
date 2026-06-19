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
      className="flex h-10 overflow-hidden rounded-lg border border-slate-900 bg-white shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-1 items-center gap-3 px-4">
        <Search className="h-4 w-4 text-slate-400" />

        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by document number, title, series, status, owner, or classification..."
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
        className="bg-slate-950 px-7 text-xs font-bold text-white transition hover:bg-slate-800"
      >
        Search
      </button>
    </form>
  );
}