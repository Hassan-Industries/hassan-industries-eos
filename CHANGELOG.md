# CHANGELOG

All notable changes to the Hassan Industries Enterprise Operating System (HIEOS) are documented in this file.

This project follows enterprise change management principles.
---
## UNRELEASED: ##
---

## HIEOS-IMP-005
### Enterprise Routing & Module Shells

Status:
Completed

Summary

Established the enterprise routing architecture and modular page framework for HIEOS.

Changes

- Added application routing for enterprise operating divisions.
- Created reusable ModuleShell component.
- Configured dashboard as both `/` and `/dashboard`.
- Created foundational module pages for:
  - Governance Library
  - Administration
  - Treasury
  - Legal
  - Tax
  - Corporate Records
  - Correspondence
  - Technology
  - Entity Management
  - Publications
  - Resolution Register
  - Service Requests
  - Implementation Center
  - Change Management
  - User Management
  - Audit & Compliance
  - Settings
- Standardized future module architecture.

Impact

Transforms HIEOS from a dashboard prototype into a modular enterprise application.

---

## HIEOS-IMP-004
### Enterprise Dashboard Analytics

Status:
Completed

Summary

Expanded the Enterprise Dashboard with operational analytics and enterprise overview components.

Changes

- Added Enterprise Overview analytics.
- Added Quick Access panel.
- Added Notifications panel.
- Added Tasks panel.
- Added Enterprise Pulse.
- Improved dashboard layout.
- Implemented chart visualization.

Impact

Introduced executive-level operational visibility for enterprise leadership.

---

## HIEOS-IMP-003
### Enterprise Dashboard Foundation

Status:
Completed

Summary

Developed the initial Enterprise Operations Center dashboard.

Changes

- Created executive dashboard.
- Added enterprise sidebar.
- Added enterprise header.
- Added KPI cards.
- Added operational status panel.
- Added recent activity.
- Established Hassan Industries branding.

Impact

Created the first operational interface for HIEOS.

---

## HIEOS-IMP-002
### Enterprise Security & Repository Governance

Status:
Completed

Summary

Established enterprise repository governance and security controls.

Changes

- Configured Git branching strategy.
- Enabled branch protection.
- Configured Dependabot.
- Enabled Secret Scanning.
- Enabled CodeQL.
- Configured repository security.

Impact

Established secure enterprise software governance.

---

## HIEOS-IMP-001
### Enterprise Repository Foundation

Status:
Completed

Summary

Initialized the Hassan Industries Enterprise Operating System repository.

Changes

- Repository created.
- Documentation structure created.
- Enterprise folders established.
- Governance documentation added.
- README completed.
- Initial Git configuration completed.

Impact

Created the foundation for enterprise software development.

## HIEOS-IMP-006C
### Enterprise Governance Library Component Architecture

Status:
Completed

Summary

Refactored the Enterprise Governance Library into reusable components and centralized static data.

Changes

- Added `governanceLibrary.ts` data source.
- Added modular EGL components.
- Simplified `/governance-library` page.
- Prepared EGL for blueprint visual fidelity work.

Impact

Creates a maintainable architecture for future Governance Library development.

## HIEOS-IMP-006D-1
### Enterprise Governance Library Layout Framework

**Status:** Completed

Implemented the foundational layout architecture for the Enterprise Governance Library.

#### Deliverables

- Added Enterprise Command Ribbon
- Standardized Governance Library layout
- Implemented operational KPI region
- Added publication workspace architecture
- Added Knowledge Panels
- Added Lifecycle Flow
- Added Key Principles
- Added Planned Module Pages

#### Result

Established the permanent HIEOS layout framework that will serve as the foundation for future blueprint fidelity enhancements.

## HIEOS-IMP-006D-2
### EGL Blueprint Alignment Cleanup

**Status:** Completed

Aligned the Enterprise Governance Library interface more closely with the approved blueprint.

#### Deliverables

