import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ClipboardCheck,
  FilePlus2,
  LockKeyhole,
  Route,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const intakeSteps = [
  "Identify publication series and document type",
  "Reserve or request document number",
  "Enter title, owner, authority, and classification",
  "Attach draft or source material",
  "Submit for administrative review",
  "Route for approval, execution, or publication",
];

const controlChecks = [
  "Document numbering standard applied",
  "Owner and authority identified",
  "Classification selected",
  "Retention category considered",
  "Review route prepared",
  "Recordkeeping location reserved",
];

export default function EGLCreatePublicationShell() {
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
                    Create New Publication
                  </h1>

                  <p className="mt-3 max-w-3xl text-[12px] leading-5 text-slate-200">
                    Frontend intake shell for creating controlled Enterprise
                    Governance Library publications, manuals, standards,
                    policies, resolutions, templates, and official records.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500/70 bg-slate-900 px-6 py-4 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-200">
                    Intake Status
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-amber-400">
                    Creation Shell
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
                  href="/governance-library"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
                >
                  <ArrowLeft className="h-4 w-4 text-amber-600" />
                  Back to EGL Dashboard
                </Link>

                <Link
                  href="/governance-library/publications"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
                >
                  Publications Registry
                </Link>
              </div>

              <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 md:block">
                Controlled Publication Intake
              </p>
            </div>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-950">
                      <FilePlus2 className="h-7 w-7 text-amber-400" />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                        Publication Intake
                      </p>

                      <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                        New Controlled Publication
                      </h2>

                      <p className="mt-2 max-w-4xl text-xs leading-5 text-slate-600">
                        This shell prepares the future intake workspace for
                        creating EGL records. No record is saved yet, no document
                        number is assigned yet, and no backend workflow is
                        created in this phase.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950">
                        <Route className="h-5 w-5 text-amber-400" />
                      </div>

                      <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                        Intake Steps
                      </h2>
                    </div>

                    <ol className="space-y-3">
                      {intakeSteps.map((step, index) => (
                        <li
                          key={step}
                          className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-[11px] font-bold text-amber-400">
                            {index + 1}
                          </span>

                          <span className="text-xs font-semibold text-slate-800">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950">
                        <ShieldCheck className="h-5 w-5 text-amber-400" />
                      </div>

                      <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                        Control Checklist
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {controlChecks.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-3"
                        >
                          <ClipboardCheck className="h-4 w-4 text-amber-600" />

                          <span className="text-xs font-semibold text-slate-800">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950">
                      <BookOpen className="h-5 w-5 text-amber-400" />
                    </div>

                    <div>
                      <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                        Publication Creation Workspace
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Frontend placeholder for the future controlled creation
                        form.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
                    <div className="grid gap-3 md:grid-cols-2">
                      <IntakeField label="Document Number" value="Pending Assignment" />
                      <IntakeField label="Publication Series" value="Select Series" />
                      <IntakeField label="Document Type" value="Select Type" />
                      <IntakeField label="Owner" value="Select Owner" />
                      <IntakeField label="Authority" value="Select Authority" />
                      <IntakeField label="Classification" value="Select Classification" />
                    </div>

                    <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950">
                        <FilePlus2 className="h-7 w-7 text-amber-400" />
                      </div>

                      <p className="mt-4 text-sm font-extrabold text-slate-950">
                        Publication creation form pending backend integration.
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        This area will later hold the controlled form, document
                        numbering logic, file attachment, owner assignment,
                        review routing, and submission controls.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    Intake Actions
                  </h2>

                  <div className="mt-4 space-y-2">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      <FilePlus2 className="h-4 w-4" />
                      Start Publication Intake
                    </button>

                    <Link
                      href="/governance-library/publications"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      View Publications Registry
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
                    <li>• Creation is frontend-only in this phase.</li>
                    <li>• No publication record is saved yet.</li>
                    <li>• No document number is reserved yet.</li>
                    <li>• No approval route is created yet.</li>
                    <li>• Future backend work will control creation authority.</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    Training Note
                  </h2>

                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    In future employee or executive training materials, this
                    page should be described as the controlled starting point for
                    creating a new EGL publication. Final creation should depend
                    on document-control standards, authority, classification,
                    and review routing.
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

function IntakeField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xs font-semibold text-slate-950">{value}</p>
    </div>
  );
}