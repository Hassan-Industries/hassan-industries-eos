"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  FileText,
  FolderOpen,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";

type RegistryType = "forms" | "templates";

type RegistryRecord = {
  id: string;
  title: string;
  type: string;
  series: string;
  status: string;
  owner: string;
  authority: string;
  version: string;
  reviewDate: string;
  linkedPublication: string;
  retention: string;
  description: string;
};

const templateRecords: RegistryRecord[] = [
  {
    id: "HI-TPL-001",
    title: "Enterprise Policy Template",
    type: "Template",
    series: "Administration",
    status: "DR",
    owner: "HCA",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    linkedPublication: "HI-ADM-002",
    retention: "Permanent",
    description:
      "Standard controlled template for enterprise policies, standards, procedures, and administrative directives.",
  },
  {
    id: "HI-TPL-002",
    title: "Resolution Template",
    type: "Template",
    series: "Resolutions",
    status: "DR",
    owner: "Enterprise Governance",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    linkedPublication: "HI-GOV-001",
    retention: "Permanent",
    description:
      "Standard controlled template for foundational resolutions, governance approvals, officer actions, and formal decisions.",
  },
  {
    id: "HI-TPL-003",
    title: "Certified Copy Template",
    type: "Template",
    series: "Corporate Records",
    status: "DR",
    owner: "Corporate Records",
    authority: "HCA",
    version: "0.1",
    reviewDate: "Pending",
    linkedPublication: "HI-ADM-001",
    retention: "Permanent",
    description:
      "Template shell for certified copy statements, record certification packages, and evidence packets.",
  },
  {
    id: "HI-TPL-004",
    title: "Executive Briefing Template",
    type: "Template",
    series: "Executive Operations",
    status: "DR",
    owner: "Executive Operations",
    authority: "HCP",
    version: "0.1",
    reviewDate: "Pending",
    linkedPublication: "HI-GOV-001",
    retention: "Operational",
    description:
      "Executive briefing format for decision packets, leadership notes, approvals, and operating reviews.",
  },
  {
    id: "HI-TPL-005",
    title: "Treasury Memo Template",
    type: "Template",
    series: "Treasury",
    status: "DR",
    owner: "Treasury",
    authority: "HCP",
    version: "0.1",
    reviewDate: "Pending",
    linkedPublication: "HI-TRE-001",
    retention: "Permanent",
    description:
      "Controlled memo format for treasury requests, banking authority, payment control notes, and financial governance references.",
  },
];

const formRecords: RegistryRecord[] = [
  {
    id: "HI-FRM-001",
    title: "Service Request Intake Form",
    type: "Form",
    series: "Administration",
    status: "DR",
    owner: "Administration",
    authority: "HCA",
    version: "0.1",
    reviewDate: "Pending",
    linkedPublication: "HI-ADM-001",
    retention: "Operational",
    description:
      "Controlled intake form for administrative requests, routing preparation, department ownership, and service desk review.",
  },
  {
    id: "HI-FRM-002",
    title: "Certified Copy Request Form",
    type: "Form",
    series: "Corporate Records",
    status: "DR",
    owner: "Corporate Records",
    authority: "HCA",
    version: "0.1",
    reviewDate: "Pending",
    linkedPublication: "HI-ADM-001",
    retention: "Permanent",
    description:
      "Controlled request form for certified copy preparation, source record confirmation, and issuance routing.",
  },
  {
    id: "HI-FRM-003",
    title: "Treasury Review Request Form",
    type: "Form",
    series: "Treasury",
    status: "DR",
    owner: "Treasury",
    authority: "HCP",
    version: "0.1",
    reviewDate: "Pending",
    linkedPublication: "HI-TRE-001",
    retention: "Permanent",
    description:
      "Controlled form for treasury document review, financial authority confirmation, and payment control routing.",
  },
];

function getStatusClass(status: string) {
  if (status === "AP") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "OE") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-emerald-100 text-emerald-700";
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#d8e1ea] py-3 text-sm last:border-b-0">
      <span className="font-bold text-[#64748b]">{label}</span>
      <span className="text-right font-black text-[#050816]">{value}</span>
    </div>
  );
}

