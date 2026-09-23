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
              <h3 className="font-bold text-base">Pan-African Bulk B2B Freight RFQ</h3>
              <p className="text-[11px] text-emerald-300">Commercial Quotation from Dual Hubs: Ghana &amp; South Africa</p>
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Requested Volume / Tonnage *</label>
              <span className="text-[10px] text-slate-400">Quick wholesale presets:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {[
                '100kg Bulk Moringa Seeds (PKM-1)',
                '100kg Bulk Moringa Seeds (PKM-2)',
                '100kg Bulk Organic Leaf Powder',
                '100kg Bulk Whole Dried Leaves',
                '100kg Bulk Crushed Tea Leaves',
                '25L UN Commercial Drum Oil',
                '200L Industrial Drum Oil',
                '1,000L IBC Bulk Oil Tote'
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setVolume(preset)}
                  className={`text-[10px] px-2 py-1 rounded-md border font-medium transition-colors ${
                    volume === preset
                      ? 'bg-emerald-900 text-white border-emerald-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5× 100kg Sacks or 4× 25L Drums"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Target Budget e.g. R 85,000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Dispatch Hub &amp; Trade Corridor
            </label>
            <select
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
              defaultValue="auto"
            >
              <option value="auto">Nearest African Hub (Lowest Freight &amp; Lead Time)</option>
              <option value="ghana">Accra Centralized Hub, Ghana (West Africa / ECOWAS / Tema Port)</option>
              <option value="sa">Barkly West Agro-Processing, South Africa (Southern Africa / SADC / Durban Port)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Application, Destination Country &amp; Logistics</label>
            <textarea
              rows={3}
              placeholder="Detail your intended application (cosmetics, pharmaceutical, food blend), destination African or international port/city, and required AfCFTA / phytosanitary certificates..."
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
