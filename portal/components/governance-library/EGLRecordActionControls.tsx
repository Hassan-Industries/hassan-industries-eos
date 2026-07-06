"use client";

import Link from "next/link";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  Copy,
  Download,
  Eye,
  FileCheck2,
  GitBranch,
  RefreshCcw,
  Upload,
} from "lucide-react";
import {
  getPublicationCertificationHref,
  getPublicationRecordHref,
  getPublicationReviewRequestHref,
  getPublicationRevisionHistoryHref,
  getPublicationUploadHref,
  getPublicationViewerHref,
} from "@/lib/eglPublicationRecords";

interface EGLRecordActionControlsProps {
  documentNumber: string;
  context?: "profile" | "detail";
}

export default function EGLRecordActionControls({
  documentNumber,
  context = "profile",
}: EGLRecordActionControlsProps) {
  const [copied, setCopied] = useState(false);

  const recordHref = getPublicationRecordHref(documentNumber);
  const viewerHref = getPublicationViewerHref(documentNumber);
  const uploadHref = getPublicationUploadHref(documentNumber);
  const certificationHref = getPublicationCertificationHref(documentNumber);
  const revisionHistoryHref = getPublicationRevisionHistoryHref(documentNumber);
  const reviewRequestHref = getPublicationReviewRequestHref(documentNumber);

  async function handleCopyDocumentNumber() {
    try {
      await navigator.clipboard.writeText(documentNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  if (context === "profile") {
    return (
      <div className="mt-4 grid gap-3">
        <ActionLink href={recordHref} label="View Record" icon={Eye} newTab />
        <ActionLink href={viewerHref} label="Open Viewer" icon={Eye} />
        <ActionLink href={uploadHref} label="Upload Replacement" icon={Upload} />
        <ActionLink
          href={certificationHref}
          label="Create Certified Copy"
          icon={FileCheck2}
        />
        <ActionLink
          href={revisionHistoryHref}
          label="Revision History"
          icon={GitBranch}
        />
        <ActionLink
          href={reviewRequestHref}
          label="Request Review"
          icon={RefreshCcw}
        />
        <ActionButton
          label={copied ? "Document ID Copied" : "Copy Document ID"}
          icon={copied ? Check : Copy}
          onClick={handleCopyDocumentNumber}
        />
        <ActionLink href={viewerHref} label="Download Copy" icon={Download} />
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-[0.24em] text-[#050816]">
            Record Actions
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#536783]">
            Frontend controls prepared for future workflow, file, and registry
            operations.
          </p>
        </div>

        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">
          Frontend
        </span>
      </div>

      <div className="mt-6 grid gap-3">
        <ActionLink href={viewerHref} label="View Publication File" icon={Eye} />
        <ActionLink
          href={recordHref}
          label="Open Record in New Tab"
          icon={Eye}
          newTab
        />
        <ActionButton
          label={copied ? "Document ID Copied" : "Copy Document ID"}
          icon={copied ? Check : Copy}
          onClick={handleCopyDocumentNumber}
        />
        <ActionLink href={viewerHref} label="Download Copy" icon={Download} />
        <ActionLink href={uploadHref} label="Upload Replacement" icon={Upload} />
        <ActionLink
          href={certificationHref}
          label="Create Certified Copy"
          icon={FileCheck2}
        />
        <ActionLink
          href={revisionHistoryHref}
          label="View Revision History"
          icon={GitBranch}
        />
        <ActionLink
          href={reviewRequestHref}
          label="Request Review"
          icon={RefreshCcw}
        />
      </div>
    </section>
  );
}

interface ActionLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  newTab?: boolean;
}

function ActionLink({ href, label, icon: Icon, newTab = false }: ActionLinkProps) {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-amber-50"
    >
      <Icon size={16} className="text-[#ff8a00]" />
      <span>{label}</span>
    </Link>
  );
}

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

function ActionButton({ label, icon: Icon, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 text-sm font-black text-[#050816] transition hover:border-[#ff8a00] hover:bg-amber-50"
    >
      <Icon size={16} className="text-[#ff8a00]" />
      <span>{label}</span>
    </button>
  );
}