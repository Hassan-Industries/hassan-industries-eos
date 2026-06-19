import EGLModuleShell from "@/components/governance-library/EGLModuleShell";
import { eglModuleConfigs } from "@/data/eglModules";

export default function FormsPage() {
  return <EGLModuleShell module={eglModuleConfigs.forms} />;
}