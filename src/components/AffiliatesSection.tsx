import React, { useState } from 'react';
import { Share2, MapPin, CheckCircle2, Copy, Check, Users, Truck, ArrowRight } from 'lucide-react';
import { SEED_AFFILIATES } from '../data/seedData';

interface AffiliatesSectionProps {
  onOpenSupplierModal: () => void;
  onShowToast: (msg: string) => void;
}

export const AffiliatesSection: React.FC<AffiliatesSectionProps> = ({
  onOpenSupplierModal,
  onShowToast
}) => {
  const [affiliateName, setAffiliateName] = useState('AcmeAgro');
  const [copied, setCopied] = useState(false);

  const referralUrl = `https://amhglobal.com/?ref=${encodeURIComponent(affiliateName.trim() || 'Partner')}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralUrl);
    setCopied(true);
    onShowToast('Affiliate referral link copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Pan-African Supply Chain
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          AMH Global Ecosystem
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Certified regional distribution hubs, verified outgrower farming nodes, and accredited reseller partnerships across Southern Africa.
        </p>
      </div>

      {/* Outgrower Onboarding Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            Agricultural Procurement
          </span>
          <h3 className="text-2xl font-bold tracking-tight">
            Become an AMH Outgrower Partner
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            We procure certified organic Moringa seed and leaf biomass under guaranteed off-take contracts with complete agronomy advisory support.
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

      {/* Regional Partner Hubs Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="font-bold text-lg text-slate-900">
            Regional Distribution & Agronomy Nodes
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {SEED_AFFILIATES.length} Nodes Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEED_AFFILIATES.map((aff, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                  {aff.type}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-2">{aff.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{aff.region}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified AMH Network Node</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reseller Affiliate Link Generator */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl border border-slate-800">
        <div className="max-w-xl space-y-2">
          <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider block">
            Reseller & Distribution Attribution
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Generate Your Partner Referral Link
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Distribute certified planting seeds and value-added moringa cosmetics in your jurisdiction with automated referral tagging and 10% wholesale attribution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
          <input
            type="text"
            placeholder="Enter your partner or entity handle"
            value={affiliateName}
            onChange={(e) => setAffiliateName(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 font-mono"
          />

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied' : 'Copy Referral URL'}</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 break-all max-w-xl">
          {referralUrl}
        </div>
      </div>
    </div>
  );
};
