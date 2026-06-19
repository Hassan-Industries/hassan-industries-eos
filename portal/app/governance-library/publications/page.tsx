import EGLDocumentViewerShell from "@/components/governance-library/EGLDocumentViewerShell";
import {
  getPublicationRecordByDocumentNumber,
  getPublicationStaticParams,
} from "@/lib/eglPublicationRecords";

interface PublicationViewerPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export function generateStaticParams() {
  return getPublicationStaticParams();
}

export default async function PublicationViewerPage({
  params,
}: PublicationViewerPageProps) {
  const { documentId } = await params;
  const publication = getPublicationRecordByDocumentNumber(documentId);

  return <EGLDocumentViewerShell publication={publication} />;
}