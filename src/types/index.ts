export type ProductCategory = 'All' | 'Seeds' | 'Value-Added' | 'By-Products' | 'Digital' | 'Bulk';

export type CurrencyCode = 'ZAR' | 'GHS' | 'USD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  region: string;
  rateAgainstZar: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  cat: 'Seeds' | 'Value-Added' | 'By-Products' | 'Digital' | 'Bulk';
  stock: string;
  specs?: string;
  desc: string;
  img?: string;
  isDigital?: boolean;
  downloadName?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  cat?: string;
  img?: string;
  isDigital?: boolean;
}

export interface H5PCheckpoint {
  type?: 'quiz' | 'interactive_video' | 'drag_drop' | 'scenario';
  timestampSeconds?: number;
  question: string;
  choices: string[];
  correctIndex: number;
  guidance: string;
  successFeedback: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  duration?: string;
  resource?: string;
  h5p: H5PCheckpoint;
}

export interface UserProgress {
  courseId: string;
  title: string;
  completedModules: number[];
  totalModules: number;
  highestUnlockedIndex: number;
  progressPercent: number;
  completed: boolean;
  certIssued: boolean;
  certId: string | null;
  issueDate?: string;
}

export interface IksArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  category?: string;
  img?: string;
}

export interface SupplierKYC {
  id: string;
  date: string;
  farmName: string;
  representative: string;
  email: string;
  phone: string;
  province: string;
  hectares: number;
  crop: string;
  capacityNotes?: string;
  status: 'KYC Verification Pending' | 'Approved' | 'Rejected';
}

export interface HarvestYield {
  id: string;
  date: string;
  supplierName?: string;
  type: string;
  qty: number;
  moisture: string;
  notes?: string;
  status: 'Pending PO' | 'PO Issued' | 'Quality Cleared';
}

export interface Order {
  id: string;
  invNumber: string;
  date: string;
  name: string;
  email: string;
  phone?: string;
  vatNumber?: string;
  address?: string;
  payMethod: 'PayFast' | 'EFT' | 'MobileMoney' | 'InternationalCard';
  status: 'Pending EFT' | 'Pending Clearance' | 'Paid' | 'Processing' | 'Shipped';
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
  currency?: CurrencyCode;
  currencyTotal?: number;
  exchangeRate?: number;
  ref?: string | null;
  affiliateRef?: string;
}

export interface RfqRecord {
  id: string;
  date: string;
  productId: string;
  productTitle: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  volume: string;
  budget: string;
  destination?: string;
  notes: string;
  status: 'Pending Quote' | 'Quoted' | 'In Discussion';
}

export interface ScheduledEvent {
  id: string;
  title: string;
  price: number;
  date: string;
  time: string;
  durationMinutes: number;
  seats: number;
  room: string;
  platform: 'Jitsi' | 'In-person' | 'Hybrid' | 'Other';
  desc: string;
  published: boolean;
  category?: 'Live Training' | 'Bootcamp' | 'Industry Summit' | 'Summit';
  location?: string;
  hostName?: string;
  recordingMode?: 'Cloud JaaS' | 'Jibri S3' | 'Disabled';
  recordingStatus?: 'Not Recorded' | 'Recording Active' | 'Recorded & Archived';
  recordingUrl?: string;
  tenantHub?: 'All' | 'Ghana' | 'South Africa' | 'Kenya';
  ticketTiers?: { name: string; price: number; description: string; availableSeats: number }[];
}

export interface EventTicket {
  ticketId: string;
  eventId: string;
  eventTitle: string;
  date: string;
  time: string;
  platformOrLocation: string;
  tier: string;
  price: number;
  attendeeName: string;
  attendeeEmail: string;
  organization?: string;
  phone?: string;
  issuedAt: string;
  status: 'Confirmed' | 'Checked-in' | 'Cancelled';
}

export interface AffiliatePartner {
  id: string;
  name: string;
  email: string;
  entityName: string;
  partnerName?: string;
  contactPerson?: string;
  phone?: string;
  region?: string;
  referralCode: string;
  tier: 'Tier 1: Promoter' | 'Tier 2: Silver Reseller' | 'Tier 3: Gold Distributor' | 'Tier 1 Reseller' | 'Tier 2 Master Partner';
  commissionRatePct: number;
  commissionRate?: number;
  parentAffiliateId?: string;
  totalClicks: number;
  conversions: number;
  totalSalesValueR: number;
  totalSalesZar?: number;
  earnedCommissionR: number;
  commissionEarnedZar?: number;
  tier2OverrideCommissionR: number;
  activeSubAffiliates?: number;
  availableBalanceR: number;
  payoutMethod: string;
  bankDetails?: string;
  status: 'Active' | 'Pending Review';
}

export interface ContributorApp {
  id: string;
  date: string;
  type: 'IKS Contributor';
  name: string;
  contact: string;
  region: string;
  area: string;
  experience: string;
  proposal: string;
  consentNotes: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reviewedAt?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'Active' | 'Pending' | 'Suspended';
  roles: ('student' | 'supplier' | 'contributor' | 'admin')[];
  notes?: string;
}

export type AuthRole = 'student' | 'farmer' | 'supplier' | 'manufacturer' | 'community' | 'admin' | null;

export interface DemoAccount {
  role: AuthRole;
  name: string;
  email: string;
  pass: string;
  roleLabel: string;
  organization: string;
  description: string;
}
