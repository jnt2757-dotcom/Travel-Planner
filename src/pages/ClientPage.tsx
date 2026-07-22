import { Accommodation } from "../components/Accommodation";
import { Flights } from "../components/Flights";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Itinerary } from "../components/Itinerary";
import { Overview } from "../components/Overview";
import { PracticalInfo } from "../components/PracticalInfo";
import { useStoredTrip } from "../hooks/useStoredTrip";

export function ClientPage() {
  const trip = useStoredTrip();

  return (
    <div className="bg-cream">
      <Hero meta={trip.meta} />
      <main>
        <Overview
          overview={trip.overview}
          startDate={trip.meta.startDate}
          endDate={trip.meta.endDate}
          accommodations={trip.accommodations}
        />
        <Flights flights={trip.flights} />
        <Accommodation accommodations={trip.accommodations} />
        <Itinerary days={trip.itinerary} />
        <PracticalInfo info={trip.practicalInfo} />
      </main>
      <Footer footer={trip.footer} />
    </div>
  );
}
