"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatCards from "@/components/dashboard/StatCards";
import EnterpriseOverview from "@/components/dashboard/EnterpriseOverview";
import QuickAccess from "@/components/dashboard/QuickAccess";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";
import TasksPanel from "@/components/dashboard/TasksPanel";
import EnterprisePulse from "@/components/dashboard/EnterprisePulse";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1">
          <Topbar />

          <div className="grid grid-cols-12 gap-6 p-8">
            <section className="col-span-9">
              <WelcomeCard />
              <StatCards />
              <EnterpriseOverview />
              <QuickAccess />
            </section>

            <aside className="col-span-3 space-y-6">
              <NotificationsPanel />
              <TasksPanel />
              <EnterprisePulse />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}