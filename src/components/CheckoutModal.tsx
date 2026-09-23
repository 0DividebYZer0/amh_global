import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Building2, Lock, ArrowRight } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onSubmitOrder: (orderDetails: {
    name: string;
    email: string;
    phone: string;
    vatNumber: string;
    address: string;
    payMethod: 'PayFast' | 'EFT';
  }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onSubmitOrder
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [address, setAddress] = useState('');
  const [payMethod, setPayMethod] = useState<'PayFast' | 'EFT'>('PayFast');
  const [honeypot, setHoneypot] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Anti-bot honeypot check
    if (honeypot.trim().length > 0) {
      console.warn('Bot blocked by honeypot');
      return;
    }

    if (!name.trim() || !email.trim()) {
      alert('Please provide your name and email address.');
      return;
    }

    onSubmitOrder({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      vatNumber: vatNumber.trim(),
      address: address.trim(),
      payMethod
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Modal Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-200">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Secure AMH Checkout & Billing</h3>
              <p className="text-[11px] text-emerald-300/80">
                Encrypted 256-bit TLS · FNB Corporate Commercial Account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Honeypot field (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_url">Do not fill this</label>
            <input
              type="text"
              id="website_url"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Cart Summary Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Order Review ({cart.reduce((s, i) => s + i.qty, 0)} Items)
              </span>
              <span className="text-xs text-slate-500">ZAR Currency</span>
            </div>

            <div className="py-2 divide-y divide-slate-100 max-h-36 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="truncate max-w-[280px]">
                    <span className="font-bold text-slate-800 mr-2">{item.qty}×</span>
                    <span className="text-slate-700">{item.title}</span>
                  </div>
                  <span className="font-mono font-medium text-slate-900">
                    R {(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal (excl. VAT)</span>
                <span className="font-mono">R {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>South African VAT (15%)</span>
                <span className="font-mono">R {vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Payable</span>
                <span className="font-mono text-emerald-800">R {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer / Billing Coordinates */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Customer & Delivery Details</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name / Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Agronomy Ltd / Sipho Ndlovu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. accounts@acme.co.za"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +27 82 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company VAT Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4890123456 (For Tax Invoice)"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Billing / Delivery Address
              </label>
              <textarea
                rows={2}
                placeholder="Street address, suburb, city, postal code"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Select Payment Method
            </h4>

            {/* Option 1: PayFast */}
            <label
              className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                payMethod === 'PayFast'
                  ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="payMethod"
                  value="PayFast"
                  checked={payMethod === 'PayFast'}
                  onChange={() => setPayMethod('PayFast')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-700" />
                      PayFast Instant Clearing Gateway
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Instant Clearance
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Visa, Mastercard, Debit Card, Instant EFT (Capitec Pay, FNB, ABSA, Nedbank, Standard Bank), Zapper & Masterpass.
                  </p>
                </div>
              </div>
            </label>

            {/* Option 2: Direct EFT */}
            <label
              className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                payMethod === 'EFT'
                  ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="payMethod"
                  value="EFT"
                  checked={payMethod === 'EFT'}
                  onChange={() => setPayMethod('EFT')}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-700" />
                      B2B Direct Bank Deposit (EFT)
                    </span>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      Pro-Forma Tax Invoice
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Generates official AMH Global Pro-Forma Tax Invoice with FNB banking coordinates for corporate finance approval & manual EFT remittance.
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>
              {payMethod === 'PayFast'
                ? `Proceed to PayFast · R ${total.toFixed(2)}`
                : 'Generate Official Pro-Forma Invoice'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
