import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, Building2, Code2, CheckCircle2, Loader2, Smartphone } from 'lucide-react';
import { Order } from '../types';

interface PayFastModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onPaymentSuccess: () => void;
}

export const PayFastModal: React.FC<PayFastModalProps> = ({
  isOpen,
  onClose,
  order,
  onPaymentSuccess
}) => {
  const currency = order?.currency || 'ZAR';
  const isGhs = currency === 'GHS';
  const isUsd = currency === 'USD';

  const [activeTab, setActiveTab] = useState<'card' | 'eft' | 'momo' | 'payload'>(
    isGhs ? 'momo' : 'card'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBank, setSelectedBank] = useState('FNB');
  const [selectedMomoNet, setSelectedMomoNet] = useState<'MTN' | 'Telecel' | 'AT'>('MTN');
  const [momoNumber, setMomoNumber] = useState(order?.phone || '024 123 4567');

  // Simulated card states
  const [cardHolder, setCardHolder] = useState(order?.name || 'VALUED CLIENT');
  const [cardNumber, setCardNumber] = useState('4000 1234 5678 9010');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');

  if (!isOpen || !order) return null;

  const displayAmount = order.currencyTotal
    ? order.currencyTotal.toFixed(2)
    : isGhs
    ? (order.total * 0.82).toFixed(2)
    : isUsd
    ? (order.total / 18.25).toFixed(2)
    : order.total.toFixed(2);

  const currencySymbol = isGhs ? 'GH₵' : isUsd ? '$' : 'R';

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1500);
  };

  const banks = ['FNB', 'Capitec Pay', 'Standard Bank', 'ABSA', 'Nedbank', 'Investec'];

  const gatewayPayload = {
    merchant_id: isGhs ? 'AMH-GH-MOMO-1002' : isUsd ? 'AMH-INTL-STRIPE-001' : '10000100',
    gateway: isGhs ? 'Ghana Mobile Money & Cards' : isUsd ? 'International 3D-Secure' : 'PayFast South Africa',
    currency: currency,
    amount: displayAmount,
    base_zar_amount: order.total.toFixed(2),
    m_payment_id: order.id,
    order_ref: order.invNumber,
    customer_name: order.name,
    customer_email: order.email,
    return_url: 'https://amhglobal.com/?payment=success',
    notify_url: 'https://script.google.com/macros/s/AKfycbx_AMH_GLOBAL/exec?action=gatewayNotify'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Gateway Header */}
        <div className={`text-white p-5 flex items-center justify-between ${
          isGhs
            ? 'bg-gradient-to-r from-amber-700 via-amber-800 to-yellow-900'
            : isUsd
            ? 'bg-gradient-to-r from-blue-800 via-indigo-900 to-slate-900'
            : 'bg-gradient-to-r from-red-700 to-red-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-yellow-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                {isGhs
                  ? 'AMH Ghana Mobile Money & Clearing'
                  : isUsd
                  ? 'AMH Pan-African & International Gateway'
                  : 'PayFast Secure Clearing Gateway'}
              </h3>
              <p className="text-[11px] opacity-80">
                {isGhs
                  ? 'MTN MoMo · Telecel Cash · AT Money · AfCFTA West Africa Hub'
                  : isUsd
                  ? 'PCI-DSS Level 1 · Visa & Mastercard International Settlement'
                  : 'PCI-DSS Level 1 Certified · Sandbox Merchant ID 10000100'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transaction Summary Ribbon */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block">Merchant:</span>
            <span className="font-bold text-slate-800">
              {isGhs ? 'Africa Moringa Hub (Ghana) Ltd' : 'AMH Global Commercial (Pty) Ltd'}
            </span>
            <span className="text-slate-500 block text-[11px] mt-0.5">
              Ref: <span className="font-mono text-slate-700 font-semibold">{order.invNumber}</span> · {currency} Settlement
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block">Total Due ({currency}):</span>
            <span className="font-mono font-bold text-lg text-emerald-800">
              {currencySymbol} {displayAmount}
            </span>
            {currency !== 'ZAR' && (
              <span className="block text-[10px] text-slate-400 font-mono">
                Base: R {order.total.toFixed(2)} ZAR
              </span>
            )}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1 gap-1">
          {isGhs && (
            <button
              onClick={() => setActiveTab('momo')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'momo'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-600" />
              Mobile Money
            </button>
          )}

          <button
            onClick={() => setActiveTab('card')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'card'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Credit / Debit Card
          </button>

          {!isGhs && !isUsd && (
            <button
              onClick={() => setActiveTab('eft')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'eft'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Instant EFT
            </button>
          )}

          <button
            onClick={() => setActiveTab('payload')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'payload'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Gateway Payload
          </button>
        </div>

        {/* Tab Panes */}
        <div className="p-6">
          {isProcessing ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 text-emerald-700 animate-spin mb-3" />
              <h4 className="font-bold text-base text-slate-900">
                Authorizing {currency} Clearance Gateway...
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Authenticating 2-Factor OTP &amp; recording settlement to AMH Pan-African Ledger...
              </p>
            </div>
          ) : activeTab === 'momo' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Select your Ghana Mobile Money carrier to trigger prompt authorization:
              </p>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'MTN', name: 'MTN MoMo', color: 'border-yellow-400 bg-yellow-50' },
                  { id: 'Telecel', name: 'Telecel Cash', color: 'border-red-400 bg-red-50' },
                  { id: 'AT', name: 'AT Money', color: 'border-blue-400 bg-blue-50' }
                ].map((net) => (
                  <button
                    key={net.id}
                    type="button"
                    onClick={() => setSelectedMomoNet(net.id as any)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      selectedMomoNet === net.id
                        ? `${net.color} text-slate-900 ring-2 ring-emerald-600`
                        : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                    <span>{net.name}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Money Wallet Number
                </label>
                <input
                  type="tel"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  placeholder="e.g. 024 123 4567"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  A USSD prompt will be sent to this phone to approve {currencySymbol} {displayAmount}.
                </span>
              </div>

              <button
                onClick={handleSimulatePayment}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-all flex items-center justify-center gap-2 shadow-md mt-4 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize MoMo Clearance · {currencySymbol} {displayAmount}</span>
              </button>
            </div>
          ) : activeTab === 'card' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Number (Pre-filled Sandbox Test Card)
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleSimulatePayment}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-all flex items-center justify-center gap-2 shadow-md mt-4 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Simulate Card Authorization · {currencySymbol} {displayAmount}</span>
              </button>
            </div>
          ) : activeTab === 'eft' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Choose your South African banking institution for Instant EFT clearing via Capitec Pay or SiD:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {banks.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBank(b)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      selectedBank === b
                        ? 'border-red-600 bg-red-50/70 text-red-900 ring-2 ring-red-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-slate-600" />
                    <span>{b}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleSimulatePayment}
                className="w-full py-3.5 px-4 rounded-xl bg-red-700 text-white font-bold text-xs hover:bg-red-800 transition-all flex items-center justify-center gap-2 shadow-md mt-4 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Instant EFT Clearance with {selectedBank}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Pan-African Gateway POST Payload:</span>
                <span className="font-mono text-emerald-700">gateway.amhglobal.org</span>
              </div>
              <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-56 leading-relaxed">
                {JSON.stringify(gatewayPayload, null, 2)}
              </pre>
              <button
                onClick={handleSimulatePayment}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-800 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Execute Transaction Dispatch Simulation
              </button>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-[11px] text-slate-400">
          <span>AfCFTA Protocol Encrypted · TLS 1.3</span>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer">
            Cancel &amp; Return
          </button>
        </div>
      </div>
    </div>
  );
};
