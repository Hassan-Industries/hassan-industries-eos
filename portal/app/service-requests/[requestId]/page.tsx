import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  FileText,
  History,
  Route,
  ShieldCheck,
} from "lucide-react";

import EOCPageShell from "@/components/layout/EOCPageShell";
import {
  getServiceRequestById,
  serviceRequestRecords,
  type ServiceRequestPriority,
  type ServiceRequestRecord,
  type ServiceRequestStatus,
  type ServiceRequestTimelineStatus,
} from "@/data/serviceRequests";

import ServiceRequestActionWorkspace from "./ServiceRequestActionWorkspace";

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
    <EOCPageShell>
      <section className="rounded-xl bg-[#050816] p-6 text-white shadow-md sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.55em] text-[#ffbf00]">
              Hassan Industries
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
              Service Request Detail
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
              Controlled request workspace for reviewing intake authority,
              routing stage, assigned ownership, related records,
              restricted-review handling, and frontend action controls.
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-white/5 p-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em]">
              Request Status
            </p>
            <p className="mt-4 text-3xl font-black text-[#ffbf00]">
              {request.status}
            </p>
            <p className="mt-1 text-xs font-black">{request.stage}</p>
          </div>
        </div>
      </section>

      <nav className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/service-requests"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          <ArrowLeft size={16} className="text-[#ff8a00]" />
          Back to Service Requests Desk
        </Link>

        <Link
          href="/service-requests/queues"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          <Route size={16} className="text-[#ff8a00]" />
          Routing Queues
        </Link>

        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          <ClipboardList size={16} className="text-[#ff8a00]" />
          Dashboard
        </Link>
      </nav>

      <p className="mt-7 text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled Request Workspace
      </p>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-5">
          <RequestHeader request={request} />

          <div className="grid gap-5 lg:grid-cols-2">
            <InfoPanel
              icon={<ShieldCheck size={26} />}
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
              icon={<Route size={26} />}
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

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <FileText size={24} />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Request Relationships
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Related Record & Requested Action
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#33445c]">
                  Related source record, service category, requested action, and
                  record linkage for future workflow routing.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <RelationshipCard
                label="Related Record"
                value={request.relatedRecord}
                subvalue={request.relatedRecordTitle}
              />
              <RelationshipCard
                label="Related Record Type"
                value={request.relatedRecordType}
                subvalue={request.category}
              />
              <RelationshipCard
                label="Requested Action"
                value={request.requestedAction}
                subvalue={request.classification}
              />
              <RelationshipCard
                label="Routing Note"
                value={request.routingNote}
                subvalue="Future routing rules should attach backend workflow authority."
              />
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <ChecklistPanel request={request} />
            <TimelinePanel request={request} />
          </div>
        </div>

        <aside className="min-w-0 space-y-5">
          <ServiceRequestActionWorkspace request={request} />

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <PanelTitle
              icon={<ClipboardCheck size={24} />}
              eyebrow="Control Notes"
              title="Frontend Only"
            />
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#33445c]">
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

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <PanelTitle
              icon={<History size={24} />}
              eyebrow="Training Note"
              title="Operational Use"
            />
            <p className="mt-5 text-sm leading-7 text-[#33445c]">
              Employees and executives should treat each service request detail
              page as the controlled review workspace for request routing,
              ownership confirmation, related record lookup, escalation, action
              selection, and future audit history.
            </p>
          </section>
        </aside>
      </div>
    </EOCPageShell>
  );
}

function RequestHeader({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
            <ClipboardList size={24} />
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
              Service Request Record
            </p>
            <h2 className="mt-2 text-3xl font-black">{request.id}</h2>
            <p className="mt-2 text-lg font-black">{request.title}</p>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[#33445c]">
              {request.summary}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
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
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <PanelTitle icon={icon} eyebrow="Controlled Metadata" title={title} />

      <div className="mt-6 divide-y divide-[#d8e1ea]">
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
    <div className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-5">
      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#94a3b8]">
        {label}
      </p>
      <p className="mt-3 text-sm font-black text-[#050816]">{value}</p>
      <p className="mt-2 text-xs font-semibold leading-6 text-[#62708a]">
        {subvalue}
      </p>
    </div>
  );
}

function ChecklistPanel({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <PanelTitle
        icon={<CheckCircle2 size={24} />}
        eyebrow="Control Checklist"
        title="Request Readiness"
      />

      <div className="mt-6 space-y-3">
        {request.checklist.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-[#d8e1ea] bg-white p-4 text-sm font-black"
          >
            <CheckCircle2 size={16} className="text-[#ff8a00]" />
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
      <PanelTitle
        icon={<History size={24} />}
        eyebrow="Routing Timeline"
        title="Request History"
      />

      <div className="mt-6 space-y-3">
        {request.timeline.map((item) => (
          <div
            key={`${item.label}-${item.status}`}
            className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className="text-sm font-black">{item.label}</p>
              <span
                className={`rounded-md px-3 py-1 text-xs font-black ${getTimelinePillClass(
                  item.status,
                )}`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.35em] text-[#94a3b8]">
              {item.date}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#33445c]">{item.note}</p>
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
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black">{title}</h2>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-3 text-sm">
      <span className="font-bold text-[#62708a]">{label}</span>
      <span className="text-right font-black text-[#050816]">{value}</span>
    </div>
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