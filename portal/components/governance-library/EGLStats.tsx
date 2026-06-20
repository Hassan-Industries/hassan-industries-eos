import Link from "next/link";
import type { ElementType } from "react";
import {
  BookOpen,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
} from "lucide-react";

type EGLStat = {
  label: string;
  value: string;
  icon: ElementType;
  href?: string;
};

const stats: EGLStat[] = [
  {
    label: "Active Publications",
    value: "241",
    icon: BookOpen,
  },
  {
    label: "Pending Review",
    value: "23",
    icon: Clock3,
  },
  {
    label: "Pending Execution",
    value: "17",
    icon: ClipboardCheck,
  },
  {
    label: "Certified Copies",
    value: "89",
    icon: FileCheck2,
    href: "/governance-library/certified-copies",
  },
  {
    label: "Active Policies",
    value: "64",
    icon: FileText,
  },
];

export default function EGLStats() {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        const card = (
          <div className="flex min-h-[78px] items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-amber-500 hover:bg-amber-50">
            <div>
              <p className="text-[11px] text-slate-500">{stat.label}</p>
              <p className="mt-1 text-[25px] font-extrabold leading-none text-slate-950">
                {stat.value}
              </p>
            </div>

            <Icon className="h-6 w-6 text-amber-500" />
          </div>
        );

        if (stat.href) {
          return (
            <Link
              key={stat.label}
              href={stat.href}
              aria-label={`Open ${stat.label}`}
            >
              {card}
            </Link>
          );
        }

        return <div key={stat.label}>{card}</div>;
      })}
    </section>
  );
}