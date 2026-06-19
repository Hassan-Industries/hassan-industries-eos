import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  FileText,
  History,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import EGLRecordActionControls from "@/components/governance-library/EGLRecordActionControls";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import type { PublicationRecord } from "@/data/governanceLibrary";

interface EGLRecordDetailShellProps {
  publication: PublicationRecord;
}

type DisplayPublicationRecord = PublicationRecord & {
  id?: string;
  documentId?: string;
  documentNo?: string;
  documentNumber?: string;
  title?: string;
  series?: string;
  publicationSeries?: string;
  documentType?: string;
  owner?: string;
  authority?: string;
  version?: string;
  status?: string;
  documentState?: string;
  effectiveDate?: string;
  reviewDate?: string;
  originalExecutedLocation?: string;
  certifiedCopy?: string;
  supersedes?: string;
  supersededBy?: string;
  relatedResolution?: string;
  relatedImplementationProject?: string;
  classification?: string;
  retentionCategory?: string;
  notes?: string;
};

export default function EGLRecordDetailShell({
  publication,
}: EGLRecordDetailShellProps) {
  const record = publication as DisplayPublicationRecord;

  const documentNumber = getDocumentNumber(record);
  const title = record.title ?? "Untitled Publication";
  const status = record.status ?? "AP";
  const documentState = record.documentState ?? "Active";
  const viewerHref = `/governance-library/publications/${encodeURIComponent(
    documentNumber,
  )}/viewer`;

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
                    EGL Record Detail
                  </h1>

                  <p className="mt-3 max-w-3xl text-[12px] leading-5 text-slate-200">
                    Controlled record shell for reviewing publication metadata,
                    document authority, lifecycle status, related records, and
                    future file actions.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500/70 bg-slate-900 px-6 py-4 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-200">
                    Record Status
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-amber-400">
                    {status}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-300">
                    {documentState}
                  </p>
                </div>
              </div>
            </section>

            <div className="flex items-center justify-between gap-4">
              <Link
                href="/governance-library"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Back to EGL Dashboard
              </Link>

              <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 md:block">
                Controlled Publication Record
              </p>
            </div>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-950">
                        <BookOpen className="h-7 w-7 text-amber-400" />
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                          Document Record
                        </p>

                        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                          {documentNumber}
                        </h2>

                        <p className="mt-2 max-w-3xl text-sm font-semibold leading-5 text-slate-800">
                          {title}
                        </p>

                        <p className="mt-3 max-w-4xl text-xs leading-5 text-slate-600">
                          {record.notes ??
                            "Controlled enterprise publication record prepared for document review, routing, file association, and backend registry integration."}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                        {status}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        {record.classification ?? "Internal Governance"}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <RecordPanel title="Record Authority" icon={ShieldCheck}>
                    <RecordField
                      label="Publication Series"
                      value={
                        record.series ??
                        record.publicationSeries ??
                        "Administration"
                      }
                    />
                    <RecordField
                      label="Document Type"
                      value={record.documentType ?? "Manual"}
                    />
                    <RecordField label="Owner" value={record.owner ?? "HCA"} />
                    <RecordField
                      label="Authority"
                      value={record.authority ?? "Hassan Capital Partners, LLC"}
                    />
                    <RecordField
                      label="Classification"
                      value={record.classification ?? "Internal Governance"}
                    />
                  </RecordPanel>

                  <RecordPanel title="Lifecycle Metadata" icon={History}>
                    <RecordField
                      label="Version"
                      value={record.version ?? "1.0"}
                    />
                    <RecordField label="Status" value={status} />
                    <RecordField
                      label="Document State"
                      value={documentState}
                    />
                    <RecordField
                      label="Effective Date"
                      value={record.effectiveDate ?? "2026-06-18"}
                    />
                    <RecordField
                      label="Review Date"
                      value={record.reviewDate ?? "2027-06-18"}
                    />
                  </RecordPanel>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950">
                      <Workflow className="h-5 w-5 text-amber-400" />
                    </div>

                    <div>
                      <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                        Record Relationships
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Related governance, implementation, certification, and
                        recordkeeping connections.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <RelationshipCard
                      label="Original Executed Location"
                      value={
                        record.originalExecutedLocation ??
                        "HCA Vault / Originals"
                      }
                    />
                    <RelationshipCard
                      label="Certified Copy"
                      value={record.certifiedCopy ?? "Available"}
                    />
                    <RelationshipCard
                      label="Supersedes"
                      value={record.supersedes ?? "N/A"}
                    />
                    <RelationshipCard
                      label="Superseded By"
                      value={record.supersededBy ?? "N/A"}
                    />
                    <RelationshipCard
                      label="Related Resolution"
                      value={record.relatedResolution ?? "N/A"}
                    />
                    <RelationshipCard
                      label="Related Implementation Project"
                      value={
                        record.relatedImplementationProject ?? "HIEOS-IMP-006I"
                      }
                    />
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <EGLRecordActionControls
                  documentNumber={documentNumber}
                  context="detail"
                />

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    File Preview
                  </h2>

                  <Link
                    href={viewerHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-amber-500 hover:bg-amber-50"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950">
                      <FileText className="h-7 w-7 text-amber-400" />
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-950">
                      Open document viewer shell.
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Reserved for future PDF, Office, SharePoint, or internal
                      file preview integration.
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-slate-950">
                      Open Viewer
                      <ExternalLink className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                  </Link>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    Backend Readiness
                  </h2>

                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    This record detail page is frontend-only. It prepares the
                    structure for backend registry records, file storage,
                    revision history, certified-copy generation, document
                    viewing, upload routing, access controls, and employee or
                    executive workflow training.
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

interface RecordPanelProps {
  title: string;
  icon: ElementType;
  children: ReactNode;
}

function RecordPanel({ title, icon: Icon, children }: RecordPanelProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950">
          <Icon className="h-5 w-5 text-amber-400" />
        </div>

        <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
          {title}
        </h2>
      </div>

      <dl>{children}</dl>
    </section>
  );
}

function RecordField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200 py-2 text-xs last:border-b-0">
      <dt className="font-bold text-slate-500">{label}</dt>
      <dd className="text-right font-semibold text-slate-950">{value}</dd>
    </div>
  );
}

function RelationshipCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xs font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function getDocumentNumber(record: DisplayPublicationRecord) {
  return (
    record.documentNo ??
    record.documentNumber ??
    record.documentId ??
    record.id ??
    "N/A"
  );
}