
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
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
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

const TestimonialForm = ({ testimonialData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    location: '',
    rating: '5',
    testimonial_text: ''
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (testimonialData) {
      setFormData({
        customer_name: testimonialData.customer_name || '',
        location: testimonialData.location || '',
        rating: testimonialData.rating?.toString() || '5',
        testimonial_text: testimonialData.testimonial_text || ''
      });
    }
  }, [testimonialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('customer_name', formData.customer_name);
      data.append('location', formData.location);
      data.append('rating', parseInt(formData.rating));
      data.append('testimonial_text', formData.testimonial_text);

      if (image) {
        data.append('image', image);
      }

      if (testimonialData) {
        await pb.collection('testimonials').update(testimonialData.id, data, { $autoCancel: false });
        toast.success('Testimonial updated successfully');
      } else {
        await pb.collection('testimonials').create(data, { $autoCancel: false });
        toast.success('Testimonial created successfully');
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to save testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-serif font-semibold">
            {testimonialData ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="customer_name">
                Customer Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => handleChange('customer_name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g., Mumbai, India"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">
              Rating <span className="text-destructive">*</span>
            </Label>
            <Select 
              value={formData.rating} 
              onValueChange={(value) => handleChange('rating', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Stars - Excellent</SelectItem>
                <SelectItem value="4">4 Stars - Very Good</SelectItem>
                <SelectItem value="3">3 Stars - Good</SelectItem>
                <SelectItem value="2">2 Stars - Fair</SelectItem>
                <SelectItem value="1">1 Star - Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testimonial_text">
              Testimonial <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="testimonial_text"
              value={formData.testimonial_text}
              onChange={(e) => handleChange('testimonial_text', e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">
              Customer Image (Optional)
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Saving...' : testimonialData ? 'Update Testimonial' : 'Add Testimonial'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
