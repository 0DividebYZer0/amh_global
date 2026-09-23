import React from 'react';
import { X, Printer, Download, Building, ShieldCheck, Banknote } from 'lucide-react';
import { Order } from '../types';
import { QRCodeSVG } from '../utils/qr';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs no-print" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col max-h-[92vh]">
        {/* Modal Action Bar (Hidden during printing) */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between no-print border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm">Official B2B Pro-Forma Tax Invoice</h3>
            <span className="text-xs text-slate-400 font-mono">({order.invNumber})</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close invoice"
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
                    AMH Global Traders (Pty) Ltd
                  </h1>
                  <p className="text-xs text-emerald-800 font-medium">
                    Moringa Barkly West Agro-Processing & Trade Node
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mt-3">
                Plot 14, Vaaloewer Agricultural Estate, Barkly West, Northern Cape, 8375, South Africa<br />
                <strong>Reg No:</strong> 2024/782910/07 · <strong>VAT No:</strong> ZA4910284729<br />
                <strong>Email:</strong> accounts@amhglobal.com · <strong>Tel:</strong> +27 (0) 53 831 2000
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                Pro-Forma Tax Invoice
              </span>
              <div className="font-mono font-bold text-lg text-slate-900">
                {order.invNumber}
              </div>
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                <div><strong>Issue Date:</strong> {order.date}</div>
                <div><strong>Payment Terms:</strong> Direct EFT (14 Days)</div>
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
                {order.vatNumber && <div><strong>VAT Ref:</strong> {order.vatNumber}</div>}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Fulfillment & Logistics Node
              </span>
              <p className="text-slate-600 leading-relaxed">
                <strong>Facility:</strong> AMH Barkly West Agro-Processing Hub<br />
                <strong>Handling:</strong> Standard Insured Agricultural Freight / Courier<br />
                <strong>Dispatch:</strong> Released upon inter-bank funds clearance.<br />
                <strong>Validity:</strong> 14 business days from issuance.
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
                  <th className="py-2.5 px-3 font-bold text-right">Unit Price</th>
                  <th className="py-2.5 px-3 font-bold text-center">Qty</th>
                  <th className="py-2.5 px-3 font-bold text-right">Total (ZAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{item.title}</td>
                    <td className="py-2.5 px-3 text-right font-mono">R {item.price.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-center font-bold">{item.qty}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      R {(item.price * item.qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-300">
                  <td colSpan={4} className="py-2 px-3 text-right font-semibold text-slate-600">
                    Subtotal (excl. 15% VAT):
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-semibold">
                    R {order.subtotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="py-1.5 px-3 text-right font-semibold text-slate-600">
                    South African VAT (15%):
                  </td>
                  <td className="py-1.5 px-3 text-right font-mono font-semibold">
                    R {order.vat.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-emerald-50/60 text-emerald-950 font-bold text-sm border-t border-emerald-200">
                  <td colSpan={4} className="py-2.5 px-3 text-right">
                    Total Amount Due (ZAR):
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-base text-emerald-800">
                    R {order.total.toFixed(2)}
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
                First National Bank (FNB South Africa) Remittance Coordinates
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <div>
                  <span className="text-slate-500">Account Name:</span>{' '}
                  <strong className="text-slate-900">AMH Global Commercial (Pty) Ltd</strong>
                </div>
                <div>
                  <span className="text-slate-500">Bank Name:</span>{' '}
                  <strong className="text-slate-900">First National Bank (FNB)</strong>
                </div>
                <div>
                  <span className="text-slate-500">Account Type:</span>{' '}
                  <strong className="text-slate-900">Commercial Cheque / Current Account</strong>
                </div>
              </div>

              <div className="space-y-1.5">
                <div>
                  <span className="text-slate-500">Account Number:</span>{' '}
                  <strong className="text-slate-900 font-mono text-sm">6289 4410 829</strong>
                </div>
                <div className="flex gap-4">
                  <div>
                    <span className="text-slate-500">Branch Code:</span>{' '}
                    <strong className="text-slate-900 font-mono">250655</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">SWIFT / BIC:</span>{' '}
                    <strong className="text-slate-900 font-mono">FIRNZAJJ</strong>
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
                Deposit & Remittance Instructions:
              </p>
              <p>
                1. Quote the <strong>Reference ({order.invNumber})</strong> on your bank transfer to ensure automatic ledger allocation.
              </p>
              <p>
                2. Email electronic Proof of Payment (POP) to <strong>proof@amhglobal.com</strong> or WhatsApp to <strong>+27 82 123 4567</strong>.
              </p>
              <p className="text-[11px] text-slate-400 mt-2">
                This is a computer-generated tax document issued by African Moringa Hub Global.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <QRCodeSVG value={`https://amhglobal.com/verify?inv=${order.invNumber}`} size={84} />
              <span className="text-[10px] text-slate-400 font-mono mt-1">Scan to Verify</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls (Hidden during printing) */}
        <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex justify-end gap-3 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
