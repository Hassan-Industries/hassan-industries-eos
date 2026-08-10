import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FolderOpen,
  LockKeyhole,
  Plus,
  Route,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  getRequestsForQueue,
  serviceRequestQueues,
  serviceRequestRecords,
  type ServiceRequestQueueRecord,
  type ServiceRequestQueueStatus,
} from "@/data/serviceRequests";

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

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#d8e1ea] py-2 last:border-b-0">
      <span className="font-bold text-[#64748b]">{label}</span>
      <span className="text-right font-black text-[#050816]">{value}</span>
    </div>
  );
}

function QueueCard({ queue }: { queue: ServiceRequestQueueRecord }) {
  const queueRequests = getRequestsForQueue(queue.id);

  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={[
              "inline-flex rounded-full px-3 py-1 text-xs font-black",
              getQueueStatusClass(queue.status),
            ].join(" ")}
          >
            {queue.status}
          </span>

          <h3 className="mt-4 text-2xl font-black text-[#050816]">
            {queue.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-[#33445c]">
            {queue.summary}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
          <Route className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-5 grid gap-3 rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4 text-sm">
        <Detail label="Owner" value={queue.owner} />
        <Detail label="Department" value={queue.department} />
        <Detail label="Access Scope" value={queue.accessScope} />
        <Detail label="Assigned Requests" value={queueRequests.length.toString()} />
      </div>

      <Link
        href={`/service-requests/queues/${queue.id}`}
        className="service-button-primary mt-5 w-full justify-center"
      >
        Open Queue
        <ArrowRight className="h-4 w-4 text-[#ffbf00]" />
      </Link>
    </section>
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
    <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-black uppercase tracking-[0.25em] text-[#050816]">
            {title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#33445c]">{text}</p>
        </div>
      </div>
    </section>
  );
}

export default function ServiceRequestQueuesPage() {
  const restrictedQueueCount = serviceRequestQueues.filter(
    (queue) => queue.status === "Restricted Queue",
  ).length;

  const departmentQueueCount = serviceRequestQueues.filter(
    (queue) => queue.status === "Department Queue",
  ).length;

  const activeRequestCount = serviceRequestRecords.filter(
    (request) => request.status !== "Closed",
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
        <Link href="/service-requests" className="service-button">
          <FolderOpen size={16} className="text-[#ff8a00]" />
          Back to Service Requests Desk
        </Link>

        <Link href="/service-requests/new" className="service-button-primary">
          <Plus size={16} className="text-[#ffbf00]" />
          Create Service Request
        </Link>
      </div>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        Controlled Queue Navigation
      </p>

      <div className="grid gap-4 lg:grid-cols-4">
        <StatCard
          label="Routing Queues"
          value={serviceRequestQueues.length.toString()}
          icon={Route}
        />
        <StatCard
          label="Active Requests"
          value={activeRequestCount.toString()}
          icon={ClipboardList}
        />
        <StatCard
          label="Department Queues"
          value={departmentQueueCount.toString()}
          icon={FolderOpen}
        />
        <StatCard
          label="Restricted Queues"
          value={restrictedQueueCount.toString()}
          icon={LockKeyhole}
        />
      </div>

      <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
        <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
          Enterprise Operations System
        </p>
        <h2 className="mt-2 text-3xl font-black text-[#050816]">
          Controlled Routing Queues
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-[#33445c]">
          Each queue has a defined purpose, owner, access scope, routing
          standard, and escalation path so requests do not sit in an ungoverned
          general inbox.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        {serviceRequestQueues.map((queue) => (
          <QueueCard key={queue.id} queue={queue} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <InfoPanel
          icon={<ShieldCheck className="h-6 w-6" />}
          title="Queue Standard"
          text="Each queue has a defined owner, governed routing purpose, escalation path, and separation standard for restricted matters."
        />
        <InfoPanel
          icon={<ClipboardList className="h-6 w-6" />}
          title="Backend Readiness"
          text="Future backend work should connect queues to role-based permissions, assignment rules, SLA timers, escalations, notifications, comments, attachments, approvals, and permanent service request audit history."
        />
        <InfoPanel
          icon={<Route className="h-6 w-6" />}
          title="Training Note"
          text="Queue pages should be treated as operating desks, not passive lists. Every queue should help staff determine ownership, review path, escalation, and next action."
        />
      </div>
    </div>
  );
}