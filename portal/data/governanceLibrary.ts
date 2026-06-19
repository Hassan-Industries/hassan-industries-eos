import {
  BookOpen,
  ClipboardCheck,
  Clock,
  FileArchive,
  FileCheck,
  FileText,
  FolderOpen,
  Gavel,
  Landmark,
  Scale,
  Settings,
  ShieldCheck,
} from "lucide-react";

export type PublicationRecord = {
  documentNo: string;
  title: string;
  series: string;
  status: string;
  version: string;
  owner: string;
  documentType: string;
  authority: string;
  documentState: string;
  effectiveDate: string;
  reviewDate: string;
  originalExecutedLocation: string;
  certifiedCopy: string;
  supersedes: string;
  supersededBy: string;
  relatedResolution: string;
  relatedImplementationProject: string;
  classification: string;
  retentionCategory: string;
  notes: string;
};

export const eglStats = [
  ["Active Publications", "241", BookOpen],
  ["Pending Review", "23", Clock],
  ["Pending Execution", "17", ClipboardCheck],
  ["Certified Copies", "89", FileCheck],
  ["Active Policies", "64", FileText],
];

export const publicationSeries = [
  ["Governance", "27 Publications", ShieldCheck],
  ["Administration", "41 Publications", Settings],
  ["Treasury", "33 Publications", Landmark],
  ["Legal", "29 Publications", Scale],
  ["Tax", "21 Publications", FileArchive],
  ["Records", "18 Publications", FolderOpen],
  ["Correspondence", "17 Publications", FileText],
  ["Technology", "15 Publications", Settings],
  ["Resolutions", "12 Publications", Gavel],
  ["Forms & Templates", "28 Publications", FileText],
];

export const publications: PublicationRecord[] = [
  {
    documentNo: "HI-ADM-001",
    title: "Enterprise Administration & Enterprise Services Manual",
    series: "Administration",
    status: "AP",
    version: "1.0",
    owner: "HCA",
    documentType: "Manual",
    authority: "Hassan Capital Partners, LLC",
    documentState: "Active",
    effectiveDate: "2026-06-18",
    reviewDate: "2027-06-18",
    originalExecutedLocation: "HCA Vault / Originals",
    certifiedCopy: "Available",
    supersedes: "N/A",
    supersededBy: "N/A",
    relatedResolution: "HCP-RES-2026-001",
    relatedImplementationProject: "HIEOS-IMP-006A",
    classification: "Internal Governance",
    retentionCategory: "Permanent",
    notes: "Flagship enterprise administration publication.",
  },
  {
    documentNo: "HI-ADM-002",
    title: "Enterprise Document Control Standard",
    series: "Administration",
    status: "AP",
    version: "1.0",
    owner: "HCA",
    documentType: "Standard",
    authority: "Hassan Corporate Agents",
    documentState: "Active",
    effectiveDate: "2026-06-18",
    reviewDate: "2027-06-18",
    originalExecutedLocation: "HCA Vault / Originals",
    certifiedCopy: "Available",
    supersedes: "N/A",
    supersededBy: "N/A",
    relatedResolution: "N/A",
    relatedImplementationProject: "HIEOS-IMP-006A",
    classification: "Internal Governance",
    retentionCategory: "Permanent",
    notes: "Controls numbering, revisions, classifications, and document records.",
  },
  {
    documentNo: "HI-TRE-001",
    title: "Enterprise Treasury Manual",
    series: "Treasury",
    status: "AP",
    version: "1.0",
    owner: "HCA",
    documentType: "Manual",
    authority: "Hassan Capital Partners, LLC",
    documentState: "Active",
    effectiveDate: "2026-06-20",
    reviewDate: "2027-06-20",
    originalExecutedLocation: "HCA Vault / Originals",
    certifiedCopy: "Available",
    supersedes: "N/A",
    supersededBy: "N/A",
    relatedResolution: "HCP-RES-2026-001",
    relatedImplementationProject: "HIEOS-IMP-006A",
    classification: "Confidential",
    retentionCategory: "Permanent",
    notes: "Enterprise treasury governance publication.",
  },
  {
    documentNo: "HI-GOV-001",
    title: "Enterprise Governance Manual",
    series: "Governance",
    status: "DR",
    version: "0.1",
    owner: "HCA",
    documentType: "Manual",
    authority: "Hassan Capital Partners, LLC",
    documentState: "Draft",
    effectiveDate: "Pending",
    reviewDate: "Pending",
    originalExecutedLocation: "N/A",
    certifiedCopy: "Not Available",
    supersedes: "N/A",
    supersededBy: "N/A",
    relatedResolution: "N/A",
    relatedImplementationProject: "HIEOS-IMP-006A",
    classification: "Internal Draft",
    retentionCategory: "Governance Draft",
    notes: "Draft governance publication pending review.",
  },
  {
    documentNo: "HCP-RES-2026-001",
    title: "Foundational Treasury Resolution",
    series: "Resolutions",
    status: "OE",
    version: "1.0",
    owner: "HCP",
    documentType: "Resolution",
    authority: "Hassan Capital Partners, LLC",
    documentState: "Original Executed",
    effectiveDate: "2026-06-20",
    reviewDate: "N/A",
    originalExecutedLocation: "HCA Vault / Originals",
    certifiedCopy: "Available",
    supersedes: "N/A",
    supersededBy: "N/A",
    relatedResolution: "N/A",
    relatedImplementationProject: "HIEOS-IMP-006A",
    classification: "Confidential",
    retentionCategory: "Permanent",
    notes: "Foundational resolution adopting HI-TRE-001.",
  },
];

