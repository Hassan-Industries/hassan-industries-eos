import EGLModuleShell from "@/components/governance-library/EGLModuleShell";
import { eglModuleConfigs } from "@/data/eglModules";

export default function PublicationsPage() {
  return <EGLModuleShell module={eglModuleConfigs.publications} />;
}