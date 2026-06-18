import { eglStats, BookOpen } from "@/data/governanceLibrary";

export default function EGLStats() {
  return (
    <div className="mt-6 grid grid-cols-5 gap-4">
      {eglStats.map(([label, value, Icon]) => {
        const IconComponent = Icon as typeof BookOpen;

        return (
          <div key={label as string} className="rounded-xl bg-white p-5 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold">{value}</p>
              </div>
              <IconComponent className="text-amber-500" size={30} />
            </div>
          </div>
        );
      })}
    </div>
  );
}