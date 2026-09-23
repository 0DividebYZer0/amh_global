import React, { useState } from 'react';
import {
  CartItem,
  Product,
  Order,
  HarvestYield,
  SupplierKYC,
  RfqRecord,
  ScheduledEvent,
  ContributorApp,
  IksArticle,
  UserProgress,
  AuthRole,
  EventTicket,
  AffiliatePartner,
  CurrencyCode
} from './types';
import { CurrencyProvider } from './context/CurrencyContext';
import {
  SEED_PRODUCTS,
  SEED_MODULES,
  SEED_EVENTS,
  SEED_ARTICLES,
  SEED_SUPPLIERS,
  SEED_AFFILIATE_PARTNERS
} from './data/seedData';
import {
  loadCart,
  saveCart,
  loadOrders,
  saveOrders,
  loadYields,
  saveYields,
  loadSuppliers,
  saveSuppliers,
  loadRfqs,
  saveRfqs,
  loadEvents,
  saveEvents,
  loadContributorApps,
  saveContributorApps,
  loadIksArticles,
  saveIksArticles,
  loadProgress,
  saveProgress,
  loadAuth,
  saveAuth,
  loadTickets,
  saveTickets,
  loadAffiliatePartners,
  saveAffiliatePartners
} from './utils/storage';

// Modular UI Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StoreSection } from './components/StoreSection';
import { AcademySection } from './components/AcademySection';
import { IksSection } from './components/IksSection';
import { AffiliatesSection } from './components/AffiliatesSection';
import { StudentPortal } from './components/StudentPortal';
import { OutgrowerPortal } from './components/OutgrowerPortal';
import { FarmerPortal } from './components/FarmerPortal';
import { ManufacturerPortal } from './components/ManufacturerPortal';
import { CommunityPortal } from './components/CommunityPortal';
import { RoleDemoBanner } from './components/RoleDemoBanner';
import { AdminPortal } from './components/AdminPortal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PayFastModal } from './components/PayFastModal';
import { ProFormaInvoiceModal } from './components/ProFormaInvoiceModal';
import { RfqModal } from './components/RfqModal';
import { SupplierApplyModal } from './components/SupplierApplyModal';
import { ContributorApplyModal } from './components/ContributorApplyModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { CertificateModal } from './components/CertificateModal';
import { AuthModal } from './components/AuthModal';
import { LmsPlayer } from './components/LmsPlayer';
import { LiveClassroomModal } from './components/LiveClassroomModal';
import { EventTicketingModal } from './components/EventTicketingModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { PlainLanguageProvider } from './context/PlainLanguageContext';

