"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  Eye,
  FilePlus2,
  FileText,
  FolderOpen,
  RefreshCcw,
  Search,
  Upload,
} from "lucide-react";
import { publications, type PublicationRecord } from "@/data/governanceLibrary";

const statusFilters = ["All Statuses", "AP", "DR", "RV", "OE", "CC", "SP", "AR", "VO"];
const seriesFilters = [
  "All Series",
  "Administration",
  "Treasury",
  "Governance",
  "Resolutions",
  "Corporate Records",
  "Legal",
  "Tax",
];
const classificationFilters = [
  "All Classifications",
  "Internal Governance",
  "Internal",
  "Confidential",
  "Restricted",
  "Internal Draft",
];

function getStatusClass(status: string) {
  if (status === "AP" || status === "OE") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "DR" || status === "RV") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-slate-100 text-slate-700";
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#d8e1ea] py-3 text-sm last:border-b-0">
      <span className="font-bold text-[#64748b]">{label}</span>
      <span className="max-w-[230px] text-right font-black text-[#050816]">
        {value}
      </span>
    </div>
  );
}

function RecordRow({
  record,
  selected,
  onSelect,
}: {
  record: PublicationRecord;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "grid min-w-[1080px] grid-cols-[150px_minmax(340px,1.7fr)_170px_110px_110px_120px_110px] border-b border-[#d8e1ea] text-left transition last:border-b-0",
        selected ? "bg-[#fffaf0]" : "bg-white hover:bg-[#f8fafc]",
      ].join(" ")}
    >
      <div className="px-4 py-5 text-sm font-black text-[#050816]">
        {record.documentNo}
      </div>

      <div className="px-4 py-5">
        <p className="text-sm font-black leading-6 text-[#050816]">
          {record.title}
        </p>
        <p className="mt-2 max-w-[420px] text-xs font-semibold leading-6 text-[#48617e]">
          {record.notes}
        </p>
      </div>

      <div className="px-4 py-5 text-sm font-bold text-[#24364d]">
        {record.series}
      </div>

      <div className="px-4 py-5">
        <span
          className={[
            "inline-flex rounded-md px-3 py-2 text-xs font-black",
            getStatusClass(record.status),
          ].join(" ")}
        >
          {record.status}
        </span>
      </div>

      <div className="px-4 py-5 text-sm font-black text-[#050816]">
        {record.version}
      </div>

      <div className="px-4 py-5 text-sm font-black text-[#050816]">
        {record.owner}
      </div>

      <div className="px-4 py-5">
        <span className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]">
          <Eye className="h-4 w-4 text-[#ff8a00]" />
          View
        </span>
      </div>
    </button>
  );
}

