
import React, { useState } from 'react';
import { Event, EventType, Location } from '../types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id'>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({
    name: '',
    description: '',
    type: 'tech talk',
    startDate: '',
    endDate: '',
    location: {
      venue: '',
      college: '',
      city: '',
      state: '',
      virtual: false
    },
    organizer: '',
    registrationLink: '',
    tags: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location as Location, [name]: value }
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleVirtualChange = (checked: boolean) => {
    setIsVirtual(checked);
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location as Location, virtual: checked }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.description || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create a complete event object
    const newEvent: Omit<Event, 'id'> = {
      name: formData.name || '',
      description: formData.description || '',
      type: formData.type as EventType || 'other',
      startDate: formData.startDate || new Date().toISOString(),
      endDate: formData.endDate || new Date().toISOString(),
      location: {
        venue: formData.location?.venue || '',
        college: formData.location?.college || '',
        city: formData.location?.city || '',
        state: formData.location?.state || '',
        virtual: isVirtual
      },
      organizer: formData.organizer || '',
      registrationLink: formData.registrationLink,
      tags: formData.tags || []
    };

    onSubmit(newEvent);
    
    // Reset form and close dialog
    setFormData({
      name: '',
      description: '',
      type: 'tech talk',
      startDate: '',
      endDate: '',
      location: {
        venue: '',
        college: '',
        city: '',
        state: '',
        virtual: false
      },
      organizer: '',
      registrationLink: '',
      tags: []
    });
    setIsVirtual(false);
    setIsOpen(false);

    toast({
      title: "Event Submitted",
      description: "Your event has been successfully added."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          Add New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Submit a New Event</DialogTitle>
          <DialogDescription>
            Fill out the details below to add a new event to the platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Event Name*</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Hackathon 2025"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="type">Event Type*</Label>
            <Select
              value={formData.type as string}
              onValueChange={(value) => handleSelectChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hackathon">Hackathon</SelectItem>
                <SelectItem value="tech talk">Tech Talk</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="career fair">Career Fair</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date & Time*</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                value={formData.startDate || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date & Time*</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={formData.endDate || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="virtual" 
              checked={isVirtual}
              onCheckedChange={handleVirtualChange}
            />
            <Label htmlFor="virtual">This is a virtual event</Label>
          </div>

          {!isVirtual && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="venue">Venue*</Label>
                <Input
                  id="venue"
                  name="venue"
                  value={formData.location?.venue || ''}
                  onChange={handleLocationChange}
                  placeholder="Building name"
                  disabled={isVirtual}
                  required={!isVirtual}
                />
              </div>
              <div>
                <Label htmlFor="college">College/University*</Label>
                <Input
                  id="college"
                  name="college"
                  value={formData.location?.college || ''}
                  onChange={handleLocationChange}
                  placeholder="University name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.location?.city || ''}
                  onChange={handleLocationChange}
                  placeholder="City"
                  disabled={isVirtual}
                  required={!isVirtual}
                />
              </div>
              <div>
                <Label htmlFor="state">State*</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.location?.state || ''}
                  onChange={handleLocationChange}
                  placeholder="State"
                  disabled={isVirtual}
                  required={!isVirtual}
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Provide details about the event"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="organizer">Organizer*</Label>
            <Input
              id="organizer"
              name="organizer"
              value={formData.organizer || ''}
              onChange={handleChange}
              placeholder="Organization or individual hosting the event"
              required
            />
          </div>

          <div>
            <Label htmlFor="registrationLink">Registration Link</Label>
            <Input
              id="registrationLink"
              name="registrationLink"
              type="url"
              value={formData.registrationLink || ''}
              onChange={handleChange}
              placeholder="https://example.com/register"
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags?.join(', ') || ''}
              onChange={handleTagsChange}
              placeholder="ai, machine learning, web development"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
