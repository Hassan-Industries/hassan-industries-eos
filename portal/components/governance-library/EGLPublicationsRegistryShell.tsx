"use client";

import Link from "next/link";
import { useMemo, useState, type ElementType } from "react";
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
];

export default function EGLPublicationsRegistryShell() {
  const records = publications.filter(Boolean) as DisplayPublicationRecord[];

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [seriesFilter, setSeriesFilter] = useState("All Series");
  const [classificationFilter, setClassificationFilter] =
    useState("All Classifications");
  const [selectedDocumentNumber, setSelectedDocumentNumber] = useState<
    string | null
  >(null);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

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

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSeries &&
        matchesClassification
      );
    });
  }, [classificationFilter, records, searchValue, seriesFilter, statusFilter]);

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

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl bg-slate-950 px-5 py-5 text-white shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-amber-400">
                    Hassan Industries
                  </p>

                  <h1 className="mt-2 text-[26px] font-extrabold uppercase leading-none tracking-wide">
                    Publications Registry
                  </h1>

                  <p className="mt-3 max-w-4xl text-[12px] leading-5 text-slate-200">
                    Controlled frontend registry for Enterprise Governance
                    Library publications, manuals, standards, resolutions,
                    policies, templates, and related publication records.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500/70 bg-slate-900 px-6 py-4 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-200">
                    Registry Status
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-amber-400">
                    Frontend List
                  </p>

                  <p className="mt-1 text-[11px] text-slate-300">
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

              <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 md:block">
                Controlled Publication Records
              </p>
            </div>

            <section className="grid gap-3 md:grid-cols-4">
              <RegistryMetric
                label="Registry Records"
                value={records.length.toString()}
                icon={ClipboardList}
              />

              <RegistryMetric
                label="Approved"
                value={approvedCount.toString()}
                icon={FileText}
              />

              <RegistryMetric
                label="Review / Draft"
                value={reviewDraftCount.toString()}
                icon={RefreshCcw}
              />

              <RegistryMetric
                label="Original Executed"
                value={originalExecutedCount.toString()}
                icon={BookOpen}
              />
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
                <div className="min-w-0 flex-1">
                  <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Search Registry
                  </label>

                  <div className="mt-2 flex overflow-hidden rounded-lg border border-slate-300 bg-white">
                    <div className="flex w-12 items-center justify-center">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>

                    <input
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                      placeholder="Search by document number, title, series, owner, status, or classification..."
                      className="min-w-0 flex-1 px-1 py-3 text-sm outline-none"
                    />
                  </div>
                </div>

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
                  onClick={() => {
                    setSearchValue("");
                    setStatusFilter("All Statuses");
                    setSeriesFilter("All Series");
                    setClassificationFilter("All Classifications");
                    setSelectedDocumentNumber(null);
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
                >
                  Clear Filters
                </button>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
              <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 p-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-slate-400">
                      Enterprise Governance Library
                    </p>

                    <h2 className="mt-1 text-lg font-extrabold text-slate-950">
                      Publications Registry
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Select a record to preview metadata or open one of the EGL
                      action shells.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-700">
                      {filteredRecords.length} shown
                    </span>

                    <Link
                      href="/governance-library/publications/new"
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-[11px] font-bold text-white transition hover:bg-slate-800"
                    >
                      <FilePlus2 className="h-3.5 w-3.5 text-amber-400" />
                      Create New Publication
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto p-5">
                  <table className="min-w-[980px] w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                        <th className="px-3 py-3 font-extrabold">
                          Document No.
                        </th>
                        <th className="px-3 py-3 font-extrabold">Title</th>
                        <th className="px-3 py-3 font-extrabold">Series</th>
                        <th className="px-3 py-3 font-extrabold">Status</th>
                        <th className="px-3 py-3 font-extrabold">Version</th>
                        <th className="px-3 py-3 font-extrabold">Owner</th>
                        <th className="px-3 py-3 font-extrabold">
                          Review Date
                        </th>
                        <th className="px-3 py-3 text-right font-extrabold">
                          Actions
                        </th>
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
                            className={`border-b border-slate-200 transition last:border-b-0 ${
                              isSelected
                                ? "bg-amber-50"
                                : "bg-white hover:bg-slate-50"
                            }`}
                          >
                            <td className="px-3 py-4 align-top font-extrabold text-slate-950">
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

                            <td className="max-w-[330px] px-3 py-4 align-top">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedDocumentNumber(documentNumber)
                                }
                                className="block text-left"
                              >
                                <span className="block font-bold leading-5 text-slate-950">
                                  {getTitle(record)}
                                </span>

                                <span className="mt-1 block text-[11px] leading-4 text-slate-500">
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

                            <td className="px-3 py-4 align-top font-semibold text-slate-950">
                              {String(record.version ?? "1.0")}
                            </td>

                            <td className="px-3 py-4 align-top font-semibold text-slate-950">
                              {getOwner(record)}
                            </td>

                            <td className="px-3 py-4 align-top font-semibold text-slate-950">
                              {getReviewDate(record)}
                            </td>

                            <td className="px-3 py-4 align-top">
                              <div className="flex justify-end">
                                <SmallActionLink
                                  href={getRecordHref(record)}
                                  label="Record"
                                  icon={Eye}
                                  newTab
                                />
                              </div>
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

                      <p className="mt-2 text-xs text-slate-500">
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
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    Backend Readiness
                  </h2>

                  <p className="mt-3 text-xs leading-5 text-slate-600">
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
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
            Selected Record
          </p>

          <h2 className="mt-2 text-xl font-extrabold text-slate-950">
            {getDocumentNumber(record)}
          </h2>

          <p className="mt-2 text-sm font-bold leading-5 text-slate-800">
            {getTitle(record)}
          </p>
        </div>

        <StatusBadge status={getStatus(record)} />
      </div>

      <div className="rounded-lg bg-slate-950 p-4 text-white">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-amber-400" />

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
              Controlled Publication
            </p>

            <p className="mt-1 text-xs text-slate-200">
              {getClassification(record)}
            </p>
          </div>
        </div>
      </div>

      <dl className="mt-4 space-y-0">
        <PreviewField label="Series" value={getSeries(record)} />
        <PreviewField
          label="Document Type"
          value={record.documentType ?? "Manual"}
        />
        <PreviewField label="Owner" value={getOwner(record)} />
        <PreviewField label="Authority" value={getAuthority(record)} />
        <PreviewField label="Version" value={String(record.version ?? "1.0")} />
        <PreviewField label="Review Date" value={getReviewDate(record)} />
        <PreviewField
          label="Retention"
          value={record.retentionCategory ?? "Permanent"}
        />
      </dl>

      <div className="mt-4 grid gap-2">
        <ActionLink
          href={getRecordHref(record)}
          label="View Record"
          icon={Eye}
          primary
          newTab
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
          newTab
        />

        <ActionLink
          href={`${getRecordHref(record)}/certified-copy`}
          label="Create Certified Copy"
          icon={FileText}
          newTab
        />

        <ActionLink
          href={`${getRecordHref(record)}/revision-history`}
          label="Revision History"
          icon={GitBranch}
          newTab
        />

        <ActionLink
          href={`${getRecordHref(record)}/request-review`}
          label="Request Review"
          icon={RefreshCcw}
          newTab
        />
      </div>
    </section>
  );
}

