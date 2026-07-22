import type { ElementType, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** Position among staggered siblings; each step adds 60ms of delay. */
  index?: number;
  className?: string;
}

export function Reveal({ children, as: Tag = "div", index = 0, className = "" }: RevealProps) {
  const { ref, visible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={visible ? { animationDelay: `${index * 60}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
