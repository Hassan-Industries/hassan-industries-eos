import Link from "next/link";
import {
  ClipboardList,
  FolderOpen,
  LockKeyhole,
  Route,
  ShieldCheck,
} from "lucide-react";
import { serviceRequestRecords } from "@/data/serviceRequests";

function statCard(label: string, value: number, icon: React.ReactNode) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#44546a]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[#050816]">{value}</p>
        </div>
        <div className="text-[#ff8a00]">{icon}</div>
      </div>
    </section>
  );
}

function statusClass(status: string) {
  if (status.includes("Restricted")) {
    return "bg-rose-100 text-rose-700";
  }

  if (status.includes("Pending")) {
    return "bg-amber-100 text-amber-700";
  }

  if (status.includes("Review")) {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-emerald-100 text-emerald-700";
}

function priorityClass(priority: string) {
  if (priority === "Restricted") {
    return "bg-rose-100 text-rose-700";
  }

  if (priority === "High") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-100 text-[#24364d]";
}

export default function ServiceRequestsPage() {
  const openCount = serviceRequestRecords.filter((item) =>
    item.status.includes("Open"),
  ).length;

  const pendingCount = serviceRequestRecords.filter((item) =>
    item.status.includes("Pending"),
  ).length;

  const restrictedCount = serviceRequestRecords.filter(
    (item) => item.priority === "Restricted" || item.status.includes("Restricted"),
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
              Service Requests Desk
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
              Universal frontend intake and routing workspace for administrative
              requests, governance review, document-control actions,
              certified-copy support, treasury support, and restricted HCA
              review preparation.
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-[#101827] px-8 py-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
              Module Status
            </p>
            <p className="mt-3 text-3xl font-black text-[#ffbf00]">
              Frontend Desk
            </p>
            <p className="mt-1 text-xs font-black text-white">
              Intake Routing Layer
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
        >
          <FolderOpen size={16} className="text-[#ff8a00]" />
          Back to Dashboard
        </Link>

        <Link
          href="/service-requests/queues"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
        >
          <Route size={16} className="text-[#ff8a00]" />
          Routing Queues
        </Link>
      </div>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Universal Intake & Routing
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCard(
          "Service Requests",
          serviceRequestRecords.length,
          <ClipboardList size={24} />,
        )}
        {statCard("Open Intake", openCount, <FolderOpen size={24} />)}
        {statCard("Pending Routing", pendingCount, <Route size={24} />)}
        {statCard("Restricted Review", restrictedCount, <LockKeyhole size={24} />)}
      </div>

      <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px_260px_150px]">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Search Requests
            </p>
            <input
              className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-semibold outline-none"
              placeholder="Search by request ID, title, department, owner, category, classification, or status..."
            />
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Status
            </p>
            <select className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black outline-none">
              <option>All Statuses</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Department
            </p>
            <select className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black outline-none">
              <option>All Departments</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] shadow-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <section className="overflow-hidden rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#d8e1ea] p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                Enterprise Operations System
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Service Requests Registry
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#33445c]">
                Select a service request to review intake authority, routing
                stage, department ownership, classification, and future workflow
                controls.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#fff1bf] px-5 py-3 text-sm font-black text-[#b45309]">
                {serviceRequestRecords.length} shown
              </span>

              <Link
                href="/service-requests/new"
                className="inline-flex h-14 items-center justify-center rounded-lg bg-[#050816] px-6 text-sm font-black text-white"
              >
                + Create Service Request
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto p-5">
            <table className="min-w-[980px] w-full text-left text-sm">
              <thead className="bg-[#f8fafc]">
                <tr>
                  <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#33445c]">
                    Request ID
                  </th>
                  <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#33445c]">
                    Title
                  </th>
                  <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#33445c]">
                    Department
                  </th>
                  <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#33445c]">
                    Status
                  </th>
                  <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#33445c]">
                    Priority
                  </th>
                  <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#33445c]">
                    Owner
                  </th>
                  <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#33445c]">
                    Queue
                  </th>
                  <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#33445c]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {serviceRequestRecords.map((request) => (
                  <tr key={request.id} className="border-b border-[#d8e1ea]">
                    <td className="px-4 py-5 align-top font-black text-[#050816]">
                      {request.id}
                    </td>
                    <td className="px-4 py-5 align-top">
                      <p className="font-black text-[#050816]">{request.title}</p>
                      <p className="mt-2 max-w-[260px] text-xs font-semibold leading-6 text-[#44546a]">
                        {request.summary}
                      </p>
                    </td>
                    <td className="px-4 py-5 align-top font-bold text-[#24364d]">
                      {request.department}
                    </td>
                    <td className="px-4 py-5 align-top">
                      <span
                        className={[
                          "rounded-md px-3 py-2 text-xs font-black",
                          statusClass(request.status),
                        ].join(" ")}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-5 align-top">
                      <span
                        className={[
                          "rounded-md px-3 py-2 text-xs font-black",
                          priorityClass(request.priority),
                        ].join(" ")}
                      >
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-4 py-5 align-top font-black text-[#050816]">
                      {request.owner}
                    </td>
                    <td className="px-4 py-5 align-top">
                      <Link
                        href={`/service-requests/queues/${request.routingQueueId}`}
                        className="font-black text-blue-700"
                      >
                        {request.assignedQueue}
                      </Link>
                    </td>
                    <td className="px-4 py-5 align-top">
                      <Link
                        href={`/service-requests/${request.id}`}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00]"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ClipboardList size={24} />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                  Request Preview
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  No Request Selected
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#33445c]">
                  Select a service request record to review intake category,
                  routing stage, ownership, classification, and future workflow
                  controls.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-[#050816] p-5 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.35em]">
                Service Request Workspace
              </p>
              <p className="mt-3 text-sm font-semibold leading-6">
                Request metadata opens only after intentional request selection.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-[0.35em]">
                  Routing Standard
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#33445c]">
                  <li>• Requests must not remain unassigned.</li>
                  <li>• Restricted matters require controlled visibility.</li>
                  <li>• Queues must preserve owner, status, and audit path.</li>
                </ul>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}