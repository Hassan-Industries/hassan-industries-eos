import {
  CopyCheck,
  FilePlus2,
  FolderOpen,
  PackagePlus,
  ScrollText,
  Upload,
} from "lucide-react";

const quickActions = [
  {
    label: "Create New Publication",
    icon: FilePlus2,
  },
  {
    label: "New Resolution",
    icon: ScrollText,
  },
  {
    label: "Upload Document",
    icon: Upload,
  },
  {
    label: "Create Certified Copy",
    icon: CopyCheck,
  },
  {
    label: "Create Implementation Packet",
    icon: PackagePlus,
  },
  {
    label: "View Registers",
    icon: FolderOpen,
  },
];

export default function EGLQuickActions() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 grid grid-cols-[1fr_auto] items-start gap-3">
        <h2 className="text-[13px] font-extrabold uppercase leading-4 tracking-[0.2em] text-slate-950">
          Quick Actions
        </h2>

        <p className="text-right text-[10px] font-extrabold uppercase leading-4 tracking-[0.24em] text-slate-400">
          HCA
          <br />
          Controls
        </p>
      </div>

      <div className="space-y-2">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              className="flex w-full items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-left text-[11px] font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-amber-600" />
              <span className="truncate">{action.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}