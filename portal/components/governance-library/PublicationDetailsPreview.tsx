import { BookOpen, detailPreview } from "@/data/governanceLibrary";

export default function PublicationDetailsPreview() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-lg font-bold">Publication Details Preview</h2>

      <div className="mt-5 rounded-xl bg-[#071426] p-5 text-white">
        <div className="flex items-start gap-4">
          <BookOpen className="text-amber-400" size={36} />
          <div>
            <h3 className="text-xl font-bold">HI-ADM-001</h3>
            <p className="text-sm text-slate-300">
              Enterprise Administration & Enterprise Services Manual
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        {detailPreview.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b pb-2">
            <span className="font-semibold text-slate-600">{label}</span>
            <span className="text-right">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
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