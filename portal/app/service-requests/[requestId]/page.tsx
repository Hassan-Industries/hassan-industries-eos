import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  ExternalLink,
  FileText,
  FolderOpen,
  History,
  LockKeyhole,
  Route,
  Send,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import CopyToClipboardButton from "@/components/governance-library/CopyToClipboardButton";
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
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl border border-slate-950 bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] text-amber-400">
                    Hassan Industries
                  </p>
                  <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">
                    Service Request Detail
                  </h1>
                  <p className="mt-3 max-w-5xl text-sm font-medium leading-6 text-white">
                    Controlled request workspace for reviewing intake
                    authority, routing stage, assigned ownership, related
                    records, restricted-review handling, and future workflow
                    actions.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
                    Request Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    {request.status}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white">
                    {request.stage}
                  </p>
                </div>
              </div>
            </section>

            <nav className="flex flex-wrap items-center gap-3">
              <Link
                href="/service-requests"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-500" />
                Back to Service Requests Desk
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <FolderOpen className="h-4 w-4 text-amber-500" />
                Dashboard
              </Link>
            </nav>

            <p className="text-right text-[12px] font-black uppercase tracking-[0.45em] text-slate-400">
              Controlled Request Workspace
            </p>

            <section className="grid gap-4 xl:grid-cols-[1fr_390px]">
              <div className="space-y-4">
                <RequestHeader request={request} />

                <section className="grid gap-4 lg:grid-cols-2">
                  <InfoPanel
                    icon={<ShieldCheck className="h-5 w-5 text-amber-400" />}
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
                    icon={<Route className="h-5 w-5 text-amber-400" />}
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
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <FileText className="h-5 w-5 text-amber-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
                        Request Relationships
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Related source record, service category, requested
                        action, and record linkage for future workflow routing.
                      </p>

                      <div className="mt-5 grid gap-3 md:grid-cols-2">
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
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <ChecklistPanel request={request} />
                  <TimelinePanel request={request} />
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <LockKeyhole className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
                        Backend Readiness
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        This service request detail workspace is frontend-only.
                        Later backend phases should connect it to authenticated
                        requester identity, role-based permissions, comments,
                        attachments, approval routing, assignment history,
                        status transitions, escalation paths, and permanent
                        service request records.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <RequestActionsPanel request={request} />

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
                        Control Notes
                      </h3>
                      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                        <li>• Request detail is frontend-only in this phase.</li>
                        <li>• No backend assignment is created yet.</li>
                        <li>• No approval route is enforced yet.</li>
                        <li>• No comments or attachments are saved yet.</li>
                        <li>
                          • Restricted HCA review controls require future
                          role-based access.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <UserRoundCheck className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
                        Training Note
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        Employees and executives should treat each service
                        request detail page as the controlled review workspace
                        for request routing, ownership confirmation, related
                        record lookup, escalation, and future audit history.
                      </p>
                    </div>
                  </div>
                </section>
              </aside>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function RequestHeader({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950">
            <ClipboardList className="h-7 w-7 text-amber-400" />
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-400">
              Service Request Record
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">
              {request.id}
            </h2>
            <p className="mt-2 text-base font-black text-slate-950">
              {request.title}
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
              {request.summary}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={[
              "rounded-md px-3 py-1 text-xs font-black",
              getStatusPillClass(request.status),
            ].join(" ")}
          >
            {request.status}
          </span>
          <span
            className={[
              "rounded-md px-3 py-1 text-xs font-black",
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

function InfoPanel({
  icon,
  title,
  rows,
}: {
  icon: React.ReactNode;
  title: string;
  rows: [string, string][];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          {icon}
        </div>
        <h2 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
          {title}
        </h2>
      </div>

      <div className="mt-5">
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
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-sm font-black text-slate-950">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{subvalue}</p>
    </div>
  );
}

function ChecklistPanel({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <ClipboardCheck className="h-5 w-5 text-amber-400" />
        </div>
        <h2 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
          Control Checklist
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {request.checklist.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-sm font-bold text-slate-950">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelinePanel({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <History className="h-5 w-5 text-amber-400" />
        </div>
        <h2 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
          Routing Timeline
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {request.timeline.map((item) => (
          <div
            key={`${item.label}-${item.status}`}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-slate-950">
                  {item.label}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {item.note}
                </p>
              </div>

              <span
                className={[
                  "shrink-0 rounded-md px-3 py-1 text-[11px] font-black",
                  getTimelinePillClass(item.status),
                ].join(" ")}
              >
                {item.status}
              </span>
            </div>

            <p className="mt-3 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              {item.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RequestActionsPanel({ request }: { request: ServiceRequestRecord }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
        Request Actions
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Frontend controls prepared for future routing, assignment, review,
        escalation, attachment, and recordkeeping workflows.
      </p>

      <div className="mt-5 space-y-2">
        <CopyToClipboardButton
          value={request.id}
          label="Copy Request ID"
          copiedLabel="Request ID Copied"
        />

        <Link
          href={request.relatedRecordHref}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
        >
          <ExternalLink className="h-4 w-4 text-amber-400" />
          Open Related Record
        </Link>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <Route className="h-4 w-4 text-amber-500" />
          Route Request
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <UserRoundCheck className="h-4 w-4 text-amber-500" />
          Assign Owner
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <ShieldCheck className="h-4 w-4 text-amber-500" />
          Request HCA Review
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <Send className="h-4 w-4 text-amber-500" />
          Mark Pending Routing
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <History className="h-4 w-4 text-amber-500" />
          View Request History
        </button>

        <Link
          href="/service-requests"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <ArrowLeft className="h-4 w-4 text-amber-500" />
          Return to Service Requests Desk
        </Link>
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-3 text-sm">
      <span className="font-bold text-slate-500">{label}</span>
      <span className="text-right font-black text-slate-950">{value}</span>
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
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
}