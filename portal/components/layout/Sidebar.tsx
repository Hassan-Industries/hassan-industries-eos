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

type SidebarProps = {
  shellOwner?: "root" | "page";
};

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Governance Library",
    href: "/governance-library",
    icon: BookOpen,
  },
  {
    label: "Administration",
    href: "/administration",
    icon: Settings,
  },
  {
    label: "Treasury",
    href: "/treasury",
    icon: Landmark,
  },
  {
    label: "Legal",
    href: "/legal",
    icon: Scale,
  },
  {
    label: "Tax",
    href: "/tax",
    icon: Globe2,
  },
  {
    label: "Corporate Records",
    href: "/corporate-records",
    icon: FolderArchive,
  },
  {
    label: "Correspondence",
    href: "/correspondence",
    icon: Mail,
  },
  {
    label: "Technology",
    href: "/technology",
    icon: ShieldCheck,
  },
  {
    label: "Entity Management",
    href: "/entity-management",
    icon: Building2,
  },
  {
    label: "Publications",
    href: "/governance-library/publications",
    icon: FileText,
  },
  {
    label: "Resolutions",
    href: "/governance-library/resolutions",
    icon: Gavel,
  },
  {
    label: "Service Requests",
    href: "/service-requests",
    icon: Headphones,
  },
  {
    label: "Implementation Center",
    href: "/implementation-center",
    icon: ClipboardList,
  },
];

function routeMatches(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getActiveHref(pathname: string) {
  const matches = navItems.filter((item) => routeMatches(pathname, item.href));

  if (matches.length === 0) {
    return "";
  }

  return matches.sort((a, b) => b.href.length - a.href.length)[0].href;
}

export default function Sidebar({ shellOwner = "page" }: SidebarProps) {
  const pathname = usePathname() || "/";

  if (shellOwner !== "root") {
    return null;
  }

  const activeHref = getActiveHref(pathname);

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[280px] border-r border-[#1d3048] bg-[#071426] text-white shadow-xl lg:flex lg:flex-col">
      <div className="border-b border-[#1d3048] px-5 py-8">
        <Link href="/" className="block">
          <p className="text-2xl font-black uppercase leading-tight tracking-[0.06em] text-[#ffbf00]">
            Hassan
            <br />
            Industries
          </p>

          <p className="mt-4 text-[13px] font-black uppercase leading-6 tracking-[0.35em] text-white">
            Enterprise
            <br />
            Operating System
          </p>
        </Link>
      </div>

      <nav className="hieos-sidebar-scroll flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === activeHref;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex h-12 items-center gap-3 rounded-lg px-4 text-sm font-black transition",
                  active
                    ? "bg-[#ffbf00] text-[#050816] shadow-sm"
                    : "text-white hover:bg-[#13243a] hover:text-white",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-5 w-5 shrink-0",
                    active ? "text-[#050816]" : "text-white",
                  ].join(" ")}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-[#1d3048] px-5 py-5">
        <p className="text-xs font-black text-[#ffbf00]">
          Hassan Industries
        </p>
        <p className="mt-1 text-xs font-semibold text-[#b8c7d9]">
          Building Generations of Legacy
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#475569] bg-[#111827] text-sm font-black text-white">
        N
      </div>
    </aside>
  );
}