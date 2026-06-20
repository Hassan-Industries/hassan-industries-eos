"use client";

import Link from "next/link";
import { useMemo, useState, type ElementType } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  Eye,
  FilePlus2,
  FileText,
  GitBranch,
  RefreshCcw,
  Search,
  Upload,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { publications, type PublicationRecord } from "@/data/governanceLibrary";

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
  authority?: string;
  version?: string | number;
  status?: string;
  statusLabel?: string;
  documentState?: string;
  documentType?: string;
  reviewDate?: string;
  effectiveDate?: string;
  classification?: string;
  retentionCategory?: string;
  originalExecutedLocation?: string;
  certifiedCopy?: string;
  relatedResolution?: string;
  relatedImplementationProject?: string;
  notes?: string;
};

type InitialRegistryFilters = {
  searchValue: string;
  statusFilter: string;
  seriesFilter: string;
  classificationFilter: string;
  documentTypeFilter: string;
};

const statusFilters = [
  "All Statuses",
  "AP",
  "DR",
  "RV",
  "OE",
  "CC",
  "SP",
  "AR",
  "VO",
];

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

export default function EGLPublicationsRegistryShell() {
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();

  const initialFilters = useMemo(
    () => getInitialFiltersFromQueryKey(queryKey),
    [queryKey],
  );

  return (
    <PublicationsRegistryContent
      key={queryKey}
      initialFilters={initialFilters}
    />
  );
}

