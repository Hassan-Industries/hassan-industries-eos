import EGLModuleShell from "@/components/governance-library/EGLModuleShell";
import { eglModuleConfigs } from "@/data/eglModules";

export default function TemplatesPage() {
  return <EGLModuleShell module={eglModuleConfigs.templates} />;
}