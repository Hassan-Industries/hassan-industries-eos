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

export type ServiceRequestQueueStatus =
  | "Active Queue"
  | "Department Queue"
  | "Restricted Queue";

export type ServiceRequestActionId =
  | "route-request"
  | "assign-owner"
  | "request-hca-review"
  | "mark-pending-routing"
  | "view-request-history"
  | "open-related-record";

export type ServiceRequestActionTone =
  | "default"
  | "routing"
  | "review"
  | "restricted"
  | "history"
  | "record";

export type ServiceRequestTimelineItem = {
  label: string;
  status: ServiceRequestTimelineStatus;
  date: string;
  note: string;
};

export type ServiceRequestActionControl = {
  id: ServiceRequestActionId;
  label: string;
  purpose: string;
  authority: string;
  nextStep: string;
  controlNote: string;
  timelineLabel: string;
  tone: ServiceRequestActionTone;
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
  routingQueueId: string;
  accessScope: string;
  requestedAction: string;
  submittedDate: string;
  lastUpdated: string;
  retention: string;
  restrictedReview: boolean;
  checklist: string[];
  timeline: ServiceRequestTimelineItem[];
};

export type ServiceRequestQueueRecord = {
  id: string;
  title: string;
  department: string;
  owner: string;
  status: ServiceRequestQueueStatus;
  purpose: string;
  summary: string;
  accessScope: string;
  routingStandard: string;
  escalationPath: string;
  controls: string[];
  workflowStages: string[];
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
    routingQueueId: "governance-library-intake",
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
    routingQueueId: "corporate-records-review",
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
    routingQueueId: "treasury-review",
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
    routingQueueId: "restricted-hca-review",
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
    routingQueueId: "administration-desk",
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
  {
    id: "SR-2026-006",
    title: "HCP Restricted Parent-Level Review",
    requester: "Executive Operations",
    department: "HCP Restricted",
    owner: "HCP",
    status: "Restricted Review",
    priority: "Restricted",
    category: "Parent-Level Review",
    classification: "Restricted Internal",
    dueDate: "Pending",
    stage: "Parent-Level Restricted Review",
    summary:
      "Restricted parent-level service request for matters requiring Hassan Capital Partners visibility, authority review, or executive-level handling.",
    routingNote:
      "Route through HCP restricted review only. Preserve separation from general intake, department desks, and normal HCA review until role-based controls are enforced.",
    relatedRecord: "HCP-RESTRICTED",
    relatedRecordTitle: "HCP Restricted Review Layer",
    relatedRecordType: "Restricted Review",
    relatedRecordHref: "/service-requests/queues/hcp-restricted-review",
    intakeChannel: "Internal Restricted Intake",
    assignedQueue: "HCP Restricted Review",
    routingQueueId: "hcp-restricted-review",
    accessScope: "HCP + Executive Authorization",
    requestedAction:
      "Prepare restricted parent-level review routing and authority confirmation.",
    submittedDate: "2026-06-20",
    lastUpdated: "2026-06-20",
    retention: "Permanent",
    restrictedReview: true,
    checklist: [
      "Parent-level authority identified",
      "Restricted classification confirmed",
      "Executive visibility reviewed",
      "HCP review path prepared",
      "Access separation reserved",
      "Permanent recordkeeping path reserved",
    ],
    timeline: [
      {
        label: "Request received",
        status: "Complete",
        date: "2026-06-20",
        note: "Parent-level restricted request entered into the Service Requests Desk.",
      },
      {
        label: "Restricted parent review",
        status: "Restricted",
        date: "Pending",
        note: "Future role-based controls should limit visibility to HCP-authorized parties.",
      },
      {
        label: "Executive decision",
        status: "Pending",
        date: "Pending",
        note: "Future backend should support executive approval, deferral, escalation, or closure.",
      },
      {
        label: "Controlled filing",
        status: "Pending",
        date: "Pending",
        note: "Final outcome should be filed under restricted parent-level records controls.",
      },
    ],
  },
];

