import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ClipboardCheck,
  ClipboardList,
  FileText,
  FolderOpen,
  History,
  Route,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  getServiceRequestById,
  serviceRequestRecords,
  type ServiceRequestPriority,
  type ServiceRequestRecord,
  type ServiceRequestStatus,
  type ServiceRequestTimelineStatus,
} from "@/data/serviceRequests";

type ServiceRequestDetailPageProps = {
  params: Promise<{
    requestId: string;
  }>;
};

export function generateStaticParams() {
  return serviceRequestRecords.map((request) => ({
    requestId: request.id,
  }));
}

function getStatusPillClass(status: ServiceRequestStatus) {
  switch (status) {
    case "Open":
      return "bg-emerald-100 text-emerald-700";
    case "In Review":
      return "bg-blue-100 text-blue-700";
    case "Pending Routing":
      return "bg-amber-100 text-amber-700";
    case "Restricted Review":
      return "bg-rose-100 text-rose-700";
    case "Closed":
      return "bg-slate-200 text-slate-600";
    default:
      return "bg-slate-200 text-slate-600";
  }
}

function getPriorityPillClass(priority: ServiceRequestPriority) {
  switch (priority) {
    case "Normal":
      return "bg-slate-100 text-slate-700";
    case "High":
      return "bg-amber-100 text-amber-700";
    case "Restricted":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getTimelinePillClass(status: ServiceRequestTimelineStatus) {
  switch (status) {
    case "Complete":
      return "bg-emerald-100 text-emerald-700";
    case "Current":
      return "bg-blue-100 text-blue-700";
    case "Restricted":
      return "bg-rose-100 text-rose-700";
    case "Pending":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#d8e1ea] py-3 text-sm last:border-b-0">
      <span className="font-bold text-[#64748b]">{label}</span>
      <span className="max-w-[260px] text-right font-black text-[#050816]">
        {value}
      </span>
    </div>
  );
}

function InfoPanel({
  icon: Icon,
  title,
  rows,
}: {
  icon: LucideIcon;
  title: string;
  rows: [string, string][];
}) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="text-xl font-black uppercase tracking-[0.25em] text-[#050816]">
          {title}
        </h3>
      </div>

      <div>
        {rows.map(([label, value]) => (
          <DetailRow key={label} label={label} value={value} />
        ))}
      </div>
    </section>
  );
}

function RequestHeader({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
            <ClipboardList className="h-7 w-7" />
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
              Service Request Record
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#050816]">
              {request.id}
            </h2>
            <p className="mt-2 text-lg font-black text-[#050816]">
              {request.title}
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[#33445c]">
              {request.summary}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={[
              "rounded-lg px-4 py-2 text-xs font-black",
              getStatusPillClass(request.status),
            ].join(" ")}
          >
            {request.status}
          </span>

          <span
            className={[
              "rounded-lg px-4 py-2 text-xs font-black",
              getPriorityPillClass(request.priority),
            ].join(" ")}
          >
            {request.priority}
          </span>
        </div>
      </div>
    </section>
  );
}

function ChecklistPanel({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
          <ClipboardCheck className="h-6 w-6" />
        </div>

        <h3 className="text-xl font-black uppercase tracking-[0.25em] text-[#050816]">
          Control Checklist
        </h3>
      </div>

      <div className="space-y-3">
        {request.checklist.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4 text-sm font-black text-[#050816]"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelinePanel({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
          <History className="h-6 w-6" />
        </div>

        <h3 className="text-xl font-black uppercase tracking-[0.25em] text-[#050816]">
          Routing Timeline
        </h3>
      </div>

      <div className="space-y-3">
        {request.timeline.map((item) => (
          <div
            key={`${item.label}-${item.date}`}
            className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-black text-[#050816]">{item.label}</p>
              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-black",
                  getTimelinePillClass(item.status),
                ].join(" ")}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-xs font-black text-[#64748b]">
              {item.date}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#33445c]">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function ServiceRequestDetailPage({
  params,
}: ServiceRequestDetailPageProps) {
  const { requestId } = await params;
  const request = getServiceRequestById(requestId);

  if (!request) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1680px] space-y-6">
      <section className="rounded-xl bg-[#050816] p-6 text-white shadow-sm lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#ffbf00]">
              Hassan Industries
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-tight lg:text-4xl">
              Service Request Detail
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
              Controlled request workspace for reviewing intake authority,
              routing stage, assigned ownership, related records,
              restricted-review handling, and frontend action controls.
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-[#101827] px-8 py-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
              Request Status
            </p>
            <p className="mt-3 text-3xl font-black text-[#ffbf00]">
              {request.status}
            </p>
            <p className="mt-1 text-xs font-black text-white">
              {request.stage}
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/service-requests" className="service-button">
          <ArrowLeft size={16} className="text-[#ff8a00]" />
          Back to Service Requests Desk
        </Link>

        <Link href="/service-requests/queues" className="service-button">
          <Route size={16} className="text-[#ff8a00]" />
          Routing Queues
        </Link>

        <Link href="/" className="service-button">
          <FolderOpen size={16} className="text-[#ff8a00]" />
          Dashboard
        </Link>
      </div>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled Request Workspace
      </p>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-6">
          <RequestHeader request={request} />

          <div className="grid gap-6 lg:grid-cols-2">
            <InfoPanel
              icon={ShieldCheck}
              title="Request Authority"
              rows={[
                ["Requester", request.requester],
                ["Department", request.department],
                ["Owner", request.owner],
                ["Assigned Queue", request.assignedQueue],
                ["Access Scope", request.accessScope],
                ["Retention", request.retention],
              ]}
            />

            <InfoPanel
              icon={Route}
              title="Routing Metadata"
              rows={[
                ["Status", request.status],
                ["Priority", request.priority],
                ["Stage", request.stage],
                ["Due Date", request.dueDate],
                ["Intake Channel", request.intakeChannel],
                ["Restricted Review", request.restrictedReview ? "Yes" : "No"],
              ]}
            />
          </div>

          <ChecklistPanel request={request} />
          <TimelinePanel request={request} />
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                  Request Relationships
                </p>
                <h3 className="mt-2 text-xl font-black uppercase tracking-[0.2em] text-[#050816]">
                  Related Record
                </h3>
              </div>
            </div>

            <DetailRow label="Record" value={request.relatedRecord} />
            <DetailRow label="Title" value={request.relatedRecordTitle} />
            <DetailRow label="Type" value={request.relatedRecordType} />
            <DetailRow label="Requested Action" value={request.requestedAction} />

            <Link
              href={request.relatedRecordHref || "/governance-library"}
              className="service-button-primary mt-5 w-full justify-center"
            >
              Open Related Record
            </Link>
          </section>

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <Route className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                  Request Actions
                </p>
                <h3 className="mt-2 text-xl font-black uppercase tracking-[0.2em] text-[#050816]">
                  Action Controls
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href={`/service-requests/queues/${request.routingQueueId}`}
                className="service-button-primary w-full justify-center"
              >
                Open Assigned Queue
              </Link>

              <Link
                href={`/service-requests/new?queue=${request.routingQueueId}`}
                className="service-button w-full justify-center"
              >
                Create Related Request
              </Link>

              <Link
                href="/service-requests"
                className="service-button w-full justify-center"
              >
                Return to Service Requests Desk
              </Link>
            </div>
          </section>

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
              Frontend Only
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#33445c]">
              <li>• Request detail is frontend-only in this phase.</li>
              <li>• No backend assignment is created yet.</li>
              <li>• No approval route is enforced yet.</li>
              <li>• No comments or attachments are saved yet.</li>
              <li>• Restricted review requires future role-based access.</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}