import type { ReactNode } from "react";

type ServiceRequestWorkspaceFrameProps = {
  children: ReactNode;
};

export default function ServiceRequestWorkspaceFrame({
  children,
}: ServiceRequestWorkspaceFrameProps) {
  return <div className="mx-auto max-w-[1680px] space-y-6">{children}</div>;
}