"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  Copy,
  Database,
  FileText,
  FolderOpen,
  LockKeyhole,
  RotateCcw,
  Route,
  Send,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

type IntakeOption = {
  value: string;
  label: string;
};

type RelatedReference = {
  id: string;
  title: string;
  type: string;
  department: string;
  category: string;
  classification: string;
};

type QueueRecommendation = {
  title: string;
  owner: string;
  department: string;
  accessScope: string;
  href: string;
};

const intakeChannels: IntakeOption[] = [
  { value: "Internal EOS Intake", label: "Internal EOS Intake" },
  { value: "Executive Prepared Intake", label: "Executive Prepared Intake" },
  { value: "HCA Prepared Intake", label: "HCA Prepared Intake" },
  { value: "Third-Party / Client Intake", label: "Third-Party / Client Intake" },
];

const departmentOptions: IntakeOption[] = [
  { value: "Executive Operations", label: "Executive Operations" },
  { value: "Governance Library", label: "Governance Library" },
  { value: "Corporate Records", label: "Corporate Records" },
  { value: "Treasury", label: "Treasury" },
  { value: "Administration", label: "Administration" },
  { value: "HCA Review", label: "HCA Review" },
  { value: "HCP Restricted", label: "HCP Restricted" },
  { value: "Third-Party / Client", label: "Third-Party / Client" },
];

const requestCategories: IntakeOption[] = [
  { value: "Publication Intake", label: "Publication Intake" },
  { value: "Certified Copy", label: "Certified Copy" },
  { value: "Document Replacement", label: "Document Replacement" },
  { value: "Governance Review", label: "Governance Review" },
  { value: "Treasury Support", label: "Treasury Support" },
  { value: "Administrative Support", label: "Administrative Support" },
  { value: "External Support Request", label: "External Support Request" },
  { value: "Parent-Level Review", label: "Parent-Level Review" },
];

const classificationOptions: IntakeOption[] = [
  { value: "Internal Governance", label: "Internal Governance" },
  { value: "Confidential", label: "Confidential" },
  { value: "Restricted Internal", label: "Restricted Internal" },
  { value: "External / Client", label: "External / Client" },
];

const priorityOptions: IntakeOption[] = [
  { value: "Normal", label: "Normal" },
  { value: "High", label: "High" },
  { value: "Restricted", label: "Restricted" },
];

const relatedReferences: RelatedReference[] = [
  {
    id: "N/A",
    title: "No existing record selected",
    type: "None",
    department: "All",
    category: "All",
    classification: "All",
  },
  {
    id: "HI-ADM-001",
    title: "Enterprise Administration & Enterprise Services Manual",
    type: "Publication",
    department: "Administration",
    category: "Administrative Support",
    classification: "Internal Governance",
  },
  {
    id: "HI-ADM-002",
    title: "Enterprise Document Control Standard",
    type: "Publication",
    department: "Governance Library",
    category: "Document Replacement",
    classification: "Internal Governance",
  },
  {
    id: "HI-TRE-001",
    title: "Enterprise Treasury Manual",
    type: "Publication",
    department: "Treasury",
    category: "Treasury Support",
    classification: "Confidential",
  },
  {
    id: "HCP-RES-2026-001",
    title: "Foundational Treasury Resolution",
    type: "Resolution",
    department: "Treasury",
    category: "Governance Review",
    classification: "Internal Governance",
  },
  {
    id: "CC-HI-ADM-001",
    title: "Certified Copy — HI-ADM-001",
    type: "Certified Copy",
    department: "Corporate Records",
    category: "Certified Copy",
    classification: "Internal Governance",
  },
  {
    id: "HCP-RESTRICTED",
    title: "HCP Restricted Review Layer",
    type: "Restricted Review",
    department: "HCP Restricted",
    category: "Parent-Level Review",
    classification: "Restricted Internal",
  },
  {
    id: "HCA-REVIEW",
    title: "Restricted HCA Review Layer",
    type: "Restricted Review",
    department: "HCA Review",
    category: "Governance Review",
    classification: "Restricted Internal",
  },
];

const intakeSteps = [
  "Identify request purpose",
  "Select department or operating desk",
  "Confirm requester and owner",
  "Classify access level and routing sensitivity",
  "Select related record or mark N/A",
  "Identify attachment or evidence needs",
  "Route for review, approval, execution, or filing",
];

