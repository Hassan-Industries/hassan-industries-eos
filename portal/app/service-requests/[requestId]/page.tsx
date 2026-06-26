import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  ClipboardList,
  FileText,
  History,
  Route,
  ShieldCheck,
} from "lucide-react";
import ServiceRequestWorkspaceFrame from "@/components/service-requests/ServiceRequestWorkspaceFrame";
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

export default async function ServiceRequestDetailPage({
  params,
}: ServiceRequestDetailPageProps) {
  const { requestId } = await params;
  const request = getServiceRequestById(requestId);

  if (!request) {
    notFound();
  }

  return (
    <ServiceRequestWorkspaceFrame>
      <section className="rounded-xl bg-[#050816] p-8 text-white shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.45em] text-[#ffc400]">
              Hassan Industries
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase">
              Service Request Detail
            </h1>
            <p className="mt-4 max-w-5xl text-sm leading-7 text-white">
              Controlled request workspace for reviewing intake authority,
              routing stage, assigned ownership, related records,
              restricted-review handling, and frontend action controls.
            </p>
          </div>

          <div className="rounded-lg border border-[#ff8a00] bg-white/5 px-10 py-7 text-center">
            <p className="text-xs font-black uppercase tracking-[0.35em]">
              Request Status
            </p>
            <p className="mt-4 text-2xl font-black text-[#ffc400]">
              {request.status}
            </p>
            <p className="mt-1 text-xs font-black">{request.stage}</p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/service-requests" className="service-button">
          <ArrowLeft size={16} />
          Back to Service Requests Desk
        </Link>
        <Link href="/service-requests/queues" className="service-button">
          <Route size={16} />
          Routing Queues
        </Link>
        <Link href="/" className="service-button">
          Dashboard
        </Link>
      </div>

      <p className="mt-8 text-right text-xs font-black uppercase tracking-[0.45em] text-slate-400">
        Controlled Request Workspace
      </p>

      <section className="mt-4 grid gap-5 xl:grid-cols-[1fr_390px]">
        <div className="space-y-5">
          <RequestHeader request={request} />

          <div className="grid gap-5 lg:grid-cols-2">
            <InfoPanel
              icon={<ShieldCheck size={23} />}
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
              icon={<Route size={23} />}
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

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <PanelTitle
              icon={<FileText size={23} />}
              eyebrow="Request Relationships"
              title="Related Record & Requested Action"
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <RelationshipCard
                label="Related Record"
                value={request.relatedRecord}
                subvalue={request.relatedRecordTitle}
              />
              <RelationshipCard
                label="Reference Type"
                value={request.relatedRecordType}
                subvalue={request.relatedRecordHref}
              />
              <RelationshipCard
                label="Requested Action"
                value={request.requestedAction}
                subvalue="Prepared for future workflow routing"
              />
              <RelationshipCard
                label="Routing Note"
                value={request.routingNote}
                subvalue="Frontend routing control"
              />
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <ChecklistPanel request={request} />
            <TimelinePanel request={request} />
          </div>
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <PanelTitle
              icon={<ClipboardCheck size={23} />}
              eyebrow="Request Actions"
              title="Action Controls"
            />

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Select an action to preview purpose, authority, next step, and
              future backend handoff. These controls do not mutate records yet.
            </p>

            <div className="mt-5 space-y-3">
              <ActionButton href={request.relatedRecordHref}>
                Open Related Record
              </ActionButton>
              <ActionButton href={`/service-requests/queues/${request.routingQueueId}`}>
                Open Assigned Queue
              </ActionButton>
              <ActionButton href="/service-requests/new">
                Create Related Request
              </ActionButton>
              <ActionButton href="/service-requests">
                Return to Service Requests Desk
              </ActionButton>
            </div>
          </section>

          <SideNote
            icon={<ShieldCheck size={23} />}
            eyebrow="Control Notes"
            title="Frontend Only"
          >
            <ul className="space-y-3 text-sm leading-7 text-slate-600">
              <li>• Request detail is frontend-only in this phase.</li>
              <li>• No backend assignment is created yet.</li>
              <li>• No approval route is enforced yet.</li>
              <li>• No comments or attachments are saved yet.</li>
              <li>• Restricted HCA/HCP review controls require future role-based access.</li>
            </ul>
          </SideNote>

          <SideNote
            icon={<ClipboardList size={23} />}
            eyebrow="Training Note"
            title="Operational Use"
          >
            <p className="text-sm leading-7 text-slate-600">
              Employees and executives should treat each service request detail
              page as the controlled review workspace for request routing,
              ownership confirmation, related record lookup, escalation, action
              selection, and future audit history.
            </p>
          </SideNote>
        </aside>
      </section>
    </ServiceRequestWorkspaceFrame>
  );
}

function RequestHeader({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffc400]">
            <ClipboardList size={24} />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
              Service Request Record
            </p>
            <h2 className="mt-2 text-3xl font-black">{request.id}</h2>
            <p className="mt-2 text-lg font-black">{request.title}</p>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
              {request.summary}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <span
            className={`rounded-md px-3 py-2 text-xs font-black ${getStatusPillClass(
              request.status,
            )}`}
          >
            {request.status}
          </span>
          <span
            className={`rounded-md px-3 py-2 text-xs font-black ${getPriorityPillClass(
              request.priority,
            )}`}
          >
            {request.priority}
          </span>
        </div>
      </div>
    </section>
  );
}

function InfoPanel({
  icon,
  title,
  rows,
}: {
  icon: ReactNode;
  title: string;
  rows: [string, string][];
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <PanelTitle icon={icon} eyebrow="Controlled Metadata" title={title} />
      <div className="mt-6">
        {rows.map(([label, value]) => (
          <DetailRow key={label} label={label} value={value} />
        ))}
      </div>
    </section>
  );
}

function RelationshipCard({
  label,
  value,
  subvalue,
}: {
  label: string;
  value: string;
  subvalue: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-sm font-black leading-6">{value}</p>
      <p className="mt-2 text-xs leading-6 text-slate-500">{subvalue}</p>
    </div>
  );
}

function ChecklistPanel({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <PanelTitle
        icon={<ShieldCheck size={23} />}
        eyebrow="Control Checklist"
        title="Request Readiness"
      />
      <div className="mt-6 space-y-3">
        {request.checklist.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black"
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
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <PanelTitle
        icon={<History size={23} />}
        eyebrow="Routing Timeline"
        title="Request History"
      />
      <div className="mt-6 space-y-3">
        {request.timeline.map((item) => (
          <div
            key={`${item.label}-${item.status}`}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-black">{item.label}</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-black ${getTimelinePillClass(
                  item.status,
                )}`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-500">{item.date}</p>
            <p className="mt-2 text-xs leading-6 text-slate-600">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PanelTitle({
  icon,
  eyebrow,
  title,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffc400]">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
          {eyebrow}
        </p>
        <h3 className="text-xl font-black uppercase tracking-[0.2em]">
          {title}
        </h3>
      </div>
    </div>
  );
}

function SideNote({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6 shadow-sm">
      <PanelTitle icon={icon} eyebrow={eyebrow} title={title} />
      <div className="mt-5">{children}</div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-3 text-sm">
      <span className="font-bold text-slate-500">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}

function ActionButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black transition hover:border-[#ff8a00] hover:bg-amber-50"
    >
      {children}
      <ArrowRight size={16} className="text-[#ff8a00]" />
    </Link>
  );
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