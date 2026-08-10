"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  FolderOpen,
  History,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

type CertifiedCopyRecord = {
  id: string;
  title: string;
  sourceRecordId: string;
  sourceRecordTitle: string;
  sourceType: "Publication" | "Resolution";
  sourceHref: string;
  sourceViewerHref: string;
  status: "CC" | "Pending";
  owner: string;
  authority: string;
  classification: string;
  version: string;
  issueDate: string;
  sourceLocation: string;
  retention: string;
  certificationUse: string;
};

const certifiedCopyRecords: CertifiedCopyRecord[] = [
  {
    id: "CC-HI-ADM-001",
    title: "Certified Copy - HI-ADM-001",
    sourceRecordId: "HI-ADM-001",
    sourceRecordTitle:
      "Enterprise Administration & Enterprise Services Manual",
    sourceType: "Publication",
    sourceHref: "/governance-library/publications/HI-ADM-001",
    sourceViewerHref:
      "/governance-library/publications/HI-ADM-001/viewer",
    status: "CC",
    owner: "HCA",
    authority: "Hassan Capital Partners, LLC",
    classification: "Internal Governance",
    version: "1.0",
    issueDate: "2026-06-18",
    sourceLocation: "HCA Vault / Originals",
    retention: "Permanent",
    certificationUse:
      "Controlled copy available for administrative reference, governance evidence, and training use.",
  },
  {
    id: "CC-HI-ADM-002",
    title: "Certified Copy - HI-ADM-002",
    sourceRecordId: "HI-ADM-002",
    sourceRecordTitle: "Enterprise Document Control Standard",
    sourceType: "Publication",
    sourceHref: "/governance-library/publications/HI-ADM-002",
    sourceViewerHref:
      "/governance-library/publications/HI-ADM-002/viewer",
    status: "CC",
    owner: "HCA",
    authority: "Hassan Corporate Agents",
    classification: "Internal Governance",
    version: "1.0",
    issueDate: "2026-06-18",
    sourceLocation: "HCA Vault / Originals",
    retention: "Permanent",
    certificationUse:
      "Certified reference copy for document numbering, classification, revision control, and records governance.",
  },
  {
    id: "CC-HCP-RES-2026-001",
    title: "Certified Copy - Foundational Treasury Resolution",
    sourceRecordId: "HCP-RES-2026-001",
    sourceRecordTitle: "Foundational Treasury Resolution",
    sourceType: "Resolution",
    sourceHref:
      "/governance-library/resolutions/HCP-RES-2026-001",
    sourceViewerHref:
      "/governance-library/resolutions/HCP-RES-2026-001",
    status: "CC",
    owner: "HCP",
    authority: "Hassan Capital Partners, LLC",
    classification: "Internal Governance",
    version: "1.0",
    issueDate: "2026-06-20",
    sourceLocation: "HCA Vault / Originals",
    retention: "Permanent",
    certificationUse:
      "Certified governance copy evidencing adoption of foundational treasury authority and control structure.",
  },
  {
    id: "CC-HI-TRE-001",
    title: "Certified Copy - HI-TRE-001",
    sourceRecordId: "HI-TRE-001",
    sourceRecordTitle: "Enterprise Treasury Manual",
    sourceType: "Publication",
    sourceHref: "/governance-library/publications/HI-TRE-001",
    sourceViewerHref:
      "/governance-library/publications/HI-TRE-001/viewer",
    status: "Pending",
    owner: "HCA",
    authority: "Hassan Capital Partners, LLC",
    classification: "Confidential",
    version: "1.0",
    issueDate: "Pending",
    sourceLocation: "HCA Vault / Originals",
    retention: "Permanent",
    certificationUse:
      "Pending certified-copy issuance for treasury operations reference and governance review.",
  },
];

