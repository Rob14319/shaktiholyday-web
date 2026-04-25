
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PackageCard = ({ pkg }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop';
  
  // Since we use hardcoded text without images, fallback to the beautiful aesthetic unsplash default image
  const imgSrc = defaultImage;

  const whatsappMessage = encodeURIComponent(`Hi ShaktiHolyday! I'm interested in the ${pkg?.title} (${pkg?.duration}). Please share customized pricing and details for my group. I'd like to discuss my specific requirements.`);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border-border/50 group">
      <div className="relative h-56 overflow-hidden bg-muted">
        <img 
          src={imgSrc} 
          alt={pkg?.title ? `View of ${pkg.title} pilgrimage destination` : 'Pilgrimage Package Destination'}
          loading="lazy"
          onError={(e) => {
            console.error('[PackageCard] Image failed to load:', e.target.src);
            // On error, immediately swap to default image (exact same as PackageDetailPage)
            e.target.src = defaultImage;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="absolute top-4 right-4 bg-primary/95 text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider backdrop-blur-sm shadow-md z-20">
          Customized Experience
        </div>
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-serif font-bold mb-3 leading-snug">{pkg?.title}</h3>
        <p className="text-muted-foreground mb-5 leading-relaxed line-clamp-2">
          {pkg?.description}
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg">
            <MapPin size={16} className="text-primary shrink-0" />
            <span className="font-medium text-foreground/80">{pkg?.destination}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg">
            <Clock size={16} className="text-primary shrink-0" />
            <span className="font-medium text-foreground/80">{pkg?.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto flex flex-col gap-3">
        <a 
          href={`https://wa.me/919815649468?text=${whatsappMessage}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full"
        >
          <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md hover:shadow-lg transition-all">
            <MessageCircle className="mr-2 h-4 w-4" />
            Request Price & Details
          </Button>
        </a>
        <Link to={`/packages/${pkg?.id}`} className="w-full">
          <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
            View Itinerary
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
