import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ClipboardList,
  FolderOpen,
  LockKeyhole,
  Plus,
  Route,
  ShieldCheck,
} from "lucide-react";
import ServiceRequestWorkspaceFrame from "@/components/service-requests/ServiceRequestWorkspaceFrame";
import {
  getRequestsForQueue,
  getServiceRequestQueueById,
  serviceRequestQueues,
  type ServiceRequestRecord,
} from "@/data/serviceRequests";

type QueueDetailPageProps = {
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
}: QueueDetailPageProps) {
  const { queuesId } = await params;
  const queue = getServiceRequestQueueById(queuesId);

  if (!queue) {
    notFound();
  }

  const assignedRequests = getRequestsForQueue(queue.id);

  return (
    <ServiceRequestWorkspaceFrame>
      <div className="mx-auto max-w-[1680px] space-y-6">
        <section className="rounded-xl bg-[#050816] p-6 text-white shadow-sm lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#ffbf00]">
                Hassan Industries
              </p>
              <h1 className="mt-4 text-3xl font-black uppercase tracking-tight lg:text-4xl">
                {queue.title}
              </h1>
              <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
                {queue.purpose}
              </p>
            </div>

            <div className="rounded-lg border border-[#ffbf00] bg-[#101827] px-8 py-5 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
                Queue Status
              </p>
              <p className="mt-3 text-2xl font-black text-[#ffbf00]">
                {queue.status}
              </p>
              <p className="mt-1 text-xs font-black text-white">
                {queue.department}
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/service-requests/queues"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
          >
            <ArrowLeft size={16} className="text-[#ff8a00]" />
            Back to Routing Queues
          </Link>

          <Link
            href="/service-requests"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
          >
            <FolderOpen size={16} className="text-[#ff8a00]" />
            Service Requests Desk
          </Link>

          <Link
            href={`/service-requests/new?queue=${queue.id}`}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#050816] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#111827]"
          >
            <Plus size={16} className="text-[#ffbf00]" />
            Create Request for Queue
          </Link>
        </div>

        <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
          Controlled Routing Workspace
        </p>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Assigned Requests"
            value={assignedRequests.length.toString()}
            icon={<ClipboardList className="h-6 w-6" />}
          />
          <MetricCard
            label="Open Items"
            value={assignedRequests
              .filter((request) => request.status !== "Closed")
              .length.toString()}
            icon={<FolderOpen className="h-6 w-6" />}
          />
          <MetricCard
            label="Pending Routing"
            value={assignedRequests
              .filter((request) => request.status === "Pending Routing")
              .length.toString()}
            icon={<Route className="h-6 w-6" />}
          />
          <MetricCard
            label="Restricted"
            value={assignedRequests
              .filter((request) => request.restrictedReview)
              .length.toString()}
            icon={<LockKeyhole className="h-6 w-6" />}
          />
        </section>

        <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0 space-y-6">
            <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                  <Route size={24} />
                </div>

                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                    Service Request Queue
                  </p>
                  <h2 className="mt-2 text-2xl font-black">{queue.title}</h2>
                  <p className="mt-3 text-sm font-black leading-7 text-[#050816]">
                    {queue.summary}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#33445c]">
                    {queue.purpose}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <QueueField label="Department" value={queue.department} />
                <QueueField label="Owner" value={queue.owner} />
                <QueueField label="Access Scope" value={queue.accessScope} />
                <QueueField
                  label="Escalation Path"
                  value={queue.escalationPath}
                />
              </div>
            </section>

            <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                    Queue Records
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    Assigned Requests
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#33445c]">
                    Open each request to review detail workspace, related
                    record, routing stage, authority, and future action history.
                  </p>
                </div>

                <span className="rounded-full bg-[#fff1bf] px-5 py-3 text-xs font-black text-[#b45309]">
                  {assignedRequests.length} assigned
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {assignedRequests.length > 0 ? (
                  assignedRequests.map((request) => (
                    <RequestRow key={request.id} request={request} />
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-[#c8d3df] bg-[#f8fafc] p-6 text-sm font-bold text-[#33445c]">
                    No service requests are assigned to this queue yet.
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black uppercase tracking-[0.35em]">
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
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-[#050816] px-4 text-sm font-black text-white"
                >
                  Create Request for Queue
                </Link>

                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]"
                >
                  Assign Queue Owner
                </button>

                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]"
                >
                  Review Queue SLA
                </button>

                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center rounded-lg border border-[#ffbf00] bg-[#fff7e6] px-4 text-sm font-black text-[#b45309]"
                >
                  Escalate Queue Review
                </button>
              </div>
            </section>

            <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-[0.35em]">
                    Queue Controls
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {queue.controls.map((control) => (
                  <div
                    key={control}
                    className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] px-4 py-3 text-sm font-black text-[#050816]"
                  >
                    {control}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black uppercase tracking-[0.35em]">
                Queue Workflow
              </h2>

              <div className="mt-5 space-y-3">
                {queue.workflowStages.map((stage, index) => (
                  <div
                    key={stage}
                    className="flex items-center gap-4 rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#050816] text-sm font-black text-[#ffbf00]">
                      {index + 1}
                    </span>
                    <span className="text-sm font-black text-[#050816]">
                      {stage}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </ServiceRequestWorkspaceFrame>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#48617e]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[#050816]">{value}</p>
        </div>
        <div className="text-[#ff8a00]">{icon}</div>
      </div>
    </div>
  );
}

function QueueField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
        {label}
      </p>
      <p className="mt-2 text-sm font-black leading-6 text-[#050816]">
        {value}
      </p>
    </div>
  );
}

function RequestRow({ request }: { request: ServiceRequestRecord }) {
  return (
    <article className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-5">
      <div className="grid gap-4 lg:grid-cols-[130px_minmax(0,1fr)_130px_130px_100px] lg:items-start">
        <div className="font-black text-[#050816]">{request.id}</div>

        <div>
          <p className="font-black text-[#050816]">{request.title}</p>
          <p className="mt-2 text-xs font-semibold leading-6 text-[#48617e]">
            {request.summary}
          </p>
        </div>

        <div className="font-bold text-[#24364d]">{request.status}</div>
        <div className="font-bold text-[#24364d]">{request.priority}</div>

        <Link
          href={`/service-requests/${request.id}`}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-[#c8d3df] bg-white px-4 text-xs font-black text-[#050816] transition hover:border-[#ff8a00]"
        >
          Open
        </Link>
      </div>
    </article>
  );
}