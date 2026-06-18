import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import ModuleShell from "@/components/layout/ModuleShell";

export default function GovernanceLibraryPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />
        <section className="flex-1">
          <Topbar />
          <div className="p-8">
            <ModuleShell
              title="Publications Register"
              subtitle="Controlled publication system for Hassan Industries governance, treasury, administration, records, legal, tax, and enterprise management publications."
            />
          </div>
        </section>
      </div>
    </main>
  );
}