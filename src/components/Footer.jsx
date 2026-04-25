
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle, Twitter, Pin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://horizons-cdn.hostinger.com/2d70781b-12fd-4e83-aaf6-043f024606cc/4fd3775cb2de8a69bfc93da112b5b116.png" 
                alt="ShaktiHolyday logo" 
                className="h-12 w-auto brightness-0 invert"
              />
              <span className="font-serif font-bold text-2xl text-primary">ShaktiHolyday</span>
            </div>
            <p className="text-background/80 leading-relaxed mb-8 max-w-md">
              Embark on a transformative spiritual journey. We specialize in curating sacred pilgrimage tours across India, ensuring a seamless, comfortable, and deeply devotional experience for every seeker.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-[#1877F2] hover:text-white transition-colors duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-[#E4405F] hover:text-white transition-colors duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://pinterest.com/shaktiholy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-[#BD081C] hover:text-white transition-colors duration-300 shadow-sm"
                aria-label="Pinterest"
              >
                <Pin size={18} className="rotate-45" />
              </a>
              <a 
                href="https://x.com/shaktiholy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-white hover:text-black transition-colors duration-300 shadow-sm"
                aria-label="X (Twitter)"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://wa.me/919815649468" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-[#25D366] hover:text-white transition-colors duration-300 shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-primary">Sacred Journeys</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/packages" className="text-background/80 hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  Kedarnath Yatra
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-background/80 hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  Badrinath Darshan
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-background/80 hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  Varanasi Spiritual Tour
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-background/80 hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  Ayodhya Ram Mandir
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/80 hover:text-primary transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-primary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+919815649468" className="text-background/90 hover:text-primary transition-colors block">
                    +91 9815649468
                  </a>
                  <span className="text-background/50 text-sm">Available 24/7 for inquiries</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={20} className="text-[#25D366] mt-0.5 flex-shrink-0" />
                <a href="https://wa.me/919815649468" target="_blank" rel="noopener noreferrer" className="text-background/90 hover:text-[#25D366] transition-colors">
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@shaktiholyday.com" className="text-background/90 hover:text-primary transition-colors">
                  info@shaktiholyday.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/80 leading-relaxed">
                  Chandigarh, India<br />
                  Serving pilgrims nationwide
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} ShaktiHolyday. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-background/60 hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-background/60 hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
