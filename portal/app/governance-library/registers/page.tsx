"use client";

import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FilePlus2,
  FileText,
  FolderOpen,
  Gavel,
  Layers3,
  RefreshCcw,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

type RegisterCard = {
  title: string;
  description: string;
  href: string;
  status: string;
  count: string;
  icon: ElementType;
};

const registerCards: RegisterCard[] = [
  {
    title: "Publications Registry",
    description:
      "Controlled publication records, manuals, standards, policies, resolutions-linked publications, and document metadata.",
    href: "/governance-library/publications",
    status: "Active Registry",
    count: "5 sample records",
    icon: BookOpen,
  },
  {
    title: "Resolutions Registry",
    description:
      "Formal governance decisions, foundational resolutions, officer actions, approval records, and linked publications.",
    href: "/governance-library/resolutions",
    status: "Active Registry",
    count: "3 sample records",
    icon: Gavel,
  },
  {
    title: "Forms & Templates Hub",
    description:
      "Controlled hub for forms, templates, intake packets, standardized formats, and future document generation workspaces.",
    href: "/governance-library/forms-templates",
    status: "Hub",
    count: "9 controlled items",
    icon: Layers3,
  },
  {
    title: "Forms Registry",
    description:
      "Controlled forms for publication intake, replacement requests, certified-copy requests, governance review, and workflow submission.",
    href: "/governance-library/forms",
    status: "Frontend Registry",
    count: "4 form records",
    icon: FileText,
  },
  {
    title: "Templates Registry",
    description:
      "Controlled templates for policies, manuals, resolutions, certified-copy covers, briefings, and standardized document generation.",
    href: "/governance-library/templates",
    status: "Frontend Registry",
    count: "5 template records",
    icon: BookOpen,
  },
  {
    title: "Certified Copies Registry",
    description:
      "Certified copies of publications, executed records, resolutions, official governance documents, and future certification issuance logs.",
    href: "/governance-library/certified-copies",
    status: "Frontend Registry",
    count: "4 copy records",
    icon: FileCheck2,
  },
  {
    title: "Pending Review Queue",
    description:
      "Frontend review queue for publications, policy updates, classification review, authority checks, and administrative routing.",
    href: "/governance-library/pending-review",
    status: "Queue Shell",
    count: "Pending review",
    icon: RefreshCcw,
  },
  {
    title: "Pending Execution Queue",
    description:
      "Frontend execution queue for approved publications, resolutions, certified copies, signature routing, and filing readiness.",
    href: "/governance-library/pending-execution",
    status: "Queue Shell",
    count: "Pending execution",
    icon: ClipboardCheck,
  },
];

const metrics = [
  {
    label: "Active Registers",
    value: "8",
    icon: <FolderOpen className="h-6 w-6 text-amber-500" />,
  },
  {
    label: "Controlled Records",
    value: "21+",
    icon: <BookOpen className="h-6 w-6 text-amber-500" />,
  },
  {
    label: "Workflow Queues",
    value: "2",
    icon: <RefreshCcw className="h-6 w-6 text-amber-500" />,
  },
  {
    label: "Backend Status",
    value: "Shell",
    icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
  },
];

export default function EGLRegistersHubPage() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.55em] text-amber-400">
                    Hassan Industries
                  </p>
                  <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.04em]">
                    EGL Registers Hub
                  </h1>
                  <p className="mt-3 max-w-5xl text-sm leading-6 text-slate-200">
                    Controlled navigation center for Enterprise Governance
                    Library registries, queues, certified copies, forms,
                    templates, resolutions, publications, and future backend
                    recordkeeping modules.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-200">
                    Register Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Frontend Hub
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-200">
                    Registry Navigation Layer
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/governance-library"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-black shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-500" />
                Back to EGL Dashboard
              </Link>

              <Link
                href="/governance-library/publications/new"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-slate-800"
              >
                <FilePlus2 className="h-4 w-4 text-amber-400" />
                Create New Publication
              </Link>

              <Link
                href="/governance-library/certified-copies/new"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-black shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <FileCheck2 className="h-4 w-4 text-amber-500" />
                Create Certified Copy
              </Link>
            </div>

            <p className="text-right text-[12px] font-black uppercase tracking-[0.42em] text-slate-400">
              Controlled Registry Navigation
            </p>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  icon={metric.icon}
                />
              ))}
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="min-w-0 rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.42em] text-slate-400">
                      Enterprise Governance Library
                    </p>
                    <h2 className="mt-2 text-2xl font-black">
                      Controlled Registers
                    </h2>
                    <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
                      Select a register or queue to open the correct EGL
                      workspace. This hub prevents hidden routes and keeps
                      navigation intentional as the system expands.
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-700">
                    {registerCards.length} available
                  </span>
                </div>

                <div className="grid gap-4 p-5 md:grid-cols-2">
                  {registerCards.map((card) => (
                    <RegisterNavigationCard key={card.title} card={card} />
                  ))}
                </div>
              </div>

              <aside className="space-y-4">
                <Panel title="Navigation Standard" icon={<ShieldCheck />}>
                  <ul className="space-y-3 text-sm leading-6 text-slate-600">
                    <li>• Registry routes should be reachable from the EGL Dashboard.</li>
                    <li>• Quick actions should perform their named task.</li>
                    <li>• Queue routes should not remain hidden or orphaned.</li>
                    <li>• Creation actions should point to creation shells.</li>
                    <li>• Backend routing will attach authority and approval controls later.</li>
                  </ul>
                </Panel>

                <Panel title="Future Backend Readiness" icon={<ClipboardCheck />}>
                  <p className="text-sm leading-6 text-slate-600">
                    Later phases should connect these registry routes to
                    backend records, role permissions, approval queues, document
                    storage, audit history, Microsoft 365 or SharePoint file
                    references, and permanent enterprise recordkeeping.
                  </p>
                </Panel>

                <Panel title="Training Note" icon={<BookOpen />}>
                  <p className="text-sm leading-6 text-slate-600">
                    Employee and executive training should describe this page as
                    the controlled starting point for locating EGL registries,
                    review queues, execution queues, certified copies, forms,
                    templates, publications, and resolutions.
                  </p>
                </Panel>
              </aside>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex min-h-[78px] items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div>
        <p className="text-xs font-bold text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-black leading-none text-slate-950">
          {value}
        </p>
      </div>
      {icon}
    </div>
  );
}

function RegisterNavigationCard({ card }: { card: RegisterCard }) {
  const Icon = card.icon;

  return (
    <Link
      href={card.href}
      className="group flex min-h-[190px] flex-col justify-between rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-amber-500 hover:bg-amber-50"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-amber-400">
            <Icon className="h-6 w-6" />
          </div>

          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-slate-600 shadow-sm">
            {card.status}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-black text-slate-950">
          {card.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {card.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
          {card.count}
        </span>

        <span className="inline-flex items-center gap-2 text-xs font-black text-slate-950">
          Open
          <FolderOpen className="h-4 w-4 text-amber-500 transition group-hover:scale-110" />
        </span>
      </div>
    </Link>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-amber-400">
          {icon}
        </div>
        <h2 className="text-[15px] font-black uppercase tracking-[0.32em]">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}