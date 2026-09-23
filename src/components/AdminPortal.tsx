import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Calendar,
  Package,
  Receipt,
  BookOpen,
  Truck,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldAlert,
  Video,
  Radio,
  CircleDot,
  HardDrive,
  Globe,
  Building2,
  Shield,
  Settings,
  Play,
  Eye,
  FileText,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import {
  Product,
  CourseModule,
  Order,
  SupplierKYC,
  RfqRecord,
  ScheduledEvent,
  ContributorApp,
  UserAccount,
  IksArticle,
  ProductCategory,
  AuthRole
} from '../types';

interface AdminPortalProps {
  products: Product[];
  orders: Order[];
  suppliers: SupplierKYC[];
  rfqs: RfqRecord[];
  events: ScheduledEvent[];
  contributorApps: ContributorApp[];
  iksArticles: IksArticle[];
  modules: CourseModule[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateEvents: (events: ScheduledEvent[]) => void;
  onUpdateIksArticles: (articles: IksArticle[]) => void;
  onUpdateModules?: (modules: CourseModule[]) => void;
  onUpdateOrders?: (orders: Order[]) => void;
  onViewInvoice?: (order: Order) => void;
  onStartLiveSession?: (event: ScheduledEvent) => void;
  onApproveSupplier: (id: string) => void;
  onRejectSupplier: (id: string) => void;
  onApproveContributor: (id: string) => void;
  onRejectContributor: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  products,
  orders,
  suppliers,
  rfqs,
  events,
  contributorApps,
  iksArticles,
  modules,
  onUpdateProducts,
  onUpdateEvents,
  onUpdateIksArticles,
  onUpdateModules,
  onUpdateOrders,
  onViewInvoice,
  onStartLiveSession,
  onApproveSupplier,
  onRejectSupplier,
  onApproveContributor,
  onRejectContributor,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'people' | 'apps' | 'courses' | 'events' | 'products' | 'orders' | 'iks' | 'procure' | 'rfqs'
  >('overview');

  // People / Users management state
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('amh_users_list');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 'u1', name: 'Thabo Mokoena', email: 'thabo@gmail.com', phone: '+27 82 123 4567', status: 'Active', roles: ['student'] },
      { id: 'u2', name: 'David Van Zyl', email: 'grower@vaalriver.co.za', phone: '+27 83 234 5678', status: 'Active', roles: ['student', 'supplier'] },
      { id: 'u3', name: 'Nomsa Khumalo', email: 'nomsa@community.org', phone: '+27 84 345 6789', status: 'Active', roles: ['student', 'contributor'] },
      { id: 'u4', name: 'Global Administrator', email: 'admin@amhglobal.com', phone: '+27 53 831 2000', status: 'Active', roles: ['admin'] }
    ];
  });

  const [userSearch, setUserSearch] = useState('');
  const [selectedHub, setSelectedHub] = useState<'All' | 'Ghana' | 'South Africa' | 'Kenya'>('All');

  // RBAC Permission Matrix state
  type SystemRole = 'admin' | 'farmer' | 'supplier' | 'manufacturer' | 'student' | 'community';

  const [roleMatrix, setRoleMatrix] = useState<Record<SystemRole, {
    storeManage: boolean;
    inventoryAdjust: boolean;
    jitsiSchedule: boolean;
    jitsiRecord: boolean;
    coursesAuthor: boolean;
    ordersClear: boolean;
    kycApprove: boolean;
  }>>({
    admin: { storeManage: true, inventoryAdjust: true, jitsiSchedule: true, jitsiRecord: true, coursesAuthor: true, ordersClear: true, kycApprove: true },
    supplier: { storeManage: false, inventoryAdjust: true, jitsiSchedule: false, jitsiRecord: false, coursesAuthor: false, ordersClear: false, kycApprove: false },
    farmer: { storeManage: false, inventoryAdjust: true, jitsiSchedule: false, jitsiRecord: false, coursesAuthor: false, ordersClear: false, kycApprove: false },
    manufacturer: { storeManage: false, inventoryAdjust: false, jitsiSchedule: false, jitsiRecord: false, coursesAuthor: false, ordersClear: false, kycApprove: false },
    student: { storeManage: false, inventoryAdjust: false, jitsiSchedule: false, jitsiRecord: false, coursesAuthor: false, ordersClear: false, kycApprove: false },
    community: { storeManage: false, inventoryAdjust: false, jitsiSchedule: false, jitsiRecord: false, coursesAuthor: false, ordersClear: false, kycApprove: false }
  });

  // Product Catalog CRUD state
  const [productCatFilter, setProductCatFilter] = useState<string>('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductModal, setNewProductModal] = useState(false);
  const [prodTitle, setProdTitle] = useState('');
  const [prodCat, setProdCat] = useState<Product['cat']>('Value-Added');
  const [prodPrice, setProdPrice] = useState<number>(350);
  const [prodStock, setProdStock] = useState('In Stock (Commercial Reserve)');
  const [prodSpecs, setProdSpecs] = useState('Cold-pressed sub-40°C · 72% Oleic Acid');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImg, setProdImg] = useState('https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800');
  const [prodIsDigital, setProdIsDigital] = useState(false);
  const [prodDownloadName, setProdDownloadName] = useState('');

  // Course Builder & H5P Interactive Activity state
  const [moduleModal, setModuleModal] = useState(false);
  const [editingModule, setEditingModule] = useState<CourseModule | null>(null);
  const [modTitle, setModTitle] = useState('');
  const [modDesc, setModDesc] = useState('');
  const [modDuration, setModDuration] = useState('20 min');
  const [modVideo, setModVideo] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4');
  const [modResource, setModResource] = useState('AMH_Calibration_Manual_2026.pdf');
  const [h5pType, setH5pType] = useState<'quiz' | 'interactive_video' | 'drag_drop' | 'scenario'>('interactive_video');
  const [h5pTimestamp, setH5pTimestamp] = useState<number>(120);
  const [h5pQuestion, setH5pQuestion] = useState('What maximum cylinder temperature preserves cold-pressed Moringa oleifera antioxidants?');
  const [h5pChoices, setH5pChoices] = useState<string[]>([
    'Keep below 40.0°C with regulated mechanical screw torque',
    'Exceed 85.0°C to accelerate total volume throughput',
    'Add chemical solvents to increase extraction yield',
    'Operate at ambient temperature with open unfiltered hoppers'
  ]);
  const [h5pCorrectIndex, setH5pCorrectIndex] = useState<number>(0);
  const [h5pGuidance, setH5pGuidance] = useState('High heat denatures behenic acid polymers and degrades volatile polyphenol chains.');
  const [h5pSuccessFeedback, setH5pSuccessFeedback] = useState('Verified: Sub-40°C mechanical pressing retains 99.4% bioactive sterols.');

  // New Event Form State with Jitsi Scheduling & Cloud Recording
  const [newEventModal, setNewEventModal] = useState(false);
  const [evTitle, setEvTitle] = useState('');
  const [evDate, setEvDate] = useState('2026-10-15');
  const [evTime, setEvTime] = useState('14:00 SAST');
  const [evDuration, setEvDuration] = useState(90);
  const [evRoom, setEvRoom] = useState('AMH-Summit-Masterclass');
  const [evSeats, setEvSeats] = useState(60);
  const [evPlatform, setEvPlatform] = useState<'Jitsi' | 'Hybrid' | 'In-person'>('Jitsi');
  const [evHost, setEvHost] = useState('Dr. K. Dlamini (Lead Agronomist)');
  const [evHub, setEvHub] = useState<'All' | 'Ghana' | 'South Africa' | 'Kenya'>('South Africa');
  const [evRecordingMode, setEvRecordingMode] = useState<'Cloud JaaS' | 'Jibri S3' | 'Disabled'>('Cloud JaaS');
  const [evReplayUrl, setEvReplayUrl] = useState('');
  const [evDesc, setEvDesc] = useState('');

  // New Article Form State
  const [newArticleModal, setNewArticleModal] = useState(false);
  const [artTitle, setArtTitle] = useState('');
  const [artAuthor, setArtAuthor] = useState('AMH Global Botanical Council');
  const [artCategory, setArtCategory] = useState('Traditional Cultivation');
  const [artExcerpt, setArtExcerpt] = useState('');
  const [artContent, setArtContent] = useState('');

  // Save users to localStorage
  const saveUsers = (updated: UserAccount[]) => {
    setUsers(updated);
    localStorage.setItem('amh_users_list', JSON.stringify(updated));
  };

  const pendingAppsCount =
    suppliers.filter((s) => s.status === 'KYC Verification Pending').length +
    contributorApps.filter((a) => a.status === 'Pending').length;

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Product Management CRUD Handlers
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    onUpdateProducts(updated);
    setEditingProduct(null);
    onShowToast(`Updated product: ${editingProduct.title}`);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle.trim()) return;

    const newProd: Product = {
      id: `p-${Date.now()}`,
      title: prodTitle.trim(),
      cat: prodCat,
      price: Number(prodPrice) || 0,
      stock: prodStock.trim(),
      specs: prodSpecs.trim(),
      desc: prodDesc.trim(),
      img: prodImg.trim() || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
      isDigital: prodIsDigital,
      downloadName: prodIsDigital ? (prodDownloadName.trim() || 'AMH_Standard_Technical_Document.pdf') : undefined
    };

    onUpdateProducts([newProd, ...products]);
    setNewProductModal(false);
    setProdTitle('');
    setProdDesc('');
    onShowToast(`Product "${newProd.title}" added to store catalog.`);
  };

  const handleDeleteProduct = (id: string, title: string) => {
    if (confirm(`Remove "${title}" from the active product catalog?`)) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
      onShowToast(`Removed "${title}" from catalog.`);
    }
  };

  const handleToggleProductStock = (id: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const isOutOfStock = p.stock.toLowerCase().includes('out of stock');
        return {
          ...p,
          stock: isOutOfStock ? 'In Stock (Commercial Grade)' : 'Out of Stock (Harvest Allocation Pending)'
        };
      }
      return p;
    });
    onUpdateProducts(updated);
    onShowToast('Updated inventory stock status.');
  };

  // Course Builder & H5P Authoring Handlers
  const handleOpenCreateModule = () => {
    setEditingModule(null);
    setModTitle('');
    setModDesc('');
    setModDuration('25 min');
    setModVideo('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4');
    setModResource('AMH_Calibration_Manual_2026.pdf');
    setH5pType('interactive_video');
    setH5pTimestamp(120);
    setH5pQuestion('What is the maximum screw-press cylinder temperature to maintain raw cold-pressed integrity?');
    setH5pChoices([
      'Maintain sub-40.0°C by throttling torque and coolant jackets',
      'Heat to 90.0°C to maximize oil flow volume',
      'Introduce hexane solvents to dissolve remaining lipid matrix',
      'Bypass filtration membranes to speed up batch packaging'
    ]);
    setH5pCorrectIndex(0);
    setH5pGuidance('Heat denatures the behenic and oleic acid sterols critical to cosmetic grades.');
    setH5pSuccessFeedback('Correct: Sub-40°C mechanical cold pressing maintains bio-active sterols intact.');
    setModuleModal(true);
  };

  const handleOpenEditModule = (mod: CourseModule) => {
    setEditingModule(mod);
    setModTitle(mod.title);
    setModDesc(mod.description);
    setModDuration(mod.duration || '20 min');
    setModVideo(mod.videoSrc || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4');
    setModResource(mod.resource || 'AMH_Document.pdf');
    setH5pType(mod.h5p.type || 'interactive_video');
    setH5pTimestamp(mod.h5p.timestampSeconds || 120);
    setH5pQuestion(mod.h5p.question);
    setH5pChoices([...mod.h5p.choices]);
    setH5pCorrectIndex(mod.h5p.correctIndex);
    setH5pGuidance(mod.h5p.guidance || '');
    setH5pSuccessFeedback(mod.h5p.successFeedback || '');
    setModuleModal(true);
  };

  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modTitle.trim() || !onUpdateModules) return;

    const moduleData: CourseModule = {
      id: editingModule ? editingModule.id : `mod-${Date.now()}`,
      title: modTitle.trim(),
      description: modDesc.trim(),
      duration: modDuration.trim(),
      videoSrc: modVideo.trim(),
      resource: modResource.trim(),
      h5p: {
        type: h5pType,
        timestampSeconds: Number(h5pTimestamp) || 60,
        question: h5pQuestion.trim(),
        choices: h5pChoices.map((c) => c.trim()).filter(Boolean),
        correctIndex: Number(h5pCorrectIndex) || 0,
        guidance: h5pGuidance.trim(),
        successFeedback: h5pSuccessFeedback.trim()
      }
    };

    let updated: CourseModule[];
    if (editingModule) {
      updated = modules.map((m) => (m.id === editingModule.id ? moduleData : m));
    } else {
      updated = [...modules, moduleData];
    }

    onUpdateModules(updated);
    setModuleModal(false);
    onShowToast(`Curriculum module "${moduleData.title}" saved with interactive H5P checkpoint.`);
  };

  const handleDeleteModule = (id: string, title: string) => {
    if (!onUpdateModules) return;
    if (confirm(`Delete curriculum module "${title}" and its H5P checkpoint?`)) {
      const updated = modules.filter((m) => m.id !== id);
      onUpdateModules(updated);
      onShowToast(`Module "${title}" removed from curriculum.`);
    }
  };

  // Scheduled Events & Cloud Recording Handlers
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ScheduledEvent = {
      id: `evt-${Date.now()}`,
      title: evTitle.trim(),
      price: 0,
      date: evDate,
      time: evTime,
      durationMinutes: Number(evDuration) || 90,
      seats: Number(evSeats),
      room: evRoom.trim() || 'AMH-Live-Class',
      platform: evPlatform,
      category: 'Live Training',
      hostName: evHost.trim(),
      tenantHub: evHub,
      recordingMode: evRecordingMode,
      recordingStatus: evRecordingMode !== 'Disabled' ? 'Recording Active' : 'Not Recorded',
      recordingUrl: evReplayUrl.trim() || undefined,
      desc: evDesc.trim(),
      published: true
    };
    onUpdateEvents([created, ...events]);
    setNewEventModal(false);
    setEvTitle('');
    setEvDesc('');
    setEvReplayUrl('');
    onShowToast(`Scheduled live session with ${evRecordingMode} cloud recording.`);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (confirm(`Cancel and remove scheduled event "${title}"?`)) {
      const updated = events.filter((e) => e.id !== id);
      onUpdateEvents(updated);
      onShowToast(`Cancelled event: ${title}`);
    }
  };

  const handleToggleRolePermission = (role: SystemRole, key: keyof typeof roleMatrix['admin']) => {
    setRoleMatrix((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [key]: !prev[role][key]
      }
    }));
    onShowToast(`Updated RBAC permissions for role: ${role}`);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const created: IksArticle = {
      id: `i-${Date.now()}`,
      title: artTitle.trim(),
      date: new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: artAuthor.trim(),
      category: artCategory,
      excerpt: artExcerpt.trim(),
      content: artContent.trim()
    };
    onUpdateIksArticles([created, ...iksArticles]);
    setNewArticleModal(false);
    setArtTitle('');
    setArtExcerpt('');
    setArtContent('');
    onShowToast('IKS botanical article published to open-access hub.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Multi-Tenant Control Hub */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Enterprise Multi-Tenant Control System
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AMH Platform Manager</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Unified administration for Multi-Tenant Hubs, RBAC roles, H5P interactive courses, Jitsi cloud recordings, and store catalog.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setNewProductModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
            <button
              onClick={() => setNewEventModal(true)}
              className="px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Summit</span>
            </button>
            <button
              onClick={handleOpenCreateModule}
              className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Author Course (H5P)</span>
            </button>
            <button
              onClick={() => setNewArticleModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>IKS Article</span>
            </button>
          </div>
        </div>

        {/* Multi-Tenant Operational Hub Selector */}
        <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mr-1">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Tenant Hub:</span>
            </span>
            {(['All', 'Ghana', 'South Africa', 'Kenya'] as const).map((hub) => (
              <button
                key={hub}
                onClick={() => {
                  setSelectedHub(hub);
                  onShowToast(`Operational tenant hub switched to: ${hub}`);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedHub === hub
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{hub === 'All' ? 'Pan-African (All Hubs)' : `${hub} Hub`}</span>
              </button>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
            {selectedHub === 'Ghana' && 'Ghana Hub · Tema Port Export Maritime Corridor · GHS / USD Settlement'}
            {selectedHub === 'South Africa' && 'South Africa HQ · Barkly West Extraction Facility & Durban Port · ZAR Settlement'}
            {selectedHub === 'Kenya' && 'Kenya Hub · Nairobi Agronomy & Mombasa Trade Corridor · USD Settlement'}
            {selectedHub === 'All' && 'Pan-African Unified Ledger · Multi-Hub Synchronized'}
          </div>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Registered Users</span>
          <span className="text-xl font-bold font-mono text-slate-900 block mt-1">{users.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Pending Apps</span>
          <span className="text-xl font-bold font-mono text-amber-700 block mt-1">{pendingAppsCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Store Products</span>
          <span className="text-xl font-bold font-mono text-slate-900 block mt-1">{products.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">B2B Orders Logged</span>
          <span className="text-xl font-bold font-mono text-slate-900 block mt-1">{orders.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Gross Sales Value</span>
          <span className="text-xl font-bold font-mono text-emerald-800 block mt-1">
            R {totalRevenue.toFixed(0)}
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto text-xs font-bold gap-6">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'people', label: `People & Roles (${users.length})` },
          { id: 'apps', label: `Applications (${pendingAppsCount})` },
          { id: 'courses', label: 'Courses & Lessons' },
          { id: 'events', label: `Live Classes (${events.length})` },
          { id: 'products', label: `Products (${products.length})` },
          { id: 'orders', label: `Orders (${orders.length})` },
          { id: 'iks', label: `IKS Hub (${iksArticles.length})` },
          { id: 'procure', label: `Suppliers (${suppliers.length})` },
          { id: 'rfqs', label: `B2B RFQs (${rfqs.length})` }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`pb-3 whitespace-nowrap transition-colors border-b-2 ${
              activeTab === t.id
                ? 'border-emerald-800 text-emerald-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panes */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Urgent Attention Box */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>Pending Approvals & Verification</span>
            </h3>

            {pendingAppsCount === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                All supplier KYC and IKS applications are up to date.
              </div>
            ) : (
              <div className="space-y-3">
                {suppliers
                  .filter((s) => s.status === 'KYC Verification Pending')
                  .map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{s.farmName}</span>
                        <span className="text-slate-500">
                          Outgrower KYC · {s.hectares} Ha in {s.province}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onApproveSupplier(s.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onRejectSupplier(s.id)}
                          className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 font-bold transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}

                {contributorApps
                  .filter((a) => a.status === 'Pending')
                  .map((a) => (
                    <div
                      key={a.id}
                      className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{a.name}</span>
                        <span className="text-slate-500">
                          IKS Contributor · {a.area} ({a.region})
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onApproveContributor(a.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onRejectContributor(a.id)}
                          className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 font-bold transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">Commercial Operations Summary</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">MoringaBarklyWest Agro-Processing</span>
                  <span className="text-slate-500">Operational node: Vaaloewer Agricultural Estate</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  Online & Active
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">PayFast Merchant Gateway</span>
                  <span className="text-slate-500">Merchant ID 10000100 (PCI-DSS Cleared)</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  Connected
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Jitsi Live Classroom Rooms</span>
                  <span className="text-slate-500">Scheduled: {events.length} Live Masterclasses</span>
                </div>
                <button
                  onClick={() => setActiveTab('events')}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Manage Sessions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* People & Roles Tab */}
      {activeTab === 'people' && (
        <div className="space-y-6">
          {/* RBAC Role-Based Access Control Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-700" />
                  <span>Granular Role-Based Access Control (RBAC) Matrix</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Enforces least-privilege operational authority across Outgrowers, B2B Manufacturers, LMS Students, and Platform Administrators.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                5 Roles Configured · Real-time Enforcement
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 font-bold">Role Title</th>
                    <th className="py-3 px-2 font-bold text-center">Store Catalog</th>
                    <th className="py-3 px-2 font-bold text-center">Inventory Stock</th>
                    <th className="py-3 px-2 font-bold text-center">Jitsi Schedule</th>
                    <th className="py-3 px-2 font-bold text-center">Cloud Rec</th>
                    <th className="py-3 px-2 font-bold text-center">Course & H5P</th>
                    <th className="py-3 px-2 font-bold text-center">Orders & VAT</th>
                    <th className="py-3 px-2 font-bold text-center">KYC Approve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { role: 'admin' as SystemRole, label: 'Global Administrator', badge: 'bg-red-100 text-red-800' },
                    { role: 'farmer' as SystemRole, label: 'Outgrower / Farmer', badge: 'bg-emerald-100 text-emerald-800' },
                    { role: 'supplier' as SystemRole, label: 'Raw Herb Supplier', badge: 'bg-teal-100 text-teal-800' },
                    { role: 'manufacturer' as SystemRole, label: 'B2B Manufacturer', badge: 'bg-amber-100 text-amber-800' },
                    { role: 'student' as SystemRole, label: 'Academy Student', badge: 'bg-sky-100 text-sky-800' },
                    { role: 'community' as SystemRole, label: 'IKS Elder / Community', badge: 'bg-rose-100 text-rose-800' }
                  ].map((r) => {
                    const p = roleMatrix[r.role] || roleMatrix.admin;
                    return (
                      <tr key={r.role} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 block">{r.label}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase mt-0.5 inline-block ${r.badge}`}>
                            {r.role}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => handleToggleRolePermission(r.role, 'storeManage')}
                            className={`p-1 rounded-md transition-all ${
                              p.storeManage ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                            title="Manage Store Catalog & Pricing"
                          >
                            <Check className={`w-3.5 h-3.5 ${p.storeManage ? 'opacity-100' : 'opacity-20'}`} />
                          </button>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => handleToggleRolePermission(r.role, 'inventoryAdjust')}
                            className={`p-1 rounded-md transition-all ${
                              p.inventoryAdjust ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                            title="Adjust Harvest Stocks & Reserved Lots"
                          >
                            <Check className={`w-3.5 h-3.5 ${p.inventoryAdjust ? 'opacity-100' : 'opacity-20'}`} />
                          </button>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => handleToggleRolePermission(r.role, 'jitsiSchedule')}
                            className={`p-1 rounded-md transition-all ${
                              p.jitsiSchedule ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                            title="Schedule Jitsi Masterclasses & Summits"
                          >
                            <Check className={`w-3.5 h-3.5 ${p.jitsiSchedule ? 'opacity-100' : 'opacity-20'}`} />
                          </button>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => handleToggleRolePermission(r.role, 'jitsiRecord')}
                            className={`p-1 rounded-md transition-all ${
                              p.jitsiRecord ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                            title="Trigger Cloud JaaS / S3 Meeting Recording"
                          >
                            <Check className={`w-3.5 h-3.5 ${p.jitsiRecord ? 'opacity-100' : 'opacity-20'}`} />
                          </button>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => handleToggleRolePermission(r.role, 'coursesAuthor')}
                            className={`p-1 rounded-md transition-all ${
                              p.coursesAuthor ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                            title="Author Course Modules & H5P Checkpoints"
                          >
                            <Check className={`w-3.5 h-3.5 ${p.coursesAuthor ? 'opacity-100' : 'opacity-20'}`} />
                          </button>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => handleToggleRolePermission(r.role, 'ordersClear')}
                            className={`p-1 rounded-md transition-all ${
                              p.ordersClear ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                            title="Clear B2B Orders & Issue Pro-Forma VAT Invoices"
                          >
                            <Check className={`w-3.5 h-3.5 ${p.ordersClear ? 'opacity-100' : 'opacity-20'}`} />
                          </button>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => handleToggleRolePermission(r.role, 'kycApprove')}
                            className={`p-1 rounded-md transition-all ${
                              p.kycApprove ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                            title="Verify and Approve Outgrower KYC Documents"
                          >
                            <Check className={`w-3.5 h-3.5 ${p.kycApprove ? 'opacity-100' : 'opacity-20'}`} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Accounts List */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">User Account Registry</h3>
                <p className="text-xs text-slate-500">
                  Users can simultaneously hold multi-tenant roles across farming, processing, and academy learning.
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Name</th>
                    <th className="py-3 px-4 font-bold">Email</th>
                    <th className="py-3 px-4 font-bold">Phone</th>
                    <th className="py-3 px-4 font-bold">Assigned Roles</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users
                    .filter((u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                    .map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                        <td className="py-3 px-4 text-slate-600">{u.email}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{u.phone || 'N/A'}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {u.roles.map((r) => (
                              <span
                                key={r}
                                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold uppercase"
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === 'apps' && (
        <div className="space-y-6">
          {/* Outgrower KYC */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Outgrower Supplier KYC Inbound</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Date</th>
                    <th className="py-3 px-4 font-bold">Farm / Representative</th>
                    <th className="py-3 px-4 font-bold">Location</th>
                    <th className="py-3 px-4 font-bold">Hectares</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {suppliers.map((s) => (
                    <tr key={s.id}>
                      <td className="py-3 px-4 text-slate-500 font-mono">{s.date}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {s.farmName}
                        <span className="block text-[11px] text-slate-500 font-normal">
                          {s.representative} ({s.email})
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{s.province}</td>
                      <td className="py-3 px-4 font-mono">{s.hectares} Ha</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : s.status === 'Rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {s.status === 'KYC Verification Pending' && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => onApproveSupplier(s.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-bold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => onRejectSupplier(s.id)}
                              className="px-2.5 py-1 rounded-lg border border-red-300 text-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* IKS Contributor Proposals */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">IKS Knowledge Contributor Inbound</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Date</th>
                    <th className="py-3 px-4 font-bold">Elder / Author</th>
                    <th className="py-3 px-4 font-bold">Field Topic</th>
                    <th className="py-3 px-4 font-bold">Region</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contributorApps.map((a) => (
                    <tr key={a.id}>
                      <td className="py-3 px-4 text-slate-500 font-mono">{a.date}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {a.name}
                        <span className="block text-[11px] text-slate-500 font-normal">{a.contact}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{a.area}</td>
                      <td className="py-3 px-4 text-slate-600">{a.region}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            a.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : a.status === 'Rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {a.status === 'Pending' && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => onApproveContributor(a.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-bold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => onRejectContributor(a.id)}
                              className="px-2.5 py-1 rounded-lg border border-red-300 text-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Courses & Lessons Tab with H5P Authoring Studio */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-700" />
                <span>Masterclass Curriculum & Interactive H5P Authoring Studio</span>
              </h3>
              <p className="text-xs text-slate-500">
                {modules.length} Modules configured with interactive video checkpoints, agronomy problem scenarios, and instant feedback.
              </p>
            </div>
            <button
              onClick={handleOpenCreateModule}
              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Module (H5P)</span>
            </button>
          </div>

          <div className="space-y-4">
            {modules.map((m, idx) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-900 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">{m.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-2 font-mono">
                        <span className="bg-slate-200/60 px-2 py-0.5 rounded text-slate-700 font-semibold">{m.duration || 'Self-Paced'}</span>
                        {m.resource && (
                          <span className="text-slate-600 flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5 text-purple-600" />
                            {m.resource}
                          </span>
                        )}
                        {m.videoSrc && (
                          <span className="text-slate-600 flex items-center gap-1">
                            <Video className="w-3.5 h-3.5 text-sky-600" />
                            Stream Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenEditModule(m)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 hover:border-purple-500 bg-white text-slate-700 hover:text-purple-900 text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>Edit Module</span>
                    </button>
                    <button
                      onClick={() => handleDeleteModule(m.id, m.title)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:border-red-300 bg-white text-slate-400 hover:text-red-700 transition-all"
                      title="Delete Module"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* H5P Interactive Activity Inspector Card */}
                <div className="p-3.5 rounded-xl bg-white border border-purple-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-purple-900 flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      H5P Activity: {m.h5p.type === 'interactive_video' ? 'Interactive Video Checkpoint' : m.h5p.type === 'scenario' ? 'Decision Tree Scenario' : 'Knowledge Checkpoint'}
                    </span>
                    <span className="font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      Trigger at {m.h5p.timestampSeconds || 60}s
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800">
                    Q: {m.h5p.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {m.h5p.choices.map((choice, cIdx) => (
                      <div
                        key={cIdx}
                        className={`p-2 rounded-lg text-[11px] flex items-start gap-2 border ${
                          cIdx === m.h5p.correctIndex
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                          cIdx === m.h5p.correctIndex ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                        }`}>
                          {String.fromCharCode(65 + cIdx)}
                        </span>
                        <span>{choice}</span>
                      </div>
                    ))}
                  </div>
                  {m.h5p.guidance && (
                    <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100">
                      Remediation Hint: {m.h5p.guidance}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Classes & Jitsi Summits with Cloud Recording */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-red-600" />
                <span>Scheduled Masterclasses & Live Jitsi Summits</span>
              </h3>
              <p className="text-xs text-slate-500">
                Integrated Jitsi Live Classroom engine with Cloud JaaS / S3 Recording telemetry and student archive linkage.
              </p>
            </div>
            <button
              onClick={() => setNewEventModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Live Summit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((e) => (
              <div
                key={e.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-3.5 flex flex-col justify-between text-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[10px] flex items-center gap-1">
                        <Radio className="w-3 h-3 text-red-600" />
                        {e.platform} Room
                      </span>
                      {e.tenantHub && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold text-[10px]">
                          {e.tenantHub} Hub
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-slate-500 font-semibold">{e.date} · {e.time}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{e.title}</h4>
                    <p className="text-slate-500 mt-1 line-clamp-2 leading-relaxed">{e.desc}</p>
                  </div>

                  <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200/80 text-[11px]">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Lead Agronomist / Host:</span>
                      <span className="font-bold text-slate-900">{e.hostName || 'Dr. K. Dlamini'}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Virtual Room ID:</span>
                      <span className="font-mono text-emerald-800 font-bold">{e.room}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Cloud Recording Mode:</span>
                      <span className="font-bold text-red-700 flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        {e.recordingMode || 'Cloud JaaS (Enabled)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onStartLiveSession?.(e)}
                    className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    title="Launch session in Moderator Recording mode"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Launch & Record</span>
                  </button>

                  {e.recordingUrl ? (
                    <a
                      href={e.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 text-sky-700" />
                      <span>Replay</span>
                    </a>
                  ) : null}

                  <button
                    onClick={() => handleDeleteEvent(e.id, e.title)}
                    className="p-2 rounded-xl border border-slate-200 hover:border-red-300 bg-white text-slate-400 hover:text-red-700 transition-colors"
                    title="Cancel Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products & Inventory Tab with Catalog CRUD */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-700" />
                <span>Store Product Catalog & Inventory Management</span>
              </h3>
              <p className="text-xs text-slate-500">
                Configure botanical goods, wholesale seed oil drums, certified seed lots, and digital manuals.
              </p>
            </div>
            <button
              onClick={() => setNewProductModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Seeds', 'Value-Added', 'By-Products', 'Digital', 'Bulk'].map((cat) => (
              <button
                key={cat}
                onClick={() => setProductCatFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  productCatFilter === cat
                    ? 'bg-emerald-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Product Item</th>
                  <th className="py-3 px-4 font-bold">Category</th>
                  <th className="py-3 px-4 font-bold">Price (ZAR)</th>
                  <th className="py-3 px-4 font-bold">Stock & Reserved Lot</th>
                  <th className="py-3 px-4 font-bold">Type</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products
                  .filter((p) => productCatFilter === 'All' || p.cat === productCatFilter)
                  .map((p) => {
                    const isOutOfStock = p.stock.toLowerCase().includes('out of stock');
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.img}
                              alt={p.title}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <span className="font-bold text-slate-900 block">{p.title}</span>
                              <span className="text-[11px] text-slate-500 font-mono line-clamp-1">{p.specs}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                            {p.cat}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                          R {p.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isOutOfStock ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {p.stock}
                            </span>
                            <button
                              onClick={() => handleToggleProductStock(p.id)}
                              className="text-[10px] text-slate-400 hover:text-slate-700 underline"
                              title="Toggle In-Stock / Out-of-Stock"
                            >
                              Toggle
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-slate-500 text-[11px]">
                            {p.isDigital ? 'Digital PDF' : 'Physical Commodity'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="px-2.5 py-1 rounded-lg border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-900 font-bold transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.title)}
                              className="p-1 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">Orders & Invoices</h3>
            <span className="text-xs text-slate-500">{orders.length} Logged</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Invoice Ref</th>
                  <th className="py-3 px-4 font-bold">Customer</th>
                  <th className="py-3 px-4 font-bold">Payment Method</th>
                  <th className="py-3 px-4 font-bold">Total</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{o.invNumber}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {o.name}
                      <span className="block text-[11px] text-slate-500 font-normal">{o.email}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{o.payMethod}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                      {o.currency && o.currency !== 'ZAR' && o.currencyTotal != null ? (
                        <div>
                          <span>
                            {o.currency === 'GHS' ? 'GH₵' : '$'} {o.currencyTotal.toFixed(2)}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-normal">
                            R {o.total.toFixed(2)} ZAR
                          </span>
                        </div>
                      ) : (
                        <span>R {o.total.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {onViewInvoice && (
                        <button
                          onClick={() => onViewInvoice(o)}
                          className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                        >
                          Invoice
                        </button>
                      )}
                      {o.status !== 'Paid' && onUpdateOrders && (
                        <button
                          onClick={() => {
                            const updated = orders.map((ord) =>
                              ord.id === o.id ? { ...ord, status: 'Paid' as const } : ord
                            );
                            onUpdateOrders(updated);
                            onShowToast(`Order #${o.invNumber} marked as Paid.`);
                          }}
                          className="text-amber-700 hover:text-amber-900 font-bold hover:underline ml-2"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* IKS Hub Management */}
      {activeTab === 'iks' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">Indigenous Knowledge Archive</h3>
            <button
              onClick={() => setNewArticleModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-800 text-white font-bold text-xs"
            >
              Publish Article
            </button>
          </div>

          <div className="space-y-3">
            {iksArticles.map((a) => (
              <div
                key={a.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <span className="text-[11px] text-amber-800 font-bold block">{a.category}</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">{a.title}</h4>
                  <p className="text-slate-500 mt-1 max-w-xl">{a.excerpt}</p>
                  <span className="text-[11px] text-slate-400 mt-2 block font-medium">
                    {a.date} · {a.author}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  Published
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suppliers Procurement Tab */}
      {activeTab === 'procure' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900">Registered Outgrower Farms</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Farm</th>
                  <th className="py-3 px-4 font-bold">Province</th>
                  <th className="py-3 px-4 font-bold">Hectares</th>
                  <th className="py-3 px-4 font-bold">Primary Output</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suppliers.map((s) => (
                  <tr key={s.id}>
                    <td className="py-3 px-4 font-bold text-slate-900">{s.farmName}</td>
                    <td className="py-3 px-4 text-slate-600">{s.province}</td>
                    <td className="py-3 px-4 font-mono">{s.hectares} Ha</td>
                    <td className="py-3 px-4 text-slate-700">{s.crop}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RFQ CRM Tab */}
      {activeTab === 'rfqs' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900">Commercial Wholesale Freight RFQs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Date</th>
                  <th className="py-3 px-4 font-bold">Company / Contact</th>
                  <th className="py-3 px-4 font-bold">Target Item</th>
                  <th className="py-3 px-4 font-bold">Volume</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rfqs.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 px-4 text-slate-500 font-mono">{r.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {r.company}
                      <span className="block text-[11px] text-slate-500 font-normal">
                        {r.contact} ({r.email})
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{r.productTitle}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{r.volume}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h4 className="font-bold text-sm">Edit Catalog Item</h4>
              <button onClick={() => setEditingProduct(null)}>
                <XCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (ZAR)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Status</label>
                  <input
                    type="text"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.desc}
                  onChange={(e) => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                Save Product Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 my-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-700" />
                  <span>Add Product to Store Catalog</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Define physical botanicals, bulk seed oil drums, or digital guides</p>
              </div>
              <button
                onClick={() => setNewProductModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cold-Pressed Moringa Seed Oil (500ml)"
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Category</label>
                  <select
                    value={prodCat}
                    onChange={(e) => setProdCat(e.target.value as Product['cat'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-medium"
                  >
                    <option value="Value-Added">Value-Added</option>
                    <option value="Seeds">Seeds</option>
                    <option value="By-Products">By-Products</option>
                    <option value="Digital">Digital</option>
                    <option value="Bulk">Bulk</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Price (ZAR)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Stock Status String</label>
                  <input
                    type="text"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    placeholder="e.g. In Stock (Commercial Reserve)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Specifications / Grade</label>
                  <input
                    type="text"
                    value={prodSpecs}
                    onChange={(e) => setProdSpecs(e.target.value)}
                    placeholder="e.g. Cold-pressed sub-40°C · 72% Oleic Acid"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Product Image URL</label>
                <input
                  type="url"
                  value={prodImg}
                  onChange={(e) => setProdImg(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-[11px] font-mono"
                />
                <div className="flex gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setProdImg('https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800')}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                  >
                    Preset: Oil Bottle
                  </button>
                  <button
                    type="button"
                    onClick={() => setProdImg('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800')}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                  >
                    Preset: Seed Drum
                  </button>
                  <button
                    type="button"
                    onClick={() => setProdImg('https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800')}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                  >
                    Preset: Leaf Flour
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsDigital}
                    onChange={(e) => setProdIsDigital(e.target.checked)}
                    className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="font-bold text-slate-800">Is this a Digital Download product?</span>
                </label>
                {prodIsDigital && (
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Download Filename (PDF)</label>
                    <input
                      type="text"
                      value={prodDownloadName}
                      onChange={(e) => setProdDownloadName(e.target.value)}
                      placeholder="e.g. AMH_Processing_Guide_2026.pdf"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Comprehensive botanical purity overview, usage recommendations, and laboratory COA details..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewProductModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold shadow-md transition-colors"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Builder & Interactive H5P Authoring Studio Modal */}
      {moduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-5 my-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-700" />
                  <span>{editingModule ? 'Edit Curriculum Module' : 'Create New Curriculum Module (H5P)'}</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Author lesson video, syllabus scope, and an interactive H5P checkpoint</p>
              </div>
              <button
                onClick={() => setModuleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1 text-slate-700">Module Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mechanical Cold-Press Screw Calibration"
                    value={modTitle}
                    onChange={(e) => setModTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Estimated Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="25 min"
                    value={modDuration}
                    onChange={(e) => setModDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Syllabus Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Overview of processing steps, machine calibration, and quality standards..."
                  value={modDesc}
                  onChange={(e) => setModDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Lecture Video / Stream URL</label>
                  <input
                    type="url"
                    required
                    value={modVideo}
                    onChange={(e) => setModVideo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Downloadable Technical Guide</label>
                  <input
                    type="text"
                    value={modResource}
                    onChange={(e) => setModResource(e.target.value)}
                    placeholder="AMH_Calibration_Manual_2026.pdf"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-[11px]"
                  />
                </div>
              </div>

              {/* H5P Interactive Activity Suite Authoring */}
              <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-950 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                    H5P Interactive Checkpoint Suite
                  </span>
                  <span className="text-[10px] text-purple-700 font-semibold bg-purple-100 px-2 py-0.5 rounded-full">
                    Student Gatekeeper Check
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Interaction Type</label>
                    <select
                      value={h5pType}
                      onChange={(e) => setH5pType(e.target.value as any)}
                      className="w-full px-3 py-2 border border-purple-300 rounded-xl bg-white"
                    >
                      <option value="interactive_video">Interactive Video Question</option>
                      <option value="scenario">Agronomy Problem Scenario</option>
                      <option value="quiz">Standard Knowledge Check</option>
                      <option value="drag_drop">Drag-and-Drop Matching</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Trigger Timestamp (Seconds into Video)</label>
                    <input
                      type="number"
                      value={h5pTimestamp}
                      onChange={(e) => setH5pTimestamp(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-purple-300 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Question / Problem Prompt</label>
                  <input
                    type="text"
                    required
                    value={h5pQuestion}
                    onChange={(e) => setH5pQuestion(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-xl font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold text-slate-700">
                    Choices (Select the radio button for the correct answer):
                  </label>
                  {h5pChoices.map((c, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctH5p"
                        checked={h5pCorrectIndex === cIdx}
                        onChange={() => setH5pCorrectIndex(cIdx)}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <input
                        type="text"
                        required
                        value={c}
                        onChange={(e) => {
                          const copy = [...h5pChoices];
                          copy[cIdx] = e.target.value;
                          setH5pChoices(copy);
                        }}
                        className={`flex-1 px-3 py-1.5 border rounded-lg text-xs ${
                          h5pCorrectIndex === cIdx
                            ? 'border-emerald-500 bg-emerald-50/50 font-semibold text-emerald-950'
                            : 'border-slate-300 bg-white'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Pedagogical Guidance / Hint</label>
                    <input
                      type="text"
                      value={h5pGuidance}
                      onChange={(e) => setH5pGuidance(e.target.value)}
                      placeholder="Hint shown if student requests assistance..."
                      className="w-full px-3 py-1.5 border border-purple-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Success Feedback Message</label>
                    <input
                      type="text"
                      value={h5pSuccessFeedback}
                      onChange={(e) => setH5pSuccessFeedback(e.target.value)}
                      placeholder="Verified: Standard achieved..."
                      className="w-full px-3 py-1.5 border border-purple-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModuleModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Curriculum Module</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Live Summit & Jitsi Recording Modal */}
      {newEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 my-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-red-600" />
                  <span>Schedule Masterclass & Summit Broadcast</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Configure live Jitsi room and automated cloud recording archive</p>
              </div>
              <button
                onClick={() => setNewEventModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Summit / Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pan-African Outgrower Harvest Summit & Press Calibration"
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Date</label>
                  <input
                    type="date"
                    required
                    value={evDate}
                    onChange={(e) => setEvDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="14:00 SAST"
                    value={evTime}
                    onChange={(e) => setEvTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Jitsi Room ID</label>
                  <input
                    type="text"
                    required
                    value={evRoom}
                    onChange={(e) => setEvRoom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={evDuration}
                    onChange={(e) => setEvDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Max Seats</label>
                  <input
                    type="number"
                    value={evSeats}
                    onChange={(e) => setEvSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Lead Host / Agronomist</label>
                  <input
                    type="text"
                    required
                    value={evHost}
                    onChange={(e) => setEvHost(e.target.value)}
                    placeholder="e.g. Dr. K. Dlamini"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Operational Hub</label>
                  <select
                    value={evHub}
                    onChange={(e) => setEvHub(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="South Africa">South Africa Hub (Barkly West)</option>
                    <option value="Ghana">Ghana Hub (Tema Port)</option>
                    <option value="Kenya">Kenya Hub (Nairobi)</option>
                    <option value="All">Pan-African (All)</option>
                  </select>
                </div>
              </div>

              {/* Cloud Recording Configuration */}
              <div className="p-3.5 bg-red-50/60 rounded-xl border border-red-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-900 flex items-center gap-1.5 text-xs">
                    <HardDrive className="w-3.5 h-3.5 text-red-600" />
                    Cloud Recording Mode
                  </span>
                  <span className="text-[10px] text-red-700 font-semibold bg-red-100 px-2 py-0.5 rounded-full">
                    Auto-Archives to LMS
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <select
                      value={evRecordingMode}
                      onChange={(e) => setEvRecordingMode(e.target.value as any)}
                      className="w-full px-3 py-1.5 border border-red-300 rounded-lg bg-white text-xs font-semibold"
                    >
                      <option value="Cloud JaaS">Cloud JaaS (Jitsi as a Service S3)</option>
                      <option value="Jibri S3">Self-Hosted Jibri Recorder</option>
                      <option value="Disabled">Recording Disabled</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="url"
                      value={evReplayUrl}
                      onChange={(e) => setEvReplayUrl(e.target.value)}
                      placeholder="Optional pre-existing Replay Video URL..."
                      className="w-full px-3 py-1.5 border border-red-300 rounded-lg text-[11px] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Description / Agenda Scope</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details of live demonstration, machinery used, attendee prerequisites..."
                  value={evDesc}
                  onChange={(e) => setEvDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewEventModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Schedule & Enable Recording</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publish IKS Article Modal */}
      {newArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h4 className="font-bold text-sm">Publish IKS Botanical Article</h4>
              <button onClick={() => setNewArticleModal(false)}>
                <XCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCreateArticle} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Drying Methods in Arid Zones"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Author / Authority</label>
                  <input
                    type="text"
                    required
                    value={artAuthor}
                    onChange={(e) => setArtAuthor(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option>Traditional Cultivation</option>
                    <option>Botanical Water Purification</option>
                    <option>Nutritional Food Heritage</option>
                    <option>Regenerative Agriculture</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Short Excerpt</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary of indigenous knowledge..."
                  value={artExcerpt}
                  onChange={(e) => setArtExcerpt(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Full Content (HTML allowed)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="<p>Full article body with traditional methods...</p>"
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-[11px]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-800 text-white font-bold text-xs"
              >
                Publish to IKS Hub
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
