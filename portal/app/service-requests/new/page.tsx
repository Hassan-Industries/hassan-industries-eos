import { Suspense } from "react";
import ServiceRequestIntakeClient from "./ServiceRequestIntakeClient";

export default function NewServiceRequestPage() {
  return (
    <Suspense fallback={null}>
      <ServiceRequestIntakeClient />
    </Suspense>
  );
}