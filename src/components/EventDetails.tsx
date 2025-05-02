
import { format } from 'date-fns';
import { Calendar, Globe, MapPin } from 'lucide-react';
import { Event } from '../types';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EventDetailsProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, isOpen, onClose }) => {
  if (!event) return null;

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  const formatDateRange = () => {
    const isSameDay = startDate.toDateString() === endDate.toDateString();
    
    if (isSameDay) {
      return `${format(startDate, 'MMMM d, yyyy')} • ${format(startDate, 'h:mm a')} - ${format(endDate, 'h:mm a')}`;
    } else {
      return `${format(startDate, 'MMMM d, yyyy h:mm a')} - ${format(endDate, 'MMMM d, yyyy h:mm a')}`;
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getTypeColor(event.type)} variant="outline">
              {event.type}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Organized by {event.organizer}
            </span>
          </div>
          <DialogTitle className="text-2xl">{event.name}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDateRange()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              {event.location.virtual ? (
                <>
                  <Globe className="h-4 w-4" />
                  <span>Virtual Event</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  <span>
                    {event.location.venue}, {event.location.college}, {event.location.city}, {event.location.state}
                  </span>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-medium">About this Event</h3>
            <p className="mt-2 text-muted-foreground whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Tags</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {event.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs py-1 px-3 bg-secondary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {event.registrationLink && (
            <div className="pt-4">
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90" 
                asChild
              >
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                  Register for Event
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetails;
