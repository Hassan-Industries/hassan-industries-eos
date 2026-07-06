"use client";

import Link from "next/link";
import type { ElementType } from "react";
import {
  BookOpen,
  FileCheck2,
  FilePlus2,
  FolderOpen,
  ScrollText,
  Upload,
} from "lucide-react";

type QuickAction = {
  label: string;
  href: string;
  icon: ElementType;
  primary: boolean;
};

const quickActions: QuickAction[] = [
  {
    label: "Create New Publication",
    href: "/governance-library/publications/new",
    icon: FilePlus2,
    primary: true,
  },
  {
    label: "New Resolution",
    href: "/governance-library/registers/resolutions",
    icon: ScrollText,
    primary: false,
  },
  {
    label: "Upload Document",
    href: "/governance-library/publications/HI-ADM-001/upload-replacement",
    icon: Upload,
    primary: false,
  },
  {
    label: "Create Certified Copy",
    href: "/governance-library/registers/certified-copies",
    icon: FileCheck2,
    primary: false,
  },
  {
    label: "Forms & Templates",
    href: "/governance-library/registers/forms-templates",
    icon: BookOpen,
    primary: false,
  },
  {
    label: "View Registers",
    href: "/governance-library/registers",
    icon: FolderOpen,
    primary: false,
  },
];

export default function EGLQuickActions() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl font-black uppercase leading-7 tracking-[0.22em] text-[#050816]">
          Quick
          <br />
          Actions
        </h2>
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[#94a3b8]">
          HCA
          <br />
          Controls
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className={[
                "flex h-12 w-full items-center justify-center gap-3 rounded-lg border px-4 text-sm font-black transition",
                action.primary
                  ? "border-[#050816] bg-[#050816] text-white hover:border-[#ff8a00] hover:bg-[#111827]"
                  : "border-slate-300 bg-white text-[#050816] hover:border-[#ff8a00] hover:bg-amber-50",
              ].join(" ")}
            >
              <Icon size={16} className="text-[#ff8a00]" />
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-xs font-semibold leading-6 text-[#536783]">
        Quick actions are frontend routing controls. Backend authority,
        workflow submission, document storage, approval routing, and
        recordkeeping will be added in later EGL phases.
      </div>
    </section>
  );
}