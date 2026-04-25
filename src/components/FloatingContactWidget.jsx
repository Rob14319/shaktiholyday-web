
import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const FloatingContactWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // Reappear on route change
  useEffect(() => {
    setIsVisible(true);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground rounded-full p-1.5 shadow-sm transition-colors"
            aria-label="Close contact widget"
          >
            <X size={16} />
          </button>
          
          <div className="flex flex-col gap-3">
            <a href="tel:+919815649468" className="block">
              <Button 
                size="lg" 
                className="rounded-full shadow-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full justify-start px-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </a>
            
            <a href="https://wa.me/919815649468" target="_blank" rel="noopener noreferrer" className="block">
              <Button 
                size="lg" 
                className="rounded-full shadow-lg bg-[#25D366] hover:bg-[#20bd5a] text-white w-full justify-start px-6"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContactWidget;