function PublicationsRegistryContent({
  initialFilters,
}: {
  initialFilters: InitialRegistryFilters;
}) {
  const records = useMemo(
    () => publications.filter(Boolean) as DisplayPublicationRecord[],
    [],
  );

  const [searchValue, setSearchValue] = useState(initialFilters.searchValue);
  const [statusFilter, setStatusFilter] = useState(initialFilters.statusFilter);
  const [seriesFilter, setSeriesFilter] = useState(initialFilters.seriesFilter);
  const [classificationFilter, setClassificationFilter] = useState(
    initialFilters.classificationFilter,
  );
  const [documentTypeFilter, setDocumentTypeFilter] = useState(
    initialFilters.documentTypeFilter,
  );
  const [selectedDocumentNumber, setSelectedDocumentNumber] = useState<
    string | null
  >(null);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    const normalizedDocumentType = documentTypeFilter.trim().toLowerCase();

    return records.filter((record) => {
      const searchText = [
        getDocumentNumber(record),
        getTitle(record),
        getDescription(record),
        getSeries(record),
        getStatus(record),
        getOwner(record),
        getAuthority(record),
        getClassification(record),
        getDocumentType(record),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 || searchText.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All Statuses" || getStatus(record) === statusFilter;

      const matchesSeries =
        seriesFilter === "All Series" || getSeries(record) === seriesFilter;

      const matchesClassification =
        classificationFilter === "All Classifications" ||
        getClassification(record) === classificationFilter;

      const matchesDocumentType =
        normalizedDocumentType.length === 0 ||
        getDocumentType(record).toLowerCase().includes(normalizedDocumentType);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSeries &&
        matchesClassification &&
        matchesDocumentType
      );
    });
  }, [
    classificationFilter,
    documentTypeFilter,
    records,
    searchValue,
    seriesFilter,
    statusFilter,
  ]);

  const selectedRecord =
    selectedDocumentNumber === null
      ? null
      : records.find(
          (record) => getDocumentNumber(record) === selectedDocumentNumber,
        ) ?? null;

  const approvedCount = records.filter((record) => getStatus(record) === "AP")
    .length;

  const reviewDraftCount = records.filter((record) =>
    ["DR", "RV"].includes(getStatus(record)),
  ).length;

  const originalExecutedCount = records.filter(
    (record) => getStatus(record) === "OE",
  ).length;

  function clearFilters() {
    setSearchValue("");
    setStatusFilter("All Statuses");
    setSeriesFilter("All Series");
    setClassificationFilter("All Classifications");
    setDocumentTypeFilter("");
    setSelectedDocumentNumber(null);
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-amber-400">
                    Hassan Industries
                  </p>
                  <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">
                    Publications Registry
                  </h1>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-100">
                    Controlled frontend registry for Enterprise Governance
                    Library publications, manuals, standards, resolutions,
                    policies, templates, and related publication records.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-white/5 px-7 py-5 text-center">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-100">
                    Registry Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Frontend List
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-100">
                    Static Data Layer
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/governance-library"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Back to EGL Dashboard
              </Link>

              <p className="hidden text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-400 lg:block">
                Controlled Publication Records
              </p>
            </div>

            <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <RegistryMetric
                label="Registry Records"
                value={String(records.length)}
                icon={ClipboardList}
              />
              <RegistryMetric
                label="Approved"
                value={String(approvedCount)}
                icon={FileText}
              />
              <RegistryMetric
                label="Review / Draft"
                value={String(reviewDraftCount)}
                icon={RefreshCcw}
              />
              <RegistryMetric
                label="Original Executed"
                value={String(originalExecutedCount)}
                icon={BookOpen}
              />
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 xl:grid-cols-[1fr_180px_180px_280px_104px]">
                <label>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-500">
                    Search Registry
                  </span>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 transition focus-within:border-amber-500">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                      placeholder="Search by document number, title, series, owner, status, or classification..."
                      className="min-w-0 flex-1 px-1 py-3 text-sm outline-none"
                    />
                  </div>
                </label>

                <FilterSelect
                  label="Status"
                  value={statusFilter}
                  options={statusFilters}
                  onChange={setStatusFilter}
                />

                <FilterSelect
                  label="Series"
                  value={seriesFilter}
                  options={seriesFilters}
                  onChange={setSeriesFilter}
                />

                <FilterSelect
                  label="Classification"
                  value={classificationFilter}
                  options={classificationFilters}
                  onChange={setClassificationFilter}
                />

                <button
                  type="button"
                  onClick={clearFilters}
                  className="self-end rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
                >
                  Clear Filters
                </button>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-400">
                      Enterprise Governance Library
                    </p>
                    <h2 className="mt-2 text-2xl font-black">
                      Publications Registry
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Select a record to preview metadata or open one of the EGL
                      action shells.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-extrabold text-amber-700">
                      {filteredRecords.length} shown
                    </span>

                    <Link
                      href="/governance-library/publications/new"
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      <FilePlus2 className="h-4 w-4 text-amber-400" />
                      Create New Publication
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto p-5">
                  <table className="min-w-[980px] w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-extrabold uppercase tracking-[0.25em] text-slate-500">
                        <th className="px-3 py-4">Document No.</th>
                        <th className="px-3 py-4">Title</th>
                        <th className="px-3 py-4">Series</th>
                        <th className="px-3 py-4">Status</th>
                        <th className="px-3 py-4">Version</th>
                        <th className="px-3 py-4">Owner</th>
                        <th className="px-3 py-4">Review Date</th>
                        <th className="px-3 py-4 text-right">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredRecords.map((record) => {
                        const documentNumber = getDocumentNumber(record);
                        const isSelected =
                          selectedDocumentNumber === documentNumber;

                        return (
                          <tr
                            key={documentNumber}
                            className={[
                              "border-b border-slate-200 transition hover:bg-amber-50/70",
                              isSelected ? "bg-amber-50" : "bg-white",
                            ].join(" ")}
                          >
                            <td className="px-3 py-4 align-top">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedDocumentNumber(documentNumber)
                                }
                                className="text-left font-extrabold text-slate-950 hover:text-amber-700"
                              >
                                {documentNumber}
                              </button>
                            </td>

                            <td className="px-3 py-4 align-top">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedDocumentNumber(documentNumber)
                                }
                                className="block text-left"
                              >
                                <span className="font-extrabold text-slate-950">
                                  {getTitle(record)}
                                </span>
                                <span className="mt-2 block max-w-[360px] text-xs leading-5 text-slate-500">
                                  {getDescription(record)}
                                </span>
                              </button>
                            </td>

                            <td className="px-3 py-4 align-top font-semibold text-slate-700">
                              {getSeries(record)}
                            </td>

                            <td className="px-3 py-4 align-top">
                              <StatusBadge status={getStatus(record)} />
                            </td>

                            <td className="px-3 py-4 align-top font-bold">
                              {String(record.version ?? "1.0")}
                            </td>

                            <td className="px-3 py-4 align-top font-bold">
                              {getOwner(record)}
                            </td>

                            <td className="px-3 py-4 align-top font-bold">
                              {getReviewDate(record)}
                            </td>

                            <td className="px-3 py-4 align-top text-right">
                              <Link
                                href={getRecordHref(record)}
                                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                              >
                                <Eye className="h-4 w-4 text-amber-500" />
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {filteredRecords.length === 0 && (
                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                      <p className="text-sm font-extrabold text-slate-950">
                        No publication records match the current filters.
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Clear filters or search by another document number,
                        owner, series, title, or classification.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              <aside className="space-y-4">
                {selectedRecord ? (
                  <PublicationPreviewPanel record={selectedRecord} />
                ) : (
                  <PublicationSelectionPlaceholder />
                )}

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h3 className="text-[15px] font-black uppercase tracking-[0.28em]">
                    Backend Readiness
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    This registry remains frontend-only. Future backend work
                    should connect this list to stored publication records,
                    upload workflows, approval routing, audit logs, certified
                    copy generation, and Microsoft 365 or SharePoint file
                    locations.
                  </p>
                </section>
              </aside>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function PublicationPreviewPanel({
  record,
}: {
  record: DisplayPublicationRecord;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-400">
            Selected Record
          </p>
          <h2 className="mt-2 text-2xl font-black">
            {getDocumentNumber(record)}
          </h2>
          <p className="mt-2 text-sm font-extrabold text-slate-950">
            {getTitle(record)}
          </p>
        </div>

        <StatusBadge status={getStatus(record)} />
      </div>

      <div className="mt-5 rounded-lg bg-slate-950 p-5 text-white">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-amber-400" />
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.35em]">
              Controlled Publication
            </p>
            <p className="mt-1 text-xs font-semibold">
              {getClassification(record)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <PreviewField label="Series" value={getSeries(record)} />
        <PreviewField label="Document Type" value={getDocumentType(record)} />
        <PreviewField label="Owner" value={getOwner(record)} />
        <PreviewField label="Authority" value={getAuthority(record)} />
        <PreviewField label="Version" value={String(record.version ?? "1.0")} />
        <PreviewField label="Review Date" value={getReviewDate(record)} />
        <PreviewField
          label="Retention"
          value={record.retentionCategory ?? "Permanent"}
        />
      </div>

      <div className="mt-5 space-y-2">
        <ActionLink
          href={getRecordHref(record)}
          label="View Record"
          icon={Eye}
          primary
        />
        <ActionLink
          href={`${getRecordHref(record)}/viewer`}
          label="Open Viewer"
          icon={FileText}
          newTab
        />
        <ActionLink
          href={`${getRecordHref(record)}/upload-replacement`}
          label="Upload Replacement"
          icon={Upload}
        />
        <ActionLink
          href={`${getRecordHref(record)}/certified-copy`}
          label="Create Certified Copy"
          icon={FilePlus2}
        />
        <ActionLink
          href={`${getRecordHref(record)}/revision-history`}
          label="Revision History"
          icon={GitBranch}
        />
        <ActionLink
          href={`${getRecordHref(record)}/request-review`}
          label="Request Review"
          icon={RefreshCcw}
        />
      </div>
    </section>
  );
}

function PublicationSelectionPlaceholder() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-400">
            Registry Preview
          </p>
          <h2 className="mt-2 text-2xl font-black">No Record Selected</h2>
        </div>

        <div className="rounded-lg bg-slate-950 p-3">
          <BookOpen className="h-6 w-6 text-amber-400" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        Select a controlled publication record to open its profile, metadata,
        authority, lifecycle status, and available EGL actions.
      </p>

      <div className="mt-5 rounded-lg bg-slate-950 p-5 text-white">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-amber-400" />
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.35em]">
              Controlled Publication Workspace
            </p>
            <p className="mt-1 text-xs font-semibold">
              Profiles open only after intentional record selection.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <PlaceholderInstruction
          title="Select a Record"
          body="Choose a publication from the registry table before using record-level actions."
          icon={ClipboardList}
        />
        <PlaceholderInstruction
          title="Review Authority"
          body="Verify owner, authority, classification, status, and lifecycle metadata."
          icon={BookOpen}
        />
        <PlaceholderInstruction
          title="Use Record Actions"
          body="Open the viewer, upload replacement, certify a copy, request review, or view revision history."
          icon={FileText}
        />
      </div>

      <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-400">
          Training Note
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Future training materials should describe this registry as the
          controlled lookup point for publication records before employees or
          executives perform document actions.
        </p>
      </div>
    </section>
  );
}

function PlaceholderInstruction({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: ElementType;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
        <Icon className="h-4 w-4 text-amber-500" />
      </div>
      <div>
        <p className="text-sm font-extrabold text-slate-950">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-600">{body}</p>
      </div>
    </div>
  );
}

function RegistryMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ElementType;
}) {
  return (
    <div className="flex min-h-[88px] items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div>
        <p className="text-[11px] text-slate-500">{label}</p>
        <p className="mt-2 text-[25px] font-black leading-none text-slate-950">
          {value}
        </p>
      </div>

      <Icon className="h-6 w-6 text-amber-500" />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-500">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-xs font-semibold text-slate-950 outline-none transition focus:border-amber-500"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex rounded-md bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-700">
      {status}
    </span>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-2 text-sm">
      <span className="font-semibold text-slate-500">{label}</span>
      <span className="text-right font-extrabold text-slate-950">{value}</span>
    </div>
  );
}

