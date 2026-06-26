import type { ReactNode } from "react";

import EOCPageShell from "@/components/layout/EOCPageShell";

type ServiceRequestWorkspaceFrameProps = {
  children: ReactNode;
};

export default function ServiceRequestWorkspaceFrame({
  children,
}: ServiceRequestWorkspaceFrameProps) {
  return <EOCPageShell>{children}</EOCPageShell>;
}