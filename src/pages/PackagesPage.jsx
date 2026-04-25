
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PackageCard from '@/components/PackageCard.jsx';
import { packagesData } from '@/lib/data.js';

const PackagesPage = () => {
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const filteredPackages = packages.filter((pkg) => 
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-16">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by destination, title, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-full border-2 border-border/50 bg-card shadow-sm hover:border-primary/30 focus-visible:ring-primary/20 focus-visible:border-primary transition-all pb-1"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-muted rounded-2xl h-96 animate-pulse border border-border"></div>
                ))}
              </div>
            ) : filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredPackages.map((pkg, index) => (
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
              <div className="text-center py-20 bg-card rounded-3xl shadow-sm border border-border/50">
                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">No Packages Found</h3>
                <p className="text-muted-foreground text-lg mb-6">We couldn't find any journeys matching your search.</p>
                <button onClick={() => setSearchQuery('')} className="text-primary font-medium hover:underline">
                  Clear search terms
                </button>
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