const AppContent: React.FC = () => {
  // Navigation & View Tab
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Core Data States with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => loadCart());
  const [orders, setOrders] = useState<Order[]>(() => loadOrders());
  const [yields, setYields] = useState<HarvestYield[]>(() => loadYields());
  const [suppliers, setSuppliers] = useState<SupplierKYC[]>(() => loadSuppliers(SEED_SUPPLIERS));
  const [rfqs, setRfqs] = useState<RfqRecord[]>(() => loadRfqs());
  const [events, setEvents] = useState<ScheduledEvent[]>(() => loadEvents(SEED_EVENTS));
  const [contributorApps, setContributorApps] = useState<ContributorApp[]>(() => loadContributorApps());
  const [iksArticles, setIksArticles] = useState<IksArticle[]>(() => loadIksArticles(SEED_ARTICLES));
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [auth, setAuth] = useState<{ role: AuthRole; name: string; email: string }>(() => loadAuth());
  const [tickets, setTickets] = useState<EventTicket[]>(() => loadTickets());
  const [affiliatePartners, setAffiliatePartners] = useState<AffiliatePartner[]>(() => loadAffiliatePartners());

  // Modal Visibility States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPayFastOpen, setIsPayFastOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSupplierApplyOpen, setIsSupplierApplyOpen] = useState(false);
  const [isContributorApplyOpen, setIsContributorApplyOpen] = useState(false);
  const [isArticleReaderOpen, setIsArticleReaderOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isLmsPlayerOpen, setIsLmsPlayerOpen] = useState(false);
  const [isLiveClassOpen, setIsLiveClassOpen] = useState(false);
  const [isEventTicketingOpen, setIsEventTicketingOpen] = useState(false);

  // Selected Entities for Modals
  const [selectedRfqProduct, setSelectedRfqProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<IksArticle | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedLiveEvent, setSelectedLiveEvent] = useState<ScheduledEvent | null>(null);
  const [selectedEventForBooking, setSelectedEventForBooking] = useState<ScheduledEvent | null>(null);

  // Global Toast Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  // Cart actions
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        updated = [
          ...prev,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            qty,
            cat: product.cat,
            img: product.img,
            isDigital: product.isDigital
          }
        ];
      }
      saveCart(updated);
      return updated;
    });
    showToast(`Added ${qty}× ${product.title} to shopping basket.`);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      const newQty = item.qty + delta;
      let updated: CartItem[];
      if (newQty <= 0) {
        updated = prev.filter((i) => i.id !== id);
      } else {
        updated = prev.map((i) => (i.id === id ? { ...i, qty: newQty } : i));
      }
      saveCart(updated);
      return updated;
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveCart(updated);
      return updated;
    });
    showToast('Removed item from basket.');
  };

  const handleClearCart = () => {
    setCart([]);
    saveCart([]);
  };

  // Checkout flows
  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      showToast('Your basket is currently empty.');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (orderDetails: {
    name: string;
    email: string;
    phone: string;
    vatNumber: string;
    address: string;
    country: string;
    payMethod: 'PayFast' | 'EFT' | 'MobileMoney' | 'InternationalCard';
    currency: CurrencyCode;
    currencyTotal: number;
    exchangeRate: number;
  }) => {
    setIsCheckoutOpen(false);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const vat = subtotal * 0.15;
    const total = subtotal + vat;
    const invNum = `AMH-INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDate = new Date().toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const formattedAddress = orderDetails.address
      ? `${orderDetails.address}, ${orderDetails.country}`
      : orderDetails.country;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      invNumber: invNum,
      date: orderDate,
      name: orderDetails.name,
      email: orderDetails.email,
      phone: orderDetails.phone,
      vatNumber: orderDetails.vatNumber,
      address: formattedAddress,
      items: [...cart],
      subtotal,
      vat,
      total,
      currency: orderDetails.currency,
      currencyTotal: orderDetails.currencyTotal,
      exchangeRate: orderDetails.exchangeRate,
      payMethod: orderDetails.payMethod,
      status: orderDetails.payMethod === 'EFT' ? 'Pending EFT' : 'Pending Clearance'
    };

    setSelectedOrder(newOrder);

    if (orderDetails.payMethod === 'EFT') {
      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      saveOrders(updatedOrders);
      handleClearCart();
      setIsInvoiceOpen(true);
      showToast(`Pro-Forma Invoice ${invNum} generated in ${orderDetails.currency}.`);
    } else {
      setIsPayFastOpen(true);
    }
  };

  const handlePayFastSuccess = () => {
    if (!selectedOrder) return;
    const paidOrder: Order = {
      ...selectedOrder,
      status: 'Paid'
    };
    const updatedOrders = [paidOrder, ...orders.filter((o) => o.id !== selectedOrder.id)];
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
    setSelectedOrder(paidOrder);
    setIsPayFastOpen(false);
    handleClearCart();
    setIsInvoiceOpen(true);
    const curr = paidOrder.currency || 'ZAR';
    const dispTotal = paidOrder.currencyTotal
      ? paidOrder.currencyTotal.toFixed(2)
      : paidOrder.total.toFixed(2);
    showToast(`Payment of ${curr} ${dispTotal} settled successfully! Official tax invoice generated.`);
  };

  // RFQ Submission
  const handleOpenRfq = (product: Product) => {
    setSelectedRfqProduct(product);
    setIsRfqOpen(true);
  };

  const handleSubmitRfq = (rfqData: {
    productId: string;
    productTitle: string;
    company: string;
    contact: string;
    email: string;
    phone: string;
    volume: string;
    budget: string;
    notes: string;
  }) => {
    const newRecord: RfqRecord = {
      id: `rfq-${Date.now()}`,
      ...rfqData,
      date: new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending Quote'
    };
    const updated = [newRecord, ...rfqs];
    setRfqs(updated);
    saveRfqs(updated);
    setIsRfqOpen(false);
    showToast(`B2B Freight RFQ submitted for ${rfqData.productTitle}. Quotation will follow via email.`);
  };

  // Outgrower Supplier KYC
  const handleSubmitSupplier = (data: {
    farmName: string;
    representative: string;
    email: string;
    phone: string;
    province: string;
    hectares: number;
    crop: string;
    capacityNotes: string;
  }) => {
    const newSupplier: SupplierKYC = {
      id: `sup-${Date.now()}`,
      ...data,
      date: new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'KYC Verification Pending'
    };
    const updated = [newSupplier, ...suppliers];
    setSuppliers(updated);
    saveSuppliers(updated);
    setIsSupplierApplyOpen(false);
    showToast('Outgrower KYC application submitted to AMH Agronomy Board.');
  };

  // Contributor Application
  const handleSubmitContributor = (data: {
    name: string;
    contact: string;
    region: string;
    area: string;
    experience: string;
    proposal: string;
    consentNotes: string;
  }) => {
    const newApp: ContributorApp = {
      id: `app-${Date.now()}`,
      ...data,
      type: 'IKS Contributor',
      date: new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending'
    };
    const updated = [newApp, ...contributorApps];
    setContributorApps(updated);
    saveContributorApps(updated);
    setIsContributorApplyOpen(false);
    showToast('IKS contributor application submitted for council review.');
  };

  // Yield submission
  const handleSubmitYield = (yieldData: {
    type: string;
    qty: number;
    moisture: string;
    notes: string;
  }) => {
    const newYield: HarvestYield = {
      id: `yd-${Date.now()}`,
      ...yieldData,
      date: new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Quality Cleared'
    };
    const updated = [newYield, ...yields];
    setYields(updated);
    saveYields(updated);
    showToast(`Logged ${yieldData.qty} KG harvest yield to procurement ledger.`);
  };

  // LMS Module Completion
  const handleCompleteModule = (moduleIdx: number) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedModules.includes(moduleIdx);
      const completedModules = alreadyDone ? prev.completedModules : [...prev.completedModules, moduleIdx];
      const nextUnlocked = Math.max(prev.highestUnlockedIndex, moduleIdx + 1);
      const isComplete = completedModules.length >= SEED_MODULES.length;
      const progressPercent = Math.round((completedModules.length / SEED_MODULES.length) * 100);

      const nextProgress: UserProgress = {
        ...prev,
        completedModules,
        highestUnlockedIndex: nextUnlocked,
        progressPercent,
        completed: isComplete,
        certId: prev.certId || `AMH-CERT-${Math.floor(10000 + Math.random() * 90000)}`,
        issueDate: prev.issueDate || new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      saveProgress(nextProgress);

      if (isComplete && !prev.completed) {
        showToast('Congratulations! Curriculum completed. Academic certificate unlocked.');
        setIsCertificateOpen(true);
      } else {
        showToast(`Module ${moduleIdx + 1} checkpoint verified.`);
      }

      return nextProgress;
    });
  };

  // Live Classroom attendance logging
  const handleConfirmAttendance = (eventTitle: string) => {
    showToast(`Attendance verified for "${eventTitle}". Recorded to academic transcript.`);
  };

  // Large Text mode for elders & farmers
  const [isLargeText, setIsLargeText] = useState(false);

  // Authentication & Role Switching
  const handleSelectRole = (role: AuthRole, name: string, email: string) => {
    const newAuth = { role, name, email };
    setAuth(newAuth);
    saveAuth(newAuth);

    if (role === 'admin') setCurrentTab('admin');
    else if (role === 'farmer' || role === 'supplier') setCurrentTab('farmer');
    else if (role === 'manufacturer') setCurrentTab('manufacturer');
    else if (role === 'community') setCurrentTab('community');
    else setCurrentTab('student');

    showToast(`Switched workspace to ${name} (${String(role || 'student').toUpperCase()}).`);
  };

  const handleLoginSuccess = (role: AuthRole, name: string, email: string) => {
    const newAuth = { role, name, email };
    setAuth(newAuth);
    saveAuth(newAuth);
    setIsAuthOpen(false);

    if (role === 'admin') setCurrentTab('admin');
    else if (role === 'farmer' || role === 'supplier') setCurrentTab('farmer');
    else if (role === 'manufacturer') setCurrentTab('manufacturer');
    else if (role === 'community') setCurrentTab('community');
    else setCurrentTab('student');

    showToast(`Signed in as ${name} (${String(role || 'student').toUpperCase()}).`);
  };

  const handleLogout = () => {
    const defaultAuth = { role: 'student' as AuthRole, name: 'Thabo Mokoena', email: 'thabo@gmail.com' };
    setAuth(defaultAuth);
    saveAuth(defaultAuth);
    setCurrentTab('home');
    showToast('Signed out of session.');
  };

  // Admin approvals
  const handleApproveSupplier = (id: string) => {
    const updated = suppliers.map((s) => (s.id === id ? { ...s, status: 'Approved' as const } : s));
    setSuppliers(updated);
    saveSuppliers(updated);
    showToast('Outgrower KYC approved.');
  };

  const handleRejectSupplier = (id: string) => {
    const updated = suppliers.map((s) => (s.id === id ? { ...s, status: 'Rejected' as const } : s));
    setSuppliers(updated);
    saveSuppliers(updated);
    showToast('Outgrower KYC rejected.');
  };

  const handleApproveContributor = (id: string) => {
    const updated = contributorApps.map((a) => (a.id === id ? { ...a, status: 'Approved' as const } : a));
    setContributorApps(updated);
    saveContributorApps(updated);
    showToast('IKS contributor approved.');
  };

  const handleRejectContributor = (id: string) => {
    const updated = contributorApps.map((a) => (a.id === id ? { ...a, status: 'Rejected' as const } : a));
    setContributorApps(updated);
    saveContributorApps(updated);
    showToast('IKS contributor rejected.');
  };

  // If LMS Full-Screen Player is active, render it directly
  if (isLmsPlayerOpen) {
    return (
      <>
        <LmsPlayer
          modules={SEED_MODULES}
          progress={progress}
          onBackToPortal={() => setIsLmsPlayerOpen(false)}
          onCompleteModule={handleCompleteModule}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          onShowToast={showToast}
        />
        <CertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
          studentName={auth.name}
          courseTitle="Intensive Moringa Agro-Processing Masterclass"
          certId={progress.certId || 'AMH-CERT-84920'}
          issueDate={progress.issueDate || '2026-09-22'}
        />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-950 ${isLargeText ? 'text-base sm:text-lg leading-relaxed' : ''}`}>
      {/* Primary Global Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cart.reduce((total, item) => total + item.qty, 0)}
        openCart={() => setIsCartOpen(true)}
        currRole={auth.role}
        userName={auth.name}
        openAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onToggleLargeText={() => setIsLargeText(!isLargeText)}
        isLargeText={isLargeText}
      />

      {/* Main Routed Stage */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HeroSection
            onNavigate={setCurrentTab}
            onOpenStore={() => setCurrentTab('store')}
            onOpenAcademy={() => setCurrentTab('academy')}
            onOpenIks={() => setCurrentTab('iks')}
            onOpenSupplier={() => setCurrentTab('farmer')}
          />
        )}

        {currentTab === 'store' && (
          <StoreSection
            products={products}
            onAddToCart={handleAddToCart}
            onOpenRfq={handleOpenRfq}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'academy' && (
          <AcademySection
            modules={SEED_MODULES}
            events={events}
            progress={progress}
            onOpenPlayer={() => setIsLmsPlayerOpen(true)}
            onJoinEvent={(ev) => {
              setSelectedLiveEvent(ev);
              setIsLiveClassOpen(true);
            }}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onBookEventTicket={(ev) => {
              setSelectedEventForBooking(ev);
              setIsEventTicketingOpen(true);
            }}
          />
        )}

        {currentTab === 'iks' && (
          <IksSection
            articles={iksArticles}
            onOpenArticle={(art) => {
              setSelectedArticle(art);
              setIsArticleReaderOpen(true);
            }}
            onOpenContributorModal={() => setIsContributorApplyOpen(true)}
          />
        )}

        {currentTab === 'ecosystem' && (
          <AffiliatesSection
            onOpenSupplierModal={() => setIsSupplierApplyOpen(true)}
            onShowToast={showToast}
            partners={affiliatePartners}
            onRegisterPartner={(newPartner) => {
              setAffiliatePartners((prev) => {
                const updated = [newPartner, ...prev];
                saveAffiliatePartners(updated);
                return updated;
              });
            }}
          />
        )}

        {/* User Role Dashboards */}
        {(currentTab === 'farmer' || currentTab === 'outgrower') && (
          <FarmerPortal
            farmerName={auth.name || 'David Van Zyl'}
            farmName="Vaal River Agro Estates (Plot 14, Barkly West)"
            yields={yields}
            onSubmitYield={handleSubmitYield}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'manufacturer' && (
          <ManufacturerPortal
            companyName="Cape Botanical Formulations (Pty) Ltd"
            contactName={auth.name || 'Marcelle Du Plessis'}
            email={auth.email || 'marcelle@capebotanicals.co.za'}
            orders={orders}
            rfqs={rfqs}
            onOpenRfqModal={() => {
              setSelectedRfqProduct(products[3] || products[0]);
              setIsRfqOpen(true);
            }}
            onViewInvoice={(ord) => {
              setSelectedOrder(ord);
              setIsInvoiceOpen(true);
            }}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'community' && (
          <CommunityPortal
            elderName={auth.name || 'Elder M. Sithole'}
            region="Limpopo & Northern Cape Indigenous Council"
            articles={iksArticles}
            onOpenArticle={(art) => {
              setSelectedArticle(art);
              setIsArticleReaderOpen(true);
            }}
            onSubmitWisdom={(data) => {
              handleSubmitContributor(data);
            }}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'student' && (
          <StudentPortal
            progress={progress}
            modules={SEED_MODULES}
            orders={orders}
            tickets={tickets}
            userName={auth.name}
            userEmail={auth.email}
            onOpenPlayer={() => setIsLmsPlayerOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onViewInvoice={(ord) => {
              setSelectedOrder(ord);
              setIsInvoiceOpen(true);
            }}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPortal
            products={products}
            orders={orders}
            suppliers={suppliers}
            rfqs={rfqs}
            events={events}
            contributorApps={contributorApps}
            iksArticles={iksArticles}
            modules={SEED_MODULES}
            onUpdateProducts={setProducts}
            onUpdateEvents={(evs) => {
              setEvents(evs);
              saveEvents(evs);
            }}
            onUpdateIksArticles={(arts) => {
              setIksArticles(arts);
              saveIksArticles(arts);
            }}
            onApproveSupplier={handleApproveSupplier}
            onRejectSupplier={handleRejectSupplier}
            onApproveContributor={handleApproveContributor}
            onRejectContributor={handleRejectContributor}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        onNavigateToStore={() => {
          setIsCartOpen(false);
          setCurrentTab('store');
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onSubmitOrder={handleCheckoutSubmit}
      />

      <PayFastModal
        isOpen={isPayFastOpen}
        onClose={() => setIsPayFastOpen(false)}
        order={selectedOrder}
        onPaymentSuccess={handlePayFastSuccess}
      />

      <ProFormaInvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={selectedOrder}
      />

      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        product={selectedRfqProduct}
        onSubmitRfq={handleSubmitRfq}
      />

      <SupplierApplyModal
        isOpen={isSupplierApplyOpen}
        onClose={() => setIsSupplierApplyOpen(false)}
        onSubmitSupplier={handleSubmitSupplier}
      />

      <ContributorApplyModal
        isOpen={isContributorApplyOpen}
        onClose={() => setIsContributorApplyOpen(false)}
        onSubmitContributor={handleSubmitContributor}
      />

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => {
          setSelectedArticle(null);
          setIsArticleReaderOpen(false);
        }}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={auth.name}
        courseTitle="Intensive Moringa Agro-Processing Masterclass"
        certId={progress.certId || 'AMH-CERT-84920'}
        issueDate={progress.issueDate || '2026-09-22'}
      />

      <LiveClassroomModal
        isOpen={isLiveClassOpen}
        onClose={() => {
          setSelectedLiveEvent(null);
          setIsLiveClassOpen(false);
        }}
        event={selectedLiveEvent}
        userName={auth.name}
        onConfirmAttendance={handleConfirmAttendance}
      />

      <EventTicketingModal
        isOpen={isEventTicketingOpen}
        onClose={() => {
          setIsEventTicketingOpen(false);
          setSelectedEventForBooking(null);
        }}
        event={selectedEventForBooking}
        userName={auth.name}
        userEmail={auth.email}
        onIssueTicket={(newTicket) => {
          setTickets((prev) => {
            const updated = [newTicket, ...prev];
            saveTickets(updated);
            return updated;
          });
        }}
        onShowToast={showToast}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Global Clean Domain Footer */}
      <Footer
        onNavigate={setCurrentTab}
        onOpenSupplier={() => setCurrentTab('ecosystem')}
        onOpenIks={() => setCurrentTab('iks')}
      />

      {/* Perspective Switcher restricted strictly to authenticated Admin */}
      {auth.role === 'admin' && (
        <RoleDemoBanner
          currentRole={auth.role}
          currentName={auth.name}
          onSelectRole={handleSelectRole}
          onToggleLargeText={() => setIsLargeText(!isLargeText)}
          isLargeText={isLargeText}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PlainLanguageProvider>
      <CurrencyProvider>
        <AppContent />
      </CurrencyProvider>
    </PlainLanguageProvider>
  );
};

export default App;