- Added Forms & Templates publication series.
- Updated Publication Series to a 5 × 2 grid.
- Expanded Document Profile fields.
- Renamed Quick Actions to Command Actions.
- Added Relationship Panel placeholder.
- Redesigned Lifecycle Flow as enterprise status nodes.
- Added icons to Planned Module Pages.
- Refined page layout toward executive operations styling.

#### Result

Improved visual fidelity and operational structure of the Enterprise Governance Library while preserving the current static-data foundation.

## HIEOS-IMP-006D-3
### EGL Executive Workspace Refinement

**Status:** Completed

Refined the Enterprise Governance Library executive workspace.

#### Deliverables

- Compact Document Profile layout
- Added expandable document intelligence section
- Improved Lifecycle Flow layout
- Cleaned Relationship Panel
- Tightened lower knowledge panel alignment

#### Result

Improved production usability and visual alignment with the approved EGL blueprint.

## HIEOS-IMP-006D-4
### EGL Blueprint Branding & Command Polish

**Status:** Completed

Refined the Enterprise Governance Library command interface.

#### Deliverables

- Improved Command Ribbon branding.
- Added blueprint-style search bar.
- Added enterprise footer strip.
- Strengthened operational mode presentation.
- Continued visual alignment with the approved EGL blueprint.

#### Result

The Enterprise Governance Library now presents more like a formal enterprise command module within HIEOS.

## HIEOS-IMP-006D-5
### EGL Workspace Interaction Foundation

**Status:** Completed

Added initial front-end interaction to the Enterprise Governance Library workspace.

#### Deliverables

- Added typed publication records.
- Added selectable publication table rows.
- Added active row styling.
- Connected Document Profile to selected publication data.
- Preserved static TypeScript data foundation.

#### Result

The Enterprise Governance Library now behaves more like an operational workspace instead of a static visual interface.

## HIEOS-IMP-006E Institutional Panel Layout

**Status:** Completed

### Changed

- Moved Document Status Codes, Key Principles, and Relationships beneath the publications and quick actions area.
- Repositioned Lifecycle Flow and Planned Module Pages into a wider bottom row.
- Improved table layout handling to prevent word overlap and column crowding.
- Reduced overly aggressive heading/font treatment outside the Document Profile.
- Improved lower-page institutional dashboard structure.

### Preserved

- Preserved Document Profile design.
- Preserved publication search behavior.
- Preserved selected-publication behavior.
- Preserved static frontend-only implementation scope.


## HIEOS-IMP-006F
### EGL Module Route Shells & Navigation Wiring

Status:
Completed

Summary

Created frontend route shells for Enterprise Governance Library module pages and connected visible dashboard navigation to those module routes.

Changes

- Added shared EGL module shell component for consistent subpage layout.
- Added centralized EGL module configuration data.
- Created Publications, Resolutions, Forms, Templates, Certified Copies, Pending Review, and Pending Execution routes.
- Connected Planned Module Pages links to actual frontend routes.
- Connected View All Publications navigation to the Publications route.
- Connected Quick Actions to relevant EGL module routes.
- Preserved static frontend-only implementation scope.

Impact

Established the frontend route structure needed before backend registry, document record, workflow, storage, and Microsoft 365 integrations.

## HIEOS-IMP-006G
### EGL Record Detail Page Shell

Status:
Completed

Summary

Created a frontend record detail page shell for Enterprise Governance Library publication records and connected the Document Profile "View Full Record" action to the new dynamic route.

Changes

- Added EGL record detail shell component.
- Created dynamic publication record route at `/governance-library/publications/[documentId]`.
- Connected Document Profile "View Full Record" action to the record detail page.
- Added frontend-only sections for record authority, lifecycle metadata, relationships, record actions, file preview, and backend readiness.
- Preserved the restored EGL dashboard layout and selected-publication behavior.

Impact

Established the frontend destination for controlled publication record review before backend registry, file viewing, revision history, upload, download, workflow, and Microsoft 365 integrations are introduced.

## HIEOS-IMP-006H
### EGL Record Action Controls

Status:
Completed

Summary

Added frontend record action controls for Enterprise Governance Library publication records and updated the Document Profile View Record action to open the record detail route in a new browser tab.

