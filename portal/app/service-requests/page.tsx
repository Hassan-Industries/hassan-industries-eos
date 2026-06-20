"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
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

type ServiceRequestStatus =
  | "Open"
  | "In Review"
  | "Pending Routing"
  | "Restricted Review"
  | "Closed";

type ServiceRequestPriority = "Normal" | "High" | "Restricted";

type ServiceRequestRecord = {
  id: string;
  title: string;
  requester: string;
  department: string;
  owner: string;
  status: ServiceRequestStatus;
  priority: ServiceRequestPriority;
  category: string;
  classification: string;
  dueDate: string;
  stage: string;
  summary: string;
  routingNote: string;
};

const serviceRequestRecords: ServiceRequestRecord[] = [
  {
    id: "SR-2026-001",
    title: "EGL Publication Intake Request",
    requester: "Executive Operations",
    department: "Governance Library",
    owner: "HCA",
    status: "Open",
    priority: "Normal",
    category: "Publication Intake",
    classification: "Internal Governance",
    dueDate: "Pending",
    stage: "Intake Review",
    summary:
      "Controlled request to prepare or register a new Enterprise Governance Library publication record.",
    routingNote:
      "Route through HCA document-control review before publication numbering, approval, or repository filing.",
  },
  {
    id: "SR-2026-002",
    title: "Certified Copy Issuance Request",
    requester: "Corporate Records",
    department: "Corporate Records",
    owner: "Corporate Records",
    status: "In Review",
    priority: "Normal",
    category: "Certified Copy",
    classification: "Internal Governance",
    dueDate: "Pending",
    stage: "Authority Verification",
    summary:
      "Request to verify source authority and prepare a certified copy for administrative reference or governance evidence.",
    routingNote:
      "Route through source-record verification before certified-copy issuance or filing.",
  },
  {
    id: "SR-2026-003",
    title: "Treasury Document Replacement Request",
    requester: "Treasury",
    department: "Treasury",
    owner: "Treasury",
    status: "Pending Routing",
    priority: "High",
    category: "Document Replacement",
    classification: "Confidential",
    dueDate: "Pending",
    stage: "Routing Assignment",
    summary:
      "Controlled intake for replacing or revising a treasury-controlled document connected to EGL records.",
    routingNote:
      "Route to Treasury owner and HCA document-control review before replacement upload or approval.",
  },
  {
    id: "SR-2026-004",
    title: "Restricted HCA Governance Review",
    requester: "Administration",
    department: "HCA Review",
    owner: "HCA",
    status: "Restricted Review",
    priority: "Restricted",
    category: "Governance Review",
    classification: "Restricted Internal",
    dueDate: "Pending",
    stage: "Restricted Review",
    summary:
      "Restricted internal review request requiring separation between visibility, drafting, review, approval, and recordkeeping authority.",
    routingNote:
      "Route only through restricted HCA review layers. Preserve access separation before future backend enforcement.",
  },
  {
    id: "SR-2026-005",
    title: "Administrative Workflow Clarification",
    requester: "Administration",
    department: "Administration",
    owner: "Administration",
    status: "Open",
    priority: "Normal",
    category: "Administrative Support",
    classification: "Internal Governance",
    dueDate: "Pending",
    stage: "Department Review",
    summary:
      "General administrative intake request for routing a workflow question, record issue, or department support matter.",
    routingNote:
      "Route to Administration first, then escalate to HCA only if document-control or governance authority is implicated.",
  },
];

const statusFilters = [
  "All Statuses",
  "Open",
  "In Review",
  "Pending Routing",
  "Restricted Review",
  "Closed",
];

