import { Suspense } from "react";
import ServiceRequestWorkspaceFrame from "@/components/service-requests/ServiceRequestWorkspaceFrame";
import ServiceRequestIntakeClient from "./ServiceRequestIntakeClient";

export default function NewServiceRequestPage() {
  return (
    <ServiceRequestWorkspaceFrame>
      <Suspense
        fallback={
          <div className="mx-auto max-w-[1680px] rounded-xl border border-[#d8e1ea] bg-white p-6 text-sm font-black text-[#050816] shadow-sm">
            Loading service request intake workspace...
          </div>
        }
      >
        <ServiceRequestIntakeClient />
      </Suspense>
    </ServiceRequestWorkspaceFrame>
  );
}