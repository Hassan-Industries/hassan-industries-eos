import { statusCodes } from "@/data/governanceLibrary";

const principles = [
  "Authority & Control",
  "Version Integrity",
  "Lifecycle Management",
  "Traceability & Relationships",
  "Security & Access Control",
  "Retention & Compliance",
  "Originals & Certified Copies",
  "Enterprise-Wide Applicability",
];

const plannedPages = [
  "/governance-library",
  "/governance-library/publications",
  "/governance-library/resolutions",
  "/governance-library/forms",
  "/governance-library/templates",
  "/governance-library/certified-copies",
  "/governance-library/pending-review",
  "/governance-library/pending-execution",
];

export default function EGLKnowledgePanels() {
  return (
    <div className="mt-6 grid grid-cols-4 gap-4">
      <div className="rounded-xl bg-white p-5 shadow">
        <h3 className="text-sm font-bold uppercase tracking-wide">
          Document Status Codes
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {statusCodes.map(([code, meaning]) => (
            <div key={code} className="flex items-center gap-2">
              <span className="rounded bg-[#071426] px-2 py-1 text-xs font-bold text-white">
                {code}
              </span>
              <span>{meaning}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <h3 className="text-sm font-bold uppercase tracking-wide">
          Key Principles
        </h3>

        <div className="mt-4 space-y-2 text-sm">
          {principles.map((principle) => (
            <div key={principle} className="flex items-center gap-2">
              <span className="text-amber-500">●</span>
              <span>{principle}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <h3 className="text-sm font-bold uppercase tracking-wide">
          Lifecycle Flow
        </h3>

        <div className="mt-4 rounded-lg border border-dashed p-4 text-sm text-slate-600">
          Draft → Review → Approved → Original Executed → Certified Copy →
          Active → Superseded / Archived / Void
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <h3 className="text-sm font-bold uppercase tracking-wide">
          Planned Module Pages
        </h3>

        <div className="mt-4 space-y-2 text-xs text-slate-600">
          {plannedPages.map((page) => (
            <div key={page} className="rounded border px-3 py-2">
              {page}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}