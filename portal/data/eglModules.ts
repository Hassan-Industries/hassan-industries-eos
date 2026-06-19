 export type EGLModuleKey =
  | "publications"
  | "resolutions"
  | "forms"
  | "templates"
  | "certifiedCopies"
  | "pendingReview"
  | "pendingExecution";

export interface EGLModuleMetric {
  label: string;
  value: string;
}

export interface EGLModuleRecord {
  id: string;
  title: string;
  status: string;
  owner: string;
  description: string;
}

export interface EGLModuleConfig {
  key: EGLModuleKey;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  status: string;
  commandLabel: string;
  metrics: EGLModuleMetric[];
  records: EGLModuleRecord[];
  plannedActions: string[];
}

export const eglModuleRoutes = [
  {
    label: "EGL Dashboard",
    href: "/governance-library",
  },
  {
    label: "Publications",
    href: "/governance-library/publications",
  },
  {
    label: "Resolutions",
    href: "/governance-library/resolutions",
  },
  {
    label: "Forms",
    href: "/governance-library/forms",
  },
  {
    label: "Templates",
    href: "/governance-library/templates",
  },
  {
    label: "Certified Copies",
    href: "/governance-library/certified-copies",
  },
  {
    label: "Pending Review",
    href: "/governance-library/pending-review",
  },
  {
    label: "Pending Execution",
    href: "/governance-library/pending-execution",
  },
];

