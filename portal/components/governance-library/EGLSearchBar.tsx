import { Search } from "lucide-react";

export default function EGLSearchBar() {
  return (
    <div className="mt-6 flex items-center overflow-hidden rounded-xl border bg-white shadow">
      <div className="px-5 text-slate-400">
        <Search size={20} />
      </div>

      <input
        className="w-full px-2 py-4 text-sm outline-none"
        placeholder="Search publications, manuals, policies, resolutions, forms, templates, and certified copies..."
      />

      <button className="bg-[#071426] px-8 py-4 text-sm font-semibold text-white hover:bg-[#0b1d33]">
        Search
      </button>
    </div>
  );
}