function PublicationSelectionPlaceholder() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
            Registry Preview
          </p>

          <h2 className="mt-2 text-lg font-extrabold text-slate-950">
            No Record Selected
          </h2>

          <p className="mt-2 text-xs leading-5 text-slate-600">
            Select a controlled publication record to open its profile,
            metadata, authority, lifecycle status, and available EGL actions.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <BookOpen className="h-5 w-5 text-amber-400" />
        </div>
      </div>

      <div className="rounded-lg bg-slate-950 p-4 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
          Controlled Publication Workspace
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-200">
          Profiles open only after intentional record selection.
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Training Note
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-600">
          Future training materials should describe this registry as the
          controlled lookup point for publication records before employees or
          executives perform document actions.
        </p>
      </div>
    </section>
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
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-extrabold text-slate-950">
            {value}
          </p>
        </div>

        <Icon className="h-6 w-6 text-amber-500" />
      </div>
    </section>
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
    <div className="min-w-[180px]">
      <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-xs font-semibold text-slate-950 outline-none transition focus:border-amber-500"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex min-w-10 items-center justify-center rounded-md bg-emerald-100 px-2 py-1 text-[11px] font-extrabold text-emerald-700">
      {status}
    </span>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200 py-2 text-xs last:border-b-0">
      <dt className="font-bold text-slate-500">{label}</dt>
      <dd className="text-right font-semibold text-slate-950">{value}</dd>
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
      rel={newTab ? "noopener noreferrer" : undefined}
      prefetch={false}
      className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs font-bold transition ${
        primary
          ? "bg-slate-950 text-white hover:bg-slate-800"
          : "border border-slate-300 bg-white text-slate-950 hover:border-amber-500 hover:bg-amber-50"
      }`}
    >
      <Icon className={`h-4 w-4 ${primary ? "" : "text-amber-600"}`} />
      {label}
    </Link>
  );
}

function SmallActionLink({
  href,
  label,
  icon: Icon,
  newTab = false,
}: {
  href: string;
  label: string;
  icon: ElementType;
  newTab?: boolean;
}) {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      prefetch={false}
      className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
    >
      <Icon className="h-3.5 w-3.5 text-amber-600" />
      {label}
    </Link>
  );
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

function getReviewDate(record: DisplayPublicationRecord) {
  return record.reviewDate ?? record.effectiveDate ?? "Pending";
}