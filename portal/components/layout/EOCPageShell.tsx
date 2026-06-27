import type { ReactNode } from "react";

type EOCPageShellProps = {
  children: ReactNode;
  contentClassName?: string;
};

export default function EOCPageShell({
  children,
  contentClassName = "",
}: EOCPageShellProps) {
  return (
    <div className={["mx-auto w-full max-w-[1600px] space-y-6", contentClassName].join(" ")}>
      {children}
    </div>
  );
}