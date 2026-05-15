import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, User, CreditCard, Hash, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const PayUsPage = () => {
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    upiId: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeImage, setQrCodeImage] = useState(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        // Try to fetch from PocketBase first
        const records = await pb.collection('packages').getList(1, 1, {
          filter: 'title = "PAYMENT_INFO_CONFIG"',
          $autoCancel: false
        });

        if (records.items.length > 0) {
          const record = records.items[0];
          try {
            const details = JSON.parse(record.description);
            setBankDetails(details);
            
            if (record.images && record.images.length > 0) {
              const url = pb.files.getUrl(record, record.images[0]);
              setQrCodeImage(url);
            }
          } catch (e) {
            console.error('Failed to parse payment details from record');
          }
        } else {
          // Fallback to localStorage if no record in DB
          const savedDetails = localStorage.getItem('paymentBankDetails');
          if (savedDetails) {
            setBankDetails(JSON.parse(savedDetails));
          }
          const savedQrCode = localStorage.getItem('paymentQrCode');
          if (savedQrCode) {
            setQrCodeImage(savedQrCode);
          } else {
            setQrCodeImage(null);
          }
        }
      } catch (error) {
        console.error('Failed to fetch payment info from PocketBase', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentInfo();
  }, []);

  const handleCopy = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${fieldName} copied to clipboard!`, {
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
    });
  };

  return (
    <>
      <Helmet>
        <title>Pay Us - ShaktiHolyday</title>
        <meta name="description" content="Payment information for ShaktiHolyday pilgrimages." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {isLoading && (
              <div className="fixed top-20 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border p-2 rounded-full shadow-lg flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-xs font-medium">Updating...</span>
              </div>
            )}
            
            <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                    Secure Payment
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Please use the details below to complete your payment for your sacred journey.
                  </p>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bank Details Section */}
              <Card className="shadow-lg border-border/50 overflow-hidden">
                <div className="bg-primary/10 px-6 py-4 border-b border-border/50">
                  <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
                    <Building2 className="text-primary" />
                    Bank Transfer Details
                  </h2>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-6">


                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <User size={18} className="text-primary/70" />
                        <span className="font-medium">Account Name</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground text-right">
                          {bankDetails.accountName || 'Not available'}
                        </span>
                        {bankDetails.accountName && (
                          <button onClick={() => handleCopy(bankDetails.accountName, 'Account Name')} className="text-muted-foreground hover:text-primary transition-colors">
                            <Copy size={16} />
                          </button>
                        )}
                      </div>
                    </li>


                  </ul>
                </CardContent>
              </Card>

              {/* QR Code and UPI Section */}
              <div className="space-y-8">
                <Card className="shadow-lg border-border/50 overflow-hidden h-full flex flex-col">
                  <div className="bg-primary/10 px-6 py-4 border-b border-border/50">
                    <h2 className="text-2xl font-serif font-semibold text-center">
                      Scan to Pay
                    </h2>
                  </div>
                  <CardContent className="p-8 flex-grow flex flex-col items-center justify-center">
                    {qrCodeImage ? (
                      <div className="bg-white p-4 rounded-xl shadow-inner border border-muted/50 inline-block mb-6">
                        <img 
                          src={qrCodeImage} 
                          alt="Payment QR Code" 
                          className="w-56 h-56 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-56 h-56 bg-muted rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-border mb-6">
                        <span className="text-muted-foreground text-sm">QR Code not provided</span>
                      </div>
                    )}

                    {bankDetails.upiId && (
                      <div className="w-full text-center">
                        <p className="text-sm text-muted-foreground mb-2">Or pay using UPI ID:</p>
                        <div className="inline-flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-full border border-border">
                          <span className="font-semibold tracking-wide">{bankDetails.upiId}</span>
                          <button onClick={() => handleCopy(bankDetails.upiId, 'UPI ID')} className="text-muted-foreground hover:text-primary transition-colors">
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Payment Partners Logos */}
            <div className="mt-16 text-center">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">Supported Payment Partners</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Google Pay */}
                <img src="/images/packages/Gpay.webp" alt="Google Pay" className="h-10 object-contain hover:scale-110 transition-transform duration-300" />
                
                {/* PhonePe */}
                <img src="/images/packages/PhonePe_Logo.webp" alt="PhonePe" className="h-10 object-contain hover:scale-110 transition-transform duration-300" />

                {/* Paytm */}
                <img src="/images/packages/Paytm logo.webp" alt="Paytm" className="h-10 object-contain hover:scale-110 transition-transform duration-300" />

                {/* UPI Logo */}
                <img src="/images/packages/UPI-Logo.webp" alt="UPI" className="h-10 object-contain hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PayUsPage;
