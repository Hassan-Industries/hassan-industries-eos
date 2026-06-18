import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import EGLCommandRibbon from "@/components/governance-library/EGLCommandRibbon";
import EGLStats from "@/components/governance-library/EGLStats";
import PublicationSeriesGrid from "@/components/governance-library/PublicationSeriesGrid";
import RecentlyUpdatedPublications from "@/components/governance-library/RecentlyUpdatedPublications";
import PublicationDetailsPreview from "@/components/governance-library/PublicationDetailsPreview";
import EGLQuickActions from "@/components/governance-library/EGLQuickActions";
import EGLKnowledgePanels from "@/components/governance-library/EGLKnowledgePanels";

export default function GovernanceLibraryPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Topbar />

          <div className="p-8">
            <EGLCommandRibbon />
            <EGLStats />

            <div className="mt-6 grid grid-cols-12 gap-6">
              <section className="col-span-8 space-y-6">
                <PublicationSeriesGrid />
                <RecentlyUpdatedPublications />
              </section>

              <aside className="col-span-4 space-y-6">
                <PublicationDetailsPreview />
                <EGLQuickActions />
              </aside>
            </div>

            <EGLKnowledgePanels />
          </div>
        </section>
      </div>
    </main>
  );
}