"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
                actions, certified-copy support, treasury support, and
                restricted HCA review preparation.
              </p>
            </div>

            <div className="rounded-lg border border-[#ffbf00] bg-[#101827] px-8 py-5 text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
                Module Status
              </p>
              <p className="mt-3 text-2xl font-black text-[#ffbf00]">
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

        <section className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px_260px_140px]">
            <div>
              <label
                htmlFor="service-request-search"
                className="mb-2 block text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]"
              >
                Search Requests
              </label>
              <div className="flex h-12 items-center gap-3 rounded-lg border border-[#c8d3df] bg-white px-4">
                <Search size={17} className="text-[#94a3b8]" />
                <input
                  id="service-request-search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by request ID, title, department, owner, category, classification, or status..."
                  className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#94a3b8]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="service-request-status"
                className="mb-2 block text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]"
              >
                Status
              </label>
              <select
                id="service-request-status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] outline-none"
              >
                {serviceRequestStatusFilters.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="service-request-department"
                className="mb-2 block text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]"
              >
                Department
              </label>
              <select
                id="service-request-department"
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
                className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] outline-none"
              >
                {serviceRequestDepartmentFilters.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-auto h-12 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
            >
              Clear Filters
            </button>
          </div>
        </section>

        <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0 overflow-hidden rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
            <div className="border-b border-[#d8e1ea] p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                    Enterprise Operations System
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    Service Requests Registry
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#33445c]">
                    Select a service request to preview intake authority,
                    routing stage, department ownership, classification, and
                    future workflow controls.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#fff1bf] px-5 py-3 text-xs font-black text-[#b45309]">
                    {filteredRequests.length} shown
                  </span>
                  <Link
                    href="/service-requests/new"
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#050816] px-5 text-sm font-black text-white transition hover:bg-[#111827]"
                  >
                    <Plus size={16} className="text-[#ffbf00]" />
                    Create Service Request
                  </Link>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[980px]">
                <div className="grid grid-cols-[130px_1.5fr_150px_150px_120px_130px_170px_110px] gap-4 bg-[#f8fafc] px-5 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-[#64748b]">
                  <div>Request ID</div>
                  <div>Title</div>
                  <div>Department</div>
                  <div>Status</div>
                  <div>Priority</div>
                  <div>Owner</div>
                  <div>Queue</div>
                  <div>Actions</div>
                </div>

                {filteredRequests.map((request) => {
                  const isSelected = selectedRequest?.id === request.id;

                  return (
                    <button
                      key={request.id}
                      type="button"
                      onClick={() => setSelectedRequest(request)}
                      className={[
                        "grid w-full grid-cols-[130px_1.5fr_150px_150px_120px_130px_170px_110px] gap-4 border-b border-[#d8e1ea] px-5 py-5 text-left transition last:border-b-0",
                        isSelected
                          ? "bg-[#fff9e6]"
                          : "bg-white hover:bg-[#f8fafc]",
                      ].join(" ")}
                    >
                      <div className="font-black text-[#050816]">
                        {request.id}
                      </div>
                      <div>
                        <p className="font-black text-[#050816]">
                          {request.title}
                        </p>
                        <p className="mt-2 max-w-[260px] text-xs font-semibold leading-6 text-[#48617e]">
                          {request.summary}
                        </p>
                      </div>
                      <div className="font-bold text-[#24364d]">
                        {request.department}
                      </div>
                      <div>
                        <span
                          className={[
                            "rounded-md px-3 py-1 text-xs font-black",
                            getStatusPillClass(request.status),
                          ].join(" ")}
                        >
                          {request.status}
                        </span>
                      </div>
                      <div>
                        <span
                          className={[
                            "rounded-md px-3 py-1 text-xs font-black",
                            getPriorityPillClass(request.priority),
                          ].join(" ")}
                        >
                          {request.priority}
                        </span>
                      </div>
                      <div className="font-black text-[#050816]">
                        {request.owner}
                      </div>
                      <div className="font-black text-blue-700">
                        {request.assignedQueue}
                      </div>
                      <div>
                        <Link
                          href={`/service-requests/${request.id}`}
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-3 py-2 text-xs font-black text-[#050816] transition hover:border-[#ff8a00]"
                        >
                          Open
                          <ArrowRight size={14} className="text-[#ff8a00]" />
                        </Link>
                      </div>
                    </button>
                  );
                })}
              </div>
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
      </div>
    </ServiceRequestWorkspaceFrame>
  );
}

function EmptySelectionPanel() {
  return (
    <aside className="space-y-5">
      <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
              Request Preview
            </p>
            <h2 className="mt-2 text-2xl font-black">No Request Selected</h2>
            <p className="mt-4 text-sm leading-7 text-[#33445c]">
              Select a service request record to review intake category,
              routing stage, ownership, classification, and future workflow
              controls.
            </p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
            <ClipboardList size={24} />
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-[#050816] p-5 text-white">
          <p className="text-[11px] font-black uppercase tracking-[0.35em]">
            Service Request Workspace
          </p>
          <p className="mt-2 text-xs font-bold leading-6">
            Request metadata opens only after intentional request selection.
          </p>
        </div>
      </section>
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
    <aside className="space-y-5">
      <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
              Selected Request
            </p>
            <h2 className="mt-2 text-2xl font-black">{request.id}</h2>
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

        <div className="rounded-lg bg-[#050816] p-5 text-white">
          <p className="text-[11px] font-black uppercase tracking-[0.35em]">
            Controlled Request
          </p>
          <p className="mt-2 text-xs font-bold">{request.classification}</p>
        </div>

        <div className="mt-5">
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

        <div className="mt-5 rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#64748b]">
            Routing Note
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-[#33445c]">
            {request.routingNote}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={onCopyRequestId}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00]"
          >
            <Copy size={16} className="text-[#ff8a00]" />
            {copiedId === request.id ? "Request ID Copied" : "Copy Request ID"}
          </button>

          <Link
            href={`/service-requests/${request.id}`}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-[#050816] px-4 text-sm font-black text-white"
          >
            Open Detail Workspace
          </Link>

          <Link
            href={`/service-requests/queues/${request.routingQueueId}`}
            className="flex h-12 w-full items-center justify-center rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00]"
          >
            Open Assigned Queue
          </Link>
        </div>
      </section>
    </aside>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#d8e1ea] py-3 last:border-b-0">
      <span className="text-sm font-bold text-[#64748b]">{label}</span>
      <span className="max-w-[190px] text-right text-sm font-black text-[#050816]">
        {value}
      </span>
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