import {
  CartItem,
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
  AffiliatePartner
} from '../types';
import {
  DEFAULT_USER_PROGRESS,
  SEED_SUPPLIERS,
  SEED_EVENTS,
  SEED_ARTICLES,
  SEED_AFFILIATE_PARTNERS
} from '../data/seedData';

// Generic localStorage helper
export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set failed:', e);
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {}
  }
};

// Cart
export const loadCart = (): CartItem[] => {
  return storage.get<CartItem[]>('amh_cart', [
    {
      id: 'p1',
      title: 'Certified Moringa Seeds (PKM-1)',
      price: 250.00,
      qty: 2,
      cat: 'Seeds',
      img: 'https://images.unsplash.com/photo-1574315042781-a675f284c8d5?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p2',
      title: 'Virgin Cold-Pressed Moringa Oil (1L)',
      price: 1100.00,
      qty: 1,
      cat: 'Value-Added',
      img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80'
    }
  ]);
};

export const saveCart = (items: CartItem[]): void => {
  storage.set('amh_cart', items);
};

// Orders
export const loadOrders = (): Order[] => {
  return storage.get<Order[]>('amh_orders', [
    {
      id: 'ord-initial-1',
      invNumber: 'AMH-INV-849201',
      date: '19 Sep 2026',
      name: 'Thabo Mokoena',
      email: 'thabo@gmail.com',
      phone: '+27 82 123 4567',
      address: 'Plot 4, Vaal River Valley, Barkly West',
      items: [
        {
          id: 'p1',
          title: 'Certified Moringa Seeds (PKM-1)',
          price: 250.00,
          qty: 2,
          cat: 'Seeds'
        },
        {
          id: 'p2',
          title: 'Virgin Cold-Pressed Moringa Oil (1L)',
          price: 1100.00,
          qty: 1,
          cat: 'Value-Added'
        }
      ],
      subtotal: 1600.0,
      vat: 240.0,
      total: 1840.0,
      payMethod: 'PayFast',
      status: 'Paid',
      affiliateRef: 'AgriTech-NC'
    }
  ]);
};

export const saveOrders = (orders: Order[]): void => {
  storage.set('amh_orders', orders);
};

// Yields
export const loadYields = (): HarvestYield[] => {
  return storage.get<HarvestYield[]>('amh_yields', [
    {
      id: 'yd-1',
      date: '18 Sep 2026',
      type: 'PKM-1 Raw Seed (Certified)',
      qty: 450,
      moisture: '6.5%',
      notes: 'Harvested from Northern Sector Pivot 2. Cleaned and de-winged.',
      status: 'Quality Cleared'
    },
    {
      id: 'yd-2',
      date: '12 Sep 2026',
      type: 'Whole Shadow-Dried Leaf Flakes',
      qty: 180,
      moisture: '6.8%',
      notes: 'Sub-40°C shade tunnel dried. Vibrant chlorophyll green color.',
      status: 'Quality Cleared'
    }
  ]);
};

export const saveYields = (yields: HarvestYield[]): void => {
  storage.set('amh_yields', yields);
};

// Suppliers KYC
export const loadSuppliers = (defaults: SupplierKYC[] = SEED_SUPPLIERS): SupplierKYC[] => {
  return storage.get<SupplierKYC[]>('amh_suppliers', defaults);
};

export const saveSuppliers = (suppliers: SupplierKYC[]): void => {
  storage.set('amh_suppliers', suppliers);
};

// B2B RFQs
export const loadRfqs = (defaults?: RfqRecord[]): RfqRecord[] => {
  const initialRfqs: RfqRecord[] = [
    {
      id: 'rfq-101',
      date: '2026-09-21',
      productId: 'p4',
      productTitle: 'Cold-Pressed Virgin Oil (25L Commercial Drum)',
      company: 'Cape Botanical Formulations Pty',
      contact: 'Marcelle Du Plessis',
      email: 'marcelle@capebotanicals.co.za',
      phone: '+27 21 880 1200',
      volume: '4 × 25L UN Drums (100 Liters)',
      budget: 'ZAR 70,000 - 80,000',
      destination: 'Stellenbosch Techno Park, Western Cape',
      notes: 'Require batch COA testing fatty acid profile and heavy metal assay for cosmetic export.',
      status: 'Pending Quote'
    }
  ];
  return storage.get<RfqRecord[]>('amh_rfqs', defaults || initialRfqs);
};