export default function EGLPublicationsRegistryShell() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [seriesFilter, setSeriesFilter] = useState("All Series");
  const [classificationFilter, setClassificationFilter] =
    useState("All Classifications");
  const [selectedDocumentNumber, setSelectedDocumentNumber] =
    useState<string | null>(publications[0]?.documentNo ?? null);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return publications.filter((record) => {
      const searchText = [
        record.documentNo,
        record.title,
        record.series,
        record.status,
        record.owner,
        record.authority,
        record.classification,
        record.documentType,
        record.notes,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 || searchText.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All Statuses" || record.status === statusFilter;

      const matchesSeries =
        seriesFilter === "All Series" || record.series === seriesFilter;

      const matchesClassification =
        classificationFilter === "All Classifications" ||
        record.classification === classificationFilter;

      return matchesSearch && matchesStatus && matchesSeries && matchesClassification;
    });
  }, [classificationFilter, searchValue, seriesFilter, statusFilter]);

  const selectedRecord =
    publications.find((record) => record.documentNo === selectedDocumentNumber) ??
    publications[0];

  function clearFilters() {
    setSearchValue("");
    setStatusFilter("All Statuses");
    setSeriesFilter("All Series");
    setClassificationFilter("All Classifications");
  }

  return (
    <div className="mx-auto max-w-[1680px] space-y-6">
      <section className="rounded-xl bg-[#050816] p-6 text-white shadow-sm lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#ffbf00]">
              Hassan Industries
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-tight lg:text-4xl">
              Publications Registry
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
              Controlled frontend registry for Enterprise Governance Library
              publications, manuals, standards, resolutions, policies,
              templates, and related publication records.
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-[#101827] px-8 py-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
              Registry Status
            </p>
            <p className="mt-3 text-3xl font-black text-[#ffbf00]">
              Frontend List
            </p>
            <p className="mt-1 text-xs font-black text-white">
              Static Data Layer
            </p>
          </div>
        </div>
      </section>

      <Link href="/governance-library" className="service-button">
        <ArrowLeft size={16} className="text-[#ff8a00]" />
        Back to EGL Dashboard
      </Link>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled Publication Records
      </p>

      <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_180px_260px_140px]">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Search Registry
            </p>
            <div className="flex h-12 items-center gap-3 rounded-lg border border-[#c8d3df] bg-white px-4">
              <Search className="h-4 w-4 text-[#94a3b8]" />
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search by document number, title, series, owner, status, or classification..."
                className="min-w-0 flex-1 text-sm font-semibold text-[#050816] outline-none placeholder:text-[#7d8999]"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Status
            </p>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]"
            >
              {statusFilters.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Series
            </p>
            <select
              value={seriesFilter}
              onChange={(event) => setSeriesFilter(event.target.value)}
              className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]"
            >
              {seriesFilters.map((series) => (
                <option key={series}>{series}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Classification
            </p>
            <select
              value={classificationFilter}
              onChange={(event) => setClassificationFilter(event.target.value)}
              className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]"
            >
              {classificationFilters.map((classification) => (
                <option key={classification}>{classification}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button type="button" onClick={clearFilters} className="service-button h-12 w-full">
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <section className="overflow-hidden rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#d8e1ea] p-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                Enterprise Governance Library
              </p>
              <h2 className="mt-2 text-3xl font-black text-[#050816]">
                Publications Registry
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#33445c]">
                Select a record to preview metadata or open one of the EGL
                action shells.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#fff0bd] px-5 py-3 text-sm font-black text-[#b45309]">
                {filteredRecords.length} shown
              </span>

              <Link
                href="/governance-library/publications/new"
                className="service-button-primary h-12"
              >
                <FilePlus2 className="h-4 w-4 text-[#ffbf00]" />
                Create New Publication
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto p-5">
            <div className="min-w-[1080px]">
              <div className="grid grid-cols-[150px_minmax(340px,1.7fr)_170px_110px_110px_120px_110px] bg-[#f8fafc]">
                {[
                  "Document No.",
                  "Title",
                  "Series",
                  "Status",
                  "Version",
                  "Owner",
                  "Actions",
                ].map((heading) => (
                  <div
                    key={heading}
                    className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-[#48617e]"
                  >
                    {heading}
                  </div>
                ))}
              </div>

              <div>
                {filteredRecords.map((record) => (
                  <RecordRow
                    key={record.documentNo}
                    record={record}
                    selected={selectedRecord?.documentNo === record.documentNo}
                    onSelect={() => setSelectedDocumentNumber(record.documentNo)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          {selectedRecord ? (
            <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
              <div className="mb-5 rounded-lg bg-[#050816] p-5 text-white">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-7 w-7 text-[#ffbf00]" />
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {selectedRecord.documentNo}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {selectedRecord.title}
                    </p>
                  </div>
                </div>
              </div>

              <DetailRow label="Publication Series" value={selectedRecord.series} />
              <DetailRow label="Document Type" value={selectedRecord.documentType} />
              <DetailRow label="Owner" value={selectedRecord.owner} />
              <DetailRow label="Authority" value={selectedRecord.authority} />
              <DetailRow label="Version" value={selectedRecord.version} />
              <DetailRow label="Status" value={selectedRecord.status} />
              <DetailRow label="Document State" value={selectedRecord.documentState} />
              <DetailRow label="Effective Date" value={selectedRecord.effectiveDate} />
              <DetailRow label="Review Date" value={selectedRecord.reviewDate} />

              <div className="mt-5 space-y-3">
                <Link
                  href={`/governance-library/publications/${selectedRecord.documentNo}`}
                  className="service-button-primary w-full justify-center"
                >
                  <Eye className="h-4 w-4 text-[#ffbf00]" />
                  View Record
                </Link>

                <Link
                  href={`/governance-library/publications/${selectedRecord.documentNo}/viewer`}
                  className="service-button w-full justify-center"
                >
                  <BookOpen className="h-4 w-4 text-[#ff8a00]" />
                  Open Viewer
                </Link>
              </div>
            </section>
          ) : null}

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ClipboardList className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                  Quick Actions
                </p>
                <h3 className="mt-2 text-xl font-black uppercase tracking-[0.2em] text-[#050816]">
                  HCA Controls
                </h3>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Link href="/governance-library/publications/new" className="service-button-primary w-full justify-center">
                <FilePlus2 className="h-4 w-4 text-[#ffbf00]" />
                Create New Publication
              </Link>

              <Link href="/governance-library/resolutions" className="service-button w-full justify-center">
                <FileText className="h-4 w-4 text-[#ff8a00]" />
                New Resolution
              </Link>

              <Link href="/service-requests/new?queue=governance-library-intake" className="service-button w-full justify-center">
                <Upload className="h-4 w-4 text-[#ff8a00]" />
                Upload Document
              </Link>

              <Link href="/governance-library/forms" className="service-button w-full justify-center">
                <BookOpen className="h-4 w-4 text-[#ff8a00]" />
                Forms & Templates
              </Link>

              <Link href="/governance-library/registers" className="service-button w-full justify-center">
                <FolderOpen className="h-4 w-4 text-[#ff8a00]" />
                View Registers
              </Link>

              <Link href="/service-requests/new?queue=governance-library-intake" className="service-button w-full justify-center">
                <RefreshCcw className="h-4 w-4 text-[#ff8a00]" />
                Request Review
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}