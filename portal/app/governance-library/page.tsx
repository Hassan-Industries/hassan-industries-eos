"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import {
  BookOpen,
  ClipboardCheck,
  Clock,
  FileArchive,
  FileCheck,
  FileText,
  FolderOpen,
  Gavel,
  Landmark,
  Scale,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";

const stats = [
  ["Active Publications", "241", BookOpen],
  ["Pending Review", "23", Clock],
  ["Pending Execution", "17", ClipboardCheck],
  ["Certified Copies", "89", FileCheck],
  ["Active Policies", "64", FileText],
];

const series = [
  ["Governance", "27 Publications", ShieldCheck],
  ["Administration", "41 Publications", Settings],
  ["Treasury", "33 Publications", Landmark],
  ["Legal", "29 Publications", Scale],
  ["Tax", "21 Publications", FileArchive],
  ["Records", "18 Publications", FolderOpen],
  ["Correspondence", "17 Publications", FileText],
  ["Technology", "15 Publications", Settings],
  ["Resolutions", "12 Publications", Gavel],
];

const publications = [
  ["HI-ADM-001", "Enterprise Administration & Enterprise Services Manual", "Administration", "AP", "1.0", "HCA"],
  ["HI-ADM-002", "Enterprise Document Control Standard", "Administration", "AP", "1.0", "HCA"],
  ["HI-TRE-001", "Enterprise Treasury Manual", "Treasury", "AP", "1.0", "HCA"],
  ["HI-GOV-001", "Enterprise Governance Manual", "Governance", "DR", "0.1", "HCA"],
  ["HCP-RES-2026-001", "Foundational Treasury Resolution", "Resolutions", "OE", "1.0", "HCP"],
];

const statusCodes = [
  ["DR", "Draft"],
  ["RV", "Review"],
  ["AP", "Approved"],
  ["OE", "Original Executed"],
  ["CC", "Certified Copy"],
  ["SP", "Superseded"],
  ["AR", "Archived"],
  ["VO", "Void"],
];

export default function GovernanceLibraryPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Topbar />

          <div className="grid grid-cols-12 gap-6 p-8">
            <section className="col-span-9">
              <div className="rounded-xl bg-white p-6 shadow">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                  Hassan Industries
                </p>
                <h1 className="mt-2 text-3xl font-bold">
                  Enterprise Governance Library
                </h1>
                <p className="mt-2 text-slate-600">
                  Controlled publication system for governance, administration,
                  treasury, legal, tax, records, correspondence, technology,
                  resolutions, forms, templates, and certified copies.
                </p>

                <div className="mt-6 flex items-center rounded-lg border bg-white">
                  <div className="px-4 text-slate-400">
                    <Search size={18} />
                  </div>
                  <input
                    className="w-full rounded-lg px-2 py-4 outline-none"
                    placeholder="Search publications, manuals, policies, resolutions, forms, and more..."
                  />
                  <button className="rounded-r-lg bg-[#071426] px-6 py-4 text-white">
                    Search
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-5 gap-4">
                {stats.map(([label, value, Icon]) => {
                  const IconComponent = Icon as typeof BookOpen;
                  return (
                    <div key={label as string} className="rounded-xl bg-white p-5 shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">{label}</p>
                          <p className="mt-2 text-3xl font-bold">{value}</p>
                        </div>
                        <IconComponent className="text-amber-500" size={30} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl bg-white p-6 shadow">
                <h2 className="text-lg font-bold">Publication Series</h2>
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {series.map(([title, count, Icon]) => {
                    const IconComponent = Icon as typeof BookOpen;
                    return (
                      <div
                        key={title as string}
                        className="rounded-xl border p-5 text-center hover:border-amber-400 hover:bg-amber-50"
                      >
                        <IconComponent className="mx-auto mb-3 text-amber-500" />
                        <p className="font-bold uppercase">{title}</p>
                        <p className="mt-1 text-sm text-slate-500">{count}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">
                    Recently Updated Publications
                  </h2>
                  <span className="text-sm text-blue-700">View all publications</span>
                </div>

                <div className="mt-5 overflow-hidden rounded-lg border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="p-3">Document No.</th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Series</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Version</th>
                        <th className="p-3">Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {publications.map(([docNo, title, pubSeries, status, version, owner]) => (
                        <tr key={docNo as string} className="border-t">
                          <td className="p-3 font-semibold">{docNo}</td>
                          <td className="p-3">{title}</td>
                          <td className="p-3">{pubSeries}</td>
                          <td className="p-3">
                            <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                              {status}
                            </span>
                          </td>
                          <td className="p-3">{version}</td>
                          <td className="p-3">{owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <aside className="col-span-3 space-y-6">
              <div className="rounded-xl bg-white p-6 shadow">
                <h2 className="text-lg font-bold">Publication Details Preview</h2>

                <div className="mt-5 rounded-xl bg-[#071426] p-5 text-white">
                  <div className="flex items-start gap-4">
                    <BookOpen className="text-amber-400" size={36} />
                    <div>
                      <h3 className="text-xl font-bold">HI-ADM-001</h3>
                      <p className="text-sm text-slate-300">
                        Enterprise Administration & Enterprise Services Manual
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  {[
                    ["Publication Series", "Administration"],
                    ["Document Type", "Manual"],
                    ["Owner", "Hassan Corporate Agents"],
                    ["Authority", "Hassan Capital Partners, LLC"],
                    ["Version", "1.0"],
                    ["Status", "AP — Approved"],
                    ["Document State", "Active"],
                    ["Review Date", "2027-06-18"],
                    ["Original Executed Location", "HCA Vault / Originals"],
                    ["Certified Copy", "Available"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 border-b pb-2">
                      <span className="font-semibold text-slate-600">{label}</span>
                      <span className="text-right">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button className="rounded-lg bg-[#071426] px-4 py-3 text-sm font-semibold text-white">
                    View Record
                  </button>
                  <button className="rounded-lg border px-4 py-3 text-sm font-semibold">
                    Download
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <h2 className="text-lg font-bold">Quick Actions</h2>
                <div className="mt-4 space-y-2">
                  {[
                    "Create New Publication",
                    "New Resolution",
                    "Upload Document",
                    "Create Certified Copy",
                    "Create Implementation Packet",
                    "View Registers",
                  ].map((action) => (
                    <button
                      key={action}
                      className="w-full rounded-lg border px-4 py-3 text-left text-sm hover:border-amber-400 hover:bg-amber-50"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <h2 className="text-lg font-bold">Document Status Codes</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {statusCodes.map(([code, meaning]) => (
                    <div key={code} className="flex items-center gap-2">
                      <span className="rounded bg-[#071426] px-2 py-1 text-xs font-bold text-white">
                        {code}
                      </span>
                      <span>{meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-[#071426] p-6 text-white shadow">
                <h2 className="font-bold text-amber-400">Lifecycle Flow</h2>
                <p className="mt-3 text-sm text-slate-300">
                  Draft → Review → Approved → Original Executed → Certified Copy
                  → Active → Superseded / Archived / Void
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}