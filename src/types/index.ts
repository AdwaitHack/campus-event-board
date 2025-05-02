
export type EventType = 'hackathon' | 'tech talk' | 'workshop' | 'career fair' | 'other';

export interface Location {
  venue: string;
  college: string;
  city: string;
  state: string;
  virtual: boolean;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  type: EventType;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  location: Location;
  imageUrl?: string;
  registrationLink?: string;
  organizer: string;
  tags: string[];
}

export interface EventFilters {
  type: EventType | 'all';
  college: string;
  location: string;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  searchQuery: string;
}
