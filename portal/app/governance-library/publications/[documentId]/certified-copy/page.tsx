import EGLWorkflowShell from "@/components/governance-library/EGLWorkflowShell";
import {
  getPublicationRecordByDocumentNumber,
  getPublicationStaticParams,
} from "@/lib/eglPublicationRecords";

interface CertifiedCopyPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export function generateStaticParams() {
  return getPublicationStaticParams();
}

export default async function CertifiedCopyPage({
  params,
}: CertifiedCopyPageProps) {
  const { documentId } = await params;
  const publication = getPublicationRecordByDocumentNumber(documentId);

  return (
    <EGLWorkflowShell publication={publication} workflowType="certification" />
  );
}