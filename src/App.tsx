import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Activities from './pages/Activities';
import Gallery from './pages/Gallery';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './admin/pages/Login';
import AdminDashboard from './admin/pages/Dashboard';
import SiteSettings from './admin/pages/SiteSettings';
import GalleryManager from './admin/pages/GalleryManager';
import EdukasiManager from './admin/pages/EdukasiManager';
import ActivityManager from './admin/pages/ActivityManager';
import DestinationManager from './admin/pages/DestinationManager';
import KontakManager from './admin/pages/KontakManager';

import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { FloatingWhatsAppButton } from './components/WhatsAppButtons';

// Protected Route Component (Renders Outlet for Nested SPA Routing)
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-batik-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-batik-gold"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Layout for Main Website
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    <FloatingWhatsAppButton />
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Main Website Routes */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/about" element={<MainLayout><About /></MainLayout>} />
            <Route path="/activities" element={<MainLayout><Activities /></MainLayout>} />
            <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
            <Route path="/destinations" element={<MainLayout><Destinations /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Nested Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="education" element={<EdukasiManager />} />
              <Route path="activities" element={<ActivityManager />} />
              <Route path="destinations" element={<DestinationManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="contact" element={<KontakManager />} />
              <Route path="settings" element={<SiteSettings />} />
            </Route>
            
            {/* Redirect old Indonesian routes */}
            <Route path="/tentang" element={<Navigate to="/about" replace />} />
            <Route path="/aktivitas" element={<Navigate to="/activities" replace />} />
            <Route path="/galeri" element={<Navigate to="/gallery" replace />} />
            <Route path="/destinasi" element={<Navigate to="/destinations" replace />} />
            <Route path="/kontak" element={<Navigate to="/contact" replace />} />
            
            {/* Redirect old English routes */}
            <Route path="/edukasi" element={<Navigate to="/activities" replace />} />
            <Route path="/edukasi-kegiatan" element={<Navigate to="/activities" replace />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}


