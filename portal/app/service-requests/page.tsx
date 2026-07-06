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
} from "lucide-react";
import ServiceRequestWorkspaceFrame from "@/components/service-requests/ServiceRequestWorkspaceFrame";
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
    window.setTimeout(() => setCopiedId(null), 1800);
  }

  return (
    <ServiceRequestWorkspaceFrame>
      <section className="rounded-xl bg-[#050816] p-6 text-white shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_260px] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.5em] text-[#ffbf00]">
              Hassan Industries
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Service Requests Desk
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7">
              Universal frontend intake and routing workspace for administrative
              requests, governance review, document-control actions,
              certified-copy support, treasury support, and restricted HCA
              review preparation.
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-[#111827] p-6 text-center">
            <p className="text-xs font-black uppercase tracking-[0.45em]">
              Module Status
            </p>
            <p className="mt-4 text-3xl font-black text-[#ffbf00]">
              Frontend Desk
            </p>
            <p className="mt-2 text-xs font-black">Intake Routing Layer</p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00] hover:bg-amber-50"
        >
          Back to Dashboard
        </Link>
        <Link
          href="/service-requests/queues"
          className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00] hover:bg-amber-50"
        >
          Routing Queues
        </Link>
      </div>

      <p className="text-right text-xs font-black uppercase tracking-[0.5em] text-[#94a3b8]">
        Universal Intake & Routing
      </p>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#536783]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-black text-[#050816]">
                    {stat.value}
                  </p>
                </div>
                <Icon size={24} className="text-[#ff8a00]" />
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px_260px_140px]">
          <div>
            <label className="text-xs font-black uppercase tracking-[0.35em] text-[#536783]">
              Search Requests
            </label>
            <div className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-slate-300 bg-white px-4">
              <Search size={16} className="text-slate-400" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by request ID, title, department, owner, category, classification, or status..."
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-[0.35em] text-[#536783]">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-[#050816] outline-none"
            >
              {serviceRequestStatusFilters.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-[0.35em] text-[#536783]">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-[#050816] outline-none"
            >
              {serviceRequestDepartmentFilters.map((department) => (
                <option key={department}>{department}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-7 h-12 rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00] hover:bg-amber-50"
          >
            Clear Filters
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_420px]">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                Enterprise Operations System
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#050816]">
                Service Requests Registry
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#33445c]">
                Select a service request to preview intake authority, routing
                stage, department ownership, classification, and future workflow
                controls.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-amber-100 px-4 py-3 text-sm font-black text-amber-700">
                {filteredRequests.length} shown
              </span>
              <Link
                href="/service-requests/new"
                className="flex h-14 items-center gap-2 rounded-lg bg-[#050816] px-5 text-sm font-black text-white transition hover:bg-[#111827]"
              >
                <Plus size={16} className="text-[#ffbf00]" />
                Create Service Request
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] text-left text-sm"><thead><tr className="bg-slate-50 text-xs font-black uppercase tracking-[0.35em] text-[#536783]"><th className="px-6 py-4">Request ID</th><th className="px-6 py-4">Title</th><th className="px-6 py-4">Department</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Priority</th><th className="px-6 py-4">Owner</th><th className="px-6 py-4">Queue</th><th className="px-6 py-4">Actions</th></tr></thead><tbody>{filteredRequests.map((request) => {
                const isSelected = selectedRequest?.id === request.id;

                return (
                  <tr
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className={[
                      "cursor-pointer border-b border-slate-200 transition last:border-b-0",
                      isSelected ? "bg-amber-50" : "bg-white hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <td className="px-6 py-5 align-top font-black text-[#050816]">
                      {request.id}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <p className="font-black text-[#050816]">{request.title}</p>
                      <p className="mt-2 max-w-[240px] text-xs leading-6 text-[#536783]">
                        {request.summary}
                      </p>
                    </td>
                    <td className="px-6 py-5 align-top font-bold text-[#33445c]">
                      {request.department}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span
                        className={[
                          "rounded-md px-3 py-1 text-xs font-black",
                          getStatusPillClass(request.status),
                        ].join(" ")}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span
                        className={[
                          "rounded-md px-3 py-1 text-xs font-black",
                          getPriorityPillClass(request.priority),
                        ].join(" ")}
                      >
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top font-black text-[#050816]">
                      {request.owner}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <Link
                        href={`/service-requests/queues/${request.routingQueueId}`}
                        onClick={(event) => event.stopPropagation()}
                        className="text-xs font-black text-blue-700 hover:text-[#ff8a00]"
                      >
                        {request.assignedQueue}
                      </Link>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <Link
                        href={`/service-requests/${encodeURIComponent(request.id)}`}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-amber-50"
                      >
                        Open
                        <ArrowRight size={14} className="text-[#ff8a00]" />
                      </Link>
                    </td>
                  </tr>
                );
              })}</tbody></table>
          </div>
        </div>

        {selectedRequest ? (
          <SelectedRequestPanel
            request={selectedRequest}
            copiedId={copiedId}
            onCopyRequestId={() => copyRequestId(selectedRequest.id)}
          />
        ) : (
          <EmptySelectionPanel />
        )}
      </section>
    </ServiceRequestWorkspaceFrame>
  );
}

function EmptySelectionPanel() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.45em] text-[#94a3b8]">
        Request Preview
      </p>
      <h2 className="mt-2 text-2xl font-black text-[#050816]">
        No Request Selected
      </h2>
      <p className="mt-4 text-sm leading-6 text-[#33445c]">
        Select a service request record to review intake category, routing
        stage, ownership, classification, and future workflow controls.
      </p>

      <div className="mt-6 rounded-lg bg-[#050816] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.35em]">
          Service Request Workspace
        </p>
        <p className="mt-3 text-sm font-semibold leading-6">
          Request metadata opens only after intentional request selection.
        </p>
      </div>
    </aside>
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
    <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.45em] text-[#94a3b8]">
            Selected Request
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#050816]">
            {request.id}
          </h2>
          <p className="mt-2 text-sm font-black text-[#050816]">
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

      <div className="mt-6 rounded-lg bg-[#050816] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.35em]">
          Controlled Request
        </p>
        <p className="mt-2 text-sm font-black">{request.classification}</p>
      </div>

      <div className="mt-6 divide-y divide-slate-200">
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

      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[#536783]">
          Routing Note
        </p>
        <p className="mt-3 text-sm leading-6 text-[#33445c]">
          {request.routingNote}
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        <button
          type="button"
          onClick={onCopyRequestId}
          className="flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-amber-50"
        >
          <Copy size={16} className="text-[#ff8a00]" />
          {copiedId === request.id ? "Request ID Copied" : "Copy Request ID"}
        </button>

        <Link
          href={`/service-requests/${encodeURIComponent(request.id)}`}
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#050816] px-4 text-sm font-black text-white transition hover:bg-[#111827]"
        >
          Open Detail Workspace
          <ArrowRight size={16} className="text-[#ffbf00]" />
        </Link>

        <Link
          href={`/service-requests/queues/${request.routingQueueId}`}
          className="flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-amber-50"
        >
          Open Assigned Queue
          <Route size={16} className="text-[#ff8a00]" />
        </Link>
      </div>
    </aside>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 text-sm">
      <span className="font-bold text-[#536783]">{label}</span>
      <span className="text-right font-black text-[#050816]">{value}</span>
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