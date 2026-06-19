import {
  BadgeCheck,
  Building2,
  FileText,
  FolderOpen,
  Gavel,
  Landmark,
  Mail,
  MonitorCog,
  ReceiptText,
} from "lucide-react";

const publicationSeries = [
  {
    label: "Governance",
    count: "27 Publications",
    icon: BadgeCheck,
  },
  {
    label: "Administration",
    count: "41 Publications",
    icon: MonitorCog,
  },
  {
    label: "Treasury",
    count: "33 Publications",
    icon: Landmark,
  },
  {
    label: "Legal",
    count: "29 Publications",
    icon: Gavel,
  },
  {
    label: "Tax",
    count: "21 Publications",
    icon: ReceiptText,
  },
  {
    label: "Records",
    count: "18 Publications",
    icon: FolderOpen,
  },
  {
    label: "Correspondence",
    count: "17 Publications",
    icon: Mail,
  },
  {
    label: "Technology",
    count: "15 Publications",
    icon: Building2,
  },
  {
    label: "Resolutions",
    count: "12 Publications",
    icon: Gavel,
  },
  {
    label: "Forms & Templates",
    count: "28 Publications",
    icon: FileText,
  },
];

export default function PublicationSeriesGrid() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-base font-extrabold text-slate-950">
          Publication Series
        </h2>

        <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-slate-400">
          Controlled Categories
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        {publicationSeries.map((series) => {
          const Icon = series.icon;

          return (
            <button
              key={series.label}
              type="button"
              className="flex min-h-[82px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-center transition hover:border-amber-400 hover:bg-amber-50"
            >
              <Icon className="h-5 w-5 text-amber-500" />

              <p className="mt-2 text-[11px] font-extrabold uppercase text-slate-950">
                {series.label}
              </p>

              <p className="mt-1 text-[10px] text-slate-500">
                {series.count}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}