import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenSupplier: () => void;
  onOpenIks: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSupplier,
  onOpenIks
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Node */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                A
              </div>
              <span className="text-base font-bold text-white">AMH Global Traders</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Commercial trading & agro-processing arm of the Africa Moringa Hub (AMH). Uniting 44 African nations with dual operational processing hubs in Ghana and South Africa under AfCFTA protocols.
            </p>
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <div>HQ: South Africa &middot; Hub: Ghana &middot; 44 African Nations Network</div>
              <div>Barkly West Agro-Processing Plant &amp; Accra Centralized Processing Center</div>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <span className="font-bold text-white text-xs uppercase tracking-wider block">
              Commercial Products
            </span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-emerald-400 transition-colors">
                  Certified PKM-1 & PKM-2 Seeds
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-emerald-400 transition-colors">
                  Virgin Cold-Pressed Oil (50ml - 1L)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-emerald-400 transition-colors">
                  25L Drums & 1,000L IBC Wholesale Totes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-emerald-400 transition-colors">
                  100kg Palletized Bulk Sacks & Powder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-emerald-400 transition-colors">
                  Nutritional Leaf Chaff & Press Cake
                </button>
              </li>
            </ul>
          </div>

          {/* Education & IKS */}
          <div className="space-y-2.5">
            <span className="font-bold text-white text-xs uppercase tracking-wider block">
              Academy & Knowledge
            </span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('academy')} className="hover:text-emerald-400 transition-colors">
                  H5P Agro-Processing Masterclass
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academy')} className="hover:text-emerald-400 transition-colors">
                  Africa Moringa Wealth Summit 2026
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academy')} className="hover:text-emerald-400 transition-colors">
                  Pan-African Live Broadcast Classroom
                </button>
              </li>
              <li>
                <button onClick={onOpenIks} className="hover:text-emerald-400 transition-colors">
                  Indigenous Knowledge (IKS) & Nebedaye Lore
                </button>
              </li>
              <li>
                <button onClick={onOpenSupplier} className="hover:text-emerald-400 transition-colors">
                  Outgrower Farming Network KYC
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Coordinates */}
          <div className="space-y-2.5">
            <span className="font-bold text-white text-xs uppercase tracking-wider block">
              Dual Pan-African Hubs
            </span>
            <div className="space-y-2.5 text-slate-400 text-[11px]">
              <div>
                <strong className="text-white block text-xs">Southern Africa Operations (HQ):</strong>
                <div className="flex items-start gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Plot 14, Vaaloewer Agricultural Estate, Barkly West, 8375, South Africa</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>+27 (0) 53 831 2000</span>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-900">
                <strong className="text-white block text-xs">West Africa Hub (Ghana):</strong>
                <div className="flex items-start gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Centralized Processing Center & Moringa City, Accra, Ghana</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>+233 24 456 7890</span>
                </div>
              </div>

              <div className="pt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-emerald-400">trade@africamoringahub.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 Africa Moringa Hub (AMH) Global Traders. Pan-African Operations across 44 Nations.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>AfCFTA Trade Protocol</span>
            <span>·</span>
            <span>ECOWAS & SADC Corridors</span>
            <span>·</span>
            <span>HACCP & GMP Principles</span>
            <span>·</span>
            <span>MDASA Member</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
