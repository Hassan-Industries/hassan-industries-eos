import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileText,
  LockKeyhole,
  Route,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const intakeSteps = [
  "Identify request purpose",
  "Select department or operating desk",
  "Confirm requester and owner",
  "Classify access level and routing sensitivity",
  "Attach supporting record or reference",
  "Route for review, approval, execution, or filing",
];

const controlChecklist = [
  "Request purpose documented",
  "Responsible department identified",
  "Owner or reviewer assigned",
  "Classification considered",
  "Routing path prepared",
  "Recordkeeping location reserved",
];

export default function NewServiceRequestPage() {
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
                  <p className="text-[11px] font-black uppercase tracking-[0.55em] text-amber-400">
                    Hassan Industries
                  </p>
                  <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">
                    Create Service Request
                  </h1>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-100">
                    Frontend intake shell for preparing universal service
                    requests before backend routing, approval, assignment,
                    attachment handling, and permanent recordkeeping are added.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.42em] text-white">
                    Intake Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Request Shell
                  </p>
                  <p className="mt-1 text-xs text-slate-200">
                    Frontend Only
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/service-requests"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-500" />
                Service Requests Desk
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                Dashboard
              </Link>
            </div>

            <p className="text-right text-[12px] font-black uppercase tracking-[0.5em] text-slate-400">
              Controlled Request Intake
            </p>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
              <div className="space-y-4">
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-slate-950 p-4">
                      <ClipboardList className="h-7 w-7 text-amber-400" />
                    </div>

                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.42em] text-slate-400">
                        Service Request Intake
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-slate-950">
                        New Service Request
                      </h2>
                      <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">
                        This shell prepares the controlled workspace for
                        submitting an administrative, governance, treasury,
                        records, document-control, certified-copy, or restricted
                        HCA review request. No request is saved yet, no backend
                        workflow is created, and no record is filed in this
                        phase.
                      </p>
                    </div>
                  </div>
                </div>

                <section className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-950 p-3">
                        <Route className="h-5 w-5 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-[0.35em] text-slate-950">
                        Intake Steps
                      </h3>
                    </div>

                    <div className="mt-5 space-y-3">
                      {intakeSteps.map((step, index) => (
                        <div
                          key={step}
                          className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-amber-400">
                            {index + 1}
                          </span>
                          <p className="text-sm font-black text-slate-950">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-950 p-3">
                        <ShieldCheck className="h-5 w-5 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-[0.35em] text-slate-950">
                        Control Checklist
                      </h3>
                    </div>

                    <div className="mt-5 space-y-3">
                      {controlChecklist.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white px-4 py-4"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-500" />
                          <p className="text-sm font-black text-slate-950">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-950 p-3">
                      <FileText className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-[0.35em] text-slate-950">
                      Request Workspace
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Future backend work should replace this placeholder with a
                    controlled submission form, request numbering, attachment
                    intake, routing rules, reviewer assignment, department queue
                    placement, status tracking, and audit history.
                  </p>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-black uppercase tracking-[0.35em] text-slate-950">
                    Intake Actions
                  </h3>

                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      className="w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white"
                    >
                      Start Service Request Intake
                    </button>

                    <Link
                      href="/service-requests"
                      className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      View Service Requests Desk
                    </Link>

                    <Link
                      href="/dashboard"
                      className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      Return to Dashboard
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-950 p-3">
                      <LockKeyhole className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-[0.35em] text-slate-950">
                      Control Notes
                    </h3>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                    <li>• Intake is frontend-only in this phase.</li>
                    <li>• No service request record is saved yet.</li>
                    <li>• No approval route is created yet.</li>
                    <li>• No attachment is uploaded yet.</li>
                    <li>• Restricted HCA review controls come later.</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-black uppercase tracking-[0.35em] text-slate-950">
                    Training Note
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Employees and executives should treat Service Requests as
                    the universal intake desk for work that needs routing,
                    review, approval, execution, filing, or restricted
                    governance handling.
                  </p>
                </div>
              </aside>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}