export const serviceRequestQueues: ServiceRequestQueueRecord[] = [
  {
    id: "governance-library-intake",
    title: "Governance Library Intake",
    department: "Governance Library",
    owner: "HCA",
    status: "Active Queue",
    purpose:
      "Routes requests involving publication creation, document numbering, EGL record preparation, and controlled publication intake.",
    summary:
      "Routes requests involving publication creation, document numbering, EGL record preparation, and controlled publication intake.",
    accessScope: "HCA + Authorized Governance Library Staff",
    routingStandard:
      "Requests entering this queue should confirm publication purpose, ownership, authority, classification, related records, and review path before any controlled record is created.",
    escalationPath:
      "Escalate to Executive Operations or HCA leadership if authority, classification, or publication ownership is unclear.",
    controls: [
      "Confirm publication or record purpose.",
      "Verify document-control authority.",
      "Confirm owner and classification.",
      "Identify related EGL records.",
      "Reserve recordkeeping path before completion.",
    ],
    workflowStages: [
      "Receive request",
      "Confirm publication need",
      "Verify document-control authority",
      "Prepare controlled record path",
      "Route to review or close request",
    ],
  },
  {
    id: "corporate-records-review",
    title: "Corporate Records Review",
    department: "Corporate Records",
    owner: "Corporate Records",
    status: "Department Queue",
    purpose:
      "Routes certified copy requests, source-record verification, retention review, original-location confirmation, and filing preparation.",
    summary:
      "Routes certified copy requests, source-record verification, retention review, original-location confirmation, and filing preparation.",
    accessScope: "Corporate Records + HCA",
    routingStandard:
      "Requests entering this queue should verify source record identity, original executed location, retention class, certification authority, and filing destination.",
    escalationPath:
      "Escalate to HCA if the source authority, certification relationship, or original executed record location is unclear.",
    controls: [
      "Verify source record.",
      "Confirm original executed location.",
      "Confirm retention and filing category.",
      "Prepare certified-copy or records action.",
      "Reserve audit history path.",
    ],
    workflowStages: [
      "Receive records request",
      "Verify source record",
      "Confirm records authority",
      "Prepare certification or filing action",
      "File or route for further review",
    ],
  },
  {
    id: "treasury-review",
    title: "Treasury Review",
    department: "Treasury",
    owner: "Treasury",
    status: "Department Queue",
    purpose:
      "Routes requests involving treasury documents, payment-control references, financial authority records, and treasury-governed replacement requests.",
    summary:
      "Routes requests involving treasury documents, payment-control references, financial authority records, and treasury-governed replacement requests.",
    accessScope: "Treasury + HCA",
    routingStandard:
      "Requests entering this queue should confirm treasury owner, financial authority, confidentiality class, related treasury record, and approval path before replacement, publication, or filing.",
    escalationPath:
      "Escalate to HCP or Executive Operations if the request affects treasury authority, payment controls, banking authority, or enterprise financial governance.",
    controls: [
      "Confirm treasury record relationship.",
      "Confirm confidentiality classification.",
      "Identify treasury owner.",
      "Prepare HCA review path.",
      "Reserve approval or filing path.",
    ],
    workflowStages: [
      "Receive treasury request",
      "Confirm treasury record relationship",
      "Assign treasury owner",
      "Route to HCA review if required",
      "Prepare approval or closure action",
    ],
  },
  {
    id: "restricted-hca-review",
    title: "Restricted HCA Review",
    department: "HCA Review",
    owner: "HCA",
    status: "Restricted Queue",
    purpose:
      "Routes restricted matters requiring separation between visibility, drafting, review, approval, execution, and recordkeeping authority.",
    summary:
      "Routes restricted matters requiring separation between visibility, drafting, review, approval, execution, and recordkeeping authority.",
    accessScope: "HCA + Executive Authorization",
    routingStandard:
      "Restricted HCA matters should not move through general intake once classified. Visibility, drafting, review, approval, execution, and recordkeeping authority must remain separated.",
    escalationPath:
      "Escalate to Executive Operations when restricted review requires leadership direction, parent authority, or special access approval.",
    controls: [
      "Confirm restricted classification.",
      "Separate visibility from execution.",
      "Confirm review authority.",
      "Confirm approval authority.",
      "Reserve restricted recordkeeping path.",
    ],
    workflowStages: [
      "Receive restricted request",
      "Confirm restricted classification",
      "Assign HCA review layer",
      "Escalate if executive authorization is needed",
      "Prepare restricted filing outcome",
    ],
  },
  {
    id: "hcp-restricted-review",
    title: "HCP Restricted Review",
    department: "HCP Restricted",
    owner: "HCP",
    status: "Restricted Queue",
    purpose:
      "Routes parent-level restricted matters requiring Hassan Capital Partners authority, executive visibility, or enterprise control review.",
    summary:
      "Routes parent-level restricted matters requiring Hassan Capital Partners authority, executive visibility, or enterprise control review.",
    accessScope: "HCP + Executive Authorization",
    routingStandard:
      "HCP restricted matters must remain separated from general service intake, operating department queues, and standard HCA review unless parent-level authority permits routing.",
    escalationPath:
      "Escalate only through authorized HCP or Executive Operations review paths.",
    controls: [
      "Confirm HCP authority requirement.",
      "Confirm restricted parent-level classification.",
      "Limit visibility to authorized HCP or executive roles.",
      "Separate review from execution.",
      "Reserve parent-level restricted recordkeeping path.",
    ],
    workflowStages: [
      "Receive HCP restricted request",
      "Confirm parent-level authority",
      "Assign restricted HCP review path",
      "Route for executive decision if required",
      "Prepare controlled parent-level filing outcome",
    ],
  },
  {
    id: "administration-desk",
    title: "Administration Desk",
    department: "Administration",
    owner: "Administration",
    status: "Department Queue",
    purpose:
      "Routes administrative support requests, workflow clarifications, record questions, and operational requests that may require department ownership.",
    summary:
      "Routes administrative support requests, workflow clarifications, record questions, and operational requests that may require department ownership.",
    accessScope: "Administration + Assigned Owner",
    routingStandard:
      "Administrative requests should be reviewed for owner, purpose, urgency, and whether HCA or governance escalation is required before closure.",
    escalationPath:
      "Escalate to HCA only when document-control, governance authority, records control, or restricted review is implicated.",
    controls: [
      "Confirm administrative purpose.",
      "Identify department owner.",
      "Determine escalation need.",
      "Prepare response or routing path.",
      "Consider operational recordkeeping need.",
    ],
    workflowStages: [
      "Receive administrative request",
      "Confirm owner",
      "Determine escalation need",
      "Respond or route",
      "Close request",
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
  "HCP Restricted",
];

export function getServiceRequestById(requestId: string) {
  const decodedRequestId = safeDecodeURIComponent(requestId);

  return serviceRequestRecords.find(
    (request) =>
      request.id.toLowerCase() === decodedRequestId.toLowerCase() ||
      normalizeQueueLookup(request.id) === normalizeQueueLookup(decodedRequestId),
  );
}

export function getServiceRequestQueueById(queueId: string) {
  const normalizedQueueId = normalizeQueueLookup(queueId);

  const queueAliases: Record<string, string> = {
    "corp-records-review": "corporate-records-review",
    "records-review": "corporate-records-review",
    "hca-review": "restricted-hca-review",
    "restricted-review": "restricted-hca-review",
    "hcp-restricted": "hcp-restricted-review",
    "parent-restricted-review": "hcp-restricted-review",
    "admin-desk": "administration-desk",
    administration: "administration-desk",
  };

  const resolvedQueueId = queueAliases[normalizedQueueId] ?? normalizedQueueId;

  return serviceRequestQueues.find(
    (queue) =>
      queue.id === resolvedQueueId ||
      normalizeQueueLookup(queue.title) === resolvedQueueId,
  );
}

export function getRequestsForQueue(queueId: string) {
  const queue = getServiceRequestQueueById(queueId);
  const resolvedQueueId = queue?.id ?? normalizeQueueLookup(queueId);

  return serviceRequestRecords.filter(
    (request) =>
      normalizeQueueLookup(request.routingQueueId) === resolvedQueueId ||
      normalizeQueueLookup(request.assignedQueue) === resolvedQueueId,
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
    request.routingQueueId,
    request.accessScope,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getServiceRequestActionControls(
  request: ServiceRequestRecord,
): ServiceRequestActionControl[] {
  const restrictedAuthority = request.restrictedReview
    ? `${request.owner} + Executive Authorization`
    : `${request.owner} + HCA Review`;

  const relatedRecordLabel =
    request.relatedRecord === "N/A"
      ? "No related record selected."
      : `${request.relatedRecord} — ${request.relatedRecordTitle}`;

  return [
    {
      id: "route-request",
      label: "Route Request",
      purpose: `Prepare ${request.id} for routing into the ${request.assignedQueue} queue.`,
      authority: `${request.department} / ${request.owner}`,
      nextStep:
        "Confirm the queue, stage, classification, and routing note before backend routing is introduced.",
      controlNote:
        "Frontend-only control. This does not change request status, assign a queue, notify staff, or create a backend workflow.",
      timelineLabel: "Routing review prepared",
      tone: "routing",
    },
    {
      id: "assign-owner",
      label: "Assign Owner",
      purpose: `Preview ownership assignment for ${request.id} without changing the record.`,
      authority: `${request.owner} ownership lane`,
      nextStep:
        "Confirm whether the listed owner is correct, whether an individual assignee is needed, and whether the matter requires escalation.",
      controlNote:
        "Frontend-only control. No person, group, queue, or department is actually assigned in this phase.",
      timelineLabel: "Owner assignment prepared",
      tone: "default",
    },
    {
      id: "request-hca-review",
      label: "Request HCA Review",
      purpose: `Prepare document-control, governance, authority, or restricted-review handling for ${request.id}.`,
      authority: restrictedAuthority,
      nextStep:
        "Confirm whether HCA review is required before routing, execution, publication, certification, or recordkeeping.",
      controlNote:
        "Frontend-only control. HCA is not notified and no restricted role-based review is created yet.",
      timelineLabel: "HCA review path prepared",
      tone: request.restrictedReview ? "restricted" : "review",
    },
    {
      id: "mark-pending-routing",
      label: "Mark Pending Routing",
      purpose: `Preview a pending-routing state for ${request.id} when ownership or authority is not final.`,
      authority: "Service Request Desk / Authorized Routing Owner",
      nextStep:
        "Use this only when the request is not ready for owner action and needs intake clarification first.",
      controlNote:
        "Frontend-only control. The record status remains unchanged until backend status transitions are introduced.",
      timelineLabel: "Pending routing note prepared",
      tone: "routing",
    },
    {
      id: "view-request-history",
      label: "View Request History",
      purpose: `Review the existing timeline and future audit-history path for ${request.id}.`,
      authority: "Service Request Desk / Records Control",
      nextStep:
        "Use the timeline to understand what has already happened, what is current, and what remains pending.",
      controlNote:
        "Frontend-only control. Timeline entries are sample/static and do not represent a saved audit log yet.",
      timelineLabel: "History reviewed",
      tone: "history",
    },
    {
      id: "open-related-record",
      label: "Open Related Record",
      purpose: `Review the related record reference for ${request.id}: ${relatedRecordLabel}`,
      authority: `${request.department} + Records / Governance Authority`,
      nextStep:
        "Open the related record only to verify source authority, context, record relationship, or filing location.",
      controlNote:
        "Frontend-only navigation. Opening a related record does not attach, certify, replace, or file anything.",
      timelineLabel: "Related record lookup prepared",
      tone: "record",
    },
  ];
}

function normalizeQueueLookup(value: string) {
  return safeDecodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}