function ActionLink({
  href,
  label,
  icon: Icon,
  primary = false,
  newTab = false,
}: {
  href: string;
  label: string;
  icon: ElementType;
  primary?: boolean;
  newTab?: boolean;
}) {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      className={[
        "flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-bold transition",
        primary
          ? "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
          : "border-slate-300 bg-white text-slate-950 hover:border-amber-500 hover:bg-amber-50",
      ].join(" ")}
    >
      <Icon
        className={[
          "h-4 w-4",
          primary ? "text-white" : "text-amber-500",
        ].join(" ")}
      />
      {label}
    </Link>
  );
}

function getInitialFiltersFromQueryKey(queryKey: string): InitialRegistryFilters {
  const params = new URLSearchParams(queryKey);

  const querySearch = params.get("search") ?? params.get("q") ?? "";
  const queryStatus = params.get("status");
  const querySeries = params.get("series");
  const queryClassification = params.get("classification");
  const queryDocumentType =
    params.get("documentType") ?? params.get("type") ?? "";

  return {
    searchValue: querySearch,
    statusFilter: getMatchedFilterOption(
      queryStatus,
      statusFilters,
      "All Statuses",
    ),
    seriesFilter: getMatchedFilterOption(
      querySeries,
      seriesFilters,
      "All Series",
    ),
    classificationFilter: getMatchedFilterOption(
      queryClassification,
      classificationFilters,
      "All Classifications",
    ),
    documentTypeFilter: queryDocumentType.trim(),
  };
}

