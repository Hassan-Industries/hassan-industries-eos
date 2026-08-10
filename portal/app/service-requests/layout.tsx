import type { ReactNode } from "react";

type ServiceRequestsLayoutProps = {
  children: ReactNode;
};

export default function ServiceRequestsLayout({
  children,
}: ServiceRequestsLayoutProps) {
  return <>{children}</>;
}