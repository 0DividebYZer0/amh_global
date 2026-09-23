import React, { useState } from 'react';
import {
  Play,
  Award,
  BookOpen,
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  Receipt,
  Download,
  Flame,
  ArrowRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { UserProgress, CourseModule, Order } from '../types';

interface StudentPortalProps {
  progress: UserProgress;
  modules: CourseModule[];
  orders: Order[];
  userName: string;
  userEmail: string;
  onOpenPlayer: () => void;
  onOpenCertificate: () => void;
  onViewInvoice: (order: Order) => void;
  onShowToast: (msg: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  progress,
  modules,
  orders,
  userName,
  userEmail,
  onOpenPlayer,
  onOpenCertificate,
  onViewInvoice,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'library' | 'notes' | 'orders'>('roadmap');

  const notes: Record<number, string> = (() => {
    try {
      const saved = localStorage.getItem('amh_lesson_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  })();

  const nextModuleIdx = modules.findIndex((_, i) => !progress.completedModules.includes(i));
  const activeModule = nextModuleIdx !== -1 ? modules[nextModuleIdx] : modules[modules.length - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-white p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-emerald-300 font-bold text-xs uppercase tracking-widest block">
            Academic Learning Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {userName.split(' ')[0] || 'Learner'}.
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Pick up your agro-processing curriculum right where you left off. Complete your calibration checkpoints to unlock your accredited certificate.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenPlayer}
              className="px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-emerald-950 text-emerald-950" />
              <span>Resume Active Lesson</span>
            </button>
            {progress.completed && (
              <button
                onClick={onOpenCertificate}
                className="px-5 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-2 border border-emerald-500/40"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>View Academic Certificate</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Metrics Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Course Progress</span>
            <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
              {progress.progressPercent}%
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Modules Completed</span>
            <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
              {progress.completedModules.length}/{modules.length}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Learning Streak</span>
            <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
              3 <span className="text-xs font-sans font-normal text-slate-500">Days</span>
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Certification</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block">
              {progress.completed ? 'Unlocked' : 'In Progress'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="border-b border-slate-200 flex gap-6">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'roadmap'
              ? 'border-emerald-700 text-emerald-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Curriculum Roadmap</span>
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'library'
              ? 'border-emerald-700 text-emerald-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Technical Reference Library</span>
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'notes'
              ? 'border-emerald-700 text-emerald-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Study Notes</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'border-emerald-700 text-emerald-950'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Invoices & Orders ({orders.length})</span>
        </button>
      </div>

      {/* Tab Content Panes */}
      {activeTab === 'roadmap' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Course Syllabus & Checkpoints</h3>
            <span className="text-xs text-slate-500">5 Calibration Checkpoints</span>
          </div>

          <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
            {modules.map((mod, idx) => {
              const isCompleted = progress.completedModules.includes(idx);
              const isUnlocked = idx <= progress.highestUnlockedIndex;

              return (
                <div
                  key={mod.id}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs font-mono font-bold text-slate-500">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        {idx + 1}. {mod.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {mod.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                        <span>{mod.duration || 'Self-paced'}</span>
                        <span>·</span>
                        <span>Interactive Checkpoint</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isCompleted ? (
                      <button
                        onClick={onOpenPlayer}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        Review Lesson
                      </button>
                    ) : isUnlocked ? (
                      <button
                        onClick={onOpenPlayer}
                        className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-xs flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start Lesson</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium px-3 py-1.5 rounded-lg bg-slate-100">
                        Locked (Complete {idx})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'library' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {modules.map((m, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">
                  {m.resource || `Module ${i + 1} Resource`}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Technical field specification and reference material for {m.title}.
                </p>
              </div>

              <button
                onClick={() => onShowToast(`Downloading: ${m.resource || 'AMH_Document.pdf'}`)}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Manual</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Your Learning Notes</h3>
            <span className="text-xs text-slate-500">Captured in LMS Player</span>
          </div>

          {Object.entries(notes).length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No notes taken yet. Use the notes tab while streaming lessons in the course player.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(notes).map(([modIdx, text]) => {
                const num = Number(modIdx);
                const mod = modules[num];
                if (!text.trim()) return null;
                return (
                  <div
                    key={modIdx}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2"
                  >
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Module {num + 1} · {mod?.title || 'Lesson'}
                    </span>
                    <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Purchase Orders & Invoices</h3>
            <span className="text-xs text-slate-500">{orders.length} Records</span>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No orders logged yet. Check out seeds, oil, or literature from the store catalog.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold">Invoice Ref</th>
                    <th className="py-3 px-4 font-bold">Date</th>
                    <th className="py-3 px-4 font-bold">Items</th>
                    <th className="py-3 px-4 font-bold">Total</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {o.invNumber}
                      </td>
                      <td className="py-3 px-4 text-slate-500">{o.date}</td>
                      <td className="py-3 px-4 text-slate-700">
                        {o.items.reduce((s, i) => s + i.qty, 0)} items
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        R {o.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onViewInvoice(o)}
                          className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                        >
                          View / Print Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
