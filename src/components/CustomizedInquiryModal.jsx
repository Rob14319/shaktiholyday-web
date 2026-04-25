import React, { useState, useEffect } from 'react';
import { X, Send, HeartHandshake } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

const DESTINATIONS = [
  'Varanasi', 'Rishikesh', 'Haridwar', 'Ayodhya', 'Mathura', 
  'Vrindavan', 'Kedarnath', 'Badrinath', 'Amritsar', 'Bodh Gaya','Other'
];

const CustomizedInquiryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    number_of_days: '',
    budget_range: '',
    special_requirements: ''
  });
  
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  useEffect(() => {
    // Only open once per session after 4 seconds
    if (!hasOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasOpened(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [hasOpened]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDestinationToggle = (destination) => {
    setSelectedDestinations(prev => {
      if (prev.includes(destination)) {
        return prev.filter(d => d !== destination);
      } else {
        return [...prev, destination];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedDestinations.length === 0) {
      toast.error('Please select at least one preferred destination.');
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        preferred_destinations: selectedDestinations.join(', ')
      };

      await pb.collection('customized_inquiries').create(dataToSubmit, { $autoCancel: false });
      
      toast.success("Your inquiry has been received. Redirecting to WhatsApp for your customized quote...");
      
      // Construct WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `Hari Om! 🙏 I have submitted an inquiry for a customized spiritual journey.\n\n` +
        `*Name:* ${formData.full_name}\n` +
        `*Destinations:* ${dataToSubmit.preferred_destinations}\n` +
        `*Duration:* ${formData.number_of_days}\n` +
        `Please share more details and a personalized quote with me.`
      );
      
      setTimeout(() => {
        window.open(`https://wa.me/919815649468?text=${whatsappMessage}`, '_blank');
        setIsOpen(false);
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-md border-primary/20 shadow-2xl">
        <DialogHeader className="text-center mb-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <HeartHandshake className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-3xl font-serif text-primary mb-2">
            Customize Your Sacred Journey
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Share your preferences with us, and our yatra specialists will craft a personalized pilgrimage perfectly tailored to your soul's calling.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-foreground">
                Full Name <span className="text-secondary">*</span>
              </Label>
              <Input
                id="full_name"
                required
                value={formData.full_name}
                onChange={(e) => handleChange('full_name', e.target.value)}
                className="bg-card border-border focus-visible:ring-primary"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone_number" className="text-foreground">
                Phone Number <span className="text-secondary">*</span>
              </Label>
              <Input
                id="phone_number"
                required
                value={formData.phone_number}
                onChange={(e) => handleChange('phone_number', e.target.value)}
                className="bg-card border-border focus-visible:ring-primary"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email Address <span className="text-secondary">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="bg-card border-border focus-visible:ring-primary"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-foreground">
              Preferred Destination(s) <span className="text-secondary">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-muted/30 rounded-xl border border-border/50">
              {DESTINATIONS.map((dest) => (
                <div key={dest} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`dest-${dest}`} 
                    checked={selectedDestinations.includes(dest)}
                    onCheckedChange={() => handleDestinationToggle(dest)}
                    className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <label 
                    htmlFor={`dest-${dest}`} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {dest}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="number_of_days" className="text-foreground">
                Number of Days <span className="text-secondary">*</span>
              </Label>
              <Select 
                required 
                value={formData.number_of_days} 
                onValueChange={(val) => handleChange('number_of_days', val)}
              >
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-3 days">2-3 days</SelectItem>
                  <SelectItem value="4-5 days">4-5 days</SelectItem>
                  <SelectItem value="6-7 days">6-7 days</SelectItem>
                  <SelectItem value="8+ days">8+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget_range" className="text-foreground">
                Budget Range <span className="text-secondary">*</span>
              </Label>
              <Select 
                required 
                value={formData.budget_range} 
                onValueChange={(val) => handleChange('budget_range', val)}
              >
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under ₹10,000">Under ₹10,000</SelectItem>
                  <SelectItem value="₹10,000-₹20,000">₹10,000-₹20,000</SelectItem>
                  <SelectItem value="₹20,000-₹50,000">₹20,000-₹50,000</SelectItem>
                  <SelectItem value="Above ₹50,000">Above ₹50,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_requirements" className="text-foreground">
              Customization Requests (Optional)
            </Label>
            <Textarea
              id="special_requirements"
              value={formData.special_requirements}
              onChange={(e) => handleChange('special_requirements', e.target.value)}
              className="bg-card border-border min-h-[100px] focus-visible:ring-primary"
              placeholder="Any specific pooja requests, dietary needs, preferred hotel types, or accessibility requirements?"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg rounded-full font-serif tracking-wide" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Request Custom Quote
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizedInquiryModal;