import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Multimedia } from './components/Multimedia';
import { Features } from './components/Features';
import { Services, ServiceItem } from './components/Services';
import { Offer } from './components/Offer';
import { Campaign } from './components/Campaign';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { adminApi, AdminUser } from './admin/adminApi';

// Initial fallbacks in case network fetch fails
const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 1,
    name: 'Web Design',
    category: 'Website',
    description: 'Conversion-focused websites designed to make your business look credible and communicate clearly.',
    price: 'Custom Quote',
    availability: 'Available',
    deliverables: ['Responsive Architecture', 'High-Fidelity Wireframes', 'Custom Interactive Components', 'SEO Foundation'],
    badge: 'Core Service',
  },
  {
    id: 2,
    name: 'Digital Branding',
    category: 'Identity',
    description: 'A cohesive visual identity for websites, social media, and marketing materials.',
    price: 'Custom Quote',
    availability: 'Available',
    deliverables: ['Color Harmony System', 'Typographic Hierarchy', 'Logo & Wordmark Kit', 'Social Brand Assets'],
    badge: 'Strategic',
  },
  {
    id: 3,
    name: 'Social Media',
    category: 'Marketing',
    description: 'Consistent digital content and social media direction designed to keep your business visible.',
    price: 'Custom Quote',
    availability: 'Available',
    deliverables: ['Content Strategy Guide', 'Multi-Platform Templates', 'Visual Art Direction', 'Posting Schedule Blueprint'],
    badge: 'Growth',
  },
  {
    id: 4,
    name: 'Digital Starter Package',
    category: 'Bundle',
    description: 'A practical combination of essential digital services for businesses building their online presence.',
    price: '20% OFF Promotional Rate',
    availability: 'Available',
    deliverables: ['Launch Website (1-3 Pages)', 'Foundational Brand Kit', 'Social Launch Mockup Suite', 'Email Template Blueprint'],
    badge: 'Featured Campaign',
  },
];

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);

  // Form Pre-fill & Toast States
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('Digital Starter Package');
  const [promoCodeForInquiry, setPromoCodeForInquiry] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Mode & Authentication State
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return (
      typeof window !== 'undefined' &&
      (window.location.pathname === '/admin' || window.location.hash.startsWith('#admin'))
    );
  });
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => adminApi.getCurrentUser());

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync route / hash for admin page
  useEffect(() => {
    const handleRouteCheck = () => {
      const isAdm = window.location.pathname === '/admin' || window.location.hash.startsWith('#admin');
      setIsAdminMode(isAdm);
    };

    window.addEventListener('hashchange', handleRouteCheck);
    window.addEventListener('popstate', handleRouteCheck);
    return () => {
      window.removeEventListener('hashchange', handleRouteCheck);
      window.removeEventListener('popstate', handleRouteCheck);
    };
  }, []);

  // Verify stored session token on mount
  useEffect(() => {
    if (adminUser) {
      adminApi.verifyToken().then((valid) => {
        if (!valid) {
          setAdminUser(null);
        }
      });
    }
  }, []);

  // Fetch active services dataset
  const fetchServicesData = useCallback(async () => {
    try {
      const res = await fetch('/api/services').catch(() => fetch('/data/services.json'));
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch {
      setServices(INITIAL_SERVICES);
    }
  }, []);

  useEffect(() => {
    fetchServicesData();
  }, [fetchServicesData]);

  // Handle claiming the 20% Starter Package offer
  const handleClaimOffer = () => {
    setSelectedServiceForInquiry('Digital Starter Package');
    setPromoCodeForInquiry('STARTER20');
    showToast('20% OFF Starter Package applied! (Code: STARTER20)');
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServices = () => {
    const servicesElem = document.getElementById('services');
    if (servicesElem) {
      servicesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForInquiry(serviceName);
    showToast(`Selected: ${serviceName}`);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySubmitted = (inquiry: {
    name: string;
    email: string;
    service: string;
    message: string;
    date: string;
  }) => {
    showToast('Inquiry submitted successfully! Our team will contact you shortly.');
  };

  const handleOpenAdmin = () => {
    setIsAdminMode(true);
    window.location.hash = '#admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWebsite = () => {
    setIsAdminMode(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = async () => {
    await adminApi.logout();
    setAdminUser(null);
    showToast('Logged out of administrator session.');
  };

  // ADMIN MODE ROUTING
  if (isAdminMode) {
    if (!adminUser) {
      return (
        <>
          <AdminLogin
            onLoginSuccess={(user) => {
              setAdminUser(user);
              showToast(`Welcome, ${user.displayName}`);
            }}
            onBackToWebsite={handleBackToWebsite}
          />
          <Toast message={toastMessage} />
        </>
      );
    }

    return (
      <>
        <AdminDashboard
          currentUser={adminUser}
          onLogout={handleAdminLogout}
          onBackToWebsite={handleBackToWebsite}
          services={services}
          onRefreshServices={fetchServicesData}
        />
        <Toast message={toastMessage} />
      </>
    );
  }

  // PUBLIC WEBSITE VIEW
  // Ordered: Hero → About → Promotional Video → Features → Services → Offer → Campaign → Contact
  return (
    <div className="min-h-screen bg-[#041238] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      {/* Sticky Navigation Bar with Admin Portal Trigger */}
      <Navbar onClaimOffer={handleClaimOffer} onOpenAdmin={handleOpenAdmin} />

      {/* Main Content Flow */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero
          onExploreServices={handleExploreServices}
          onClaimOffer={handleClaimOffer}
        />

        {/* 2. About Section */}
        <About />

        {/* 3. Promotional Video (immediately after About) */}
        <Multimedia />

        {/* 4. Features Section */}
        <Features onSelectFeatureAction={handleSelectService} />

        {/* 5. Services Section (all services unified in one page) */}
        <Services
          services={services}
          onSelectService={handleSelectService}
          onClaimStarterPackage={handleClaimOffer}
        />

        {/* 6. Offer Section (Digify Starter Package as the main promotional offer) */}
        <Offer onClaimOffer={handleClaimOffer} />

        {/* 7. Campaign Section (Unified Social Media & Email Campaign) */}
        <Campaign
          onClaimOffer={handleClaimOffer}
          onLearnMore={handleExploreServices}
          onCopyNotice={showToast}
        />

        {/* 8. Contact / Inquiry Section */}
        <Contact
          initialService={selectedServiceForInquiry}
          initialPromoCode={promoCodeForInquiry}
          onInquirySubmitted={handleInquirySubmitted}
          onCopyEmailNotice={showToast}
        />
      </main>

      {/* Final Call to Action & Footer with Admin Portal Access */}
      <Footer
        onClaimOffer={handleClaimOffer}
        onExploreServices={handleExploreServices}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* User Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
