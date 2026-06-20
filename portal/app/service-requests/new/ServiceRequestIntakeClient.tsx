"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Copy,
  FileUp,
  FolderOpen,
  RotateCcw,
  Send,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

type Priority = "Normal" | "High" | "Restricted";

type IntakeChannel =
  | "Internal EOS Intake"
  | "Executive Prepared Intake"
  | "Department Prepared Intake"
  | "Third-Party / Client Intake";

type Department =
  | "Executive Operations"
  | "Governance Library"
  | "Corporate Records"
  | "Treasury"
  | "HCA Review"
  | "HCP Restricted"
  | "Administration"
  | "Third-Party / Client";

type RequestCategory =
  | "Publication Intake"
  | "Certified Copy"
  | "Document Replacement"
  | "Treasury Review"
  | "Restricted Governance Review"
  | "HCP Restricted Review"
  | "Administrative Support"
  | "External Support Request";

type Classification =
  | "Internal Governance"
  | "Confidential"
  | "Restricted"
  | "Public / External";

type RequestedAction =
  | "Prepare intake review"
  | "Route to assigned queue"
  | "Verify source record"
  | "Prepare certified copy review"
  | "Prepare document replacement review"
  | "Route for treasury review"
  | "Route for restricted HCA review"
  | "Route for HCP restricted review"
  | "Assign owner for follow-up"
  | "Prepare filing or recordkeeping action";

type QueuePreset = {
  id: string;
  title: string;
  owner: string;
  department: Department;
  accessScope: string;
  defaultRequester: string;
  defaultCategory: RequestCategory;
  defaultClassification: Classification;
  defaultPriority: Priority;
  defaultAction: RequestedAction;
  intakeChannel: IntakeChannel;
};

type RelatedRecord = {
  id: string;
  title: string;
  type: string;
  departments: Department[];
  categories: RequestCategory[];
  classifications: Classification[];
};

const queuePresets: QueuePreset[] = [
  {
    id: "governance-library-intake",
    title: "Governance Library Intake",
    owner: "HCA",
    department: "Governance Library",
    accessScope: "HCA + Authorized Governance Library Staff",
    defaultRequester: "Executive Operations",
    defaultCategory: "Publication Intake",
    defaultClassification: "Internal Governance",
    defaultPriority: "Normal",
    defaultAction: "Prepare intake review",
    intakeChannel: "Internal EOS Intake",
  },
  {
    id: "corporate-records-review",
    title: "Corporate Records Review",
    owner: "Corporate Records",
    department: "Corporate Records",
    accessScope: "Corporate Records + HCA",
    defaultRequester: "Corporate Records",
    defaultCategory: "Certified Copy",
    defaultClassification: "Confidential",
    defaultPriority: "Normal",
    defaultAction: "Verify source record",
    intakeChannel: "Department Prepared Intake",
  },
  {
    id: "treasury-review",
    title: "Treasury Review",
    owner: "Treasury",
    department: "Treasury",
    accessScope: "Treasury + Assigned Owner",
    defaultRequester: "Treasury",
    defaultCategory: "Treasury Review",
    defaultClassification: "Confidential",
    defaultPriority: "High",
    defaultAction: "Route for treasury review",
    intakeChannel: "Department Prepared Intake",
  },
  {
    id: "restricted-hca-review",
    title: "Restricted HCA Review",
    owner: "HCA",
    department: "HCA Review",
    accessScope: "HCA Restricted Review",
    defaultRequester: "Executive Operations",
    defaultCategory: "Restricted Governance Review",
    defaultClassification: "Restricted",
    defaultPriority: "Restricted",
    defaultAction: "Route for restricted HCA review",
    intakeChannel: "Executive Prepared Intake",
  },
  {
    id: "hcp-restricted-review",
    title: "HCP Restricted Review",
    owner: "HCP",
    department: "HCP Restricted",
    accessScope: "HCP + Executive Authorization",
    defaultRequester: "Executive Operations",
    defaultCategory: "HCP Restricted Review",
    defaultClassification: "Restricted",
    defaultPriority: "Restricted",
    defaultAction: "Route for HCP restricted review",
    intakeChannel: "Executive Prepared Intake",
  },
  {
    id: "administration-desk",
    title: "Administration Desk",
    owner: "Administration",
    department: "Administration",
    accessScope: "Administration + Assigned Owner",
    defaultRequester: "Executive Operations",
    defaultCategory: "Administrative Support",
    defaultClassification: "Internal Governance",
    defaultPriority: "Normal",
    defaultAction: "Assign owner for follow-up",
    intakeChannel: "Internal EOS Intake",
  },
];

