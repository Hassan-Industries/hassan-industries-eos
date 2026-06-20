import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  History,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const historyEvents = [
  {
    code: "CC",
    title: "Certified Copy Issued",
    description:
      "Certified copy issuance history will display source record, issuing authority, timestamp, and certification statement.",
    status: "Future Integration",
  },
  {
    code: "VR",
    title: "Source Verification",
    description:
      "Source verification will confirm the original executed location before certified-copy generation.",
    status: "Reserved",
  },
  {
    code: "LG",
    title: "Issuance Log Entry",
    description:
      "Backend workflow will record certified-copy issuance activity, requester, approver, and filing location.",
    status: "Reserved",
  },
];

export default function CertifiedCopiesHistoryPage() {
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
                    EGL Certification History
                  </h1>

                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-200">
                    Frontend history shell for certified-copy issuance records,
                    source verification, approval events, and future audit
                    history.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.42em] text-slate-200">
                    History Status
                  </p>

                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Shell
                  </p>

                  <p className="mt-1 text-xs text-slate-200">Frontend Only</p>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/governance-library/certified-copies"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Back to Certified Copies Registry
              </Link>

              <Link
                href="/governance-library"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                Back to EGL Dashboard
              </Link>
            </div>

            <section className="grid gap-4 xl:grid-cols-[1fr_420px]">
              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <History className="h-7 w-7 text-amber-400" />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-slate-400">
                        Certified Copy History
                      </p>

                      <h2 className="mt-2 text-3xl font-black text-slate-950">
                        Certification Issuance Timeline
                      </h2>

                      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                        This page reserves the controlled history area for
                        certified-copy generation, source verification, issuance
                        logging, certification authority, and audit records.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">
                      <FileCheck2 className="h-5 w-5 text-amber-400" />
                    </div>

                    <div>
                      <h2 className="text-[17px] font-black uppercase tracking-[0.28em] text-slate-950">
                        Certification Timeline
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Placeholder timeline for future certification lifecycle
                        events.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {historyEvents.map((event) => (
                      <div
                        key={event.title}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-5"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-amber-400">
                            {event.code}
                          </div>

                          <div>
                            <h3 className="text-lg font-black text-slate-950">
                              {event.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {event.description}
                            </p>

                            <span className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600">
                              {event.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-[17px] font-black uppercase tracking-[0.28em] text-slate-950">
                    History Actions
                  </h2>

                  <div className="mt-5 space-y-3">
                    <Link
                      href="/governance-library/certified-copies"
                      className="block rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-slate-800"
                    >
                      View Certified Copies Registry
                    </Link>

                    <Link
                      href="/governance-library/certified-copies/new"
                      className="block rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      Create Certified Copy
                    </Link>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950">
                      <ShieldCheck className="h-5 w-5 text-amber-400" />
                    </div>

                    <h2 className="text-[17px] font-black uppercase tracking-[0.28em] text-slate-950">
                      Future Controls
                    </h2>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                    <li>• Certified-copy events will be system-generated.</li>
                    <li>• Source verification decisions will be logged.</li>
                    <li>• Issuance authority will be recorded.</li>
                    <li>• Download and access events may be auditable.</li>
                    <li>• Certified copies will remain tied to source records.</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5">
                  <p className="text-[15px] font-black uppercase tracking-[0.28em] text-slate-950">
                    Training Note
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Employees and executives should understand certification
                    history as the official lifecycle record for certified-copy
                    issuance, source verification, access, and filing activity.
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