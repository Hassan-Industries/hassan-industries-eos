"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { ArrowRight, BookOpen, Eye } from "lucide-react";
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
    record.notes ??
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

function getStatusClass(status: string) {
  if (status === "AP" || status === "OE") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "DR" || status === "RV") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-slate-100 text-slate-700";
}

function isPublicationRecord(
  record: PublicationRecord | null | undefined,
): record is PublicationRecord {
  return Boolean(record);
}

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
    <section className="overflow-hidden rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#d8e1ea] p-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
            Enterprise Governance Library
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-[#050816]">
            Recently Updated Publications
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-[#48617e]">
            Select a publication row to update the Document Profile panel.
          </p>
        </div>

        <Link
          href="/governance-library/publications"
          className="inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-[#ff8a00]"
        >
          View All Publications
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="divide-y divide-[#d8e1ea]">
        {records.length > 0 ? (
          records.map((publication) => {
            const record = publication as DisplayPublicationRecord;
            const recordKey = getPublicationKey(record);
            const isSelected = selectedKey === recordKey;
            const documentNumber = getPublicationDocumentNumber(record);
            const status = getStatus(record);

            return (
              <button
                key={recordKey}
                type="button"
                onClick={() => handleSelect(publication)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelect(publication);
                  }
                }}
                className={[
                  "grid w-full gap-4 p-5 text-left transition lg:grid-cols-[150px_minmax(0,1fr)_120px]",
                  isSelected ? "bg-[#fffaf0]" : "bg-white hover:bg-[#f8fafc]",
                ].join(" ")}
              >
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#64748b]">
                    Document No.
                  </p>
                  <p className="mt-3 break-words text-sm font-black text-[#050816]">
                    {documentNumber}
                  </p>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-black leading-6 text-[#050816]">
                      {getTitle(record)}
                    </p>
                  </div>

                  <p className="mt-2 max-w-3xl text-sm font-semibold leading-7 text-[#48617e]">
                    {getDescription(record)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-[#24364d]">
                      {getSeries(record)}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-[#24364d]">
                      Version {String(record.version ?? "1.0")}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-[#24364d]">
                      Owner {record.owner ?? "HCA"}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-[#24364d]">
                      Review {record.reviewDate ?? record.lastUpdated ?? "Pending"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-start lg:justify-end">
                  <span
                    className={[
                      "inline-flex rounded-md px-3 py-2 text-xs font-black",
                      getStatusClass(status),
                    ].join(" ")}
                  >
                    {status}
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="p-6">
            <div className="rounded-lg border border-dashed border-[#c8d3df] bg-[#f8fafc] p-6 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-[#ff8a00]" />
              <h3 className="mt-4 text-xl font-black text-[#050816]">
                No recently updated publications available.
              </h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#48617e]">
                Future backend integration will populate this area from the
                publication registry and document activity log.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#d8e1ea] bg-[#f8fafc] px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#48617e]">
          <Eye className="h-4 w-4 text-[#ff8a00]" />
          Select a publication row to update the Document Profile panel.
        </div>
      </div>
    </section>
  );
}