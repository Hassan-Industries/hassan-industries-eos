import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FolderOpen,
  LockKeyhole,
  Plus,
  Route,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
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
    {
      label: "Routing Queues",
      value: queueCount.toString(),
      icon: Route,
    },
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
                    Service Request Routing Queues
                  </h1>
                  <p className="mt-3 max-w-5xl text-sm font-medium leading-6 text-white">
                    Controlled routing layer for assigning service requests to
                    department desks, HCA review lanes, records review,
                    treasury review, and restricted governance handling.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
                    Queue Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Frontend Queues
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white">
                    Assignment Layer
                  </p>
                </div>
              </div>
            </section>

            <nav className="flex flex-wrap items-center gap-3">
              <Link
                href="/service-requests"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <FolderOpen className="h-4 w-4 text-amber-500" />
                Back to Service Requests Desk
              </Link>

              <Link
                href="/service-requests/new"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-slate-800"
              >
                <Plus className="h-4 w-4 text-amber-400" />
                Create Service Request
              </Link>
            </nav>

            <p className="text-right text-[12px] font-black uppercase tracking-[0.45em] text-slate-400">
              Controlled Queue Navigation
            </p>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {statCards.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="flex min-h-[92px] items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-3xl font-black leading-none text-slate-950">
                        {stat.value}
                      </p>
                    </div>

                    <Icon className="h-6 w-6 text-amber-500" />
                  </div>
                );
              })}
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_390px]">
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-400">
                      Enterprise Operations System
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Controlled Routing Queues
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      Each queue has a defined purpose, owner, access scope,
                      routing standard, and escalation path so requests do not
                      sit in an ungoverned general inbox.
                    </p>
                  </div>

                  <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-700">
                    {serviceRequestQueues.length} queues
                  </span>
                </div>

                <div className="grid gap-4 p-5 lg:grid-cols-2">
                  {serviceRequestQueues.map((queue) => {
                    const queueRequests = getRequestsForQueue(queue.id);

                    return (
                      <Link
                        key={queue.id}
                        href={`/service-requests/queues/${queue.id}`}
                        className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-amber-500 hover:bg-amber-50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                            <Route className="h-6 w-6 text-amber-400" />
                          </div>

                          <span
                            className={[
                              "rounded-full px-3 py-1 text-[11px] font-black",
                              getQueueStatusClass(queue.status),
                            ].join(" ")}
                          >
                            {queue.status}
                          </span>
                        </div>

                        <h3 className="mt-5 text-xl font-black text-slate-950">
                          {queue.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {queue.summary}
                        </p>

                        <div className="mt-5 border-t border-slate-200 pt-4">
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400">
                              {queueRequests.length} assigned
                            </p>

                            <span className="inline-flex items-center gap-2 text-xs font-black text-slate-950 group-hover:text-amber-700">
                              Open Queue
                              <ArrowRight className="h-4 w-4 text-amber-500" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <aside className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <ShieldCheck className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
                        Queue Standard
                      </h3>
                      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                        <li>• Each queue has a defined owner.</li>
                        <li>• Each queue has a governed routing purpose.</li>
                        <li>• Requests should not remain unassigned.</li>
                        <li>
                          • Restricted matters must remain separated from
                          general intake.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <UserRoundCheck className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
                        Backend Readiness
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        Future backend work should connect queues to role-based
                        permissions, assignment rules, SLA timers, escalations,
                        notifications, comments, attachments, approvals, and
                        permanent service request audit history.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <ClipboardList className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
                        Training Note
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        Queue pages should be treated as operating desks, not
                        passive lists. Every queue should help staff determine
                        ownership, review path, escalation, and next action.
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