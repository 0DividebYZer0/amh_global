import React, { useState } from 'react';
import { Sprout, Scale, Plus, CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';
import { HarvestYield } from '../types';

interface OutgrowerPortalProps {
  yields: HarvestYield[];
  onSubmitYield: (yieldData: {
    type: string;
    qty: number;
    moisture: string;
    notes: string;
  }) => void;
  onShowToast: (msg: string) => void;
}

export const OutgrowerPortal: React.FC<OutgrowerPortalProps> = ({
  yields,
  onSubmitYield,
  onShowToast
}) => {
  const [type, setType] = useState('PKM-1 Raw Seed (Certified)');
  const [qty, setQty] = useState('');
  const [moisture, setMoisture] = useState('6.8%');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = Number(qty);
    if (isNaN(q) || q <= 0) {
      alert('Please enter a valid harvest quantity in KG.');
      return;
    }

    onSubmitYield({
      type,
      qty: q,
      moisture,
      notes: notes.trim()
    });

    setQty('');
    setNotes('');
  };

  const totalKg = yields.reduce((s, y) => s + y.qty, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-white p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-emerald-300 font-bold text-xs uppercase tracking-widest block">
            Procurement & Outgrower Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            AMH Outgrower Terminal
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Submit harvest yields, record moisture calibration readings, and track purchase order generation for collection and processing at Barkly West.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Total Harvest Logged</span>
            <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
              {totalKg.toLocaleString()} <span className="text-xs font-sans text-slate-500 font-normal">KG</span>
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Total Submissions</span>
            <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
              {yields.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Sprout className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Quality Baseline</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block">
              Moisture &lt; 7.0% Verified
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Yield Submission Form & Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Submit form */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Plus className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-sm text-slate-900">Log New Harvest Batch</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Biomass / Crop Output</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option>PKM-1 Raw Seed (Certified)</option>
                <option>PKM-2 Perennial Seed Crop</option>
                <option>Whole Shadow-Dried Leaf Flakes</option>
                <option>De-Oiled Seed Press Cake</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Quantity (KG) *</label>
              <input
                type="number"
                required
                min={1}
                step={1}
                placeholder="e.g. 250"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Moisture Test Reading</label>
              <input
                type="text"
                placeholder="e.g. 6.8%"
                value={moisture}
                onChange={(e) => setMoisture(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Standard processing threshold: under 7.0% moisture.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Batch / Drying Notes</label>
              <textarea
                rows={2}
                placeholder="Harvest date, shade drying time, plot number..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-900 transition-colors shadow-sm"
            >
              Submit to AMH Procurement Ledger
            </button>
          </form>
        </div>

        {/* Right: Submissions Ledger */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Recent Harvest Submissions</h3>
            <span className="text-xs text-slate-500 font-mono">{yields.length} Recorded</span>
          </div>

          {yields.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500">
              No harvest records logged yet. Use the form to submit your first harvest yield.
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Date</th>
                    <th className="py-3 px-4 font-bold">Biomass Type</th>
                    <th className="py-3 px-4 font-bold">Quantity</th>
                    <th className="py-3 px-4 font-bold">Moisture</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yields.map((y) => (
                    <tr key={y.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 text-slate-500 font-mono">{y.date}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{y.type}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                        {y.qty.toLocaleString()} KG
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">{y.moisture}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            y.status === 'Quality Cleared'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {y.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
