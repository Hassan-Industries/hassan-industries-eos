import Link from "next/link";
import {
  ClipboardList,
  FolderOpen,
  LockKeyhole,
  Route,
  ShieldCheck,
} from "lucide-react";
import {
  serviceRequestQueues,
  serviceRequestRecords,
} from "@/data/serviceRequests";

function queueCount(queueId: string) {
  return serviceRequestRecords.filter(
    (request) => request.routingQueueId === queueId,
  ).length;
}

export default function ServiceRequestQueuesPage() {
  const restrictedQueues = serviceRequestQueues.filter((queue) =>
    queue.title.toLowerCase().includes("restricted"),
  ).length;

  return (
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
            <p className="mt-3 text-3xl font-black text-[#ffbf00]">
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
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#050816] px-5 text-sm font-black text-white shadow-sm"
        >
          + Create Service Request
        </Link>
      </div>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled Queue Navigation
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Routing Queues" value={serviceRequestQueues.length} />
        <StatCard label="Active Requests" value={serviceRequestRecords.length} />
        <StatCard
          label="Department Queues"
          value={serviceRequestQueues.length - restrictedQueues}
        />
        <StatCard label="Restricted Queues" value={restrictedQueues} />
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                Enterprise Operations System
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Controlled Routing Queues
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[#33445c]">
                Each queue has a defined purpose, owner, access scope, routing
                standard, and escalation path so requests do not sit in an
                ungoverned general inbox.
              </p>
            </div>

            <span className="rounded-full bg-[#fff1bf] px-5 py-3 text-sm font-black text-[#b45309]">
              {serviceRequestQueues.length} queues
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {serviceRequestQueues.map((queue) => {
              const assigned = queueCount(queue.id);
              const restricted = queue.title
                .toLowerCase()
                .includes("restricted");

              return (
                <Link
                  key={queue.id}
                  href={`/service-requests/queues/${queue.id}`}
                  className="rounded-xl border border-[#d8e1ea] bg-[#f8fafc] p-5 transition hover:border-[#ff8a00] hover:bg-white"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                      <Route size={24} />
                    </div>
                    <span
                      className={[
                        "rounded-full px-4 py-2 text-xs font-black",
                        restricted
                          ? "bg-rose-100 text-rose-700"
                          : "bg-blue-100 text-blue-700",
                      ].join(" ")}
                    >
                      {restricted ? "Restricted Queue" : "Department Queue"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black">{queue.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-7 text-[#33445c]">
                    {queue.summary}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#d8e1ea] pt-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                      {assigned} Assigned
                    </p>
                    <span className="text-sm font-black text-[#050816]">
                      Open Queue →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-[0.35em]">
                  Queue Standard
                </h3>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-[#33445c]">
                  <li>• Each queue has a defined owner.</li>
                  <li>• Each queue has a governed routing purpose.</li>
                  <li>• Requests should not remain unassigned.</li>
                  <li>• Restricted matters must remain separated.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ClipboardList size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-[0.35em]">
                  Training Note
                </h3>
                <p className="mt-5 text-sm leading-7 text-[#33445c]">
                  Queue pages should be treated as operating desks, not passive
                  lists. Every queue should help staff determine ownership,
                  review path, escalation, and next action.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#44546a]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[#050816]">{value}</p>
        </div>
        <div className="text-[#ff8a00]">
          <LockKeyhole size={24} />
        </div>
      </div>
    </section>
  );
}