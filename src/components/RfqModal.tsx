import React, { useState } from 'react';
import { X, Truck, Send, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmitRfq: (rfqData: {
    productId: string;
    productTitle: string;
    company: string;
    contact: string;
    email: string;
    phone: string;
    volume: string;
    budget: string;
    notes: string;
  }) => void;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmitRfq
}) => {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [volume, setVolume] = useState('25L Drum (Commercial Freight)');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim().length > 0) return;

    onSubmitRfq({
      productId: product.id,
      productTitle: product.title,
      company: company.trim(),
      contact: contact.trim(),
      email: email.trim(),
      phone: phone.trim(),
      volume: volume.trim(),
      budget: budget.trim(),
      notes: notes.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">Bulk B2B Freight RFQ</h3>
              <p className="text-[11px] text-slate-400">Direct Commercial Quotation from Barkly West Processing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs">
            <span className="text-emerald-800 block text-[11px] font-semibold">Target Botanical Item:</span>
            <strong className="text-slate-900 text-sm">{product.title}</strong>
            <p className="text-slate-600 mt-1">{product.specs || product.desc}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Entity *</label>
              <input
                type="text"
                required
                placeholder="e.g. BioCosmetics SA"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Contact Person *</label>
              <input
                type="text"
                required
                placeholder="e.g. Karen Botha"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
              <input
                type="email"
                required
                placeholder="procurement@biocosmetics.co.za"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
              <input
                type="tel"
                placeholder="+27 82 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Requested Volume / Tonnage</label>
              <input
                type="text"
                required
                placeholder="e.g. 5× 25L Drums or 500kg"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Budget (ZAR)</label>
              <input
                type="text"
                placeholder="e.g. R 85,000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Application & Delivery Logistics</label>
            <textarea
              rows={3}
              placeholder="Detail your intended use (cosmetics, nutritional blend, export) and destination city for freight calculation..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Submit Quotation Request to AMH Commercial Desk</span>
          </button>
        </form>
      </div>
    </div>
  );
};