export const saveRfqs = (rfqs: RfqRecord[]): void => {
  storage.set('amh_rfqs', rfqs);
};

// Events
export const loadEvents = (defaults: ScheduledEvent[] = SEED_EVENTS): ScheduledEvent[] => {
  return storage.get<ScheduledEvent[]>('amh_events', defaults);
};

export const saveEvents = (events: ScheduledEvent[]): void => {
  storage.set('amh_events', events);
};

// Contributor Apps
export const loadContributorApps = (): ContributorApp[] => {
  return storage.get<ContributorApp[]>('amh_contributors', [
    {
      id: 'ca-1',
      date: '15 Sep 2026',
      type: 'IKS Contributor',
      name: 'Elder M. Sithole',
      contact: 'sithole@community.org',
      region: 'Limpopo Valley',
      area: 'Traditional Botanical Water Purification',
      experience: 'Over 40 years utilizing seed powder flocculation along river tributaries.',
      proposal: 'Documentation of seasonal pod maturation markers for optimum flocculant protein density.',
      consentNotes: 'Oral lore verified by community elder council with open-access attribution.',
      status: 'Approved'
    }
  ]);
};

export const saveContributorApps = (apps: ContributorApp[]): void => {
  storage.set('amh_contributors', apps);
};

// IKS Articles
export const loadIksArticles = (defaults: IksArticle[] = SEED_ARTICLES): IksArticle[] => {
  return storage.get<IksArticle[]>('amh_iks_articles', defaults);
};

export const saveIksArticles = (articles: IksArticle[]): void => {
  storage.set('amh_iks_articles', articles);
};

// Progress
export const loadProgress = (): UserProgress => {
  return storage.get<UserProgress>('amh_user_progress', DEFAULT_USER_PROGRESS);
};

export const saveProgress = (progress: UserProgress): void => {
  storage.set('amh_user_progress', progress);
};

// Auth
export const loadAuth = (): { role: AuthRole; name: string; email: string } => {
  return storage.get<{ role: AuthRole; name: string; email: string }>('amh_auth_session', {
    role: 'student',
    name: 'Thabo Mokoena',
    email: 'thabo@gmail.com'
  });
};

export const saveAuth = (auth: { role: AuthRole; name: string; email: string }): void => {
  storage.set('amh_auth_session', auth);
};

// Event Tickets
export const loadTickets = (): EventTicket[] => {
  return storage.get<EventTicket[]>('amh_event_tickets', [
    {
      ticketId: 'AMH-TKT-2026-8819',
      eventId: 'evt-1',
      eventTitle: 'Live Commercial Cold-Pressing Calibration Masterclass',
      date: '2026-09-28',
      time: '14:00 SAST',
      platformOrLocation: 'Virtual Broadcast · Barkly West Agro-Processing Facility',
      tier: 'Virtual Pass',
      price: 0,
      attendeeName: 'Thabo Mokoena',
      attendeeEmail: 'thabo@gmail.com',
      organization: 'Mokoena Agro Projects',
      issuedAt: '2026-09-22',
      status: 'Confirmed'
    }
  ]);
};

export const saveTickets = (tickets: EventTicket[]): void => {
  storage.set('amh_event_tickets', tickets);
};

// Affiliate Marketing Partners
export const loadAffiliatePartners = (defaults: AffiliatePartner[] = SEED_AFFILIATE_PARTNERS): AffiliatePartner[] => {
  return storage.get<AffiliatePartner[]>('amh_affiliates_v2', defaults);
};

export const saveAffiliatePartners = (partners: AffiliatePartner[]): void => {
  storage.set('amh_affiliates_v2', partners);
};
