import { Search } from "@/data/governanceLibrary";

export default function EGLHeader() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
        Hassan Industries
      </p>
      <h1 className="mt-2 text-3xl font-bold">Enterprise Governance Library</h1>
      <p className="mt-2 text-slate-600">
        Controlled publication system for governance, administration, treasury,
        legal, tax, records, correspondence, technology, resolutions, forms,
        templates, and certified copies.
      </p>

      <div className="mt-6 flex items-center rounded-lg border bg-white">
        <div className="px-4 text-slate-400">
          <Search size={18} />
        </div>
        <input
          className="w-full rounded-lg px-2 py-4 outline-none"
          placeholder="Search publications, manuals, policies, resolutions, forms, and more..."
        />
        <button className="rounded-r-lg bg-[#071426] px-6 py-4 text-white">
          Search
        </button>
      </div>
    </div>
  );
}