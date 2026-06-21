import Link from "next/link";
import {
  ArrowLeft,
  ClipboardCopy,
  Clock3,
  FileClock,
  FolderOpen,
  History,
  Route,
  Send,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";


import CopyToClipboardButton from "@/components/governance-library/CopyToClipboardButton";
import type { ServiceRequestRecord } from "@/data/serviceRequests";

type ServiceRequestActionWorkspaceProps = {
  request: ServiceRequestRecord;
};

const actionControls = [
  {
    label: "Route Request",
    description:
      "Prepare this request for future routing to the assigned queue, owner, or department desk.",
    icon: Route,
  },
  {
    label: "Assign Owner",
    description:
      "Prepare owner assignment controls for future backend workflow ownership.",
    icon: UserRoundCheck,
  },
  {
    label: "Request HCA Review",
    description:
      "Prepare HCA review routing where governance, records, restricted handling, or document control is involved.",
    icon: ShieldCheck,
  },
  {
    label: "Mark Pending Routing",
    description:
      "Prepare status transition controls for requests that need routing before action.",
    icon: Send,
  },
  {
    label: "View Request History",
    description:
      "Prepare future audit history review for request activity, comments, routing, and status changes.",
    icon: History,
  },
  {
    label: "Prepare Filing Action",
    description:
      "Prepare recordkeeping, filing, or evidence-control action before completion.",
    icon: FileClock,
  },
];

export default function ServiceRequestActionWorkspace({
  request,
}: ServiceRequestActionWorkspaceProps) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
          <ClipboardCopy size={24} />
        </div>

        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
            Request Actions
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#050816]">
            Action Controls
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#33445c]">
            Select an action to preview purpose, authority, next step, and
            future backend handoff. These controls do not mutate records yet.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <CopyToClipboardButton
          value={request.id}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          <ClipboardCopy size={16} className="text-[#ff8a00]" />
          Copy Request ID
        </CopyToClipboardButton>

        {request.relatedRecordHref ? (
          <Link
            href={request.relatedRecordHref}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#050816] px-4 text-sm font-black text-white transition hover:bg-[#101827]"
          >
            <FolderOpen size={16} className="text-[#ffbf00]" />
            Open Related Record
          </Link>
        ) : null}

        <Link
          href={`/service-requests/queues/${request.routingQueueId}`}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          <Route size={16} className="text-[#ff8a00]" />
          Open Assigned Queue
        </Link>

        {actionControls.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.label}
              className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                  <Icon size={18} />
                </div>

                <div>
                  <p className="text-sm font-black text-[#050816]">
                    {action.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#52627a]">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <Link
          href="/service-requests"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          <ArrowLeft size={16} className="text-[#ff8a00]" />
          Return to Service Requests Desk
        </Link>
      </div>

      <div className="mt-5 rounded-lg border border-[#ffbf00] bg-[#fff7e6] p-4">
        <div className="flex items-start gap-3">
          <Clock3 size={18} className="mt-1 shrink-0 text-[#ff8a00]" />
          <p className="text-sm font-bold leading-6 text-[#9a4a00]">
            Frontend-only action workspace. No backend routing, assignment,
            notification, approval, upload, audit event, or status mutation is
            created in this phase.
          </p>
        </div>
      </div>
    </section>
  );
}