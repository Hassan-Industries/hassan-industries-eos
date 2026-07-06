"use client";

import Link from "next/link";
import { useMemo, useState, type ElementType } from "react";
import {
  ArrowLeft,
  ClipboardList,
  Eye,
  FileCheck2,
  Gavel,
  Search,
} from "lucide-react";
import {
  eglResolutionRecords,
  type EGLResolutionRecord,
} from "@/data/eglResolutions";
import { getResolutionRecordHref } from "@/lib/eglResolutionRecords";

const statusFilters = ["All Statuses", "OE", "DR", "RV", "AP", "VO"];
const ownerFilters = ["All Owners", "HCP", "HCA"];

export default function EGLResolutionsRegistryShell() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [ownerFilter, setOwnerFilter] = useState("All Owners");
  const [selectedResolutionId, setSelectedResolutionId] =
    useState<string | null>(eglResolutionRecords[0]?.resolutionId ?? null);

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

  function clearFilters() {
    setSearchValue("");
    setStatusFilter("All Statuses");
    setOwnerFilter("All Owners");
    setSelectedResolutionId(eglResolutionRecords[0]?.resolutionId ?? null);
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
              Resolutions Registry
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
              Controlled frontend registry for foundational resolutions,
              officer actions, governance decisions, approvals, adoption
              records, and related Enterprise Governance Library authority.
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-[#101827] px-8 py-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
              Registry Status
            </p>
            <p className="mt-3 text-2xl font-black text-[#ffbf00]">
              Frontend List
            </p>
            <p className="mt-1 text-xs font-black text-white">
              Resolution Data Layer
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/governance-library"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
        >
          <ArrowLeft size={16} className="text-[#ff8a00]" />
          Back to EGL Dashboard
        </Link>
      </div>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Governance Decisions & Formal Actions
      </p>

      <section className="grid gap-4 md:grid-cols-3">
        <RegistryMetric
          label="Registry Records"
          value={eglResolutionRecords.length.toString()}
          icon={ClipboardList}
        />
        <RegistryMetric
          label="Original Executed"
          value={executedCount.toString()}
          icon={FileCheck2}
        />
        <RegistryMetric
          label="Draft Records"
          value={draftCount.toString()}
          icon={Gavel}
        />
      </section>

      <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px_220px_140px]">
          <label>
            <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Search Resolutions
            </span>
            <div className="flex h-12 items-center gap-3 rounded-lg border border-[#c8d3df] bg-white px-4">
              <Search size={18} className="text-[#94a3b8]" />
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search by resolution ID, title, owner, authority, related publication, or status..."
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#94a3b8]"
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
            label="Owner"
            value={ownerFilter}
            options={ownerFilters}
            onChange={setOwnerFilter}
          />

          <button
            type="button"
            onClick={clearFilters}
            className="self-end rounded-lg border border-[#c8d3df] bg-white px-4 py-3 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
          >
            Clear Filters
          </button>
        </div>
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="overflow-hidden rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#d8e1ea] p-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                Enterprise Governance Library
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Resolutions Registry
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#33445c]">
                Select a resolution to preview authority, lifecycle, related
                publications, and governance metadata.
              </p>
            </div>

            <span className="h-fit rounded-full bg-[#fff1bf] px-5 py-3 text-xs font-black text-[#b45309]">
              {filteredRecords.length} shown
            </span>
          </div>

          <div className="divide-y divide-[#d8e1ea]">
            {filteredRecords.map((record) => {
              const isSelected = record.resolutionId === selectedResolutionId;

              return (
                <button
                  key={record.resolutionId}
                  type="button"
                  onClick={() => setSelectedResolutionId(record.resolutionId)}
                  className={[
                    "block w-full px-6 py-5 text-left transition",
                    isSelected ? "bg-[#fffaf0]" : "bg-white hover:bg-[#f8fafc]",
                  ].join(" ")}
                >
                  <div className="grid gap-4 lg:grid-cols-[170px_minmax(0,1.2fr)_180px_90px_100px_150px_90px] lg:items-start">
                    <div className="font-black text-[#050816]">
                      {record.resolutionId}
                    </div>

                    <div>
                      <p className="font-black text-[#050816]">
                        {record.title}
                      </p>
                      <p className="mt-2 max-w-[520px] text-xs font-semibold leading-6 text-[#48617e]">
                        {record.summary}
                      </p>
                    </div>

                    <div className="text-sm font-bold text-[#24364d]">
                      {record.resolutionType}
                    </div>

                    <StatusBadge status={record.status} />

                    <div className="text-sm font-black text-[#050816]">
                      {record.owner}
                    </div>

                    <div className="text-sm font-black text-[#050816]">
                      {record.relatedPublication}
                    </div>

                    <Link
                      href={getResolutionRecordHref(record.resolutionId)}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-3 text-xs font-black text-[#050816] transition hover:border-[#ff8a00]"
                    >
                      <Eye size={14} className="text-[#ff8a00]" />
                      Open
                    </Link>
                  </div>
                </button>
              );
            })}

            {filteredRecords.length === 0 ? (
              <div className="p-6 text-sm font-bold text-[#33445c]">
                No resolution records match the current filters.
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-5">
          {selectedRecord ? (
            <ResolutionPreviewPanel record={selectedRecord} />
          ) : (
            <ResolutionSelectionPlaceholder />
          )}

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black uppercase tracking-[0.35em]">
              Backend Readiness
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#33445c]">
              This registry is frontend-only. Future work should connect
              resolutions to executed documents, approval workflows, officer
              records, board actions, certified copies, audit trails, and
              controlled publication relationships.
            </p>
          </section>
        </aside>
      </section>
    </div>
  );
}

function ResolutionPreviewPanel({ record }: { record: EGLResolutionRecord }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
            Selected Resolution
          </p>
          <h2 className="mt-2 text-2xl font-black">{record.resolutionId}</h2>
          <p className="mt-2 text-sm font-black text-[#050816]">
            {record.title}
          </p>
        </div>

        <StatusBadge status={record.status} />
      </div>

      <div className="mt-5 rounded-lg bg-[#050816] p-5 text-white">
        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white">
          Controlled Resolution
        </p>
        <p className="mt-2 text-sm font-bold text-white">
          {record.classification}
        </p>
      </div>

      <div className="mt-5">
        <PreviewField label="Type" value={record.resolutionType} />
        <PreviewField label="Owner" value={record.owner} />
        <PreviewField label="Authority" value={record.authority} />
        <PreviewField
          label="Status"
          value={`${record.status} — ${record.statusLabel}`}
        />
        <PreviewField label="Version" value={record.version} />
        <PreviewField label="Effective Date" value={record.effectiveDate} />
        <PreviewField
          label="Related Publication"
          value={record.relatedPublication}
        />
        <PreviewField label="Retention" value={record.retentionCategory} />
      </div>

      <div className="mt-5 space-y-3">
        <Link
          href={getResolutionRecordHref(record.resolutionId)}
          className="flex h-12 w-full items-center justify-center rounded-lg bg-[#050816] px-4 text-sm font-black text-white"
        >
          Open Resolution Record
        </Link>

        <Link
          href={`/governance-library/publications/${record.relatedPublication}`}
          className="flex h-12 w-full items-center justify-center rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00]"
        >
          Open Related Publication
        </Link>
      </div>
    </section>
  );
}

function ResolutionSelectionPlaceholder() {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
        Resolution Preview
      </p>

      <h2 className="mt-2 text-2xl font-black">No Resolution Selected</h2>

      <p className="mt-4 text-sm leading-7 text-[#33445c]">
        Select a resolution record to review authority, lifecycle status,
        executed location, related publication, and governance metadata.
      </p>

      <div className="mt-5 rounded-lg bg-[#050816] p-5 text-white">
        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white">
          Resolution Workspace
        </p>
        <p className="mt-2 text-sm font-bold text-white">
          Resolution records open only after intentional selection.
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
    <div className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#48617e]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[#050816]">{value}</p>
        </div>

        <Icon className="h-6 w-6 text-[#ff8a00]" />
      </div>
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
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] outline-none transition focus:border-[#ff8a00]"
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
    <span className="w-fit rounded-md bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
      {status}
    </span>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#d8e1ea] py-3 last:border-b-0">
      <span className="text-sm font-bold text-[#64748b]">{label}</span>
      <span className="max-w-[210px] text-right text-sm font-black text-[#050816]">
        {value}
      </span>
    </div>
  );
}