"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Copy,
  FolderOpen,
  LockKeyhole,
  Plus,
  Route,
  Search,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import {
  getServiceRequestSearchText,
  serviceRequestDepartmentFilters,
  serviceRequestRecords,
  serviceRequestStatusFilters,
  type ServiceRequestPriority,
  type ServiceRequestRecord,
  type ServiceRequestStatus,
} from "@/data/serviceRequests";

export default function ServiceRequestsPage() {
  const [selectedRequest, setSelectedRequest] =
    useState<ServiceRequestRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return serviceRequestRecords.filter((request) => {
      const matchesSearch =
        !normalizedSearch ||
        getServiceRequestSearchText(request).includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All Statuses" || request.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        request.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [departmentFilter, searchTerm, statusFilter]);

  const statCards = [
    {
      label: "Service Requests",
      value: serviceRequestRecords.length.toString(),
      icon: ClipboardList,
    },
    {
      label: "Open Intake",
      value: serviceRequestRecords
        .filter((request) => request.status !== "Closed")
        .length.toString(),
      icon: FolderOpen,
    },
    {
      label: "Pending Routing",
      value: serviceRequestRecords
        .filter((request) => request.status === "Pending Routing")
        .length.toString(),
      icon: Route,
    },
    {
      label: "Restricted Review",
      value: serviceRequestRecords
        .filter((request) => request.status === "Restricted Review")
        .length.toString(),
      icon: LockKeyhole,
    },
  ];

  function clearFilters() {
    setSearchTerm("");
    setStatusFilter("All Statuses");
    setDepartmentFilter("All Departments");
  }

  function copyRequestId(requestId: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(requestId);
    }

    setCopiedId(requestId);

    window.setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  }

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
                    Service Requests Desk
                  </h1>
                  <p className="mt-3 max-w-5xl text-sm font-medium leading-6 text-white">
                    Universal frontend intake and routing workspace for
                    administrative requests, governance review,
                    document-control actions, certified-copy support, treasury
                    support, and restricted HCA review preparation.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
                    Module Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Frontend Desk
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white">
                    Intake Routing Layer
                  </p>
                </div>
              </div>
            </section>

            <nav className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <FolderOpen className="h-4 w-4 text-amber-500" />
                Back to Dashboard
              </Link>

              <Link
                href="/service-requests/queues"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <Route className="h-4 w-4 text-amber-500" />
                Routing Queues
              </Link>
            </nav>

            <p className="text-right text-[12px] font-black uppercase tracking-[0.45em] text-slate-400">
              Universal Intake & Routing
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

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 xl:grid-cols-[1fr_220px_260px_140px]">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-500">
                    Search Requests
                  </p>
                  <div className="mt-2 flex h-[48px] items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 transition focus-within:border-amber-500">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search by request ID, title, department, owner, category, classification, or status..."
                      className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <label className="block">
                  <span className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-500">
                    Status
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="mt-2 h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                  >
                    {serviceRequestStatusFilters.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-500">
                    Department
                  </span>
                  <select
                    value={departmentFilter}
                    onChange={(event) =>
                      setDepartmentFilter(event.target.value)
                    }
                    className="mt-2 h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                  >
                    {serviceRequestDepartmentFilters.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 h-[48px] rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
                >
                  Clear Filters
                </button>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_390px]">
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-400">
                      Enterprise Operations System
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Service Requests Registry
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      Select a service request to preview intake authority,
                      routing stage, department ownership, classification, and
                      future workflow controls.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-700">
                      {filteredRequests.length} shown
                    </span>

                    <Link
                      href="/service-requests/new"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-black text-white transition hover:bg-slate-800"
                    >
                      <Plus className="h-4 w-4 text-amber-400" />
                      Create Service Request
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto p-5">
                  <table className="min-w-[1060px] w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-left text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                        <th className="px-4 py-4">Request ID</th>
                        <th className="px-4 py-4">Title</th>
                        <th className="px-4 py-4">Department</th>
                        <th className="px-4 py-4">Status</th>
                        <th className="px-4 py-4">Priority</th>
                        <th className="px-4 py-4">Owner</th>
                        <th className="px-4 py-4">Queue</th>
                        <th className="px-4 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => {
                        const isSelected = selectedRequest?.id === request.id;

                        return (
                          <tr
                            key={request.id}
                            onClick={() => setSelectedRequest(request)}
                            className={[
                              "cursor-pointer border-b border-slate-200 transition",
                              isSelected
                                ? "bg-amber-50"
                                : "bg-white hover:bg-slate-50",
                            ].join(" ")}
                          >
                            <td className="px-4 py-5 align-top text-sm font-black text-slate-950">
                              {request.id}
                            </td>
                            <td className="px-4 py-5 align-top">
                              <p className="text-sm font-black text-slate-950">
                                {request.title}
                              </p>
                              <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                                {request.summary}
                              </p>
                            </td>
                            <td className="px-4 py-5 align-top text-sm font-bold text-slate-700">
                              {request.department}
                            </td>
                            <td className="px-4 py-5 align-top">
                              <span
                                className={[
                                  "inline-flex rounded-md px-3 py-1 text-xs font-black",
                                  getStatusPillClass(request.status),
                                ].join(" ")}
                              >
                                {request.status}
                              </span>
                            </td>
                            <td className="px-4 py-5 align-top">
                              <span
                                className={[
                                  "inline-flex rounded-md px-3 py-1 text-xs font-black",
                                  getPriorityPillClass(request.priority),
                                ].join(" ")}
                              >
                                {request.priority}
                              </span>
                            </td>
                            <td className="px-4 py-5 align-top text-sm font-black text-slate-950">
                              {request.owner}
                            </td>
                            <td className="px-4 py-5 align-top">
                              <Link
                                href={`/service-requests/queues/${request.routingQueueId}`}
                                onClick={(event) => event.stopPropagation()}
                                className="text-xs font-black text-blue-700 hover:text-amber-600"
                              >
                                {request.assignedQueue}
                              </Link>
                            </td>
                            <td className="px-4 py-5 align-top">
                              <Link
                                href={`/service-requests/${request.id}`}
                                onClick={(event) => event.stopPropagation()}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                              >
                                Open
                                <ArrowRight className="h-3.5 w-3.5 text-amber-500" />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className="space-y-4">
                {selectedRequest ? (
                  <SelectedRequestPanel
                    request={selectedRequest}
                    copiedId={copiedId}
                    onCopyRequestId={() => copyRequestId(selectedRequest.id)}
                  />
                ) : (
                  <EmptySelectionPanel />
                )}

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <ShieldCheck className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-[0.35em] text-slate-950">
                        Routing Standard
                      </h3>
                      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                        <li>• Service requests serve as universal intake.</li>
                        <li>• Every request should have an assigned queue.</li>
                        <li>• HCA review remains separated from execution.</li>
                        <li>
                          • Restricted matters require controlled visibility.
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
                        Future work should connect this desk to authenticated
                        request submission, role-based assignment, department
                        queues, service-level tracking, comments, attachments,
                        audit logs, approval routing, and permanent records.
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

function EmptySelectionPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-400">
            Request Preview
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            No Request Selected
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Select a service request record to review intake category, routing
            stage, ownership, classification, and future workflow controls.
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
          <ClipboardList className="h-6 w-6 text-amber-400" />
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-slate-950 p-5 text-white">
        <p className="text-[11px] font-black uppercase tracking-[0.35em]">
          Service Request Workspace
        </p>
        <p className="mt-2 text-xs font-semibold leading-5 text-white">
          Request metadata opens only after intentional request selection.
        </p>
      </div>
    </section>
  );
}

function SelectedRequestPanel({
  request,
  copiedId,
  onCopyRequestId,
}: {
  request: ServiceRequestRecord;
  copiedId: string | null;
  onCopyRequestId: () => void;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-400">
            Selected Request
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {request.id}
          </h2>
          <p className="mt-2 text-sm font-black text-slate-950">
            {request.title}
          </p>
        </div>

        <span
          className={[
            "rounded-md px-3 py-1 text-xs font-black",
            getStatusPillClass(request.status),
          ].join(" ")}
        >
          {request.status}
        </span>
      </div>

      <div className="mt-5 rounded-lg bg-slate-950 p-5 text-white">
        <p className="text-[11px] font-black uppercase tracking-[0.35em]">
          Controlled Request
        </p>
        <p className="mt-1 text-xs font-semibold text-white">
          {request.classification}
        </p>
      </div>

      <div className="mt-5 space-y-0">
        {[
          ["Requester", request.requester],
          ["Department", request.department],
          ["Owner", request.owner],
          ["Category", request.category],
          ["Priority", request.priority],
          ["Stage", request.stage],
          ["Assigned Queue", request.assignedQueue],
          ["Due Date", request.dueDate],
          ["Related Record", request.relatedRecord],
        ].map(([label, value]) => (
          <DetailRow key={label} label={label} value={value} />
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
          Routing Note
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          {request.routingNote}
        </p>
      </div>

      <div className="mt-5 space-y-2">
        <button
          type="button"
          onClick={onCopyRequestId}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          <Copy className="h-4 w-4 text-amber-500" />
          {copiedId === request.id ? "Request ID Copied" : "Copy Request ID"}
        </button>

        <Link
          href={`/service-requests/${request.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
        >
          Open Detail Workspace
          <ArrowRight className="h-4 w-4 text-amber-400" />
        </Link>

        <Link
          href={`/service-requests/queues/${request.routingQueueId}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          Open Assigned Queue
          <Route className="h-4 w-4 text-amber-500" />
        </Link>

        <Link
          href="/service-requests/new"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
        >
          Create Related Request
          <Plus className="h-4 w-4 text-amber-500" />
        </Link>
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-3 text-sm">
      <span className="font-bold text-slate-500">{label}</span>
      <span className="text-right font-black text-slate-950">{value}</span>
    </div>
  );
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