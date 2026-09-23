import React, { useState } from 'react';
import {
  Factory,
  Package,
  FileCheck2,
  Download,
  Truck,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  ArrowRight,
  FileText,
  Clock,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { SEED_BATCH_COAS } from '../data/seedData';
import { Order, RfqRecord } from '../types';

interface ManufacturerPortalProps {
  companyName: string;
  contactName: string;
  email: string;
  orders: Order[];
  rfqs: RfqRecord[];
  onOpenRfqModal: () => void;
  onViewInvoice: (order: Order) => void;
  onShowToast: (msg: string) => void;
}

export const ManufacturerPortal: React.FC<ManufacturerPortalProps> = ({
  companyName,
  contactName,
  email,
  orders,
  rfqs,
  onOpenRfqModal,
  onViewInvoice,
  onShowToast
}) => {
  const [selectedCoa, setSelectedCoa] = useState(SEED_BATCH_COAS[0]);

  // Demo active freight shipments
  const activeShipments = [
    {
      id: 'WAY-94821',
      carrier: 'The Courier Guy (Heavy Freight)',
      item: '4 × 25L Food-Grade HDPE Drums (Virgin Cold-Pressed Oil)',
      lotNumber: 'AMH-OIL-2026-B4',
      origin: 'AMH Processing Facility, Barkly West (NC)',
      destination: 'Stellenbosch Techno Park, Western Cape',
      status: 'In Transit - Out for Delivery',
      eta: 'Tomorrow, 14:00 SAST',
      tempControlled: true,
      nitrogenSealed: true
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
                  Wholesale & Manufacturer Portal
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Commercial Account
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {companyName}
              </h1>
              <p className="text-slate-300 text-sm max-w-xl">
                Primary Contact: <strong className="text-white">{contactName}</strong> ({email}). Access batch lab test certificates (COA), track bulk 25L drums in transit, and manage commercial freight quotations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenRfqModal}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-102"
              >
                <Layers className="w-4 h-4" />
                <span>Request Bulk RFQ Quotation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Drum Freight Tracking Banner */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Truck className="w-6 h-6 text-emerald-700" />
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Commercial Freight & Drum Logistics Tracker
                </h2>
                <p className="text-xs text-slate-500">Live courier telemetry from Barkly West facility</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full animate-pulse">
              1 Active Bulk Consignment
            </span>
          </div>

          {activeShipments.map((shipment) => (
            <div
              key={shipment.id}
              className="p-5 rounded-2xl border-2 border-emerald-600/30 bg-emerald-50/30 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-800 block">
                    WAYBILL #{shipment.id} · {shipment.carrier}
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                    {shipment.item}
                  </h4>
                  <span className="text-xs text-slate-600">
                    Batch Lot: <strong>{shipment.lotNumber}</strong> · Destination: {shipment.destination}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 inline-block">
                    {shipment.status}
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">
                    ETA: <strong className="text-slate-900">{shipment.eta}</strong>
                  </span>
                </div>
              </div>

              {/* Progress Stepper Bar */}
              <div className="pt-2">
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
                  <div className="p-2 rounded-xl bg-emerald-700 text-white">
                    <span>1. Drum Packed</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-700 text-white">
                    <span>2. Nitrogen Purged</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-600 text-white">
                    <span>3. In Transit</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-200 text-slate-500">
                    <span>4. Delivered & Signed</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Nitrogen Purged Seal Intact
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Lab COA Included Inside Pouch
                  </span>
                </div>

                <button
                  onClick={() => onShowToast(`Tracking refreshed: Freight is on schedule with ${shipment.carrier}.`)}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <RotateCw className="w-3.5 h-3.5" /> Refresh Status
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column Section: Left is Batch COA Laboratory Certificates, Right is RFQ Quotes & Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Certificate of Analysis (COA) Viewer & Downloader */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Batch Certificate of Analysis (COA) Repository
                  </h3>
                  <p className="text-xs text-slate-500">
                    Independent laboratory verification for cosmetic & pharmaceutical compliance
                  </p>
                </div>
              </div>
            </div>

            {/* Select Batch */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Tested Production Batch:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEED_BATCH_COAS.map((coa) => (
                  <button
                    key={coa.id}
                    onClick={() => setSelectedCoa(coa)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      selectedCoa.id === coa.id
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold text-emerald-800 block">
                      {coa.lotNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-900 block truncate mt-0.5">
                      {coa.productName}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Released: {coa.releaseDate}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected COA Specs Sheet */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-emerald-400 font-bold block text-sm">
                    {selectedCoa.productName}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Lot: {selectedCoa.lotNumber} · {selectedCoa.lab}
                  </span>
                </div>
                <button
                  onClick={() => onShowToast(`Downloaded Official COA: ${selectedCoa.lotNumber}.pdf`)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

              {/* Lab Parameters Table */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {Object.entries(selectedCoa.params).map(([key, val]) => (
                  <div key={key} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase block tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-white font-bold text-xs sm:text-sm mt-0.5 block">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified by: {selectedCoa.technician}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Digitally Signed
                </span>
              </div>
            </div>
          </div>

          {/* Right: RFQs & B2B Orders */}
          <div className="lg:col-span-5 space-y-6">

            {/* RFQs List */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-700" />
                  <span>Wholesale RFQ Quotes</span>
                </h4>
                <button
                  onClick={onOpenRfqModal}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  + New RFQ
                </button>
              </div>

              <div className="space-y-3">
                {rfqs.length > 0 ? (
                  rfqs.map((rfq) => (
                    <div
                      key={rfq.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{rfq.productTitle}</span>
                        <span className="font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {rfq.status}
                        </span>
                      </div>
                      <div className="text-slate-600">
                        Volume: <strong>{rfq.volume}</strong>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Destination: {rfq.destination || 'Western Cape'} · Date: {rfq.date}
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[11px] text-emerald-800 font-semibold">
                          AMH Freight Desk Assigned
                        </span>
                        <button
                          onClick={() => onShowToast(`Quotation document sent to ${rfq.email}`)}
                          className="font-bold text-emerald-700 hover:text-emerald-900"
                        >
                          View Quote
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 py-3 text-center">No active RFQs currently pending.</p>
                )}
              </div>
            </div>

            {/* Direct Commercial Desk Contact */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <PhoneCall className="w-5 h-5" />
                <h4 className="text-sm font-bold">Dedicated B2B Export & Freight Desk</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For urgent full-container load (FCL), 200L steel drums, or phytosanitary export documentation:
              </p>
              <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                <div>Phone: +27 53 831 2000 (Option 2)</div>
                <div>Email: b2b@amhglobal.com</div>
                <div>Facility: Barkly West Agro-Processing Hub, Northern Cape</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
