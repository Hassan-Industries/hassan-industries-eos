import { tasks } from "@/data/dashboard";

export default function TasksPanel() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">My Tasks</h3>
        <span className="text-xs text-blue-700">View all</span>
      </div>

      <div className="mt-4 space-y-4">
        {tasks.map(([task, priority]) => (
          <div
            key={task}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="text-sm font-semibold">{task}</p>
              <p className="text-xs text-slate-500">
                Assigned to Jordan Hassan
              </p>
            </div>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">
              {priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}