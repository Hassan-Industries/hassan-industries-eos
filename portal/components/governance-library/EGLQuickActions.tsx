import { quickActions } from "@/data/governanceLibrary";

export default function EGLQuickActions() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-lg font-bold">Quick Actions</h2>

      <div className="mt-4 space-y-2">
        {quickActions.map((action) => (
          <button
            key={action}
            className="w-full rounded-lg border px-4 py-3 text-left text-sm hover:border-amber-400 hover:bg-amber-50"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}