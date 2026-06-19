"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyToClipboardButtonProps {
  value: string;
  label: string;
  copiedLabel?: string;
}

export default function CopyToClipboardButton({
  value,
  label,
  copiedLabel = "Copied",
}: CopyToClipboardButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        fallbackCopy(value);
      }

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      fallbackCopy(value);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-950 transition hover:border-amber-500 hover:bg-amber-50"
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-600" />
      ) : (
        <Copy className="h-4 w-4 text-amber-600" />
      )}

      {copied ? copiedLabel : label}
    </button>
  );
}

function fallbackCopy(value: string) {
  const textarea = document.createElement("textarea");

  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}