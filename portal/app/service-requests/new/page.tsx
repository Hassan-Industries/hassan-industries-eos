"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardCheck,
  ClipboardList,
  Copy,
  FileText,
  FolderOpen,
  LockKeyhole,
  RotateCcw,
  Route,
  Send,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import {
  serviceRequestQueues,
  type ServiceRequestPriority,
} from "@/data/serviceRequests";

type IntakeChannel =
  | "Internal EOS Intake"
  | "Executive Prepared Intake"
  | "Third-Party Prepared Intake";

type ServiceRequestCategory =
  | "Administrative Support"
  | "Publication Intake"
  | "Certified Copy"
  | "Document Replacement"
  | "Governance Review"
  | "Treasury Support"
  | "Records Review"
  | "Parent-Level Review"
  | "External Support Request";

type ServiceRequestClassification =
  | "Internal Governance"
  | "Confidential"
  | "Restricted Internal"
  | "External Intake"
  | "Training / Administrative";

type IntakeFormState = {
  title: string;
  requester: string;
  intakeChannel: IntakeChannel;
  department: string;
  category: ServiceRequestCategory;
  classification: ServiceRequestClassification;
  priority: ServiceRequestPriority;
  relatedRecord: string;
  requestedAction: string;
  summary: string;
  dueDate: string;
  attachmentNote: string;
};

const initialFormState: IntakeFormState = {
  title: "",
  requester: "Executive Operations",
  intakeChannel: "Internal EOS Intake",
  department: "Governance Library",
  category: "Publication Intake",
  classification: "Internal Governance",
  priority: "Normal",
  relatedRecord: "",
  requestedAction: "",
  summary: "",
  dueDate: "",
  attachmentNote: "",
};

const departmentOptions = [
  "Governance Library",
  "Corporate Records",
  "Treasury",
  "Administration",
  "HCA Review",
  "HCP Restricted",
  "Executive Operations",
  "Legal",
  "Tax",
  "Technology",
  "Entity Management",
  "Third-Party / Client",
];

const categoryOptions: ServiceRequestCategory[] = [
  "Administrative Support",
  "Publication Intake",
  "Certified Copy",
  "Document Replacement",
  "Governance Review",
  "Treasury Support",
  "Records Review",
  "Parent-Level Review",
  "External Support Request",
];

const classificationOptions: ServiceRequestClassification[] = [
  "Internal Governance",
  "Confidential",
  "Restricted Internal",
  "External Intake",
  "Training / Administrative",
];

const priorityOptions: ServiceRequestPriority[] = ["Normal", "High", "Restricted"];

const intakeChannelOptions: IntakeChannel[] = [
  "Internal EOS Intake",
  "Executive Prepared Intake",
  "Third-Party Prepared Intake",
];

const intakeSteps = [
  "Identify request purpose",
  "Select department or operating desk",
  "Confirm requester and owner",
  "Classify access level and routing sensitivity",
  "Attach supporting record or reference",
  "Route for review, approval, execution, or filing",
];

