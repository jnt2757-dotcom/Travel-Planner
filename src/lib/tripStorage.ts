import type {
  Accommodation,
  FlightEndpoint,
  FlightJourney,
  FlightLeg,
  ItineraryDay,
  ItineraryEntry,
  Trip,
} from "../data/trip";
import { makeId } from "./arrayOps";

export const STORAGE_KEY = "travel-planner:trip";

export function loadStoredTrip(): Trip | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Trip;
  } catch {
    return null;
  }
}

export function saveStoredTrip(trip: Trip): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
}

export function cloneTrip(trip: Trip): Trip {
  return JSON.parse(JSON.stringify(trip)) as Trip;
}

export function createEmptyEndpoint(): FlightEndpoint {
  return { airportCode: "", airportName: "", city: "", terminal: "", date: "", time: "" };
}

export function createEmptyLeg(): FlightLeg {
  return {
    airline: "",
    flightNumber: "",
    bookingReference: "",
    departure: createEmptyEndpoint(),
    arrival: createEmptyEndpoint(),
    duration: "",
    cabinClass: "Business",
    seats: "",
  };
}

export function createEmptyJourney(direction: "outbound" | "return"): FlightJourney {
  return { id: makeId(), direction, legs: [createEmptyLeg()], layovers: [] };
}

export function createEmptyAccommodation(): Accommodation {
  return {
    id: makeId(),
    name: "",
    city: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    confirmationNumber: "",
    description: "",
    image: "",
    imageAlt: "",
    amenities: [],
  };
}

export function createEmptyEntry(): ItineraryEntry {
  return { time: "", title: "", type: "activity", location: "", description: "" };
}

export function createEmptyDay(dayNumber: number): ItineraryDay {
  return { dayNumber, date: "", city: "", title: "", entries: [createEmptyEntry()], notes: "" };
}

export function createEmptyTrip(): Trip {
  return {
    meta: {
      title: "",
      clientName: "",
      destination: "",
      startDate: "",
      endDate: "",
      heroImage: "",
      heroImageAlt: "",
      agencyName: "",
      preparedByLine: "",
    },
    overview: {
      travelerCount: 0,
      destinationsCount: 0,
      introCopy: [],
    },
    flights: [createEmptyJourney("outbound")],
    accommodations: [],
    itinerary: [createEmptyDay(1)],
    practicalInfo: {
      emergencyContacts: [],
      plannerContact: { name: "", role: "", phone: "", email: "" },
      currency: "",
      timeZone: "",
      packingNotes: [],
    },
    footer: {
      agencyName: "",
      contactLine: "",
      closingSentence: "",
    },
  };
}
