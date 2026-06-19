export type EGLResolutionRecord = {
  resolutionId: string;
  title: string;
  summary: string;
  status: string;
  statusLabel: string;
  owner: string;
  authority: string;
  version: string;
  resolutionType: string;
  documentState: string;
  effectiveDate: string;
  executionDate: string;
  reviewDate: string;
  classification: string;
  retentionCategory: string;
  originalExecutedLocation: string;
  certifiedCopy: string;
  relatedPublication: string;
  relatedImplementationProject: string;
  notes: string;
};

export const eglResolutionRecords: EGLResolutionRecord[] = [
  {
    resolutionId: "HCP-RES-2026-001",
    title: "Foundational Treasury Resolution",
    summary: "Foundational resolution adopting HI-TRE-001 and treasury control structure.",
    status: "OE",
    statusLabel: "Original Executed",
    owner: "HCP",
    authority: "Hassan Capital Partners, LLC",
    version: "1.0",
    resolutionType: "Foundational Resolution",
    documentState: "Original Executed",
    effectiveDate: "2026-06-20",
    executionDate: "2026-06-20",
    reviewDate: "N/A",
    classification: "Internal Governance",
    retentionCategory: "Permanent",
    originalExecutedLocation: "HCA Vault / Originals",
    certifiedCopy: "Available",
    relatedPublication: "HI-TRE-001",
    relatedImplementationProject: "HIEOS-IMP-006A",
    notes: "Foundational resolution adopting the enterprise treasury policy and initial treasury governance controls.",
  },
  {
    resolutionId: "HCA-RES-DRAFT-001",
    title: "Document Control Adoption Resolution",
    summary: "Draft resolution for enterprise document-control adoption and registry authority.",
    status: "DR",
    statusLabel: "Draft",
    owner: "HCA",
    authority: "Hassan Corporate Agents",
    version: "0.1",
    resolutionType: "Adoption Resolution",
    documentState: "Draft",
    effectiveDate: "Pending",
    executionDate: "Pending",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retentionCategory: "Permanent",
    originalExecutedLocation: "Pending",
    certifiedCopy: "Not Available",
    relatedPublication: "HI-ADM-002",
    relatedImplementationProject: "HIEOS-IMP-006M",
    notes: "Placeholder draft resolution for future document-control governance adoption.",
  },
  {
    resolutionId: "HCP-RES-DRAFT-002",
    title: "Enterprise Governance Library Authority Resolution",
    summary: "Draft resolution recognizing EGL as the controlled publication library for enterprise standards and records.",
    status: "DR",
    statusLabel: "Draft",
    owner: "HCP",
    authority: "Hassan Capital Partners, LLC",
    version: "0.1",
    resolutionType: "Governance Resolution",
    documentState: "Draft",
    effectiveDate: "Pending",
    executionDate: "Pending",
    reviewDate: "Pending",
    classification: "Internal Governance",
    retentionCategory: "Permanent",
    originalExecutedLocation: "Pending",
    certifiedCopy: "Not Available",
    relatedPublication: "HI-GOV-001",
    relatedImplementationProject: "HIEOS-IMP-006N",
    notes: "Future resolution shell for formal EGL authority and governance-library control.",
  },
];