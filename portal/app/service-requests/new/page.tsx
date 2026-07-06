import { Suspense } from "react";
import ServiceRequestWorkspaceFrame from "@/components/service-requests/ServiceRequestWorkspaceFrame";
import ServiceRequestIntakeClient from "./ServiceRequestIntakeClient";

function ServiceRequestIntakeLoading() {
  return (
    <ServiceRequestWorkspaceFrame>
      <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.4em] text-[#94a3b8]">
          Service Request Intake
        </p>
        <h1 className="mt-3 text-3xl font-black text-[#050816]">
          Loading Service Request Intake
        </h1>
      </section>
    </ServiceRequestWorkspaceFrame>
  );
}

export default function NewServiceRequestPage() {
  return (
    <Suspense fallback={<ServiceRequestIntakeLoading />}>
      <ServiceRequestIntakeClient />
    </Suspense>
  );
}