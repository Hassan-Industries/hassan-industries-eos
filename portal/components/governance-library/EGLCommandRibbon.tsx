export default function EGLCommandRibbon() {
    return (
      <div className="rounded-xl bg-[#071426] p-6 text-white shadow">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              Hassan Industries
            </p>
  
            <h1 className="mt-2 text-3xl font-bold uppercase tracking-wide">
              Enterprise Governance Library
            </h1>
  
            <p className="mt-2 max-w-3xl text-sm text-slate-300">
              Controlled publication system for Hassan Industries governance,
              administration, treasury, legal, tax, records, correspondence,
              technology, resolutions, forms, templates, and certified copies.
            </p>
          </div>
  
          <div className="min-w-56 rounded-lg border border-amber-400/40 bg-white/5 p-4 text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
              Operational Mode
            </p>
            <p className="mt-2 text-lg font-bold text-amber-400">
              Foundation Mode
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Governance • Authority • Integrity
            </p>
          </div>
        </div>
      </div>
    );
  }