"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copy prompt" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-paper-2 hover:bg-copper-deep"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
