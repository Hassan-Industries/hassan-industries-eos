import { BookOpen } from "@/data/governanceLibrary";
import type { PublicationRecord } from "@/data/governanceLibrary";

type Props = {
  publication: PublicationRecord;
};

export default function PublicationDetailsPreview({ publication }: Props) {
  const primaryFields = [
    ["Publication Series", publication.series],
    ["Document Type", publication.documentType],
    ["Owner", publication.owner],
    ["Authority", publication.authority],
    ["Version", publication.version],
    ["Status", publication.status],
    ["Document State", publication.documentState],
    ["Effective Date", publication.effectiveDate],
    ["Review Date", publication.reviewDate],
    ["Original Executed Location", publication.originalExecutedLocation],
  ];

  const secondaryFields = [
    ["Certified Copy", publication.certifiedCopy],
    ["Supersedes", publication.supersedes],
    ["Superseded By", publication.supersededBy],
    ["Related Resolution", publication.relatedResolution],
    ["Related Implementation Project", publication.relatedImplementationProject],
    ["Classification", publication.classification],
    ["Retention Category", publication.retentionCategory],
    ["Notes", publication.notes],
  ];

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold uppercase tracking-wide">
          Document Profile
        </h2>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {publication.documentState}
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-[#071426] p-4 text-white">
        <div className="flex items-start gap-3">
          <BookOpen className="text-amber-400" size={32} />
          <div>
            <h3 className="text-lg font-bold">{publication.documentNo}</h3>
            <p className="text-xs text-slate-300">{publication.title}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs">
        {primaryFields.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3 border-b pb-2">
            <span className="font-semibold text-slate-600">{label}</span>
            <span className="text-right text-slate-800">{value}</span>
          </div>
        ))}
      </div>

      <details className="mt-3 rounded-lg border p-3 text-xs">
        <summary className="cursor-pointer font-semibold text-slate-700">
          Additional Document Intelligence
        </summary>

        <div className="mt-3 space-y-2">
          {secondaryFields.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3 border-b pb-2">
              <span className="font-semibold text-slate-600">{label}</span>
              <span className="text-right text-slate-800">{value}</span>
            </div>
          ))}
        </div>
      </details>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="rounded-lg bg-[#071426] px-4 py-3 text-sm font-semibold text-white">
          View Record
        </button>
        <button className="rounded-lg border px-4 py-3 text-sm font-semibold">
          Download
        </button>
      </div>
    </div>
  );
}