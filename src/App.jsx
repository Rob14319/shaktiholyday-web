
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import PackagesPage from './pages/PackagesPage.jsx';
import PackageDetailPage from './pages/PackageDetailPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import PayUsPage from './pages/PayUsPage.jsx';
import CustomizedInquiryModal from './components/CustomizedInquiryModal.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/:id" element={<PackageDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/pay-us" element={<PayUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
              <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
              <p className="text-xl text-muted-foreground mb-8">The path you are seeking cannot be found.</p>
              <a href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                Return to Home
              </a>
            </div>
          } />
        </Routes>
        
        {/* Global Modal - appears after 4s on any page */}
        <CustomizedInquiryModal />
        
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;
