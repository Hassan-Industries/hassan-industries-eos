"use client";

import Link from "next/link";
import type { ElementType } from "react";
import {
  BookOpen,
  FileCheck2,
  FilePlus2,
  FolderOpen,
  Gavel,
  Upload,
} from "lucide-react";

type QuickAction = {
  label: string;
  href: string;
  icon: ElementType;
  primary?: boolean;
};

const quickActions: QuickAction[] = [
  {
    label: "Create New Publication",
    href: "/governance-library/publications/new",
    icon: FilePlus2,
    primary: true,
  },
  {
    label: "Create New Resolution",
    href: "/governance-library/resolutions/new",
    icon: Gavel,
  },
  {
    label: "Upload Document",
    href: "/governance-library/service-requests",
    icon: Upload,
  },
  {
    label: "Create Certified Copy",
    href: "/governance-library/certified-copies",
    icon: FileCheck2,
  },
  {
    label: "Forms & Templates",
    href: "/governance-library/forms-templates",
    icon: BookOpen,
  },
  {
    label: "View Registers",
    href: "/governance-library/registers",
    icon: FolderOpen,
  },
];

export default function EGLQuickActions() {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#94a3b8]">
          HCA Controls
        </p>
        <h2 className="text-2xl font-black uppercase tracking-[0.24em] text-[#050816]">
          Quick Actions
        </h2>
      </div>

      <div className="mt-6 space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className={[
                "flex min-h-12 w-full items-center justify-center gap-3 rounded-lg border px-4 py-3 text-center text-sm font-black leading-5 transition",
                action.primary
                  ? "border-[#050816] bg-[#050816] text-white hover:border-[#ff8a00] hover:bg-[#111827] [&_span]:text-white"
                  : "border-[#c8d3df] bg-white text-[#050816] hover:border-[#ff8a00] hover:bg-[#fffaf0]",
              ].join(" ")}
            >
              <Icon
                size={16}
                className={action.primary ? "text-[#ffbf00]" : "text-[#ff8a00]"}
              />
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg border border-dashed border-[#c8d3df] bg-[#f8fafc] p-4 text-xs font-semibold leading-6 text-[#536783]">
        Quick actions are frontend routing controls. Backend authority, workflow
        submission, document storage, approval routing, and recordkeeping will be
        added in later EGL phases.
      </div>
    </section>
  );
}