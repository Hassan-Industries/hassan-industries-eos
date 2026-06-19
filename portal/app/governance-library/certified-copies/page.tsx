import EGLModuleShell from "@/components/governance-library/EGLModuleShell";
import { eglModuleConfigs } from "@/data/eglModules";

export default function CertifiedCopiesPage() {
  return <EGLModuleShell module={eglModuleConfigs.certifiedCopies} />;
}