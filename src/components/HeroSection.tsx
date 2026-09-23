import React from 'react';
import {
  ShoppingBag,
  Award,
  Sprout,
  ShieldCheck,
  ArrowRight,
  Truck,
  Heart,
  Factory,
  Tractor,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenStore: () => void;
  onOpenAcademy: () => void;
  onOpenIks: () => void;
  onOpenSupplier: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenStore,
  onOpenAcademy,
  onOpenIks,
  onOpenSupplier
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Canvas Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-16 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Barkly West Agro-Processing Facility · Northern Cape, South Africa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            AMH Global Traders <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-100 to-amber-200">
              Africa's Moringa Agro-Processing & Trade Hub
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-medium">
            Bridging rural farmers with guaranteed off-take contracts, commercial cold-pressed virgin oil distribution for manufacturers, accredited farmer training masterclasses, and sacred indigenous botanical heritage.
          </p>

          {/* Large, Easy-to-tap Buttons for Everyone */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenStore}
              className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm sm:text-base transition-all flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-950" />
              <span>Shop Seeds & Wholesale Oil</span>
            </button>

            <button
              onClick={onOpenSupplier}
              className="px-6 py-4 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold text-sm sm:text-base transition-all flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <Tractor className="w-5 h-5 text-emerald-700" />
              <span>Outgrower Farmer Network</span>
            </button>

            <button
              onClick={onOpenAcademy}
              className="px-6 py-4 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-white border border-emerald-500/40 font-bold text-sm sm:text-base transition-all flex items-center gap-2.5 hover:-translate-y-0.5 cursor-pointer"
            >
              <Award className="w-5 h-5 text-amber-300" />
              <span>Practical Academy</span>
            </button>
          </div>

          {/* Guaranteed Off-Take Badge */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-emerald-200 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Guaranteed Off-Take at R45/kg
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SANSOR Certified Germination (88%+)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sub-40°C Cold-Pressed Virgin Oil
            </span>
          </div>
        </div>
      </section>

      {/* Visual Gateway Cards with Real Images */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: For Farmers */}
          <div
            onClick={onOpenSupplier}
            className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-emerald-600 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-44 rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=700&q=80"
                  alt="Rural Moringa Farm"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  Outgrower Farming
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  For Outgrower Farmers
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Join our Barkly West farming network. Receive certified planting seeds, agronomy guidance, and guaranteed collection truck off-take.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>View Farmer Portal</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: For Manufacturers & Wholesale Buyers */}
          <div
            onClick={onOpenStore}
            className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-emerald-600 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-44 rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80"
                  alt="Cold-Pressed Moringa Oil Bottling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  Wholesale & B2B
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  For Manufacturers & Brands
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Order 25L UN drums of cold-pressed virgin moringa oil (below 40°C), animal feed leaf chaff, with full laboratory COA certificates.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>Request Wholesale RFQ</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: For Students & Trainees */}
          <div
            onClick={onOpenAcademy}
            className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-emerald-600 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-44 rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=700&q=80"
                  alt="Agricultural Academy Training"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-sky-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  Practical Academy
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  For Trainees & Students
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Step-by-step masterclass covering soil spacing, dawn harvest, screw-press operation, and earn your verified certificate.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>Start Masterclass</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: For Community & Elders (IKS) */}
          <div
            onClick={onOpenIks}
            className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-amber-600 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-44 rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80"
                  alt="African Indigenous Knowledge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-amber-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  IKS Sanctuary
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  Indigenous Knowledge (IKS)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Preserving traditional plant wisdom, natural river water clarification, oral teachings, with prior informed consent and community royalties.
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
              <span>Listen to Oral Lore</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Community Presence Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              Accessible Technology for All Ages
            </span>
            <h3 className="text-2xl font-bold">
              Built for Farmers, Elders, and Industry Alike
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              We know farming happens in the field, not behind complicated computer screens. AMH Global Traders offers voice audio read-aloud helpers, large buttons, and direct WhatsApp support in English, Afrikaans, and Setswana.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+27538312000"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Barkly West Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
