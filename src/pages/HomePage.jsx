
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Sun, Map, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PackageCard from '@/components/PackageCard.jsx';
import TestimonialCarousel from '@/components/TestimonialCarousel.jsx';
import FloatingContactWidget from '@/components/FloatingContactWidget.jsx';
import pb from '@/lib/pocketbaseClient';
import { packagesData } from '@/lib/data.js';

const HomePage = () => {
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load the first 6 packages for featured section
        setPackages(packagesData.slice(0, 6));

        // Let's also mock testimonials so the section isn't empty
        const mockTestimonials = [
          {
            id: 't1', created: '2026-04-23', customer_name: 'Rahul Sharma', location: 'Delhi',
            testimonial_text: 'Absolutely divine experience. The customized itinerary made our Kedarnath trip seamless.'
          },
          {
            id: 't2', created: '2026-04-23', customer_name: 'Priya Patel', location: 'Mumbai',
            testimonial_text: 'The team handled everything from hotel to darshan perfectly. Highly recommend ShaktiHolyday.'
          },
          {
            id: 't3', created: '2026-04-23', customer_name: 'Amit Singh', location: 'Bangalore',
            testimonial_text: 'Our Varanasi spiritual trip was deeply moving. The guide was extremely knowledgeable.'
          }
        ];
        
        try {
          const testimonialsData = await pb.collection('testimonials').getList(1, 10, {
            sort: '-created', $autoCancel: false
          });
          setTestimonials(testimonialsData.items.length > 0 ? testimonialsData.items : mockTestimonials);
        } catch {
          setTestimonials(mockTestimonials); // fallback
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>ShaktiHolyday - Sacred Pilgrimage Tours & Spiritual Journeys</title>
        <meta name="description" content="Embark on a transformative spiritual journey with ShaktiHolyday. We offer personalized pilgrimage packages to Kedarnath, Badrinath, Varanasi, and sacred destinations across India." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Image & Overlays */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=2000&auto=format&fit=crop"
                alt="Sacred Himalayan Temple Pilgrimage"
                className="w-full h-full object-cover opacity-70 scale-[1.15] transform translate-y-1"
                fetchPriority="high"
              />
              {/* Primary Dark Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply"></div>
              
              {/* Blur Gradient Overlay */}
              <div 
                className="absolute inset-0 backdrop-blur-md"
                style={{ 
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
                }}
              ></div>
              
              {/* Deep Bottom Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            </div>

            {/* Glowing Accent Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{animationDelay: '1s'}}></div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl mx-auto"
              >
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-medium tracking-[0.2em] uppercase mb-8 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                  <Sparkles size={14} className="text-primary" />
                  Awaken Your Spirit
                </motion.span>
                
                <h1 
                  className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight"
                  style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}
                >
                  Customized Journeys to <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb923c] via-[#fcd34d] to-[#fb923c] animate-gradient-x">Divine Destinations</span>
                </h1>
                
                <p 
                  className="text-lg md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                  style={{ textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
                >
                  Experience the profound peace of India's most revered temples with pilgrimage tours elegantly personalized to your devotion.
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                  <Link to="/packages">
                    <Button size="lg" className="text-lg px-8 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white border-none shadow-[0_0_30px_rgba(251,146,60,0.3)] hover:shadow-[0_0_40px_rgba(251,146,60,0.5)] hover:-translate-y-1 transition-all duration-300">
                      Explore Custom Yatras
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                  </Link>
                  <a href="https://wa.me/919815649468" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="text-lg px-8 h-16 rounded-full bg-white/5 backdrop-blur-xl text-white border-white/20 hover:bg-white/10 hover:border-white/40 shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <MessageCircle className="mr-3 text-[#25D366] w-5 h-5" />
                      Request Pricing
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Beautiful scroll indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-white/40 text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
            </motion.div>
          </section>

          {/* Spiritual Essence Section */}
          <section className="py-24 bg-background relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
                  The ShaktiHolyday Experience
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  We believe a pilgrimage is more than a trip—it's a journey of the soul. We handle every earthly detail and customize every aspect so you can focus entirely on the divine.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Heart className="text-primary group-hover:text-primary-foreground w-10 h-10 transition-colors" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">Devotional Care</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our guides understand the spiritual significance of each site, ensuring your journey is respectful, meaningful, and deeply moving.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                    <Map className="text-secondary group-hover:text-secondary-foreground w-10 h-10 transition-colors" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">Seamless Travel</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    From comfortable accommodations tailored to your needs, to safe transport in challenging terrains, we provide a customized, worry-free environment.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <Sun className="text-accent group-hover:text-accent-foreground w-10 h-10 transition-colors" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">Authentic Darshan</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We arrange special pujas, aartis, and darshans, connecting you directly with the ancient traditions and local temple priests.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Pilgrimage Packages Section */}
          <section className="py-24 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="max-w-2xl"
                >
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    Featured Sacred Pilgrimages
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Choose your path to spiritual awakening. Each of our itineraries can be fully customized to match your group size, budget, and devotional needs.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link to="/packages">
                    <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                      View All Custom Yatras
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-card rounded-2xl h-[450px] animate-pulse shadow-sm"></div>
                  ))}
                </div>
              ) : packages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packages.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <PackageCard pkg={pkg} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card rounded-2xl shadow-sm border border-border">
                  <p className="text-muted-foreground text-lg">Sacred journeys are being prepared. Please check back soon.</p>
                </div>
              )}
            </div>
          </section>

          {/* Testimonials Section */}
          {testimonials.length > 0 && (
            <section className="py-24 bg-background relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-3xl"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Pilgrim Stories</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    Voices of the Devoted
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Read about the transformative, personalized experiences of seekers who traveled with ShaktiHolyday.
                  </p>
                </motion.div>

                <TestimonialCarousel testimonials={testimonials} />
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Ready to Customize Your Spiritual Journey?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-10 leading-relaxed">
                Contact our yatra specialists today. We'll help you design the perfect personalized pilgrimage and handle all arrangements for a blessed experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/919815649468" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 h-14 rounded-full shadow-lg hover:scale-105 transition-transform">
                    <MessageCircle className="mr-2" size={20} />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingContactWidget />
      </div>
    </>
  );
};

export default HomePage;
