
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';

const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto px-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-card border-none shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-12 flex flex-col items-center text-center relative">
              <Quote className="absolute top-8 left-8 text-primary/10 w-24 h-24 -rotate-12" />
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < current.rating ? 'text-primary fill-primary' : 'text-muted'}`} 
                  />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed mb-8 relative z-10">
                "{current.testimonial_text}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10 bg-background/50 p-4 rounded-2xl border border-border/50">
                {current.image ? (
                  <img 
                    src={pb.files.getUrl(current, current.image, { thumb: '100x100' })} 
                    alt={current.customer_name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary text-primary font-bold text-xl shadow-sm">
                    {current.customer_name.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <h4 className="font-bold text-lg">{current.customer_name}</h4>
                  <p className="text-muted-foreground text-sm mb-1">{current.location}</p>
                  <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full tracking-wide">
                    ✨ Customized Yatra
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-background shadow-md hover:bg-primary hover:text-primary-foreground border-none"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-background shadow-md hover:bg-primary hover:text-primary-foreground border-none"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
};

export default TestimonialCarousel;
