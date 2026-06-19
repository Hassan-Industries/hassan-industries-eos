export type EGLFormsTemplatesRegistryRecord = {
  recordId: string;
  title: string;
  description: string;
  registryType: "Form" | "Template";
  series: string;
  status: "AP" | "DR" | "RV" | "OE" | "CC" | "SP" | "AR" | "VO";
  statusLabel: string;
  owner: string;
  authority: string;
  version: string;
  reviewDate: string;
  classification: string;
  retention: string;
  linkedPublication: string;
  usage: string;
  notes: string;
};

export const eglFormRecords: EGLFormsTemplatesRegistryRecord[] = [
  {
    recordId: "HI-FRM-001",
    title: "Publication Intake Form",
    description:
      "Controlled intake form for requesting or preparing a new EGL publication record.",
    registryType: "Form",
    series: "Administration",
    status: "DR",
    statusLabel: "Draft",
    owner: "HCA",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retention: "Permanent",
    linkedPublication: "HI-ADM-002",
    usage: "Publication creation and document-control intake.",
    notes:
      "Future backend workflow should assign document number, owner, authority, classification, and review route.",
  },
  {
    recordId: "HI-FRM-002",
    title: "Document Replacement Request Form",
    description:
      "Controlled form for submitting replacement files, revised documents, corrected records, or new controlled versions.",
    registryType: "Form",
    series: "Administration",
    status: "DR",
    statusLabel: "Draft",
    owner: "HCA",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retention: "Permanent",
    linkedPublication: "HI-ADM-002",
    usage: "Replacement upload and revision workflow intake.",
    notes:
      "Future backend workflow should require reason, version impact, reviewer assignment, and approval routing.",
  },
  {
    recordId: "HI-FRM-003",
    title: "Certified Copy Request Form",
    description:
      "Controlled form for preparing certified copies of publications, resolutions, and official enterprise records.",
    registryType: "Form",
    series: "Corporate Records",
    status: "DR",
    statusLabel: "Draft",
    owner: "Corporate Records",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retention: "Permanent",
    linkedPublication: "HI-COR-001",
    usage: "Certified-copy preparation and issuance control.",
    notes:
      "Future backend workflow should verify source record, execution location, authority, and issuance log.",
  },
  {
    recordId: "HI-FRM-004",
    title: "Governance Review Request Form",
    description:
      "Controlled form for requesting administrative, governance, treasury, legal, tax, or executive review.",
    registryType: "Form",
    series: "Governance",
    status: "DR",
    statusLabel: "Draft",
    owner: "Enterprise Governance",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retention: "Permanent",
    linkedPublication: "HI-GOV-001",
    usage: "Review routing and governance decision intake.",
    notes:
      "Future backend workflow should create review tasks, due dates, comments, and decision logs.",
  },
];

export const eglTemplateRecords: EGLFormsTemplatesRegistryRecord[] = [
  {
    recordId: "HI-TPL-001",
    title: "Enterprise Policy Template",
    description:
      "Standard controlled template for enterprise policies, standards, procedures, and administrative directives.",
    registryType: "Template",
    series: "Administration",
    status: "DR",
    statusLabel: "Draft",
    owner: "HCA",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retention: "Permanent",
    linkedPublication: "HI-ADM-002",
    usage: "Policy, standard, and procedure creation.",
    notes:
      "Future template engine should populate document number, classification, revision table, approval block, and footer.",
  },
  {
    recordId: "HI-TPL-002",
    title: "Resolution Template",
    description:
      "Standard controlled template for foundational resolutions, governance approvals, officer actions, and formal decisions.",
    registryType: "Template",
    series: "Resolutions",
    status: "DR",
    statusLabel: "Draft",
    owner: "Enterprise Governance",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retention: "Permanent",
    linkedPublication: "HI-GOV-001",
    usage: "Resolution drafting and formal governance records.",
    notes:
      "Future template engine should support adopting clauses, certificate blocks, execution metadata, and related publication links.",
  },
  {
    recordId: "HI-TPL-003",
    title: "Manual Template",
    description:
      "Standard controlled template for enterprise manuals, department manuals, desk procedures, and training manuals.",
    registryType: "Template",
    series: "Administration",
    status: "DR",
    statusLabel: "Draft",
    owner: "HCA",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retention: "Permanent",
    linkedPublication: "HI-ADM-001",
    usage: "Manual drafting, department guides, and employee training materials.",
    notes:
      "Future template engine should support sections, role-based procedures, training notes, controlled revision history, and attachments.",
  },
  {
    recordId: "HI-TPL-004",
    title: "Certified Copy Cover Template",
    description:
      "Standard controlled template for certified copy cover sheets, certification statements, and issuance packages.",
    registryType: "Template",
    series: "Corporate Records",
    status: "DR",
    statusLabel: "Draft",
    owner: "Corporate Records",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retention: "Permanent",
    linkedPublication: "HI-COR-001",
    usage: "Certified-copy packaging and recordkeeping.",
    notes:
      "Future template engine should include certification authority, source record, issuance date, copy number, and custodian record.",
  },
  {
    recordId: "HI-TPL-005",
    title: "Executive Briefing Template",
    description:
      "Standard controlled template for executive summaries, decision briefings, approval packets, and leadership review materials.",
    registryType: "Template",
    series: "Executive Operations",
    status: "DR",
    statusLabel: "Draft",
    owner: "Executive Operations",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    reviewDate: "Pending",
    classification: "Confidential",
    retention: "Permanent",
    linkedPublication: "HI-GOV-001",
    usage: "Executive review, decision preparation, and approval routing.",
    notes:
      "Future backend workflow should restrict access by role and support executive approval history.",
  },
];