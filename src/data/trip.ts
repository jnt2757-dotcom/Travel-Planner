/**
 * ALL client trip content lives in this file.
 * See README.md for exactly which fields to change when building a new trip.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TripMeta {
  title: string;
  clientName: string;
  destination: string;
  /** ISO date, e.g. "2026-09-12" */
  startDate: string;
  /** ISO date, e.g. "2026-09-19" */
  endDate: string;
  heroImage: string;
  heroImageAlt: string;
  agencyName: string;
  preparedByLine: string;
}

export interface Overview {
  travelerCount: number;
  destinationsCount: number;
  /** One or more short paragraphs of introductory copy. */
  introCopy: string[];
}

export type CabinClass =
  | "Economy"
  | "Premium Economy"
  | "Business"
  | "First";

export interface FlightEndpoint {
  airportCode: string;
  airportName: string;
  city: string;
  terminal?: string;
  /** ISO date */
  date: string;
  /** 24h time, e.g. "14:35" */
  time: string;
}

export interface FlightLeg {
  airline: string;
  flightNumber: string;
  bookingReference: string;
  departure: FlightEndpoint;
  arrival: FlightEndpoint;
  duration: string;
  cabinClass: CabinClass;
  seats: string;
}

export interface FlightJourney {
  id: string;
  direction: "outbound" | "return";
  /** Ordered legs. More than one leg means a connecting journey. */
  legs: FlightLeg[];
  /** Layover duration text between legs. Length must be legs.length - 1. */
  layovers?: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  city: string;
  roomType: string;
  /** ISO date */
  checkIn: string;
  /** ISO date */
  checkOut: string;
  confirmationNumber: string;
  description: string;
  image: string;
  imageAlt: string;
  amenities: string[];
}

export type ItineraryEntryType =
  | "dining"
  | "activity"
  | "transfer"
  | "leisure"
  | "checkin"
  | "checkout";

export interface ItineraryEntry {
  /** 24h time, e.g. "08:30" */
  time: string;
  title: string;
  type: ItineraryEntryType;
  location?: string;
  description?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  /** ISO date */
  date: string;
  city: string;
  title: string;
  entries: ItineraryEntry[];
  notes?: string;
}

export interface EmergencyContact {
  label: string;
  name?: string;
  phone: string;
}

export interface PlannerContact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface PracticalInfo {
  emergencyContacts: EmergencyContact[];
  plannerContact: PlannerContact;
  currency: string;
  timeZone: string;
  packingNotes: string[];
}

export interface FooterInfo {
  agencyName: string;
  contactLine: string;
  closingSentence: string;
}

export interface Trip {
  meta: TripMeta;
  overview: Overview;
  flights: FlightJourney[];
  accommodations: Accommodation[];
  itinerary: ItineraryDay[];
  practicalInfo: PracticalInfo;
  footer: FooterInfo;
}

// ---------------------------------------------------------------------------
// Sample trip: seven nights, Amalfi Coast
// ---------------------------------------------------------------------------

