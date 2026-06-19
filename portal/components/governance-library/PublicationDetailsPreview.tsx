import Link from "next/link";
import { BookOpen, Download, Eye } from "lucide-react";

import type { PublicationRecord } from "@/data/governanceLibrary";

interface PublicationDetailsPreviewProps {
  publication: PublicationRecord;
}

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

export default function PublicationDetailsPreview({
  publication,
}: PublicationDetailsPreviewProps) {
  const record = publication as DisplayPublicationRecord;
  const documentNumber = getDocumentNumber(record);

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-950">
          Document Profile
        </h2>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
          Active
        </span>
      </div>

      <div className="mb-4 rounded-xl bg-slate-950 p-4 text-white">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-amber-400" />

          <div>
            <h3 className="text-lg font-bold">{documentNumber}</h3>

            <p className="mt-1 text-xs text-slate-300">
              {record.title ?? "Untitled Publication"}
            </p>
          </div>
        </div>
      </div>

      <dl className="text-xs">
        <ProfileRow
          label="Publication Series"
          value={record.series ?? record.publicationSeries ?? "Administration"}
        />
        <ProfileRow
          label="Document Type"
          value={record.documentType ?? "Standard"}
        />
        <ProfileRow label="Owner" value={record.owner ?? "HCA"} />
        <ProfileRow
          label="Authority"
          value={record.authority ?? "Hassan Capital Partners, LLC"}
        />
        <ProfileRow label="Version" value={record.version ?? "1.0"} />
        <ProfileRow label="Status" value={record.status ?? "AP"} />
        <ProfileRow
          label="Document State"
          value={record.documentState ?? "Active"}
        />
        <ProfileRow
          label="Effective Date"
          value={record.effectiveDate ?? "2026-06-18"}
        />
        <ProfileRow
          label="Review Date"
          value={record.reviewDate ?? "2027-06-18"}
        />
        <ProfileRow
          label="Original Executed Location"
          value={record.originalExecutedLocation ?? "HCA Vault / Originals"}
        />
      </dl>

      <div className="mt-4 rounded-lg border border-slate-900 p-3">
        <details open>
          <summary className="cursor-pointer text-xs font-bold text-slate-700">
            Additional Document Intelligence
          </summary>

          <dl className="mt-3 text-xs">
            <ProfileRow
              label="Certified Copy"
              value={record.certifiedCopy ?? "Available"}
            />
            <ProfileRow label="Supersedes" value={record.supersedes ?? "N/A"} />
            <ProfileRow
              label="Superseded By"
              value={record.supersededBy ?? "N/A"}
            />
            <ProfileRow
              label="Related Resolution"
              value={record.relatedResolution ?? "N/A"}
            />
            <ProfileRow
              label="Related Implementation Project"
              value={record.relatedImplementationProject ?? "HIEOS-IMP-006G"}
            />
            <ProfileRow
              label="Classification"
              value={record.classification ?? "Internal Governance"}
            />
            <ProfileRow
              label="Retention Category"
              value={record.retentionCategory ?? "Permanent"}
            />
            <ProfileRow
              label="Notes"
              value={record.notes ?? "Controlled enterprise publication."}
            />
          </dl>
        </details>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link
          href={`/governance-library/publications/${encodeURIComponent(
            documentNumber,
          )}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          <Eye className="h-4 w-4" />
          View Record
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:border-slate-950"
        >
          Download
          <Download className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-900 py-2 last:border-b-0">
      <dt className="font-bold text-slate-500">{label}</dt>
      <dd className="text-right text-slate-950">{value}</dd>
    </div>
  );
}

function getDocumentNumber(record: DisplayPublicationRecord) {
  return (
    record.documentNo ??
    record.documentNumber ??
    record.documentId ??
    record.id ??
    "N/A"
  );
}