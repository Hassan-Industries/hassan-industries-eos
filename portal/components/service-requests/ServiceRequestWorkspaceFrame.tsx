import type { ReactNode } from "react";

type ServiceRequestWorkspaceFrameProps = {
  children: ReactNode;
};

export default function ServiceRequestWorkspaceFrame({
  children,
}: ServiceRequestWorkspaceFrameProps) {
  return <>{children}</>;
}