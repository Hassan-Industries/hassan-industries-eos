import { Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import ServiceRequestIntakeClient from "./ServiceRequestIntakeClient";

export default function NewServiceRequestPage() {
  return (
    <div className="min-h-screen bg-[#edf3f8] text-[#050816]">
      <Sidebar />

      <div className="min-h-screen min-w-0 lg:pl-[280px]">
        <Topbar />

        <Suspense
          fallback={
            <main className="w-full min-w-0 overflow-x-hidden px-4 py-4 sm:px-5 lg:px-6">
              <section className="rounded-xl border border-[#d8e1ea] bg-white p-6 shadow-sm">
                <p className="text-sm font-black text-[#62708a]">
                  Loading service request intake...
                </p>
              </section>
            </main>
          }
        >
          <ServiceRequestIntakeClient />
        </Suspense>
      </div>
    </div>
  );
}