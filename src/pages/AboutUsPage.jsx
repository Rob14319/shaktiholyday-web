
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Compass, Shield, Users, Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingContactWidget from '@/components/FloatingContactWidget.jsx';

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - ShaktiHolyday</title>
        <meta name="description" content="Learn about ShaktiHolyday's mission to provide transformative spiritual journeys and authentic pilgrimage experiences across India." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-24 md:py-32 overflow-hidden bg-primary/10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-sm font-medium tracking-wider uppercase mb-6">
                  Our Story
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
                  Guiding Souls to <br className="hidden md:block" />
                  <span className="text-primary">Sacred Destinations</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  ShaktiHolyday was founded with a singular purpose: to make spiritual travel profound, comfortable, and deeply authentic for every seeker.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Mission & Vision (Zig-Zag Layout) */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80" 
                    alt="Spiritual offering on the Ganges" 
                    className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Compass className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Our Devoted Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A pilgrimage is not merely a vacation; it is a sacred passage. Our mission is to handle all earthly logistics—transportation, accommodation, and guidance—so our pilgrims can focus entirely on their inner journey and divine connection.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We believe that reaching the holy shrines of India should be a seamless experience, accessible to seekers from all walks of life, regardless of age or physical limitation.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="order-2 md:order-1 space-y-6"
                >
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-secondary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Why Seekers Choose Us</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <Shield className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <strong className="text-foreground text-lg block mb-1">Verified & Safe Travel</strong>
                        <span className="text-muted-foreground">We partner exclusively with trusted drivers, hotels, and guides to ensure absolute safety in remote terrains.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Users className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <strong className="text-foreground text-lg block mb-1">Local Spiritual Guides</strong>
                        <span className="text-muted-foreground">Our guides are intimately familiar with local traditions, myths, and the best times for profound darshans.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <Heart className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <div>
                        <strong className="text-foreground text-lg block mb-1">Compassionate Support</strong>
                        <span className="text-muted-foreground">We treat our pilgrims like family, offering 24/7 on-ground assistance and care throughout the entire yatra.</span>
                      </div>
                    </li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="order-1 md:order-2"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80" 
                    alt="Pilgrims at a temple" 
                    className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="py-24 bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-3xl font-serif font-bold mb-8">Reach Out to Our Yatra Specialists</h2>
                <p className="text-lg text-muted-foreground mb-12">
                  Whether you have questions about our itineraries or need a customized pilgrimage plan, our devoted team is here to guide you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-2xl bg-muted/50 border border-border">
                    <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Call Us</h3>
                    <p className="text-muted-foreground mb-4">Available 24/7 for support</p>
                    <a href="tel:+919815649468" className="text-primary font-medium hover:underline">+91 9815649468</a>
                  </div>
                  <div className="p-8 rounded-2xl bg-muted/50 border border-border">
                    <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Email Us</h3>
                    <p className="text-muted-foreground mb-4">For detailed inquiries</p>
                    <a href="mailto:info@shaktiholyday.com" className="text-primary font-medium hover:underline">info@shaktiholyday.com</a>
                  </div>
                  <div className="p-8 rounded-2xl bg-muted/50 border border-border">
                    <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                    <p className="text-muted-foreground mb-4">Headquartered in</p>
                    <span className="text-foreground font-medium">Chandigarh, India</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
        <FloatingContactWidget />
      </div>
    </>
  );
};

export default AboutUsPage;
