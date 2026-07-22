import { useEffect, useState } from "react";
import type { Trip } from "../data/trip";
import { defaultTrip } from "../data/trip";
import { loadStoredTrip, STORAGE_KEY } from "../lib/tripStorage";

/** Read-only: the client page's view of whatever trip is currently saved. */
export function useStoredTrip(): Trip {
  const [trip, setTrip] = useState<Trip>(() => loadStoredTrip() ?? defaultTrip);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        setTrip(loadStoredTrip() ?? defaultTrip);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return trip;
}
