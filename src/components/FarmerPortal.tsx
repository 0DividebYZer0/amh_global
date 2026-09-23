import React, { useState } from 'react';
import {
  Tractor,
  Truck,
  DollarSign,
  Phone,
  MessageCircle,
  Droplets,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Volume2,
  VolumeX,
  FileText,
  Plus,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { HarvestYield } from '../types';

interface FarmerPortalProps {
  farmerName: string;
  farmName: string;
  yields: HarvestYield[];
  onSubmitYield: (data: { type: string; qty: number; moisture: string; notes: string }) => void;
  onShowToast: (msg: string) => void;
}

export const FarmerPortal: React.FC<FarmerPortalProps> = ({
  farmerName,
  farmName,
  yields,
  onSubmitYield,
  onShowToast
}) => {
  // Simple form state with large controls
  const [selectedCrop, setSelectedCrop] = useState('PKM-1 Clean Seed');
  const [kgAmount, setKgAmount] = useState<number>(100);
  const [collectionDate, setCollectionDate] = useState('Tomorrow Morning (08:00 - 11:00)');
  const [farmNotes, setFarmNotes] = useState('Ready in 50kg bags at main farm gate.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Guaranteed off-take price rates
  const guaranteedPrices: Record<string, { pricePerKg: number; unit: string; qualityReq: string }> = {
    'PKM-1 Clean Seed': { pricePerKg: 45.0, unit: 'R45.00 / kg', qualityReq: 'Moisture < 7.0%, de-winged' },
    'Whole Shadow-Dried Leaf': { pricePerKg: 28.0, unit: 'R28.00 / kg', qualityReq: 'Bright green, shade-dried' },
    'Dried Leaf Chaff (Feed)': { pricePerKg: 18.5, unit: 'R18.50 / kg', qualityReq: 'Stem-free, clean bags' },
    'Moringa Seed Pods': { pricePerKg: 32.0, unit: 'R32.00 / kg', qualityReq: 'Mature brown pods' }
  };

  const currentRate = guaranteedPrices[selectedCrop]?.pricePerKg || 45;
  const estimatedPayout = kgAmount * currentRate;

  // Read aloud helper for older farmers / low literacy
  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      onShowToast('Text-to-speech not supported on this browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const text = `Welcome ${farmerName}. This is your AMH Global Traders Farmer Portal. The current guaranteed price for ${selectedCrop} is ${currentRate} Rands per kilogram. For your ${kgAmount} kilograms, estimated payout is ${estimatedPayout} Rands. Click the green button below to schedule collection truck pickup. If you need assistance, tap the WhatsApp button to speak with our Barkly West agronomist.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // slightly slower for clarity
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleQuickAddKg = (amount: number) => {
    setKgAmount((prev) => Math.max(10, prev + amount));
  };

  const handlePickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitYield({
        type: selectedCrop,
        qty: kgAmount,
        moisture: '5.8% (Target < 7%)',
        notes: `Pickup scheduled: ${collectionDate}. ${farmNotes}`
      });
      setIsSubmitting(false);
      onShowToast(`Pickup scheduled for ${kgAmount} KG of ${selectedCrop}! AMH truck dispatched.`);
    }, 400);
  };

  // Farmer's summary stats
  const totalKgDelivered = yields.reduce((sum, y) => sum + y.qty, 0);
  const totalEarned = yields.reduce((sum, y) => {
    const rate = y.type.includes('Leaf') ? 28 : 45;
    return sum + y.qty * rate;
  }, 0);

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header Card - Big, friendly and reassuring */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-700/80 text-emerald-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/40">
                  Certified Outgrower Partner
                </span>
                <span className="text-xs text-emerald-200 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Barkly West & Vaal River District
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, {farmerName}
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base max-w-xl font-medium">
                Farm: <strong className="text-white">{farmName}</strong>. You have guaranteed off-take contracts with AMH Global Traders. Every bag of clean seed and leaf is weighed, tested, and paid directly to your bank account.
              </p>
            </div>

            {/* Read Aloud & Quick Help Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleReadAloud}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
                title="Click to hear the instructions in audio voice"
              >
                {isSpeaking ? <VolumeX className="w-5 h-5 text-amber-300" /> : <Volume2 className="w-5 h-5 text-emerald-300" />}
                <span>{isSpeaking ? 'Stop Audio' : '🔊 Listen (Read Aloud)'}</span>
              </button>

              <a
                href="tel:+27538312000"
                className="px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-102"
              >
                <Phone className="w-5 h-5" />
                <span>Call Agronomist (Barkly West)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Guaranteed Price Banner - Very prominent so farmers always know their money */}
        <div className="bg-white rounded-2xl p-5 border-2 border-emerald-600/30 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Today's Guaranteed Purchase Prices (Direct Bank Payout)
              </h2>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified by AMH Procurement
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4">
            {Object.entries(guaranteedPrices).map(([crop, info]) => (
              <div
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedCrop === crop
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold text-slate-600 block truncate">{crop}</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-800 block my-1">
                  {info.unit}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  {info.qualityReq}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main 2-Column Grid: Left is Log Harvest for Truck Pickup, Right is Earnings & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Form: Book AMH Collection Truck - Large inputs, zero confusion */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Step 1: Book Collection Truck for Your Harvest
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Our AMH truck visits Barkly West and surrounding farms every Tuesday and Friday.
                </p>
              </div>
            </div>

            <form onSubmit={handlePickupSubmit} className="space-y-5">
              {/* Crop Type Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  What are you selling today?
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {Object.keys(guaranteedPrices).map((crop) => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => setSelectedCrop(crop)}
                      className={`p-3 rounded-xl border-2 text-left font-bold text-xs sm:text-sm transition-all ${
                        selectedCrop === crop
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              {/* KG Stepper with big buttons */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Estimated Weight (Kilograms):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="10"
                    step="5"
                    value={kgAmount}
                    onChange={(e) => setKgAmount(Math.max(10, parseInt(e.target.value) || 0))}
                    className="w-36 px-4 py-3 text-2xl font-black text-slate-900 border-2 border-slate-300 rounded-2xl focus:border-emerald-600 focus:outline-hidden text-center bg-slate-50"
                  />
                  <span className="font-extrabold text-slate-500 text-lg">KG</span>

                  {/* Quick-add buttons */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[25, 50, 100, 250].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleQuickAddKg(amt)}
                        className="px-3 py-2 bg-slate-100 hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
                      >
                        +{amt} kg
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimated Payout calculation box */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">
                    Estimated Money You Will Receive
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-950">
                    R {estimatedPayout.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-emerald-700 block mt-0.5">
                    ({kgAmount} kg × R{currentRate.toFixed(2)}/kg)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                    Bank EFT within 24h
                  </span>
                </div>
              </div>

              {/* Collection Time */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">
                  When should the AMH truck arrive?
                </label>
                <select
                  value={collectionDate}
                  onChange={(e) => setCollectionDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-800 text-sm focus:border-emerald-600 focus:outline-hidden"
                >
                  <option value="Tomorrow Morning (08:00 - 11:00)">Tomorrow Morning (08:00 - 11:00)</option>
                  <option value="Tomorrow Afternoon (13:00 - 16:00)">Tomorrow Afternoon (13:00 - 16:00)</option>
                  <option value="Friday Morning Run (08:00 - 12:00)">Friday Morning Run (08:00 - 12:00)</option>
                  <option value="Next Tuesday Morning Run">Next Tuesday Morning Run</option>
                </select>
              </div>

              {/* Notes for driver */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1.5">
                  Farm Gate / Driver Instructions:
                </label>
                <input
                  type="text"
                  value={farmNotes}
                  onChange={(e) => setFarmNotes(e.target.value)}
                  placeholder="e.g. Turn at the green water tank, bags ready at the shed"
                  className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              {/* Submit button - Extra large and clear */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Truck className="w-6 h-6" />
                <span>{isSubmitting ? 'Dispatching Truck...' : 'Confirm Harvest Pickup (Call Truck)'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Earnings & Delivery Tracking */}
          <div className="lg:col-span-5 space-y-6">

            {/* Farm Summary Statistics Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Tractor className="w-5 h-5 text-emerald-600" />
                <span>My Farm Deliveries & Total Earnings</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase block">Total Delivered</span>
                  <span className="text-2xl font-black text-slate-900 block my-1">
                    {totalKgDelivered} kg
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold">100% Quality Passed</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase block">Total Paid to You</span>
                  <span className="text-2xl font-black text-emerald-800 block my-1">
                    R {totalEarned.toLocaleString('en-ZA')}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">To FNB Account</span>
                </div>
              </div>

              {/* Simple 4-Step Process Guide for non-technical farmers */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                  How AMH Buys Your Moringa (Simple 4 Steps):
                </span>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">1</span>
                    <span><strong>You book a pickup:</strong> We schedule our truck to your farm gate.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">2</span>
                    <span><strong>Driver weighs & tests moisture:</strong> Handheld meter confirms moisture is below 7%.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">3</span>
                    <span><strong>Official Delivery Slip issued:</strong> Signed copy handed to you.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">4</span>
                    <span><strong>Direct Bank EFT:</strong> Money deposited within 24 business hours.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Deliveries List */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Recent Harvest Deliveries</h4>
                <span className="text-xs text-slate-500">{yields.length} Recorded</span>
              </div>

              <div className="space-y-3">
                {yields.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{item.type}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {item.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span>{item.date}</span>
                        <span>·</span>
                        <span className="font-semibold text-slate-700">{item.qty} KG</span>
                        <span>·</span>
                        <span>Moisture: {item.moisture}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onShowToast(`Downloaded Delivery Receipt #${item.id} (PDF)`)}
                      className="p-2 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
                      title="Download Delivery Slip"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="hidden sm:inline">Slip</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp / Phone Help Banner */}
            <div className="bg-emerald-950 text-white rounded-3xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <MessageCircle className="w-5 h-5" />
                <h4 className="text-sm font-bold">Need Help or Pest Advice?</h4>
              </div>
              <p className="text-xs text-slate-300">
                Our resident agronomist in Barkly West is available on WhatsApp to answer questions about watering, pruning, or pod maturation.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://wa.me/27832345678"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Agronomist</span>
                </a>
                <a
                  href="tel:+27538312000"
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
