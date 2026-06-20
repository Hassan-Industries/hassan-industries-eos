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
    href: "/governance-library/resolutions/new",
    icon: ScrollText,
    primary: false,
  },
  {
    label: "Upload Document",
    href: "/governance-library/publications",
    icon: Upload,
    primary: false,
  },
  {
    label: "Create Certified Copy",
    href: "/governance-library/certified-copies/new",
    icon: FileCheck2,
    primary: false,
  },
  {
    label: "Forms & Templates",
    href: "/governance-library/forms-templates",
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
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-extrabold uppercase leading-5 tracking-[0.22em] text-slate-950">
            Quick
            <br />
            Actions
          </h2>
        </div>

        <p className="text-right text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
          HCA
          <br />
          Controls
        </p>
      </div>

      <div className="space-y-2">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className={[
                "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-xs font-bold transition",
                action.primary
                  ? "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
                  : "border-slate-300 bg-white text-slate-950 hover:border-amber-500 hover:bg-amber-50",
              ].join(" ")}
            >
              <Icon
                className={[
                  "h-4 w-4 shrink-0",
                  action.primary ? "text-amber-400" : "text-amber-600",
                ].join(" ")}
              />
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-[11px] leading-5 text-slate-600">
          Quick actions are frontend routing controls. Backend authority,
          workflow submission, document storage, approval routing, and
          recordkeeping will be added in later EGL phases.
        </p>
      </div>
    </section>
  );
}