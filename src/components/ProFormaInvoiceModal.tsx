import React from 'react';
import { X, Printer, Building, FileCheck, ShieldCheck, Globe, QrCode } from 'lucide-react';
import { Order } from '../types';

interface ProFormaInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const ProFormaInvoiceModal: React.FC<ProFormaInvoiceModalProps> = ({
  isOpen,
  onClose,
  order
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const currency = order.currency || 'ZAR';
  const isGhs = currency === 'GHS';
  const isUsd = currency === 'USD';
  const currencySymbol = isGhs ? 'GH₵' : isUsd ? '$' : 'R';

  // Calculate currency rate multiplier
  const multiplier = order.currencyTotal && order.total > 0
    ? order.currencyTotal / order.total
    : order.exchangeRate || (isGhs ? 0.82 : isUsd ? 1 / 18.25 : 1);

  const formatCurr = (zarAmt: number) => {
    if (currency === 'ZAR') return `R ${zarAmt.toFixed(2)}`;
    const converted = zarAmt * multiplier;
    return `${currencySymbol} ${converted.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs no-print" onClick={onClose} />

      {/* Sheet Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8 border border-slate-200">
        {/* Top Control Bar (Hidden when printed) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">Official Commercial Pro-Forma Invoice ({currency})</span>
            <span className="text-[11px] text-slate-300 font-mono">#{order.invNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white printable-area text-slate-900">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl">
                  A
                </div>
                <div>
                  <h1 className="text-xl font-bold text-emerald-950 tracking-tight">
                    AMH Global Commercial (Pty) Ltd &amp; Africa Moringa Hub Ltd
                  </h1>
                  <p className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3 text-emerald-600" />
                    <span>Pan-African Dual Hub: Accra (Ghana) &amp; Barkly West (South Africa)</span>
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mt-3">
                <strong>South Africa HQ:</strong> Plot 14, Vaaloewer Agricultural Estate, Barkly West, 8375 · Reg: 2024/782910/07 · VAT: ZA4910284729<br />
                <strong>Ghana Processing Hub:</strong> Spintex Industrial Area, Accra, Ghana · AfCFTA Certification Corridor<br />
                <strong>Email:</strong> accounts@amhglobal.org · <strong>Tel:</strong> +27 (0) 53 831 2000 / +233 24 123 4567
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                Pro-Forma Tax Invoice ({currency})
              </span>
              <div className="font-mono font-bold text-lg text-slate-900">
                {order.invNumber}
              </div>
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                <div><strong>Issue Date:</strong> {order.date}</div>
                <div><strong>Payment Terms:</strong> Direct Bank Remittance (14 Days)</div>
                <div>
                  <strong>Status:</strong>{' '}
                  <span className={`font-semibold ${order.status === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Billed to & Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Billed To (Customer / Entity)
              </span>
              <h4 className="font-bold text-sm text-slate-900">{order.name}</h4>
              <p className="text-slate-600 mt-1">{order.address || 'Standard Registered Dispatch Address'}</p>
              <div className="mt-2 text-slate-500 space-y-0.5">
                <div><strong>Email:</strong> {order.email}</div>
                {order.phone && <div><strong>Phone:</strong> {order.phone}</div>}
                {order.vatNumber && <div><strong>TIN / VAT Ref:</strong> {order.vatNumber}</div>}
                <div><strong>Settlement Currency:</strong> <span className="font-bold text-emerald-800">{currency}</span></div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Fulfillment &amp; AfCFTA Logistics Hub
              </span>
              <p className="text-slate-600 leading-relaxed">
                <strong>Primary Node:</strong> {isGhs ? 'AMH Ghana Processing Center (Accra / Tema Port)' : 'AMH Barkly West Plant (South Africa / Durban Port)'}<br />
                <strong>Handling:</strong> Standard Insured Agricultural Freight / Phytosanitary Cleared<br />
                <strong>Dispatch:</strong> Released upon inter-bank funds confirmation.<br />
                <strong>Validity:</strong> 14 business days from issuance date.
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto my-6">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-100/70 text-slate-700">
                  <th className="py-2.5 px-3 font-bold w-12 text-center">#</th>
                  <th className="py-2.5 px-3 font-bold">Product Description</th>
                  <th className="py-2.5 px-3 font-bold text-right">Unit Price ({currency})</th>
                  <th className="py-2.5 px-3 font-bold text-center">Qty</th>
                  <th className="py-2.5 px-3 font-bold text-right">Total ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{item.title}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{formatCurr(item.price)}</td>
                    <td className="py-2.5 px-3 text-center font-bold">{item.qty}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {formatCurr(item.price * item.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-300">
                  <td colSpan={4} className="py-2 px-3 text-right font-semibold text-slate-600">
                    Subtotal (excl. Tax / VAT):
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-semibold">
                    {formatCurr(order.subtotal)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="py-1.5 px-3 text-right font-semibold text-slate-600">
                    Estimated Tax / VAT (15%):
                  </td>
                  <td className="py-1.5 px-3 text-right font-mono font-semibold">
                    {formatCurr(order.vat)}
                  </td>
                </tr>
                <tr className="bg-emerald-50/60 text-emerald-950 font-bold text-sm border-t border-emerald-200">
                  <td colSpan={4} className="py-2.5 px-3 text-right">
                    Total Amount Due ({currency}):
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-base text-emerald-800">
                    {formatCurr(order.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Banking Coordinates Card */}
          <div className="p-5 rounded-xl border-2 border-emerald-700/30 bg-emerald-50/30 my-6">
            <div className="flex items-center gap-2 mb-3">
              <Building className="w-5 h-5 text-emerald-800" />
              <h4 className="font-bold text-sm text-emerald-950">
                {isGhs
                  ? 'Ecobank Ghana PLC Remittance Coordinates (West Africa Hub)'
                  : isUsd
                  ? 'First National Bank & Ecobank International SWIFT Coordinates (USD)'
                  : 'First National Bank (FNB South Africa) Remittance Coordinates (ZAR)'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <div>
                  <span className="text-slate-500">Beneficiary Name:</span>{' '}
                  <strong className="text-slate-900">
                    {isGhs ? 'Africa Moringa Hub (Ghana) Ltd' : 'AMH Global Commercial (Pty) Ltd'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500">Bank Name:</span>{' '}
                  <strong className="text-slate-900">
                    {isGhs ? 'Ecobank Ghana PLC' : 'First National Bank (FNB South Africa)'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500">Branch Name:</span>{' '}
                  <strong className="text-slate-900">
                    {isGhs ? 'Accra Central Corporate Branch' : 'Barkly West Commercial Node (250655)'}
                  </strong>
                </div>
              </div>

              <div className="space-y-1.5">
                <div>
                  <span className="text-slate-500">Account Number:</span>{' '}
                  <strong className="text-slate-900 font-mono text-sm">
                    {isGhs ? '0010 0982 3481 2301' : isUsd ? '6289 4410 829-USD' : '6289 4410 829'}
                  </strong>
                </div>
                <div className="flex gap-4">
                  <div>
                    <span className="text-slate-500">SWIFT / BIC:</span>{' '}
                    <strong className="text-slate-900 font-mono">
                      {isGhs ? 'ECOCGHAC' : 'FIRNZAJJ'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Settlement Currency:</span>{' '}
                    <strong className="text-emerald-800 font-bold font-mono">{currency}</strong>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-300 mt-2">
                  <span className="text-[11px] text-amber-800 block">
                    Mandatory Payment Reference:
                  </span>
                  <strong className="font-mono text-sm text-red-700">
                    {order.invNumber}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notice & QR Verification */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
            <div className="space-y-1 max-w-lg">
              <p className="font-semibold text-slate-700">
                Remittance &amp; AfCFTA Clearing Instructions:
              </p>
              <p>
                1. Quote the <strong>Reference ({order.invNumber})</strong> on your bank or wire remittance to ensure instant allocation.
              </p>
              <p>
                2. Email electronic Proof of Payment (POP) to <strong>proof@amhglobal.org</strong> or WhatsApp to <strong>+27 82 123 4567</strong> / <strong>+233 24 123 4567</strong>.
              </p>
              <p className="text-[11px] text-slate-400 mt-2">
                This is an official computer-generated commercial document issued by Africa Moringa Hub &amp; AMH Global.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-900 text-white rounded-xl p-2 flex flex-col items-center justify-center shadow-xs border border-slate-700">
                <QrCode className="w-12 h-12 text-emerald-400" />
                <span className="text-[8px] font-mono text-emerald-300 font-bold uppercase tracking-wider mt-0.5">AMH VERIFIED</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-1">AfCFTA Ledger Verified</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls (Hidden during printing) */}
        <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