function getQueueRecommendation(
  department: string,
  category: string,
  classification: string,
): QueueRecommendation {
  if (department === "HCP Restricted" || category === "Parent-Level Review") {
    return {
      title: "HCP Restricted Review",
      owner: "HCP",
      department: "HCP Restricted",
      accessScope: "HCP + Executive Authorization",
      href: "/service-requests/queues/hcp-restricted-review",
    };
  }

  if (department === "HCA Review" || classification === "Restricted Internal") {
    return {
      title: "Restricted HCA Review",
      owner: "HCA",
      department: "HCA Review",
      accessScope: "HCA + Executive Authorization",
      href: "/service-requests/queues/restricted-hca-review",
    };
  }

  if (department === "Corporate Records" || category === "Certified Copy") {
    return {
      title: "Corporate Records Review",
      owner: "Corporate Records",
      department: "Corporate Records",
      accessScope: "Corporate Records + HCA",
      href: "/service-requests/queues/corporate-records-review",
    };
  }

  if (department === "Treasury" || category === "Treasury Support") {
    return {
      title: "Treasury Review",
      owner: "Treasury",
      department: "Treasury",
      accessScope: "Treasury + HCA",
      href: "/service-requests/queues/treasury-review",
    };
  }

  if (department === "Governance Library" || category === "Publication Intake") {
    return {
      title: "Governance Library Intake",
      owner: "HCA",
      department: "Governance Library",
      accessScope: "HCA + Authorized Governance Library Staff",
      href: "/service-requests/queues/governance-library-intake",
    };
  }

  return {
    title: "Administration Desk",
    owner: "Administration",
    department: "Administration",
    accessScope: "Administration + Assigned Owner",
    href: "/service-requests/queues/administration-desk",
  };
}

function getFilteredReferences(
  department: string,
  category: string,
  classification: string,
) {
  const matches = relatedReferences.filter((reference) => {
    if (reference.id === "N/A") return true;

    const departmentMatch =
      reference.department === department ||
      department === "Executive Operations" ||
      department === "Third-Party / Client";

    const categoryMatch =
      reference.category === category ||
      category === "External Support Request" ||
      category === "Administrative Support";

    const classificationMatch =
      reference.classification === classification ||
      reference.classification === "Internal Governance" ||
      classification === "External / Client";

    return departmentMatch || categoryMatch || classificationMatch;
  });

  return matches.length ? matches : relatedReferences.filter((reference) => reference.id === "N/A");
}

