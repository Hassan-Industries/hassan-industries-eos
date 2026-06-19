import Link from "next/link";
import {
  ClipboardList,
  FileCheck2,
  FilePlus2,
  FolderOpen,
  PackagePlus,
  ScrollText,
  Upload,
} from "lucide-react";

const quickActions = [
  {
    label: "Create New Publication",
    href: "/governance-library/publications/new",
    icon: FilePlus2,
    primary: true,
  },
  {
    label: "New Resolution",
    href: "/governance-library/resolutions",
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
    href: "/governance-library/certified-copies",
    icon: FileCheck2,
    primary: false,
  },
  {
    label: "Create Implementation Packet",
    href: "/governance-library/templates",
    icon: PackagePlus,
    primary: false,
  },
  {
    label: "View Registers",
    href: "/governance-library/publications",
    icon: FolderOpen,
    primary: false,
  },
];

export default function EGLQuickActions() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
            Quick Actions
          </h2>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          HCA Controls
        </p>
      </div>

      <div className="grid gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-xs font-bold transition ${
                action.primary
                  ? "bg-slate-950 text-white hover:bg-slate-800"
                  : "border border-slate-300 bg-white text-slate-950 hover:border-amber-500 hover:bg-amber-50"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  action.primary ? "text-amber-400" : "text-amber-600"
                }`}
              />
              {action.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3">
        <div className="flex gap-3">
          <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

          <p className="text-[11px] leading-4 text-slate-600">
            Quick actions are frontend routing controls. Backend authority,
            workflow submission, and recordkeeping will be added in later EGL
            phases.
          </p>
        </div>
      </div>
    </section>
  );
}