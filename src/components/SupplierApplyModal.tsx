import React, { useState } from 'react';
import { X, Sprout, Send } from 'lucide-react';

interface SupplierApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSupplier: (data: {
    farmName: string;
    representative: string;
    email: string;
    phone: string;
    province: string;
    hectares: number;
    crop: string;
    capacityNotes: string;
  }) => void;
}

export const SupplierApplyModal: React.FC<SupplierApplyModalProps> = ({
  isOpen,
  onClose,
  onSubmitSupplier
}) => {
  const [farmName, setFarmName] = useState('');
  const [representative, setRepresentative] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('Northern Cape');
  const [hectares, setHectares] = useState(5);
  const [crop, setCrop] = useState('PKM-1 Certified Seed & Leaf Biomass');
  const [capacityNotes, setCapacityNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim().length > 0) return;

    onSubmitSupplier({
      farmName: farmName.trim(),
      representative: representative.trim(),
      email: email.trim(),
      phone: phone.trim(),
      province,
      hectares: Number(hectares),
      crop,
      capacityNotes: capacityNotes.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">Become an AMH Outgrower Supplier</h3>
              <p className="text-[11px] text-emerald-200">Guaranteed Off-Take Purchase Agreement KYC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Farm / Enterprise Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vaal River Agro Estates"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Grower / Rep *</label>
              <input
                type="text"
                required
                placeholder="e.g. David Van Zyl"
                value={representative}
                onChange={(e) => setRepresentative(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="grower@vaalriver.co.za"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
              <input
                type="tel"
                required
                placeholder="+27 83 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Province / Region</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option>Northern Cape</option>
                <option>Western Cape</option>
                <option>Gauteng</option>
                <option>Limpopo</option>
                <option>Mpumalanga</option>
                <option>KwaZulu-Natal</option>
                <option>Free State</option>
                <option>North West</option>
                <option>Eastern Cape</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cultivated Hectares</label>
              <input
                type="number"
                min={0.5}
                step={0.5}
                value={hectares}
                onChange={(e) => setHectares(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Intended Crop Output</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              <option>PKM-1 Certified Seed & Leaf Biomass</option>
              <option>PKM-2 Perennial Seed Orchard</option>
              <option>Dried Whole Leaf Flakes (Sub-40°C)</option>
              <option>Raw Pod Biomass for Extraction</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Production & Irrigation Notes</label>
            <textarea
              rows={3}
              placeholder="Irrigation setup (drip/borehole), soil type, organic certifications, expected annual harvest tonnage..."
              value={capacityNotes}
              onChange={(e) => setCapacityNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Submit KYC Application to AMH Agronomy Board</span>
          </button>
        </form>
      </div>
    </div>
  );
};
