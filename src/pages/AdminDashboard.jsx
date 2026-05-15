
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Package, FileText, MessageSquare as MessageSquareQuote, HeartHandshake } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PackagesManagement from '@/components/PackagesManagement.jsx';
import BlogsManagement from '@/components/BlogsManagement.jsx';
import TestimonialsManagement from '@/components/TestimonialsManagement.jsx';
import InquiriesManagement from '@/components/InquiriesManagement.jsx';
import PaymentInfoManagement from '@/components/PaymentInfoManagement.jsx';
import pb from '@/lib/pocketbaseClient';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalBlogs: 0,
    totalTestimonials: 0,
    totalInquiries: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [packages, blogs, testimonials, inquiries] = await Promise.all([
          pb.collection('packages').getList(1, 1, { $autoCancel: false }),
          pb.collection('blogs').getList(1, 1, { $autoCancel: false }),
          pb.collection('testimonials').getList(1, 1, { $autoCancel: false }),
          pb.collection('customized_inquiries').getList(1, 1, { $autoCancel: false })
        ]);
        setStats({
          totalPackages: packages.totalItems,
          totalBlogs: blogs.totalItems,
          totalTestimonials: testimonials.totalItems,
          totalInquiries: inquiries.totalItems
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - ShaktiHolyday</title>
        <meta name="description" content="Manage packages, blog posts, testimonials, and inquiries for ShaktiHolyday" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Packages</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stats.totalPackages}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stats.totalBlogs}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                  <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stats.totalTestimonials}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                  <HeartHandshake className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stats.totalInquiries}</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="inquiries" className="space-y-6">
              <TabsList className="flex flex-wrap gap-2 w-full md:w-auto">
                <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="blogs">Blogs</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                <TabsTrigger value="payment-info">Payment Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="inquiries" className="mt-6">
                <InquiriesManagement />
              </TabsContent>

              <TabsContent value="packages" className="mt-6">
                <PackagesManagement />
              </TabsContent>

              <TabsContent value="blogs" className="mt-6">
                <BlogsManagement />
              </TabsContent>

              <TabsContent value="testimonials" className="mt-6">
                <TestimonialsManagement />
              </TabsContent>

              <TabsContent value="payment-info" className="mt-6">
                <PaymentInfoManagement />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
