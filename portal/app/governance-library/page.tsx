"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import EGLCommandRibbon from "@/components/governance-library/EGLCommandRibbon";
import EGLSearchBar from "@/components/governance-library/EGLSearchBar";
import EGLStats from "@/components/governance-library/EGLStats";
import PublicationSeriesGrid from "@/components/governance-library/PublicationSeriesGrid";
import RecentlyUpdatedPublications from "@/components/governance-library/RecentlyUpdatedPublications";
import PublicationDetailsPreview from "@/components/governance-library/PublicationDetailsPreview";
import EGLQuickActions from "@/components/governance-library/EGLQuickActions";
import EGLKnowledgePanels from "@/components/governance-library/EGLKnowledgePanels";
import EGLFooterStrip from "@/components/governance-library/EGLFooterStrip";
import { publications } from "@/data/governanceLibrary";
import type { PublicationRecord } from "@/data/governanceLibrary";

export default function GovernanceLibraryPage() {
  const [selectedPublication, setSelectedPublication] =
    useState<PublicationRecord>(publications[0]);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Topbar />

          <div className="p-8">
            <EGLCommandRibbon />
            <EGLSearchBar />
            <EGLStats />

            <div className="mt-6 grid grid-cols-12 gap-6">
              <section className="col-span-8 space-y-6">
                <PublicationSeriesGrid />
                <RecentlyUpdatedPublications
                  publications={publications}
                  selectedDocumentNo={selectedPublication.documentNo}
                  onSelectPublication={setSelectedPublication}
                />
              </section>

              <aside className="col-span-4 space-y-6">
                <PublicationDetailsPreview publication={selectedPublication} />
                <EGLQuickActions />
              </aside>
            </div>

            <EGLKnowledgePanels />
            <EGLFooterStrip />
          </div>
        </section>
      </div>
    </main>
  );
}