Changes

- Added reusable EGL record action controls component.
- Updated Document Profile actions to use shared record controls.
- Changed View Record to open in a new browser tab.
- Added frontend-only controls for copying document ID, downloading copy, uploading replacement, creating certified copy, viewing revision history, and requesting review.
- Updated the EGL Record Detail shell to display the new action controls.
- Reconfirmed the dynamic publication record route for controlled publication records.

Impact

Established the frontend action-control layer needed before backend file handling, workflow routing, revision history, certified-copy processing, upload/download services, and Microsoft 365 or SharePoint integrations are introduced.

## HIEOS-IMP-006I
### EGL File Preview Placeholder & Document Viewer Shell

Status:
Completed

Summary

Created a frontend document viewer shell for Enterprise Governance Library publication records and stabilized the record and viewer routes so they can be tested without uploaded document files.

Changes

- Added EGL document viewer shell component.
- Created dynamic viewer route at `/governance-library/publications/[documentId]/viewer`.
- Stabilized the dynamic publication record route at `/governance-library/publications/[documentId]`.
- Added centralized publication record lookup helpers.
- Allowed frontend record shells to load from static publication metadata before backend files exist.
- Connected View Publication File action to the viewer shell.
- Updated the record detail File Preview card to open the viewer shell.
- Updated route behavior so missing uploaded files do not cause record detail pages to 404.
- Preserved EGL dashboard, module route, and record detail behavior.

Impact

Established a testable frontend document viewing workspace before PDF preview, Office document preview, upload/download handling, access controls, Microsoft 365, SharePoint, and backend file storage integrations are introduced.

## HIEOS-IMP-006J
### EGL Upload & Certification Workflow Shells

Status:
Completed

Summary

Created frontend workflow shells for Enterprise Governance Library upload replacement and certified-copy actions.

Changes

- Added shared EGL workflow shell component.
- Created Upload Replacement route for controlled publication records.
- Created Certified Copy route for controlled publication records.
- Added route helpers for upload and certification workflows.
- Connected Record Detail actions to workflow shell routes.
- Added frontend-only workflow steps, control checklists, workspace placeholders, control notes, and training notes.
- Preserved EGL dashboard, record detail, viewer, and route reliability behavior.

Impact

Established the frontend workflow structure needed before real file upload processing, certified-copy generation, approval routing, backend persistence, audit trails, Microsoft 365 integration, and SharePoint storage are introduced.

## HIEOS-IMP-006K
### EGL Revision History & Review Request Shells

Status:
Completed

Summary

Created frontend shells for Enterprise Governance Library revision history and review request actions.

Changes

- Added EGL revision history shell component.
- Added EGL review request shell component.
- Created Revision History route for controlled publication records.
- Created Request Review route for controlled publication records.
- Added route helpers for revision history and review request workflows.
- Connected Record Detail actions to the new shell routes.
- Added frontend-only lifecycle timeline, review steps, review reasons, control notes, and training notes.
- Preserved EGL dashboard, record detail, viewer, upload replacement, and certified copy behavior.

Impact

Established the frontend lifecycle and review-routing structure needed before backend revision history, reviewer assignment, comments, workflow queues, notifications, approval decisions, audit trails, Microsoft 365 version history, and SharePoint versioning are introduced.

## HIEOS-IMP-006L
### EGL Publications Registry Full List & Detail Routing

Status:
Completed

Summary

Upgraded the Enterprise Governance Library Publications route into a functional frontend registry list with search, filters, selected record preview, and direct routing into publication record workflows.

Changes

- Added EGL publications registry shell component.
- Replaced Publications route shell with full frontend registry page.
- Added publication search controls.
- Added status, series, and classification filters.
- Added frontend registry metrics.
- Added full publications table using static publication metadata.
- Added selected record preview panel.
- Added direct routing to record detail and document viewer.
- Added routing to upload replacement, certified copy, revision history, and review request shells.
- Preserved EGL dashboard, record detail, viewer, upload, certification, revision, and review behavior.

Impact