const relatedRecords: RelatedRecord[] = [
  {
    id: "N/A",
    title: "No existing record selected",
    type: "None",
    departments: [
      "Executive Operations",
      "Governance Library",
      "Corporate Records",
      "Treasury",
      "HCA Review",
      "HCP Restricted",
      "Administration",
      "Third-Party / Client",
    ],
    categories: [
      "Publication Intake",
      "Certified Copy",
      "Document Replacement",
      "Treasury Review",
      "Restricted Governance Review",
      "HCP Restricted Review",
      "Administrative Support",
      "External Support Request",
    ],
    classifications: [
      "Internal Governance",
      "Confidential",
      "Restricted",
      "Public / External",
    ],
  },
  {
    id: "HI-ADM-001",
    title: "Enterprise Administration & Enterprise Services Manual",
    type: "Publication",
    departments: ["Governance Library", "Administration", "Executive Operations"],
    categories: ["Publication Intake", "Administrative Support"],
    classifications: ["Internal Governance", "Confidential"],
  },
  {
    id: "HI-ADM-002",
    title: "Enterprise Document Control Standard",
    type: "Publication",
    departments: ["Governance Library", "Corporate Records", "Administration"],
    categories: ["Publication Intake", "Document Replacement", "Certified Copy"],
    classifications: ["Internal Governance", "Confidential"],
  },
  {
    id: "HI-TRE-001",
    title: "Enterprise Treasury Manual",
    type: "Publication",
    departments: ["Treasury", "Governance Library"],
    categories: ["Treasury Review", "Document Replacement", "Publication Intake"],
    classifications: ["Internal Governance", "Confidential"],
  },
  {
    id: "HCP-RES-2026-001",
    title: "Foundational Treasury Resolution",
    type: "Resolution",
    departments: ["Corporate Records", "Treasury", "HCP Restricted"],
    categories: ["Certified Copy", "Treasury Review", "HCP Restricted Review"],
    classifications: ["Confidential", "Restricted"],
  },
];

const requestedActions: RequestedAction[] = [
  "Prepare intake review",
  "Route to assigned queue",
  "Verify source record",
  "Prepare certified copy review",
  "Prepare document replacement review",
  "Route for treasury review",
  "Route for restricted HCA review",
  "Route for HCP restricted review",
  "Assign owner for follow-up",
  "Prepare filing or recordkeeping action",
];

const departments: Department[] = [
  "Executive Operations",
  "Governance Library",
  "Corporate Records",
  "Treasury",
  "HCA Review",
  "HCP Restricted",
  "Administration",
  "Third-Party / Client",
];

const categories: RequestCategory[] = [
  "Publication Intake",
  "Certified Copy",
  "Document Replacement",
  "Treasury Review",
  "Restricted Governance Review",
  "HCP Restricted Review",
  "Administrative Support",
  "External Support Request",
];

const classifications: Classification[] = [
  "Internal Governance",
  "Confidential",
  "Restricted",
  "Public / External",
];

const priorities: Priority[] = ["Normal", "High", "Restricted"];

const intakeChannels: IntakeChannel[] = [
  "Internal EOS Intake",
  "Executive Prepared Intake",
  "Department Prepared Intake",
  "Third-Party / Client Intake",
];

function normalizeQueueId(value: string | null) {
  if (!value) return "";

  return decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replaceAll("_", "-")
    .replaceAll(" ", "-");
}

