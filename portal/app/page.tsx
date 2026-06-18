import {
  Building2,
  FileText,
  Gavel,
  Headphones,
  ShieldCheck,
  Users,
  ClipboardList,
  FolderArchive,
  Settings,
  Bell,
  Search,
} from "lucide-react";

const navItems = [
  "Dashboard",
  "Governance Library",
  "Administration",
  "Treasury",
  "Legal",
  "Tax",
  "Corporate Records",
  "Correspondence",
  "Technology",
  "Entity Management",
  "Publications",
  "Resolutions",
  "Service Requests",
  "Implementation Center",
];

const stats = [
  { label: "Active Entities", value: "12", icon: Building2 },
  { label: "Governance Documents", value: "24", icon: FileText },
  { label: "Active Resolutions", value: "3", icon: Gavel },
  { label: "Open Requests", value: "0", icon: Headphones },
  { label: "Compliance Status", value: "98%", icon: ShieldCheck },
];

const recentActivity = [
  "HI-TRE-001 published",
  "HCP-RES-2026-001 prepared for execution",
  "Enterprise Governance Library initialized",
  "HIEOS repository foundation completed",
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
            {navItems.map((item, index) => (
              <div
                key={item}
                className={`rounded-lg px-4 py-3 text-sm ${
                  index === 0
                    ? "bg-amber-400 text-slate-950"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                {item}
              </div>
            ))}
          </nav>
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

          <div className="p-8">
            <section className="rounded-2xl bg-[#0b1d33] p-8 text-white shadow">
              <p className="text-lg text-slate-300">Welcome back,</p>
              <h2 className="mt-2 text-4xl font-bold">Jordan Hassan</h2>
              <p className="mt-3 text-slate-300">
                Managing Partner & Chief Executive Officer
              </p>
              <p className="mt-6 max-w-2xl text-lg italic text-slate-200">
                “Purpose governs. Systems empower. Legacy endures.”
              </p>
            </section>

            <section className="mt-6 grid grid-cols-5 gap-4">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-xl bg-white p-5 shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">{item.label}</p>
                        <p className="mt-2 text-3xl font-bold">{item.value}</p>
                      </div>
                      <Icon className="text-amber-500" size={32} />
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="mt-6 grid grid-cols-3 gap-6">
              <div className="col-span-2 rounded-xl bg-white p-6 shadow">
                <h3 className="text-lg font-bold">Enterprise Status</h3>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {[
                    "Governance",
                    "Treasury",
                    "Administration",
                    "Records",
                    "Technology",
                    "Compliance",
                  ].map((area) => (
                    <div
                      key={area}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <span>{area}</span>
                      <span className="text-sm font-semibold text-green-600">
                        Operational
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow">
                <h3 className="text-lg font-bold">Recent Activity</h3>
                <div className="mt-4 space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity} className="border-b pb-3 text-sm">
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-xl bg-white p-6 shadow">
              <h3 className="text-lg font-bold">Quick Actions</h3>
              <div className="mt-5 grid grid-cols-6 gap-4">
                {[
                  ["Governance Library", FolderArchive],
                  ["Entity Register", Building2],
                  ["Board Resolutions", Gavel],
                  ["Corporate Records", ClipboardList],
                  ["Service Center", Headphones],
                  ["Administration", Settings],
                ].map(([label, Icon]) => {
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
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}