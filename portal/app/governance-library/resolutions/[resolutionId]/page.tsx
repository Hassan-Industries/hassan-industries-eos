import EGLResolutionRecordDetailShell from "@/components/governance-library/EGLResolutionRecordDetailShell";

interface ResolutionRecordPageProps {
  params: Promise<{
    resolutionId: string;
  }>;
}

export default async function ResolutionRecordPage({
  params,
}: ResolutionRecordPageProps) {
  const { resolutionId } = await params;

  return <EGLResolutionRecordDetailShell resolutionId={resolutionId} />;
}