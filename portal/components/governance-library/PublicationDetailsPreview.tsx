import { BookOpen, detailPreview } from "@/data/governanceLibrary";

export default function PublicationDetailsPreview() {
  const primaryFields = detailPreview.slice(0, 10);
  const secondaryFields = detailPreview.slice(10);

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold uppercase tracking-wide">
          Document Profile
        </h2>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          Active
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-[#071426] p-4 text-white">
        <div className="flex items-start gap-3">
          <BookOpen className="text-amber-400" size={32} />
          <div>
            <h3 className="text-lg font-bold">HI-ADM-001</h3>
            <p className="text-xs text-slate-300">
              Enterprise Administration & Enterprise Services Manual
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs">
        {primaryFields.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3 border-b pb-2">
            <span className="font-semibold text-slate-600">{label}</span>
            <span className="text-right text-slate-800">{value}</span>
          </div>
        ))}
      </div>

      <details className="mt-3 rounded-lg border p-3 text-xs">
        <summary className="cursor-pointer font-semibold text-slate-700">
          Additional Document Intelligence
        </summary>

        <div className="mt-3 space-y-2">
          {secondaryFields.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3 border-b pb-2">
              <span className="font-semibold text-slate-600">{label}</span>
              <span className="text-right text-slate-800">{value}</span>
            </div>
          ))}
        </div>
      </details>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="rounded-lg bg-[#071426] px-4 py-3 text-sm font-semibold text-white">
          View Record
        </button>
        <button className="rounded-lg border px-4 py-3 text-sm font-semibold">
          Download
        </button>
      </div>
    </div>
  );
}