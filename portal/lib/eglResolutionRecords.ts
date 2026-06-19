import {
  eglResolutionRecords,
  type EGLResolutionRecord,
} from "@/data/eglResolutions";

export function getResolutionRecordHref(resolutionId: string) {
  return `/governance-library/resolutions/${encodeURIComponent(resolutionId)}`;
}

export function findResolutionRecord(
  resolutionId: string,
): EGLResolutionRecord | null {
  const decodedResolutionId = safeDecode(resolutionId);

  return (
    eglResolutionRecords.find(
      (record) => record.resolutionId === decodedResolutionId,
    ) ?? null
  );
}

export function getResolutionStatusLabel(record: EGLResolutionRecord) {
  return `${record.status} — ${record.statusLabel}`;
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}