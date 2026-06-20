import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileCheck2,
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
            <section className="rounded-xl bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.48em] text-amber-400">
                    Hassan Industries
                  </p>

                  <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">
                    EGL Create Certified Copy
                  </h1>

                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-200">
                    Frontend workflow shell for preparing certified copies of
                    controlled publications, executed records, resolutions, and
                    official enterprise documents.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.42em] text-slate-200">
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
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Back to EGL Dashboard
              </Link>

              <Link
                href="/governance-library/certified-copies"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                Certified Copies Registry
              </Link>
            </div>

            <section className="grid gap-4 xl:grid-cols-[1fr_420px]">
              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <FileCheck2 className="h-7 w-7 text-amber-400" />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-slate-400">
                        Certification Intake
                      </p>

                      <h2 className="mt-2 text-3xl font-black text-slate-950">
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
                  <ChecklistPanel title="Control Checklist" items={checklistItems} />
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">
                      <FileCheck2 className="h-5 w-5 text-amber-400" />
                    </div>

                    <div>
                      <h2 className="text-[17px] font-black uppercase tracking-[0.28em] text-slate-950">
                        Certified Copy Workspace
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Frontend placeholder for future certification form.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
                    <div className="grid gap-3 md:grid-cols-2">
                      <WorkspaceField label="Source Record" value="Select Source Record" />
                      <WorkspaceField label="Source Type" value="Publication / Resolution" />
                      <WorkspaceField label="Certification Authority" value="Pending Assignment" />
                      <WorkspaceField label="Issue Status" value="Pending" />
                      <WorkspaceField label="Certified Copy ID" value="Pending Assignment" />
                      <WorkspaceField label="Retention" value="Permanent / As Assigned" />
                    </div>

                    <div className="mt-5 rounded-lg border border-slate-200 bg-white p-8 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950">
                        <FileCheck2 className="h-7 w-7 text-amber-400" />
                      </div>

                      <h3 className="mt-5 text-lg font-black text-slate-950">
                        Certified copy preparation pending backend integration.
                      </h3>

                      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                        This area will later hold source selection, authority
                        review, certification statements, file generation,
                        issuance logging, approval routing, and filing controls.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-[17px] font-black uppercase tracking-[0.28em] text-slate-950">
                    Intake Actions
                  </h2>

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      className="w-full rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-xs font-bold text-white"
                    >
                      Prepare Certified Copy
                    </button>

                    <Link
                      href="/governance-library/certified-copies"
                      className="block rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      View Certified Copies Registry
                    </Link>

                    <Link
                      href="/governance-library"
                      className="block rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      Return to EGL Dashboard
                    </Link>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">
                      <LockKeyhole className="h-5 w-5 text-amber-400" />
                    </div>

                    <h2 className="text-[17px] font-black uppercase tracking-[0.28em] text-slate-950">
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

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5">
                  <p className="text-[15px] font-black uppercase tracking-[0.28em] text-slate-950">
                    Training Note
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    In future employee or executive training manuals, this page
                    should be described as the controlled workspace for starting
                    a certified-copy request. The final backend version should
                    require role-based authority, source verification, approval
                    routing, generation, issuance logging, and recordkeeping.
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
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">
          <CheckCircle2 className="h-5 w-5 text-amber-400" />
        </div>

        <h2 className="text-[17px] font-black uppercase tracking-[0.28em] text-slate-950">
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-amber-400">
              {index + 1}
            </span>

            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function ChecklistPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">
          <ShieldCheck className="h-5 w-5 text-amber-400" />
        </div>

        <h2 className="text-[17px] font-black uppercase tracking-[0.28em] text-slate-950">
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold"
          >
            <ShieldCheck className="h-4 w-4 text-amber-500" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkspaceField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}