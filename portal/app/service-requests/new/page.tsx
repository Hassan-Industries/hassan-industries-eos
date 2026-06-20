import { Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import ServiceRequestIntakeClient from "./ServiceRequestIntakeClient";

function ServiceRequestIntakeLoading() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-black text-slate-500">
        Loading service request intake...
      </p>
    </section>
  );
}

export default function NewServiceRequestPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-slate-100">
        <Topbar />

        <main className="flex-1 overflow-x-hidden bg-slate-100 p-4 sm:p-5 lg:p-6">
          <Suspense fallback={<ServiceRequestIntakeLoading />}>
            <ServiceRequestIntakeClient />
          </Suspense>
        </main>
      </div>
    </div>
  );
}