function getQueuePresetById(value: string | null) {
  const normalized = normalizeQueueId(value);

  const aliases: Record<string, string> = {
    governance: "governance-library-intake",
    "governance-library": "governance-library-intake",
    records: "corporate-records-review",
    "corp-records": "corporate-records-review",
    "corporate-records": "corporate-records-review",
    treasury: "treasury-review",
    hca: "restricted-hca-review",
    "hca-review": "restricted-hca-review",
    restricted: "restricted-hca-review",
    "restricted-review": "restricted-hca-review",
    hcp: "hcp-restricted-review",
    "hcp-restricted": "hcp-restricted-review",
    administration: "administration-desk",
    admin: "administration-desk",
  };

  const resolvedId = aliases[normalized] ?? normalized;

  return queuePresets.find((queue) => queue.id === resolvedId) ?? null;
}

function getRecommendedQueue(
  department: Department,
  category: RequestCategory,
  classification: Classification
) {
  if (department === "HCP Restricted" || category === "HCP Restricted Review") {
    return queuePresets.find((queue) => queue.id === "hcp-restricted-review")!;
  }

  if (
    department === "HCA Review" ||
    category === "Restricted Governance Review" ||
    classification === "Restricted"
  ) {
    return queuePresets.find((queue) => queue.id === "restricted-hca-review")!;
  }

  if (department === "Treasury" || category === "Treasury Review") {
    return queuePresets.find((queue) => queue.id === "treasury-review")!;
  }

  if (department === "Corporate Records" || category === "Certified Copy") {
    return queuePresets.find((queue) => queue.id === "corporate-records-review")!;
  }

  if (department === "Governance Library" || category === "Publication Intake") {
    return queuePresets.find((queue) => queue.id === "governance-library-intake")!;
  }

  return queuePresets.find((queue) => queue.id === "administration-desk")!;
}

function getFilteredRecords(
  department: Department,
  category: RequestCategory,
  classification: Classification
) {
  return relatedRecords.filter((record) => {
    if (record.id === "N/A") return true;

    return (
      record.departments.includes(department) ||
      record.categories.includes(category) ||
      record.classifications.includes(classification)
    );
  });
}

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.35em] text-[#62708a]">
      {children}
      {required ? <span className="ml-1 text-[#ff8a00]">*</span> : null}
    </label>
  );
}

function SelectField<T extends string>({
  value,
  onChange,
  children,
}: {
  value: T;
  onChange: (value: T) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as T)}
      className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] outline-none transition focus:border-[#ff8a00] focus:ring-2 focus:ring-[#ff8a00]/20"
    >
      {children}
    </select>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816] outline-none transition placeholder:text-[#7d8999] focus:border-[#ff8a00] focus:ring-2 focus:ring-[#ff8a00]/20"
    />
  );
}

