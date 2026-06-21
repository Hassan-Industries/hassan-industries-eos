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


import EOCPageShell from "@/components/layout/EOCPageShell";
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
    <EOCPageShell>
      <section className="rounded-xl bg-[#050816] p-6 text-white shadow-md sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.55em] text-[#ffbf00]">
              Hassan Industries
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
              Service Request Routing Queues
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
              Controlled routing layer for assigning service requests to
              department desks, HCA review lanes, records review, treasury
              review, and restricted governance handling.
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-white/5 p-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em]">
              Queue Status
            </p>
            <p className="mt-4 text-3xl font-black text-[#ffbf00]">
              Frontend Queues
            </p>
            <p className="mt-1 text-xs font-black">Assignment Layer</p>
          </div>
        </div>
      </section>

      <nav className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/service-requests"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          <FolderOpen size={16} className="text-[#ff8a00]" />
          Back to Service Requests Desk
        </Link>

        <Link
          href="/service-requests/new"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#050816] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#111827]"
        >
          <Plus size={16} className="text-[#ffbf00]" />
          Create Service Request
        </Link>
      </nav>

      <p className="mt-7 text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled Queue Navigation
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
        <section className="rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
          <div className="border-b border-[#d8e1ea] p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Enterprise Operations System
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Controlled Routing Queues
                </h2>
                <p className="mt-3 max-w-5xl text-sm leading-7 text-[#33445c]">
                  Each queue has a defined purpose, owner, access scope, routing
                  standard, and escalation path so requests do not sit in an
                  ungoverned general inbox.
                </p>
              </div>

              <span className="rounded-full bg-[#fff0b8] px-5 py-2 text-sm font-black text-[#b45309]">
                {serviceRequestQueues.length} queues
              </span>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            {serviceRequestQueues.map((queue) => {
              const queueRequests = getRequestsForQueue(queue.id);

              return (
                <Link
                  key={queue.id}
                  href={`/service-requests/queues/${queue.id}`}
                  className="rounded-xl border border-[#d8e1ea] bg-[#f8fafc] p-6 transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                      <Route size={24} />
                    </div>

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-black ${getQueueStatusClass(
                        queue.status,
                      )}`}
                    >
                      {queue.status}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-black">{queue.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#33445c]">
                    {queue.summary}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#d8e1ea] pt-4">
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                      {queueRequests.length} assigned
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-black text-[#050816]">
                      Open Queue
                      <ArrowRight size={16} className="text-[#ff8a00]" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <PanelTitle icon={<ShieldCheck size={24} />} title="Queue Standard" />
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#33445c]">
              <li>• Each queue has a defined owner.</li>
              <li>• Each queue has a governed routing purpose.</li>
              <li>• Requests should not remain unassigned.</li>
              <li>• Restricted matters must remain separated from general intake.</li>
            </ul>
          </section>

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <PanelTitle icon={<Route size={24} />} title="Backend Readiness" />
            <p className="mt-5 text-sm leading-7 text-[#33445c]">
              Future backend work should connect queues to role-based
              permissions, assignment rules, SLA timers, escalations,
              notifications, comments, attachments, approvals, and permanent
              service request audit history.
            </p>
          </section>

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <PanelTitle icon={<ClipboardList size={24} />} title="Training Note" />
            <p className="mt-5 text-sm leading-7 text-[#33445c]">
              Queue pages should be treated as operating desks, not passive
              lists. Every queue should help staff determine ownership, review
              path, escalation, and next action.
            </p>
          </section>
        </aside>
      </div>
    </EOCPageShell>
  );
}

function PanelTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase tracking-[0.18em]">
        {title}
      </h3>
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