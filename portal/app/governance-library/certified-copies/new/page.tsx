"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  FilePlus2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const workflowSteps = [
  "Verify source record",
  "Confirm original executed location",
  "Review certification authority",
  "Generate certified-copy package",
  "Route for filing and issuance",
];

const checklistItems = [
  "Source record verified",
  "Original location confirmed",
  "Certification authority identified",
  "Certified-copy relationship prepared",
  "Issuance log reserved",
];

export default function CreateCertifiedCopyPage() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.55em] text-amber-400">
                    Hassan Industries
                  </p>
                  <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.04em]">
                    EGL Create Certified Copy
                  </h1>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-100">
                    Frontend workflow shell for preparing certified copies of
                    controlled publications, executed records, resolutions, and
                    official enterprise documents.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-white/5 px-8 py-5 text-center">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-slate-200">
                    Workflow Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Certification Shell
                  </p>
                  <p className="mt-1 text-xs text-slate-200">Frontend Only</p>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/governance-library"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Back to EGL Dashboard
              </Link>

              <Link
                href="/governance-library/certified-copies"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                Certified Copies Registry
              </Link>
            </div>

            <section className="grid gap-4 xl:grid-cols-[1fr_430px]">
              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <FileCheck2 className="h-7 w-7 text-amber-400" />
                    </div>

                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.42em] text-slate-400">
                        Certification Intake
                      </p>
                      <h2 className="mt-2 text-3xl font-black">
                        New Certified Copy Request
                      </h2>
                      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                        This shell prepares the controlled workspace for issuing
                        a certified copy. No certified copy is generated yet, no
                        source file is copied yet, and no issuance record is
                        created in this frontend phase.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <WorkflowPanel title="Workflow Steps" items={workflowSteps} />
                  <ChecklistPanel items={checklistItems} />
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <FilePlus2 className="h-6 w-6 text-amber-400" />
                    </div>

                    <div>
                      <h2 className="text-lg font-black uppercase tracking-[0.28em]">
                        Certified Copy Creation Workspace
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Frontend placeholder for the future controlled
                        certification form.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-slate-950">
                      <FileCheck2 className="h-8 w-8 text-amber-400" />
                    </div>

                    <h3 className="mt-5 text-lg font-black">
                      Prepare Certified Copy pending backend integration.
                    </h3>

                    <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                      This area will later hold source record selection,
                      certification authority controls, file package generation,
                      certified-copy numbering, approval routing, and issuance
                      logging.
                    </p>
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black uppercase tracking-[0.28em]">
                    Intake Actions
                  </h2>

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                    >
                      Prepare Certified Copy
                    </button>

                    <Link
                      href="/governance-library/certified-copies"
                      className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      View Certified Copies Registry
                    </Link>

                    <Link
                      href="/governance-library"
                      className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      Return to EGL Dashboard
                    </Link>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <LockKeyhole className="h-6 w-6 text-amber-400" />
                    </div>

                    <h2 className="text-lg font-black uppercase tracking-[0.28em]">
                      Control Notes
                    </h2>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                    <li>• Certification workflow is frontend-only in this phase.</li>
                    <li>• No certified copy is generated yet.</li>
                    <li>• No backend record is created yet.</li>
                    <li>• No issuance authority is enforced yet.</li>
                    <li>• Future backend work will connect this to EGL records.</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black uppercase tracking-[0.28em]">
                    Training Note
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    In future employee or executive training manuals, this page
                    should be described as the controlled workspace for starting
                    certified-copy issuance. The final backend version should
                    require role-based authority, approval routing, and
                    recordkeeping before completion.
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

function WorkflowPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <CheckCircle2 className="h-6 w-6 text-amber-400" />
        </div>

        <h2 className="text-lg font-black uppercase tracking-[0.28em]">
          {title}
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-amber-400">
              {index + 1}
            </span>
            <p className="text-sm font-bold">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChecklistPanel({ items }: { items: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <ShieldCheck className="h-6 w-6 text-amber-400" />
        </div>

        <h2 className="text-lg font-black uppercase tracking-[0.28em]">
          Control Checklist
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4"
          >
            <ShieldCheck className="h-4 w-4 text-amber-600" />
            <p className="text-sm font-bold">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}