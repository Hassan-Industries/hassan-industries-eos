export type ServiceRequestStatus =
  | "Open"
  | "In Review"
  | "Pending Routing"
  | "Restricted Review"
  | "Closed";

export type ServiceRequestPriority = "Normal" | "High" | "Restricted";

export type ServiceRequestTimelineStatus =
  | "Complete"
  | "Current"
  | "Pending"
  | "Restricted";

export type ServiceRequestTimelineItem = {
  label: string;
  status: ServiceRequestTimelineStatus;
  date: string;
  note: string;
};

export type ServiceRequestRecord = {
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
  relatedRecord: string;
  relatedRecordTitle: string;
  relatedRecordType: string;
  relatedRecordHref: string;
  intakeChannel: string;
  assignedQueue: string;
  accessScope: string;
  requestedAction: string;
  submittedDate: string;
  lastUpdated: string;
  retention: string;
  restrictedReview: boolean;
  checklist: string[];
  timeline: ServiceRequestTimelineItem[];
};

export const serviceRequestRecords: ServiceRequestRecord[] = [
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
    relatedRecord: "HI-ADM-001",
    relatedRecordTitle: "Enterprise Administration & Enterprise Services Manual",
    relatedRecordType: "Publication",
    relatedRecordHref: "/governance-library/publications/HI-ADM-001",
    intakeChannel: "Internal EOS Intake",
    assignedQueue: "Governance Library Intake",
    accessScope: "HCA + Authorized Governance Library Staff",
    requestedAction: "Prepare publication intake and registration review.",
    submittedDate: "2026-06-20",
    lastUpdated: "2026-06-20",
    retention: "Permanent",
    restrictedReview: false,
    checklist: [
      "Request purpose documented",
      "Publication series identified",
      "Owner and authority confirmed",
      "Related EGL record reviewed",
      "Routing path prepared",
      "Recordkeeping location reserved",
    ],
    timeline: [
      {
        label: "Request received",
        status: "Complete",
        date: "2026-06-20",
        note: "Frontend sample request entered into the Service Requests Desk.",
      },
      {
        label: "Intake review",
        status: "Current",
        date: "Pending",
        note: "HCA document-control review should confirm publication need and authority.",
      },
      {
        label: "Route to owner",
        status: "Pending",
        date: "Pending",
        note: "Future backend workflow should assign the responsible owner.",
      },
      {
        label: "Close or escalate",
        status: "Pending",
        date: "Pending",
        note: "Request should close after routing, creation, or escalation.",
      },
    ],
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
    relatedRecord: "CC-HI-ADM-001",
    relatedRecordTitle: "Certified Copy - HI-ADM-001",
    relatedRecordType: "Certified Copy",
    relatedRecordHref: "/governance-library/certified-copies",
    intakeChannel: "Internal EOS Intake",
    assignedQueue: "Corporate Records Review",
    accessScope: "Corporate Records + HCA",
    requestedAction: "Verify certification authority and prepare certified-copy issuance.",
    submittedDate: "2026-06-20",
    lastUpdated: "2026-06-20",
    retention: "Permanent",
    restrictedReview: false,
    checklist: [
      "Source record verified",
      "Certification authority identified",
      "Original location confirmed",
      "Certified-copy relationship prepared",
      "Issuance log reserved",
      "Records filing path prepared",
    ],
    timeline: [
      {
        label: "Request received",
        status: "Complete",
        date: "2026-06-20",
        note: "Certified copy request entered for Corporate Records review.",
      },
      {
        label: "Authority verification",
        status: "Current",
        date: "Pending",
        note: "Source authority should be verified before certification issuance.",
      },
      {
        label: "Prepare certified copy",
        status: "Pending",
        date: "Pending",
        note: "Future backend should generate or attach the certified-copy package.",
      },
      {
        label: "File issuance record",
        status: "Pending",
        date: "Pending",
        note: "Certification history should be attached to the permanent records layer.",
      },
    ],
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
    relatedRecord: "HI-TRE-001",
    relatedRecordTitle: "Enterprise Treasury Manual",
    relatedRecordType: "Publication",
    relatedRecordHref: "/governance-library/publications/HI-TRE-001",
    intakeChannel: "Internal EOS Intake",
    assignedQueue: "Treasury Review",
    accessScope: "Treasury + HCA",
    requestedAction: "Route treasury replacement request for controlled review.",
    submittedDate: "2026-06-20",
    lastUpdated: "2026-06-20",
    retention: "Permanent",
    restrictedReview: false,
    checklist: [
      "Treasury document identified",
      "Replacement purpose documented",
      "Confidentiality classification confirmed",
      "Treasury owner assigned",
      "HCA review path prepared",
      "Replacement filing path reserved",
    ],
    timeline: [
      {
        label: "Request received",
        status: "Complete",
        date: "2026-06-20",
        note: "Treasury replacement request entered into service desk.",
      },
      {
        label: "Routing assignment",
        status: "Current",
        date: "Pending",
        note: "Request needs routing to Treasury and HCA document-control review.",
      },
      {
        label: "Review replacement",
        status: "Pending",
        date: "Pending",
        note: "Future workflow should compare replacement candidate against controlled source.",
      },
      {
        label: "Approve or reject",
        status: "Pending",
        date: "Pending",
        note: "Final authority should approve replacement before publication or filing.",
      },
    ],
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
    relatedRecord: "HCA-REVIEW",
    relatedRecordTitle: "Restricted HCA Review Layer",
    relatedRecordType: "Restricted Review",
    relatedRecordHref: "/service-requests",
    intakeChannel: "Internal Restricted Intake",
    assignedQueue: "Restricted HCA Review",
    accessScope: "HCA + Executive Authorization",
    requestedAction: "Prepare restricted governance review routing.",
    submittedDate: "2026-06-20",
    lastUpdated: "2026-06-20",
    retention: "Permanent",
    restrictedReview: true,
    checklist: [
      "Restricted classification confirmed",
      "Visibility separation identified",
      "Drafting authority separated",
      "Review authority separated",
      "Approval authority separated",
      "Recordkeeping authority reserved",
    ],
    timeline: [
      {
        label: "Request received",
        status: "Complete",
        date: "2026-06-20",
        note: "Restricted review request created for HCA handling.",
      },
      {
        label: "Restricted review",
        status: "Restricted",
        date: "Pending",
        note: "Restricted matter should only be handled through approved HCA review layers.",
      },
      {
        label: "Executive escalation",
        status: "Pending",
        date: "Pending",
        note: "Future backend should support executive escalation where required.",
      },
      {
        label: "Controlled recordkeeping",
        status: "Pending",
        date: "Pending",
        note: "Final records should be filed with restricted access controls.",
      },
    ],
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
    relatedRecord: "ADMIN-WORKFLOW",
    relatedRecordTitle: "Administrative Workflow Support",
    relatedRecordType: "Administrative Request",
    relatedRecordHref: "/administration",
    intakeChannel: "Internal EOS Intake",
    assignedQueue: "Administration Desk",
    accessScope: "Administration + Assigned Owner",
    requestedAction: "Clarify workflow and determine whether escalation is required.",
    submittedDate: "2026-06-20",
    lastUpdated: "2026-06-20",
    retention: "Operational",
    restrictedReview: false,
    checklist: [
      "Administrative issue documented",
      "Department owner identified",
      "Escalation need reviewed",
      "Routing stage assigned",
      "Response path prepared",
      "Recordkeeping need considered",
    ],
    timeline: [
      {
        label: "Request received",
        status: "Complete",
        date: "2026-06-20",
        note: "Administrative request entered into Service Requests Desk.",
      },
      {
        label: "Department review",
        status: "Current",
        date: "Pending",
        note: "Administration should determine next routing step.",
      },
      {
        label: "Escalate if needed",
        status: "Pending",
        date: "Pending",
        note: "Escalate to HCA only if governance or document-control authority is implicated.",
      },
      {
        label: "Close request",
        status: "Pending",
        date: "Pending",
        note: "Close after clarification, routing, or escalation.",
      },
    ],
  },
];

export const serviceRequestStatusFilters = [
  "All Statuses",
  "Open",
  "In Review",
  "Pending Routing",
  "Restricted Review",
  "Closed",
];

export const serviceRequestDepartmentFilters = [
  "All Departments",
  "Governance Library",
  "Treasury",
  "Corporate Records",
  "Administration",
  "HCA Review",
];

export function getServiceRequestById(requestId: string) {
  const decodedRequestId = decodeURIComponent(requestId);

  return serviceRequestRecords.find(
    (request) => request.id.toLowerCase() === decodedRequestId.toLowerCase(),
  );
}

export function getServiceRequestSearchText(request: ServiceRequestRecord) {
  return [
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
    request.relatedRecord,
    request.relatedRecordTitle,
    request.assignedQueue,
    request.accessScope,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}