
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingContactWidget from '@/components/FloatingContactWidget.jsx';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - ShaktiHolyday</title>
        <meta name="description" content="Privacy Policy for ShaktiHolyday. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-grow py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Privacy Policy</h1>
              <p className="text-muted-foreground mb-12">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

              <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:font-serif prose-headings:text-foreground prose-headings:font-bold">
                <p>
                  At ShaktiHolyday, we are committed to protecting the privacy and security of our pilgrims and website visitors. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our services.
                </p>

                <h2>1. Information We Collect</h2>
                <p>
                  When you inquire about or book a pilgrimage with us, we may collect the following information:
                </p>
                <ul>
                  <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and physical address.</li>
                  <li><strong>Travel Preferences:</strong> Preferred destinations, travel dates, budget, and special requirements (including dietary or accessibility needs).</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, and interaction data when you visit our website.</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>
                  We use the collected information to:
                </p>
                <ul>
                  <li>Process your inquiries and provide customized pilgrimage itineraries.</li>
                  <li>Communicate with you regarding bookings, updates, and support via WhatsApp, email, or phone.</li>
                  <li>Ensure your safety and accommodate special requests during the yatra.</li>
                  <li>Improve our website and service offerings based on user feedback.</li>
                </ul>

                <h2>3. Information Sharing and Disclosure</h2>
                <p>
                  We do not sell or rent your personal information to third parties. We may share necessary details with trusted partners (such as hotels, transport providers, and local guides) strictly for the purpose of fulfilling your travel arrangements. All partners are obligated to maintain the confidentiality of your data.
                </p>

                <h2>4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our database is secured and accessible only by authorized administrative personnel.
                </p>

                <h2>5. Your Rights</h2>
                <p>
                  You have the right to request access to the personal data we hold about you. You may also request corrections to inaccurate data or ask for the deletion of your personal information, subject to legal and contractual obligations.
                </p>

                <h2>6. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices or regulatory requirements. We encourage you to review this page occasionally.
                </p>

                <h2>7. Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p>
                  <strong>Email:</strong> info@shaktiholyday.com<br />
                  <strong>Phone:</strong> +91 9815649468<br />
                  <strong>Address:</strong> Chandigarh, India
                </p>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
        <FloatingContactWidget />
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
