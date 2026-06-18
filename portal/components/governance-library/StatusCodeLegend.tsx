import { statusCodes } from "@/data/governanceLibrary";

export default function StatusCodeLegend() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-lg font-bold">Document Status Codes</h2>

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
  );
}