Established the operational Publications Registry workspace needed before backend publication records, database pagination, role permissions, workflow queues, upload processing, certified-copy issuance, Microsoft 365, and SharePoint integrations are introduced.

## HIEOS-IMP-006M
### EGL Selection State & Publication Intake Shell

Status:
Completed

Summary

Added a frontend Create Publication intake shell and corrected EGL dashboard and Publications Registry selection behavior so document profiles and selected record previews open only after intentional record selection.

Changes

- Added shared EGL selection placeholder component.
- Added Create New Publication frontend intake shell.
- Created `/governance-library/publications/new` route.
- Updated EGL Quick Actions to route Create New Publication to the intake shell.
- Updated EGL dashboard to avoid opening a default document profile.
- Updated Publications Registry to avoid opening a default selected record.
- Added institutional no-selection guidance panels.
- Preserved EGL dashboard, publications registry, record detail, viewer, upload replacement, certified copy, revision history, and request review behavior.

Impact

Improved EGL operating discipline by requiring intentional record selection before metadata, authority, lifecycle, and action controls are displayed. Established the frontend intake structure needed before backend publication creation, document numbering, file upload, approval routing, Microsoft 365, and SharePoint integrations are introduced.

## HIEOS-IMP-006N
### EGL Resolutions Registry & Publication Intake Access

Status:
Completed

Summary

Added a frontend Resolutions Registry and resolution record detail shell while also adding Create New Publication access directly inside the Publications Registry.

Changes

- Added EGL resolution records data layer.
- Added resolution record routing helpers.
- Added Resolutions Registry frontend shell.
- Added no-default-selection behavior for the Resolutions Registry.
- Added selected resolution preview panel.
- Added resolution detail page shell.
- Created `/governance-library/resolutions/[resolutionId]` route.
- Updated `/governance-library/resolutions` to render the registry list.
- Added Create New Publication action inside the Publications Registry header.
- Preserved existing EGL publication record, viewer, upload, certification, revision history, request review, and publication intake routes.

Impact

Expanded the Enterprise Governance Library from publication control into formal governance decision tracking by introducing a controlled frontend registry for resolutions. Improved publication intake access by placing Create New Publication directly inside the Publications Registry where applicable users would reasonably expect it.


---

## HIEOS-IMP-006O
### EGL Forms & Templates Registry Shells

Status:
Completed

Summary

Added frontend registry shells for Enterprise Governance Library forms and templates.

Changes

- Added static frontend records for EGL forms and templates.
- Added controlled Forms Registry shell.
- Added controlled Templates Registry shell.
- Added no-default-selection registry behavior.
- Added selected record preview panels for forms and templates.
- Added search, owner, status, and series filters.
- Added frontend-safe action controls that do not route to missing pages.
- Added copy ID support for form and template records.
- Replaced forms and templates route pages with institutional EGL registry screens.

Impact

Expanded the EGL frontend foundation beyond publications and resolutions by preparing controlled registry workspaces for future forms, templates, document generation, workflow routing, training manuals, employee use, and executive review.


## HIEOS-IMP-006P
### EGL Certified Copies Registry Shell

Status:
Completed

Summary:
Added a controlled frontend registry shell for Enterprise Governance Library certified copy records.

Changes:
- Replaced the certified copies route with an institutional registry layout.
- Added static certified copy records for publications and resolutions.
- Added intentional row selection before opening certified copy metadata.
- Added selected certified copy preview panel.
- Added frontend copy-ID control.
- Added source record and source viewer navigation controls.
- Added certified copy backend readiness and training notes.

Impact:
Establishes the controlled certified-copy registry workspace needed before backend certification logs, document storage, copy generation, access controls, and permanent recordkeeping are added.

## HIEOS-IMP-006P-1

### EGL Certified Copies Navigation Stabilization

Status: Completed

Summary:
Stabilized Enterprise Governance Library certified-copy navigation so the certified copies registry, certified-copy intake shell, and certification history shell have clear, testable frontend routes.

