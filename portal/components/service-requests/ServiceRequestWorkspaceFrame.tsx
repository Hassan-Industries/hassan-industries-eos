import type { ReactNode } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

type ServiceRequestWorkspaceFrameProps = {
  children: ReactNode;
};

export default function ServiceRequestWorkspaceFrame({
  children,
}: ServiceRequestWorkspaceFrameProps) {
  return (
    <div className="min-h-screen bg-[#e8eef5] text-[#050816]">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}