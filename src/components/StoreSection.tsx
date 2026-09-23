import React, { useState } from 'react';
import { Search, ShoppingBag, Truck, FileText, Check, Plus, Minus, Info } from 'lucide-react';
import { Product, ProductCategory } from '../types';

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
  const [selectedCat, setSelectedCat] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories: ProductCategory[] = ['All', 'Seeds', 'Value-Added', 'By-Products', 'Digital', 'Bulk'];

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
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Commercial Agro-Processing & Retail
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          AMH Botanical Catalog
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Certified planting seeds, sub-40°C virgin cold-pressed oil, livestock rations, and wholesale commercial freight containers.
        </p>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? 'All Inventory' : cat}
            </button>
          ))}
        </div>

        {/* Real-time search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search catalog by title, cultivar, specs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No botanical products found matching your current filter. Try selecting "All Inventory".
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
                  {/* Image slot with styled fallback container */}
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
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                      {product.cat}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1">
                        {product.title}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-2">
                      {isBulk ? (
                        <span className="text-xs font-bold text-amber-800">
                          Price on Freight RFQ
                        </span>
                      ) : (
                        <span className="text-base font-mono font-bold text-emerald-800">
                          R {product.price.toFixed(2)}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400">· {product.stock}</span>
                    </div>

                    {product.specs && (
                      <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-1.5 leading-tight">
                        <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{product.specs}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action Area */}
                <div className="p-5 pt-0">
                  {isBulk ? (
                    <button
                      onClick={() => onOpenRfq(product)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-900 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Request B2B Freight Quote</span>
                    </button>
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
