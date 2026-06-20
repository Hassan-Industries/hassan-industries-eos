"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  Copy,
  FileUp,
  FolderOpen,
  LockKeyhole,
  RotateCcw,
  Route,
  Send,
  ShieldCheck,
  X,
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
  },
  {
    id: "HI-ADM-001",
    title: "Enterprise Administration & Enterprise Services Manual",
    type: "Publication",
  },
  {
    id: "HI-ADM-002",
    title: "Enterprise Document Control Standard",
    type: "Publication",
  },
  {
    id: "HI-TRE-001",
    title: "Enterprise Treasury Manual",
    type: "Publication",
  },
  {
    id: "HCP-RES-2026-001",
    title: "Foundational Treasury Resolution",
    type: "Resolution",
  },
  {
    id: "CC-HI-ADM-001",
    title: "Certified Copy — HI-ADM-001",
    type: "Certified Copy",
  },
  {
    id: "HCA-REVIEW",
    title: "Restricted HCA Review Layer",
    type: "Restricted Review",
  },
  {
    id: "HCP-RESTRICTED",
    title: "HCP Restricted Review Layer",
    type: "Restricted Review",
  },
];

const intakeSteps = [
  "Identify request purpose",
  "Select department or operating desk",
  "Confirm requester and owner",
  "Classify access level and routing sensitivity",
  "Select related record or mark N/A",
  "Attach supporting files when available",
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

export default function NewServiceRequestPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
  const [attachmentNames, setAttachmentNames] = useState<string[]>([]);

  const queueRecommendation = useMemo(
    () => getQueueRecommendation(department, category, classification),
    [department, category, classification],
  );

  const selectedReference =
    relatedReferences.find((reference) => reference.id === relatedRecord) ?? relatedReferences[0];

  const controlChecks = [
    { label: "Request title entered", complete: requestTitle.trim().length > 0 },
    { label: "Requester identified", complete: requester.trim().length > 0 },
    { label: "Department / desk selected", complete: department.trim().length > 0 },
    { label: "Category selected", complete: category.trim().length > 0 },
    { label: "Classification selected", complete: classification.trim().length > 0 },
    { label: "Related record selected or marked N/A", complete: relatedRecord.trim().length > 0 },
    { label: "Requested action documented", complete: requestedAction.trim().length > 0 },
    { label: "Request summary documented", complete: requestSummary.trim().length > 0 },
    { label: "File attachment selected when available", complete: attachmentNames.length > 0 },
  ];

  const completedChecks = controlChecks.filter((check) => check.complete).length;

  const handleFileSelection = (files: FileList | null) => {
    if (!files) return;

    setAttachmentNames(Array.from(files).map((file) => file.name));
  };

  const clearAttachments = () => {
    setAttachmentNames([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
    clearAttachments();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#edf3f8] text-[#050816] lg:flex-row">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Topbar />

        <main className="w-full px-4 py-4 sm:px-5 lg:px-6">
          <section className="rounded-xl bg-[#020617] px-5 py-6 text-white shadow-sm sm:px-7 sm:py-7">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.45em] text-[#ffb703] sm:tracking-[0.55em]">
                  Hassan Industries
                </p>
                <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  Create Service Request
                </h1>
                <p className="mt-3 max-w-5xl text-sm font-semibold leading-7 text-white/90">
                  Controlled frontend intake workspace for preparing request metadata, routing
                  recommendation, classification, file attachments, and future workflow handoff.
                </p>
              </div>

              <div className="rounded-lg border border-[#ffb703] bg-white/5 px-6 py-5 text-center sm:px-8 sm:py-6">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-white sm:tracking-[0.45em]">
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
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black shadow-sm transition hover:border-[#ffb703] sm:px-5"
            >
              <ArrowLeft size={16} className="text-[#fb8500]" />
              Service Requests Desk
            </Link>

            <Link
              href="/service-requests/queues"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black shadow-sm transition hover:border-[#ffb703] sm:px-5"
            >
              <Route size={16} className="text-[#fb8500]" />
              Routing Queues
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black shadow-sm transition hover:border-[#ffb703] sm:px-5"
            >
              <FolderOpen size={16} className="text-[#fb8500]" />
              Dashboard
            </Link>
          </div>

          <p className="mt-5 text-right text-xs font-black uppercase tracking-[0.35em] text-slate-400 sm:tracking-[0.55em]">
            Controlled Request Intake
          </p>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-5">
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                    <ClipboardList size={28} />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400 sm:tracking-[0.45em]">
                      Service Request Intake
                    </p>
                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                      New Service Request
                    </h2>
                    <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
                      This page prepares a governed request package only. It does not submit, save,
                      route, assign, notify, or upload to backend storage yet.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400 sm:tracking-[0.45em]">
                    Intake Form
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Request Metadata</h2>
                </div>

                <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
                  <label className="space-y-2 xl:col-span-2">
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
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
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
                      Requester *
                    </span>
                    <input
                      value={requester}
                      onChange={(event) => setRequester(event.target.value)}
                      placeholder="Executive Operations"
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
                      Department / Desk
                    </span>
                    <select
                      value={department}
                      onChange={(event) => setDepartment(event.target.value)}
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
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
                      Request Category
                    </span>
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
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
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
                      Classification
                    </span>
                    <select
                      value={classification}
                      onChange={(event) => setClassification(event.target.value)}
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
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
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
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
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
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
                      Related Record
                    </span>
                    <select
                      value={relatedRecord}
                      onChange={(event) => setRelatedRecord(event.target.value)}
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    >
                      {relatedReferences.map((reference) => (
                        <option key={reference.id} value={reference.id}>
                          {reference.id} — {reference.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2 xl:col-span-2">
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
                      Requested Action *
                    </span>
                    <input
                      value={requestedAction}
                      onChange={(event) => setRequestedAction(event.target.value)}
                      placeholder="Prepare review, verify record, route to owner, request approval..."
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
                      Due Date / Timing
                    </span>
                    <input
                      value={dueDate}
                      onChange={(event) => setDueDate(event.target.value)}
                      placeholder="Pending, ASAP, date, review cycle..."
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-[#fb8500]"
                    />
                  </label>

                  <label className="space-y-2 xl:col-span-3">
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
                      Request Summary *
                    </span>
                    <textarea
                      value={requestSummary}
                      onChange={(event) => setRequestSummary(event.target.value)}
                      placeholder="Describe the issue, purpose, requested outcome, and why this request needs routing."
                      className="min-h-28 w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-sm font-semibold leading-6 outline-none transition focus:border-[#fb8500]"
                    />
                  </label>

                  <div className="space-y-3 xl:col-span-3">
                    <span className="text-xs font-black uppercase tracking-[0.35em] text-slate-500">
                      File Attachments
                    </span>

                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-center transition hover:border-[#fb8500]">
                      <FileUp size={28} className="text-[#fb8500]" />
                      <span className="mt-3 text-sm font-black">
                        Select documents, screenshots, emails, records, or supporting files
                      </span>
                      <span className="mt-1 text-xs font-semibold text-slate-500">
                        Frontend only — selected files are not uploaded or stored yet.
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp,.txt,.eml,.msg"
                        onChange={(event) => handleFileSelection(event.target.files)}
                        className="sr-only"
                      />
                    </label>

                    {attachmentNames.length > 0 ? (
                      <div className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm font-black">
                            {attachmentNames.length} file
                            {attachmentNames.length === 1 ? "" : "s"} selected
                          </p>
                          <button
                            type="button"
                            onClick={clearAttachments}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-black"
                          >
                            <X size={14} className="text-[#fb8500]" />
                            Clear Files
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {attachmentNames.map((name) => (
                            <span
                              key={name}
                              className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>

              <div className="grid gap-5 lg:grid-cols-2">
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                      <Route size={24} />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-[0.25em] sm:text-xl sm:tracking-[0.35em]">
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

                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-[0.25em] sm:text-xl sm:tracking-[0.35em]">
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
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-lg font-black uppercase tracking-[0.25em] sm:text-xl sm:tracking-[0.35em]">
                  Intake Actions
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  These controls prepare the request package only. They do not submit or create a
                  backend record.
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

              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                    <Route size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
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
                </div>

                <Link
                  href={queueRecommendation.href}
                  className="mt-5 flex w-full items-center justify-center rounded-lg bg-[#020617] px-4 py-4 text-sm font-black text-white"
                >
                  Open Recommended Queue
                </Link>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                    <ClipboardList size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
                      Draft Request Package
                    </p>
                    <h3 className="mt-2 text-2xl font-black">SR-DRAFT</h3>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="divide-y divide-slate-200 text-sm">
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Title</span>
                      <span className="text-right font-black">
                        {requestTitle.trim() || "Pending"}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Department</span>
                      <span className="text-right font-black">{department}</span>
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
                      <span className="text-right font-black">{selectedReference.id}</span>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Reference Type</span>
                      <span className="text-right font-black">{selectedReference.type}</span>
                    </div>
                    <div className="flex justify-between gap-4 py-3">
                      <span className="font-black text-slate-500">Attachments</span>
                      <span className="text-right font-black">
                        {attachmentNames.length > 0 ? `${attachmentNames.length} selected` : "None"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-[#ffb703] bg-[#fff7d6] p-4 text-sm font-black text-[#b45309]">
                  {completedChecks}/{controlChecks.length} control checks prepared.
                </div>
              </section>

              <section className="rounded-xl border border-dashed border-slate-300 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#020617] text-[#ffb703]">
                    <LockKeyhole size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-[0.25em] sm:text-xl sm:tracking-[0.35em]">
                      Control Notes
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                      <li>• Intake remains frontend-only in this phase.</li>
                      <li>• Selected files are not uploaded or stored yet.</li>
                      <li>• No request ID is reserved or saved.</li>
                      <li>• No owner is actually assigned.</li>
                      <li>• Restricted and external intake pages should be separated later.</li>
                    </ul>
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