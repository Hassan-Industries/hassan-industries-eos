import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FolderOpen,
  Headphones,
  LockKeyhole,
  Plus,
  Route,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  serviceRequestRecords,
  serviceRequestQueues,
  type ServiceRequestRecord,
} from "@/data/serviceRequests";

function getStatusClass(status: string) {
  if (status === "Open") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "In Review") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "Pending Routing") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Restricted Review") {
    return "bg-rose-100 text-rose-700";
  }

  return "bg-slate-100 text-slate-700";
}

function getPriorityClass(priority: string) {
  if (priority === "High") {
    return "bg-amber-100 text-amber-700";
  }

  if (priority === "Restricted") {
    return "bg-rose-100 text-rose-700";
  }

  return "bg-slate-100 text-[#24364d]";
}

function getQueueTitle(queueId: string) {
  const queue = serviceRequestQueues.find((item) => item.id === queueId);
  return queue?.title ?? "Administration Desk";
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof ClipboardList;
}) {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#48617e]">{label}</p>
          <p className="mt-2 text-3xl font-black text-[#050816]">{value}</p>
        </div>
        <Icon className="h-6 w-6 text-[#ff8a00]" />
      </div>
    </section>
  );
}

function RequestRow({ request }: { request: ServiceRequestRecord }) {
  return (
    <div className="grid min-w-[980px] grid-cols-[120px_minmax(220px,1.4fr)_150px_150px_130px_150px_170px_100px] border-b border-[#d8e1ea] last:border-b-0">
      <div className="px-4 py-5 text-sm font-black text-[#050816]">
        {request.id}
      </div>

      <div className="px-4 py-5">
        <p className="text-sm font-black text-[#050816]">{request.title}</p>
        <p className="mt-2 max-w-[260px] text-xs font-semibold leading-6 text-[#48617e]">
          {request.summary}
        </p>
      </div>

      <div className="px-4 py-5 text-sm font-bold text-[#24364d]">
        {request.department}
      </div>

      <div className="px-4 py-5">
        <span
          className={[
            "inline-flex rounded-md px-3 py-2 text-xs font-black",
            getStatusClass(request.status),
          ].join(" ")}
        >
          {request.status}
        </span>
      </div>

      <div className="px-4 py-5">
        <span
          className={[
            "inline-flex rounded-md px-3 py-2 text-xs font-black",
            getPriorityClass(request.priority),
          ].join(" ")}
        >
          {request.priority}
        </span>
      </div>

      <div className="px-4 py-5 text-sm font-black text-[#050816]">
        {request.owner}
      </div>

      <div className="px-4 py-5 text-sm font-black text-blue-700">
        {getQueueTitle(request.routingQueueId)}
      </div>

      <div className="px-4 py-5">
        <Link
          href={`/service-requests/${request.id}`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
        >
          Open
          <ArrowRight className="h-4 w-4 text-[#ff8a00]" />
        </Link>
      </div>
    </div>
  );
}

export default function ServiceRequestsPage() {
  const openRequests = serviceRequestRecords.filter(
    (request) => request.status === "Open",
  ).length;

  const pendingRouting = serviceRequestRecords.filter(
    (request) => request.status === "Pending Routing",
  ).length;

  const restrictedReview = serviceRequestRecords.filter(
    (request) => request.status === "Restricted Review",
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
              Universal frontend intake and routing workspace for
              administrative requests, governance review, document-control
              actions, certified-copy support, treasury support, and restricted
              HCA review preparation.
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
        <Link href="/" className="service-button">
          <FolderOpen size={16} className="text-[#ff8a00]" />
          Back to Dashboard
        </Link>

        <Link href="/service-requests/queues" className="service-button">
          <Route size={16} className="text-[#ff8a00]" />
          Routing Queues
        </Link>

        <Link href="/service-requests/new" className="service-button-primary">
          <Plus size={16} className="text-[#ffbf00]" />
          Create Service Request
        </Link>
      </div>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Universal Intake & Routing
      </p>

      <div className="grid gap-4 lg:grid-cols-4">
        <StatCard
          label="Service Requests"
          value={serviceRequestRecords.length}
          icon={ClipboardList}
        />
        <StatCard label="Open Intake" value={openRequests} icon={FolderOpen} />
        <StatCard label="Pending Routing" value={pendingRouting} icon={Route} />
        <StatCard
          label="Restricted Review"
          value={restrictedReview}
          icon={LockKeyhole}
        />
      </div>

      <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_260px_140px]">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Search Requests
            </p>
            <div className="flex h-12 items-center gap-3 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-semibold text-[#7d8999]">
              <Search className="h-4 w-4 text-[#94a3b8]" />
              Search by request ID, title, department, owner, category,
              status...
            </div>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Status
            </p>
            <select className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]">
              <option>All Statuses</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
              Department
            </p>
            <select className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]">
              <option>All Departments</option>
            </select>
          </div>

          <div className="flex items-end">
            <button type="button" className="service-button h-12 w-full">
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <section className="overflow-hidden rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#d8e1ea] p-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                Enterprise Operations System
              </p>
              <h2 className="mt-2 text-3xl font-black text-[#050816]">
                Service Requests Registry
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#33445c]">
                Select a service request to preview intake authority, routing
                stage, department ownership, classification, and future workflow
                controls.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#fff0bd] px-5 py-3 text-sm font-black text-[#b45309]">
                {serviceRequestRecords.length} shown
              </span>
              <Link
                href="/service-requests/new"
                className="service-button-primary h-12"
              >
                <Plus className="h-4 w-4 text-[#ffbf00]" />
                Create Service Request
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto p-5">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[120px_minmax(220px,1.4fr)_150px_150px_130px_150px_170px_100px] bg-[#f8fafc]">
                {[
                  "Request ID",
                  "Title",
                  "Department",
                  "Status",
                  "Priority",
                  "Owner",
                  "Queue",
                  "Actions",
                ].map((heading) => (
                  <div
                    key={heading}
                    className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-[#48617e]"
                  >
                    {heading}
                  </div>
                ))}
              </div>

              <div>
                {serviceRequestRecords.map((request) => (
                  <RequestRow key={request.id} request={request} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Request Preview
                </p>
                <h2 className="mt-2 text-3xl font-black text-[#050816]">
                  No Request Selected
                </h2>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ClipboardList className="h-6 w-6" />
              </div>
            </div>

            <p className="text-sm leading-7 text-[#33445c]">
              Select a service request record to review intake category, routing
              stage, ownership, classification, and future workflow controls.
            </p>

            <div className="mt-6 rounded-lg bg-[#050816] p-5 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
                Service Request Workspace
              </p>
              <p className="mt-3 text-sm font-bold leading-6 text-white">
                Request metadata opens only after intentional request selection.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                  Routing Standard
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#050816]">
                  Frontend Controls
                </h3>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-[#33445c]">
              Future backend work should connect this desk to authenticated
              request submission, role-based assignment, department queues,
              service-level tracking, comments, attachments, audit logs,
              approval routing, and permanent records.
            </p>
          </section>

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                  Backend Readiness
                </p>
                <h3 className="mt-2 text-xl font-black uppercase tracking-[0.2em] text-[#050816]">
                  Future Workflow
                </h3>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-[#33445c]">
              This desk remains frontend-only. It prepares the controlled user
              experience before database persistence, routing automation, and
              evidence uploads are introduced.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}