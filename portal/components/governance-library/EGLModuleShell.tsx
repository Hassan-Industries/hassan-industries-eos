"use client";

import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";
import type { EGLModuleConfig } from "@/data/eglModules";

interface EGLModuleShellProps {
  module: EGLModuleConfig;
}

export function EGLModuleShell({ module }: EGLModuleShellProps) {
  return (
    <div className="mx-auto max-w-[1680px] space-y-6">
      <section className="rounded-xl bg-[#050816] p-6 text-white shadow-sm lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#ffbf00]">
              Hassan Industries
            </p>
            <h1 className="mt-4 text-3xl font-black uppercase tracking-tight lg:text-4xl">
              {module.title}
            </h1>
            <p className="mt-4 max-w-5xl text-sm font-semibold leading-7 text-white">
              {module.description}
            </p>
          </div>

          <div className="rounded-lg border border-[#ffbf00] bg-[#101827] px-8 py-5 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white">
              Module Status
            </p>
            <p className="mt-3 text-2xl font-black text-[#ffbf00]">
              {module.status}
            </p>
            <p className="mt-1 text-xs font-black text-white">
              {module.commandLabel}
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/governance-library"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c8d3df] bg-white px-5 text-sm font-black text-[#050816] shadow-sm transition hover:border-[#ff8a00]"
        >
          <ArrowLeft size={16} className="text-[#ff8a00]" />
          Back to EGL Dashboard
        </Link>
      </div>

      <p className="text-right text-[11px] font-black uppercase tracking-[0.55em] text-[#94a3b8]">
        {module.subtitle}
      </p>

      <section className="grid gap-4 md:grid-cols-3">
        {module.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-[#d8e1ea] bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold text-[#48617e]">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-black text-[#050816]">
              {metric.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="overflow-hidden rounded-xl border border-[#d8e1ea] bg-white shadow-sm">
          <div className="border-b border-[#d8e1ea] p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
              Enterprise Governance Library
            </p>
            <h2 className="mt-2 text-2xl font-black">Module Records</h2>
            <p className="mt-3 text-sm leading-7 text-[#33445c]">
              Frontend-only record shell for this EGL module.
            </p>
          </div>

          <div className="divide-y divide-[#d8e1ea]">
            {module.records.map((record) => (
              <article key={record.id} className="px-6 py-5">
                <div className="grid gap-4 lg:grid-cols-[160px_minmax(0,1fr)_100px_120px] lg:items-start">
                  <div className="font-black text-[#050816]">{record.id}</div>

                  <div>
                    <p className="font-black text-[#050816]">{record.title}</p>
                    <p className="mt-2 max-w-[520px] text-xs font-semibold leading-6 text-[#48617e]">
                      {record.description}
                    </p>
                  </div>

                  <span className="w-fit rounded-md bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                    {record.status}
                  </span>

                  <div className="font-black text-[#050816]">
                    {record.owner}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#050816] text-[#ffbf00]">
                <FolderKanban size={24} />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
                  Implementation Notes
                </p>
                <h2 className="mt-2 text-2xl font-black">Frontend Only</h2>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {module.plannedActions.map((action) => (
                <div
                  key={action}
                  className="rounded-lg border border-[#d8e1ea] bg-[#f8fafc] px-4 py-3 text-sm font-black text-[#050816]"
                >
                  {action}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-dashed border-[#c8d3df] bg-white p-6 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#94a3b8]">
              Current Module Route
            </p>
            <h2 className="mt-2 text-xl font-black">{module.route}</h2>
            <p className="mt-5 text-sm leading-7 text-[#33445c]">
              This page is intentionally frontend-only. It establishes the
              route, layout, terminology, and module structure needed before
              adding database records, workflow states, document uploads,
              certified-copy generation, authentication, or Microsoft 365 /
              SharePoint integrations.
            </p>
          </section>
        </aside>
      </section>
    </div>
  );
}

export default EGLModuleShell;