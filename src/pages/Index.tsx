
import React, { useState, useEffect } from 'react';
import { Event, EventFilters } from '../types';
import { mockEvents } from '../data/mockEvents';
import EventCard from '../components/EventCard';
import EventFilter from '../components/EventFilter';
import EventDetails from '../components/EventDetails';
import EventForm from '../components/EventForm';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index: React.FC = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<EventFilters>({
    type: 'all',
    college: '',
    location: '',
    dateRange: {
      startDate: null,
      endDate: null
    },
    searchQuery: ''
  });

  // Extract unique colleges and locations for filter dropdowns
  const uniqueColleges = Array.from(new Set(events.map(event => event.location.college)));
  const uniqueLocations = Array.from(
    new Set(events.filter(event => !event.location.virtual)
      .map(event => `${event.location.city}, ${event.location.state}`))
  );

  // Filter events based on selected filters
  const filteredEvents = events.filter(event => {
    // Type filter
    if (filters.type !== 'all' && event.type !== filters.type) return false;
    
    // College filter
    if (filters.college && event.location.college !== filters.college) return false;
    
    // Location filter
    if (filters.location === 'virtual' && !event.location.virtual) return false;
    if (filters.location && filters.location !== 'virtual' && 
        `${event.location.city}, ${event.location.state}` !== filters.location) return false;
    
    // Search query
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      return (
        event.name.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.organizer.toLowerCase().includes(searchLower) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<EventFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Handle event card click
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  // Handle adding a new event
  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    // Generate a unique ID
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Add new event to the list
    const eventWithId: Event = {
      ...newEvent,
      id
    };
    
    setEvents(prevEvents => [eventWithId, ...prevEvents]);
    
    toast({
      title: "Success",
      description: "New event has been added to the platform.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-navy text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Campus Event Board</h1>
              <p className="text-gray-300 mt-1">Discover tech events happening at colleges near you</p>
            </div>
            <div className="mt-4 md:mt-0">
              <EventForm onSubmit={handleAddEvent} />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <EventFilter 
          filters={filters} 
          uniqueColleges={uniqueColleges}
          uniqueLocations={uniqueLocations}
          onFilterChange={handleFilterChange}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={handleEventClick}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h2 className="text-xl font-semibold">No events found</h2>
              <p className="text-muted-foreground mt-2">Try changing your filters or add a new event.</p>
              <Button 
                className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => setFilters({
                  type: 'all',
                  college: '',
                  location: '',
                  dateRange: {
                    startDate: null,
                    endDate: null
                  },
                  searchQuery: ''
                })}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        <EventDetails
          event={selectedEvent}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      </main>

      <footer className="bg-navy text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Campus Event Board - Find and share college tech events</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
