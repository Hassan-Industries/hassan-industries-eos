import { FileText } from "lucide-react";
import {
  lifecycleSteps,
  plannedPages,
  principles,
  statusCodes,
} from "@/data/governanceLibrary";
import RelationshipPanel from "./RelationshipPanel";

export default function EGLKnowledgePanels() {
  return (
    <div className="mt-6 grid grid-cols-12 gap-4">
      <div className="col-span-3 rounded-xl bg-white p-5 shadow">
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

      <div className="col-span-3 rounded-xl bg-white p-5 shadow">
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

      <div className="col-span-6 rounded-xl bg-[#071426] p-5 text-white shadow">
        <h3 className="text-sm font-bold uppercase tracking-wide text-amber-400">
          Lifecycle Flow
        </h3>

        <div className="mt-5 grid grid-cols-7 gap-2">
          {lifecycleSteps.map(([code, label]) => (
            <div
              key={code}
              className="rounded-lg border border-amber-400/40 bg-white/5 px-3 py-3 text-center"
            >
              <div className="text-sm font-bold text-amber-400">{code}</div>
              <div className="mt-1 text-[11px] text-slate-300">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-4">
        <RelationshipPanel />
      </div>

      <div className="col-span-8 rounded-xl bg-white p-5 shadow">
        <h3 className="text-sm font-bold uppercase tracking-wide">
          Planned Module Pages
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
          {plannedPages.map((page) => (
            <div
              key={page}
              className="flex items-center gap-2 rounded border px-3 py-2"
            >
              <FileText size={14} className="text-amber-500" />
              {page}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}