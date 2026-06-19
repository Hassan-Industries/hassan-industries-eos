"use client";

import Link from "next/link";
import { useMemo, useState, type ElementType } from "react";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  Eye,
  FileCheck2,
  FileText,
  Gavel,
  RefreshCcw,
  Search,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import {
  eglResolutionRecords,
  type EGLResolutionRecord,
} from "@/data/eglResolutions";
import {
  getResolutionRecordHref,
  getResolutionStatusLabel,
} from "@/lib/eglResolutionRecords";

const statusFilters = ["All Statuses", "OE", "DR", "RV", "AP", "VO"];
const ownerFilters = ["All Owners", "HCP", "HCA"];

export default function EGLResolutionsRegistryShell() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [ownerFilter, setOwnerFilter] = useState("All Owners");
  const [selectedResolutionId, setSelectedResolutionId] = useState<
    string | null
  >(null);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return eglResolutionRecords.filter((record) => {
      const searchText = [
        record.resolutionId,
        record.title,
        record.summary,
        record.status,
        record.statusLabel,
        record.owner,
        record.authority,
        record.resolutionType,
        record.classification,
        record.relatedPublication,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 || searchText.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All Statuses" || record.status === statusFilter;

      const matchesOwner =
        ownerFilter === "All Owners" || record.owner === ownerFilter;

      return matchesSearch && matchesStatus && matchesOwner;
    });
  }, [ownerFilter, searchValue, statusFilter]);

  const selectedRecord =
    selectedResolutionId === null
      ? null
      : eglResolutionRecords.find(
          (record) => record.resolutionId === selectedResolutionId,
        ) ?? null;

  const executedCount = eglResolutionRecords.filter(
    (record) => record.status === "OE",
  ).length;

  const draftCount = eglResolutionRecords.filter(
    (record) => record.status === "DR",
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
                    Resolutions Registry
                  </h1>

                  <p className="mt-3 max-w-3xl text-[12px] leading-5 text-slate-200">
                    Controlled frontend registry for foundational resolutions,
                    officer actions, governance decisions, approvals, adoption
                    records, and related Enterprise Governance Library authority.
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
                    Resolution Data Layer
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
                Governance Decisions & Formal Actions
              </p>
            </div>

            <section className="grid gap-3 md:grid-cols-4">
              <RegistryMetric
                label="Resolution Records"
                value={eglResolutionRecords.length.toString()}
                icon={ClipboardList}
              />

              <RegistryMetric
                label="Original Executed"
                value={executedCount.toString()}
                icon={BookOpen}
              />

              <RegistryMetric
                label="Draft Resolutions"
                value={draftCount.toString()}
                icon={RefreshCcw}
              />

              <RegistryMetric
                label="Linked Publications"
                value="3"
                icon={FileText}
              />
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                <div className="min-w-0 flex-1">
                  <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Search Resolutions
                  </label>

                  <div className="mt-2 flex overflow-hidden rounded-lg border border-slate-300 bg-white">
                    <div className="flex w-12 items-center justify-center">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>

                    <input
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                      placeholder="Search by resolution ID, title, owner, authority, related publication, or status..."
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
                  label="Owner"
                  value={ownerFilter}
                  options={ownerFilters}
                  onChange={setOwnerFilter}
                />

                <button
                  type="button"
                  onClick={() => {
                    setSearchValue("");
                    setStatusFilter("All Statuses");
                    setOwnerFilter("All Owners");
                    setSelectedResolutionId(null);
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
                      Resolutions Registry
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Select a resolution to preview authority, lifecycle,
                      related publications, and governance metadata.
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-700">
                    {filteredRecords.length} shown
                  </span>
                </div>

                <div className="overflow-x-auto p-5">
                  <table className="min-w-[980px] w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                        <th className="px-3 py-3 font-extrabold">
                          Resolution ID
                        </th>
                        <th className="px-3 py-3 font-extrabold">Title</th>
                        <th className="px-3 py-3 font-extrabold">Type</th>
                        <th className="px-3 py-3 font-extrabold">Status</th>
                        <th className="px-3 py-3 font-extrabold">Owner</th>
                        <th className="px-3 py-3 font-extrabold">
                          Related Publication
                        </th>
                        <th className="px-3 py-3 text-right font-extrabold">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredRecords.map((record) => {
                        const isSelected =
                          record.resolutionId === selectedResolutionId;

                        return (
                          <tr
                            key={record.resolutionId}
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
                                  setSelectedResolutionId(record.resolutionId)
                                }
                                className="text-left font-extrabold text-slate-950 hover:text-amber-700"
                              >
                                {record.resolutionId}
                              </button>
                            </td>

                            <td className="max-w-[330px] px-3 py-4 align-top">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedResolutionId(record.resolutionId)
                                }
                                className="block text-left"
                              >
                                <span className="block font-bold leading-5 text-slate-950">
                                  {record.title}
                                </span>

                                <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                                  {record.summary}
                                </span>
                              </button>
                            </td>

                            <td className="px-3 py-4 align-top font-semibold text-slate-700">
                              {record.resolutionType}
                            </td>

                            <td className="px-3 py-4 align-top">
                              <StatusBadge status={record.status} />
                            </td>

                            <td className="px-3 py-4 align-top font-semibold text-slate-950">
                              {record.owner}
                            </td>

                            <td className="px-3 py-4 align-top font-semibold text-slate-950">
                              {record.relatedPublication}
                            </td>

                            <td className="px-3 py-4 align-top">
                              <div className="flex justify-end">
                                <SmallActionLink
                                  href={getResolutionRecordHref(
                                    record.resolutionId,
                                  )}
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
                        No resolution records match the current filters.
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Clear filters or search by another resolution ID, owner,
                        authority, title, or related publication.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              <aside className="space-y-4">
                {selectedRecord ? (
                  <ResolutionPreviewPanel record={selectedRecord} />
                ) : (
                  <ResolutionSelectionPlaceholder />
                )}

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    Backend Readiness
                  </h2>

                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    This registry is frontend-only. Future work should connect
                    resolutions to executed documents, approval workflows,
                    officer records, board actions, certified copies, audit
                    trails, and controlled publication relationships.
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

function ResolutionPreviewPanel({
  record,
}: {
  record: EGLResolutionRecord;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
            Selected Resolution
          </p>

          <h2 className="mt-2 text-xl font-extrabold text-slate-950">
            {record.resolutionId}
          </h2>

          <p className="mt-2 text-sm font-bold leading-5 text-slate-800">
            {record.title}
          </p>
        </div>

        <StatusBadge status={record.status} />
      </div>

      <div className="rounded-lg bg-slate-950 p-4 text-white">
        <div className="flex items-center gap-3">
          <Gavel className="h-6 w-6 text-amber-400" />

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
              Controlled Resolution
            </p>

            <p className="mt-1 text-xs text-slate-200">
              {record.classification}
            </p>
          </div>
        </div>
      </div>

      <dl className="mt-4 space-y-0">
        <PreviewField label="Type" value={record.resolutionType} />
        <PreviewField label="Owner" value={record.owner} />
        <PreviewField label="Authority" value={record.authority} />
        <PreviewField label="Status" value={getResolutionStatusLabel(record)} />
        <PreviewField label="Version" value={record.version} />
        <PreviewField label="Effective Date" value={record.effectiveDate} />
        <PreviewField
          label="Related Publication"
          value={record.relatedPublication}
        />
        <PreviewField
          label="Retention"
          value={record.retentionCategory}
        />
      </dl>

      <div className="mt-4 grid gap-2">
        <ActionLink
          href={getResolutionRecordHref(record.resolutionId)}
          label="View Resolution Record"
          icon={Eye}
          primary
          newTab
        />

        <ActionLink
          href={`/governance-library/publications/${encodeURIComponent(
            record.relatedPublication,
          )}`}
          label="Open Related Publication"
          icon={FileText}
          newTab
        />
      </div>
    </section>
  );
}

function ResolutionSelectionPlaceholder() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
            Resolution Preview
          </p>

          <h2 className="mt-2 text-lg font-extrabold text-slate-950">
            No Resolution Selected
          </h2>

          <p className="mt-2 text-xs leading-5 text-slate-600">
            Select a resolution record to review authority, lifecycle status,
            executed location, related publication, and governance metadata.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <Gavel className="h-5 w-5 text-amber-400" />
        </div>
      </div>

      <div className="rounded-lg bg-slate-950 p-4 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
          Resolution Workspace
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-200">
          Resolution records open only after intentional selection.
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Training Note
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-600">
          Future training materials should describe this registry as the formal
          lookup point for resolutions, approvals, officer actions, and
          governance decisions connected to controlled publications.
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