export default function NewServiceRequestPage() {
  const [requestTitle, setRequestTitle] = useState("");
  const [requester, setRequester] = useState("Executive Operations");
  const [intakeChannel, setIntakeChannel] = useState("Internal EOS Intake");
  const [department, setDepartment] = useState("Executive Operations");
  const [category, setCategory] = useState("External Support Request");
  const [classification, setClassification] = useState("Internal Governance");
  const [priority, setPriority] = useState("Normal");
  const [relatedRecord, setRelatedRecord] = useState("N/A");
  const [requestedAction, setRequestedAction] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [requestSummary, setRequestSummary] = useState("");
  const [evidenceNote, setEvidenceNote] = useState("");

  const queueRecommendation = useMemo(
    () => getQueueRecommendation(department, category, classification),
    [department, category, classification],
  );

  const filteredReferences = useMemo(
    () => getFilteredReferences(department, category, classification),
    [department, category, classification],
  );

  const selectedReference =
    filteredReferences.find((reference) => reference.id === relatedRecord) ??
    relatedReferences.find((reference) => reference.id === "N/A");

  const controlChecks = [
    { label: "Request title entered", complete: requestTitle.trim().length > 0 },
    { label: "Requester identified", complete: requester.trim().length > 0 },
    { label: "Department / desk selected", complete: department.trim().length > 0 },
    { label: "Category selected", complete: category.trim().length > 0 },
    { label: "Classification selected", complete: classification.trim().length > 0 },
    { label: "Related record selected or marked N/A", complete: relatedRecord.trim().length > 0 },
    { label: "Evidence / attachment need identified", complete: evidenceNote.trim().length > 0 },
    { label: "Requested action documented", complete: requestedAction.trim().length > 0 },
    { label: "Request summary documented", complete: requestSummary.trim().length > 0 },
  ];

  const completedChecks = controlChecks.filter((check) => check.complete).length;

  const resetDraft = () => {
    setRequestTitle("");
    setRequester("Executive Operations");
    setIntakeChannel("Internal EOS Intake");
    setDepartment("Executive Operations");
    setCategory("External Support Request");
    setClassification("Internal Governance");
    setPriority("Normal");
    setRelatedRecord("N/A");
    setRequestedAction("");
    setDueDate("");
    setRequestSummary("");
    setEvidenceNote("");
  };

  return (
    <div className="min-h-screen bg-[#edf3f8] text-[#050816]">
      <Sidebar />

      <div className="min-h-screen lg:pl-[280px]">
        <Topbar />

        <main className="px-5 py-5 lg:px-6 lg:py-6">
          <section className="rounded-xl bg-[#020617] px-7 py-7 text-white shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.55em] text-[#ffb703]">
                  Hassan Industries
                </p>
                <h1 className="text-3xl font-black uppercase tracking-tight">
                  Create Service Request
                </h1>
                <p className="mt-3 max-w-5xl text-sm font-semibold leading-7 text-white/90">
                  Controlled frontend intake workspace for preparing service request metadata,
                  routing recommendations, ownership review, classification checks, attachment
                  requirements, and future workflow handoff.
                </p>
              </div>

              <div className="rounded-lg border border-[#ffb703] bg-white/5 px-8 py-6 text-center">
                <p className="text-xs font-black uppercase tracking-[0.45em] text-white">
                  Intake Status
                </p>
                <p className="mt-4 text-2xl font-black text-[#ffb703]">Draft</p>
                <p className="mt-1 text-xs font-bold text-white">Frontend Preparation</p>
              </div>
            </div>
          </section>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/service-requests"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black shadow-sm transition hover:border-[#ffb703]"
            >
              <ArrowLeft size={16} className="text-[#fb8500]" />
              Service Requests Desk
            </Link>

            <Link
              href="/service-requests/queues"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black shadow-sm transition hover:border-[#ffb703]"
            >
              <Route size={16} className="text-[#fb8500]" />
              Routing Queues
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black shadow-sm transition hover:border-[#ffb703]"
            >
              <FolderOpen size={16} className="text-[#fb8500]" />
              Dashboard
            </Link>
          </div>

          <p className="mt-5 text-right text-xs font-black uppercase tracking-[0.55em] text-slate-400">
            Controlled Request Intake
          </p>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
            <div className="space-y-5">
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                    <ClipboardList size={28} />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.45em] text-slate-400">
                      Service Request Intake
                    </p>
                    <h2 className="mt-2 text-3xl font-black">New Service Request</h2>
                    <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
                      This page does not submit or save records yet. It prepares a governed request
                      package so the future backend can route the work cleanly instead of creating
                      an unstructured inbox.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.45em] text-slate-400">
                    Intake Form
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Request Metadata</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Capture enough information to determine ownership, authority, access level,
                    routing queue, related record, evidence needs, and next action.
                  </p>
                </div>

                <div className="grid gap-5 p-6 lg:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Request Title *
                    </span>
                    <input
                      value={requestTitle}
                      onChange={(event) => setRequestTitle(event.target.value)}
                      placeholder="Example: Treasury document replacement request"
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Requester *
                    </span>
                    <input
                      value={requester}
                      onChange={(event) => setRequester(event.target.value)}
                      placeholder="Executive Operations, Treasury, HCA, third party..."
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Intake Channel
                    </span>
                    <select
                      value={intakeChannel}
                      onChange={(event) => setIntakeChannel(event.target.value)}
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    >
                      {intakeChannels.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Department / Desk
                    </span>
                    <select
                      value={department}
                      onChange={(event) => {
                        setDepartment(event.target.value);
                        setRelatedRecord("N/A");
                      }}
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    >
                      {departmentOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Request Category
                    </span>
                    <select
                      value={category}
                      onChange={(event) => {
                        setCategory(event.target.value);
                        setRelatedRecord("N/A");
                      }}
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    >
                      {requestCategories.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Classification
                    </span>
                    <select
                      value={classification}
                      onChange={(event) => {
                        setClassification(event.target.value);
                        setRelatedRecord("N/A");
                      }}
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    >
                      {classificationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Priority
                    </span>
                    <select
                      value={priority}
                      onChange={(event) => setPriority(event.target.value)}
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    >
                      {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Related Record / Reference
                    </span>
                    <select
                      value={relatedRecord}
                      onChange={(event) => setRelatedRecord(event.target.value)}
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    >
                      {filteredReferences.map((reference) => (
                        <option key={reference.id} value={reference.id}>
                          {reference.id} — {reference.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2 lg:col-span-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Requested Action *
                    </span>
                    <input
                      value={requestedAction}
                      onChange={(event) => setRequestedAction(event.target.value)}
                      placeholder="Prepare review, route to Treasury, verify certified copy, assign owner..."
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Due Date / Timing
                    </span>
                    <input
                      value={dueDate}
                      onChange={(event) => setDueDate(event.target.value)}
                      placeholder="Pending, ASAP, 2026-06-30, next review cycle..."
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    />
                  </label>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
                      Selected Reference
                    </p>
                    <p className="mt-2 text-sm font-black">{selectedReference?.id}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                      {selectedReference?.title}
                    </p>
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                      {selectedReference?.type}
                    </p>
                  </div>

                  <label className="space-y-2 lg:col-span-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Request Summary *
                    </span>
                    <textarea
                      value={requestSummary}
                      onChange={(event) => setRequestSummary(event.target.value)}
                      placeholder="Describe the issue, purpose, requested outcome, and why this request needs routing."
                      className="min-h-32 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-semibold leading-6 outline-none transition focus:border-[#fb8500]"
                    />
                  </label>

                  <label className="space-y-2 lg:col-span-2">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">
                      Attachment / Evidence Note
                    </span>
                    <textarea
                      value={evidenceNote}
                      onChange={(event) => setEvidenceNote(event.target.value)}
                      placeholder="List files, screenshots, executed copies, source documents, emails, approvals, or records that should be attached later."
                      className="min-h-28 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-semibold leading-6 outline-none transition focus:border-[#fb8500]"
                    />
                  </label>
                </div>
              </section>

              <div className="grid gap-5 lg:grid-cols-2">
                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                      <Route size={24} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-[0.35em]">
                      Intake Steps
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {intakeSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#020617] text-sm font-black text-[#ffb703]">
                          {index + 1}
                        </span>
                        <span className="text-sm font-black">{step}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-[0.35em]">
                      Control Checklist
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {controlChecks.map((check) => (
                      <div
                        key={check.label}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-4 text-sm font-black ${
                          check.complete
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-[#050816]"
                        }`}
                      >
                        <ShieldCheck
                          size={16}
                          className={check.complete ? "text-emerald-600" : "text-[#fb8500]"}
                        />
                        {check.label}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <aside className="space-y-5">
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black uppercase tracking-[0.35em]">
                  Intake Actions
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  These actions prepare a controlled request package only. They do not submit, save,
                  route, assign, upload, notify, or create backend records.
                </p>

                <div className="mt-5 space-y-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#020617] px-4 py-4 text-sm font-black text-white"
                  >
                    <Send size={16} className="text-[#ffb703]" />
                    Prepare Intake Review
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-black"
                  >
                    <Copy size={16} className="text-[#fb8500]" />
                    Copy Draft Packet
                  </button>

                  <button
                    type="button"
                    onClick={resetDraft}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-black"
                  >
                    <RotateCcw size={16} className="text-[#fb8500]" />
                    Reset Draft
                  </button>

                  <Link
                    href="/service-requests"
                    className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-black"
                  >
                    Return to Service Requests Desk
                  </Link>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                    <Route size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                      Routing Recommendation
                    </p>
                    <h3 className="mt-2 text-2xl font-black">{queueRecommendation.title}</h3>
                  </div>
                </div>

                <div className="mt-5 divide-y divide-slate-200 text-sm">
                  <div className="flex justify-between gap-4 py-3">
                    <span className="font-black text-slate-500">Queue Owner</span>
                    <span className="text-right font-black">{queueRecommendation.owner}</span>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <span className="font-black text-slate-500">Department</span>
                    <span className="text-right font-black">{queueRecommendation.department}</span>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <span className="font-black text-slate-500">Access Scope</span>
                    <span className="text-right font-black">{queueRecommendation.accessScope}</span>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <span className="font-black text-slate-500">Priority</span>
                    <span className="text-right font-black">{priority}</span>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <span className="font-black text-slate-500">Intake Channel</span>
                    <span className="text-right font-black">{intakeChannel}</span>
                  </div>
                </div>

                <Link
                  href={queueRecommendation.href}
                  className="mt-5 flex w-full items-center justify-center rounded-lg bg-[#020617] px-4 py-4 text-sm font-black text-white"
                >
                  Open Recommended Queue
                </Link>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                      Draft Request Package
                    </p>
                    <h3 className="mt-2 text-2xl font-black">SR-DRAFT</h3>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-slate-400">
                    Prepared Metadata
                  </p>

                  <div className="divide-y divide-slate-200 text-sm">
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Title</span>
                      <span className="text-right font-black">
                        {requestTitle.trim() || "Pending"}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Category</span>
                      <span className="text-right font-black">{category}</span>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Classification</span>
                      <span className="text-right font-black">{classification}</span>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Related Record</span>
                      <span className="text-right font-black">{relatedRecord}</span>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Evidence Note</span>
                      <span className="text-right font-black">
                        {evidenceNote.trim() ? "Prepared" : "Pending"}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Requested Action</span>
                      <span className="text-right font-black">
                        {requestedAction.trim() ? "Prepared" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-[#ffb703] bg-[#fff7d6] p-4 text-sm font-black text-[#b45309]">
                  {completedChecks}/{controlChecks.length} control checks prepared. Complete the
                  missing fields before treating this as ready.
                </div>
              </section>

              <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                    <LockKeyhole size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-[0.35em]">
                      Control Notes
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-[0.35em]">
                      Training Note
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
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