import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  FolderOpen,
  LockKeyhole,
  Plus,
  Route,
  ShieldCheck,
} from "lucide-react";


import EOCPageShell from "@/components/layout/EOCPageShell";
import {
  getRequestsForQueue,
  getServiceRequestQueueById,
  serviceRequestQueues,
  type ServiceRequestPriority,
  type ServiceRequestQueueRecord,
  type ServiceRequestQueueStatus,
  type ServiceRequestStatus,
} from "@/data/serviceRequests";

type ServiceRequestQueueDetailPageProps = {
  params: Promise<{
    queuesId: string;
  }>;
};

export function generateStaticParams() {
  return serviceRequestQueues.map((queue) => ({
    queuesId: queue.id,
  }));
}

export default async function ServiceRequestQueueDetailPage({
  params,
}: ServiceRequestQueueDetailPageProps) {
  const { queuesId } = await params;
  const queue = getServiceRequestQueueById(queuesId);

  if (!queue) {
    notFound();
  }

  const queueRequests = getRequestsForQueue(queue.id);
  const restrictedCount = queueRequests.filter(
    (request) => request.priority === "Restricted",
  ).length;
  const pendingRoutingCount = queueRequests.filter(
    (request) => request.status === "Pending Routing",
  ).length;
  const openCount = queueRequests.filter(
    (request) => request.status !== "Closed",
  ).length;

  const statCards = [
    {
      label: "Assigned Requests",
      value: queueRequests.length.toString(),
      icon: ClipboardList,
    },
    { label: "Open Items", value: openCount.toString(), icon: FolderOpen },
    {
      label: "Pending Routing",
      value: pendingRoutingCount.toString(),
      icon: Route,
    },
    { label: "Restricted", value: restrictedCount.toString(), icon: LockKeyhole },
  ];

  return (
    <EOCPageShell>
      <section className="rounded-xl bg-[#050816] p-6 text-white shadow-md sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.55em] text-[#ffbf00]">
              Hassan Industries
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
              {queue.title}
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
              {queue.summary}
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-white/5 p-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em]">
              Queue Status
            </p>
            <p className="mt-4 text-3xl font-black text-[#ffbf00]">
              {queue.status}
            </p>
            <p className="mt-1 text-xs font-black">{queue.department}</p>
          </div>
        </div>
      </section>

      <nav className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/service-requests/queues"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          <ArrowLeft size={16} className="text-[#ff8a00]" />
          Back to Routing Queues
        </Link>

        <Link
          href="/service-requests"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          <FolderOpen size={16} className="text-[#ff8a00]" />
          Service Requests Desk
        </Link>

        <Link
          href={`/service-requests/new?queue=${queue.id}`}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#050816] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#111827]"
        >
          <Plus size={16} className="text-[#ffbf00]" />
          Create Service Request
        </Link>
      </nav>

      <p className="mt-7 text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled Routing Workspace
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <section
              key={stat.label}
              className="rounded-lg border border-[#d8e1ea] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#53657f]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-4xl font-black">{stat.value}</p>
                </div>
                <Icon size={24} className="text-[#ff8a00]" />
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-5">
          <QueueAuthorityPanel queue={queue} />

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Queue Records
                </p>
                <h2 className="mt-2 text-2xl font-black">Assigned Requests</h2>
                <p className="mt-3 text-sm leading-7 text-[#33445c]">
                  Open each request to review detail workspace, related record,
                  routing stage, authority, and future action history.
                </p>
              </div>

              <span className="rounded-full bg-[#fff0b8] px-5 py-2 text-sm font-black text-[#b45309]">
                {queueRequests.length} assigned
              </span>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-[860px] w-full border-collapse text-left">
                <thead className="bg-[#f8fafc] text-[11px] uppercase tracking-[0.45em] text-[#53657f]">
                  <tr>
                    <th className="px-4 py-4">Request ID</th>
                    <th className="px-4 py-4">Title</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Priority</th>
                    <th className="px-4 py-4">Owner</th>
                    <th className="px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {queueRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-[#d8e1ea] align-top"
                    >
                      <td className="px-4 py-5 text-sm font-black">
                        {request.id}
                      </td>
                      <td className="px-4 py-5">
                        <p className="text-sm font-black">{request.title}</p>
                        <p className="mt-2 max-w-sm text-xs leading-6 text-[#53657f]">
                          {request.summary}
                        </p>
                      </td>
                      <td className="px-4 py-5">
                        <span
                          className={`rounded-md px-3 py-2 text-xs font-black ${getStatusPillClass(
                            request.status,
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <span
                          className={`rounded-md px-3 py-2 text-xs font-black ${getPriorityPillClass(
                            request.priority,
                          )}`}
                        >
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-sm font-black">
                        {request.owner}
                      </td>
                      <td className="px-4 py-5">
                        <Link
                          href={`/service-requests/${request.id}`}
                          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
                        >
                          Open
                          <ArrowRight size={16} className="text-[#ff8a00]" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="min-w-0 space-y-5">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black uppercase tracking-[0.25em]">
              Queue Actions
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#33445c]">
              Frontend controls prepared for future assignment, routing, SLA
              tracking, restricted review, escalation, and permanent audit
              history.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href={`/service-requests/new?queue=${queue.id}`}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#050816] px-4 text-sm font-black text-white"
              >
                <Plus size={16} className="text-[#ffbf00]" />
                Create Request for Queue
              </Link>

              <button className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black">
                Assign Queue Owner
              </button>

              <button className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black">
                Review Queue SLA
              </button>

              <button className="h-12 w-full rounded-lg border border-[#ff8a00] bg-[#fff7e6] px-4 text-sm font-black text-[#9a4a00]">
                Escalate Queue Review
              </button>

              <Link
                href="/service-requests"
                className="flex h-12 w-full items-center justify-center rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black"
              >
                Return to Service Requests
              </Link>
            </div>
          </section>

          <QueueControlsPanel queue={queue} />
          <QueueWorkflowPanel queue={queue} />

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <PanelTitle
              icon={<ShieldCheck size={24} />}
              eyebrow="Routing Standard"
              title="Controlled Queue"
            />
            <p className="mt-5 text-sm leading-7 text-[#33445c]">
              {queue.routingStandard}
            </p>
          </section>

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <PanelTitle
              icon={<LockKeyhole size={24} />}
              eyebrow="Access Note"
              title="Future Controls"
            />
            <p className="mt-5 text-sm leading-7 text-[#33445c]">
              {queue.accessScope}. Future backend phases should enforce this
              through role-based access, queue ownership, approval permissions,
              and audit logging.
            </p>
          </section>
        </aside>
      </div>
    </EOCPageShell>
  );
}

function QueueAuthorityPanel({ queue }: { queue: ServiceRequestQueueRecord }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PanelTitle
          icon={<Route size={24} />}
          eyebrow="Service Request Queue"
          title={queue.title}
        />

        <span
          className={`rounded-full px-5 py-2 text-sm font-black ${getQueueStatusClass(
            queue.status,
          )}`}
        >
          {queue.status}
        </span>
      </div>

      <p className="mt-5 text-sm font-black leading-7">{queue.purpose}</p>
      <p className="mt-3 text-sm leading-7 text-[#33445c]">{queue.summary}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <QueueInfoCard label="Department" value={queue.department} />
        <QueueInfoCard label="Owner" value={queue.owner} />
        <QueueInfoCard label="Access Scope" value={queue.accessScope} />
        <QueueInfoCard label="Escalation Path" value={queue.escalationPath} />
      </div>
    </section>
  );
}

function QueueInfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-5">
      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#94a3b8]">
        {label}
      </p>
      <p className="mt-3 text-sm font-black leading-6">{value}</p>
    </div>
  );
}

function QueueControlsPanel({ queue }: { queue: ServiceRequestQueueRecord }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <PanelTitle
        icon={<ShieldCheck size={24} />}
        eyebrow="Queue Controls"
        title="Review Rules"
      />

      <div className="mt-6 space-y-3">
        {queue.controls.map((control) => (
          <div
            key={control}
            className="rounded-lg border border-[#d8e1ea] bg-white p-4 text-sm font-black"
          >
            {control}
          </div>
        ))}
      </div>
    </section>
  );
}

function QueueWorkflowPanel({ queue }: { queue: ServiceRequestQueueRecord }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <PanelTitle
        icon={<ClipboardList size={24} />}
        eyebrow="Queue Workflow"
        title="Operating Path"
      />

      <div className="mt-6 space-y-3">
        {queue.workflowStages.map((stage, index) => (
          <div
            key={stage}
            className="flex items-center gap-3 rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4 text-sm font-black"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#050816] text-xs font-black text-[#ffbf00]">
              {index + 1}
            </span>
            {stage}
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

function getQueueStatusClass(status: ServiceRequestQueueStatus) {
  switch (status) {
    case "Active Queue":
      return "bg-emerald-100 text-emerald-700";
    case "Department Queue":
      return "bg-blue-100 text-blue-700";
    case "Restricted Queue":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
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