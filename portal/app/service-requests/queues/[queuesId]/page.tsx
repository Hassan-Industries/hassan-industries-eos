import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  FolderOpen,
  Route,
  ShieldCheck,
} from "lucide-react";
import {
  getRequestsForQueue,
  getServiceRequestQueueById,
  serviceRequestQueues,
  type ServiceRequestQueueStatus,
} from "@/data/serviceRequests";

type QueueDetailPageProps = {
  params: Promise<{
    queueId: string;
  }>;
};

export function generateStaticParams() {
  return serviceRequestQueues.map((queue) => ({
    queueId: queue.id,
  }));
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

export default async function QueueDetailPage({ params }: QueueDetailPageProps) {
  const { queueId } = await params;
  const queue = getServiceRequestQueueById(queueId);

  if (!queue) {
    notFound();
  }

  const requests = getRequestsForQueue(queue.id);

  return (
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
            <p className="mt-3 text-3xl font-black text-[#ffbf00]">
              {queue.status}
            </p>
            <p className="mt-1 text-xs font-black text-white">
              {queue.department}
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/service-requests/queues" className="service-button">
          <ArrowLeft size={16} className="text-[#ff8a00]" />
          Back to Routing Queues
        </Link>

        <Link href="/service-requests" className="service-button">
          <FolderOpen size={16} className="text-[#ff8a00]" />
          Service Requests Desk
        </Link>

        <Link href="/service-requests/new" className="service-button-primary">
          <ClipboardList size={16} className="text-[#ffbf00]" />
          Create Request
        </Link>
      </div>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled Queue Workspace
      </p>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <Route className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Queue Record
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#050816]">
                  {queue.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#33445c]">
                  {queue.summary}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black uppercase tracking-[0.25em] text-[#050816]">
              Workflow Stages
            </h3>

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

          <section className="overflow-hidden rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b border-[#d8e1ea] p-6">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Assigned Requests
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#050816]">
                  Queue Request List
                </h3>
              </div>

              <span className="rounded-full bg-[#fff0bd] px-5 py-3 text-sm font-black text-[#b45309]">
                {requests.length} shown
              </span>
            </div>

            <div className="divide-y divide-[#d8e1ea]">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <Link
                    key={request.id}
                    href={`/service-requests/${request.id}`}
                    className="grid gap-4 p-5 transition hover:bg-[#fffaf0] lg:grid-cols-[150px_minmax(0,1fr)_140px_120px]"
                  >
                    <div className="text-sm font-black text-[#050816]">
                      {request.id}
                    </div>

                    <div>
                      <p className="text-sm font-black text-[#050816]">
                        {request.title}
                      </p>
                      <p className="mt-2 text-xs font-semibold leading-6 text-[#48617e]">
                        {request.summary}
                      </p>
                    </div>

                    <div className="text-sm font-black text-[#050816]">
                      {request.status}
                    </div>

                    <div className="flex items-start justify-end">
                      <span className="inline-flex items-center gap-2 text-sm font-black text-blue-700">
                        Open
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-sm font-semibold text-[#48617e]">
                  No requests are assigned to this queue yet.
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Queue Metadata
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#050816]">
                  Operating Control
                </h2>
              </div>

              <span
                className={[
                  "rounded-lg px-3 py-2 text-xs font-black",
                  getQueueStatusClass(queue.status),
                ].join(" ")}
              >
                {queue.status}
              </span>
            </div>

            <DetailRow label="Owner" value={queue.owner} />
            <DetailRow label="Department" value={queue.department} />
            <DetailRow label="Access Scope" value={queue.accessScope} />
            <DetailRow label="Escalation Path" value={queue.escalationPath} />
          </section>

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                  Queue Controls
                </p>
                <h3 className="mt-2 text-xl font-black uppercase tracking-[0.2em] text-[#050816]">
                  Required Review
                </h3>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {queue.controls.map((control) => (
                <div
                  key={control}
                  className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4 text-sm font-bold text-[#050816]"
                >
                  {control}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
              Backend Readiness
            </p>
            <p className="mt-4 text-sm leading-7 text-[#33445c]">
              This queue detail page is frontend-only. Future work should add
              database-backed assignments, role controls, SLA tracking,
              escalation routing, comments, attachments, and audit history.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}