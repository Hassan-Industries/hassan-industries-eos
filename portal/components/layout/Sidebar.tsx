"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Building2,
  ClipboardList,
  FileText,
  FolderArchive,
  Gavel,
  Globe2,
  Headphones,
  Landmark,
  LayoutDashboard,
  Mail,
  Scale,
  Settings,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Governance Library", href: "/governance-library", icon: BookOpen },
  { label: "Administration", href: "/administration", icon: Settings },
  { label: "Treasury", href: "/treasury", icon: Landmark },
  { label: "Legal", href: "/legal", icon: Scale },
  { label: "Tax", href: "/tax", icon: Globe2 },
  { label: "Corporate Records", href: "/corporate-records", icon: FolderArchive },
  { label: "Correspondence", href: "/correspondence", icon: Mail },
  { label: "Technology", href: "/technology", icon: ShieldCheck },
  { label: "Entity Management", href: "/entity-management", icon: Building2 },
  { label: "Publications", href: "/governance-library/publications", icon: FileText },
  { label: "Resolutions", href: "/governance-library/registers/resolutions", icon: Gavel },
  { label: "Service Requests", href: "/service-requests", icon: Headphones },
  { label: "Implementation Center", href: "/implementation-center", icon: ClipboardList },
];

function isActivePath(pathname: string, item: SidebarItem) {
  if (item.href === "/") {
    return pathname === "/";
  }

  if (item.label === "Governance Library") {
    return pathname === "/governance-library";
  }

  if (item.label === "Publications") {
    return pathname.startsWith("/governance-library/publications");
  }

  if (item.label === "Resolutions") {
    return (
      pathname.startsWith("/governance-library/registers/resolutions") ||
      pathname.startsWith("/governance-library/resolutions")
    );
  }

  if (item.label === "Service Requests") {
    return pathname.startsWith("/service-requests");
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] border-r border-[#1b2a3d] bg-[#071426] text-white shadow-xl lg:flex lg:flex-col">
      <div className="border-b border-[#1b2a3d] px-5 py-8">
        <div className="text-2xl font-black uppercase leading-tight tracking-[0.08em] text-[#ffbf00]">
          Hassan
          <br />
          Industries
        </div>
        <div className="mt-5 text-xs font-black uppercase leading-5 tracking-[0.35em] text-white">
          Enterprise
          <br />
          Operating System
        </div>
      </div>

      <nav className="hide-scrollbar flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "flex h-11 items-center gap-3 rounded-lg px-4 text-sm font-black transition",
                  active
                    ? "bg-[#ffbf00] text-[#050816]"
                    : "text-white hover:bg-[#132235] hover:text-[#ffbf00]",
                ].join(" ")}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-[#1b2a3d] px-5 py-6">
        <p className="text-xs font-black text-[#ffbf00]">Hassan Industries</p>
        <p className="mt-1 text-xs text-[#b7c4d6]">Building Generations of Legacy</p>
      </div>
    </aside>
  );
}