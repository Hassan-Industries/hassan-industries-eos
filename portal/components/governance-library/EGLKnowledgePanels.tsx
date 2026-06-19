import Link from "next/link";
import type { ReactNode } from "react";
import {
  Archive,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
  FolderArchive,
  GitBranch,
  XCircle,
} from "lucide-react";

import { eglModuleRoutes } from "@/data/eglModules";

const statusCodes = [
  ["DR", "Draft"],
  ["RV", "Review"],
  ["AP", "Approved"],
  ["OE", "Original Executed"],
  ["CC", "Certified Copy"],
  ["SP", "Superseded"],
  ["AR", "Archived"],
  ["VO", "Void"],
];

const keyPrinciples = [
  "Authority & Control",
  "Version Integrity",
  "Lifecycle Management",
  "Traceability & Relationships",
  "Security & Access Control",
  "Retention & Compliance",
  "Originals & Certified Copies",
  "Enterprise-Wide Applicability",
];

const lifecycleItems = [
  { code: "DR", label: "Draft", icon: FileText },
  { code: "RV", label: "Review", icon: Clock3 },
  { code: "AP", label: "Approved", icon: BadgeCheck },
  { code: "OE", label: "Original Executed", icon: ClipboardCheck },
  { code: "CC", label: "Certified Copy", icon: FileCheck2 },
  { code: "AC", label: "Active", icon: CheckCircle2 },
];

const lifecycleBranches = [
  { code: "SP", label: "Superseded", icon: GitBranch },
  { code: "AR", label: "Archived", icon: Archive },
  { code: "VO", label: "Void", icon: XCircle },
];

export function DocumentStatusCodesPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <PanelTitle>Document Status Codes</PanelTitle>

      <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-xs">
        {statusCodes.map(([code, label]) => (
          <div key={code} className="flex items-center gap-2">
            <span className="inline-flex min-w-8 justify-center rounded bg-slate-950 px-2 py-1 text-[11px] font-bold text-white">
              {code}
            </span>

            <span className="text-slate-950">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function KeyPrinciplesPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <PanelTitle>Key Principles</PanelTitle>

      <ul className="mt-4 space-y-2 text-xs text-slate-950">
        {keyPrinciples.map((principle) => (
          <li key={principle} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>{principle}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RelationshipsPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <PanelTitle>Relationships</PanelTitle>

      <div className="relative mt-4 h-[190px] rounded-lg border border-dashed border-slate-300 bg-slate-50">
        <div className="absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-slate-950 text-white shadow-sm">
          <BookOpen className="h-5 w-5 text-amber-400" />
          <span className="mt-1 text-[8px] font-bold uppercase">
            Publication
          </span>
        </div>

        <div className="absolute left-[16%] right-[16%] top-1/2 h-px bg-slate-300" />
        <div className="absolute bottom-[17%] left-1/2 top-[17%] w-px bg-slate-300" />
        <div className="absolute left-[23%] top-[24%] h-px w-[54%] rotate-45 bg-slate-300" />
        <div className="absolute left-[23%] bottom-[24%] h-px w-[54%] -rotate-45 bg-slate-300" />

        <RelationshipNode className="left-[5%] top-[45%]">
          Entities
        </RelationshipNode>
        <RelationshipNode className="left-[35%] top-[6%]">
          Resolutions
        </RelationshipNode>
        <RelationshipNode className="right-[4%] top-[34%]">
          Implementation
        </RelationshipNode>
        <RelationshipNode className="right-[13%] bottom-[8%]">
          Registers
        </RelationshipNode>
        <RelationshipNode className="left-[34%] bottom-[5%]">
          Certified Copies
        </RelationshipNode>
        <RelationshipNode className="left-[3%] bottom-[23%]">
          Forms
        </RelationshipNode>
      </div>
    </section>
  );
}

export function LifecycleFlowPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <PanelTitle>Lifecycle Flow</PanelTitle>

      <div className="mt-4 rounded-lg bg-slate-950 px-5 py-5 text-white">
        <div className="flex items-center justify-between gap-3">
          {lifecycleItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.code} className="flex min-w-0 flex-1 items-center">
                <div className="flex min-w-[74px] flex-1 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/80 bg-slate-900">
                    <Icon className="h-4 w-4 text-slate-100" />
                  </div>

                  <p className="mt-2 text-[11px] font-bold text-amber-400">
                    {item.code}
                  </p>

                  <p className="text-center text-[10px] leading-3 text-slate-200">
                    {item.label}
                  </p>
                </div>

                {index < lifecycleItems.length - 1 && (
                  <div className="mx-1 h-px flex-1 bg-slate-500/60" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-dashed border-slate-600 pt-4">
          {lifecycleBranches.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.code} className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-500 bg-slate-900">
                  <Icon className="h-4 w-4 text-slate-200" />
                </div>

                <p className="mt-2 text-[11px] font-bold text-amber-400">
                  {item.code}
                </p>

                <p className="text-center text-[10px] text-slate-300">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PlannedModulePagesPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <PanelTitle>Planned Module Pages</PanelTitle>

      <div className="mt-4 grid gap-2">
        {eglModuleRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="flex items-center gap-2 rounded border border-slate-400 bg-white px-3 py-2 text-[11px] text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
          >
            <FolderArchive className="h-3.5 w-3.5 shrink-0 text-amber-500" />
            <span className="truncate">{route.href}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function EGLKnowledgePanels() {
  return (
    <section className="grid gap-4 xl:grid-cols-[0.8fr_0.8fr_1.1fr]">
      <DocumentStatusCodesPanel />
      <KeyPrinciplesPanel />
      <RelationshipsPanel />
    </section>
  );
}

function PanelTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
      {children}
    </h2>
  );
}

function RelationshipNode({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div
      className={`absolute z-30 rounded-full border border-amber-400 bg-white px-2 py-1 text-center text-[9px] font-bold text-slate-950 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}