import { BookOpen } from "lucide-react";

import EGLRecordActionControls from "@/components/governance-library/EGLRecordActionControls";
import EGLSelectionPlaceholder from "@/components/governance-library/EGLSelectionPlaceholder";
import type { PublicationRecord } from "@/data/governanceLibrary";
import { getPublicationDocumentNumber } from "@/lib/eglPublicationRecords";

interface PublicationDetailsPreviewProps {
  publication: PublicationRecord | null;
}

type DisplayPublicationRecord = PublicationRecord & {
  title?: string;
  description?: string;
  summary?: string;
  series?: string;
  publicationSeries?: string;
  category?: string;
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
  if (!publication) {
    return <EGLSelectionPlaceholder context="dashboard" />;
  }

  const record = publication as DisplayPublicationRecord;
  const documentNumber = getPublicationDocumentNumber(publication);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
            Document Profile
          </h2>
        </div>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
          {record.documentState ?? "Active"}
        </span>
      </div>

      <div className="rounded-lg bg-slate-950 p-4 text-white">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-amber-400" />

          <div>
            <h3 className="text-lg font-extrabold">{documentNumber}</h3>

            <p className="mt-1 text-xs leading-4 text-slate-200">
              {record.title ?? "Untitled Publication"}
            </p>
          </div>
        </div>
      </div>

      <dl className="mt-4 space-y-0">
        <ProfileField label="Publication Series" value={getSeries(record)} />
        <ProfileField
          label="Document Type"
          value={record.documentType ?? "Manual"}
        />
        <ProfileField label="Owner" value={record.owner ?? "HCA"} />
        <ProfileField
          label="Authority"
          value={record.authority ?? "Hassan Capital Partners, LLC"}
        />
        <ProfileField label="Version" value={record.version ?? "1.0"} />
        <ProfileField label="Status" value={record.status ?? "AP"} />
        <ProfileField
          label="Document State"
          value={record.documentState ?? "Active"}
        />
        <ProfileField
          label="Effective Date"
          value={record.effectiveDate ?? "Pending"}
        />
        <ProfileField
          label="Review Date"
          value={record.reviewDate ?? "Pending"}
        />
        <ProfileField
          label="Original Executed Location"
          value={record.originalExecutedLocation ?? "HCA Vault / Originals"}
        />
      </dl>

      <details className="mt-4 rounded-lg border border-slate-950 p-3" open>
        <summary className="cursor-pointer text-xs font-bold text-slate-700">
          Additional Document Intelligence
        </summary>

        <dl className="mt-3 space-y-0">
          <ProfileField
            label="Certified Copy"
            value={record.certifiedCopy ?? "Available"}
          />
          <ProfileField label="Supersedes" value={record.supersedes ?? "N/A"} />
          <ProfileField
            label="Superseded By"
            value={record.supersededBy ?? "N/A"}
          />
          <ProfileField
            label="Related Resolution"
            value={record.relatedResolution ?? "N/A"}
          />
          <ProfileField
            label="Related Implementation Project"
            value={record.relatedImplementationProject ?? "HIEOS-IMP-006A"}
          />
          <ProfileField
            label="Classification"
            value={record.classification ?? "Internal Governance"}
          />
          <ProfileField
            label="Retention Category"
            value={record.retentionCategory ?? "Permanent"}
          />
          <ProfileField
            label="Notes"
            value={
              record.notes ??
              record.description ??
              record.summary ??
              "Controlled enterprise publication record."
            }
          />
        </dl>
      </details>

      <EGLRecordActionControls
        documentNumber={documentNumber}
        context="profile"
      />
    </section>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-200 py-2 text-xs last:border-b-0">
      <dt className="font-bold text-slate-500">{label}</dt>
      <dd className="text-right font-semibold text-slate-950">{value}</dd>
    </div>
  );
}

function getSeries(record: DisplayPublicationRecord) {
  return (
    record.series ??
    record.publicationSeries ??
    record.category ??
    "Administration"
  );
}