export default function EGLFormsTemplatesRegistryShell({
  registryType,
}: {
  registryType: RegistryType;
}) {
  const records = registryType === "forms" ? formRecords : templateRecords;
  const [selectedId, setSelectedId] = useState(records[0]?.id ?? "");

  const selectedRecord = useMemo(
    () => records.find((record) => record.id === selectedId) ?? records[0],
    [records, selectedId],
  );

  const label = registryType === "forms" ? "Forms" : "Templates";
  const title = `${label} Registry`;
  const subtitle =
    registryType === "forms"
      ? "Controlled frontend registry for Enterprise Governance Library forms, intake forms, review forms, filing forms, and administrative workflow forms."
      : "Controlled frontend registry for Enterprise Governance Library templates, manual templates, policy templates, resolution templates, certified-copy templates, and executive briefing formats.";

  return (
    <div className="mx-auto max-w-[1680px] space-y-6">
      <section className="rounded-xl bg-[#050816] p-6 text-white shadow-sm lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#ffbf00]">
              Hassan Industries
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-tight lg:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
              {subtitle}
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

      <div className="flex flex-wrap gap-3">
        <Link href="/governance-library" className="service-button">
          <FolderOpen size={16} className="text-[#ff8a00]" />
          Back to EGL Dashboard
        </Link>

        <Link
          href="/governance-library/publications/new"
          className="service-button-primary"
        >
          <Plus size={16} className="text-[#ffbf00]" />
          Prepare New {registryType === "forms" ? "Form" : "Template"}
        </Link>
      </div>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled {label}
      </p>

      <div className="grid gap-4 lg:grid-cols-4">
        <StatCard label="Registry Records" value={records.length.toString()} />
        <StatCard label="Draft Records" value={records.length.toString()} />
        <StatCard label="Governance Controlled" value="100%" />
        <StatCard label="Permanent Retention" value="Controlled" />
      </div>

      <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px_140px]">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Search {label}
            </p>
            <div className="flex h-12 items-center gap-3 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-semibold text-[#7d8999]">
              <Search className="h-4 w-4 text-[#94a3b8]" />
              Search by ID, title, owner, series, usage, publication, or status...
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Status
            </p>
            <select className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]">
              <option>All Statuses</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Series
            </p>
            <select className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]">
              <option>All Series</option>
            </select>
          </div>

          <div className="flex items-end">
            <button type="button" className="service-button h-12 w-full">
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
                {title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#33445c]">
                Select a record to preview authority, usage, linked
                publication, retention, and future generation controls.
              </p>
            </div>

            <span className="rounded-full bg-[#fff0bd] px-5 py-3 text-sm font-black text-[#b45309]">
              {records.length} shown
            </span>
          </div>

          <div className="overflow-x-auto p-5">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[130px_minmax(260px,1.5fr)_130px_150px_110px_170px_170px_110px] bg-[#f8fafc]">
                {[
                  "Record ID",
                  "Title",
                  "Type",
                  "Series",
                  "Status",
                  "Owner",
                  "Linked Publication",
                  "Select",
                ].map((heading) => (
                  <div
                    key={heading}
                    className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#48617e]"
                  >
                    {heading}
                  </div>
                ))}
              </div>

              <div>
                {records.map((record) => {
                  const selected = selectedRecord?.id === record.id;

                  return (
                    <button
                      key={record.id}
                      type="button"
                      onClick={() => setSelectedId(record.id)}
                      className={[
                        "grid min-w-[980px] grid-cols-[130px_minmax(260px,1.5fr)_130px_150px_110px_170px_170px_110px] border-b border-[#d8e1ea] text-left transition last:border-b-0",
                        selected ? "bg-[#fffaf0]" : "bg-white hover:bg-[#f8fafc]",
                      ].join(" ")}
                    >
                      <div className="px-4 py-5 text-sm font-black text-[#050816]">
                        {record.id}
                      </div>

                      <div className="px-4 py-5">
                        <p className="text-sm font-black text-[#050816]">
                          {record.title}
                        </p>
                        <p className="mt-2 max-w-[300px] text-xs font-semibold leading-6 text-[#48617e]">
                          {record.description}
                        </p>
                      </div>

                      <div className="px-4 py-5 text-sm font-bold text-[#24364d]">
                        {record.type}
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
                        {record.owner}
                      </div>

                      <div className="px-4 py-5 text-sm font-black text-[#050816]">
                        {record.linkedPublication}
                      </div>

                      <div className="px-4 py-5 text-sm font-black text-blue-700">
                        View
                      </div>
                    </button>
                  );
                })}
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
                    Selected {registryType === "forms" ? "Form" : "Template"}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-[#050816]">
                    {selectedRecord.id}
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
                  <BookOpen className="h-6 w-6 text-[#ffbf00]" />
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white">
                      Controlled {registryType === "forms" ? "Form" : "Template"} Workspace
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      Internal Governance
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <DetailRow label="Registry Type" value={selectedRecord.type} />
                <DetailRow label="Series" value={selectedRecord.series} />
                <DetailRow label="Owner" value={selectedRecord.owner} />
                <DetailRow label="Authority" value={selectedRecord.authority} />
                <DetailRow label="Version" value={selectedRecord.version} />
                <DetailRow label="Review Date" value={selectedRecord.reviewDate} />
                <DetailRow
                  label="Linked Publication"
                  value={selectedRecord.linkedPublication}
                />
                <DetailRow label="Retention" value={selectedRecord.retention} />
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href={`/governance-library/publications/${selectedRecord.linkedPublication}`}
                  className="service-button-primary w-full justify-center"
                >
                  <BookOpen className="h-4 w-4 text-[#ffbf00]" />
                  Open Linked Publication
                </Link>

                <Link
                  href="/service-requests/new?queue=governance-library-intake"
                  className="service-button w-full justify-center"
                >
                  <ClipboardList className="h-4 w-4 text-[#ff8a00]" />
                  Request Review
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
                  forms and templates to controlled generation, approvals,
                  ownership rules, document-control numbering, and permanent
                  recordkeeping.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#48617e]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[#050816]">{value}</p>
        </div>
        <FileText className="h-6 w-6 text-[#ff8a00]" />
      </div>
    </section>
  );
}