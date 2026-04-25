
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PackageCard from '@/components/PackageCard.jsx';
import { packagesData } from '@/lib/data.js';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay for smooth UI transition
    const timer = setTimeout(() => {
      setPackages(packagesData);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Customized Yatras - ShaktiHolyday</title>
        <meta name="description" content="Browse our curated collection of customizable pilgrimage packages to sacred destinations. Let us personalize your spiritual journey." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-grow">
          <div className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                  Customized Spiritual Journeys
                </h1>
                <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                  Explore our foundation itineraries. Every detail—from dates and hotels to specific poojas—can be fully personalized for your group's unique needs.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-muted rounded-2xl h-96 animate-pulse border border-border"></div>
                ))}
              </div>
            ) : packages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <PackageCard pkg={pkg} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl shadow-sm border border-border">
                <p className="text-muted-foreground text-lg font-medium">Sacred journeys are being prepared. Please check back soon.</p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PackagesPage;
