import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  FolderOpen,
  History,
  Route,
  ShieldCheck,
} from "lucide-react";
import type { ServiceRequestRecord } from "@/data/serviceRequests";

type ServiceRequestActionWorkspaceProps = {
  request: ServiceRequestRecord;
};

type ActionItem = {
  label: string;
  href: string;
  icon: typeof ArrowRight;
  primary?: boolean;
};

const actionItems: ActionItem[] = [
  {
    label: "Open Related Record",
    href: "",
    icon: FileText,
    primary: true,
  },
  {
    label: "Open Assigned Queue",
    href: "",
    icon: Route,
  },
  {
    label: "Review Request History",
    href: "",
    icon: History,
  },
  {
    label: "Return to Service Requests",
    href: "/service-requests",
    icon: FolderOpen,
  },
];

export default function ServiceRequestActionWorkspace({
  request,
}: ServiceRequestActionWorkspaceProps) {
  const resolvedActions = actionItems.map((action) => {
    if (action.label === "Open Related Record") {
      return {
        ...action,
        href: request.relatedRecordHref || "/governance-library",
      };
    }

    if (action.label === "Open Assigned Queue") {
      return {
        ...action,
        href: `/service-requests/queues/${request.routingQueueId}`,
      };
    }

    if (action.label === "Review Request History") {
      return {
        ...action,
        href: `/service-requests/${request.id}`,
      };
    }

    return action;
  });

  return (
    <aside className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffc400]">
            <ClipboardCheck size={23} />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
              Request Actions
            </p>
            <h2 className="mt-2 text-2xl font-black">Action Controls</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Select an action to review purpose, authority, routing path,
              related record, and future backend handoff. These controls do not
              mutate records yet.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {resolvedActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.label}
                href={action.href}
                className={[
                  "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-black transition",
                  action.primary
                    ? "bg-[#050816] text-white hover:bg-[#111827]"
                    : "border border-slate-300 bg-white text-[#050816] hover:border-[#ff8a00] hover:bg-amber-50",
                ].join(" ")}
              >
                <Icon
                  size={16}
                  className={action.primary ? "text-[#ffc400]" : "text-[#ff8a00]"}
                />
                {action.label}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffc400]">
            <ShieldCheck size={23} />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
              Control Notes
            </p>
            <h3 className="mt-2 text-xl font-black uppercase tracking-[0.2em]">
              Frontend Only
            </h3>
          </div>
        </div>

        <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
          <li>• Request detail is frontend-only in this phase.</li>
          <li>• No backend assignment is created yet.</li>
          <li>• No approval route is enforced yet.</li>
          <li>• No comments or attachments are saved yet.</li>
          <li>
            • Restricted HCA/HCP review controls require future role-based
            access.
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffc400]">
            <Route size={23} />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
              Routing Snapshot
            </p>
            <h3 className="mt-2 text-xl font-black uppercase tracking-[0.2em]">
              Current Path
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-0">
          <DetailRow label="Request ID" value={request.id} />
          <DetailRow label="Assigned Queue" value={request.assignedQueue} />
          <DetailRow label="Owner" value={request.owner} />
          <DetailRow label="Priority" value={request.priority} />
          <DetailRow label="Stage" value={request.stage} />
        </div>
      </section>
    </aside>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-3 text-sm">
      <span className="font-bold text-slate-500">{label}</span>
      <span className="text-right font-black text-[#050816]">{value}</span>
    </div>
  );
}