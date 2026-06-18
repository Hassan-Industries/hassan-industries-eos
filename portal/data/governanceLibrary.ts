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

export const publications = [
  [
    "HI-ADM-001",
    "Enterprise Administration & Enterprise Services Manual",
    "Administration",
    "AP",
    "1.0",
    "HCA",
  ],
  [
    "HI-ADM-002",
    "Enterprise Document Control Standard",
    "Administration",
    "AP",
    "1.0",
    "HCA",
  ],
  ["HI-TRE-001", "Enterprise Treasury Manual", "Treasury", "AP", "1.0", "HCA"],
  ["HI-GOV-001", "Enterprise Governance Manual", "Governance", "DR", "0.1", "HCA"],
  [
    "HCP-RES-2026-001",
    "Foundational Treasury Resolution",
    "Resolutions",
    "OE",
    "1.0",
    "HCP",
  ],
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

export const detailPreview = [
  ["Publication Series", "Administration"],
  ["Document Type", "Manual"],
  ["Owner", "Hassan Corporate Agents"],
  ["Authority", "Hassan Capital Partners, LLC"],
  ["Version", "1.0"],
  ["Status", "AP — Approved"],
  ["Document State", "Active"],
  ["Effective Date", "2026-06-18"],
  ["Review Date", "2027-06-18"],
  ["Original Executed Location", "HCA Vault / Originals"],
  ["Certified Copy", "Available"],
  ["Supersedes", "N/A"],
  ["Superseded By", "N/A"],
  ["Related Resolution", "HCP-RES-2026-001"],
  ["Related Implementation Project", "HIEOS-IMP-006A"],
  ["Classification", "Internal Governance"],
  ["Retention Category", "Permanent"],
  ["Notes", "Flagship enterprise administration publication."],
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