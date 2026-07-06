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
  /**
   * Only the root app shell should render the permanent sidebar.
   * Legacy page-level imports without shellOwner will safely render nothing.
   */
  shellOwner?: "root" | "page";
};

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  matcher: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    matcher: (pathname) => pathname === "/",
  },
  {
    label: "Governance Library",
    href: "/governance-library",
    icon: BookOpen,
    matcher: (pathname) =>
      pathname === "/governance-library" ||
      pathname === "/governance-library/registers" ||
      pathname === "/governance-library/forms" ||
      pathname === "/governance-library/templates" ||
      pathname === "/governance-library/certified-copies" ||
      pathname === "/governance-library/pending-review" ||
      pathname === "/governance-library/pending-execution" ||
      pathname === "/governance-library/active-publications" ||
      pathname === "/governance-library/active-policies",
  },
  {
    label: "Administration",
    href: "/administration",
    icon: Settings,
    matcher: (pathname) => pathname === "/administration",
  },
  {
    label: "Treasury",
    href: "/treasury",
    icon: Landmark,
    matcher: (pathname) => pathname === "/treasury",
  },
  {
    label: "Legal",
    href: "/legal",
    icon: Scale,
    matcher: (pathname) => pathname === "/legal",
  },
  {
    label: "Tax",
    href: "/tax",
    icon: Globe2,
    matcher: (pathname) => pathname === "/tax",
  },
  {
    label: "Corporate Records",
    href: "/corporate-records",
    icon: FolderArchive,
    matcher: (pathname) => pathname === "/corporate-records",
  },
  {
    label: "Correspondence",
    href: "/correspondence",
    icon: Mail,
    matcher: (pathname) => pathname === "/correspondence",
  },
  {
    label: "Technology",
    href: "/technology",
    icon: ShieldCheck,
    matcher: (pathname) => pathname === "/technology",
  },
  {
    label: "Entity Management",
    href: "/entity-management",
    icon: Building2,
    matcher: (pathname) => pathname === "/entity-management",
  },
  {
    label: "Publications",
    href: "/governance-library/publications",
    icon: FileText,
    matcher: (pathname) => pathname.startsWith("/governance-library/publications"),
  },
  {
    label: "Resolutions",
    href: "/governance-library/registers/resolutions",
    icon: Gavel,
    matcher: (pathname) =>
      pathname === "/resolutions" ||
      pathname.startsWith("/governance-library/registers/resolutions"),
  },
  {
    label: "Service Requests",
    href: "/service-requests",
    icon: Headphones,
    matcher: (pathname) => pathname.startsWith("/service-requests"),
  },
  {
    label: "Implementation Center",
    href: "/implementation-center",
    icon: ClipboardList,
    matcher: (pathname) => pathname === "/implementation-center",
  },
];

export default function Sidebar({ shellOwner = "page" }: SidebarProps) {
  const pathname = usePathname();

  if (shellOwner !== "root") {
    return null;
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-[#203044] bg-[#071426] text-white shadow-xl lg:flex">
      <div className="border-b border-[#203044] px-6 py-8">
        <Link href="/" className="block">
          <p className="text-2xl font-black uppercase tracking-[0.08em] text-[#ffbf00]">
            Hassan
            <br />
            Industries
          </p>
          <p className="mt-5 text-[13px] font-black uppercase tracking-[0.42em] text-white">
            Enterprise
            <br />
            Operating System
          </p>
        </Link>
      </div>

      <nav className="eoc-sidebar-scroll flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.matcher(pathname);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex h-12 items-center gap-3 rounded-lg px-4 text-sm font-black transition",
                  active
                    ? "bg-[#ffbf00] text-[#050816] shadow-sm"
                    : "text-white hover:bg-[#142338] hover:text-white",
                ].join(" ")}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-[#203044] px-6 py-5">
        <p className="text-xs font-black text-[#ffbf00]">Hassan Industries</p>
        <p className="text-xs font-semibold text-[#9db0c9]">
          Building Generations of Legacy
        </p>
      </div>
    </aside>
  );
}