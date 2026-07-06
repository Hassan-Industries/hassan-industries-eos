import Link from "next/link";
import {
  ArrowRight,
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
  serviceRequestQueues,
  serviceRequestRecords,
  type ServiceRequestQueueStatus,
} from "@/data/serviceRequests";

export default function ServiceRequestQueuesPage() {
  const queueCount = serviceRequestQueues.length;
  const restrictedQueueCount = serviceRequestQueues.filter(
    (queue) => queue.status === "Restricted Queue",
  ).length;
  const departmentQueueCount = serviceRequestQueues.filter(
    (queue) => queue.status === "Department Queue",
  ).length;
  const activeRequestCount = serviceRequestRecords.filter(
    (request) => request.status !== "Closed",
  ).length;

  const statCards = [
    { label: "Routing Queues", value: queueCount.toString(), icon: Route },
    {
      label: "Active Requests",
      value: activeRequestCount.toString(),
      icon: ClipboardList,
    },
    {
      label: "Department Queues",
      value: departmentQueueCount.toString(),
      icon: FolderOpen,
    },
    {
      label: "Restricted Queues",
      value: restrictedQueueCount.toString(),
      icon: LockKeyhole,
    },
  ];

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
                Service Request Routing Queues
              </h1>
              <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
                Controlled routing layer for assigning service requests to
                department desks, HCA review lanes, records review, treasury
                review, and restricted governance handling.
              </p>
            </div>

            <div className="rounded-lg border border-[#ffbf00] bg-[#101827] px-8 py-5 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
                Queue Status
              </p>
              <p className="mt-3 text-2xl font-black text-[#ffbf00]">
                Frontend Queues
              </p>
              <p className="mt-1 text-xs font-black text-white">
                Assignment Layer
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/service-requests"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
          >
            <FolderOpen size={16} className="text-[#ff8a00]" />
            Back to Service Requests Desk
          </Link>

          <Link
            href="/service-requests/new"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#050816] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#111827]"
          >
            <Plus size={16} className="text-[#ffbf00]" />
            Create Service Request
          </Link>
        </div>

        <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
          Controlled Queue Navigation
        </p>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#48617e]">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-black text-[#050816]">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className="h-6 w-6 text-[#ff8a00]" />
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0 rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Enterprise Operations System
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Controlled Routing Queues
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-[#33445c]">
                  Each queue has a defined purpose, owner, access scope, routing
                  standard, and escalation path so requests do not sit in an
                  ungoverned general inbox.
                </p>
              </div>

              <span className="rounded-full bg-[#fff1bf] px-5 py-3 text-xs font-black text-[#b45309]">
                {serviceRequestQueues.length} queues
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {serviceRequestQueues.map((queue) => {
                const queueRequests = getRequestsForQueue(queue.id);

                return (
                  <article
                    key={queue.id}
                    className="rounded-xl border border-[#d8e1ea] bg-[#f8fafc] p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <span
                          className={[
                            "rounded-full px-4 py-2 text-xs font-black",
                            getQueueStatusClass(queue.status),
                          ].join(" ")}
                        >
                          {queue.status}
                        </span>

                        <h3 className="mt-4 text-2xl font-black text-[#050816]">
                          {queue.title}
                        </h3>
                        <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-[#33445c]">
                          {queue.summary}
                        </p>

                        <div className="mt-5 grid gap-3 md:grid-cols-2">
                          <QueueDetail label="Department" value={queue.department} />
                          <QueueDetail label="Owner" value={queue.owner} />
                          <QueueDetail label="Access Scope" value={queue.accessScope} />
                          <QueueDetail
                            label="Assigned Requests"
                            value={queueRequests.length.toString()}
                          />
                        </div>
                      </div>

                      <Link
                        href={`/service-requests/queues/${queue.id}`}
                        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#050816] px-5 text-sm font-black text-white transition hover:bg-[#111827]"
                      >
                        Open Queue
                        <ArrowRight size={16} className="text-[#ffbf00]" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="space-y-5">
            <InfoPanel
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Queue Standard"
              text="Each queue has a defined owner, governed routing purpose, escalation path, and separation standard for restricted matters."
            />
            <InfoPanel
              icon={<Route className="h-6 w-6" />}
              title="Backend Readiness"
              text="Future backend work should connect queues to role-based permissions, assignment rules, SLA timers, escalations, notifications, comments, attachments, approvals, and permanent service request audit history."
            />
            <InfoPanel
              icon={<ClipboardList className="h-6 w-6" />}
              title="Training Note"
              text="Queue pages should be treated as operating desks, not passive lists. Every queue should help staff determine ownership, review path, escalation, and next action."
            />
          </aside>
        </section>
      </div>
    </ServiceRequestWorkspaceFrame>
  );
}

function QueueDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#d8e1ea] bg-white p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#94a3b8]">
        {label}
      </p>
      <p className="mt-2 text-sm font-black text-[#050816]">{value}</p>
    </div>
  );
}

function InfoPanel({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-black uppercase tracking-[0.25em]">
            {title}
          </h3>
          <p className="mt-4 text-sm font-semibold leading-7 text-[#33445c]">
            {text}
          </p>
        </div>
      </div>
    </section>
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