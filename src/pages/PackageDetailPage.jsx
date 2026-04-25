
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft, MessageCircle, Calendar, Shield, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ImageGallery from '@/components/ImageGallery.jsx';
import FloatingContactWidget from '@/components/FloatingContactWidget.jsx';
import { packagesData } from '@/lib/data.js';
import { toast } from 'sonner';

const PackageDetailPage = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network load
    const timer = setTimeout(() => {
      const foundPkg = packagesData.find(p => p.id === id);
      if (foundPkg) {
        setPkg(foundPkg);
      } else {
        console.error('[PackageDetailPage] Failed to find package locally');
        toast.error('Pilgrimage package not found');
      }
      setIsLoading(false);
    }, 400);

    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground font-serif italic">Preparing your sacred journey...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!pkg) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-4">Journey Not Found</h2>
            <p className="text-muted-foreground mb-8">The pilgrimage package you are looking for is currently unavailable or has been removed.</p>
            <Link to="/packages">
              <Button className="rounded-full">View Available Yatras</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const defaultImage = 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1200&h=800&fit=crop';
  
  // Use the images from the package data if available, otherwise fallback to default
  const images = (pkg?.images && pkg.images.length > 0) ? pkg.images : [defaultImage];

  // Parse itinerary text into structured days
  const itineraryLines = pkg.itinerary ? pkg.itinerary.split('\n').filter(line => line.trim()) : [];
  
  const whatsappMessage = encodeURIComponent(`Hi ShaktiHolyday! I'm interested in the ${pkg.title} (${pkg.duration}). Please share customized pricing and details for my group. I'd like to discuss my specific requirements.`);

  return (
    <>
      <Helmet>
        <title>{`${pkg.title} - ShaktiHolyday Pilgrimage`}</title>
        <meta name="description" content={pkg.description} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-grow">
          {/* Hero Banner */}
          <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-muted">
            <img 
              src={images[0] || defaultImage} 
              alt={pkg.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('[PackageDetailPage] Hero image failed to load:', e.target.src);
                e.target.src = defaultImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
              <div className="max-w-7xl mx-auto">
                <Link to="/packages" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6 text-sm font-medium uppercase tracking-wider">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to All Yatras
                </Link>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight"
                >
                  {pkg.title}
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-wrap items-center gap-6 text-white/90"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    <span className="text-lg">{pkg.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-primary" />
                    <span className="text-lg">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/50 backdrop-blur-sm">
                    <Sparkles size={16} className="text-primary" />
                    <span className="text-sm font-medium">Fully Customizable</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Spiritual Significance */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-3xl font-serif font-bold mb-6 text-foreground flex items-center gap-3">
                    <Heart className="text-secondary" />
                    Spiritual Significance
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                    <p className="text-xl text-foreground font-medium mb-4">
                      {pkg.description}
                    </p>
                    <p>
                      Embark on a transformative journey to {pkg.destination}, a sacred land where devotion meets divinity. We view this itinerary as a starting point—a canvas that we will personalize to perfectly align with your group's size, spiritual goals, and physical requirements.
                    </p>
                    <p>
                      Our expert guides understand the mythological importance and historical significance of every temple. We customize your daily schedule to ensure your darshans are peaceful and your journey is comfortable, honoring the deeply personal nature of your pilgrimage.
                    </p>
                  </div>
                </motion.section>

                {/* Image Gallery */}
                {images.length > 1 && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-serif font-bold mb-6">Glimpses of the Divine</h2>
                    <ImageGallery images={images} />
                  </motion.section>
                )}

                {/* Itinerary */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="text-3xl font-serif font-bold flex items-center gap-3">
                      <Calendar className="text-primary" />
                      Yatra Itinerary
                    </h2>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                      Can be tailored to your schedule
                    </span>
                  </div>
                  
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
                    {itineraryLines.map((line, index) => {
                      const dayMatch = line.match(/^(Day\s+\d+[:\-])\s*(.*)/i);
                      const dayLabel = dayMatch ? dayMatch[1].replace(/[:\-]$/, '') : `Day ${index + 1}`;
                      const content = dayMatch ? dayMatch[2] : line;

                      return (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-4"
                        >
                          <div className="flex items-center justify-center w-14 h-14 rounded-full border-[6px] border-background bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-primary/50">
                            {index + 1}
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-3xl bg-card border border-primary/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group-hover:border-primary/30">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110"></div>
                            <h3 className="font-serif font-bold text-xl text-primary mb-3 flex items-center gap-2">
                              {dayLabel}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-base">{content}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>
              </div>

              {/* Sidebar / Booking Card */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="sticky top-28 space-y-6"
                >
                  {/* Customization Card */}
                  <div className="bg-card border border-border rounded-3xl p-8 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10"></div>
                    
                    <div className="mb-8">
                      <div className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Tailored Experience</div>
                      <div className="text-3xl font-serif font-bold text-foreground">Customized For You</div>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                        Pricing and final itinerary vary based on your group size, accommodation preferences, and specific travel dates. Contact us to design your perfect journey.
                      </p>
                    </div>

                    <div className="space-y-4 mb-8 bg-muted/50 p-4 rounded-xl">
                      <div className="flex items-center gap-3 text-sm">
                        <Sparkles className="text-primary w-5 h-5" />
                        <span className="font-medium">Personalized daily schedule</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Shield className="text-primary w-5 h-5" />
                        <span className="font-medium">Dedicated spiritual guide</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Heart className="text-primary w-5 h-5" />
                        <span className="font-medium">Accommodations matching your needs</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <a href={`https://wa.me/919815649468?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="block">
                        <Button 
                          className="w-full h-14 text-lg rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md hover:shadow-lg transition-all"
                        >
                          <MessageCircle className="mr-2 h-5 w-5" />
                          Request Price & Details
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Contact Info Card */}
                  <div className="bg-muted rounded-3xl p-8 border border-border">
                    <h3 className="font-serif font-bold text-xl mb-4">Have Questions?</h3>
                    <p className="text-sm text-muted-foreground mb-6">Our yatra specialists are ready to help you plan your journey.</p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <MapPin className="text-primary shrink-0 mt-1" size={18} />
                        <span className="text-sm text-muted-foreground">
                          <strong>Head Office:</strong><br />
                          Chandigarh, India
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingContactWidget />
      </div>
    </>
  );
};

export default PackageDetailPage;
