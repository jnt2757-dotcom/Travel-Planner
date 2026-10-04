import { Fragment } from "react";
import { neighborhoods } from "@content/site";

/** "Eastover · Myers Park · …" that never wraps a separator onto the start of a line. */
export function NeighborhoodLine({ className }: { className?: string }) {
  return (
    <p className={className}>
      {neighborhoods.map((n, i) => (
        <Fragment key={n}>
          <span className="whitespace-nowrap">
            {n}
            {i < neighborhoods.length - 1 ? <span aria-hidden="true">&nbsp;·</span> : null}
          </span>{" "}
        </Fragment>
      ))}
    </p>
  );
}
