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
              African Moringa Hub Global Traders (Pty) Ltd. Commercial agro-processing, certified seed cultivars, accredited masterclasses, and indigenous stewardship.
            </p>
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <div>Reg: 2024/782910/07 · VAT: ZA4910284729</div>
              <div>Barkly West Agro-Processing Facility, Northern Cape</div>
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
                  Virgin Cold-Pressed Oil (50ml / 1L)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-emerald-400 transition-colors">
                  25L Commercial Wholesale Drums
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
                  Live Jitsi Broadcast Classroom
                </button>
              </li>
              <li>
                <button onClick={onOpenIks} className="hover:text-emerald-400 transition-colors">
                  Indigenous Knowledge Systems (IKS) Hub
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
              Commercial Desk
            </span>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Plot 14, Vaaloewer Agricultural Estate, Barkly West, 8375</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>accounts@amhglobal.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>+27 (0) 53 831 2000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 African Moringa Hub Global (Pty) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>POPIA Compliant</span>
            <span>·</span>
            <span>HACCP & GMP Principles</span>
            <span>·</span>
            <span>PayFast Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
