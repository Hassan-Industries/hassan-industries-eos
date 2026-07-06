import { Suspense } from "react";
import ServiceRequestIntakeClient from "./ServiceRequestIntakeClient";

function IntakeFallback() {
  return (
    <div className="mx-auto max-w-[1680px] rounded-xl border border-[#d8e1ea] bg-white p-8 shadow-sm">
      <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#94a3b8]">
        Service Request Intake
      </p>
      <h1 className="mt-3 text-3xl font-black text-[#050816]">
        Loading Intake Workspace
      </h1>
      <p className="mt-3 text-sm font-semibold text-[#33445c]">
        Preparing frontend intake controls.
      </p>
    </div>
  );
}

export default function NewServiceRequestPage() {
  return (
    <Suspense fallback={<IntakeFallback />}>
      <ServiceRequestIntakeClient />
    </Suspense>
  );
}