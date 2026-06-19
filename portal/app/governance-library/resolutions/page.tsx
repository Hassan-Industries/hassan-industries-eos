import EGLModuleShell from "@/components/governance-library/EGLModuleShell";
import { eglModuleConfigs } from "@/data/eglModules";

export default function ResolutionsPage() {
  return <EGLModuleShell module={eglModuleConfigs.resolutions} />;
}