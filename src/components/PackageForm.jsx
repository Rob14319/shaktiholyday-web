import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor.jsx';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

const PackageForm = ({ packageData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    destination: '',
    itinerary: ''
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (packageData) {
      setFormData({
        title: packageData.title || '',
        description: packageData.description || '',
        price: packageData.price || '',
        duration: packageData.duration || '',
        destination: packageData.destination || '',
        itinerary: packageData.itinerary || ''
      });
    }
  }, [packageData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', parseFloat(formData.price));
      data.append('duration', formData.duration);
      data.append('destination', formData.destination);
      data.append('itinerary', formData.itinerary);

      images.forEach((image) => {
        data.append('images', image);
      });

      if (packageData) {
        await pb.collection('packages').update(packageData.id, data, { $autoCancel: false });
        toast.success('Package updated successfully');
      } else {
        await pb.collection('packages').create(data, { $autoCancel: false });
        toast.success('Package created successfully');
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to save package');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {packageData ? 'Edit Package' : 'Create New Package'}
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
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">
                Price (Rs.) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">
                Duration <span className="text-destructive">*</span>
              </Label>
              <Input
                id="duration"
                placeholder="e.g., 7 days / 6 nights"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">
              Destination <span className="text-destructive">*</span>
            </Label>
            <Input
              id="destination"
              placeholder="e.g., Bali, Indonesia"
              value={formData.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              required
            />
          </div>

          <RichTextEditor
            label="Itinerary"
            value={formData.itinerary}
            onChange={(value) => handleChange('itinerary', value)}
            placeholder="Day 1: Arrival and check-in&#10;Day 2: City tour&#10;..."
            required
          />

          <div className="space-y-2">
            <Label htmlFor="images">
              Images {!packageData && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required={!packageData}
            />
            <p className="text-xs text-muted-foreground">
              Upload up to 10 images. First image will be the featured image.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Saving...' : packageData ? 'Update Package' : 'Create Package'}
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

export default PackageForm;