"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  Copy,
  Database,
  FileText,
  FolderOpen,
  LockKeyhole,
  Paperclip,
  RotateCcw,
  Route,
  Send,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { serviceRequestQueues } from "@/data/serviceRequests";

type ServiceRequestDraft = {
  title: string;
  requester: string;
  intakeChannel: string;
  department: string;
  category: string;
  classification: string;
  priority: string;
  relatedRecordId: string;
  requestedAction: string;
  dueDate: string;
  summary: string;
  evidenceNote: string;
};

type RelatedRecordOption = {
  id: string;
  title: string;
  type: string;
  owner: string;
  classification: string;
  href: string;
  departments: string[];
  categories: string[];
};

type EvidenceOption = {
  id: string;
  type: string;
  purpose: string;
  requirement: "Required when available" | "Optional" | "Recommended";
};

const intakeChannels = [
  "Internal EOS Intake",
  "Executive Prepared Intake",
  "HCA Prepared Intake",
  "Department Prepared Intake",
  "Third-Party / Client Prepared Intake",
];

const departmentOptions = [
  "Executive Operations",
  "Governance Library",
  "Administration",
  "Treasury",
  "Corporate Records",
  "HCA Review",
  "HCP Restricted",
  "Third-Party / Client",
];

const requestCategories = [
  "Publication Intake",
  "Certified Copy",
  "Document Replacement",
  "Governance Review",
  "Treasury Support",
  "Administrative Support",
  "External Support Request",
  "Parent-Level Review",
];

const classificationOptions = [
  "Internal Governance",
  "Confidential",
  "Restricted Internal",
  "Public / External",
];

const priorityOptions = ["Normal", "High", "Restricted"];

const relatedRecordOptions: RelatedRecordOption[] = [
  {
    id: "HI-ADM-001",
    title: "Enterprise Administration & Enterprise Services Manual",
    type: "Publication",
    owner: "HCA",
    classification: "Internal Governance",
    href: "/governance-library/publications/HI-ADM-001",
    departments: ["Governance Library", "Administration", "Executive Operations"],
    categories: ["Publication Intake", "Administrative Support", "External Support Request"],
  },
  {
    id: "HI-ADM-002",
    title: "Enterprise Document Control Standard",
    type: "Publication",
    owner: "HCA",
    classification: "Internal Governance",
    href: "/governance-library/publications/HI-ADM-002",
    departments: ["Governance Library", "Administration", "Corporate Records", "HCA Review"],
    categories: ["Publication Intake", "Document Replacement", "Governance Review"],
  },
  {
    id: "HI-TRE-001",
    title: "Enterprise Treasury Manual",
    type: "Publication",
    owner: "HCA",
    classification: "Confidential",
    href: "/governance-library/publications/HI-TRE-001",
    departments: ["Treasury", "Executive Operations", "HCP Restricted"],
    categories: ["Treasury Support", "Document Replacement", "Governance Review"],
  },
  {
    id: "HCP-RES-2026-001",
    title: "Foundational Treasury Resolution",
    type: "Resolution",
    owner: "HCP",
    classification: "Confidential",
    href: "/governance-library/resolutions/HCP-RES-2026-001",
    departments: ["Treasury", "Executive Operations", "HCP Restricted"],
    categories: ["Treasury Support", "Parent-Level Review", "Governance Review"],
  },
  {
    id: "CC-HI-ADM-001",
    title: "Certified Copy - HI-ADM-001",
    type: "Certified Copy",
    owner: "Corporate Records",
    classification: "Internal Governance",
    href: "/governance-library/certified-copies",
    departments: ["Corporate Records", "Governance Library", "HCA Review"],
    categories: ["Certified Copy", "Governance Review"],
  },
  {
    id: "ADMIN-WORKFLOW",
    title: "Administrative Workflow Support",
    type: "Operational Reference",
    owner: "Administration",
    classification: "Internal Governance",
    href: "/administration",
    departments: ["Administration", "Executive Operations", "Third-Party / Client"],
    categories: ["Administrative Support", "External Support Request"],
  },
  {
    id: "HCA-REVIEW",
    title: "Restricted HCA Review Layer",
    type: "Restricted Review",
    owner: "HCA",
    classification: "Restricted Internal",
    href: "/service-requests/queues/restricted-hca-review",
    departments: ["HCA Review", "Executive Operations"],
    categories: ["Governance Review", "Document Replacement", "Certified Copy"],
  },
  {
    id: "HCP-RESTRICTED",
    title: "HCP Restricted Review Layer",
    type: "Restricted Review",
    owner: "HCP",
    classification: "Restricted Internal",
    href: "/service-requests/queues/hcp-restricted-review",
    departments: ["HCP Restricted", "Executive Operations"],
    categories: ["Parent-Level Review", "Governance Review"],
  },
  {
    id: "N/A",
    title: "No existing record selected",
    type: "No Related Record",
    owner: "Unassigned",
    classification: "N/A",
    href: "/service-requests",
    departments: departmentOptions,
    categories: requestCategories,
  },
];

