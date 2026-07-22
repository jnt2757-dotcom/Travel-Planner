import { useEffect, useRef, useState } from "react";
import type { Trip } from "../data/trip";
import { defaultTrip } from "../data/trip";
import { loadStoredTrip, saveStoredTrip } from "../lib/tripStorage";

const DEBOUNCE_MS = 600;
const SAVED_FLASH_MS = 1800;

/** Read/write: the editor's working copy, auto-saved to localStorage. */
export function useEditableTrip() {
  const [trip, setTrip] = useState<Trip>(() => loadStoredTrip() ?? defaultTrip);
  const [justSaved, setJustSaved] = useState(false);
  const debounceRef = useRef<number | undefined>(undefined);
  const flashRef = useRef<number | undefined>(undefined);
  // Captures the initial value once; compared by reference below so that
  // React StrictMode's double-invoked effect (dev only) can't slip past it.
  const initialTripRef = useRef(trip);

  useEffect(() => {
    if (trip === initialTripRef.current) {
      return;
    }

    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      saveStoredTrip(trip);
      setJustSaved(true);
      window.clearTimeout(flashRef.current);
      flashRef.current = window.setTimeout(() => setJustSaved(false), SAVED_FLASH_MS);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(debounceRef.current);
  }, [trip]);

  return { trip, setTrip, justSaved };
}
