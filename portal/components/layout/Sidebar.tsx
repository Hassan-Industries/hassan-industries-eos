"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { navItems } from "@/data/dashboard";

const navHrefByLabel: Record<string, string> = {
  Dashboard: "/",
  "Governance Library": "/governance-library",
  Administration: "/administration",
  Treasury: "/treasury",
  Legal: "/legal",
  Tax: "/tax",
  "Corporate Records": "/corporate-records",
  Correspondence: "/correspondence",
  Technology: "/technology",
  "Entity Management": "/entity-management",
  Publications: "/governance-library/publications",
  Resolutions: "/governance-library/resolutions",
  "Service Requests": "/service-requests",
  "Implementation Center": "/implementation-center",
};

function isActiveNavItem(label: string, href: string, pathname: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (label === "Governance Library") {
    return pathname === "/governance-library";
  }

  if (label === "Publications") {
    return pathname.startsWith("/governance-library/publications");
  }

  if (label === "Resolutions") {
    return pathname.startsWith("/governance-library/resolutions");
  }

  if (label === "Service Requests") {
    return pathname.startsWith("/service-requests");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-slate-800 bg-[#071426] text-white lg:flex">
      <div className="border-b border-slate-800 px-5 py-7">
        <Link href="/" className="block">
          <div className="text-2xl font-black uppercase tracking-[0.08em] text-[#ffc400]">
            Hassan
            <br />
            Industries
          </div>
          <div className="mt-3 text-xs font-black uppercase tracking-[0.32em] text-white">
            Enterprise
            <br />
            Operating System
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map(([item, Icon], index) => {
          const label = String(item);
          const href = navHrefByLabel[label] ?? "/";
          const IconComponent = Icon as typeof LayoutDashboard;
          const active = isActiveNavItem(label, href, pathname);

          return (
            <Link
              key={`${label}-${index}`}
              href={href}
              className={[
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-black transition",
                active
                  ? "bg-[#ffc400] text-[#050816]"
                  : "text-white hover:bg-white/10 hover:text-[#ffc400]",
              ].join(" ")}
            >
              <IconComponent size={18} strokeWidth={2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 px-5 py-5">
        <div className="text-xs font-black text-[#ffc400]">Hassan Industries</div>
        <div className="text-xs text-slate-300">Building Generations of Legacy</div>
      </div>
    </aside>
  );
}