import { Suspense } from "react";

import ServiceRequestWorkspaceFrame from "@/components/service-requests/ServiceRequestWorkspaceFrame";

import ServiceRequestIntakeClient from "./ServiceRequestIntakeClient";

function ServiceRequestIntakeLoading() {
  return (
    <section className="rounded-xl border border-[#d8e1ea] bg-white p-8 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-[#94a3b8]">
        Loading Service Request Intake
      </p>
    </section>
  );
}

export default function NewServiceRequestPage() {
  return (
    <ServiceRequestWorkspaceFrame>
      <Suspense fallback={<ServiceRequestIntakeLoading />}>
        <ServiceRequestIntakeClient />
      </Suspense>
    </ServiceRequestWorkspaceFrame>
  );
}