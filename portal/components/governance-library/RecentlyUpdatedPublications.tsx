import type { PublicationRecord } from "@/data/governanceLibrary";

type Props = {
  publications: PublicationRecord[];
  selectedDocumentNo: string;
  onSelectPublication: (publication: PublicationRecord) => void;
};

export default function RecentlyUpdatedPublications({
  publications,
  selectedDocumentNo,
  onSelectPublication,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
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
            {publications.map((publication) => {
              const isActive =
                publication.documentNo === selectedDocumentNo;

              return (
                <tr
                  key={publication.documentNo}
                  onClick={() => onSelectPublication(publication)}
                  className={`cursor-pointer border-t transition ${
                    isActive
                      ? "bg-amber-50"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <td className="p-3 font-semibold">
                    {publication.documentNo}
                  </td>
                  <td className="p-3">{publication.title}</td>
                  <td className="p-3">{publication.series}</td>
                  <td className="p-3">
                    <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                      {publication.status}
                    </span>
                  </td>
                  <td className="p-3">{publication.version}</td>
                  <td className="p-3">{publication.owner}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Select a publication row to update the Document Profile.
      </p>
    </div>
  );
}