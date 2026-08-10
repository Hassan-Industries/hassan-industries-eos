"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import { publications, type PublicationRecord } from "@/data/governanceLibrary";

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
  const router = useRouter();
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
    router.push(getDashboardSearchRoute(searchTerm));
  }

  return (
    <div className="mx-auto max-w-[1680px] space-y-6">
      <EGLCommandRibbon />
      <EGLSearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSubmit={handleSearchSubmit}
      />
      <EGLStats />

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="min-w-0 space-y-6">
          <PublicationSeriesGrid />

          <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <RecentlyUpdatedPublications
              publications={filteredPublications}
              selectedPublication={selectedPublication}
              setSelectedPublication={setSelectedPublication}
            />
            <EGLQuickActions />
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.8fr_0.8fr_1.1fr]">
            <DocumentStatusCodesPanel />
            <KeyPrinciplesPanel />
            <RelationshipsPanel />
          </section>
        </div>

        <PublicationDetailsPreview publication={selectedPublication} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <LifecycleFlowPanel />
        <PlannedModulePagesPanel />
      </section>

      <EGLFooterStrip />
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

function getDashboardSearchRoute(searchTerm: string) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return "/governance-library/publications";
  }

  if (
    includesAny(normalizedSearch, [
      "register",
      "registers",
      "registry hub",
      "registry",
      "controlled registers",
    ])
  ) {
    return "/governance-library/registers";
  }

  if (
    includesAny(normalizedSearch, [
      "form",
      "forms",
      "template",
      "templates",
      "forms templates",
      "forms & templates",
      "intake form",
    ])
  ) {
    return "/governance-library/forms-templates";
  }

  if (
    includesAny(normalizedSearch, [
      "certified",
      "certified copy",
      "certified copies",
      "certification",
      "copy records",
    ])
  ) {
    return "/governance-library/certified-copies";
  }

  if (
    includesAny(normalizedSearch, [
      "resolution",
      "resolutions",
      "governance decision",
      "formal action",
      "officer action",
      "board decision",
    ])
  ) {
    return "/governance-library/resolutions";
  }

  if (
    includesAny(normalizedSearch, [
      "pending review",
      "review queue",
      "review",
      "awaiting review",
    ])
  ) {
    return "/governance-library/pending-review";
  }

  if (
    includesAny(normalizedSearch, [
      "pending execution",
      "execution",
      "signature",
      "awaiting signature",
      "awaiting filing",
      "filing",
    ])
  ) {
    return "/governance-library/pending-execution";
  }

  if (
    includesAny(normalizedSearch, [
      "upload",
      "upload document",
      "replacement",
      "source file",
      "document upload",
    ])
  ) {
    return "/governance-library/publications/HI-ADM-001/upload-replacement";
  }

  return `/governance-library/publications?search=${encodeURIComponent(
    searchTerm.trim(),
  )}`;
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}