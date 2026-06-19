import EGLModuleShell from "@/components/governance-library/EGLModuleShell";
import { eglModuleConfigs } from "@/data/eglModules";

export default function PendingReviewPage() {
  return <EGLModuleShell module={eglModuleConfigs.pendingReview} />;
}