const evidenceOptions: EvidenceOption[] = [
  {
    id: "draft-document",
    type: "Draft Document",
    purpose: "Draft material, proposed language, working copy, or document candidate.",
    requirement: "Required when available",
  },
  {
    id: "executed-copy",
    type: "Executed Copy",
    purpose: "Signed record, adopted resolution, executed agreement, or official copy.",
    requirement: "Required when available",
  },
  {
    id: "screenshot",
    type: "Screenshot",
    purpose: "Visual evidence, system state, console output, approval screen, or workflow proof.",
    requirement: "Recommended",
  },
  {
    id: "email-correspondence",
    type: "Email / Correspondence",
    purpose: "Message thread, external request, internal approval note, or correspondence trail.",
    requirement: "Recommended",
  },
  {
    id: "source-record",
    type: "Source Record",
    purpose: "Existing publication, register entry, policy, resolution, certified copy, or record reference.",
    requirement: "Required when available",
  },
  {
    id: "supporting-note",
    type: "Supporting Note",
    purpose: "Administrative explanation, routing note, exception note, or reviewer context.",
    requirement: "Optional",
  },
  {
    id: "other-evidence",
    type: "Other Evidence",
    purpose: "Any other material that should be attached later once backend upload exists.",
    requirement: "Optional",
  },
];

const defaultDraft: ServiceRequestDraft = {
  title: "",
  requester: "Executive Operations",
  intakeChannel: "Internal EOS Intake",
  department: "Executive Operations",
  category: "External Support Request",
  classification: "Internal Governance",
  priority: "Normal",
  relatedRecordId: "N/A",
  requestedAction: "",
  dueDate: "",
  summary: "",
  evidenceNote: "",
};

const intakeSteps = [
  "Identify request purpose",
  "Select department or operating desk",
  "Confirm requester and owner",
  "Classify access level and routing sensitivity",
  "Select related record or mark N/A",
  "Identify evidence or attachment needs",
  "Route for review, approval, execution, or filing",
];

function getRecommendedQueueId(draft: ServiceRequestDraft) {
  const restricted =
    draft.classification === "Restricted Internal" || draft.priority === "Restricted";

  if (draft.department === "HCP Restricted" || draft.category === "Parent-Level Review") {
    return "hcp-restricted-review";
  }

  if (restricted || draft.department === "HCA Review" || draft.category === "Governance Review") {
    return "restricted-hca-review";
  }

  if (draft.department === "Corporate Records" || draft.category === "Certified Copy") {
    return "corporate-records-review";
  }

  if (
    draft.department === "Treasury" ||
    draft.category === "Treasury Support" ||
    draft.category === "Document Replacement"
  ) {
    return "treasury-review";
  }

  if (draft.department === "Governance Library" || draft.category === "Publication Intake") {
    return "governance-library-intake";
  }

  return "administration-desk";
}