function CardTitle({
  icon,
  eyebrow,
  title,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
        {icon}
      </div>
      <div>
        <p className="mb-2 text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-black tracking-tight text-[#050816] sm:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function ServiceRequestIntakeClient() {
  const searchParams = useSearchParams();
  const queueParam = searchParams.get("queue") ?? searchParams.get("queueId");
  const queuePreset = getQueuePresetById(queueParam);

  const [requestTitle, setRequestTitle] = useState("");
  const [requester, setRequester] = useState(
    queuePreset?.defaultRequester ?? "Executive Operations"
  );
  const [department, setDepartment] = useState<Department>(
    queuePreset?.department ?? "Executive Operations"
  );
  const [category, setCategory] = useState<RequestCategory>(
    queuePreset?.defaultCategory ?? "External Support Request"
  );
  const [classification, setClassification] = useState<Classification>(
    queuePreset?.defaultClassification ?? "Internal Governance"
  );
  const [priority, setPriority] = useState<Priority>(
    queuePreset?.defaultPriority ?? "Normal"
  );
  const [intakeChannel, setIntakeChannel] = useState<IntakeChannel>(
    queuePreset?.intakeChannel ?? "Internal EOS Intake"
  );
  const [relatedRecord, setRelatedRecord] = useState("N/A");
  const [requestedAction, setRequestedAction] = useState<RequestedAction>(
    queuePreset?.defaultAction ?? "Prepare intake review"
  );
  const [dueDate, setDueDate] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const recommendedQueue = useMemo(
    () => getRecommendedQueue(department, category, classification),
    [department, category, classification]
  );

  const filteredRecords = useMemo(
    () => getFilteredRecords(department, category, classification),
    [department, category, classification]
  );

  const selectedRecord =
    relatedRecords.find((record) => record.id === relatedRecord) ??
    relatedRecords[0];

  const controlChecks = [
    {
      label: "Request title entered",
      complete: requestTitle.trim().length > 0,
    },
    {
      label: "Requester identified",
      complete: requester.trim().length > 0,
    },
    {
      label: "Department / desk selected",
      complete: Boolean(department),
    },
    {
      label: "Category selected",
      complete: Boolean(category),
    },
    {
      label: "Classification selected",
      complete: Boolean(classification),
    },
    {
      label: "Related record selected or marked N/A",
      complete: relatedRecord.trim().length > 0,
    },
    {
      label: "Requested action selected",
      complete: Boolean(requestedAction),
    },
    {
      label: "Request summary documented",
      complete: summary.trim().length > 0,
    },
    {
      label: "High priority due date selected when required",
      complete: priority !== "High" || dueDate.trim().length > 0,
    },
  ];

  const completedChecks = controlChecks.filter((check) => check.complete).length;

  function handleDepartmentChange(nextDepartment: Department) {
    setDepartment(nextDepartment);

    if (nextDepartment === "Treasury") {
      setCategory("Treasury Review");
      setRequestedAction("Route for treasury review");
    }

    if (nextDepartment === "Corporate Records") {
      setCategory("Certified Copy");
      setRequestedAction("Verify source record");
    }

    if (nextDepartment === "Governance Library") {
      setCategory("Publication Intake");
      setRequestedAction("Prepare intake review");
    }

    if (nextDepartment === "HCA Review") {
      setCategory("Restricted Governance Review");
      setClassification("Restricted");
      setPriority("Restricted");
      setRequestedAction("Route for restricted HCA review");
    }

    if (nextDepartment === "HCP Restricted") {
      setCategory("HCP Restricted Review");
      setClassification("Restricted");
      setPriority("Restricted");
      setRequestedAction("Route for HCP restricted review");
    }

    if (nextDepartment === "Administration") {
      setCategory("Administrative Support");
      setRequestedAction("Assign owner for follow-up");
    }

    if (nextDepartment === "Third-Party / Client") {
      setIntakeChannel("Third-Party / Client Intake");
      setCategory("External Support Request");
      setRequestedAction("Assign owner for follow-up");
    }
  }

  function handleCategoryChange(nextCategory: RequestCategory) {
    setCategory(nextCategory);

    if (nextCategory === "Treasury Review") {
      setDepartment("Treasury");
      setRequestedAction("Route for treasury review");
      setPriority("High");
    }

    if (nextCategory === "Certified Copy") {
      setDepartment("Corporate Records");
      setRequestedAction("Verify source record");
    }

    if (nextCategory === "Publication Intake") {
      setDepartment("Governance Library");
      setRequestedAction("Prepare intake review");
    }

    if (nextCategory === "Restricted Governance Review") {
      setDepartment("HCA Review");
      setClassification("Restricted");
      setPriority("Restricted");
      setRequestedAction("Route for restricted HCA review");
    }

    if (nextCategory === "HCP Restricted Review") {
      setDepartment("HCP Restricted");
      setClassification("Restricted");
      setPriority("Restricted");
      setRequestedAction("Route for HCP restricted review");
    }

    if (nextCategory === "Document Replacement") {
      setRequestedAction("Prepare document replacement review");
    }

    if (nextCategory === "Administrative Support") {
      setDepartment("Administration");
      setRequestedAction("Assign owner for follow-up");
    }

    if (nextCategory === "External Support Request") {
      setRequestedAction("Assign owner for follow-up");
    }
  }

  function handlePriorityChange(nextPriority: Priority) {
    setPriority(nextPriority);

    if (nextPriority !== "High") {
      setDueDate("");
    }

    if (nextPriority === "Restricted") {
      setClassification("Restricted");
    }
  }

  function handleReset() {
    setRequestTitle("");
    setRequester(queuePreset?.defaultRequester ?? "Executive Operations");
    setDepartment(queuePreset?.department ?? "Executive Operations");
    setCategory(queuePreset?.defaultCategory ?? "External Support Request");
    setClassification(queuePreset?.defaultClassification ?? "Internal Governance");
    setPriority(queuePreset?.defaultPriority ?? "Normal");
    setIntakeChannel(queuePreset?.intakeChannel ?? "Internal EOS Intake");
    setRelatedRecord("N/A");
    setRequestedAction(queuePreset?.defaultAction ?? "Prepare intake review");
    setDueDate("");
    setSummary("");
    setSelectedFiles([]);
  }

  return (
    <main className="w-full min-w-0 overflow-x-hidden px-4 py-4 sm:px-5 lg:px-6">
      <section className="rounded-xl border border-[#d8e1ea] bg-[#050816] p-6 text-white shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-center">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.55em] text-[#ffbf00]">
              Hassan Industries
            </p>
            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Create Service Request
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white/90">
              Controlled frontend intake workspace for preparing request
              metadata, routing recommendation, classification, file
              attachments, and future workflow handoff.
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-white/5 p-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
              Intake Status
            </p>
            <p className="mt-4 text-3xl font-black text-[#ffbf00]">Draft</p>
            <p className="mt-1 text-xs font-black text-white">
              Frontend Preparation
            </p>
          </div>
        </div>
      </section>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/service-requests"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
        >
          <ArrowLeft size={16} className="text-[#ff8a00]" />
          Service Requests Desk
        </Link>

        <Link
          href="/service-requests/queues"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
        >
          <SlidersHorizontal size={16} className="text-[#ff8a00]" />
          Routing Queues
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
        >
          <FolderOpen size={16} className="text-[#ff8a00]" />
          Dashboard
        </Link>
      </div>

      <div className="mt-8 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="min-w-0 space-y-5">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <CardTitle
              icon={<ClipboardList size={26} />}
              eyebrow="Service Request Intake"
              title="New Service Request"
            />
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[#33445c]">
              This page prepares a governed request package only. It does not
              submit, save, route, assign, notify, or upload to backend storage
              yet.
            </p>
          </section>

          <section className="overflow-hidden rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
            <div className="border-b border-[#d8e1ea] p-6">
              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                Intake Form
              </p>
              <h2 className="text-2xl font-black">Request Metadata</h2>
            </div>

            <div className="grid min-w-0 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
              <div className="md:col-span-2">
                <FieldLabel required>Request Title</FieldLabel>
                <TextInput
                  value={requestTitle}
                  onChange={setRequestTitle}
                  placeholder="Example: Treasury document replacement request"
                />
              </div>

              <div>
                <FieldLabel required>Requester</FieldLabel>
                <SelectField value={requester} onChange={setRequester}>
                  <option>Executive Operations</option>
                  <option>HCA</option>
                  <option>Corporate Records</option>
                  <option>Treasury</option>
                  <option>Administration</option>
                  <option>Third-Party / Client</option>
                </SelectField>
              </div>

              <div>
                <FieldLabel>Department / Desk</FieldLabel>
                <SelectField value={department} onChange={handleDepartmentChange}>
                  {departments.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </SelectField>
              </div>

              <div>
                <FieldLabel>Request Category</FieldLabel>
                <SelectField value={category} onChange={handleCategoryChange}>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </SelectField>
              </div>

              <div>
                <FieldLabel>Classification</FieldLabel>
                <SelectField value={classification} onChange={setClassification}>
                  {classifications.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </SelectField>
              </div>

              <div>
                <FieldLabel>Priority</FieldLabel>
                <SelectField value={priority} onChange={handlePriorityChange}>
                  {priorities.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </SelectField>
              </div>

              <div>
                <FieldLabel>Intake Channel</FieldLabel>
                <SelectField value={intakeChannel} onChange={setIntakeChannel}>
                  {intakeChannels.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </SelectField>
              </div>

              <div>
                <FieldLabel>Related Record</FieldLabel>
                <SelectField value={relatedRecord} onChange={setRelatedRecord}>
                  {filteredRecords.map((record) => (
                    <option key={record.id} value={record.id}>
                      {record.id === "N/A"
                        ? "N/A — No existing record selected"
                        : `${record.id} — ${record.title}`}
                    </option>
                  ))}
                </SelectField>
              </div>

              <div className={priority === "High" ? "" : "md:col-span-2"}>
                <FieldLabel required>Requested Action</FieldLabel>
                <SelectField value={requestedAction} onChange={setRequestedAction}>
                  {requestedActions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </SelectField>
              </div>

              {priority === "High" ? (
                <div>
                  <FieldLabel required>Due Date</FieldLabel>
                  <div className="relative">
                    <CalendarDays
                      size={16}
                      className="pointer-events-none absolute right-4 top-4 text-[#ff8a00]"
                    />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(event) => setDueDate(event.target.value)}
                      className="h-12 w-full rounded-lg border border-[#c8d3df] bg-white px-4 pr-10 text-sm font-black text-[#050816] outline-none transition focus:border-[#ff8a00] focus:ring-2 focus:ring-[#ff8a00]/20"
                    />
                  </div>
                </div>
              ) : null}

              <div className="md:col-span-2 xl:col-span-3">
                <FieldLabel required>Request Summary</FieldLabel>
                <textarea
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  placeholder="Describe the issue, purpose, requested outcome, and why this request needs routing."
                  className="min-h-28 w-full resize-y rounded-lg border border-[#c8d3df] bg-white px-4 py-3 text-sm font-semibold text-[#050816] outline-none transition placeholder:text-[#7d8999] focus:border-[#ff8a00] focus:ring-2 focus:ring-[#ff8a00]/20"
                />
              </div>

              <div className="md:col-span-2 xl:col-span-3">
                <FieldLabel>File Attachments</FieldLabel>
                <input
                  id="service-request-files"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={(event) =>
                    setSelectedFiles(Array.from(event.target.files ?? []))
                  }
                />
                <label
                  htmlFor="service-request-files"
                  className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#c8d3df] bg-[#f8fafc] px-4 py-6 text-center transition hover:border-[#ff8a00] hover:bg-[#fffaf0]"
                >
                  <FileUp size={26} className="mb-3 text-[#ff8a00]" />
                  <span className="text-sm font-black text-[#050816]">
                    Select documents, screenshots, emails, records, or
                    supporting files
                  </span>
                  <span className="mt-1 text-xs font-semibold text-[#62708a]">
                    Frontend only — selected files are not uploaded or stored
                    yet.
                  </span>
                </label>

                {selectedFiles.length > 0 ? (
                  <div className="mt-3 rounded-lg border border-[#d8e1ea] bg-white p-4">
                    <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                      Selected Files
                    </p>
                    <div className="space-y-2">
                      {selectedFiles.map((file) => (
                        <div
                          key={`${file.name}-${file.size}`}
                          className="flex items-center justify-between gap-3 rounded-md border border-[#e1e8f0] bg-[#f8fafc] px-3 py-2 text-sm font-bold"
                        >
                          <span className="min-w-0 truncate">{file.name}</span>
                          <span className="shrink-0 text-xs text-[#62708a]">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
              <CardTitle
                icon={<SlidersHorizontal size={26} />}
                eyebrow="Intake Steps"
                title="Controlled Intake"
              />

              <div className="mt-5 space-y-3">
                {[
                  "Identify request purpose",
                  "Select department or operating desk",
                  "Confirm requester and owner",
                  "Classify access level and routing sensitivity",
                  "Select related record or mark N/A",
                  "Attach supporting files when available",
                  "Route for review, approval, execution, or filing",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#050816] text-sm font-black text-[#ffbf00]">
                      {index + 1}
                    </span>
                    <span className="text-sm font-black">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
              <CardTitle
                icon={<ShieldCheck size={26} />}
                eyebrow="Control Checklist"
                title="Readiness"
              />

              <div className="mt-5 space-y-3">
                {controlChecks.map((check) => (
                  <div
                    key={check.label}
                    className={`flex items-center gap-3 rounded-lg border p-4 text-sm font-black ${
                      check.complete
                        ? "border-[#86efac] bg-[#ecfdf3] text-[#007a45]"
                        : "border-[#d8e1ea] bg-white text-[#050816]"
                    }`}
                  >
                    <ShieldCheck
                      size={16}
                      className={
                        check.complete ? "text-[#00a86b]" : "text-[#ff8a00]"
                      }
                    />
                    {check.label}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside className="min-w-0 space-y-5">
          <p className="text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
            Controlled Request Intake
          </p>

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-black uppercase tracking-[0.35em]">
              Intake Actions
            </h2>
            <p className="mb-5 text-sm leading-7 text-[#33445c]">
              These controls prepare the request package only. They do not
              submit or create a backend record.
            </p>

            <div className="space-y-3">
              <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#050816] px-4 text-sm font-black text-white">
                <Send size={16} className="text-[#ffbf00]" />
                Prepare Intake Review
              </button>

              <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]">
                <Copy size={16} className="text-[#ff8a00]" />
                Copy Draft Packet
              </button>

              <button
                onClick={handleReset}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]"
              >
                <RotateCcw size={16} className="text-[#ff8a00]" />
                Reset Draft
              </button>

              <Link
                href="/service-requests"
                className="flex h-12 w-full items-center justify-center rounded-lg border border-[#c8d3df] bg-white px-4 text-sm font-black text-[#050816]"
              >
                Return to Service Requests Desk
              </Link>
            </div>
          </section>

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <SlidersHorizontal size={22} />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Routing Recommendation
                </p>
                <h3 className="mt-2 text-2xl font-black">
                  {recommendedQueue.title}
                </h3>
              </div>
            </div>

            <div className="mt-5 divide-y divide-[#d8e1ea] text-sm">
              <div className="flex justify-between gap-4 py-3">
                <span className="font-bold text-[#62708a]">Queue Owner</span>
                <span className="text-right font-black">
                  {recommendedQueue.owner}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <span className="font-bold text-[#62708a]">Department</span>
                <span className="text-right font-black">
                  {recommendedQueue.department}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <span className="font-bold text-[#62708a]">Access Scope</span>
                <span className="text-right font-black">
                  {recommendedQueue.accessScope}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <span className="font-bold text-[#62708a]">Priority</span>
                <span className="text-right font-black">{priority}</span>
              </div>
            </div>

            <Link
              href={`/service-requests/queues/${recommendedQueue.id}`}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-lg bg-[#050816] px-4 text-sm font-black text-white"
            >
              Open Recommended Queue
            </Link>
          </section>

          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <ClipboardList size={22} />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
                  Draft Request Package
                </p>
                <h3 className="mt-2 text-3xl font-black">SR-DRAFT</h3>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-[#d8e1ea] bg-[#f8fafc] p-4">
              <div className="divide-y divide-[#d8e1ea] text-sm">
                <div className="flex justify-between gap-4 py-3">
                  <span className="font-bold text-[#62708a]">Title</span>
                  <span className="text-right font-black">
                    {requestTitle || "Pending"}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <span className="font-bold text-[#62708a]">Department</span>
                  <span className="text-right font-black">{department}</span>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <span className="font-bold text-[#62708a]">Category</span>
                  <span className="text-right font-black">{category}</span>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <span className="font-bold text-[#62708a]">
                    Classification
                  </span>
                  <span className="text-right font-black">
                    {classification}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <span className="font-bold text-[#62708a]">
                    Related Record
                  </span>
                  <span className="text-right font-black">
                    {selectedRecord.id}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <span className="font-bold text-[#62708a]">
                    Reference Type
                  </span>
                  <span className="text-right font-black">
                    {selectedRecord.type}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <span className="font-bold text-[#62708a]">Attachments</span>
                  <span className="text-right font-black">
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} selected`
                      : "None"}
                  </span>
                </div>
                {priority === "High" ? (
                  <div className="flex justify-between gap-4 py-3">
                    <span className="font-bold text-[#62708a]">Due Date</span>
                    <span className="text-right font-black">
                      {dueDate || "Required"}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-5 inline-flex rounded-lg border border-[#ffbf00] bg-[#fff8df] px-4 py-3 text-sm font-black text-[#b35300]">
              {completedChecks}/{controlChecks.length} control checks prepared
            </div>
          </section>

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <CardTitle
              icon={<ShieldCheck size={24} />}
              eyebrow="Control Notes"
              title="Frontend Only"
            />
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#33445c]">
              <li>• Intake remains frontend-only in this phase.</li>
              <li>• Selected files are not uploaded or stored yet.</li>
              <li>• No request ID is reserved or saved.</li>
              <li>• No owner is actually assigned yet.</li>
              <li>
                • Restricted and third-party intake should receive separate
                role-based pages in a later phase.
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}