"use client";

import Link from "next/link";
import { useState } from "react";
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
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

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
    title: "Certified Copy — HI-ADM-001",
    sourceRecordId: "HI-ADM-001",
    sourceRecordTitle: "Enterprise Administration & Enterprise Services Manual",
    sourceType: "Publication",
    sourceHref: "/governance-library/publications/HI-ADM-001",
    sourceViewerHref: "/governance-library/publications/HI-ADM-001/viewer",
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
    title: "Certified Copy — HI-ADM-002",
    sourceRecordId: "HI-ADM-002",
    sourceRecordTitle: "Enterprise Document Control Standard",
    sourceType: "Publication",
    sourceHref: "/governance-library/publications/HI-ADM-002",
    sourceViewerHref: "/governance-library/publications/HI-ADM-002/viewer",
    status: "CC",
    owner: "HCA",
    authority: "Hassan Capital Partners, LLC",
    classification: "Internal Governance",
    version: "1.0",
    issueDate: "2026-06-18",
    sourceLocation: "HCA Vault / Originals",
    retention: "Permanent",
    certificationUse:
      "Controlled copy available for document-control verification and enterprise records training.",
  },
  {
    id: "CC-HCP-RES-2026-001",
    title: "Certified Copy — Foundational Treasury Resolution",
    sourceRecordId: "HCP-RES-2026-001",
    sourceRecordTitle: "Foundational Treasury Resolution",
    sourceType: "Resolution",
    sourceHref: "/governance-library/resolutions/HCP-RES-2026-001",
    sourceViewerHref: "/governance-library/resolutions/HCP-RES-2026-001",
    status: "CC",
    owner: "HCP",
    authority: "Hassan Capital Partners, LLC",
    classification: "Internal Governance",
    version: "1.0",
    issueDate: "2026-06-20",
    sourceLocation: "HCA Vault / Originals",
    retention: "Permanent",
    certificationUse:
      "Controlled copy available for governance evidence and treasury authority reference.",
  },
  {
    id: "CC-HI-TRE-001",
    title: "Certified Copy — HI-TRE-001",
    sourceRecordId: "HI-TRE-001",
    sourceRecordTitle: "Enterprise Treasury Manual",
    sourceType: "Publication",
    sourceHref: "/governance-library/publications/HI-TRE-001",
    sourceViewerHref: "/governance-library/publications/HI-TRE-001/viewer",
    status: "Pending",
    owner: "HCA",
    authority: "Hassan Capital Partners, LLC",
    classification: "Confidential",
    version: "1.0",
    issueDate: "Pending",
    sourceLocation: "HCA Vault / Originals",
    retention: "Permanent",
    certificationUse:
      "Certified copy request pending future backend certification workflow.",
  },
];