function getMatchedFilterOption(
  rawValue: string | null,
  options: string[],
  defaultValue: string,
) {
  if (!rawValue) {
    return defaultValue;
  }

  const normalizedRawValue = normalizeFilterValue(rawValue);

  return (
    options.find((option) => normalizeFilterValue(option) === normalizedRawValue) ??
    defaultValue
  );
}

function normalizeFilterValue(value: string) {
  return safeDecodeURIComponent(value)
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase();
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getDocumentNumber(record: DisplayPublicationRecord) {
  return (
    record.documentNumber ??
    record.documentNo ??
    record.documentId ??
    record.id ??
    "N/A"
  );
}

function getRecordHref(record: DisplayPublicationRecord) {
  return `/governance-library/publications/${encodeURIComponent(
    getDocumentNumber(record),
  )}`;
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

function getOwner(record: DisplayPublicationRecord) {
  return record.owner ?? "HCA";
}

function getAuthority(record: DisplayPublicationRecord) {
  return record.authority ?? "Hassan Capital Partners, LLC";
}

function getClassification(record: DisplayPublicationRecord) {
  return record.classification ?? "Internal Governance";
}

function getDocumentType(record: DisplayPublicationRecord) {
  return record.documentType ?? "Publication";
}

function getReviewDate(record: DisplayPublicationRecord) {
  return record.reviewDate ?? record.effectiveDate ?? "Pending";
}