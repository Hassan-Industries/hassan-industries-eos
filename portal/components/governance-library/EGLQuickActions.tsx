import { quickActions } from "@/data/governanceLibrary";

export default function EGLQuickActions() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Command Actions</h2>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          HCA Controls
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {quickActions.map((action) => (
          <button
            key={action}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium hover:border-amber-400 hover:bg-amber-50"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}