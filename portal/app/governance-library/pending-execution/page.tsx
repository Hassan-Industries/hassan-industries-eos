import EGLModuleShell from "@/components/governance-library/EGLModuleShell";
import { eglModuleConfigs } from "@/data/eglModules";

export default function PendingExecutionPage() {
  return <EGLModuleShell module={eglModuleConfigs.pendingExecution} />;
}