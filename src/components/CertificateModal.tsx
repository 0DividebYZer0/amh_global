import React, { useEffect } from 'react';
import { X, Award, Printer, ShieldCheck, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from '../utils/qr';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  courseTitle: string;
  certId: string;
  issueDate: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  courseTitle,
  certId,
  issueDate
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1e8449', '#27ae60', '#f1c40f', '#0e3820']
        });
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const verificationUrl = `https://amhglobal.com/verify?cert=${certId}&name=${encodeURIComponent(studentName)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs no-print" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[95vh]">
        {/* Action Header */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between no-print border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm">Verified Academic Certificate</h3>
            <span className="text-xs text-slate-400 font-mono">({certId})</span>
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
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div className="p-8 sm:p-14 overflow-y-auto bg-white printable-area flex flex-col items-center justify-center text-center relative border-8 border-double border-emerald-900/20 m-4 rounded-xl">
          {/* Subtle background crest */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-600 text-white flex items-center justify-center font-bold text-2xl shadow-md mb-4">
            A
          </div>

          <span className="text-xs font-bold tracking-[0.25em] uppercase text-emerald-800 mb-1">
            AMH Global Traders Academy
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Certificate of Academic & Technical Completion
          </h2>
          <div className="w-24 h-0.5 bg-emerald-600 mb-6"></div>

          <p className="text-xs text-slate-500 font-serif italic mb-2">
            This certifies that
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif border-b-2 border-emerald-800/40 pb-2 px-8 mb-4 max-w-lg">
            {studentName}
          </h3>

          <p className="text-xs text-slate-600 max-w-md leading-relaxed mb-4">
            has successfully fulfilled all curriculum requirements, continuous assessment modules, and interactive H5P calibration checkpoints for:
          </p>

          <h4 className="text-base sm:text-lg font-bold text-slate-900 bg-emerald-50/80 px-6 py-2.5 rounded-xl border border-emerald-200/80 mb-8 max-w-xl">
            {courseTitle}
          </h4>

          {/* Bottom credential bar */}
          <div className="w-full pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-left">
            <div>
              <div className="text-slate-500">
                Certificate Registry ID: <span className="font-mono font-bold text-slate-800">{certId}</span>
              </div>
              <div className="text-slate-500 mt-0.5">
                Issuance Date: <span className="font-medium text-slate-700">{issueDate}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mt-1">
                <CheckCircle className="w-4 h-4" />
                <span>Verified by AMH Global Traders Education Board</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <QRCodeSVG value={verificationUrl} size={90} color="#145a32" />
              <span className="text-[10px] text-slate-400 font-mono mt-1">Scan to Verify Authenticity</span>
            </div>
          </div>
        </div>

        {/* Action Footer */}
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
            <span>Print Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
