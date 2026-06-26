import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

type EOCPageShellProps = {
  children: ReactNode;
  contentClassName?: string;
};

export default function EOCPageShell({
  children,
  contentClassName = "",
}: EOCPageShellProps) {
  return (
    <div className="min-h-screen bg-[#e8eef4] text-[#050816]">
      <Sidebar />

      <div className="min-h-screen lg:pl-[280px]">
        <Topbar />

        <main className={`w-full px-4 py-5 sm:px-6 lg:px-8 ${contentClassName}`}>
          <div className="mx-auto w-full max-w-[1720px]">{children}</div>
        </main>
      </div>
    </div>
  );
}