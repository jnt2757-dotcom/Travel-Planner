import { useRef } from "react";
import type { Trip } from "../data/trip";
import { defaultTrip } from "../data/trip";
import { AccommodationSection } from "../editor/AccommodationSection";
import { DaysSection } from "../editor/DaysSection";
import { FlightsSection } from "../editor/FlightsSection";
import { Button } from "../editor/primitives";
import { PracticalInfoSection } from "../editor/PracticalInfoSection";
import { TripDetailsSection } from "../editor/TripDetailsSection";
import { useEditableTrip } from "../hooks/useEditableTrip";
import { cloneTrip, createEmptyTrip } from "../lib/tripStorage";

function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || "trip";
}

export function EditorPage() {
  const { trip, setTrip, justSaved } = useEditableTrip();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateTrip = (updater: (t: Trip) => Trip) => setTrip(updater);

  const handleNewTrip = () => {
    if (window.confirm("Start a new trip? This clears everything currently in the editor.")) {
      setTrip(createEmptyTrip());
    }
  };

  const handleLoadSample = () => {
    if (window.confirm("Load the Amalfi Coast sample? This replaces everything currently in the editor.")) {
      setTrip(cloneTrip(defaultTrip));
    }
  };

  const handleExport = () => {
    const filename = `${slugify(trip.meta.clientName || trip.meta.title || "trip")}.json`;
    const blob = new Blob([JSON.stringify(trip, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Trip;
        setTrip(parsed);
      } catch {
        window.alert("That file couldn't be read as trip JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-10 border-b border-ink/10 bg-cream/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-soft">Travel Planner</p>
            <h1 className="font-display text-2xl text-ink">Trip editor</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs text-ink-soft transition-opacity duration-300 ${justSaved ? "opacity-100" : "opacity-0"}`}>
              Saved
            </span>
            <Button variant="ghost" onClick={handleNewTrip}>
              New trip
            </Button>
            <Button variant="ghost" onClick={handleLoadSample}>
              Load sample
            </Button>
            <Button variant="ghost" onClick={() => fileInputRef.current?.click()}>
              Import
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImportFile(file);
                e.target.value = "";
              }}
            />
            <Button onClick={handleExport}>Export .json</Button>
            <Button variant="ghost" href="/" target="_blank" rel="noopener noreferrer">
              Preview ↗
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1120px] space-y-5 px-6 py-8">
        <TripDetailsSection trip={trip} updateTrip={updateTrip} />
        <FlightsSection trip={trip} updateTrip={updateTrip} />
        <AccommodationSection trip={trip} updateTrip={updateTrip} />
        <DaysSection trip={trip} updateTrip={updateTrip} />
        <PracticalInfoSection trip={trip} updateTrip={updateTrip} />
      </main>
    </div>
  );
}