function getBadgeClass(value: string) {
  if (value.includes("Restricted")) {
    return "bg-rose-100 text-rose-700";
  }

  if (value.includes("High") || value.includes("Confidential")) {
    return "bg-amber-100 text-amber-700";
  }

  if (value.includes("Public")) {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-emerald-100 text-emerald-700";
}

export default function NewServiceRequestPage() {
  const [draft, setDraft] = useState<ServiceRequestDraft>(defaultDraft);
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState("Copy Draft Packet");

  const recommendedQueueId = getRecommendedQueueId(draft);
  const recommendedQueue =
    serviceRequestQueues.find((queue) => queue.id === recommendedQueueId) ??
    serviceRequestQueues[0];

  const filteredRelatedRecords = useMemo(() => {
    const matchedRecords = relatedRecordOptions.filter((record) => {
      if (record.id === "N/A") {
        return true;
      }

      return (
        record.departments.includes(draft.department) ||
        record.categories.includes(draft.category) ||
        record.owner === recommendedQueue.owner ||
        record.classification === draft.classification
      );
    });

    const selectedRecordStillVisible = matchedRecords.some(
      (record) => record.id === draft.relatedRecordId,
    );

    if (selectedRecordStillVisible) {
      return matchedRecords;
    }

    const selectedRecord = relatedRecordOptions.find(
      (record) => record.id === draft.relatedRecordId,
    );

    return selectedRecord ? [selectedRecord, ...matchedRecords] : matchedRecords;
  }, [draft.category, draft.classification, draft.department, draft.relatedRecordId, recommendedQueue.owner]);

  const selectedRelatedRecord =
    relatedRecordOptions.find((record) => record.id === draft.relatedRecordId) ??
    relatedRecordOptions[relatedRecordOptions.length - 1];

  const selectedEvidenceOptions = evidenceOptions.filter((option) =>
    selectedEvidenceIds.includes(option.id),
  );

  const readinessChecks = [
    { label: "Request title entered", complete: draft.title.trim().length > 0 },
    { label: "Requester identified", complete: draft.requester.trim().length > 0 },
    { label: "Department / desk selected", complete: draft.department.trim().length > 0 },
    { label: "Category selected", complete: draft.category.trim().length > 0 },
    { label: "Classification selected", complete: draft.classification.trim().length > 0 },
    {
      label: "Related record selected or marked N/A",
      complete: draft.relatedRecordId.trim().length > 0,
    },
    {
      label: "Evidence / attachment need identified",
      complete: selectedEvidenceIds.length > 0 || draft.evidenceNote.trim().length > 0,
    },
    { label: "Requested action documented", complete: draft.requestedAction.trim().length > 0 },
    { label: "Request summary documented", complete: draft.summary.trim().length > 0 },
  ];

  const readyCount = readinessChecks.filter((check) => check.complete).length;
  const readyTotal = readinessChecks.length;
  const isReadyForReview = readyCount === readyTotal;

  function updateDraft(field: keyof ServiceRequestDraft, value: string) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
  }

  function toggleEvidence(evidenceId: string) {
    setSelectedEvidenceIds((currentIds) =>
      currentIds.includes(evidenceId)
        ? currentIds.filter((id) => id !== evidenceId)
        : [...currentIds, evidenceId],
    );
  }

  function resetDraft() {
    setDraft(defaultDraft);
    setSelectedEvidenceIds([]);
    setCopyStatus("Copy Draft Packet");
  }

  async function copyDraftPacket() {
    const evidenceList =
      selectedEvidenceOptions.length > 0
        ? selectedEvidenceOptions.map((item) => `- ${item.type}: ${item.purpose}`).join("\n")
        : "- Pending evidence identification";

    const packet = [
      "HIEOS SERVICE REQUEST DRAFT PACKET",
      "",
      `Title: ${draft.title || "Pending"}`,
      `Requester: ${draft.requester || "Pending"}`,
      `Intake Channel: ${draft.intakeChannel}`,
      `Department / Desk: ${draft.department}`,
      `Category: ${draft.category}`,
      `Classification: ${draft.classification}`,
      `Priority: ${draft.priority}`,
      `Recommended Queue: ${recommendedQueue.title}`,
      `Queue Owner: ${recommendedQueue.owner}`,
      `Related Record: ${selectedRelatedRecord.id} — ${selectedRelatedRecord.title}`,
      `Requested Action: ${draft.requestedAction || "Pending"}`,
      `Due Date / Timing: ${draft.dueDate || "Pending"}`,
      "",
      "Request Summary:",
      draft.summary || "Pending",
      "",
      "Evidence / Attachment Plan:",
      evidenceList,
      "",
      "Evidence Note:",
      draft.evidenceNote || "Pending",
      "",
      `Readiness: ${readyCount}/${readyTotal} control checks prepared`,
      "",
      "Frontend Scope Notice:",
      "No request was submitted, saved, routed, assigned, uploaded, transmitted, or filed.",
    ].join("\n");

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(packet);
      setCopyStatus("Draft Packet Copied");
      window.setTimeout(() => setCopyStatus("Copy Draft Packet"), 1800);
    }
  }

  return (
    <div className="min-h-screen bg-[#eef3f8] text-[#020617]">
      <Sidebar />

      <div className="min-h-screen md:pl-[280px]">
        <Topbar />

        <main className="px-5 py-5 lg:px-8">
          <section className="rounded-2xl bg-[#020617] p-8 text-white shadow-md">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.55em] text-[#ffb800]">
                  Hassan Industries
                </p>
                <h1 className="text-3xl font-black uppercase tracking-tight lg:text-4xl">
                  Create Service Request
                </h1>
                <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white/90">
                  Controlled frontend intake workspace for preparing service request metadata,
                  routing recommendations, ownership review, classification checks, and future
                  workflow handoff.
                </p>
              </div>

              <div className="rounded-xl border border-[#ffb800] bg-white/5 px-10 py-7 text-center">
                <p className="text-xs font-black uppercase tracking-[0.55em] text-white">
                  Intake Status
                </p>
                <p className="mt-4 text-3xl font-black text-[#ffb800]">
                  {isReadyForReview ? "Prepared" : "Draft"}
                </p>
                <p className="mt-2 text-xs font-bold text-white/90">
                  Frontend Preparation
                </p>
              </div>
            </div>
          </section>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/service-requests"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black shadow-sm transition hover:border-[#ff8a00] hover:text-[#d97706]"
            >
              <ArrowLeft className="h-4 w-4 text-[#ff8a00]" />
              Service Requests Desk
            </Link>

            <Link
              href="/service-requests/queues"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black shadow-sm transition hover:border-[#ff8a00] hover:text-[#d97706]"
            >
              <Route className="h-4 w-4 text-[#ff8a00]" />
              Routing Queues
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black shadow-sm transition hover:border-[#ff8a00] hover:text-[#d97706]"
            >
              <FolderOpen className="h-4 w-4 text-[#ff8a00]" />
              Dashboard
            </Link>
          </div>

          <div className="mt-10 text-right text-xs font-black uppercase tracking-[0.55em] text-slate-400">
            Controlled Request Intake
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_390px]">
            <div className="space-y-5">
              <section className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb800]">
                    <ClipboardList className="h-7 w-7" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.45em] text-slate-400">
                      Service Request Intake
                    </p>
                    <h2 className="mt-2 text-3xl font-black">New Service Request</h2>
                    <p className="mt-4 max-w-4xl text-sm font-medium leading-7 text-slate-600">
                      This page does not submit or save records yet. It helps the requester prepare a
                      governed request package so the future backend can route the work cleanly
                      instead of creating an unstructured inbox.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.45em] text-slate-400">
                    Intake Form
                  </p>
                  <h3 className="mt-2 text-2xl font-black">Request Metadata</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                    Capture enough information to determine ownership, authority, access level,
                    routing queue, related record, evidence needs, and next action.
                  </p>
                </div>

                <div className="grid gap-5 p-6 lg:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Request Title *
                    </span>
                    <input
                      value={draft.title}
                      onChange={(event) => updateDraft("title", event.target.value)}
                      placeholder="Example: Treasury document replacement request"
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Requester *
                    </span>
                    <input
                      value={draft.requester}
                      onChange={(event) => updateDraft("requester", event.target.value)}
                      placeholder="Executive Operations, Treasury, HCA, third party..."
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Intake Channel
                    </span>
                    <select
                      value={draft.intakeChannel}
                      onChange={(event) => updateDraft("intakeChannel", event.target.value)}
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    >
                      {intakeChannels.map((channel) => (
                        <option key={channel}>{channel}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Department / Desk
                    </span>
                    <select
                      value={draft.department}
                      onChange={(event) => updateDraft("department", event.target.value)}
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    >
                      {departmentOptions.map((department) => (
                        <option key={department}>{department}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Request Category
                    </span>
                    <select
                      value={draft.category}
                      onChange={(event) => updateDraft("category", event.target.value)}
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    >
                      {requestCategories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Classification
                    </span>
                    <select
                      value={draft.classification}
                      onChange={(event) => updateDraft("classification", event.target.value)}
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    >
                      {classificationOptions.map((classification) => (
                        <option key={classification}>{classification}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Priority
                    </span>
                    <select
                      value={draft.priority}
                      onChange={(event) => updateDraft("priority", event.target.value)}
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    >
                      {priorityOptions.map((priority) => (
                        <option key={priority}>{priority}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Related Record / Reference
                    </span>
                    <select
                      value={draft.relatedRecordId}
                      onChange={(event) => updateDraft("relatedRecordId", event.target.value)}
                      className="mt-3 w-full rounded-lg border border-[#ff8a00] bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    >
                      {filteredRelatedRecords.map((record) => (
                        <option key={record.id} value={record.id}>
                          {record.id} — {record.title}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                      Filtered by selected department, category, owner, and classification where
                      possible. This is frontend-only and does not create a real record link yet.
                    </p>
                  </label>

                  <label className="block lg:col-span-2">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Requested Action *
                    </span>
                    <input
                      value={draft.requestedAction}
                      onChange={(event) => updateDraft("requestedAction", event.target.value)}
                      placeholder="Prepare review, route to Treasury, verify certified copy, assign owner..."
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Due Date / Timing
                    </span>
                    <input
                      value={draft.dueDate}
                      onChange={(event) => updateDraft("dueDate", event.target.value)}
                      placeholder="Pending, ASAP, 2026-06-30, next review cycle..."
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    />
                  </label>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                      Selected Reference
                    </p>
                    <p className="mt-3 text-sm font-black">{selectedRelatedRecord.id}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {selectedRelatedRecord.title}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">
                        {selectedRelatedRecord.type}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">
                        {selectedRelatedRecord.owner}
                      </span>
                    </div>
                  </div>

                  <label className="block lg:col-span-2">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Request Summary *
                    </span>
                    <textarea
                      value={draft.summary}
                      onChange={(event) => updateDraft("summary", event.target.value)}
                      placeholder="Describe the issue, purpose, requested outcome, and why this request needs routing."
                      rows={5}
                      className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb800]">
                      <Paperclip className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.45em] text-slate-400">
                        Evidence Preparation
                      </p>
                      <h3 className="mt-2 text-2xl font-black">Attachment / Evidence Plan</h3>
                      <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                        Identify the supporting files, screenshots, executed copies, source records,
                        emails, or notes that should be attached later when backend upload exists.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-6 md:grid-cols-2">
                  {evidenceOptions.map((option) => {
                    const selected = selectedEvidenceIds.includes(option.id);

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleEvidence(option.id)}
                        className={`rounded-lg border p-4 text-left transition ${
                          selected
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-slate-200 bg-slate-50 hover:border-[#ff8a00]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-black">{option.type}</p>
                            <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                              {option.purpose}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${
                              selected
                                ? "bg-emerald-200 text-emerald-800"
                                : "bg-white text-slate-500"
                            }`}
                          >
                            {selected ? "Needed" : "Select"}
                          </span>
                        </div>
                        <p className="mt-4 text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                          {option.requirement}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="px-6 pb-6">
                  <label className="block">
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-slate-500">
                      Evidence Note
                    </span>
                    <textarea
                      value={draft.evidenceNote}
                      onChange={(event) => updateDraft("evidenceNote", event.target.value)}
                      placeholder="List files, screenshots, executed copies, source documents, emails, or records that should be attached later."
                      rows={4}
                      className="mt-3 w-full rounded-lg border border-[#ff8a00] bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#ff8a00]"
                    />
                  </label>

                  <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-800">
                    No file is uploaded, stored, transmitted, attached, routed, or filed in this
                    frontend phase. This section only prepares the future attachment/evidence
                    requirements.
                  </div>
                </div>
              </section>

              <div className="grid gap-5 lg:grid-cols-2">
                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#020617] text-[#ffb800]">
                      <Route className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-[0.45em]">
                      Intake Steps
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {intakeSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#020617] text-sm font-black text-[#ffb800]">
                          {index + 1}
                        </span>
                        <p className="text-sm font-black">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#020617] text-[#ffb800]">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-[0.45em]">
                      Control Checklist
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {readinessChecks.map((check) => (
                      <div
                        key={check.label}
                        className={`flex items-center gap-4 rounded-lg border p-4 ${
                          check.complete
                            ? "border-emerald-200 bg-emerald-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <ShieldCheck
                          className={`h-4 w-4 ${
                            check.complete ? "text-emerald-600" : "text-[#ff8a00]"
                          }`}
                        />
                        <p
                          className={`text-sm font-black ${
                            check.complete ? "text-emerald-700" : "text-slate-900"
                          }`}
                        >
                          {check.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <aside className="space-y-5">
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black uppercase tracking-[0.45em]">
                  Intake Actions
                </h3>
                <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
                  These actions prepare a controlled request package only. They do not submit, save,
                  route, assign, upload, notify, or create backend records.
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#020617] px-4 py-4 text-sm font-black text-white transition hover:bg-[#111827]"
                  >
                    <Send className="h-4 w-4 text-[#ffb800]" />
                    Prepare Intake Review
                  </button>

                  <button
                    type="button"
                    onClick={() => void copyDraftPacket()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-black transition hover:border-[#ff8a00]"
                  >
                    <Copy className="h-4 w-4 text-[#ff8a00]" />
                    {copyStatus}
                  </button>

                  <button
                    type="button"
                    onClick={resetDraft}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-black transition hover:border-[#ff8a00]"
                  >
                    <RotateCcw className="h-4 w-4 text-[#ff8a00]" />
                    Reset Draft
                  </button>

                  <Link
                    href="/service-requests"
                    className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-black transition hover:border-[#ff8a00]"
                  >
                    Return to Service Requests Desk
                  </Link>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb800]">
                    <Route className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.45em] text-slate-400">
                      Routing Recommendation
                    </p>
                    <h3 className="mt-2 text-2xl font-black">{recommendedQueue.title}</h3>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className="font-bold text-slate-500">Queue Owner</span>
                    <span className="text-right font-black">{recommendedQueue.owner}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className="font-bold text-slate-500">Department</span>
                    <span className="text-right font-black">{recommendedQueue.department}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className="font-bold text-slate-500">Access Scope</span>
                    <span className="text-right font-black">{recommendedQueue.accessScope}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className="font-bold text-slate-500">Priority</span>
                    <span className="text-right font-black">{draft.priority}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="font-bold text-slate-500">Intake Channel</span>
                    <span className="text-right font-black">{draft.intakeChannel}</span>
                  </div>
                </div>

                <Link
                  href={`/service-requests/queues/${recommendedQueue.id}`}
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-[#020617] px-4 py-4 text-sm font-black text-white transition hover:bg-[#111827]"
                >
                  Open Recommended Queue
                </Link>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb800]">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.45em] text-slate-400">
                      Draft Request Package
                    </p>
                    <h3 className="mt-2 text-2xl font-black">SR-DRAFT</h3>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.45em] text-slate-400">
                    Prepared Metadata
                  </p>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                      <span className="font-bold text-slate-500">Title</span>
                      <span className="text-right font-black">{draft.title || "Pending"}</span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                      <span className="font-bold text-slate-500">Category</span>
                      <span className="text-right font-black">{draft.category}</span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                      <span className="font-bold text-slate-500">Classification</span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${getBadgeClass(
                          draft.classification,
                        )}`}
                      >
                        {draft.classification}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                      <span className="font-bold text-slate-500">Related Record</span>
                      <span className="text-right font-black">{selectedRelatedRecord.id}</span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-slate-200 pb-3">
                      <span className="font-bold text-slate-500">Evidence Plan</span>
                      <span className="text-right font-black">
                        {selectedEvidenceOptions.length > 0
                          ? `${selectedEvidenceOptions.length} identified`
                          : "Pending"}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-bold text-slate-500">Requested Action</span>
                      <span className="text-right font-black">
                        {draft.requestedAction || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-5 rounded-lg border p-4 text-sm font-black leading-6 ${
                    isReadyForReview
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-amber-200 bg-amber-50 text-amber-800"
                  }`}
                >
                  {readyCount}/{readyTotal} control checks prepared.{" "}
                  {isReadyForReview
                    ? "Draft package is ready for frontend intake review."
                    : "Complete the missing fields before treating this as ready."}
                </div>
              </section>

              <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb800]">
                    <LockKeyhole className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-[0.45em]">
                      Control Notes
                    </h3>
                    <ul className="mt-5 space-y-3 text-sm font-medium leading-6 text-slate-600">
                      <li>• Intake remains frontend-only in this phase.</li>
                      <li>• No request ID is reserved or saved.</li>
                      <li>• No attachment is uploaded or stored.</li>
                      <li>• No owner is actually assigned.</li>
                      <li>
                        • Restricted and third-party intake should receive separate role-based pages
                        in a later phase.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb800]">
                    <Database className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-[0.45em]">
                      Training Note
                    </h3>
                    <p className="mt-5 text-sm font-medium leading-7 text-slate-600">
                      Service Requests should not become a dumping ground. A request should exist
                      only when work needs routing, ownership, review, approval, recordkeeping,
                      evidence tracking, restricted handling, or department action. Every request
                      should create operational clarity instead of unnecessary work.
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}