Changes:
- Updated the EGL Certified Copies stat card to route to `/governance-library/certified-copies`.
- Updated the EGL Quick Action "Create Certified Copy" to route to `/governance-library/certified-copies/new`.
- Added a registry-level Create Certified Copy button to the Certified Copies Registry.
- Added `/governance-library/certified-copies/new` as the certified-copy intake shell.
- Added `/governance-library/certified-copies/history` as the certification history shell.
- Updated selected certified-copy action links to open source records, source files, and certification history in a new browser tab.
- Repositioned the Certified Copies Registry count and Create Certified Copy action to the right side of the registry header for consistency with other EGL registries.
- Preserved existing record-specific certified-copy workflow routes under `/governance-library/publications/[documentId]/certified-copy`.

Impact:
Improves EGL navigation consistency and separates certified-copy registry review from certified-copy creation, while preserving frontend-only scope before backend certification generation, source-file handling, audit history, and Microsoft 365 / SharePoint integrations are introduced.

### HIEOS-IMP-006Q: EGL Registers Hub & Dashboard Stat Navigation

- Added a dedicated EGL Registers Hub at `/governance-library/registers`.
- Updated EGL Quick Actions so `View Registers` opens the new registers hub.
- Updated `Create Certified Copy` quick action to open the certified-copy creation shell.
- Converted EGL dashboard stat cards into navigable dashboard controls.
- Added direct navigation to Publications, Pending Review, Pending Execution, Certified Copies, and Active Policies.
- Preserved frontend-only backend readiness language for later workflow, storage, authority, approval, and recordkeeping integration.

## HIEOS-IMP-006R
### EGL Resolution Intake Shell
**Status:** Completed

#### Summary
Added a frontend-only resolution intake shell and aligned the EGL New Resolution quick action with its named task.

#### Deliverables
- Created `/governance-library/resolutions/new`.
- Updated the EGL Quick Actions panel so New Resolution routes to the resolution intake shell.
- Preserved the existing Resolutions Registry route.
- Preserved existing resolution detail routing.
- Preserved frontend-only implementation scope.

#### Result
The EGL now has a dedicated resolution creation/intake shell instead of routing the New Resolution quick action back to the Resolutions Registry.


## HIEOS-IMP-006S
### EGL Upload Document Intake Shell
**Status:** Completed

#### Summary
Added a frontend-only EGL upload document intake shell and aligned the Upload Document quick action with its named task.

#### Deliverables
- Created `/governance-library/publications/upload`.
- Updated the EGL Quick Actions panel so Upload Document routes to the upload intake shell.
- Preserved the existing Publications Registry route.
- Preserved Create New Publication, New Resolution, Create Certified Copy, Forms & Templates, and View Registers quick-action routing.
- Preserved frontend-only implementation scope.

#### Result
The EGL now has a dedicated upload intake shell instead of routing the Upload Document quick action back to the Publications Registry.

## HIEOS-IMP-006T
### EGL Creation Route Stabilization
**Status:** Completed

#### Summary
Added explicit frontend creation routes for Upload Document and New Resolution so creation actions no longer resolve into dynamic record detail shells.

#### Deliverables
- Created `/governance-library/publications/upload`.
- Created `/governance-library/resolutions/new`.
- Updated EGL Quick Actions so Upload Document routes to the upload intake shell.
- Updated EGL Quick Actions so New Resolution routes to the resolution intake shell.
- Preserved Create New Publication, Create Certified Copy, Forms & Templates, and View Registers routing.
- Preserved frontend-only implementation scope.

#### Result
EGL creation actions now route to intentional static intake shells instead of being interpreted as dynamic record IDs.


## HIEOS-IMP-006U
### EGL Lint Navigation Cleanup
**Status:** Completed

#### Summary
Cleaned the EGL Dashboard recently updated publications navigation to use the Next.js `Link` component instead of an internal HTML anchor.

#### Deliverables
- Replaced internal `<a>` navigation in `RecentlyUpdatedPublications.tsx`.
- Preserved recently updated publication row selection behavior.
- Preserved selected-record highlighting.
- Preserved EGL Dashboard layout and registry navigation behavior.