export const eglModuleConfigs: Record<EGLModuleKey, EGLModuleConfig> = {
  publications: {
    key: "publications",
    title: "Publications Registry",
    subtitle: "Controlled Publication Records",
    description:
      "Frontend registry shell for enterprise publications, manuals, standards, policies, resolutions, forms, templates, and related controlled documents.",
    route: "/governance-library/publications",
    status: "Frontend Shell",
    commandLabel: "Publication Registry",
    metrics: [
      { label: "Active Publications", value: "241" },
      { label: "Controlled Series", value: "10" },
      { label: "Pending Updates", value: "23" },
    ],
    records: [
      {
        id: "HI-ADM-001",
        title: "Enterprise Administration & Enterprise Services Manual",
        status: "AP",
        owner: "HCA",
        description: "Primary enterprise administration manual.",
      },
      {
        id: "HI-ADM-002",
        title: "Enterprise Document Control Standard",
        status: "AP",
        owner: "HCA",
        description: "Document numbering, classification, revision, and control standard.",
      },
      {
        id: "HI-TRE-001",
        title: "Enterprise Treasury Manual",
        status: "AP",
        owner: "HCA",
        description: "Treasury governance, controls, and operating procedures.",
      },
    ],
    plannedActions: [
      "Connect records to backend registry data.",
      "Add document detail route by document number.",
      "Add publication status and classification filters.",
    ],
  },

  resolutions: {
    key: "resolutions",
    title: "Resolutions Registry",
    subtitle: "Governance Decisions & Formal Actions",
    description:
      "Frontend registry shell for enterprise resolutions, foundational approvals, officer actions, and governance decisions.",
    route: "/governance-library/resolutions",
    status: "Frontend Shell",
    commandLabel: "Resolution Registry",
    metrics: [
      { label: "Executed Resolutions", value: "12" },
      { label: "Pending Drafts", value: "3" },
      { label: "Linked Publications", value: "8" },
    ],
    records: [
      {
        id: "HCP-RES-2026-001",
        title: "Foundational Treasury Resolution",
        status: "OE",
        owner: "HCP",
        description: "Original executed resolution adopting treasury control structure.",
      },
      {
        id: "HCA-RES-DRAFT-001",
        title: "Document Control Adoption Resolution",
        status: "DR",
        owner: "HCA",
        description: "Draft resolution for enterprise document-control adoption.",
      },
    ],
    plannedActions: [
      "Connect resolution records to governance register.",
      "Add execution status tracking.",
      "Link resolutions to related publications and implementation projects.",
    ],
  },

  forms: {
    key: "forms",
    title: "Forms Registry",
    subtitle: "Enterprise Intake & Control Forms",
    description:
      "Frontend shell for controlled forms used for service requests, approvals, records, treasury actions, document submissions, and administrative intake.",
    route: "/governance-library/forms",
    status: "Frontend Shell",
    commandLabel: "Forms Registry",
    metrics: [
      { label: "Active Forms", value: "18" },
      { label: "Draft Forms", value: "4" },
      { label: "Controlled Templates", value: "9" },
    ],
    records: [
      {
        id: "HI-FRM-001",
        title: "Service Request Intake Form",
        status: "DR",
        owner: "Administration",
        description: "Universal intake form for routing enterprise service requests.",
      },
      {
        id: "HI-FRM-002",
        title: "Document Submission Form",
        status: "DR",
        owner: "HCA",
        description: "Controlled intake form for publication submissions.",
      },
    ],
    plannedActions: [
      "Add form preview pages.",
      "Connect forms to service request workflows.",
      "Add controlled form versioning.",
    ],
  },

  templates: {
    key: "templates",
    title: "Templates Registry",
    subtitle: "Controlled Document Templates",
    description:
      "Frontend shell for enterprise templates, including policy templates, manual templates, resolution templates, forms, memoranda, and correspondence formats.",
    route: "/governance-library/templates",
    status: "Frontend Shell",
    commandLabel: "Template Registry",
    metrics: [
      { label: "Active Templates", value: "28" },
      { label: "Pending Review", value: "6" },
      { label: "Template Series", value: "5" },
    ],
    records: [
      {
        id: "HI-TPL-001",
        title: "Enterprise Policy Template",
        status: "DR",
        owner: "Administration",
        description: "Standard layout for controlled enterprise policies.",
      },
      {
        id: "HI-TPL-002",
        title: "Resolution Template",
        status: "DR",
        owner: "Governance",
        description: "Standard structure for enterprise resolutions.",
      },
    ],
    plannedActions: [
      "Add template preview and download controls.",
      "Connect templates to document generation workflow.",
      "Add template ownership and review-cycle metadata.",
    ],
  },

  certifiedCopies: {
    key: "certifiedCopies",
    title: "Certified Copies",
    subtitle: "Certified Publication Copies",
    description:
      "Frontend shell for certified copies of controlled publications, executed records, resolutions, and official enterprise documents.",
    route: "/governance-library/certified-copies",
    status: "Frontend Shell",
    commandLabel: "Certified Copy Register",
    metrics: [
      { label: "Certified Copies", value: "89" },
      { label: "Originals Linked", value: "41" },
      { label: "Pending Certification", value: "7" },
    ],
    records: [
      {
        id: "CC-HI-ADM-001",
        title: "Certified Copy — HI-ADM-001",
        status: "CC",
        owner: "HCA",
        description: "Certified copy record linked to original administration manual.",
      },
      {
        id: "CC-HCP-RES-2026-001",
        title: "Certified Copy — Foundational Treasury Resolution",
        status: "CC",
        owner: "HCP",
        description: "Certified copy record linked to original executed resolution.",
      },
    ],
    plannedActions: [
      "Add certified-copy issuance workflow.",
      "Connect certified copies to original executed record locations.",
      "Add certification authority and timestamp metadata.",
    ],
  },

  pendingReview: {
    key: "pendingReview",
    title: "Pending Review",
    subtitle: "Publications Awaiting Review",
    description:
      "Frontend shell for publications, forms, templates, policies, and resolutions awaiting administrative, governance, treasury, legal, or executive review.",
    route: "/governance-library/pending-review",
    status: "Frontend Shell",
    commandLabel: "Review Queue",
    metrics: [
      { label: "Pending Review", value: "23" },
      { label: "Overdue", value: "2" },
      { label: "Assigned Owners", value: "6" },
    ],
    records: [
      {
        id: "HI-GOV-001",
        title: "Enterprise Governance Manual",
        status: "DR",
        owner: "Governance",
        description: "Governance manual pending review and formal adoption.",
      },
      {
        id: "HI-COR-001",
        title: "Corporate Records Retention Schedule",
        status: "RV",
        owner: "Corporate Records",
        description: "Records retention schedule awaiting administrative review.",
      },
    ],
    plannedActions: [
      "Add reviewer assignment data.",
      "Add queue status transitions.",
      "Add review comments and approval routing.",
    ],
  },

  pendingExecution: {
    key: "pendingExecution",
    title: "Pending Execution",
    subtitle: "Documents Awaiting Signature or Filing",
    description:
      "Frontend shell for documents that have cleared review but require execution, certification, filing, publication, or repository placement.",
    route: "/governance-library/pending-execution",
    status: "Frontend Shell",
    commandLabel: "Execution Queue",
    metrics: [
      { label: "Pending Execution", value: "17" },
      { label: "Awaiting Signature", value: "9" },
      { label: "Awaiting Filing", value: "8" },
    ],
    records: [
      {
        id: "HI-TRE-002",
        title: "Treasury Delegation Schedule",
        status: "RV",
        owner: "Treasury",
        description: "Treasury schedule pending final execution.",
      },
      {
        id: "HI-ADM-003",
        title: "Administrative Authority Matrix",
        status: "RV",
        owner: "Administration",
        description: "Authority matrix pending approval and filing.",
      },
    ],
    plannedActions: [
      "Add signature status tracking.",
      "Add execution package checklist.",
      "Connect executed records to certified copy creation.",
    ],
  },
};