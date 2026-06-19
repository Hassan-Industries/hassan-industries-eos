"use client";

import type { PublicationRecord } from "@/data/governanceLibrary";

interface RecentlyUpdatedPublicationsProps {
  publications: PublicationRecord[];
  selectedPublication: PublicationRecord;
  onSelectPublication: (publication: PublicationRecord) => void;
}

type DisplayPublicationRecord = PublicationRecord & {
  id?: string;
  documentId?: string;
  documentNo?: string;
  documentNumber?: string;
  title?: string;
  series?: string;
  publicationSeries?: string;
  status?: string;
  documentState?: string;
  version?: string;
  owner?: string;
  reviewDate?: string;
};

export default function RecentlyUpdatedPublications({
  publications,
  selectedPublication,
  onSelectPublication,
}: RecentlyUpdatedPublicationsProps) {
  return (
    <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
          Recently Updated Publications
        </h2>

        <button
          type="button"
          className="whitespace-nowrap text-[11px] font-semibold text-blue-700 hover:text-blue-900"
        >
          View All Publications →
        </button>
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-200">
        <table className="min-w-[760px] w-full border-collapse text-[11px] leading-tight">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200 text-left uppercase tracking-[0.1em] text-slate-500">
              <th className="w-[14%] px-2.5 py-2.5 font-bold">Document No.</th>
              <th className="w-[30%] px-2.5 py-2.5 font-bold">Title</th>
              <th className="w-[14%] px-2.5 py-2.5 font-bold">Series</th>
              <th className="w-[10%] px-2.5 py-2.5 font-bold">Status</th>
              <th className="w-[8%] px-2.5 py-2.5 font-bold">Version</th>
              <th className="w-[9%] px-2.5 py-2.5 font-bold">Owner</th>
              <th className="w-[15%] px-2.5 py-2.5 font-bold">Review Date</th>
            </tr>
          </thead>

          <tbody>
            {publications.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-7 text-center text-xs text-slate-500"
                >
                  No publications match the current search.
                </td>
              </tr>
            ) : (
              publications.map((publication) => {
                const isSelected =
                  getPublicationKey(publication) ===
                  getPublicationKey(selectedPublication);

                return (
                  <tr
                    key={getPublicationKey(publication)}
                    onClick={() => onSelectPublication(publication)}
                    className={`cursor-pointer border-b border-slate-200 transition last:border-b-0 ${
                      isSelected
                        ? "bg-amber-50"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <td className="px-2.5 py-2.5 font-bold text-slate-950">
                      {getDocumentNumber(publication)}
                    </td>

                    <td className="px-2.5 py-2.5 font-medium text-slate-950">
                      {getTitle(publication)}
                    </td>

                    <td className="px-2.5 py-2.5 text-slate-950">
                      {getSeries(publication)}
                    </td>

                    <td className="px-2.5 py-2.5">
                      <span className="rounded bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                        {getStatus(publication)}
                      </span>
                    </td>

                    <td className="px-2.5 py-2.5 text-slate-950">
                      {getVersion(publication)}
                    </td>

                    <td className="px-2.5 py-2.5 text-slate-950">
                      {getOwner(publication)}
                    </td>

                    <td className="px-2.5 py-2.5 text-slate-950">
                      {getReviewDate(publication)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function getRecord(publication: PublicationRecord) {
  return publication as DisplayPublicationRecord;
}

function getPublicationKey(publication: PublicationRecord) {
  const record = getRecord(publication);

  return (
    record.id ??
    record.documentId ??
    record.documentNo ??
    record.documentNumber ??
    record.title ??
    "publication-record"
  );
}

function getDocumentNumber(publication: PublicationRecord) {
  const record = getRecord(publication);

  return (
    record.documentNo ??
    record.documentNumber ??
    record.documentId ??
    record.id ??
    "N/A"
  );
}

function getTitle(publication: PublicationRecord) {
  return getRecord(publication).title ?? "Untitled Publication";
}

function getSeries(publication: PublicationRecord) {
  const record = getRecord(publication);

  return record.series ?? record.publicationSeries ?? "Unassigned";
}

function getStatus(publication: PublicationRecord) {
  const record = getRecord(publication);

  return record.status ?? record.documentState ?? "AP";
}

function getVersion(publication: PublicationRecord) {
  return getRecord(publication).version ?? "1.0";
}

function getOwner(publication: PublicationRecord) {
  return getRecord(publication).owner ?? "HCA";
}

function getReviewDate(publication: PublicationRecord) {
  return getRecord(publication).reviewDate ?? "2027-06-18";
}