export default function CertifiedCopiesRegistryPage() {
  const [selectedCopy, setSelectedCopy] =
    useState<CertifiedCopyRecord | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const certifiedCount = certifiedCopyRecords.filter(
    (record) => record.status === "CC",
  ).length;

  const pendingCount = certifiedCopyRecords.filter(
    (record) => record.status === "Pending",
  ).length;

  async function copyCertifiedCopyId(copyId: string) {
    await navigator.clipboard.writeText(copyId);
    setCopiedId(copyId);

    window.setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.48em] text-amber-400">
                    Hassan Industries
                  </p>

                  <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">
                    Certified Copies Registry
                  </h1>

                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-200">
                    Controlled frontend registry for certified copies of
                    enterprise publications, executed records, resolutions,
                    official governance documents, and future certification
                    issuance records.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.42em] text-slate-200">
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
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Back to EGL Dashboard
              </Link>

              <p className="text-[12px] font-bold uppercase tracking-[0.34em] text-slate-400">
                Controlled Certified Copies
              </p>
            </div>

            <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <RegistryStat
                label="Certified Copy Records"
                value={String(certifiedCopyRecords.length)}
                icon={FileCheck2}
              />

              <RegistryStat
                label="Certified Copies"
                value={String(certifiedCount)}
                icon={CheckCircle2}
              />

              <RegistryStat
                label="Pending Certification"
                value={String(pendingCount)}
                icon={RefreshCw}
              />

              <RegistryStat
                label="Permanent Retention"
                value="4"
                icon={BookOpen}
              />
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_430px]">
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-slate-400">
                      Enterprise Governance Library
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Certified Copies Registry
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                      Select a certified copy record to preview source
                      authority, lifecycle status, source location, and future
                      issuance controls.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-700">
                      {certifiedCopyRecords.length} shown
                    </span>

                    <Link
                      href="/governance-library/certified-copies/new"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      <FileCheck2 className="h-4 w-4 text-amber-400" />
                      Create Certified Copy
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto p-5">
                  <table className="min-w-[980px] w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-black uppercase tracking-[0.32em] text-slate-500">
                        <th className="px-4 py-4">Copy ID</th>
                        <th className="px-4 py-4">Source Record</th>
                        <th className="px-4 py-4">Source Type</th>
                        <th className="px-4 py-4">Status</th>
                        <th className="px-4 py-4">Owner</th>
                        <th className="px-4 py-4">Issue Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {certifiedCopyRecords.map((record) => {
                        const isSelected = selectedCopy?.id === record.id;

                        return (
                          <tr
                            key={record.id}
                            onClick={() => setSelectedCopy(record)}
                            className={[
                              "cursor-pointer border-b border-slate-200 transition hover:bg-amber-50",
                              isSelected ? "bg-amber-50" : "bg-white",
                            ].join(" ")}
                          >
                            <td className="px-4 py-5 align-top font-black">
                              {record.id}
                            </td>

                            <td className="px-4 py-5 align-top">
                              <p className="font-black">
                                {record.sourceRecordId}
                              </p>

                              <p className="mt-2 max-w-[320px] text-sm leading-5 text-slate-600">
                                {record.sourceRecordTitle}
                              </p>
                            </td>

                            <td className="px-4 py-5 align-top font-bold">
                              {record.sourceType}
                            </td>

                            <td className="px-4 py-5 align-top">
                              <StatusBadge status={record.status} />
                            </td>

                            <td className="px-4 py-5 align-top font-bold">
                              {record.owner}
                            </td>

                            <td className="px-4 py-5 align-top font-bold">
                              {record.issueDate}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className="space-y-4">
                {selectedCopy ? (
                  <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-slate-400">
                          Selected Certified Copy
                        </p>

                        <h2 className="mt-3 text-2xl font-black text-slate-950">
                          {selectedCopy.id}
                        </h2>

                        <p className="mt-2 text-sm font-bold text-slate-950">
                          {selectedCopy.title}
                        </p>
                      </div>

                      <StatusBadge status={selectedCopy.status} />
                    </div>

                    <div className="rounded-lg bg-slate-950 p-4 text-white">
                      <div className="flex items-center gap-3">
                        <FileCheck2 className="h-7 w-7 text-amber-400" />

                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-white">
                            Controlled Certified Copy
                          </p>

                          <p className="text-xs text-slate-200">
                            {selectedCopy.classification}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-sm">
                      <MetadataRow
                        label="Source Record"
                        value={selectedCopy.sourceRecordId}
                      />
                      <MetadataRow
                        label="Source Type"
                        value={selectedCopy.sourceType}
                      />
                      <MetadataRow label="Owner" value={selectedCopy.owner} />
                      <MetadataRow
                        label="Authority"
                        value={selectedCopy.authority}
                      />
                      <MetadataRow
                        label="Version"
                        value={selectedCopy.version}
                      />
                      <MetadataRow
                        label="Issue Date"
                        value={selectedCopy.issueDate}
                      />
                      <MetadataRow
                        label="Source Location"
                        value={selectedCopy.sourceLocation}
                      />
                      <MetadataRow
                        label="Retention"
                        value={selectedCopy.retention}
                      />
                    </div>

                    <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-slate-500">
                        Certification Use
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {selectedCopy.certificationUse}
                      </p>
                    </div>

                    <div className="mt-5 space-y-2">
                      <Link
                        href={selectedCopy.sourceHref}
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open Source Record
                      </Link>

                      <Link
                        href={selectedCopy.sourceViewerHref}
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                      >
                        <FileText className="h-4 w-4 text-amber-600" />
                        View Source File
                      </Link>

                      <button
                        type="button"
                        onClick={() => copyCertifiedCopyId(selectedCopy.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                      >
                        <Copy className="h-4 w-4 text-amber-600" />
                        {copiedId === selectedCopy.id
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
                        href="/governance-library/certified-copies/history"
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                      >
                        <History className="h-4 w-4 text-amber-600" />
                        View Certification History
                      </Link>
                    </div>
                  </section>
                ) : (
                  <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-slate-400">
                          Registry Preview
                        </p>

                        <h2 className="mt-3 text-2xl font-black text-slate-950">
                          No Certified Copy Selected
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          Select a certified copy record to open source
                          authority, certification metadata, lifecycle status,
                          and available certified-copy actions.
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-950 p-3">
                        <FileCheck2 className="h-6 w-6 text-amber-400" />
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg bg-slate-950 p-4 text-white">
                      <p className="text-[11px] font-black uppercase tracking-[0.34em]">
                        Certified Copy Workspace
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-200">
                        Certified-copy controls open only after intentional
                        certified-copy record selection.
                      </p>
                    </div>

                    <div className="mt-5 space-y-3">
                      <PreviewInstruction
                        icon={FolderOpen}
                        title="Select a Certified Copy"
                        text="Choose a certified-copy record from the registry table."
                      />

                      <PreviewInstruction
                        icon={ShieldCheck}
                        title="Review Authority"
                        text="Verify source record, authority, classification, and issue status."
                      />

                      <PreviewInstruction
                        icon={History}
                        title="Use Certification Controls"
                        text="Open the source record, view source file, copy certified-copy ID, or review certification history."
                      />
                    </div>
                  </section>
                )}

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5">
                  <p className="text-[15px] font-black uppercase tracking-[0.28em] text-slate-950">
                    Training Note
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Employees and executives should treat certified copies as
                    controlled evidence copies. Future backend work should
                    connect this registry to original executed locations,
                    certification authority, issue logs, download controls, and
                    audit history.
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

function RegistryStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof FileCheck2;
}) {
  return (
    <div className="flex min-h-[90px] items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div>
        <p className="text-[12px] text-slate-500">{label}</p>

        <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
      </div>

      <Icon className="h-6 w-6 text-amber-500" />
    </div>
  );
}

function StatusBadge({ status }: { status: "CC" | "Pending" }) {
  if (status === "CC") {
    return (
      <span className="rounded-md bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
        CC
      </span>
    );
  }

  return (
    <span className="rounded-md bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">
      Pending
    </span>
  );
}

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
      <span className="font-bold text-slate-500">{label}</span>
      <span className="text-right font-black text-slate-950">{value}</span>
    </div>
  );
}

function PreviewInstruction({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof FolderOpen;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="rounded-lg border border-slate-200 bg-white p-2">
        <Icon className="h-5 w-5 text-amber-600" />
      </div>

      <div>
        <p className="text-sm font-black text-slate-950">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-600">{text}</p>
      </div>
    </div>
  );
}