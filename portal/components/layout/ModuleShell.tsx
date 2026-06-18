type ModuleShellProps = {
    title: string;
    subtitle: string;
    status?: string;
    children?: React.ReactNode;
  };
  
  export default function ModuleShell({
    title,
    subtitle,
    status = "Foundation Mode",
    children,
  }: ModuleShellProps) {
    return (
      <div className="rounded-xl bg-white p-8 shadow">
        <div className="border-b pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Hassan Industries
          </p>
          <h2 className="mt-2 text-3xl font-bold">{title}</h2>
          <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p>
          <div className="mt-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            {status}
          </div>
        </div>
  
        <div className="mt-6">
          {children ?? (
            <div className="rounded-lg border border-dashed p-8 text-slate-500">
              This module shell has been initialized. Functional workflows,
              records, registers, and controls will be implemented in a future
              HIEOS implementation project.
            </div>
          )}
        </div>
      </div>
    );
  }