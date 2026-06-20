"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  FileArchive,
  Gavel,
  LockKeyhole,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const resolutionSteps = [
  "Identify resolution purpose",
  "Confirm authorizing entity or governing body",
  "Select resolution type and related publication",
  "Prepare draft resolution metadata",
  "Route for governance review",
  "Move to execution, filing, and certified-copy controls",
];

const checklistItems = [
  "Resolution purpose identified",
  "Authority source confirmed",
  "Owner and governing body selected",
  "Related publication considered",
  "Retention category prepared",
  "Execution route reserved",
];

export default function EGLNewResolutionPage() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl border border-slate-900 bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.45em] text-amber-400">
                    Hassan Industries
                  </p>

                  <h1 className="mt-3 text-3xl font-black uppercase tracking-wide">
                    EGL New Resolution
                  </h1>

                  <p className="mt-3 max-w-5xl text-sm leading-6 text-slate-100">
                    Frontend intake shell for preparing foundational
                    resolutions, governance approvals, officer actions, adoption
                    records, board decisions, and related Enterprise Governance
                    Library resolution records.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white">
                    Resolution Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Intake Shell
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    Frontend Only
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-wrap items-center gap-3">
              <Link
                href="/governance-library"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Back to EGL Dashboard
              </Link>

              <Link
                href="/governance-library/resolutions"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <Gavel className="h-4 w-4 text-amber-600" />
                Resolutions Registry
              </Link>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_390px]">
              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-amber-400">
                      <ScrollText className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400">
                        Resolution Intake
                      </p>

                      <h2 className="mt-2 text-2xl font-black text-slate-950">
                        New Governance Resolution
                      </h2>

                      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                        This shell prepares the future workspace for creating
                        controlled EGL resolution records. No resolution ID is
                        assigned yet, no approval record is created yet, and no
                        execution workflow is started in this frontend phase.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <WorkflowPanel title="Resolution Steps" items={resolutionSteps} />
                  <ChecklistPanel items={checklistItems} />
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-amber-400">
                      <ClipboardCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-lg font-black uppercase tracking-[0.25em] text-slate-950">
                        Resolution Creation Workspace
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Frontend placeholder for future resolution drafting,
                        numbering, authority review, approval routing, execution,
                        and filing controls.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
                    <div className="grid gap-3 md:grid-cols-2">
                      <FieldCard label="Resolution ID" value="Pending Assignment" />
                      <FieldCard label="Resolution Type" value="Select Type" />
                      <FieldCard label="Owner" value="Select Owner" />
                      <FieldCard label="Authority" value="Select Authority" />
                      <FieldCard label="Related Publication" value="Optional / Select Record" />
                      <FieldCard label="Classification" value="Select Classification" />
                      <FieldCard label="Execution Status" value="Pending" />
                      <FieldCard label="Retention Category" value="Pending Review" />
                    </div>

                    <div className="mt-5 rounded-lg border border-slate-200 bg-white p-8 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950 text-amber-400">
                        <Gavel className="h-7 w-7" />
                      </div>

                      <h3 className="mt-4 text-lg font-black text-slate-950">
                        Resolution creation form pending backend integration.
                      </h3>

                      <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                        This area will later hold resolution drafting fields,
                        document-numbering logic, approval route selection,
                        execution controls, certified-copy linkage, and permanent
                        governance recordkeeping.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black uppercase tracking-[0.3em] text-slate-950">
                    Intake Actions
                  </h2>

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                    >
                      <ScrollText className="h-4 w-4" />
                      Start Resolution Intake
                    </button>

                    <Link
                      href="/governance-library/resolutions"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      <Gavel className="h-4 w-4 text-amber-600" />
                      View Resolutions Registry
                    </Link>

                    <Link
                      href="/governance-library/registers"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      <FileArchive className="h-4 w-4 text-amber-600" />
                      View Registers Hub
                    </Link>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-amber-400">
                      <LockKeyhole className="h-5 w-5" />
                    </div>

                    <h2 className="text-lg font-black uppercase tracking-[0.3em] text-slate-950">
                      Control Notes
                    </h2>
                  </div>

                  <ul className="space-y-3 text-sm leading-6 text-slate-600">
                    <li>• Resolution creation is frontend-only in this phase.</li>
                    <li>• No resolution record is saved yet.</li>
                    <li>• No resolution ID is reserved yet.</li>
                    <li>• No approval route is created yet.</li>
                    <li>• No execution package is generated yet.</li>
                    <li>• Future backend work will control governance authority.</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-amber-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <h2 className="text-lg font-black uppercase tracking-[0.3em] text-slate-950">
                      Training Note
                    </h2>
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    In future employee or executive training materials, this
                    page should be described as the controlled starting point for
                    preparing new governance resolutions. Final creation should
                    depend on authority, classification, approval routing,
                    execution status, and permanent recordkeeping controls.
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
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-amber-400">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <h2 className="text-lg font-black uppercase tracking-[0.3em] text-slate-950">
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-amber-400">
              {index + 1}
            </span>

            <p className="text-sm font-bold text-slate-950">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChecklistPanel({ items }: { items: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-amber-400">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <h2 className="text-lg font-black uppercase tracking-[0.3em] text-slate-950">
          Control Checklist
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-sm font-bold text-slate-950">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FieldCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}