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

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
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
    {
      label: "Open Items",
      value: openCount.toString(),
      icon: FolderOpen,
    },
    {
      label: "Pending Routing",
      value: pendingRoutingCount.toString(),
      icon: Route,
    },
    {
      label: "Restricted",
      value: restrictedCount.toString(),
      icon: LockKeyhole,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-3 text-[11px] font-black uppercase tracking-[0.45em] text-amber-400">
                    Hassan Industries
                  </p>

                  <h1 className="text-3xl font-black uppercase tracking-[-0.03em]">
                    {queue.title}
                  </h1>

                  <p className="mt-3 max-w-5xl text-sm font-medium leading-6 text-white">
                    {queue.summary}
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
                    Queue Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    {queue.status}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    {queue.department}
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-wrap items-center gap-3">
              <Link
                href="/service-requests/queues"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Back to Routing Queues
              </Link>

              <Link
                href="/service-requests"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <FolderOpen className="h-4 w-4 text-amber-600" />
                Service Requests Desk
              </Link>

              <Link
              href={`/service-requests/new?queue=${queue.id}`}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-slate-800"
              >
                <Plus className="h-4 w-4 text-amber-400" />
                Create Service Request
              </Link>
            </section>

            <p className="text-right text-[12px] font-black uppercase tracking-[0.45em] text-slate-400">
              Controlled Routing Workspace
            </p>

            <section className="grid gap-4 xl:grid-cols-4">
              {statCards.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="flex min-h-[86px] items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <div>
                      <p className="text-[11px] font-medium text-slate-500">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-[28px] font-black leading-none text-slate-950">
                        {stat.value}
                      </p>
                    </div>

                    <Icon className="h-6 w-6 text-amber-500" />
                  </div>
                );
              })}
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_390px]">
              <div className="space-y-4">
                <QueueAuthorityPanel queue={queue} />

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-400">
                        Queue Records
                      </p>
                      <h2 className="mt-2 text-2xl font-black text-slate-950">
                        Assigned Requests
                      </h2>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                        Open each request to review detail workspace, related
                        record, routing stage, authority, and future action
                        history.
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-700">
                      {queueRequests.length} assigned
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-[900px] w-full text-left">
                      <thead className="bg-slate-50">
                        <tr className="text-[11px] font-black uppercase tracking-[0.32em] text-slate-500">
                          <th className="px-4 py-4">Request ID</th>
                          <th className="px-4 py-4">Title</th>
                          <th className="px-4 py-4">Status</th>
                          <th className="px-4 py-4">Priority</th>
                          <th className="px-4 py-4">Owner</th>
                          <th className="px-4 py-4 text-right">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {queueRequests.map((request) => (
                          <tr
                            key={request.id}
                            className="border-b border-slate-200 transition hover:bg-slate-50"
                          >
                            <td className="px-4 py-5 text-sm font-black text-slate-950">
                              {request.id}
                            </td>

                            <td className="px-4 py-5">
                              <p className="text-sm font-black text-slate-950">
                                {request.title}
                              </p>
                              <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
                                {request.summary}
                              </p>
                            </td>

                            <td className="px-4 py-5">
                              <span
                                className={[
                                  "rounded-md px-3 py-1 text-xs font-black",
                                  getStatusPillClass(request.status),
                                ].join(" ")}
                              >
                                {request.status}
                              </span>
                            </td>

                            <td className="px-4 py-5">
                              <span
                                className={[
                                  "rounded-md px-3 py-1 text-xs font-black",
                                  getPriorityPillClass(request.priority),
                                ].join(" ")}
                              >
                                {request.priority}
                              </span>
                            </td>

                            <td className="px-4 py-5 text-sm font-black text-slate-950">
                              {request.owner}
                            </td>

                            <td className="px-4 py-5 text-right">
                              <Link
                                href={`/service-requests/${request.id}`}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                              >
                                Open
                                <ArrowRight className="h-4 w-4 text-amber-600" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-[17px] font-black uppercase tracking-[0.35em] text-slate-950">
                    Queue Actions
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Frontend controls prepared for future assignment, routing,
                    SLA tracking, restricted review, escalation, and permanent
                    audit history.
                  </p>

                  <div className="mt-5 space-y-2">
                    <Link
                      href="/service-requests/new"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                    >
                      <Plus className="h-4 w-4 text-amber-400" />
                      Create Request for Queue
                    </Link>

                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50">
                      <UserRoundCheckIcon />
                      Assign Queue Owner
                    </button>

                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50">
                      Review Queue SLA
                    </button>

                    <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-400 bg-amber-50 px-4 py-3 text-sm font-black text-amber-700 transition hover:bg-amber-100">
                      Escalate Queue Review
                    </button>

                    <Link
                      href="/service-requests"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      Return to Service Requests
                    </Link>
                  </div>
                </section>

                <QueueControlsPanel queue={queue} />
                <QueueWorkflowPanel queue={queue} />

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h2 className="text-[17px] font-black uppercase tracking-[0.35em] text-slate-950">
                    Routing Standard
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {queue.routingStandard}
                  </p>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <h2 className="text-[17px] font-black uppercase tracking-[0.35em] text-slate-950">
                    Access Note
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {queue.accessScope}. Future backend phases should enforce
                    this through role-based access, queue ownership, approval
                    permissions, and audit logging.
                  </p>
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function QueueAuthorityPanel({
  queue,
}: {
  queue: ServiceRequestQueueRecord;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <Route className="h-6 w-6 text-amber-400" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-400">
            Service Request Queue
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {queue.title}
          </h2>

          <p className="mt-2 text-sm font-black text-slate-950">
            {queue.purpose}
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {queue.summary}
          </p>
        </div>

        <span
          className={[
            "rounded-full px-4 py-2 text-xs font-black",
            getQueueStatusClass(queue.status),
          ].join(" ")}
        >
          {queue.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
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
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}

function QueueControlsPanel({
  queue,
}: {
  queue: ServiceRequestQueueRecord;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950">
          <ShieldCheck className="h-6 w-6 text-amber-400" />
        </div>

        <h2 className="text-[17px] font-black uppercase tracking-[0.35em] text-slate-950">
          Queue Controls
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {queue.controls.map((control) => (
          <div
            key={control}
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-950"
          >
            {control}
          </div>
        ))}
      </div>
    </section>
  );
}

function QueueWorkflowPanel({
  queue,
}: {
  queue: ServiceRequestQueueRecord;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950">
          <ClipboardList className="h-6 w-6 text-amber-400" />
        </div>

        <h2 className="text-[17px] font-black uppercase tracking-[0.35em] text-slate-950">
          Queue Workflow
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {queue.workflowStages.map((stage, index) => (
          <div
            key={stage}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-amber-400">
              {index + 1}
            </span>
            <span className="text-sm font-bold text-slate-950">{stage}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function UserRoundCheckIcon() {
  return <span className="text-amber-500">⌁</span>;
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