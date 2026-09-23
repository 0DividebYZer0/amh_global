import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Building2, Smartphone, Globe2, ArrowRight } from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { useCurrency } from '../context/CurrencyContext';

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
    country: string;
    payMethod: 'PayFast' | 'EFT' | 'MobileMoney' | 'InternationalCard';
    currency: CurrencyCode;
    currencyTotal: number;
    exchangeRate: number;
  }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onSubmitOrder
}) => {
  const {
    currency,
    setCurrency,
    allCurrencies,
    formatPrice,
    convertFromZar,
    currencyConfig
  } = useCurrency();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('Ghana');
  const [payMethod, setPayMethod] = useState<'PayFast' | 'EFT' | 'MobileMoney' | 'InternationalCard'>(
    currency === 'GHS' ? 'MobileMoney' : currency === 'USD' ? 'InternationalCard' : 'PayFast'
  );
  const [honeypot, setHoneypot] = useState('');

  if (!isOpen) return null;

  const baseSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const baseVat = baseSubtotal * 0.15;
  const baseTotal = baseSubtotal + baseVat;

  const currencySubtotal = convertFromZar(baseSubtotal);
  const currencyVat = convertFromZar(baseVat);
  const currencyTotal = convertFromZar(baseTotal);

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    if (newCurrency === 'GHS') {
      setPayMethod('MobileMoney');
    } else if (newCurrency === 'USD') {
      setPayMethod('InternationalCard');
    } else {
      setPayMethod('PayFast');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim().length > 0) {
      console.warn('Bot submission blocked');
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
      country,
      payMethod,
      currency,
      currencyTotal,
      exchangeRate: currencyConfig.rateAgainstZar
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
              <h3 className="font-bold text-base leading-tight">Pan-African Secure Checkout &amp; Billing</h3>
              <p className="text-[11px] text-emerald-300/80">
                AfCFTA Multi-Currency Clearing · Ghana &amp; South Africa Dual Desks
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

          {/* Cart Summary Card with Currency Selector */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Order Review ({cart.reduce((s, i) => s + i.qty, 0)} Items)
                </span>
                <span className="text-[11px] text-slate-500">
                  Billing Currency: <strong>{currencyConfig.name}</strong>
                </span>
              </div>

              {/* Settlement Currency Toggle */}
              <div className="flex items-center gap-1 p-0.5 bg-white border border-slate-200 rounded-lg shadow-2xs self-start sm:self-auto">
                {(Object.keys(allCurrencies) as CurrencyCode[]).map((cCode) => (
                  <button
                    key={cCode}
                    type="button"
                    onClick={() => handleCurrencyChange(cCode)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      currency === cCode
                        ? 'bg-emerald-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-emerald-900'
                    }`}
                  >
                    <span>{allCurrencies[cCode].flag}</span> {cCode}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100 max-h-36 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="truncate max-w-[280px]">
                    <span className="font-bold text-slate-800 mr-2">{item.qty}×</span>
                    <span className="text-slate-700">{item.title}</span>
                  </div>
                  <span className="font-mono font-medium text-slate-900">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal (excl. Tax)</span>
                <span className="font-mono">{formatPrice(baseSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimated Regional Tax / VAT (15%)</span>
                <span className="font-mono">{formatPrice(baseVat)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Payable ({currency})</span>
                <div className="text-right">
                  <span className="font-mono text-emerald-800 block">{formatPrice(baseTotal)}</span>
                  {currency !== 'ZAR' && (
                    <span className="text-[10px] text-slate-400 font-normal">
                      Base Rate: R {baseTotal.toFixed(2)} ZAR
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Customer / Billing Coordinates */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Customer &amp; Delivery Logistics</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name / Enterprise Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kwame Mensah / BioAfrica Ltd"
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
                  placeholder="e.g. procurement@bioafrica.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +233 24 123 4567 or +27 82 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination Country / AfCFTA Region *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-slate-800"
                >
                  <option value="Ghana">Ghana (West Africa Hub · Greater Accra / Tema Port)</option>
                  <option value="South Africa">South Africa (HQ Hub · Northern Cape / Durban Port)</option>
                  <option value="Nigeria">Nigeria (Lagos Commercial Hub / ECOWAS)</option>
                  <option value="Kenya">Kenya (Nairobi / Mombasa Port / EAC)</option>
                  <option value="Other Africa">Other African Member State (44 Nations AfCFTA)</option>
                  <option value="International">International Export (Europe, USA, Asia, Middle East)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Tax / TIN / VAT Number (Optional for B2B Invoice)
                </label>
                <input
                  type="text"
                  placeholder="e.g. GH-TIN-892348 or ZA4910284729"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Delivery Address &amp; Destination City
              </label>
              <textarea
                rows={2}
                placeholder="Street address, suburb, town/city, digital address / postal code"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              />
            </div>
          </div>

          {/* Payment Method Selection based on Currency & Region */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Payment &amp; Settlement Gateway</span>
              <span className="text-[11px] font-normal text-slate-500">
                Tailored for {currencyConfig.region}
              </span>
            </h4>

            {/* If GHS (Ghana & West Africa) */}
            {currency === 'GHS' && (
              <>
                <label
                  className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                    payMethod === 'MobileMoney'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payMethod"
                      value="MobileMoney"
                      checked={payMethod === 'MobileMoney'}
                      onChange={() => setPayMethod('MobileMoney')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-emerald-700" />
                          Ghana Mobile Money (MTN MoMo, Telecel Cash, AT Money)
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Instant Clearance
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Direct automated checkout via MTN Mobile Money, Telecel Cash, AirtelTigo Money, and local debit cards in Ghanaian Cedi (GH₵).
                      </p>
                    </div>
                  </div>
                </label>

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
                          Ecobank Ghana B2B Bank Transfer
                        </span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          Pro-Forma Tax Invoice
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Generates official Pro-Forma Invoice in GH₵ with Ecobank Ghana Accra Central coordinates for corporate wire or cheque remittance.
                      </p>
                    </div>
                  </div>
                </label>
              </>
            )}

            {/* If ZAR (South Africa & SADC) */}
            {currency === 'ZAR' && (
              <>
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
                          PayFast Instant Gateway (Credit/Debit, Capitec Pay, Instant EFT)
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Instant Clearance
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Visa, Mastercard, Capitec Pay, FNB, ABSA, Nedbank, Standard Bank Instant EFT &amp; Masterpass.
                      </p>
                    </div>
                  </div>
                </label>

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
                          B2B Direct Bank Deposit (FNB South Africa)
                        </span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          Pro-Forma Tax Invoice
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Generates official AMH Global Pro-Forma Tax Invoice with FNB banking coordinates for corporate finance approval &amp; EFT remittance.
                      </p>
                    </div>
                  </div>
                </label>
              </>
            )}

            {/* If USD (AfCFTA & International) */}
            {currency === 'USD' && (
              <>
                <label
                  className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                    payMethod === 'InternationalCard'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payMethod"
                      value="InternationalCard"
                      checked={payMethod === 'InternationalCard'}
                      onChange={() => setPayMethod('InternationalCard')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Globe2 className="w-4 h-4 text-emerald-700" />
                          International Card Gateway (Visa, Mastercard, AMEX)
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Global Clearance
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Secure 3D-Secure card processing for international buyers with instant USD currency settlement.
                      </p>
                    </div>
                  </div>
                </label>

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
                          International SWIFT Wire Transfer
                        </span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          Commercial Pro-Forma Invoice
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Generates official USD Pro-Forma Commercial Invoice with SWIFT/IBAN banking coordinates for cross-border wire settlement.
                      </p>
                    </div>
                  </div>
                </label>
              </>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-900 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>
              {payMethod === 'EFT'
                ? `Generate Official Pro-Forma Invoice (${formatPrice(baseTotal)})`
                : `Proceed to Secure Settlement (${formatPrice(baseTotal)})`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
