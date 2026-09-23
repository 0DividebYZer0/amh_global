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
  PhoneCall,
  Globe
} from 'lucide-react';
import { usePlainLanguage } from '../context/PlainLanguageContext';

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
  const { isPlainLanguage, simplify } = usePlainLanguage();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Canvas Banner with Real Moringa Plantation Visual Backdrop */}
      <section className="relative overflow-hidden bg-emerald-950 text-white pt-16 sm:pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80"
            alt="Moringa Plantation Field"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 filter saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-950/95 to-slate-950" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-xs">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>
              {simplify(
                'Dual Pan-African Hubs: Accra, Ghana (West Africa) · Barkly West, South Africa (HQ) · 44 Nations',
                'Pan-African Moringa Hubs: Accra, Ghana & Barkly West, South Africa · Serving 44 Nations'
              )}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            AMH Global Traders <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-100 to-amber-200">
              {simplify(
                "Africa's Moringa Agro-Processing & Trade Network",
                "Africa's Moringa Harvest, Oil Pressing & Trade Network"
              )}
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-medium">
            {simplify(
              'Uniting 44 African nations with guaranteed farmer off-take agreements, dual processing facilities in Ghana and South Africa, commercial cold-pressed virgin oil distribution, accredited masterclasses, and AfCFTA cross-border commodity trade.',
              'Connecting farmers across Africa with guaranteed buyers who purchase every harvest, pure cold-pressed oil from Ghana and South Africa, practical farming classes, and traditional plant wisdom.'
            )}
          </p>

          {/* Large, Easy-to-tap Buttons for Everyone */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenStore}
              className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm sm:text-base transition-all flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-950" />
              <span>{simplify('Shop Seeds & Wholesale Oil', 'Shop Seeds & Bulk Oil')}</span>
            </button>

            <button
              onClick={onOpenSupplier}
              className="px-6 py-4 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold text-sm sm:text-base transition-all flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <Tractor className="w-5 h-5 text-emerald-700" />
              <span>{simplify('Outgrower Farmer Network', 'Partner Farmers & Outgrowers')}</span>
            </button>

            <button
              onClick={onOpenAcademy}
              className="px-6 py-4 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-white border border-emerald-500/40 font-bold text-sm sm:text-base transition-all flex items-center gap-2.5 hover:-translate-y-0.5 cursor-pointer"
            >
              <Award className="w-5 h-5 text-amber-300" />
              <span>{simplify('Practical Academy', 'Farmer Training School')}</span>
            </button>
          </div>

          {/* Guaranteed Off-Take & Continental Reach Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-emerald-200 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {simplify('Guaranteed Off-Take (R45/kg / Local Equiv)', 'We Guarantee to Buy Every KG at Fair Price')}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {simplify('2M+ Trees & 5,000+ Outgrowers (Ghana & SA)', '2 Million Trees Planted Across Africa')}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {simplify('AfCFTA Preferential Trade & Dual Port Freight', 'Dispatched via Tema Port (GH) & Durban Port (SA)')}
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
                  alt="Rural Moringa Farm in Africa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  {simplify('Pan-African Outgrowers', 'Partner Farming')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {simplify('For Outgrower Farmers', 'For Partner Farmers')}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {simplify(
                    'Join our outgrower networks across Ghana, South Africa, and 44 nations. Receive certified planting seeds, bio-fertilizers, and guaranteed truck collection.',
                    'Join our African farming network in Ghana, South Africa, and beyond. Receive high-sprouting seeds and guaranteed truck collection where we buy your entire harvest.'
                  )}
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{simplify('View Farmer Portal', 'Open Farmer Workspace')}</span>
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
                  {simplify('Wholesale & B2B', 'Wholesale & Commercial')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {simplify('For Manufacturers & Brands', 'For Wholesale Buyers & Brands')}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {simplify(
                    'Procure 25L UN drums to 1,000L IBC totes of sub-40°C virgin oil and 100kg leaf powder, dispatched from Accra (West Africa) or Barkly West (Southern Africa).',
                    'Order 25-litre sealed drums of pure cold-squeezed moringa oil, healthy animal feed leaves, with official lab purity test certificates and port shipping.'
                  )}
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{simplify('Request Wholesale RFQ', 'Request Price & Delivery Quote')}</span>
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
                  {simplify('Practical Academy', 'Farmer School')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {simplify('For Trainees & Students', 'For Students & Learners')}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {simplify(
                    'Step-by-step masterclass covering soil spacing, dawn harvest, screw-press operation, and earn your verified certificate across Africa.',
                    'Step-by-step masterclass covering planting distance, dawn harvesting, oil pressing, and earn your verified completion certificate.'
                  )}
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{simplify('Start Masterclass', 'Start Lessons')}</span>
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
                  {simplify('IKS Sanctuary', 'Plant Wisdom')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {simplify('Indigenous Knowledge (IKS)', 'Traditional Plant Wisdom (IKS)')}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {simplify(
                    "Preserving sacred West African 'Nebedaye' lore, Volta and Zambezi river water clarification, oral teachings, with prior informed consent and royalties.",
                    'Preserving traditional plant wisdom, natural river water cleaning with crushed seeds, oral teachings, with elder permission and fair community benefit sharing.'
                  )}
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
              <span>{simplify('Listen to Oral Lore', 'Listen to Elder Teachings')}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Botanical Processing Showcase: Real Moringa Operations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                {simplify('Seed to Drum Traceability', 'From Tree to Pure Bottle')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {simplify('Dual-Hub Agro-Processing in Action: Ghana & South Africa', 'How We Grow, Press & Harvest Moringa Across Africa')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              {simplify(
                'Transparent post-harvest operations maintaining sub-40°C mechanical extraction, batch laboratory validation, and direct farmer compensation across Accra and Barkly West facilities.',
                'Clear farming steps keeping our oil raw and cold-pressed without heat, with honest lab tests and fast farmer pay across our African processing hubs.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"
                  alt="High Density Moringa Plantation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Stage 1 · Planting
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {simplify('PKM-1 High-Density Cultivation', 'High-Sprouting Seeds in Field')}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {simplify('1m × 1m spacing engineered for rapid vegetative canopy renewal and drought resilience in Ghana & Southern Africa.', 'Careful planting spacing so trees grow thick green leaves fast with little water.')}
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=600&q=80"
                  alt="Moringa Leaves Shade Dehydration"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Stage 2 · Dehydration
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {simplify('Sub-40°C Shadow Dehydration', 'Shade-Drying Leaves in Barn')}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {simplify('Protected from direct UV photolysis to retain high Vitamin C, polyphenol bio-actives and emerald vibrancy in all drying sheds.', 'Dried away from harsh sun to keep all the natural vitamins and vivid green color.')}
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80"
                  alt="Virgin Cold-Pressed Moringa Oil"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Stage 3 · Extraction
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {simplify('Sub-40°C Virgin Cold Press', 'Pure Cold Oil Squeezing')}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {simplify('Slow mechanical screw extraction in Accra and Barkly West without chemical solvents. Rich in 72% oleic acid and behenic acid.', 'Gently crushed seeds with no chemicals or heat, making silky pure cosmetic and food oil.')}
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
                  alt="Wholesale 25L Drum Logistics"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Stage 4 · Dispatch
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {simplify('Nitrogen Sealing & Pan-African Freight', 'Airtight Drums & Port Delivery')}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {simplify('UN-certified food-grade drums sealed with nitrogen. Fast clearance via Tema Port (Ghana) and Durban Port (South Africa).', 'Tough 25L drums sealed airtight with lab purity certificates, ready for trucks and ships.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Community Presence Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              Pan-African Farmer & Buyer Support
            </span>
            <h3 className="text-2xl font-bold">
              Connecting 44 African Nations: Ghana & South Africa Operations
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              We know agriculture happens in the field, not behind screens. AMH Global Traders provides direct telephone & WhatsApp trader desks in South Africa and Ghana, supporting English, French, Twi, Ga, Afrikaans, and Setswana.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+27538312000"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>South Africa HQ (+27 53 831 2000)</span>
            </a>
            <a
              href="tel:+233244567890"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-extrabold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Ghana Hub (+233 24 456 7890)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