export const defaultTrip: Trip = {
  meta: {
    title: "The Amalfi Coast Journey",
    clientName: "Mr. & Mrs. Whitfield",
    destination: "Amalfi Coast, Italy",
    startDate: "2026-09-12",
    endDate: "2026-09-19",
    heroImage: "/images/hero-amalfi.svg",
    heroImageAlt: "Terracotta cliffs of the Amalfi Coast above a teal sea at dusk",
    agencyName: "Solstice Private Travel",
    preparedByLine: "Prepared by Solstice Private Travel",
  },

  overview: {
    travelerCount: 2,
    destinationsCount: 2,
    introCopy: [
      "Seven nights along the Amalfi Coast, moving slowly between two villages that show the coastline at its most different: the vertical drama of Positano and the quiet, garden-wrapped heights of Ravello.",
      "The days ahead are built around long lunches, private water access, and enough open time to let the coast set the pace. Everything below is confirmed — flights, rooms, and the shape of each day.",
    ],
  },

  flights: [
    {
      id: "outbound",
      direction: "outbound",
      legs: [
        {
          airline: "Air France",
          flightNumber: "AF 023",
          bookingReference: "QXTPLM",
          departure: {
            airportCode: "JFK",
            airportName: "John F. Kennedy International Airport",
            city: "New York",
            terminal: "1",
            date: "2026-09-12",
            time: "18:35",
          },
          arrival: {
            airportCode: "CDG",
            airportName: "Charles de Gaulle Airport",
            city: "Paris",
            terminal: "2E",
            date: "2026-09-13",
            time: "07:55",
          },
          duration: "7h 20m",
          cabinClass: "Business",
          seats: "3A, 3B",
        },
        {
          airline: "Air France",
          flightNumber: "AF 1436",
          bookingReference: "QXTPLM",
          departure: {
            airportCode: "CDG",
            airportName: "Charles de Gaulle Airport",
            city: "Paris",
            terminal: "2F",
            date: "2026-09-13",
            time: "09:45",
          },
          arrival: {
            airportCode: "NAP",
            airportName: "Naples International Airport",
            city: "Naples",
            terminal: "1",
            date: "2026-09-13",
            time: "11:15",
          },
          duration: "2h 30m",
          cabinClass: "Business",
          seats: "2A, 2B",
        },
      ],
      layovers: ["1h 50m layover in Paris (CDG)"],
    },
    {
      id: "return",
      direction: "return",
      legs: [
        {
          airline: "ITA Airways",
          flightNumber: "AZ 1786",
          bookingReference: "MJKQRT",
          departure: {
            airportCode: "NAP",
            airportName: "Naples International Airport",
            city: "Naples",
            terminal: "1",
            date: "2026-09-19",
            time: "10:20",
          },
          arrival: {
            airportCode: "FCO",
            airportName: "Leonardo da Vinci–Fiumicino Airport",
            city: "Rome",
            terminal: "1",
            date: "2026-09-19",
            time: "11:15",
          },
          duration: "0h 55m",
          cabinClass: "Business",
          seats: "1C, 1D",
        },
        {
          airline: "ITA Airways",
          flightNumber: "AZ 608",
          bookingReference: "MJKQRT",
          departure: {
            airportCode: "FCO",
            airportName: "Leonardo da Vinci–Fiumicino Airport",
            city: "Rome",
            terminal: "3",
            date: "2026-09-19",
            time: "13:25",
          },
          arrival: {
            airportCode: "JFK",
            airportName: "John F. Kennedy International Airport",
            city: "New York",
            terminal: "1",
            date: "2026-09-19",
            time: "17:10",
          },
          duration: "9h 45m",
          cabinClass: "Business",
          seats: "4A, 4B",
        },
      ],
      layovers: ["2h 10m layover in Rome (FCO)"],
    },
  ],

  accommodations: [
    {
      id: "villa-undici",
      name: "Villa Undici",
      city: "Positano",
      roomType: "Junior Suite, Sea View",
      checkIn: "2026-09-13",
      checkOut: "2026-09-17",
      confirmationNumber: "VU-88213",
      description:
        "A whitewashed clifftop villa stepped down toward the water in a series of terraces, each planted with lemon and bougainvillea. The Junior Suite opens onto a private terrace with an uninterrupted view of the Positano waterfront, and the villa's launch runs guests down to its own swimming platform on request.",
      image: "/images/property-positano.svg",
      imageAlt: "Terraced pink and cream buildings above the sea in Positano",
      amenities: [
        "Private terrace",
        "Sea-view soaking tub",
        "Boat shuttle",
        "Breakfast included",
        "Air conditioning",
      ],
    },
    {
      id: "monastero-di-ravello",
      name: "Monastero di Ravello",
      city: "Ravello",
      roomType: "Garden Suite",
      checkIn: "2026-09-17",
      checkOut: "2026-09-19",
      confirmationNumber: "MDR-40217",
      description:
        "A thirteenth-century monastery reworked into a quiet, thirty-room hotel around a cloistered garden. The Garden Suite looks over the cloister's old fig trees rather than the coast, which is the point — Ravello sits high enough that the sea view is everywhere else in the village, and the rooms are built for stillness.",
      image: "/images/property-ravello.svg",
      imageAlt: "A stone garden terrace with cypress trees above the coastline in Ravello",
      amenities: [
        "Garden courtyard",
        "Spa access",
        "Breakfast included",
        "Late checkout",
        "Airport transfer desk",
      ],
    },
  ],

  itinerary: [
    {
      dayNumber: 1,
      date: "2026-09-13",
      city: "Positano",
      title: "Arrival and first evening on the coast",
      entries: [
        {
          time: "11:15",
          title: "Land in Naples",
          type: "transfer",
          location: "Naples International Airport (NAP)",
          description:
            "Clear customs and collect luggage at the arrivals hall. A driver will be waiting just past the exit with a card reading \"Whitfield.\"",
        },
        {
          time: "12:00",
          title: "Private transfer to Positano",
          type: "transfer",
          location: "Amalfi Coast Road",
          description:
            "A little under two hours along the coast road, with a stop at an overlook near Vico Equense if the light is good. Water and pastries in the car.",
        },
        {
          time: "14:30",
          title: "Check in at Villa Undici",
          type: "checkin",
          location: "Villa Undici, Positano",
          description:
            "The rest of the afternoon is unscheduled — settle in, and take the villa's terrace bar for a first Aperol on arrival.",
        },
        {
          time: "20:00",
          title: "Dinner at Terrazza Tramonto",
          type: "dining",
          location: "Terrazza Tramonto, Positano",
          description:
            "A short walk down from the villa. Ask for the terrace tables — sunset finishes around 19:40 this time of year, so the sky is still doing something as dinner starts.",
        },
      ],
      notes:
        "Dress code in Positano restaurants runs smart-casual in the evening; linen is standard and appreciated.",
    },
    {
      dayNumber: 2,
      date: "2026-09-14",
      city: "Positano",
      title: "A private boat day toward Li Galli",
      entries: [
        {
          time: "09:30",
          title: "Breakfast on the terrace",
          type: "dining",
          location: "Villa Undici",
        },
        {
          time: "11:00",
          title: "Private boat charter",
          type: "activity",
          location: "Positano Marina Grande",
          description:
            "A gozzo and skipper for the day, out toward the Li Galli islands with stops for swimming at Fiordo di Furore along the way. Lunch is aboard.",
        },
        {
          time: "13:00",
          title: "Lunch aboard, off Li Galli",
          type: "dining",
          description:
            "A cold lunch packed by the villa's kitchen — seafood, tomatoes, and a bottle of the Amalfi Coast's local Furore white.",
        },
        {
          time: "17:30",
          title: "Return to Positano",
          type: "transfer",
          location: "Positano Marina Grande",
        },
        {
          time: "20:30",
          title: "Dinner at Osteria della Marina",
          type: "dining",
          location: "Osteria della Marina, Positano",
          description: "A quieter, family-run room just off the beach, known for its catch of the day.",
        },
      ],
      notes:
        "The boat charter is weather-dependent. If the sea is uncooperative, the skipper will call the villa by 08:00 to reschedule within the stay.",
    },
    {
      dayNumber: 3,
      date: "2026-09-15",
      city: "Positano",
      title: "A day trip to Capri",
      entries: [
        {
          time: "08:15",
          title: "Ferry to Capri",
          type: "transfer",
          location: "Positano Marina Grande",
          description: "A fast hydrofoil, about 40 minutes across open water.",
        },
        {
          time: "09:15",
          title: "Blue Grotto and coastal loop",
          type: "activity",
          location: "Capri",
          description:
            "A private guide meets you at the dock for the morning, including a rowboat pass into the Blue Grotto if conditions allow.",
        },
        {
          time: "13:00",
          title: "Lunch in Anacapri",
          type: "dining",
          location: "Anacapri",
          description: "Up the funicular for lunch away from the marina crowds, with a view back down over the port.",
        },
        {
          time: "16:00",
          title: "Free time in Capri town",
          type: "leisure",
          location: "Capri town",
        },
        {
          time: "18:45",
          title: "Ferry back to Positano",
          type: "transfer",
          location: "Capri Marina Grande",
        },
      ],
    },
    {
      dayNumber: 4,
      date: "2026-09-16",
      city: "Positano",
      title: "A slower day, and a cooking class",
      entries: [
        {
          time: "10:00",
          title: "Late breakfast",
          type: "dining",
          location: "Villa Undici",
        },
        {
          time: "11:00",
          title: "Morning at leisure",
          type: "leisure",
          description: "The villa's terrace and swimming platform are both free all morning — no plans on the books.",
        },
        {
          time: "16:00",
          title: "Amalfi cooking class",
          type: "activity",
          location: "Villa Undici kitchen",
          description:
            "A private class with the villa's chef — fresh pasta and a Positano-style seafood dish, eaten together at 19:00.",
        },
        {
          time: "19:00",
          title: "Dinner from the cooking class",
          type: "dining",
          location: "Villa Undici",
        },
      ],
    },
    {
      dayNumber: 5,
      date: "2026-09-17",
      city: "Ravello",
      title: "Up to Ravello, and Villa Cimbrone's gardens",
      entries: [
        {
          time: "10:30",
          title: "Check out of Villa Undici",
          type: "checkout",
          location: "Villa Undici, Positano",
        },
        {
          time: "11:00",
          title: "Private transfer to Ravello",
          type: "transfer",
          location: "SS163 Amalfitana",
          description:
            "About an hour along the coast road and up into the hills. The road narrows near Amalfi — a good stretch for photographs, less good for reading in the car.",
        },
        {
          time: "13:00",
          title: "Check in at Monastero di Ravello",
          type: "checkin",
          location: "Monastero di Ravello",
        },
        {
          time: "16:00",
          title: "Villa Cimbrone gardens",
          type: "activity",
          location: "Villa Cimbrone, Ravello",
          description:
            "A short walk from the hotel. The Terrace of Infinity is quietest in late afternoon, once the day-trip groups have moved on.",
        },
        {
          time: "20:00",
          title: "Dinner at La Vigna di Ravello",
          type: "dining",
          location: "La Vigna di Ravello",
        },
      ],
    },
    {
      dayNumber: 6,
      date: "2026-09-18",
      city: "Ravello",
      title: "Amalfi and Atrani on foot, a concert in the evening",
      entries: [
        {
          time: "09:30",
          title: "Breakfast in the cloister",
          type: "dining",
          location: "Monastero di Ravello",
        },
        {
          time: "11:00",
          title: "Walk down to Amalfi",
          type: "activity",
          location: "Amalfi",
          description:
            "A guided walking route down through Atrani and into Amalfi, with a stop at the Duomo. A car brings you back up when you're ready.",
        },
        {
          time: "13:30",
          title: "Lunch in Atrani",
          type: "dining",
          location: "Atrani",
          description: "A small, uncrowded beach town wedged between Amalfi and Ravello — worth the stop on its own.",
        },
        {
          time: "17:00",
          title: "Return to Ravello",
          type: "transfer",
        },
        {
          time: "21:00",
          title: "Evening concert at Villa Rufolo",
          type: "activity",
          location: "Villa Rufolo, Ravello",
          description:
            "Tickets are confirmed for the evening program in the gardens — arrive by 20:30 to walk the grounds beforehand.",
        },
      ],
      notes: "Bring a light layer for the concert; the garden terrace cools quickly after sunset.",
    },
    {
      dayNumber: 7,
      date: "2026-09-19",
      city: "Ravello",
      title: "A last morning, and the trip home",
      entries: [
        {
          time: "08:30",
          title: "Breakfast in the cloister",
          type: "dining",
          location: "Monastero di Ravello",
        },
        {
          time: "09:15",
          title: "Check out of Monastero di Ravello",
          type: "checkout",
          location: "Monastero di Ravello",
        },
        {
          time: "09:30",
          title: "Private transfer to Naples Airport",
          type: "transfer",
          location: "Naples International Airport (NAP)",
          description: "About ninety minutes down from Ravello, with buffer built in ahead of the 10:20 departure.",
        },
      ],
      notes: "Spa treatments booked for the morning were moved to Day 6 at your request — confirmed with the hotel.",
    },
  ],

  practicalInfo: {
    emergencyContacts: [
      { label: "Local emergency services", phone: "112" },
      { label: "Villa Undici front desk", phone: "+39 089 875 099" },
      { label: "Monastero di Ravello front desk", phone: "+39 089 857 244" },
    ],
    plannerContact: {
      name: "J. Turner",
      role: "Solstice Private Travel",
      phone: "+1 (212) 555-0148",
      email: "jnt2757@gmail.com",
    },
    currency: "Euro (€) — most hotels and drivers accept card; markets and small trattorias are cash-friendlier.",
    timeZone: "Central European Time (CET), UTC+2 in September",
    packingNotes: [
      "Smart-casual for dinners; linen and light fabrics for the day",
      "A layer for evenings in Ravello, which sit higher and cool faster than Positano",
      "Flat, closed-toe shoes for the Amalfi and Capri walking routes",
      "A swimsuit that dries quickly — the boat day involves several swim stops",
    ],
  },

  footer: {
    agencyName: "Solstice Private Travel",
    contactLine: "jnt2757@gmail.com  ·  +1 (212) 555-0148",
    closingSentence: "It has been a pleasure to build this one. Buon viaggio.",
  },
};
