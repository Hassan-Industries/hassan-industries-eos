import { relationshipNodes } from "@/data/governanceLibrary";

export default function RelationshipPanel() {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h3 className="text-sm font-bold uppercase tracking-wide">
        Relationships
      </h3>

      <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
        <div className="mx-auto w-fit rounded-full bg-[#071426] px-5 py-2 text-sm font-bold text-white">
          Publication
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {relationshipNodes.map((node) => (
            <div
              key={node}
              className="rounded-lg border bg-white px-3 py-2 text-center text-xs font-semibold text-slate-700"
            >
              {node}
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Interactive relationship diagram coming in a future implementation.
        </p>
      </div>
    </div>
  );
}