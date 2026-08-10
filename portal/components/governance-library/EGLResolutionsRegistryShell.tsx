"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  Eye,
  FileText,
  Gavel,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  eglResolutionRecords,
  type EGLResolutionRecord,
} from "@/data/eglResolutions";

const statusFilters = ["All Statuses", "OE", "DR", "RV", "AP"];
const ownerFilters = ["All Owners", "HCP", "HCA", "Enterprise Governance"];

function getStatusClass(status: string) {
  if (status === "OE" || status === "AP") {
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

function ResolutionRow({
  record,
  selected,
  onSelect,
}: {
  record: EGLResolutionRecord;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "grid min-w-[1060px] grid-cols-[190px_minmax(360px,1.7fr)_190px_110px_120px_170px_110px] border-b border-[#d8e1ea] text-left transition last:border-b-0",
        selected ? "bg-[#fffaf0]" : "bg-white hover:bg-[#f8fafc]",
      ].join(" ")}
    >
      <div className="px-4 py-5 text-sm font-black text-[#050816]">
        {record.resolutionId}
      </div>

      <div className="px-4 py-5">
        <p className="text-sm font-black leading-6 text-[#050816]">
          {record.title}
        </p>
        <p className="mt-2 max-w-[460px] text-xs font-semibold leading-6 text-[#48617e]">
          {record.summary}
        </p>
      </div>

      <div className="px-4 py-5 text-sm font-bold text-[#24364d]">
        {record.resolutionType}
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
        {record.owner}
      </div>

      <div className="px-4 py-5 text-sm font-black text-[#050816]">
        {record.relatedPublication}
      </div>

      <div className="px-4 py-5">
        <span className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]">
          <Eye className="h-4 w-4 text-[#ff8a00]" />
          Open
        </span>
      </div>
    </button>
  );
}

export default function EGLResolutionsRegistryShell() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [ownerFilter, setOwnerFilter] = useState("All Owners");
  const [selectedResolutionId, setSelectedResolutionId] = useState(
    eglResolutionRecords[0]?.resolutionId ?? "",
  );

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
    eglResolutionRecords.find(
      (record) => record.resolutionId === selectedResolutionId,
    ) ?? eglResolutionRecords[0];

  function clearFilters() {
    setSearchValue("");
    setStatusFilter("All Statuses");
    setOwnerFilter("All Owners");
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
              Controlled frontend registry for enterprise resolutions,
              governance approvals, original executed records, certified-copy
              references, and related publication authority.
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
              Resolutions Data Layer
            </p>
          </div>
        </div>
      </section>

      <Link href="/governance-library" className="service-button">
        <ArrowLeft size={16} className="text-[#ff8a00]" />
        Back to EGL Dashboard
      </Link>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled Governance Records
      </p>

      <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_220px_140px]">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Search Resolutions
            </p>
            <div className="flex h-12 items-center gap-3 rounded-lg border border-[#c8d3df] bg-white px-4">
              <Search className="h-4 w-4 text-[#94a3b8]" />
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search by resolution ID, title, owner, authority, related publication, or status..."
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
              Owner
            </p>
            <select
              value={ownerFilter}
              onChange={(event) => setOwnerFilter(event.target.value)}
              className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]"
            >
              {ownerFilters.map((owner) => (
                <option key={owner}>{owner}</option>
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
                Resolutions Registry
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#33445c]">
                Select a resolution to preview authority, lifecycle, related
                publications, and governance metadata.
              </p>
            </div>

            <span className="rounded-full bg-[#fff0bd] px-5 py-3 text-sm font-black text-[#b45309]">
              {filteredRecords.length} shown
            </span>
          </div>

          <div className="overflow-x-auto p-5">
            <div className="min-w-[1060px]">
              <div className="grid grid-cols-[190px_minmax(360px,1.7fr)_190px_110px_120px_170px_110px] bg-[#f8fafc]">
                {[
                  "Resolution ID",
                  "Title",
                  "Type",
                  "Status",
                  "Owner",
                  "Related Publication",
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
                  <ResolutionRow
                    key={record.resolutionId}
                    record={record}
                    selected={selectedRecord?.resolutionId === record.resolutionId}
                    onSelect={() => setSelectedResolutionId(record.resolutionId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          {selectedRecord ? (
            <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                    Selected Resolution
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-[#050816]">
                    {selectedRecord.resolutionId}
                  </h2>
                  <p className="mt-2 text-sm font-black text-[#050816]">
                    {selectedRecord.title}
                  </p>
                </div>

                <span
                  className={[
                    "rounded-lg px-3 py-2 text-xs font-black",
                    getStatusClass(selectedRecord.status),
                  ].join(" ")}
                >
                  {selectedRecord.status}
                </span>
              </div>

              <div className="rounded-lg bg-[#050816] p-5 text-white">
                <div className="flex items-center gap-3">
                  <Gavel className="h-7 w-7 text-[#ffbf00]" />
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white">
                      Controlled Resolution
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      {selectedRecord.classification}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <DetailRow label="Type" value={selectedRecord.resolutionType} />
                <DetailRow label="Owner" value={selectedRecord.owner} />
                <DetailRow label="Authority" value={selectedRecord.authority} />
                <DetailRow
                  label="Status"
                  value={`${selectedRecord.status} — ${selectedRecord.statusLabel}`}
                />
                <DetailRow label="Version" value={selectedRecord.version} />
                <DetailRow label="Effective Date" value={selectedRecord.effectiveDate} />
                <DetailRow label="Related Publication" value={selectedRecord.relatedPublication} />
                <DetailRow label="Retention" value={selectedRecord.retentionCategory} />
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href={`/governance-library/resolutions/${selectedRecord.resolutionId}`}
                  className="service-button-primary w-full justify-center"
                >
                  <Eye className="h-4 w-4 text-[#ffbf00]" />
                  Open Resolution Record
                </Link>

                <Link
                  href={`/governance-library/publications/${selectedRecord.relatedPublication}`}
                  className="service-button w-full justify-center"
                >
                  <BookOpen className="h-4 w-4 text-[#ff8a00]" />
                  Open Related Publication
                </Link>
              </div>
            </section>
          ) : null}

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-xl font-black uppercase tracking-[0.25em] text-[#050816]">
                  Backend Readiness
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#33445c]">
                  This registry is frontend-only. Future work should connect
                  resolutions to executed files, corporate recordbooks,
                  approval workflows, officer records, board actions, certified
                  copies, and audit history.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                  Training Note
                </p>
                <p className="mt-4 text-sm leading-7 text-[#33445c]">
                  Resolutions should be treated as formal governance evidence.
                  This page keeps resolution ID, owner, authority, status,
                  related publication, and retention clearly separated.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}