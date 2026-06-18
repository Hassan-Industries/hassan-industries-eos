"use client";

import {
  Bell,
  BookOpen,
  Building2,
  ClipboardCheck,
  ClipboardList,
  FileText,
  FolderArchive,
  Gavel,
  Headphones,
  Landmark,
  LayoutDashboard,
  Mail,
  Search,
  Settings,
  ShieldCheck,
  Users,
  BarChart3,
  BriefcaseBusiness,
  Scale,
  Globe2,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const navItems = [
  ["Dashboard", LayoutDashboard],
  ["Governance Library", BookOpen],
  ["Administration", Settings],
  ["Treasury", Landmark],
  ["Legal", Scale],
  ["Tax", Globe2],
  ["Corporate Records", FolderArchive],
  ["Correspondence", Mail],
  ["Technology", ShieldCheck],
  ["Entity Management", Building2],
  ["Publications", FileText],
  ["Resolutions", Gavel],
  ["Service Requests", Headphones],
  ["Implementation Center", ClipboardList],
];

const stats = [
  { label: "Active Entities", value: "12", icon: Building2 },
  { label: "Governance Documents", value: "24", icon: FileText },
  { label: "Active Resolutions", value: "3", icon: Gavel },
  { label: "Open Requests", value: "0", icon: Headphones },
  { label: "Compliance Status", value: "98%", icon: ShieldCheck },
];

const overviewData = [
  { month: "Jan", activity: 8, projects: 2 },
  { month: "Feb", activity: 12, projects: 3 },
  { month: "Mar", activity: 10, projects: 4 },
  { month: "Apr", activity: 15, projects: 5 },
  { month: "May", activity: 18, projects: 6 },
  { month: "Jun", activity: 24, projects: 7 },
];

const recentActivity = [
  ["HI-TRE-001 published", "Enterprise Treasury Publication"],
  ["HCP-RES-2026-001 executed", "Foundational Resolution"],
  ["Enterprise Governance Library initialized", "Administration"],
  ["HIEOS repository foundation completed", "Technology"],
];

const notifications = [
  ["Policy Review Due", "HI-TRE-001 annual review schedule pending"],
  ["Execution Copy Pending", "Wet-ink original must be scanned and filed"],
  ["Repository Update", "Phase 2 merged into dev"],
];

const tasks = [
  ["Review Dashboard UI", "Medium"],
  ["Create Publication Register", "High"],
  ["Prepare HI-ADM-001 outline", "Medium"],
];

const quickActions = [
  ["Governance Library", FolderArchive],
  ["Entity Register", Building2],
  ["Board Resolutions", Gavel],
  ["Corporate Records", ClipboardCheck],
  ["Service Center", Headphones],
  ["Reports", BarChart3],
  ["Implementation", BriefcaseBusiness],
  ["Administration", Settings],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <aside className="w-72 bg-[#071426] text-white">
          <div className="border-b border-white/10 p-6">
            <div className="text-xl font-bold tracking-wide text-amber-400">
              HASSAN INDUSTRIES
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-300">
              Enterprise Operating System
            </div>
          </div>

          <nav className="space-y-1 p-4">
            {navItems.map(([item, Icon], index) => {
              const IconComponent = Icon as typeof LayoutDashboard;
              return (
                <div
                  key={item as string}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${
                    index === 0
                      ? "bg-amber-400 text-slate-950"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  <IconComponent size={18} />
                  {item as string}
                </div>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/10 p-6 text-xs text-slate-400">
            <div className="font-semibold text-amber-400">Hassan Industries</div>
            <div>Building Generations of Legacy</div>
          </div>
        </aside>

        <section className="flex-1">
          <header className="flex items-center justify-between bg-[#071426] px-8 py-5 text-white">
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wide">
                Enterprise Operations Center
              </h1>
              <p className="text-sm text-slate-300">
                Unified. Governed. Purpose-Driven.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
                <Search size={16} />
                Search HIEOS...
              </div>
              <Bell size={20} />
              <div className="rounded-full border border-amber-400 px-3 py-2 text-sm text-amber-300">
                JH
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6 p-8">
            <section className="col-span-9">
              <div className="rounded-2xl bg-[#0b1d33] p-8 text-white shadow">
                <p className="text-lg text-slate-300">Welcome back,</p>
                <h2 className="mt-2 text-4xl font-bold">Jordan Hassan</h2>
                <p className="mt-3 text-slate-300">
                  Managing Partner & Chief Executive Officer
                </p>
                <p className="mt-6 max-w-2xl text-lg italic text-slate-200">
                  “Purpose governs. Systems empower. Legacy endures.”
                </p>
              </div>

              <div className="mt-6 grid grid-cols-5 gap-4">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-xl bg-white p-5 shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">{item.label}</p>
                          <p className="mt-2 text-3xl font-bold">{item.value}</p>
                        </div>
                        <Icon className="text-amber-500" size={30} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Enterprise Overview</h3>
                  <span className="text-sm text-slate-500">This Quarter</span>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-4">
                  {[
                    ["Open Projects", "7"],
                    ["Pending Reviews", "2"],
                    ["Pending Signatures", "1"],
                    ["Active Publications", "24"],
                  ].map(([label, value]) => (
                    <div key={label} className="border-r last:border-r-0">
                      <p className="text-sm text-slate-500">{label}</p>
                      <p className="mt-1 text-2xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={overviewData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="activity" strokeWidth={3} />
                      <Line type="monotone" dataKey="projects" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-white p-6 shadow">
                <h3 className="text-lg font-bold">Quick Access</h3>
                <div className="mt-5 grid grid-cols-4 gap-4">
                  {quickActions.map(([label, Icon]) => {
                    const IconComponent = Icon as typeof FolderArchive;
                    return (
                      <button
                        key={label as string}
                        className="rounded-xl border p-5 text-center hover:border-amber-400 hover:bg-amber-50"
                      >
                        <IconComponent className="mx-auto mb-3 text-[#071426]" />
                        <span className="text-sm font-medium">{label as string}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <aside className="col-span-3 space-y-6">
              <div className="rounded-xl bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Notifications</h3>
                  <span className="text-xs text-blue-700">View all</span>
                </div>
                <div className="mt-4 space-y-4">
                  {notifications.map(([title, detail]) => (
                    <div key={title} className="border-b pb-4">
                      <p className="text-sm font-semibold">{title}</p>
                      <p className="mt-1 text-xs text-slate-500">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">My Tasks</h3>
                  <span className="text-xs text-blue-700">View all</span>
                </div>
                <div className="mt-4 space-y-4">
                  {tasks.map(([task, priority]) => (
                    <div key={task} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="text-sm font-semibold">{task}</p>
                        <p className="text-xs text-slate-500">Assigned to Jordan Hassan</p>
                      </div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">
                        {priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-[#071426] p-6 text-white shadow">
                <h3 className="font-bold text-amber-400">Enterprise Pulse</h3>
                <p className="mt-3 text-sm text-slate-300">
                  HIEOS is operating in foundation mode. Core registers,
                  records, and workflow modules are pending implementation.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}