import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import EGLHeader from "@/components/governance-library/EGLHeader";
import EGLStats from "@/components/governance-library/EGLStats";
import PublicationSeriesGrid from "@/components/governance-library/PublicationSeriesGrid";
import RecentlyUpdatedPublications from "@/components/governance-library/RecentlyUpdatedPublications";
import PublicationDetailsPreview from "@/components/governance-library/PublicationDetailsPreview";
import EGLQuickActions from "@/components/governance-library/EGLQuickActions";
import StatusCodeLegend from "@/components/governance-library/StatusCodeLegend";
import LifecycleFlow from "@/components/governance-library/LifecycleFlow";

export default function GovernanceLibraryPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Topbar />

          <div className="grid grid-cols-12 gap-6 p-8">
            <section className="col-span-9">
              <EGLHeader />
              <EGLStats />
              <PublicationSeriesGrid />
              <RecentlyUpdatedPublications />
            </section>

            <aside className="col-span-3 space-y-6">
              <PublicationDetailsPreview />
              <EGLQuickActions />
              <StatusCodeLegend />
              <LifecycleFlow />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}