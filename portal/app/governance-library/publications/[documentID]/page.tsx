import { notFound } from "next/navigation";

import EGLRecordDetailShell from "@/components/governance-library/EGLRecordDetailShell";
import { publications } from "@/data/governanceLibrary";
import type { PublicationRecord } from "@/data/governanceLibrary";

interface PublicationRecordDetailPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

type DisplayPublicationRecord = PublicationRecord & {
  id?: string;
  documentId?: string;
  documentNo?: string;
  documentNumber?: string;
};

export function generateStaticParams() {
  return publications.map((publication) => ({
    documentId: getDocumentNumber(publication),
  }));
}

export default async function PublicationRecordDetailPage({
  params,
}: PublicationRecordDetailPageProps) {
  const { documentId } = await params;
  const decodedDocumentId = decodeURIComponent(documentId);

  const publication = publications.find(
    (record) =>
      getDocumentNumber(record).toLowerCase() ===
      decodedDocumentId.toLowerCase(),
  );

  if (!publication) {
    notFound();
  }

  return <EGLRecordDetailShell publication={publication} />;
}

function getDocumentNumber(publication: PublicationRecord) {
  const record = publication as DisplayPublicationRecord;

  return (
    record.documentNo ??
    record.documentNumber ??
    record.documentId ??
    record.id ??
    "unknown-document"
  );
}