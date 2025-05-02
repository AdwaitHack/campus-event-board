
import React from 'react';
import { format } from 'date-fns';
import { Event } from '../types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const startDate = new Date(event.startDate);
  const formattedDate = format(startDate, 'MMM d, yyyy');
  const formattedTime = format(startDate, 'h:mm a');

  // Map event types to colors
  const getTypeColor = (type: string): string => {
    switch(type) {
      case 'hackathon':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'tech talk':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'workshop':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'career fair':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const locationText = event.location.virtual 
    ? 'Virtual' 
    : `${event.location.venue}, ${event.location.college}`;

  return (
    <Card className="event-card overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getTypeColor(event.type)} variant="outline">
            {event.type}
          </Badge>
          <div className="text-sm text-muted-foreground">
            {formattedDate}
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">{event.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <span className="text-sm">{locationText}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm line-clamp-3">{event.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {event.tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index} 
              className="text-xs py-1 px-2 bg-secondary rounded-full"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 2 && (
            <span className="text-xs py-1 px-2 bg-secondary rounded-full">
              +{event.tags.length - 2}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="default" 
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => onClick(event)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
