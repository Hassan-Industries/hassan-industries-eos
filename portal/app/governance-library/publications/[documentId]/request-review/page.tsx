import EGLReviewRequestShell from "@/components/governance-library/EGLReviewRequestShell";
import {
  getPublicationRecordByDocumentNumber,
  getPublicationStaticParams,
} from "@/lib/eglPublicationRecords";

interface RequestReviewPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export function generateStaticParams() {
  return getPublicationStaticParams();
}

export default async function RequestReviewPage({
  params,
}: RequestReviewPageProps) {
  const { documentId } = await params;
  const publication = getPublicationRecordByDocumentNumber(documentId);

  return <EGLReviewRequestShell publication={publication} />;
}