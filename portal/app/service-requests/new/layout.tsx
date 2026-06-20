import type { ReactNode } from "react";

type NewServiceRequestLayoutProps = {
  children: ReactNode;
};

export default function NewServiceRequestLayout({
  children,
}: NewServiceRequestLayoutProps) {
  return <>{children}</>;
}