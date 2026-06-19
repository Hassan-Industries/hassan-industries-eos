import { publications } from "@/data/governanceLibrary";
import type { PublicationRecord } from "@/data/governanceLibrary";

type DisplayPublicationRecord = PublicationRecord & {
  id?: string;
  documentId?: string;
  documentNo?: string;
  documentNumber?: string;
  title?: string;
  series?: string;
  publicationSeries?: string;
  documentType?: string;
  owner?: string;
  authority?: string;
  version?: string;
  status?: string;
  documentState?: string;
  effectiveDate?: string;
  reviewDate?: string;
  originalExecutedLocation?: string;
  certifiedCopy?: string;
  supersedes?: string;
  supersededBy?: string;
  relatedResolution?: string;
  relatedImplementationProject?: string;
  classification?: string;
  retentionCategory?: string;
  notes?: string;
};

export function getPublicationDocumentNumber(publication: PublicationRecord) {
  const record = publication as DisplayPublicationRecord;

  return (
    record.documentNo ??
    record.documentNumber ??
    record.documentId ??
    record.id ??
    "unknown-document"
  );
}

export function getPublicationRecordByDocumentNumber(documentNumber: string) {
  const normalizedTarget = normalizeDocumentNumber(documentNumber);

  const matchedPublication = publications.find(
    (publication) =>
      normalizeDocumentNumber(getPublicationDocumentNumber(publication)) ===
      normalizedTarget,
  );

  return matchedPublication ?? createFrontendPlaceholderRecord(documentNumber);
}

export function getPublicationRecordHref(documentNumber: string) {
  return `/governance-library/publications/${encodeURIComponent(
    documentNumber,
  )}`;
}

export function getPublicationViewerHref(documentNumber: string) {
  return `${getPublicationRecordHref(documentNumber)}/viewer`;
}

export function getPublicationStaticParams() {
  return publications.map((publication) => ({
    documentId: getPublicationDocumentNumber(publication),
  }));
}

function normalizeDocumentNumber(value: string) {
  return safeDecodeURIComponent(value).trim().toLowerCase();
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function createFrontendPlaceholderRecord(documentNumber: string) {
  return {
    id: documentNumber,
    documentNo: documentNumber,
    documentNumber,
    title: "Unregistered Publication Record",
    series: "Unassigned",
    publicationSeries: "Unassigned",
    documentType: "Record Shell",
    owner: "HCA",
    authority: "Hassan Industries",
    version: "Pending",
    status: "DR",
    documentState: "Frontend Shell",
    effectiveDate: "Pending",
    reviewDate: "Pending",
    originalExecutedLocation: "No file attached",
    certifiedCopy: "Not Available",
    supersedes: "N/A",
    supersededBy: "N/A",
    relatedResolution: "N/A",
    relatedImplementationProject: "HIEOS-IMP-006I",
    classification: "Internal Governance",
    retentionCategory: "Pending",
    notes:
      "Frontend record shell. No backend registry record or document file is attached yet.",
  } as PublicationRecord;
}