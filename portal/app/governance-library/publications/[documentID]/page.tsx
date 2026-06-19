import EGLRecordDetailShell from "@/components/governance-library/EGLRecordDetailShell";
import {
  getPublicationRecordByDocumentNumber,
  getPublicationStaticParams,
} from "@/lib/eglPublicationRecords";

interface PublicationRecordDetailPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export function generateStaticParams() {
  return getPublicationStaticParams();
}

export default async function PublicationRecordDetailPage({
  params,
}: PublicationRecordDetailPageProps) {
  const { documentId } = await params;
  const publication = getPublicationRecordByDocumentNumber(documentId);

  return <EGLRecordDetailShell publication={publication} />;
}