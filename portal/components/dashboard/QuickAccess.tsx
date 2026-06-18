import { quickActions } from "@/data/dashboard";
import { FolderArchive } from "lucide-react";

export default function QuickAccess() {
  return (
    <div className="mt-6 rounded-xl bg-white p-6 shadow">
      <h3 className="text-lg font-bold">Quick Access</h3>

      <div className="mt-5 grid grid-cols-4 gap-4">
        {quickActions.map(([label, Icon]) => {
          const IconComponent = Icon as typeof FolderArchive;

          return (
            <button
              key={label as string}
              className="rounded-xl border p-5 text-center hover:border-amber-400 hover:bg-amber-50"
            >
              <IconComponent className="mx-auto mb-3 text-[#071426]" />
              <span className="text-sm font-medium">{label as string}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}