#### Result
The EGL Dashboard no longer triggers the Next.js `no-html-link-for-pages` lint error for the View All Publications action.

## HIEOS-IMP-006V-1: EGL Dashboard Registry Filter Hydration

- Converted EGL dashboard stat cards into navigable routing cards.
- Routed Certified Copies, Pending Review, and Pending Execution cards to their controlled EGL registry or queue pages.
- Added query-parameter hydration to the Publications Registry.
- Publications Registry now recognizes `?status=`, `?series=`, `?classification=`, `?search=`, `?q=`, `?type=`, and `?documentType=`.
- Preserved neutral registry preview state until a user intentionally selects a record.
- No backend records, workflow submissions, storage integrations, or authentication changes were introduced.

## HIEOS-IMP-006W-1

### EGL Dashboard Command Search Routing

Status: Completed

Summary:
Converted the Enterprise Governance Library dashboard search bar into a controlled navigation command that routes users to the correct EGL registry, queue, hub, or filtered publications list.

Changes:
- Updated EGL dashboard search submission behavior.
- Routed empty searches to the Publications Registry.
- Routed publication-style searches to `/governance-library/publications?search=...`.
- Routed registry terms to the EGL Registers Hub.
- Routed forms/templates terms to the Forms & Templates Hub.
- Routed certified-copy terms to the Certified Copies Registry.
- Routed resolution terms to the Resolutions Registry.
- Routed review and execution terms to their respective queue shells.
- Routed upload/replacement terms to the Upload Document shell.
- Preserved dashboard no-default-selection behavior.
- Preserved frontend-only implementation scope.

Impact:
Improves EGL dashboard usability by making search operate as a command-navigation control instead of only filtering the recently updated publications table.


## HIEOS-IMP-007A

### Service Requests Desk Foundation

Status: Completed

Summary:
Created the frontend foundation for the HIEOS Service Requests Desk as the universal intake and routing workspace for administrative, governance, treasury, records, document-control, certified-copy, and restricted HCA review requests.

Changes:
- Replaced the placeholder `/service-requests` route with a controlled Service Requests Desk.
- Added frontend service request records with search, status filter, department filter, and selected-request preview behavior.
- Added service request metrics for open intake, pending routing, restricted review, and total request records.
- Added intentional no-default-selection behavior for request preview.
- Added copy request ID control.
- Added `/service-requests/new` as a frontend service request intake shell.
- Added intake steps, control checklist, routing standard, backend readiness, and training notes.
- Preserved frontend-only scope.

Impact:
Establishes Service Requests as the universal intake and routing desk for HIEOS before backend request submission, workflow routing, reviewer assignment, attachment handling, audit history, role permissions, and permanent recordkeeping are introduced.

## HIEOS-IMP-007B: Service Request Detail & Routing Workspace

- Added shared Service Requests data layer at `portal/data/serviceRequests.ts`.
- Rewired `portal/app/service-requests/page.tsx` to use the shared service request records.
- Added direct request detail routes at `/service-requests/[requestId]`.
- Added frontend request detail workspace with request authority, routing metadata, relationships, checklist, timeline, actions, backend readiness, and training notes.
- Added row-level open action from the Service Requests Desk to each request detail workspace.
- Preserved frontend-only implementation scope; no backend submission, authentication, assignment, upload, or approval logic was introduced.

## HIEOS-IMP-007C: Service Request Routing Queues

- Added controlled Service Request Routing Queues at `/service-requests/queues`.
- Added queue detail workspaces at `/service-requests/queues/[queueId]`.
- Expanded `portal/data/serviceRequests.ts` with routing queue records, queue ownership, access scope, routing standards, escalation paths, queue controls, and workflow stages.
- Added queue assignment metadata to service request records.
- Updated `portal/app/service-requests/page.tsx` with queue navigation and assigned queue links.
- Added direct navigation from each selected service request to its assigned queue.
- Preserved frontend-only implementation scope; no backend routing, authentication, assignment, notifications, comments, attachments, or approval logic was introduced.