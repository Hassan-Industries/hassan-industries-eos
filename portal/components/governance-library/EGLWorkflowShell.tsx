import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  ClipboardCheck,
  FileCheck2,
  FileUp,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import type { PublicationRecord } from "@/data/governanceLibrary";
import {
  getPublicationDocumentNumber,
  getPublicationRecordHref,
  getPublicationViewerHref,
} from "@/lib/eglPublicationRecords";

type WorkflowType = "upload" | "certification";

interface EGLWorkflowShellProps {
  publication: PublicationRecord;
  workflowType: WorkflowType;
}

type DisplayPublicationRecord = PublicationRecord & {
  title?: string;
  documentType?: string;
  owner?: string;
  authority?: string;
  version?: string;
  status?: string;
  documentState?: string;
  classification?: string;
  retentionCategory?: string;
  originalExecutedLocation?: string;
};

const workflowConfig = {
  upload: {
    eyebrow: "Replacement Intake",
    title: "Upload Replacement",
    statusLabel: "Upload Shell",
    description:
      "Frontend workflow shell for submitting replacement files, revised publications, corrected documents, or new controlled versions for review.",
    primaryIcon: FileUp,
    primaryAction: "Upload Replacement File",
    steps: [
      "Select controlled record",
      "Attach replacement file",
      "Confirm document number and version",
      "Submit for administrative review",
      "Route to approval or execution queue",
    ],
    checklist: [
      "Document number confirmed",
      "Replacement reason captured",
      "Version impact reviewed",
      "Prior record relationship preserved",
      "Review owner assigned",
    ],
  },
  certification: {
    eyebrow: "Certification Intake",
    title: "Create Certified Copy",
    statusLabel: "Certification Shell",
    description:
      "Frontend workflow shell for preparing certified copies of controlled publications, executed records, resolutions, and official enterprise documents.",
    primaryIcon: FileCheck2,
    primaryAction: "Prepare Certified Copy",
    steps: [
      "Verify source record",
      "Confirm original executed location",
      "Review certification authority",
      "Generate certified-copy package",
      "Route for filing and issuance",
    ],
    checklist: [
      "Source record verified",
      "Original location confirmed",
      "Certification authority identified",
      "Certified copy relationship prepared",
      "Issuance log reserved",
    ],
  },
};

export default function EGLWorkflowShell({
  publication,
  workflowType,
}: EGLWorkflowShellProps) {
  const record = publication as DisplayPublicationRecord;
  const documentNumber = getPublicationDocumentNumber(publication);
  const config = workflowConfig[workflowType];
  const Icon = config.primaryIcon;

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
                    EGL {config.title}
                  </h1>

                  <p className="mt-3 max-w-3xl text-[12px] leading-5 text-slate-200">
                    {config.description}
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500/70 bg-slate-900 px-6 py-4 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-200">
                    Workflow Status
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-amber-400">
                    {config.statusLabel}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-300">
                    Frontend Only
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={getPublicationRecordHref(documentNumber)}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
                >
                  <ArrowLeft className="h-4 w-4 text-amber-600" />
                  Back to Record Detail
                </Link>

                <Link
                  href="/governance-library"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
                >
                  Back to EGL Dashboard
                </Link>
              </div>

              <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 md:block">
                {config.eyebrow}
              </p>
            </div>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-950">
                        <BookOpen className="h-7 w-7 text-amber-400" />
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                          Controlled Record
                        </p>

                        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                          {documentNumber}
                        </h2>

                        <p className="mt-2 max-w-3xl text-sm font-semibold leading-5 text-slate-800">
                          {record.title ?? "Unregistered Publication Record"}
                        </p>

                        <p className="mt-3 max-w-4xl text-xs leading-5 text-slate-600">
                          This workflow is prepared for controlled employee or
                          executive action. The current implementation displays
                          the workflow shell only; backend submission and file
                          handling will be added later.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                        {record.status ?? "AP"}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        {record.classification ?? "Internal Governance"}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <WorkflowPanel title="Workflow Steps" icon={ClipboardCheck}>
                    <ol className="space-y-3">
                      {config.steps.map((step, index) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-[11px] font-bold text-amber-400">
                            {index + 1}
                          </span>

                          <span className="text-xs font-semibold leading-5 text-slate-800">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </WorkflowPanel>

                  <WorkflowPanel title="Control Checklist" icon={ShieldCheck}>
                    <div className="space-y-3">
                      {config.checklist.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-3"
                        >
                          <BadgeCheck className="h-4 w-4 text-amber-600" />

                          <span className="text-xs font-semibold text-slate-800">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </WorkflowPanel>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950">
                      <Icon className="h-5 w-5 text-amber-400" />
                    </div>

                    <div>
                      <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                        {config.title} Workspace
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Frontend placeholder for the future controlled workflow
                        form.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
                    <div className="grid gap-3 md:grid-cols-2">
                      <WorkflowField
                        label="Document Number"
                        value={documentNumber}
                      />
                      <WorkflowField
                        label="Document Type"
                        value={record.documentType ?? "Manual"}
                      />
                      <WorkflowField label="Owner" value={record.owner ?? "HCA"} />
                      <WorkflowField
                        label="Current Version"
                        value={record.version ?? "1.0"}
                      />
                      <WorkflowField
                        label="Authority"
                        value={record.authority ?? "Hassan Capital Partners, LLC"}
                      />
                      <WorkflowField
                        label="Source Location"
                        value={
                          record.originalExecutedLocation ??
                          "HCA Vault / Originals"
                        }
                      />
                    </div>

                    <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950">
                        <Icon className="h-7 w-7 text-amber-400" />
                      </div>

                      <p className="mt-4 text-sm font-extrabold text-slate-950">
                        {config.primaryAction} pending backend integration.
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        This area will later hold the controlled form, file
                        selector, certification controls, approval routing, and
                        submission logic.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    Workflow Actions
                  </h2>

                  <div className="mt-4 space-y-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      <Icon className="h-4 w-4" />
                      {config.primaryAction}
                    </button>

                    <Link
                      href={getPublicationViewerHref(documentNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      <BookOpen className="h-4 w-4 text-amber-600" />
                      Open Viewer
                    </Link>

                    <Link
                      href={getPublicationRecordHref(documentNumber)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      <ArrowLeft className="h-4 w-4 text-amber-600" />
                      Return to Record
                    </Link>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950">
                      <LockKeyhole className="h-5 w-5 text-amber-400" />
                    </div>

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                      Control Notes
                    </h2>
                  </div>

                  <ul className="space-y-2 text-xs leading-5 text-slate-600">
                    <li>• Workflow is frontend-only in this phase.</li>
                    <li>• No document is uploaded or certified yet.</li>
                    <li>• No backend record is created yet.</li>
                    <li>• No approval routing occurs yet.</li>
                    <li>• Future integration will connect this to EGL records.</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    Training Note
                  </h2>

                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    In future employee or executive training manuals, this page
                    should be described as the controlled workspace for starting
                    a document replacement or certified-copy request. The final
                    backend version should require role-based authority,
                    approval routing, and recordkeeping before completion.
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

function WorkflowPanel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: ReactNode;
}) {
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

      {children}
    </section>
  );
}

function WorkflowField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xs font-semibold text-slate-950">{value}</p>
    </div>
  );
}