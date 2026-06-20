import Link from "next/link";
import type { ElementType } from "react";
import {
  BookOpen,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
} from "lucide-react";

type EGLStatCard = {
  label: string;
  value: string;
  href: string;
  icon: ElementType;
};

const stats: EGLStatCard[] = [
  {
    label: "Active Publications",
    value: "241",
    href: "/governance-library/publications",
    icon: BookOpen,
  },
  {
    label: "Pending Review",
    value: "23",
    href: "/governance-library/pending-review",
    icon: Clock3,
  },
  {
    label: "Pending Execution",
    value: "17",
    href: "/governance-library/pending-execution",
    icon: ClipboardCheck,
  },
  {
    label: "Certified Copies",
    value: "89",
    href: "/governance-library/certified-copies",
    icon: FileCheck2,
  },
  {
    label: "Active Policies",
    value: "64",
    href: "/governance-library/publications?series=Administration",
    icon: FileText,
  },
];

export default function EGLStats() {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Link
            key={stat.label}
            href={stat.href}
            className="group flex min-h-[78px] items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-amber-500 hover:bg-amber-50"
          >
            <div>
              <p className="text-[11px] text-slate-500">{stat.label}</p>

              <p className="mt-1 text-[25px] font-extrabold leading-none text-slate-950">
                {stat.value}
              </p>
            </div>

            <Icon className="h-6 w-6 text-amber-500 transition group-hover:scale-105" />
          </Link>
        );
      })}
    </section>
  );
}