import { publicationSeries, BookOpen } from "@/data/governanceLibrary";

export default function PublicationSeriesGrid() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Publication Series</h2>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Controlled Categories
        </span>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-4">
        {publicationSeries.map(([title, count, Icon]) => {
          const IconComponent = Icon as typeof BookOpen;

          return (
            <div
              key={title as string}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:border-amber-400 hover:bg-amber-50"
            >
              <IconComponent className="mx-auto mb-3 text-amber-500" size={26} />
              <p className="text-xs font-bold uppercase tracking-wide">
                {title as string}
              </p>
              <p className="mt-1 text-xs text-slate-500">{count as string}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}