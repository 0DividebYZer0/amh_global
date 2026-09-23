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
  ShieldAlert
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
  IksArticle
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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newEventModal, setNewEventModal] = useState(false);
  const [newArticleModal, setNewArticleModal] = useState(false);

  // New Event Form State
  const [evTitle, setEvTitle] = useState('');
  const [evDate, setEvDate] = useState('2026-10-12');
  const [evTime, setEvTime] = useState('14:00 SAST');
  const [evRoom, setEvRoom] = useState('AMH-Masterclass-Live');
  const [evSeats, setEvSeats] = useState(50);
  const [evDesc, setEvDesc] = useState('');

  // New Article Form State
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

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    onUpdateProducts(updated);
    setEditingProduct(null);
    onShowToast(`Updated product: ${editingProduct.title}`);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ScheduledEvent = {
      id: `evt-${Date.now()}`,
      title: evTitle.trim(),
      price: 0,
      date: evDate,
      time: evTime,
      durationMinutes: 90,
      seats: Number(evSeats),
      room: evRoom.trim() || 'AMH-Live-Class',
      platform: 'Jitsi',
      desc: evDesc.trim(),
      published: true
    };
    onUpdateEvents([created, ...events]);
    setNewEventModal(false);
    setEvTitle('');
    setEvDesc('');
    onShowToast('New live class scheduled and published.');
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
      {/* Top Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Enterprise Control System
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AMH Platform Manager</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Unified management for people, courses, KYC supplier applications, inventory, and B2B orders.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setNewEventModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Class</span>
          </button>
          <button
            onClick={() => setNewArticleModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Publish IKS Article</span>
          </button>
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
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">People & User Permissions</h3>
              <p className="text-xs text-slate-500">
                A student can simultaneously hold outgrower or IKS publishing rights.
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
                  <th className="py-3 px-4 font-bold">Roles</th>
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

      {/* Courses & Lessons Tab */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Masterclass Curriculum: Intensive Processing
              </h3>
              <p className="text-xs text-slate-500">5 Calibration Modules with Interactive H5P Quizzes</p>
            </div>
          </div>

          <div className="space-y-3">
            {modules.map((m, idx) => (
              <div
                key={m.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block text-sm">
                    {idx + 1}. {m.title}
                  </span>
                  <p className="text-slate-500 mt-1 max-w-xl">{m.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                    <span>{m.duration}</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-semibold">
                      Checkpoint: {m.h5p.question.slice(0, 60)}...
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold">
                    Active in LMS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Classes Tab */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900">Scheduled Masterclasses & Seminars</h3>
              <p className="text-xs text-slate-500">Broadcasts via Jitsi live room engine</p>
            </div>
            <button
              onClick={() => setNewEventModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Class</span>
            </button>
          </div>

          <div className="space-y-3">
            {events.map((e) => (
              <div
                key={e.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[10px]">
                      {e.platform} Room
                    </span>
                    <span className="font-mono text-slate-500">{e.date} · {e.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{e.title}</h4>
                  <p className="text-slate-500 mt-1 max-w-xl">{e.desc}</p>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Room: <strong className="text-slate-700">{e.room}</strong> · Max: {e.seats} Seats
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products & Inventory Tab */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">Product Catalog & Inventory</h3>
            <span className="text-xs text-slate-500">{products.length} Products</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">Product Title</th>
                  <th className="py-3 px-4 font-bold">Category</th>
                  <th className="py-3 px-4 font-bold">Price (ZAR)</th>
                  <th className="py-3 px-4 font-bold">Stock Status</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 px-4 font-bold text-slate-900">{p.title}</td>
                    <td className="py-3 px-4 text-slate-600">{p.cat}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                      R {p.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{p.stock}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="text-emerald-700 hover:text-emerald-900 font-bold"
                      >
                        Edit Item
                      </button>
                    </td>
                  </tr>
                ))}
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
                      R {o.total.toFixed(2)}
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

      {/* Schedule Class Modal */}
      {newEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h4 className="font-bold text-sm">Schedule Masterclass Broadcast</h4>
              <button onClick={() => setNewEventModal(false)}>
                <XCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Live Screw-Press Pressure Calibration"
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={evDate}
                    onChange={(e) => setEvDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="14:00 SAST"
                    value={evTime}
                    onChange={(e) => setEvTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Jitsi Meeting Room</label>
                  <input
                    type="text"
                    required
                    value={evRoom}
                    onChange={(e) => setEvRoom(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Max Seats</label>
                  <input
                    type="number"
                    value={evSeats}
                    onChange={(e) => setEvSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Description / Syllabus Scope</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details of live demonstration, instructor credentials..."
                  value={evDesc}
                  onChange={(e) => setEvDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                Schedule & Broadcast
              </button>
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
