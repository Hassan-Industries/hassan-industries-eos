"use client";

import { useMemo, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import EGLCommandRibbon from "@/components/governance-library/EGLCommandRibbon";
import EGLSearchBar from "@/components/governance-library/EGLSearchBar";
import EGLStats from "@/components/governance-library/EGLStats";
import PublicationSeriesGrid from "@/components/governance-library/PublicationSeriesGrid";
import RecentlyUpdatedPublications from "@/components/governance-library/RecentlyUpdatedPublications";
import PublicationDetailsPreview from "@/components/governance-library/PublicationDetailsPreview";
import EGLQuickActions from "@/components/governance-library/EGLQuickActions";
import EGLFooterStrip from "@/components/governance-library/EGLFooterStrip";
import {
  DocumentStatusCodesPanel,
  KeyPrinciplesPanel,
  LifecycleFlowPanel,
  PlannedModulePagesPanel,
  RelationshipsPanel,
} from "@/components/governance-library/EGLKnowledgePanels";
import { publications } from "@/data/governanceLibrary";
import type { PublicationRecord } from "@/data/governanceLibrary";

type SearchablePublicationRecord = PublicationRecord & {
  id?: string;
  documentId?: string;
  documentNo?: string;
  documentNumber?: string;
  title?: string;
  series?: string;
  publicationSeries?: string;
  status?: string;
  documentState?: string;
  owner?: string;
  authority?: string;
  classification?: string;
  summary?: string;
  notes?: string;
};

export default function GovernanceLibraryPage() {
 const [selectedPublication, setSelectedPublication] =
  useState<PublicationRecord | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPublications = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return publications;
    }

    return publications.filter((publication) =>
      getSearchablePublicationText(publication).includes(normalizedSearch),
    );
  }, [searchTerm]);

  function handleSearchSubmit() {
    const firstResult = filteredPublications[0];

    if (firstResult) {
      setSelectedPublication(firstResult);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-5 py-4">
          <div className="mx-auto max-w-[1500px] space-y-4">
            <EGLCommandRibbon />

            <EGLSearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onSubmit={handleSearchSubmit}
            />

            <EGLStats />

            <section className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_390px]">
              <div className="min-w-0 space-y-4">
                <PublicationSeriesGrid />

                <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_250px]">
                  <RecentlyUpdatedPublications
                    publications={filteredPublications}
                    selectedPublication={selectedPublication}
                    onSelectPublication={setSelectedPublication}
                  />

                  <EGLQuickActions />
                </section>

                <section className="grid gap-4 xl:grid-cols-[0.8fr_0.8fr_1.1fr]">
                  <DocumentStatusCodesPanel />
                  <KeyPrinciplesPanel />
                  <RelationshipsPanel />
                </section>
              </div>

              <PublicationDetailsPreview publication={selectedPublication} />
            </section>

            <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
              <LifecycleFlowPanel />
              <PlannedModulePagesPanel />
            </section>

            <EGLFooterStrip />
          </div>
        </main>
      </div>
    </div>
  );
}

function getSearchablePublicationText(publication: PublicationRecord) {
  const record = publication as SearchablePublicationRecord;

  return [
    record.id,
    record.documentId,
    record.documentNo,
    record.documentNumber,
    record.title,
    record.series,
    record.publicationSeries,
    record.status,
    record.documentState,
    record.owner,
    record.authority,
    record.classification,
    record.summary,
    record.notes,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}