export const statusCodes = [
  ["DR", "Draft"],
  ["RV", "Review"],
  ["AP", "Approved"],
  ["OE", "Original Executed"],
  ["CC", "Certified Copy"],
  ["SP", "Superseded"],
  ["AR", "Archived"],
  ["VO", "Void"],
];

export const quickActions = [
  "Create New Publication",
  "New Resolution",
  "Upload Document",
  "Create Certified Copy",
  "Create Implementation Packet",
  "View Registers",
];

export const lifecycleSteps = [
  ["DR", "Draft"],
  ["RV", "Review"],
  ["AP", "Approved"],
  ["OE", "Original Executed"],
  ["CC", "Certified Copy"],
  ["AC", "Active"],
  ["SP", "Superseded"],
];

export const relationshipNodes = [
  "Entities",
  "Resolutions",
  "Implementation",
  "Forms",
  "Registers",
  "Certified Copies",
];

export const plannedPages = [
  "/governance-library",
  "/governance-library/publications",
  "/governance-library/resolutions",
  "/governance-library/forms",
  "/governance-library/templates",
  "/governance-library/certified-copies",
  "/governance-library/pending-review",
  "/governance-library/pending-execution",
];

export const principles = [
  "Authority & Control",
  "Version Integrity",
  "Lifecycle Management",
  "Traceability & Relationships",
  "Security & Access Control",
  "Retention & Compliance",
  "Originals & Certified Copies",
  "Enterprise-Wide Applicability",
];

export { BookOpen };

export type PublicationStatus = "Active" | "Draft" | "Pending Review" | "Archived";

export type PublicationClassification =
  | "Public"
  | "Internal"
  | "Confidential"
  | "Restricted";

export type PublicationCategory =
  | "Administration"
  | "Governance"
  | "Treasury"
  | "Legal"
  | "Tax"
  | "Corporate Records"
  | "Correspondence";

export interface GovernancePublication {
  id: string;
  documentId: string;
  title: string;
  summary: string;
  category: PublicationCategory;
  status: PublicationStatus;
  classification: PublicationClassification;
  owner: string;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
}

export const governancePublications: GovernancePublication[] = [
  {
    id: "hi-adm-001",
    documentId: "HI-ADM-001",
    title: "Enterprise Document Control & Information Governance Standard",
    summary:
      "Central administrative standard governing document numbering, classifications, formatting, revision control, ownership, retention, and enterprise records management.",
    category: "Administration",
    status: "Active",
    classification: "Internal",
    owner: "Hassan Industries Administration",
    version: "v1.0",
    effectiveDate: "2026-06-01",
    lastUpdated: "2026-06-18",
  },
  {
    id: "hi-tre-001",
    documentId: "HI-TRE-001",
    title: "Enterprise Treasury Policy",
    summary:
      "Treasury policy governing banking, internal transfers, approvals, reconciliations, and enterprise financial controls.",
    category: "Treasury",
    status: "Active",
    classification: "Confidential",
    owner: "Enterprise Treasury",
    version: "v1.0",
    effectiveDate: "2026-06-01",
    lastUpdated: "2026-06-14",
  },
  {
    id: "hi-gov-001",
    documentId: "HI-GOV-001",
    title: "Enterprise Governance Library Charter",
    summary:
      "Foundational governance charter defining the purpose, structure, authority, and publication standards of the Enterprise Governance Library.",
    category: "Governance",
    status: "Draft",
    classification: "Internal",
    owner: "Enterprise Governance",
    version: "v0.1",
    effectiveDate: "Pending",
    lastUpdated: "2026-06-18",
  },
  {
    id: "hi-cor-001",
    documentId: "HI-COR-001",
    title: "Corporate Records Retention Schedule",
    summary:
      "Administrative records schedule defining retention expectations for entity records, governance records, tax records, contracts, and correspondence.",
    category: "Corporate Records",
    status: "Pending Review",
    classification: "Internal",
    owner: "Corporate Records",
    version: "v0.1",
    effectiveDate: "Pending",
    lastUpdated: "2026-06-18",
  },
];

export const publicationStatuses: PublicationStatus[] = [
  "Active",
  "Draft",
  "Pending Review",
  "Archived",
];

export const publicationCategories: PublicationCategory[] = [
  "Administration",
  "Governance",
  "Treasury",
  "Legal",
  "Tax",
  "Corporate Records",
  "Correspondence",
];

export const publicationClassifications: PublicationClassification[] = [
  "Public",
  "Internal",
  "Confidential",
  "Restricted",
];