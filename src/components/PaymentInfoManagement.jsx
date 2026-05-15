import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Save, Trash2, Building2, User, CreditCard, Hash, QrCode } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

const PaymentInfoManagement = () => {
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: ''
  });
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [configRecord, setConfigRecord] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const records = await pb.collection('packages').getList(1, 1, {
          filter: 'title = "PAYMENT_INFO_CONFIG"',
          $autoCancel: false
        });

        if (records.items.length > 0) {
          const record = records.items[0];
          setConfigRecord(record);
          try {
            const details = JSON.parse(record.description);
            setBankDetails(details);
            if (record.images && record.images.length > 0) {
              setQrCodeImage(pb.files.getUrl(record, record.images[0]));
            }
          } catch (e) {
            console.error('Failed to parse payment details from record');
          }
        }
      } catch (error) {
        console.error('Failed to fetch payment info from PocketBase', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrCodeFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeQrCode = () => {
    setQrCodeImage(null);
    setQrCodeFile(null);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', 'PAYMENT_INFO_CONFIG');
      formData.append('description', JSON.stringify(bankDetails));
      formData.append('destination', 'System');
      formData.append('duration', 'N/A');
      formData.append('price', 0);
      formData.append('itinerary', 'Payment configuration data');
      
      if (qrCodeFile) {
        formData.append('images', qrCodeFile);
      }

      if (configRecord) {
        const updated = await pb.collection('packages').update(configRecord.id, formData, { $autoCancel: false });
        setConfigRecord(updated);
      } else {
        const created = await pb.collection('packages').create(formData, { $autoCancel: false });
        setConfigRecord(created);
      }

      toast.success('Payment information saved successfully! It is now live for all users.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save payment information: ' + (error.message || 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Payment Information Management</CardTitle>
        <CardDescription>
          Update your bank details and QR code displayed on the "Pay Us" page. These changes will be visible to all users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Building2 size={16} className="text-primary" /> Bank Name
              </label>
              <input 
                type="text" 
                name="bankName"
                value={bankDetails.bankName} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="e.g. State Bank of India"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User size={16} className="text-primary" /> Account Holder Name
              </label>
              <input 
                type="text" 
                name="accountName"
                value={bankDetails.accountName} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="e.g. Shakti HolyDay"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <CreditCard size={16} className="text-primary" /> Account Number
              </label>
              <input 
                type="text" 
                name="accountNumber"
                value={bankDetails.accountNumber} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="Account Number"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Hash size={16} className="text-primary" /> IFSC Code
              </label>
              <input 
                type="text" 
                name="ifscCode"
                value={bankDetails.ifscCode} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="e.g. SBIN0001234"
              />
            </div>
 
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <QrCode size={16} className="text-primary" /> UPI ID
              </label>
              <input 
                type="text" 
                name="upiId"
                value={bankDetails.upiId} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="e.g. shaktiholyday@okaxis"
              />
            </div>
          </div>
 
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-lg font-medium">Payment QR Code</h3>
            
            {qrCodeImage ? (
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-48 h-48 border border-border rounded-lg overflow-hidden flex items-center justify-center bg-muted shadow-inner">
                  <img src={qrCodeImage} alt="Payment QR" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer">
                    <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                      Change Image
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                  <Button variant="destructive" size="sm" onClick={removeQrCode}>
                    <Trash2 size={16} className="mr-2" />
                    Remove QR Code
                  </Button>
                </div>
              </div>
            ) : (
              <label className="w-full max-w-sm h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all group">
                <QrCode className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary/30 mb-4" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Click to upload QR code</span>
                <span className="text-xs text-muted-foreground mt-1">JPG, PNG, or WEBP formats</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>
            )}
          </div>
          
          <div className="pt-6">
            <Button 
              onClick={handleSave} 
              className="w-full sm:w-auto min-w-[200px]" 
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Payment Information
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInfoManagement;
