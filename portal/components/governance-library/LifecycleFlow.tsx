import { lifecycleFlow } from "@/data/governanceLibrary";

export default function LifecycleFlow() {
  return (
    <div className="rounded-xl bg-[#071426] p-6 text-white shadow">
      <h2 className="font-bold text-amber-400">Lifecycle Flow</h2>
      <p className="mt-3 text-sm text-slate-300">{lifecycleFlow}</p>
    </div>
  );
}