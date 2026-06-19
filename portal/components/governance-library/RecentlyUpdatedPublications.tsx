"use client";

import type { Dispatch, SetStateAction } from "react";
import type { PublicationRecord } from "@/data/governanceLibrary";
import { getPublicationDocumentNumber } from "@/lib/eglPublicationRecords";

interface RecentlyUpdatedPublicationsProps {
  publications: PublicationRecord[];
  selectedPublication?: PublicationRecord | null;
  setSelectedPublication?: Dispatch<SetStateAction<PublicationRecord | null>>;
  onSelectPublication?: (publication: PublicationRecord) => void;
}

type DisplayPublicationRecord = PublicationRecord & {
  id?: string;
  documentId?: string;
  documentNo?: string;
  documentNumber?: string;
  title?: string;
  name?: string;
  description?: string;
  summary?: string;
  series?: string;
  publicationSeries?: string;
  category?: string;
  owner?: string;
  version?: string | number;
  status?: string;
  reviewDate?: string;
  lastUpdated?: string;
  updatedAt?: string;
};

export default function RecentlyUpdatedPublications({
  publications,
  selectedPublication = null,
  setSelectedPublication,
  onSelectPublication,
}: RecentlyUpdatedPublicationsProps) {
  const records = publications.filter(isPublicationRecord);

  const selectedKey = selectedPublication
    ? getPublicationKey(selectedPublication as DisplayPublicationRecord)
    : null;

  function handleSelect(record: PublicationRecord) {
    if (setSelectedPublication) {
      setSelectedPublication(record);
    }

    if (onSelectPublication) {
      onSelectPublication(record);
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.22em] text-slate-950">
            Recently Updated Publications
          </h2>
        </div>

        <a
          href="/governance-library/publications"
          className="text-xs font-bold text-blue-700 hover:text-amber-700"
        >
          View All Publications →
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-[0.14em] text-slate-500">
              <th className="px-3 py-3 font-extrabold">Document No.</th>
              <th className="px-3 py-3 font-extrabold">Title</th>
              <th className="px-3 py-3 font-extrabold">Series</th>
              <th className="px-3 py-3 font-extrabold">Status</th>
              <th className="px-3 py-3 font-extrabold">Version</th>
              <th className="px-3 py-3 font-extrabold">Owner</th>
              <th className="px-3 py-3 font-extrabold">Review Date</th>
            </tr>
          </thead>

          <tbody>
            {records.map((publication) => {
              const record = publication as DisplayPublicationRecord;
              const recordKey = getPublicationKey(record);
              const isSelected = selectedKey === recordKey;

              return (
                <tr
                  key={recordKey}
                  onClick={() => handleSelect(publication)}
                  className={`cursor-pointer border-b border-slate-200 transition last:border-b-0 ${
                    isSelected ? "bg-amber-50" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <td className="px-3 py-4 align-top font-extrabold text-slate-950">
                    {getPublicationDocumentNumber(record)}
                  </td>

                  <td className="max-w-[260px] px-3 py-4 align-top">
                    <p className="font-bold leading-5 text-slate-950">
                      {getTitle(record)}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-slate-500">
                      {getDescription(record)}
                    </p>
                  </td>

                  <td className="px-3 py-4 align-top font-semibold text-slate-700">
                    {getSeries(record)}
                  </td>

                  <td className="px-3 py-4 align-top">
                    <span className="inline-flex min-w-9 items-center justify-center rounded-md bg-emerald-100 px-2 py-1 text-[11px] font-extrabold text-emerald-700">
                      {getStatus(record)}
                    </span>
                  </td>

                  <td className="px-3 py-4 align-top font-semibold text-slate-950">
                    {String(record.version ?? "1.0")}
                  </td>

                  <td className="px-3 py-4 align-top font-semibold text-slate-950">
                    {record.owner ?? "HCA"}
                  </td>

                  <td className="px-3 py-4 align-top font-semibold text-slate-950">
                    {record.reviewDate ?? record.lastUpdated ?? "Pending"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {records.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-extrabold text-slate-950">
              No recently updated publications available.
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Future backend integration will populate this table from the
              publication registry and document activity log.
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-[11px] leading-4 text-slate-500">
        Select a publication row to update the Document Profile panel.
      </p>
    </section>
  );
}

function isPublicationRecord(
  record: PublicationRecord | null | undefined,
): record is PublicationRecord {
  return Boolean(record);
}

function getPublicationKey(record: DisplayPublicationRecord) {
  return (
    record.id ??
    record.documentId ??
    record.documentNo ??
    record.documentNumber ??
    getPublicationDocumentNumber(record) ??
    getTitle(record)
  );
}

function getTitle(record: DisplayPublicationRecord) {
  return record.title ?? record.name ?? "Untitled Publication";
}

function getDescription(record: DisplayPublicationRecord) {
  return (
    record.description ??
    record.summary ??
    "Controlled enterprise publication record."
  );
}

function getSeries(record: DisplayPublicationRecord) {
  return (
    record.series ??
    record.publicationSeries ??
    record.category ??
    "Administration"
  );
}

function getStatus(record: DisplayPublicationRecord) {
  return record.status ?? "AP";
}