import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Truck,
  FileText,
  Check,
  Plus,
  Minus,
  Info,
  BookOpen,
  Sprout,
  Layers,
  ArrowRight,
  Sparkles,
  Download,
  Globe,
  MapPin,
  RotateCw
} from 'lucide-react';
import { Product, ProductCategory, CurrencyCode } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface StoreSectionProps {
  products: Product[];
  onAddToCart: (product: Product, qty: number) => void;
  onOpenRfq: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({
  products,
  onAddToCart,
  onOpenRfq,
  onShowToast
}) => {
  const {
    currency,
    setCurrency,
    allCurrencies,
    formatPrice,
    getSecondaryPriceText,
    detectedRegionInfo,
    isAutoDetected,
    refreshLocation
  } = useCurrency();

  const [selectedCat, setSelectedCat] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showStrainComparison, setShowStrainComparison] = useState(false);

  const categories: { id: ProductCategory; label: string; badge?: string }[] = [
    { id: 'All', label: 'All Catalog' },
    { id: 'Seeds', label: 'Seeds (PKM 1 & 2)', badge: 'Core Varieties' },
    { id: 'Value-Added', label: 'Retail (Oils & Powders)', badge: 'Cold-Pressed' },
    { id: 'By-Products', label: 'By-Products', badge: 'Monetized Waste' },
    { id: 'Bulk', label: 'Commercial Bulk (B2B)', badge: '100kg & Drums' },
    { id: 'Digital', label: 'Digital Literature', badge: 'Moringa City Books' }
  ];

  const getQty = (id: string) => quantities[id] || 1;

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const filtered = products.filter((p) => {
    const matchesCat = selectedCat === 'All' || p.cat === selectedCat;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.specs && p.specs.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Pan-African Agro-Processing, Retail & Bulk Commodity Exchange
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          AMH Botanical Store & Commodity Exchange
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          SANSOR & ECOWAS certified planting seeds (PKM-1 & PKM-2), sub-40°C virgin cold-pressed oil, high-protein leaf powders, processing by-products, digital Moringa City publications, and 100kg commercial bulk export packaging dispatched across Africa and globally.
        </p>

        {/* Pan-African Logistics Banner */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] text-emerald-900 font-medium">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300">
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>Dual Dispatch: <strong>Accra Processing Center (Ghana)</strong> &amp; <strong>Barkly West Plant (South Africa)</strong></span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            <span>AfCFTA Preferential Trade Documents &amp; Phytosanitary Clearance</span>
          </span>
        </div>
      </div>

      {/* Pan-African Multi-Currency Switcher & Geolocation Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-950 to-emerald-800 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
            {allCurrencies[currency].symbol}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-900">Active Currency:</span>
              <span className="text-xs font-black text-emerald-800">
                {allCurrencies[currency].name} ({allCurrencies[currency].code})
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold border border-slate-200">
                {allCurrencies[currency].region}
              </span>
              {isAutoDetected && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Auto-Detected
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
              <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{detectedRegionInfo}</span>
              <button
                onClick={refreshLocation}
                className="text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 font-semibold ml-1.5 cursor-pointer underline decoration-dotted"
                title="Re-check IP & regional location"
              >
                <RotateCw className="w-2.5 h-2.5" />
                <span>Re-detect</span>
              </button>
            </div>
          </div>
        </div>

        {/* Currency Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          {(Object.keys(allCurrencies) as CurrencyCode[]).map((cCode) => {
            const cfg = allCurrencies[cCode];
            const isSelected = currency === cCode;
            return (
              <button
                key={cCode}
                onClick={() => {
                  setCurrency(cCode);
                  onShowToast(`Display currency switched to ${cfg.name} (${cfg.code})`);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-900 text-white shadow-xs scale-102'
                    : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-200/70'
                }`}
              >
                <span>{cfg.flag}</span>
                <span>{cfg.code}</span>
                <span className="font-mono text-[10px] opacity-80">({cfg.symbol})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Commercial Bulk Buying Banner (B2B Pipeline Highlight) */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Pan-African Commercial Bulk Buying Pipeline (B2B)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            100kg Wholesale Orders & Bulk Oil Drums from 25L to 1,000L IBC
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Procure palletized 100kg shipments of certified seeds, superfine leaf powder, shadow-dried leaves, and crushed tea cut leaves. Bulk food-grade virgin oil available in 25L UN drums, 200L barrels, and 1,000L export totes with laboratory COA & phytosanitary certification. Dispatches routed via Tema Port (Ghana) or Durban Port (South Africa).
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setSelectedCat('Bulk')}
            className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
          >
            <span>View Wholesale Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const defaultBulk = products.find((p) => p.cat === 'Bulk') || products[0];
              onOpenRfq(defaultBulk);
            }}
            className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-emerald-300" />
            <span>Request Freight RFQ</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Segmented Control */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl overflow-x-auto max-w-full border border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCat === cat.id
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              <span>{cat.label}</span>
              {cat.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-md ${
                    selectedCat === cat.id
                      ? 'bg-emerald-800 text-emerald-200'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle PKM-1 vs PKM-2 Strain Agronomy Matrix */}
          <button
            onClick={() => setShowStrainComparison(!showStrainComparison)}
            className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              showStrainComparison
                ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>PKM-1 vs PKM-2 Comparison</span>
          </button>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search botanical items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* PKM-1 vs PKM-2 Strain Agronomy Comparison Matrix */}
      {showStrainComparison && (
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/60 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-300">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">
                  Core Seed Varieties: PKM-1 vs PKM-2 Agronomic Matrix
                </h3>
                <p className="text-xs text-emerald-300/90">
                  Critical cultivation distinctions for outgrowers and commercial project developers
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowStrainComparison(false)}
              className="text-xs font-bold text-emerald-400 hover:text-white underline"
            >
              Hide Matrix
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PKM-1 Card */}
            <div className="bg-emerald-900/60 rounded-2xl p-5 border border-emerald-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-700">
                  Cultivar Strain 01
                </span>
                <span className="text-xs font-mono font-bold text-emerald-200">88%+ Germination</span>
              </div>
              <h4 className="text-xl font-bold text-white">PKM-1 (Annual Bushy Biomass Strain)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Selected by Periyakulam Horticultural College. Specifically engineered for dense vegetative leaf biomass production under high-density planting regimes.
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-emerald-800/50">
                  <span className="text-slate-400">Spacing Model:</span>
                  <span className="font-bold text-emerald-200">1.0m × 1.0m (10,000 trees / ha)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-800/50">
                  <span className="text-slate-400">Harvest Focus:</span>
                  <span className="font-bold text-emerald-200">Leaf Foliage & Powder</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-800/50">
                  <span className="text-slate-400">Coppicing Interval:</span>
                  <span className="font-bold text-emerald-200">Every 35–45 days at 45cm height</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-800/50">
                  <span className="text-slate-400">Dry Leaf Yield / Ha:</span>
                  <span className="font-bold text-emerald-200">6.5 to 8.5 tons / year</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Canopy Architecture:</span>
                  <span className="font-bold text-emerald-200">Bushy multi-branching canopy</span>
                </div>
              </div>
            </div>

            {/* PKM-2 Card */}
            <div className="bg-emerald-900/60 rounded-2xl p-5 border border-emerald-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-700/60">
                  Cultivar Strain 02
                </span>
                <span className="text-xs font-mono font-bold text-emerald-200">86%+ Germination</span>
              </div>
              <h4 className="text-xl font-bold text-white">PKM-2 (Perennial High-Pod & Oil Strain)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hybrid cross of MP 31 and MP 28. Features long, tender, non-bitter pods (1.2m) with 25-30 seeds per pod. High oil lipid content for permanent seed extraction orchards.
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-emerald-800/50">
                  <span className="text-slate-400">Spacing Model:</span>
                  <span className="font-bold text-emerald-200">2.5m × 2.5m (1,600 trees / ha)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-800/50">
                  <span className="text-slate-400">Harvest Focus:</span>
                  <span className="font-bold text-emerald-200">Seed Pods & Cold-Press Oil</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-800/50">
                  <span className="text-slate-400">Seed Oil Lipid Content:</span>
                  <span className="font-bold text-emerald-200">38% to 42% lipid content</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-800/50">
                  <span className="text-slate-400">Pod Length & Yield:</span>
                  <span className="font-bold text-emerald-200">125-130cm · 280-350 pods / tree</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Lifespan & Production:</span>
                  <span className="font-bold text-emerald-200">Perennial orchard (8–10+ years)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No botanical products found matching your current filter. Try selecting "All Catalog".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const isBulk = product.cat === 'Bulk';
            const isDigital = product.cat === 'Digital' || product.isDigital;
            const currentQty = getQty(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image slot */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    {product.img ? (
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-950 to-emerald-800 flex items-center justify-center text-emerald-200 p-6 text-center">
                        <span className="font-bold text-sm tracking-wide">{product.title}</span>
                      </div>
                    )}
                    
                    <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
                      <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                        {product.cat}
                      </span>
                      {isDigital && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-600/90 text-white text-[9px] font-black uppercase tracking-wider">
                          Moringa City Book
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                        {product.title}
                      </h3>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-mono font-bold text-emerald-800">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-[11px] text-slate-500">· {product.stock}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {getSecondaryPriceText(product.price)}
                      </div>
                    </div>

                    {product.specs && (
                      <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-1.5 leading-tight">
                        <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{product.specs}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {product.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action Area */}
                <div className="p-5 pt-0">
                  {isBulk ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => onOpenRfq(product)}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Truck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Request B2B Quotation</span>
                      </button>
                      <button
                        onClick={() => onAddToCart(product, 1)}
                        className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                        <span>Add Sample / 1 Unit to Basket</span>
                      </button>
                    </div>
                  ) : isDigital ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            onAddToCart(product, 1);
                            onShowToast(`Added "${product.title}" to basket. Instant download link provided on checkout.`);
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-200" />
                          <span>Buy Digital Edition (R{product.price})</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                          <button
                            onClick={() => handleQtyChange(product.id, -1)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-slate-800 border-x border-slate-200">
                            {currentQty}
                          </span>
                          <button
                            onClick={() => handleQtyChange(product.id, 1)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onAddToCart(product, currentQty)}
                          className="flex-1 py-2 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Basket</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
