
import React from 'react';
import { Search } from "lucide-react";
import { EventFilters, EventType } from '../types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventFilterProps {
  filters: EventFilters;
  uniqueColleges: string[];
  uniqueLocations: string[];
  onFilterChange: (filters: Partial<EventFilters>) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({
  filters,
  uniqueColleges,
  uniqueLocations,
  onFilterChange,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchQuery: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    onFilterChange({ type: value as EventType | 'all' });
  };

  const handleCollegeChange = (value: string) => {
    onFilterChange({ college: value });
  };

  const handleLocationChange = (value: string) => {
    onFilterChange({ location: value });
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>

        <Select
          value={filters.type}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="hackathon">Hackathon</SelectItem>
            <SelectItem value="tech talk">Tech Talk</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="career fair">Career Fair</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.college}
          onValueChange={handleCollegeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="College" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Colleges</SelectItem>
            {uniqueColleges.map((college) => (
              <SelectItem key={college} value={college}>{college}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.location}
          onValueChange={handleLocationChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            <SelectItem value="virtual">Virtual</SelectItem>
            {uniqueLocations.map((location) => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EventFilter;
