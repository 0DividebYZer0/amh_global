export type ProductCategory = 'All' | 'Seeds' | 'Value-Added' | 'By-Products' | 'Digital' | 'Bulk';

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
  payMethod: 'PayFast' | 'EFT';
  status: 'Pending EFT' | 'Paid' | 'Processing' | 'Shipped';
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
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
  platform: 'Jitsi' | 'In-person' | 'Other';
  desc: string;
  published: boolean;
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