export default function CertifiedCopiesRegistryPage() {
  const [selectedCopy, setSelectedCopy] =
    useState<CertifiedCopyRecord | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const certifiedCount = useMemo(
    () =>
      certifiedCopyRecords.filter((record) => record.status === "CC")
        .length,
    [],
  );

  const pendingCount = useMemo(
    () =>
      certifiedCopyRecords.filter(
        (record) => record.status === "Pending",
      ).length,
    [],
  );

  function handleCopyId(record: CertifiedCopyRecord) {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard
    ) {
      void navigator.clipboard.writeText(record.id);
    }

    setCopiedId(record.id);
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.55em] text-amber-400">
                    Hassan Industries
                  </p>

                  <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.04em] text-white">
                    Certified Copies Registry
                  </h1>

                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-100">
                    Controlled frontend registry for certified
                    copies of enterprise publications, executed
                    records, resolutions, official governance
                    documents, and future certification issuance
                    records.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-white/5 px-8 py-5 text-center">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-slate-200">
                    Registry Status
                  </p>

                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Frontend List
                  </p>

                  <p className="mt-1 text-xs text-slate-200">
                    Certified Copy Data Layer
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/governance-library"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Back to EGL Dashboard
              </Link>

              <p className="text-[12px] font-extrabold uppercase tracking-[0.42em] text-slate-400">
                Controlled Certified Copies
              </p>
            </div>

            <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Certified Copy Records"
                value={String(certifiedCopyRecords.length)}
                icon={
                  <FileCheck2 className="h-6 w-6 text-amber-500" />
                }
              />

              <MetricCard
                label="Certified Copies"
                value={String(certifiedCount)}
                icon={
                  <CheckCircle2 className="h-6 w-6 text-amber-500" />
                }
              />

              <MetricCard
                label="Pending Certification"
                value={String(pendingCount)}
                icon={
                  <RefreshCcw className="h-6 w-6 text-amber-500" />
                }
              />

              <MetricCard
                label="Permanent Retention"
                value={String(certifiedCopyRecords.length)}
                icon={
                  <BookOpen className="h-6 w-6 text-amber-500" />
                }
              />
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-slate-400">
                      Enterprise Governance Library
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Certified Copies Registry
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      Select a certified copy record to preview
                      source authority, lifecycle status, source
                      location, and future issuance controls.
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 md:justify-end">
                    <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-700">
                      {certifiedCopyRecords.length} shown
                    </span>

                    <Link
                      href="/governance-library/certified-copies/new"
                      className="hieos-dark-button inline-flex items-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-xs font-bold"
                    >
                      <FileCheck2 className="h-4 w-4" />
                      <span>Create Certified Copy</span>
                    </Link>
                  </div>
                </div>

                <div className="max-w-full overflow-x-auto p-5">
                  <table className="min-w-[820px] w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-500">
                        <th className="px-4 py-4">
                          Copy ID
                        </th>
                        <th className="px-4 py-4">
                          Source Record
                        </th>
                        <th className="px-4 py-4">
                          Source Type
                        </th>
                        <th className="px-4 py-4">
                          Status
                        </th>
                        <th className="px-4 py-4">
                          Owner
                        </th>
                        <th className="px-4 py-4">
                          Issue Date
                        </th>
                        <th className="px-4 py-4">
                          Retention
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {certifiedCopyRecords.map((record) => {
                        const selected =
                          selectedCopy?.id === record.id;

                        return (
                          <tr
                            key={record.id}
                            onClick={() =>
                              setSelectedCopy(record)
                            }
                            className={[
                              "cursor-pointer border-b border-slate-200 transition",
                              selected
                                ? "bg-amber-50"
                                : "bg-white hover:bg-slate-50",
                            ].join(" ")}
                          >
                            <td className="px-4 py-5 font-black">
                              {record.id}
                            </td>

                            <td className="px-4 py-5">
                              <p className="font-black">
                                {record.sourceRecordId}
                              </p>

                              <p className="mt-2 max-w-[300px] text-sm leading-5 text-slate-600">
                                {record.sourceRecordTitle}
                              </p>
                            </td>

                            <td className="px-4 py-5 font-bold">
                              {record.sourceType}
                            </td>

                            <td className="px-4 py-5">
                              <StatusBadge
                                status={record.status}
                              />
                            </td>

                            <td className="px-4 py-5 font-bold">
                              {record.owner}
                            </td>

                            <td className="px-4 py-5 font-bold">
                              {record.issueDate}
                            </td>

                            <td className="px-4 py-5 font-bold">
                              {record.retention}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {selectedCopy ? (
                <SelectedCopyPanel
                  record={selectedCopy}
                  copiedId={copiedId}
                  onCopyId={() =>
                    handleCopyId(selectedCopy)
                  }
                />
              ) : (
                <EmptySelectionPanel />
              )}
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                    <ShieldCheck className="h-6 w-6 text-amber-400" />
                  </div>

                  <div>
                    <h2 className="text-lg font-black uppercase tracking-[0.28em]">
                      Backend Readiness
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      This certified copies registry is
                      frontend-only. Later EGL releases should
                      connect it to document storage,
                      certification logs, generated
                      certified-copy packets, source file
                      verification, issuing authority,
                      employee/executive access controls, and
                      permanent recordkeeping.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black uppercase tracking-[0.28em]">
                  Training Note
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Employees and executives should treat
                  certified copies as controlled evidence
                  copies. Future backend work should connect
                  this registry to original executed locations,
                  certification authority, issue logs, download
                  controls, and audit history.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex min-h-[88px] items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div>
        <p className="text-[12px] text-slate-500">
          {label}
        </p>

        <p className="mt-2 text-3xl font-black leading-none text-slate-950">
          {value}
        </p>
      </div>

      {icon}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: CertifiedCopyRecord["status"];
}) {
  const approved = status === "CC";

  return (
    <span
      className={[
        "inline-flex rounded-md px-3 py-1 text-xs font-black",
        approved
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function EmptySelectionPanel() {
  return (
    <aside className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-slate-400">
            Registry Preview
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            No Certified Copy Selected
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Select a certified copy record to open source
            authority, certification metadata, lifecycle
            status, and available certified-copy actions.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <FileCheck2 className="h-6 w-6 text-amber-400" />
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-slate-950 p-5 text-white">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-white">
          Certified Copy Workspace
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-200">
          Certified-copy controls open only after intentional
          certified-copy record selection.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <InstructionCard
          icon={
            <FolderOpen className="h-4 w-4 text-amber-600" />
          }
          title="Select a Certified Copy"
          body="Choose a certified-copy record from the registry table."
        />

        <InstructionCard
          icon={
            <ShieldCheck className="h-4 w-4 text-amber-600" />
          }
          title="Review Authority"
          body="Verify source record, authority, classification, and issue status."
        />

        <InstructionCard
          icon={
            <History className="h-4 w-4 text-amber-600" />
          }
          title="Use Certification Controls"
          body="Open the source record, view source file, copy certified-copy ID, or review certification history."
        />
      </div>
    </aside>
  );
}

function SelectedCopyPanel({
  record,
  copiedId,
  onCopyId,
}: {
  record: CertifiedCopyRecord;
  copiedId: string | null;
  onCopyId: () => void;
}) {
  return (
    <aside className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-slate-400">
            Selected Certified Copy
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {record.id}
          </h2>

          <p className="mt-2 text-sm font-black">
            {record.title}
          </p>
        </div>

        <StatusBadge status={record.status} />
      </div>

      <div className="mt-5 rounded-lg bg-slate-950 p-5 text-white">
        <div className="flex items-center gap-3">
          <FileCheck2 className="h-7 w-7 text-amber-400" />

          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-white">
              Controlled Certified Copy
            </p>

            <p className="mt-1 text-xs text-slate-200">
              {record.classification}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-1">
        <DetailRow
          label="Source Record"
          value={record.sourceRecordId}
        />

        <DetailRow
          label="Source Type"
          value={record.sourceType}
        />

        <DetailRow
          label="Owner"
          value={record.owner}
        />

        <DetailRow
          label="Authority"
          value={record.authority}
        />

        <DetailRow
          label="Version"
          value={record.version}
        />

        <DetailRow
          label="Issue Date"
          value={record.issueDate}
        />

        <DetailRow
          label="Source Location"
          value={record.sourceLocation}
        />

        <DetailRow
          label="Retention"
          value={record.retention}
        />
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-400">
          Certification Use
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-700">
          {record.certificationUse}
        </p>
      </div>

      <div className="mt-5 space-y-2">
        <Link
          href={record.sourceHref}
          target="_blank"
          rel="noreferrer"
          className="hieos-dark-button flex w-full items-center justify-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-xs font-bold"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Open Source Record</span>
        </Link>

        <Link
          href={record.sourceViewerHref}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <FileText className="h-4 w-4 text-amber-600" />
          View Source File
        </Link>

        <button
          type="button"
          onClick={onCopyId}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <Copy className="h-4 w-4 text-amber-600" />
          {copiedId === record.id
            ? "Certified Copy ID Copied"
            : "Copy Certified Copy ID"}
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <Download className="h-4 w-4 text-amber-600" />
          Download Copy
        </button>

        <Link
          href={`/governance-library/certified-copies/history?copyId=${encodeURIComponent(
            record.id,
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <History className="h-4 w-4 text-amber-600" />
          View Certification History
        </Link>
      </div>
    </aside>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-2 text-sm">
      <span className="font-bold text-slate-500">
        {label}
      </span>

      <span className="max-w-[210px] break-words text-right font-black text-slate-950">
        {value}
      </span>
    </div>
  );
}

function InstructionCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white">
        {icon}
      </div>

      <div>
        <p className="text-sm font-black">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          {body}
        </p>
      </div>
    </div>
  );
}