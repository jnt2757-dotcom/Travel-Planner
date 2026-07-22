import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  className?: string;
}

export function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
