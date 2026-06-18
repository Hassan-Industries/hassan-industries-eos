import { publications } from "@/data/governanceLibrary";

export default function RecentlyUpdatedPublications() {
  return (
    <div className="mt-6 rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recently Updated Publications</h2>
        <span className="text-sm text-blue-700">View all publications</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3">Document No.</th>
              <th className="p-3">Title</th>
              <th className="p-3">Series</th>
              <th className="p-3">Status</th>
              <th className="p-3">Version</th>
              <th className="p-3">Owner</th>
            </tr>
          </thead>
          <tbody>
            {publications.map(([docNo, title, series, status, version, owner]) => (
              <tr key={docNo as string} className="border-t">
                <td className="p-3 font-semibold">{docNo}</td>
                <td className="p-3">{title}</td>
                <td className="p-3">{series}</td>
                <td className="p-3">
                  <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                    {status}
                  </span>
                </td>
                <td className="p-3">{version}</td>
                <td className="p-3">{owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}