export default function NewServiceRequestPage() {
  const [form, setForm] = useState<IntakeFormState>(initialFormState);
  const [copied, setCopied] = useState(false);
  const [prepared, setPrepared] = useState(false);

  const recommendedQueue = useMemo(() => {
    return getRecommendedQueue(form);
  }, [form]);

  const recommendedPriority = useMemo(() => {
    return getRecommendedPriority(form);
  }, [form]);

  const controlChecks = useMemo(() => {
    return [
      {
        label: "Request purpose documented",
        complete: Boolean(form.title.trim() && form.summary.trim()),
      },
      {
        label: "Responsible department identified",
        complete: Boolean(form.department),
      },
      {
        label: "Owner or reviewer assigned",
        complete: Boolean(recommendedQueue?.owner),
      },
      {
        label: "Classification considered",
        complete: Boolean(form.classification),
      },
      {
        label: "Routing path prepared",
        complete: Boolean(recommendedQueue),
      },
      {
        label: "Recordkeeping location reserved",
        complete: Boolean(form.category && form.relatedRecord.trim()),
      },
    ];
  }, [form, recommendedQueue]);

  const completedChecks = controlChecks.filter((check) => check.complete).length;

  const intakeReady =
    completedChecks >= 5 &&
    Boolean(form.title.trim()) &&
    Boolean(form.requestedAction.trim());

  const draftPacket = useMemo(() => {
    return [
      "SERVICE REQUEST INTAKE DRAFT",
      `Title: ${form.title || "Pending"}`,
      `Requester: ${form.requester || "Pending"}`,
      `Intake Channel: ${form.intakeChannel}`,
      `Department: ${form.department}`,
      `Category: ${form.category}`,
      `Classification: ${form.classification}`,
      `Priority: ${recommendedPriority}`,
      `Recommended Queue: ${recommendedQueue?.title ?? "Pending"}`,
      `Queue Owner: ${recommendedQueue?.owner ?? "Pending"}`,
      `Related Record: ${form.relatedRecord || "Pending"}`,
      `Due Date: ${form.dueDate || "Pending"}`,
      `Requested Action: ${form.requestedAction || "Pending"}`,
      `Summary: ${form.summary || "Pending"}`,
      `Attachment Note: ${form.attachmentNote || "None listed"}`,
    ].join("\n");
  }, [form, recommendedPriority, recommendedQueue]);

  function updateForm<K extends keyof IntakeFormState>(
    key: K,
    value: IntakeFormState[K],
  ) {
    setPrepared(false);

    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === "classification" && value === "Restricted Internal"
        ? { priority: "Restricted" as ServiceRequestPriority }
        : {}),
      ...(key === "category" && value === "Parent-Level Review"
        ? {
            department: "HCP Restricted",
            classification: "Restricted Internal" as ServiceRequestClassification,
            priority: "Restricted" as ServiceRequestPriority,
          }
        : {}),
      ...(key === "category" && value === "Treasury Support"
        ? {
            department: "Treasury",
            priority: "High" as ServiceRequestPriority,
          }
        : {}),
      ...(key === "category" && value === "Certified Copy"
        ? { department: "Corporate Records" }
        : {}),
      ...(key === "category" && value === "Publication Intake"
        ? { department: "Governance Library" }
        : {}),
    }));
  }

  function resetDraft() {
    setForm(initialFormState);
    setCopied(false);
    setPrepared(false);
  }

  async function copyDraftPacket() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(draftPacket);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function prepareIntakeReview() {
    setPrepared(true);
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <section className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-3 text-[11px] font-black uppercase tracking-[0.45em] text-amber-400">
                    Hassan Industries
                  </p>

                  <h1 className="text-3xl font-black uppercase tracking-[-0.03em]">
                    Create Service Request
                  </h1>

                  <p className="mt-3 max-w-5xl text-sm font-medium leading-6 text-white">
                    Controlled frontend intake workspace for preparing service
                    request metadata, routing recommendations, ownership
                    review, classification checks, and future workflow handoff.
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500 bg-slate-900 px-8 py-5 text-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
                    Intake Status
                  </p>
                  <p className="mt-3 text-2xl font-black text-amber-400">
                    {intakeReady ? "Ready" : "Draft"}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    Frontend Preparation
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-wrap items-center gap-3">
              <Link
                href="/service-requests"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <ArrowLeft className="h-4 w-4 text-amber-600" />
                Service Requests Desk
              </Link>

              <Link
                href="/service-requests/queues"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <Route className="h-4 w-4 text-amber-600" />
                Routing Queues
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
              >
                <FolderOpen className="h-4 w-4 text-amber-600" />
                Dashboard
              </Link>
            </section>

            <p className="text-right text-[12px] font-black uppercase tracking-[0.45em] text-slate-400">
              Controlled Request Intake
            </p>

            <section className="grid gap-4 xl:grid-cols-[1fr_390px]">
              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <ClipboardList className="h-7 w-7 text-amber-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-400">
                        Service Request Intake
                      </p>

                      <h2 className="mt-2 text-3xl font-black text-slate-950">
                        New Service Request
                      </h2>

                      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                        This page does not submit or save records yet. It helps
                        the requester prepare a governed request package so the
                        future backend can route the work cleanly instead of
                        creating an unstructured inbox.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 p-5">
                    <p className="text-[11px] font-black uppercase tracking-[0.45em] text-slate-400">
                      Intake Form
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Request Metadata
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Capture enough information to determine ownership,
                      authority, access level, routing queue, related record,
                      and next action.
                    </p>
                  </div>

                  <div className="grid gap-4 p-5 lg:grid-cols-2">
                    <Field label="Request Title" required>
                      <input
                        value={form.title}
                        onChange={(event) =>
                          updateForm("title", event.target.value)
                        }
                        placeholder="Example: Treasury document replacement request"
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      />
                    </Field>

                    <Field label="Requester" required>
                      <input
                        value={form.requester}
                        onChange={(event) =>
                          updateForm("requester", event.target.value)
                        }
                        placeholder="Executive Operations, Treasury, HCA, third party..."
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      />
                    </Field>

                    <Field label="Intake Channel">
                      <select
                        value={form.intakeChannel}
                        onChange={(event) =>
                          updateForm(
                            "intakeChannel",
                            event.target.value as IntakeChannel,
                          )
                        }
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      >
                        {intakeChannelOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Department / Desk">
                      <select
                        value={form.department}
                        onChange={(event) =>
                          updateForm("department", event.target.value)
                        }
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      >
                        {departmentOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Request Category">
                      <select
                        value={form.category}
                        onChange={(event) =>
                          updateForm(
                            "category",
                            event.target.value as ServiceRequestCategory,
                          )
                        }
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      >
                        {categoryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Classification">
                      <select
                        value={form.classification}
                        onChange={(event) =>
                          updateForm(
                            "classification",
                            event.target.value as ServiceRequestClassification,
                          )
                        }
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      >
                        {classificationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Priority">
                      <select
                        value={form.priority}
                        onChange={(event) =>
                          updateForm(
                            "priority",
                            event.target.value as ServiceRequestPriority,
                          )
                        }
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      >
                        {priorityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Related Record / Reference">
                      <input
                        value={form.relatedRecord}
                        onChange={(event) =>
                          updateForm("relatedRecord", event.target.value)
                        }
                        placeholder="HI-ADM-001, HI-TRE-001, CC-HI-ADM-001, N/A..."
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      />
                    </Field>

                    <Field label="Requested Action" required wide>
                      <input
                        value={form.requestedAction}
                        onChange={(event) =>
                          updateForm("requestedAction", event.target.value)
                        }
                        placeholder="Prepare review, route to Treasury, verify certified copy, assign owner..."
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      />
                    </Field>

                    <Field label="Due Date / Timing">
                      <input
                        value={form.dueDate}
                        onChange={(event) =>
                          updateForm("dueDate", event.target.value)
                        }
                        placeholder="Pending, ASAP, 2026-06-30, next review cycle..."
                        className="h-[48px] w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold outline-none transition focus:border-amber-500"
                      />
                    </Field>

                    <Field label="Request Summary" required wide>
                      <textarea
                        value={form.summary}
                        onChange={(event) =>
                          updateForm("summary", event.target.value)
                        }
                        placeholder="Describe the issue, purpose, requested outcome, and why this request needs routing."
                        rows={4}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold leading-6 outline-none transition focus:border-amber-500"
                      />
                    </Field>

                    <Field label="Attachment / Evidence Note" wide>
                      <textarea
                        value={form.attachmentNote}
                        onChange={(event) =>
                          updateForm("attachmentNote", event.target.value)
                        }
                        placeholder="List files, screenshots, executed copies, source documents, emails, or records that should be attached later."
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold leading-6 outline-none transition focus:border-amber-500"
                      />
                    </Field>
                  </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-2">
                  <ProcessPanel title="Intake Steps" icon={<Route />}>
                    {intakeSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-amber-400">
                          {index + 1}
                        </span>
                        <span className="text-sm font-black text-slate-950">
                          {step}
                        </span>
                      </div>
                    ))}
                  </ProcessPanel>

                  <ProcessPanel title="Control Checklist" icon={<ShieldCheck />}>
                    {controlChecks.map((check) => (
                      <div
                        key={check.label}
                        className={[
                          "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-black",
                          check.complete
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-slate-950",
                        ].join(" ")}
                      >
                        <ClipboardCheck className="h-4 w-4 text-amber-500" />
                        {check.label}
                      </div>
                    ))}
                  </ProcessPanel>
                </section>
              </div>

              <div className="space-y-4">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-[17px] font-black uppercase tracking-[0.35em] text-slate-950">
                    Intake Actions
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    These actions prepare a controlled request package only.
                    They do not submit, save, route, assign, upload, notify, or
                    create backend records.
                  </p>

                  <div className="mt-5 space-y-2">
                    <button
                      type="button"
                      onClick={prepareIntakeReview}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                    >
                      <Send className="h-4 w-4 text-amber-400" />
                      Prepare Intake Review
                    </button>

                    <button
                      type="button"
                      onClick={copyDraftPacket}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      <Copy className="h-4 w-4 text-amber-500" />
                      {copied ? "Draft Packet Copied" : "Copy Draft Packet"}
                    </button>

                    <button
                      type="button"
                      onClick={resetDraft}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      <RotateCcw className="h-4 w-4 text-amber-500" />
                      Reset Draft
                    </button>

                    <Link
                      href="/service-requests"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
                    >
                      Return to Service Requests Desk
                    </Link>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <Route className="h-6 w-6 text-amber-400" />
                    </div>

                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400">
                        Routing Recommendation
                      </p>
                      <h2 className="mt-2 text-xl font-black text-slate-950">
                        {recommendedQueue?.title ?? "No Queue Selected"}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <PreviewRow
                      label="Queue Owner"
                      value={recommendedQueue?.owner ?? "Pending"}
                    />
                    <PreviewRow
                      label="Department"
                      value={recommendedQueue?.department ?? "Pending"}
                    />
                    <PreviewRow
                      label="Access Scope"
                      value={recommendedQueue?.accessScope ?? "Pending"}
                    />
                    <PreviewRow label="Priority" value={recommendedPriority} />
                    <PreviewRow
                      label="Intake Channel"
                      value={form.intakeChannel}
                    />
                  </div>

                  {recommendedQueue ? (
                    <Link
                      href={`/service-requests/queues/${recommendedQueue.id}`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                    >
                      Open Recommended Queue
                    </Link>
                  ) : null}
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <FileText className="h-6 w-6 text-amber-400" />
                    </div>

                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400">
                        Draft Request Package
                      </p>
                      <h2 className="mt-2 text-xl font-black text-slate-950">
                        SR-DRAFT
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                      Prepared Metadata
                    </p>

                    <div className="mt-4 space-y-3">
                      <PreviewRow label="Title" value={form.title || "Pending"} />
                      <PreviewRow
                        label="Category"
                        value={form.category || "Pending"}
                      />
                      <PreviewRow
                        label="Classification"
                        value={form.classification || "Pending"}
                      />
                      <PreviewRow
                        label="Related Record"
                        value={form.relatedRecord || "Pending"}
                      />
                      <PreviewRow
                        label="Requested Action"
                        value={form.requestedAction || "Pending"}
                      />
                    </div>
                  </div>

                  <div
                    className={[
                      "mt-4 rounded-lg border px-4 py-3 text-sm font-bold leading-6",
                      intakeReady
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700",
                    ].join(" ")}
                  >
                    {intakeReady
                      ? "Draft package is ready for frontend review. Backend submission is intentionally not active yet."
                      : `${completedChecks}/6 control checks prepared. Complete the missing fields before treating this as ready.`}
                  </div>

                  {prepared ? (
                    <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold leading-6 text-blue-700">
                      Intake review package prepared in the frontend workspace.
                      No record was submitted, saved, routed, assigned, or filed.
                    </div>
                  ) : null}
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <LockKeyhole className="h-6 w-6 text-amber-400" />
                    </div>

                    <div>
                      <h2 className="text-[17px] font-black uppercase tracking-[0.35em] text-slate-950">
                        Control Notes
                      </h2>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                        <p>• Intake remains frontend-only in this phase.</p>
                        <p>• No request ID is reserved or saved.</p>
                        <p>• No attachment is uploaded or stored.</p>
                        <p>• No owner is actually assigned yet.</p>
                        <p>
                          • Restricted and third-party intake should receive
                          separate role-based pages in a later phase.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-dashed border-slate-300 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950">
                      <UserRoundCheck className="h-6 w-6 text-amber-400" />
                    </div>

                    <div>
                      <h2 className="text-[17px] font-black uppercase tracking-[0.35em] text-slate-950">
                        Training Note
                      </h2>
                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        Employees and executives should use this intake page to
                        prepare complete request metadata before routing work
                        into department queues, HCA review lanes, HCP restricted
                        review, or future external intake workflows.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  required = false,
  wide = false,
}: {
  label: string;
  children: ReactNode;
  required?: boolean;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "lg:col-span-2" : ""}>
      <span className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-500">
        {label}
        {required ? <span className="text-amber-600"> *</span> : null}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ProcessPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-amber-400">
          {icon}
        </div>

        <h2 className="text-[17px] font-black uppercase tracking-[0.35em] text-slate-950">
          {title}
        </h2>
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 last:border-b-0 last:pb-0">
      <span className="text-sm font-bold text-slate-500">{label}</span>
      <span className="max-w-[210px] text-right text-sm font-black text-slate-950">
        {value}
      </span>
    </div>
  );
}

function getRecommendedQueue(form: IntakeFormState) {
  const queueId = getRecommendedQueueId(form);

  return serviceRequestQueues.find((queue) => queue.id === queueId);
}

function getRecommendedQueueId(form: IntakeFormState) {
  if (
    form.category === "Parent-Level Review" ||
    form.department === "HCP Restricted"
  ) {
    return "hcp-restricted-review";
  }

  if (
    form.classification === "Restricted Internal" ||
    form.category === "Governance Review" ||
    form.department === "HCA Review"
  ) {
    return "restricted-hca-review";
  }

  if (
    form.category === "Certified Copy" ||
    form.category === "Records Review" ||
    form.department === "Corporate Records"
  ) {
    return "corporate-records-review";
  }

  if (
    form.category === "Treasury Support" ||
    form.department === "Treasury"
  ) {
    return "treasury-review";
  }

  if (
    form.category === "Administrative Support" ||
    form.department === "Administration" ||
    form.category === "External Support Request"
  ) {
    return "administration-desk";
  }

  return "governance-library-intake";
}

function getRecommendedPriority(form: IntakeFormState): ServiceRequestPriority {
  if (
    form.priority === "Restricted" ||
    form.classification === "Restricted Internal" ||
    form.category === "Parent-Level Review"
  ) {
    return "Restricted";
  }

  if (
    form.priority === "High" ||
    form.category === "Treasury Support" ||
    form.category === "Document Replacement"
  ) {
    return "High";
  }

  return "Normal";
}