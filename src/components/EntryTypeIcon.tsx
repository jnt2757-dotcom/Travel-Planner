import type { ItineraryEntryType } from "../data/trip";

const paths: Record<ItineraryEntryType, ReactPath> = {
  dining: {
    d: "M6 2v6a2 2 0 1 0 4 0V2M8 8v12M17 2v20M17 2c-2.2 0-3.5 1.8-3.5 5s1.3 5 3.5 5",
  },
  activity: {
    d: "M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  },
  transfer: {
    d: "M3 16V9a1 1 0 0 1 1-1h11l4 4v4a1 1 0 0 1-1 1H3ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  },
  leisure: {
    d: "M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  },
  checkin: {
    d: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M4 21h14M9 12h.01M14 3v18M17 10l3 3-3 3M20 13h-6",
  },
  checkout: {
    d: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M4 21h14M9 12h.01M14 3v18M20 10l-3 3 3 3M14 13h6",
  },
};

interface ReactPath {
  d: string;
}

export function EntryTypeIcon({ type, className = "h-4 w-4" }: { type: ItineraryEntryType; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[type].d} />
    </svg>
  );
}

export const ENTRY_TYPE_LABEL: Record<ItineraryEntryType, string> = {
  dining: "Dining",
  activity: "Activity",
  transfer: "Transfer",
  leisure: "Leisure",
  checkin: "Check-in",
  checkout: "Check-out",
};

export const ENTRY_TYPE_STYLE: Record<ItineraryEntryType, string> = {
  dining: "bg-[#F3E7D9] text-[#9C6B3E]",
  activity: "bg-[#E8EEE4] text-[#5F7A5E]",
  transfer: "bg-[#ECE9E4] text-[#6B6862]",
  leisure: "bg-[#F1E9DD] text-[#8C6F4E]",
  checkin: "bg-[#E4EDEC] text-[#4F6D6B]",
  checkout: "bg-[#EFE3DE] text-[#7A5C52]",
};
