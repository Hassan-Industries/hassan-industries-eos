import EGLRevisionHistoryShell from "@/components/governance-library/EGLRevisionHistoryShell";
import {
  getPublicationRecordByDocumentNumber,
  getPublicationStaticParams,
} from "@/lib/eglPublicationRecords";

interface RevisionHistoryPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export function generateStaticParams() {
  return getPublicationStaticParams();
}

export default async function RevisionHistoryPage({
  params,
}: RevisionHistoryPageProps) {
  const { documentId } = await params;
  const publication = getPublicationRecordByDocumentNumber(documentId);

  return <EGLRevisionHistoryShell publication={publication} />;
}