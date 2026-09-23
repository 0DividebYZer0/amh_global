import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onNavigateToStore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onNavigateToStore
}) => {
  const {
    currency,
    setCurrency,
    allCurrencies,
    formatPrice,
    convertFromZar
  } = useCurrency();

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/90">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-bold text-slate-900">Your Basket</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Currency Selector Pills */}
              <div className="flex items-center gap-1 p-0.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
                {(Object.keys(allCurrencies) as CurrencyCode[]).map((cCode) => (
                  <button
                    key={cCode}
                    onClick={() => setCurrency(cCode)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                      currency === cCode
                        ? 'bg-emerald-800 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-emerald-800'
                    }`}
                  >
                    {cCode}
                  </button>
                ))}
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close basket"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Your basket is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Explore certified planting seeds, virgin cold-pressed oil, or digital academy access.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToStore();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-sm"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex gap-3"
                >
                  <div className="w-16 h-16 rounded-lg bg-emerald-100/60 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-xs font-bold text-emerald-800">AMH</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono font-medium text-emerald-700 mt-0.5">
                      {formatPrice(item.price)} each
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-0.5 text-xs font-mono font-bold text-slate-800 border-x border-slate-200">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-slate-900">
                          {formatPrice(item.price * item.qty)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Totals */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal (excl. Tax)</span>
                  <span className="font-mono font-medium text-slate-700">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Tax / VAT (15%)</span>
                  <span className="font-mono font-medium text-slate-700">
                    {formatPrice(vat)}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <span>Total Due ({currency})</span>
                    <span className="text-[10px] font-normal text-slate-400">
                      {currency !== 'ZAR' && `(Base: R ${total.toFixed(2)})`}
                    </span>
                  </span>
                  <span className="font-mono text-emerald-800">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>Proceed to Secure Checkout ({formatPrice(total)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>AfCFTA Compliant Clearance · Instant Gateway &amp; Official B2B Invoice</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
