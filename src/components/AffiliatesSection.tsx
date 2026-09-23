import React, { useState } from 'react';
import {
  Share2,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  Users,
  Truck,
  ArrowRight,
  TrendingUp,
  Award,
  DollarSign,
  Percent,
  Sparkles,
  ShieldCheck,
  Building,
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';
import { AffiliatePartner } from '../types';
import { SEED_AFFILIATE_PARTNERS } from '../data/seedData';

interface AffiliatesSectionProps {
  onOpenSupplierModal: () => void;
  onShowToast: (msg: string) => void;
  partners?: AffiliatePartner[];
  onRegisterPartner?: (partner: AffiliatePartner) => void;
}

export const AffiliatesSection: React.FC<AffiliatesSectionProps> = ({
  onOpenSupplierModal,
  onShowToast,
  partners = SEED_AFFILIATE_PARTNERS,
  onRegisterPartner
}) => {
  const [partnerList, setPartnerList] = useState<AffiliatePartner[]>(partners);
  const [activeTab, setActiveTab] = useState<'tiers' | 'register' | 'calculator' | 'directory'>('tiers');

  // Registration Form State
  const [regEntityName, setRegEntityName] = useState('');
  const [regContactName, setRegContactName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRegion, setRegRegion] = useState('Gauteng & Northern Cape, SA');
  const [regTier, setRegTier] = useState<'Tier 1: Promoter' | 'Tier 2: Silver Reseller' | 'Tier 3: Gold Distributor'>('Tier 2: Silver Reseller');
  const [regChannel, setRegChannel] = useState('Agrovet Shop & Community Network');

  // Custom Affiliate Link Generation
  const [customHandle, setCustomHandle] = useState('AcmeAgroSA');
  const [copiedLink, setCopiedLink] = useState(false);

  // Commission Calculator State
  const [monthlyRetailBottles, setMonthlyRetailBottles] = useState<number>(30); // 100ml / 500ml oil bottles (~R380 avg)
  const [monthlyPowderPouches, setMonthlyPowderPouches] = useState<number>(50); // 500g powder (~R240 avg)
  const [monthlyBulkTons, setMonthlyBulkTons] = useState<number>(1); // 100kg bulk units (~R18,000 avg)

  const referralUrl = `https://amhglobal.com/?ref=${encodeURIComponent(customHandle.trim() || 'Partner')}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralUrl);
    setCopiedLink(true);
    onShowToast('Affiliate referral link copied to clipboard.');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEntityName.trim() || !regEmail.trim()) {
      onShowToast('Please complete all required business information.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `REF-${regEntityName.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, 'AMH')}-${randomSuffix}`;
    const commissionPercent = regTier.includes('Gold') ? 22 : regTier.includes('Silver') ? 15 : 10;

    const newPartner: AffiliatePartner = {
      id: `aff-${Date.now()}`,
      name: regContactName.trim() || regEntityName.trim(),
      entityName: regEntityName.trim(),
      partnerName: regEntityName.trim(),
      contactPerson: regContactName.trim() || regEntityName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      region: regRegion,
      tier: regTier,
      commissionRatePct: commissionPercent,
      commissionRate: commissionPercent,
      referralCode: code,
      totalClicks: 0,
      conversions: 0,
      totalSalesValueR: 0,
      totalSalesZar: 0,
      earnedCommissionR: 0,
      commissionEarnedZar: 0,
      tier2OverrideCommissionR: 0,
      availableBalanceR: 0,
      activeSubAffiliates: 0,
      payoutMethod: 'EFT Direct',
      status: 'Active'
    };

    setPartnerList([newPartner, ...partnerList]);
    if (onRegisterPartner) onRegisterPartner(newPartner);

    setCustomHandle(regEntityName.replace(/\s+/g, ''));
    onShowToast(`Partner registration confirmed! Tracking code ${code} activated.`);
    setActiveTab('directory');
  };

  // Commission Calculations
  const calculatedGMV = (monthlyRetailBottles * 380) + (monthlyPowderPouches * 240) + (monthlyBulkTons * 18000);
  const promoterEarnings = calculatedGMV * 0.10;
  const silverEarnings = (calculatedGMV * 0.15) + (monthlyBulkTons * 18000 * 0.03); // 15% + 3% override
  const goldEarnings = (calculatedGMV * 0.22) + (monthlyBulkTons * 18000 * 0.06); // 22% + 6% override

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Commercial Partner Distribution Network
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          AMH Affiliate & Reseller Network
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          A multi-tier commercial partnership program enabling external marketers, agricultural distributors, health retailers, and community cooperatives to distribute AMH botanical products and earn accredited commissions.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'tiers'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tier Structure & Benefits
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'register'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register as Reseller Partner
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Earnings Calculator
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'directory'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Verified Partner Directory ({partnerList.length})
          </button>
        </div>
      </div>

      {/* TAB 1: TIER STRUCTURE & ARCHITECTURE */}
      {activeTab === 'tiers' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Entry Level
                </span>
                <h3 className="text-2xl font-black text-slate-900">Tier 1: Promoter</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ideal for independent digital marketers, health influencers, agro-students, and community advocates sharing referral links.
                </p>
                <div className="pt-2">
                  <span className="text-3xl font-mono font-black text-emerald-800">10%</span>
                  <span className="text-xs text-slate-500 block">Commission on all retail products & digital literature</span>
                </div>
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant unique referral tracking URL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Covers all Moringa City digital books</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Monthly EFT bank transfer / PayFast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero upfront inventory requirement</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setRegTier('Tier 1: Promoter');
                  setActiveTab('register');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Register as Promoter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tier 2 */}
            <div className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-600 shadow-xl space-y-5 flex flex-col justify-between relative">
              <div className="absolute top-4 right-4 bg-emerald-500 text-emerald-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-full">
                Most Popular
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/80 px-3 py-1 rounded-full">
                  Agro-Retailer & Co-op
                </span>
                <h3 className="text-2xl font-black text-white">Tier 2: Silver Reseller</h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Tailored for established agro-dealer shops, wellness centers, outgrower coordinators, and regional resellers holding display stock.
                </p>
                <div className="pt-2">
                  <span className="text-3xl font-mono font-black text-emerald-300">15%</span>
                  <span className="text-xs text-emerald-200 block">+ 3% 2nd-tier overriding commission on recruited outgrowers</span>
                </div>
                <div className="space-y-2 pt-3 border-t border-emerald-800/80 text-xs text-emerald-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>15% direct commission on all orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>3% override on sub-tier affiliates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Priority consignment & sample testing packs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Listed in Official AMH Regional Hub directory</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setRegTier('Tier 2: Silver Reseller');
                  setActiveTab('register');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Apply for Silver Tier</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tier 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Enterprise Wholesale
                </span>
                <h3 className="text-2xl font-black text-slate-900">Tier 3: Gold Master Distributor</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For regional commodity trading firms, pharmaceutical exporters, and provincial master distributors handling tonnage volume.
                </p>
                <div className="pt-2">
                  <span className="text-3xl font-mono font-black text-amber-800">22%</span>
                  <span className="text-xs text-slate-500 block">+ 6% overriding commission on regional network volume</span>
                </div>
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>22% margin on full product line</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bulk drum & 100kg container direct FOB pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated Barkly West enterprise account manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Co-branded marketing & packaging rights</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setRegTier('Tier 3: Gold Distributor');
                  setActiveTab('register');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Apply for Master Distributor</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PARTNER REGISTRATION FORM */}
      {activeTab === 'register' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              New Partner Onboarding
            </span>
            <h3 className="text-2xl font-black text-slate-950">
              Register as an Accredited AMH Reseller
            </h3>
            <p className="text-xs text-slate-500">
              Submit your organization details to receive instant referral credentials, tracking links, and marketing media assets.
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Entity / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kalahari Agro Supplies"
                  value={regEntityName}
                  onChange={(e) => setRegEntityName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pieter Van Der Merwe"
                  value={regContactName}
                  onChange={(e) => setRegContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="orders@kalahariagro.co.za"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+27 82 345 6789"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Partner Tier *
                </label>
                <select
                  value={regTier}
                  onChange={(e) => setRegTier(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden bg-white"
                >
                  <option value="Tier 1: Promoter">Tier 1: Promoter (10% Commission)</option>
                  <option value="Tier 2: Silver Reseller">Tier 2: Silver Reseller (15% + 3% Override)</option>
                  <option value="Tier 3: Gold Distributor">Tier 3: Gold Master Distributor (22% + 6% Override)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Operating Region / Province *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Northern Cape & Free State"
                  value={regRegion}
                  onChange={(e) => setRegRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Distribution Channel
              </label>
              <input
                type="text"
                placeholder="e.g. Physical Agro-Dealer Store, Pharmacy Chain, Online E-Commerce"
                value={regChannel}
                onChange={(e) => setRegChannel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Submit Application & Generate Partner ID</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: COMMISSION & EARNINGS CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in duration-200">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Interactive Revenue Projection
            </span>
            <h3 className="text-2xl font-black text-slate-950">
              Affiliate Commission & Profit Calculator
            </h3>
            <p className="text-xs text-slate-500">
              Estimate your monthly gross earnings based on retail sales and wholesale bulk container referrals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Sliders Area */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                  <span>Retail Cold-Pressed Oil Bottles (50ml-1L)</span>
                  <span className="font-mono text-emerald-800">{monthlyRetailBottles} units / month</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="5"
                  value={monthlyRetailBottles}
                  onChange={(e) => setMonthlyRetailBottles(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                  <span>Leaf Powder Pouches (250g-1kg)</span>
                  <span className="font-mono text-emerald-800">{monthlyPowderPouches} pouches / month</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="10"
                  value={monthlyPowderPouches}
                  onChange={(e) => setMonthlyPowderPouches(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                  <span>Commercial Bulk B2B Orders (100kg & Bulk Drums)</span>
                  <span className="font-mono text-emerald-800">{monthlyBulkTons} orders / month</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={monthlyBulkTons}
                  onChange={(e) => setMonthlyBulkTons(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <span className="text-slate-500 block">Total Monthly Referred Volume (GMV):</span>
                <strong className="text-lg font-mono font-black text-slate-900">
                  R {calculatedGMV.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </strong>
              </div>
            </div>

            {/* Projected Payout Comparison Card */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 space-y-5">
              <h4 className="font-bold text-base text-white border-b border-emerald-800 pb-3">
                Projected Monthly Earnings by Tier
              </h4>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-900/60 border border-emerald-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-emerald-300 font-bold block">Tier 1 (Promoter - 10%)</span>
                    <span className="text-[10px] text-slate-400">Direct link referrals</span>
                  </div>
                  <span className="text-lg font-mono font-black text-white">
                    R {promoterEarnings.toLocaleString('en-ZA', { minimumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-900 border-2 border-emerald-500 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-xs text-emerald-200 font-bold block">Tier 2 (Silver Reseller - 15% + 3%)</span>
                    <span className="text-[10px] text-emerald-300">Display stock + sub-tier overrides</span>
                  </div>
                  <span className="text-xl font-mono font-black text-emerald-300">
                    R {silverEarnings.toLocaleString('en-ZA', { minimumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-300 font-bold block">Tier 3 (Gold Distributor - 22% + 6%)</span>
                    <span className="text-[10px] text-amber-200/80">Regional master container rights</span>
                  </div>
                  <span className="text-xl font-mono font-black text-amber-300">
                    R {goldEarnings.toLocaleString('en-ZA', { minimumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('register')}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Apply to Lock In This Tier</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VERIFIED PARTNERS DIRECTORY & LINK TOOL */}
      {activeTab === 'directory' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Custom Link Generator Bar */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800">
            <div className="max-w-xl space-y-1">
              <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider block">
                Partner Attribution URL Engine
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white">
                Customize Your Official Tracking Link
              </h3>
              <p className="text-xs text-slate-400">
                Share this tracking URL across your farm stores, WhatsApp groups, and trade catalogs. Any purchase tracks directly to your account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
              <input
                type="text"
                placeholder="Enter partner handle or code"
                value={customHandle}
                onChange={(e) => setCustomHandle(e.target.value)}
                className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 font-mono"
              />

              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied' : 'Copy Referral URL'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 break-all max-w-xl">
              {referralUrl}
            </div>
          </div>

          {/* Directory Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-extrabold text-xl text-slate-900">
                Accredited Regional Reseller Nodes
              </h3>
              <span className="text-xs font-mono font-bold text-slate-500">
                {partnerList.length} Active Enterprise Nodes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerList.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        partner.tier.includes('Gold')
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : partner.tier.includes('Silver')
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-slate-100 text-slate-800 border border-slate-300'
                      }`}>
                        {partner.tier}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {partner.commissionRatePct ?? partner.commissionRate ?? 10}% Margin
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900 leading-snug">
                      {partner.entityName || partner.partnerName || partner.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{partner.region || 'Southern Africa'}</span>
                    </div>

                    <div className="pt-2 text-xs text-slate-600 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tracking Code:</span>
                        <span className="font-mono font-bold text-slate-900">{partner.referralCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Network Volume:</span>
                        <span className="font-mono font-bold text-emerald-900">
                          R {(partner.totalSalesValueR ?? partner.totalSalesZar ?? 0).toLocaleString('en-ZA')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-800 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Active Partner</span>
                    </span>
                    <button
                      onClick={() => {
                        setCustomHandle(partner.referralCode);
                        onShowToast(`Loaded ${partner.entityName || partner.partnerName || partner.name} tracking handle.`);
                      }}
                      className="text-slate-600 hover:text-emerald-800 font-bold underline"
                    >
                      Use Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Outgrower Supply Chain Callout */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-800/40">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            Agricultural Outgrower Off-Take
          </span>
          <h3 className="text-2xl font-black tracking-tight">
            Cultivate for the AMH Processing Facility
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            We purchase verified seed and leaf harvests with transparent moisture grading and immediate digital bank settlement. Join over 30 verified outgrowers across the Vaal River basin.
          </p>
        </div>

        <button
          onClick={onOpenSupplierModal}
          className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>Apply as an Outgrower</span>
        </button>
      </div>
    </div>
  );
};
