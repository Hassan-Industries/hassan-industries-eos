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

interface EGLRecordActionControlsProps {
  documentNumber: string;
  context?: "profile" | "detail";
}

export default function EGLRecordActionControls({
  documentNumber,
  context = "profile",
}: EGLRecordActionControlsProps) {
  const [copied, setCopied] = useState(false);

  const recordHref = `/governance-library/publications/${encodeURIComponent(
    documentNumber,
  )}`;

  async function handleCopyDocumentNumber() {
    try {
      await navigator.clipboard.writeText(documentNumber);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  if (context === "profile") {
    return (
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link
          href={recordHref}
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
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
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-950">
            Record Actions
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Frontend controls prepared for future workflow, file, and registry
            operations.
          </p>
        </div>

        <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-700">
          Frontend
        </span>
      </div>

      <div className="grid gap-2">
        <ActionLink
          href={recordHref}
          label="Open Record in New Tab"
          icon={Eye}
        />

        <ActionButton
          label={copied ? "Document ID Copied" : "Copy Document ID"}
          icon={copied ? Check : Copy}
          onClick={handleCopyDocumentNumber}
        />

        <ActionButton label="Download Copy" icon={Download} />

        <ActionButton label="Upload Replacement" icon={Upload} />

        <ActionButton label="Create Certified Copy" icon={FileCheck2} />

        <ActionButton label="View Revision History" icon={GitBranch} />

        <ActionButton label="Request Review" icon={RefreshCcw} />
      </div>
    </section>
  );
}

interface ActionLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

function ActionLink({ href, label, icon: Icon }: ActionLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
    >
      <Icon className="h-4 w-4" />
      {label}
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
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
    >
      <Icon className="h-4 w-4 text-amber-600" />
      {label}
    </button>
  );
}