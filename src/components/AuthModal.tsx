import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  Tractor,
  Factory,
  Heart,
  GraduationCap
} from 'lucide-react';
import { AuthRole } from '../types';
import { DEMO_ACCOUNTS } from '../data/seedData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  onLoginSuccess: (role: AuthRole, name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
  onLoginSuccess
}) => {
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<AuthRole>('farmer');
  const [regPass, setRegPass] = useState('');
  const [regConsent, setRegConsent] = useState(true);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = loginEmail.trim().toLowerCase();

    // Check if matches one of our demo accounts
    const match = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === query || a.role.toLowerCase() === query
    );

    if (match) {
      onLoginSuccess(match.role, match.name, match.email);
    } else {
      // Default to student if custom
      onLoginSuccess('student', loginEmail.split('@')[0] || 'User', loginEmail);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regConsent) {
      alert('Please confirm data consent to continue.');
      return;
    }
    onLoginSuccess(regRole, regName.trim() || 'New User', regEmail.trim() || 'user@amhglobal.com');
  };

  const handleQuickLogin = (acc: (typeof DEMO_ACCOUNTS)[0]) => {
    onLoginSuccess(acc.role, acc.name, acc.email);
  };

  const getRoleIcon = (role: AuthRole) => {
    switch (role) {
      case 'farmer':
      case 'supplier':
        return <Tractor className="w-4 h-4 text-emerald-600" />;
      case 'manufacturer':
        return <Factory className="w-4 h-4 text-amber-600" />;
      case 'community':
        return <Heart className="w-4 h-4 text-rose-600" />;
      case 'student':
        return <GraduationCap className="w-4 h-4 text-sky-600" />;
      case 'admin':
        return <ShieldCheck className="w-4 h-4 text-red-600" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-slate-200">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">AMH Global Traders Sign In</h3>
              <p className="text-xs text-emerald-300">Access your role-specific dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
              tab === 'login'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
              tab === 'register'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {tab === 'login' ? (
            <>
              {/* 1-Click Quick Demo Sign In Buttons */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Quick 1-Click Test Logins:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => handleQuickLogin(acc)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 text-left transition-all flex items-center gap-2.5"
                    >
                      <div className="p-1.5 rounded-lg bg-white shadow-2xs shrink-0">
                        {getRoleIcon(acc.role)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">
                          {acc.name}
                        </span>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {acc.roleLabel}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-400 font-medium uppercase">
                  or enter credentials
                </span>
              </div>

              {/* Standard Email/Pass form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address or Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. farmer@amhglobal.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      (Any demo password works)
                    </span>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-xl shadow-xs transition-colors"
                >
                  Sign In to Dashboard
                </button>
              </form>
            </>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name or Trading Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Willem Steenkamp"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="willem@agri.co.za"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  I am registering as:
                </label>
                <select
                  value={regRole || 'farmer'}
                  onChange={(e) => setRegRole(e.target.value as AuthRole)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold bg-white"
                >
                  <option value="farmer">Outgrower Farmer (Barkly West & Regions)</option>
                  <option value="manufacturer">Commercial Manufacturer / Bulk Wholesale Buyer</option>
                  <option value="community">Community Member / IKS Knowledge Keeper</option>
                  <option value="student">Academy Student / Masterclass Trainee</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={regConsent}
                  onChange={(e) => setRegConsent(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-emerald-600 mt-0.5"
                />
                <span className="text-[11px] text-slate-600">
                  I agree to POPIA personal data processing for procurement and training records.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-xl shadow-xs transition-colors"
              >
                Register & Open My Portal
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
