import React, { useState } from 'react';
import {
  Users,
  KeyRound,
  ShieldCheck,
  Tractor,
  Factory,
  Heart,
  GraduationCap,
  Sparkles,
  X,
  Copy,
  Check,
  Type
} from 'lucide-react';
import { DEMO_ACCOUNTS } from '../data/seedData';
import { AuthRole } from '../types';

interface RoleDemoBannerProps {
  currentRole: AuthRole;
  currentName: string;
  onSelectRole: (role: AuthRole, name: string, email: string) => void;
  onToggleLargeText: () => void;
  isLargeText: boolean;
}

export const RoleDemoBanner: React.FC<RoleDemoBannerProps> = ({
  currentRole,
  currentName,
  onSelectRole,
  onToggleLargeText,
  isLargeText
}) => {
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const getRoleIcon = (role: AuthRole) => {
    switch (role) {
      case 'farmer':
      case 'supplier':
        return <Tractor className="w-3.5 h-3.5 text-emerald-400" />;
      case 'manufacturer':
        return <Factory className="w-3.5 h-3.5 text-amber-400" />;
      case 'community':
        return <Heart className="w-3.5 h-3.5 text-rose-400" />;
      case 'student':
        return <GraduationCap className="w-3.5 h-3.5 text-sky-400" />;
      case 'admin':
        return <ShieldCheck className="w-3.5 h-3.5 text-red-400" />;
      default:
        return <Users className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <>
      {/* Sticky top sub-bar for testing */}
      <div className="bg-slate-900 border-b border-slate-800 text-white px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Left: Quick Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] hidden sm:inline">
            Test Portals:
          </span>

          {DEMO_ACCOUNTS.map((acc) => {
            const isActive = currentRole === acc.role;
            return (
              <button
                key={acc.role}
                onClick={() => onSelectRole(acc.role, acc.name, acc.email)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={`Switch to ${acc.roleLabel} (${acc.name})`}
              >
                {getRoleIcon(acc.role)}
                <span>{acc.roleLabel.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Accessibility Controls & Credentials Modal Trigger */}
        <div className="flex items-center gap-2">
          {/* Large Text Accessibility Toggle */}
          <button
            onClick={onToggleLargeText}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
              isLargeText
                ? 'bg-amber-400 text-slate-950 ring-1 ring-amber-300'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title="Toggle larger, easy-to-read text size"
          >
            <Type className="w-3.5 h-3.5" />
            <span>{isLargeText ? 'Text: Large' : 'Text: Normal'}</span>
          </button>

          {/* Test Logins Key button */}
          <button
            onClick={() => setShowCredentialsModal(true)}
            className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-700/60 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Test Logins & Passwords</span>
          </button>
        </div>
      </div>

      {/* Test Logins Modal */}
      {showCredentialsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-base">AMH Global Traders · Test Accounts & Logins</h3>
                  <p className="text-xs text-slate-400">Click any account to instantly log in and explore their dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setShowCredentialsModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of 5 Test Accounts */}
            <div className="p-6 space-y-3 max-h-[75vh] overflow-y-auto">
              {DEMO_ACCOUNTS.map((acc) => (
                <div
                  key={acc.email}
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-600 bg-slate-50/60 hover:bg-emerald-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{acc.name}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {acc.roleLabel}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      {acc.organization}
                    </div>
                    <p className="text-xs text-slate-500 max-w-md">
                      {acc.description}
                    </p>
                    <div className="flex items-center gap-3 pt-1 text-xs font-mono text-slate-600">
                      <span className="flex items-center gap-1">
                        Email: <strong className="text-slate-900">{acc.email}</strong>
                        <button
                          onClick={(e) => handleCopy(acc.email, e)}
                          className="text-slate-400 hover:text-slate-700 p-0.5"
                          title="Copy email"
                        >
                          {copiedEmail === acc.email ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </span>
                      <span>Password: <strong className="text-slate-900">{acc.pass}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectRole(acc.role, acc.name, acc.email);
                      setShowCredentialsModal(false);
                    }}
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
                  >
                    Log in as {acc.name.split(' ')[0]} →
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-600">
              Tip: You can also use the normal "Sign In" button in the navigation header with these credentials.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
