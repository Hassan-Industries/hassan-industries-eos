import {
  BookOpen,
  ClipboardList,
  FilePlus2,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";

interface EGLSelectionPlaceholderProps {
  context?: "dashboard" | "registry";
}

export default function EGLSelectionPlaceholder({
  context = "dashboard",
}: EGLSelectionPlaceholderProps) {
  const isRegistry = context === "registry";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
            {isRegistry ? "Registry Preview" : "Document Profile"}
          </p>

          <h2 className="mt-2 text-lg font-extrabold text-slate-950">
            No Record Selected
          </h2>

          <p className="mt-2 text-xs leading-5 text-slate-600">
            Select a controlled publication record to open its profile,
            metadata, authority, lifecycle status, and available EGL actions.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <MousePointerClick className="h-5 w-5 text-amber-400" />
        </div>
      </div>

      <div className="rounded-lg bg-slate-950 p-4 text-white">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-amber-400" />

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-300">
              Controlled Publication Workspace
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-200">
              Profiles open only after intentional record selection.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <PlaceholderItem
          icon={ClipboardList}
          title="Select a Record"
          description="Choose a publication from the registry or recently updated table."
        />

        <PlaceholderItem
          icon={ShieldCheck}
          title="Review Authority"
          description="Verify owner, authority, classification, status, and lifecycle metadata."
        />

        <PlaceholderItem
          icon={FilePlus2}
          title="Use Record Actions"
          description="Open the viewer, upload replacement, certify a copy, request review, or view revision history."
        />
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Training Note
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-600">
          This panel is intentionally neutral until a record is selected. Future
          employee and executive training should describe this as the safe
          starting state before performing controlled publication actions.
        </p>
      </div>
    </section>
  );
}

function PlaceholderItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-slate-200">
          <Icon className="h-4 w-4 text-amber-600" />
        </div>

        <div>
          <p className="text-xs font-extrabold text-slate-950">{title}</p>
          <p className="mt-1 text-[11px] leading-4 text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}