const departmentFilters = [
  "All Departments",
  "Governance Library",
  "Treasury",
  "Corporate Records",
  "Administration",
  "HCA Review",
];

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
        [
          request.id,
          request.title,
          request.requester,
          request.department,
          request.owner,
          request.status,
          request.priority,
          request.category,
          request.classification,
          request.stage,
          request.summary,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

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
    void navigator.clipboard.writeText(requestId);
    setCopiedId(requestId);
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.55em] text-amber-400">
                    Hassan Industries
                  </p>
                  <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">
                    Service Requests Desk
                  </h1>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-100">
                    Universal frontend intake and routing workspace for
                    administrative requests, governance review, document-control
                    actions, certified-copy support, treasury support, and
                    restricted HCA review preparation.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.42em] text-white">
                    Module Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    Frontend Desk
                  </p>
                  <p className="mt-1 text-xs text-slate-200">
                    Intake Routing Layer
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <FolderOpen className="h-4 w-4 text-amber-500" />
                Back to Dashboard
              </Link>

              <Link
                href="/service-requests/new"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Plus className="h-4 w-4 text-amber-400" />
                Create Service Request
              </Link>
            </div>

            <p className="text-right text-[12px] font-black uppercase tracking-[0.5em] text-slate-400">
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
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_190px_220px_120px]">
                <label className="block">
                  <span className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                    Search Requests
                  </span>
                  <div className="mt-2 flex h-[48px] items-center gap-3 rounded-lg border border-slate-300 bg-white px-4">
                    <Search className="h-4 w-4 shrink-0 text-slate-400" />
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search by request ID, title, department, owner, category, classification, or status..."
                      className="h-full w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                    Status
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="mt-2 h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                  >
                    {statusFilters.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                    Department
                  </span>
                  <select
                    value={departmentFilter}
                    onChange={(event) =>
                      setDepartmentFilter(event.target.value)
                    }
                    className="mt-2 h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                  >
                    {departmentFilters.map((department) => (
                      <option key={department}>{department}</option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-[26px] h-[48px] rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
                >
                  Clear Filters
                </button>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
              <div className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.42em] text-slate-400">
                      Enterprise Operations System
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Service Requests Registry
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
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
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-black text-white transition hover:bg-slate-800"
                    >
                      <Plus className="h-4 w-4 text-amber-400" />
                      Create Service Request
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto p-5">
                  <table className="min-w-[980px] w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-left">
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                          Request ID
                        </th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                          Title
                        </th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                          Department
                        </th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                          Status
                        </th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                          Priority
                        </th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                          Owner
                        </th>
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
                              <p className="mt-2 max-w-[320px] text-xs leading-5 text-slate-500">
                                {request.summary}
                              </p>
                            </td>
                            <td className="px-4 py-5 align-top text-sm font-bold text-slate-700">
                              {request.department}
                            </td>
                            <td className="px-4 py-5 align-top">
                              <span
                                className={[
                                  "rounded-md px-3 py-1 text-xs font-black",
                                  getStatusPillClass(request.status),
                                ].join(" ")}
                              >
                                {request.status}
                              </span>
                            </td>
                            <td className="px-4 py-5 align-top">
                              <span
                                className={[
                                  "rounded-md px-3 py-1 text-xs font-black",
                                  getPriorityPillClass(request.priority),
                                ].join(" ")}
                              >
                                {request.priority}
                              </span>
                            </td>
                            <td className="px-4 py-5 align-top text-sm font-black text-slate-950">
                              {request.owner}
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
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.42em] text-slate-400">
                          Selected Request
                        </p>
                        <h2 className="mt-3 text-2xl font-black text-slate-950">
                          {selectedRequest.id}
                        </h2>
                        <p className="mt-1 text-sm font-black text-slate-950">
                          {selectedRequest.title}
                        </p>
                      </div>

                      <span
                        className={[
                          "rounded-md px-3 py-1 text-xs font-black",
                          getStatusPillClass(selectedRequest.status),
                        ].join(" ")}
                      >
                        {selectedRequest.status}
                      </span>
                    </div>

                    <div className="mt-5 rounded-lg bg-slate-950 p-4 text-white">
                      <div className="flex items-center gap-3">
                        <ClipboardList className="h-6 w-6 text-amber-400" />
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.4em]">
                            Controlled Request
                          </p>
                          <p className="text-xs text-slate-200">
                            {selectedRequest.classification}
                          </p>
                        </div>
                      </div>
                    </div>

                    <dl className="mt-5 space-y-0 text-sm">
                      {[
                        ["Requester", selectedRequest.requester],
                        ["Department", selectedRequest.department],
                        ["Owner", selectedRequest.owner],
                        ["Category", selectedRequest.category],
                        ["Priority", selectedRequest.priority],
                        ["Stage", selectedRequest.stage],
                        ["Due Date", selectedRequest.dueDate],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between border-b border-slate-200 py-3"
                        >
                          <dt className="font-bold text-slate-500">{label}</dt>
                          <dd className="text-right font-black text-slate-950">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
                        Routing Note
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        {selectedRequest.routingNote}
                      </p>
                    </div>

                    <div className="mt-5 space-y-2">
                      <button
                        type="button"
                        onClick={() => copyRequestId(selectedRequest.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                      >
                        <Copy className="h-4 w-4 text-amber-500" />
                        {copiedId === selectedRequest.id
                          ? "Request ID Copied"
                          : "Copy Request ID"}
                      </button>

                      <Link
                        href="/service-requests/new"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                      >
                        <Plus className="h-4 w-4 text-amber-400" />
                        Open Intake Shell
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.42em] text-slate-400">
                          Request Preview
                        </p>
                        <h2 className="mt-3 text-2xl font-black text-slate-950">
                          No Request Selected
                        </h2>
                      </div>

                      <div className="rounded-lg bg-slate-950 p-3">
                        <ClipboardList className="h-6 w-6 text-amber-400" />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      Select a service request record to review intake category,
                      routing stage, ownership, classification, and future
                      workflow controls.
                    </p>

                    <div className="mt-5 rounded-lg bg-slate-950 p-4 text-white">
                      <p className="text-[11px] font-black uppercase tracking-[0.35em]">
                        Service Request Workspace
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-200">
                        Request metadata opens only after intentional request
                        selection.
                      </p>
                    </div>
                  </div>
                )}

                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-950 p-3">
                      <ShieldCheck className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-[0.3em] text-slate-950">
                      Routing Standard
                    </h3>
                  </div>

                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    <li>• Service requests serve as universal intake.</li>
                    <li>• HCA review remains separated from execution.</li>
                    <li>• Restricted matters require controlled visibility.</li>
                    <li>• Backend routing, approval, and records follow later.</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-950 p-3">
                      <UserRoundCheck className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-[0.3em] text-slate-950">
                      Backend Readiness
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    Future work should connect this desk to authenticated
                    request submission, role-based assignment, approval routing,
                    department queues, service-level tracking, comments,
                    attachments, audit logs, and permanent records.
                  </p>
                </div>
              </aside>
            </section>
          </div>
        </main>
      </div>
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