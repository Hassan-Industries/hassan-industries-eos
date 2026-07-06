"use client";

import Link from "next/link";
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
  const records = publications.filter(Boolean);
  const selectedKey = selectedPublication
    ? getPublicationKey(selectedPublication as DisplayPublicationRecord)
    : null;

  function handleSelect(record: PublicationRecord) {
    setSelectedPublication?.(record);
    onSelectPublication?.(record);
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.45em] text-[#94a3b8]">
            Enterprise Governance Library
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#050816]">
            Recently Updated Publications
          </h2>
        </div>

        <Link
          href="/governance-library/publications"
          className="text-sm font-black text-blue-700 transition hover:text-[#ff8a00]"
        >
          View All Publications →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="bg-slate-50 text-xs font-black uppercase tracking-[0.35em] text-[#536783]"><th className="px-6 py-4">Document No.</th><th className="px-6 py-4">Title</th><th className="px-6 py-4">Series</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Version</th><th className="px-6 py-4">Owner</th><th className="px-6 py-4">Review Date</th></tr></thead><tbody>{records.length > 0 ? records.map((publication) => {
              const record = publication as DisplayPublicationRecord;
              const recordKey = getPublicationKey(record);
              const isSelected = selectedKey === recordKey;

              return (
                <tr
                  key={recordKey}
                  tabIndex={0}
                  onClick={() => handleSelect(publication)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelect(publication);
                    }
                  }}
                  className={[
                    "cursor-pointer border-b border-slate-200 transition last:border-b-0",
                    isSelected ? "bg-amber-50" : "bg-white hover:bg-slate-50",
                  ].join(" ")}
                >
                  <td className="px-6 py-5 align-top font-black text-[#050816]">
                    {getPublicationDocumentNumber(publication)}
                  </td>
                  <td className="px-6 py-5 align-top">
                    <p className="font-black text-[#050816]">{getTitle(record)}</p>
                    <p className="mt-2 max-w-[260px] text-xs leading-6 text-[#536783]">
                      {getDescription(record)}
                    </p>
                  </td>
                  <td className="px-6 py-5 align-top font-bold text-[#33445c]">
                    {getSeries(record)}
                  </td>
                  <td className="px-6 py-5 align-top">
                    <span className="rounded-md bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                      {getStatus(record)}
                    </span>
                  </td>
                  <td className="px-6 py-5 align-top font-black text-[#050816]">
                    {String(record.version ?? "1.0")}
                  </td>
                  <td className="px-6 py-5 align-top font-black text-[#050816]">
                    {record.owner ?? "HCA"}
                  </td>
                  <td className="px-6 py-5 align-top font-black text-[#050816]">
                    {record.reviewDate ?? record.lastUpdated ?? "Pending"}
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td className="px-6 py-8 text-sm text-[#536783]" colSpan={7}>
                  No recently updated publications available.
                </td>
              </tr>
            )}</tbody></table>
      </div>

      <div className="border-t border-slate-200 px-6 py-4 text-xs font-semibold text-[#536783]">
        Select a publication row to update the Document Profile panel.
      </div>
    </section>
  );
}

function getPublicationKey(record: DisplayPublicationRecord) {
  return (
    record.id ??
    record.documentId ??
    record.documentNo ??
    record.documentNumber ??
    getTitle(record)
  );
}

function getTitle(record: DisplayPublicationRecord) {
  return record.title ?? record.name ?? "Untitled Publication";
}

function getDescription(record: DisplayPublicationRecord) {
  return record.description ?? record.summary ?? "Controlled enterprise publication record.";
}

function getSeries(record: DisplayPublicationRecord) {
  return record.series ?? record.publicationSeries ?? record.category ?? "Administration";
}

function getStatus(record: DisplayPublicationRecord) {
  return record.status ?? "AP";
}