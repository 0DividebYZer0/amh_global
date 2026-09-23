import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, Building2, Code2, CheckCircle2, Loader2 } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'card' | 'eft' | 'payload'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBank, setSelectedBank] = useState('FNB');

  // Simulated card states
  const [cardHolder, setCardHolder] = useState('T MOKOENA');
  const [cardNumber, setCardNumber] = useState('4000 1234 5678 9010');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');

  if (!isOpen || !order) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1500);
  };

  const banks = ['FNB', 'Capitec Pay', 'Standard Bank', 'ABSA', 'Nedbank', 'Investec'];

  const payfastPayload = {
    merchant_id: '10000100',
    merchant_key: '46f0cd694581a',
    return_url: 'https://amhglobal.com/?payment=success',
    cancel_url: 'https://amhglobal.com/?payment=cancelled',
    notify_url: 'https://script.google.com/macros/s/AKfycbx_AMH_GLOBAL/exec?action=payfastNotify',
    name_first: order.name.split(' ')[0] || 'Valued',
    name_last: order.name.split(' ').slice(1).join(' ') || 'Customer',
    email_address: order.email,
    m_payment_id: order.id,
    amount: order.total.toFixed(2),
    item_name: `AMH Global Order ${order.invNumber}`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* PayFast Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-yellow-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">PayFast Secure Clearing Gateway</h3>
              <p className="text-[11px] text-red-200">
                PCI-DSS Level 1 Certified · Sandbox Merchant ID 10000100
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-red-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transaction Summary Ribbon */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block">Merchant:</span>
            <span className="font-bold text-slate-800">AMH Global Commercial (Pty) Ltd</span>
            <span className="text-slate-500 block text-[11px] mt-0.5">
              Ref: <span className="font-mono text-slate-700 font-semibold">{order.invNumber}</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block">Total Due:</span>
            <span className="font-mono font-bold text-lg text-red-700">
              R {order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1 gap-1">
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
              <Loader2 className="w-10 h-10 text-red-600 animate-spin mb-3" />
              <h4 className="font-bold text-base text-slate-900">Contacting PayFast Clearing Engine...</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Authenticating 3D Secure OTP & confirming settlement to AMH Global...
              </p>
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
                className="w-full py-3.5 px-4 rounded-xl bg-red-700 text-white font-bold text-xs hover:bg-red-800 transition-all flex items-center justify-center gap-2 shadow-md mt-4"
              >
                <Lock className="w-4 h-4" />
                <span>Simulate PayFast Authorization · R {order.total.toFixed(2)}</span>
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
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
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
                className="w-full py-3.5 px-4 rounded-xl bg-red-700 text-white font-bold text-xs hover:bg-red-800 transition-all flex items-center justify-center gap-2 shadow-md mt-4"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Instant EFT Clearance with {selectedBank}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Standard PayFast POST Payload:</span>
                <span className="font-mono text-emerald-700">sandbox.payfast.co.za</span>
              </div>
              <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-56 leading-relaxed">
                {JSON.stringify(payfastPayload, null, 2)}
              </pre>
              <button
                onClick={handleSimulatePayment}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-800 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Execute Transaction Dispatch Simulation
              </button>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-[11px] text-slate-400">
          <span>Encrypted with TLS 1.3 · PayFast (Pty) Ltd</span>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-900 underline font-medium">
            Cancel & Return
          </button>
        </div>
      </div>
    </div>
  );
};
