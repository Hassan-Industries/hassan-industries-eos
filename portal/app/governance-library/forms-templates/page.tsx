import type { ElementType } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  FileCheck2,
  FileText,
  FolderOpen,
  Layers3,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const formsCount = 4;
const templatesCount = 5;
const controlledItemCount = formsCount + templatesCount;

export default function FormsTemplatesDashboardPage() {
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
                    Forms & Templates
                  </h1>

                  <p className="mt-3 max-w-5xl text-[12px] leading-5 text-slate-200">
                    Controlled workspace for Enterprise Governance Library
                    forms, templates, intake packets, standardized formats,
                    future document generation, and employee or executive
                    workflow preparation.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500/70 bg-slate-900 px-6 py-4 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-200">
                    Module Status
                  </p>

                  <p className="mt-2 text-lg font-extrabold text-amber-400">
                    Frontend Hub
                  </p>

                  <p className="mt-1 text-[11px] text-slate-300">
                    Forms · Templates · Training
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

              <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 md:block">
                Controlled Forms & Templates
              </p>
            </div>

            <section className="grid gap-3 md:grid-cols-4">
              <HubMetric
                label="Controlled Items"
                value={controlledItemCount.toString()}
                icon={Layers3}
              />

              <HubMetric
                label="Forms"
                value={formsCount.toString()}
                icon={FileText}
              />

              <HubMetric
                label="Templates"
                value={templatesCount.toString()}
                icon={BookOpen}
              />

              <HubMetric label="Backend Status" value="Shell" icon={ShieldCheck} />
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <Link
                href="/governance-library/forms"
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                    <FileText className="h-6 w-6 text-amber-400" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                      Controlled Forms
                    </p>

                    <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                      Forms Registry
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Access controlled EGL forms for publication intake,
                      replacement requests, certified-copy requests, governance
                      review, and future workflow submission.
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-bold text-white transition group-hover:bg-slate-800">
                      Open Forms Registry
                      <FolderOpen className="h-4 w-4 text-amber-400" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/governance-library/templates"
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                    <BookOpen className="h-6 w-6 text-amber-400" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
                      Controlled Templates
                    </p>

                    <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                      Templates Registry
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Access controlled EGL templates for policies, manuals,
                      resolutions, certified-copy covers, executive briefings,
                      and future document generation.
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-bold text-white transition group-hover:bg-slate-800">
                      Open Templates Registry
                      <FolderOpen className="h-4 w-4 text-amber-400" />
                    </div>
                  </div>
                </div>
              </Link>
            </section>

            <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px]">
              <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950">
                    <ClipboardList className="h-5 w-5 text-amber-400" />
                  </div>

                  <div>
                    <h2 className="text-[15px] font-extrabold uppercase tracking-[0.18em] text-slate-950">
                      Workspace Purpose
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      This hub acts as the controlled entry point for forms and
                      templates before backend creation, document generation,
                      routing, approval, and recordkeeping controls are added.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <PurposeCard
                    title="Employee Intake"
                    body="Future users can start controlled requests without needing direct backend record access."
                  />

                  <PurposeCard
                    title="Executive Preparation"
                    body="Executives and administrative staff can use approved templates for decision packets, resolutions, and manuals."
                  />

                  <PurposeCard
                    title="Document Control"
                    body="Forms and templates should inherit numbering, authority, classification, versioning, and retention controls."
                  />

                  <PurposeCard
                    title="Training Manuals"
                    body="This area should later be referenced in employee and executive training as the standard controlled workspace."
                  />
                </div>
              </section>

              <aside className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950">
                      <FileCheck2 className="h-5 w-5 text-amber-400" />
                    </div>

                    <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                      Controlled Access
                    </h2>
                  </div>

                  <ul className="mt-4 space-y-3 text-xs leading-5 text-slate-600">
                    <li>• Forms Registry is for controlled intake forms.</li>
                    <li>• Templates Registry is for approved document formats.</li>
                    <li>• Creation and generation are frontend-only in this phase.</li>
                    <li>• Backend work should later enforce authority and approval routing.</li>
                  </ul>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
                    Training Note
                  </h2>

                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    Future training materials should describe this page as the
                    user-facing entry point for controlled forms and templates.
                    Employees should not need to guess whether forms or templates
                    are hidden under publications.
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

function HubMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ElementType;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500">{label}</p>

          <p className="mt-2 text-2xl font-extrabold text-slate-950">
            {value}
          </p>
        </div>

        <Icon className="h-6 w-6 text-amber-500" />
      </div>
    </section>
  );
}

function PurposeCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-extrabold text-slate-950">{title}</p>

      <p className="mt-2 text-xs leading-5 text-slate-600">{body}</p>
    </div>
  );
}