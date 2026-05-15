import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PaymentInfoManagement = () => {
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: ''
  });
  const [qrCodeImage, setQrCodeImage] = useState(null);

  useEffect(() => {
    // Load from localStorage on mount
    const savedDetails = localStorage.getItem('paymentBankDetails');
    if (savedDetails) {
      try {
        setBankDetails(JSON.parse(savedDetails));
      } catch (e) {
        console.error('Failed to parse bank details from localStorage');
      }
    }
    
    const savedQrCode = localStorage.getItem('paymentQrCode');
    if (savedQrCode) {
      setQrCodeImage(savedQrCode);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCodeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeQrCode = () => {
    setQrCodeImage(null);
  };

  const handleSave = () => {
    try {
      localStorage.setItem('paymentBankDetails', JSON.stringify(bankDetails));
      if (qrCodeImage) {
        localStorage.setItem('paymentQrCode', qrCodeImage);
      } else {
        localStorage.removeItem('paymentQrCode');
      }
      toast.success('Payment information saved successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save payment information. Note: Local storage has a size limit.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Update your bank details and QR code displayed on the "Pay Us" page. This data is saved locally in your browser.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bank Name</label>
              <input 
                type="text" 
                name="bankName"
                value={bankDetails.bankName} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                placeholder="e.g. State Bank of India"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Holder Name</label>
              <input 
                type="text" 
                name="accountName"
                value={bankDetails.accountName} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                placeholder="e.g. Shakti HolyDay"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Number</label>
              <input 
                type="text" 
                name="accountNumber"
                value={bankDetails.accountNumber} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                placeholder="Account Number"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">IFSC Code</label>
              <input 
                type="text" 
                name="ifscCode"
                value={bankDetails.ifscCode} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                placeholder="e.g. SBIN0001234"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">UPI ID</label>
              <input 
                type="text" 
                name="upiId"
                value={bankDetails.upiId} 
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                placeholder="e.g. yourname@upi"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-lg font-medium">Payment QR Code</h3>
            
            {qrCodeImage ? (
              <div className="space-y-4">
                <div className="w-48 h-48 border border-border rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                  <img src={qrCodeImage} alt="Payment QR" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>Change Image</span>
                    </Button>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                  <Button variant="destructive" size="sm" onClick={removeQrCode}>
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <label className="w-full max-w-sm h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <span className="text-sm text-muted-foreground mb-2">Click to upload QR code</span>
                <span className="text-xs text-muted-foreground">Supported formats: JPG, PNG, WEBP</span>
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
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Save Payment Information
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInfoManagement;
