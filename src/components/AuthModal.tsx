import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  Tractor,
  Factory,
  Heart,
  GraduationCap,
  ArrowRight,
  CheckCircle2
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
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRoleType, setSelectedRoleType] = useState<AuthRole>('farmer');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState<AuthRole>('farmer');
  const [regPass, setRegPass] = useState('');
  const [regConsent, setRegConsent] = useState(true);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const query = loginEmail.trim().toLowerCase();

    if (!query) {
      setLoginError('Please enter your email or portal username.');
      return;
    }

    if (!loginPass) {
      setLoginError('Please enter your account password.');
      return;
    }

    // Check if matches one of registered enterprise accounts
    const match = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === query || a.role.toLowerCase() === query
    );

    if (match) {
      if (match.pass && loginPass !== match.pass) {
        setLoginError('Invalid password for this account. Please check your credentials.');
        return;
      }
      onLoginSuccess(match.role, match.name, match.email);
    } else {
      // Prevent unauthorized admin role escalation
      if (query === 'admin@amhglobal.com') {
        if (loginPass !== 'Admin2026') {
          setLoginError('Invalid administrator credentials.');
          return;
        }
        onLoginSuccess('admin', 'AMH System Administrator', 'admin@amhglobal.com');
      } else {
        if (loginPass.length < 4) {
          setLoginError('Password must be at least 4 characters long.');
          return;
        }
        // Non-admin valid session
        const roleToAssign = selectedRoleType === 'admin' ? 'farmer' : selectedRoleType;
        const displayName = loginEmail.split('@')[0]
          ? loginEmail.split('@')[0].replace(/[._]/g, ' ')
          : 'Registered User';
        const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        onLoginSuccess(roleToAssign, formattedName, loginEmail);
      }
    }
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regConsent) {
      setLoginError('Please accept data verification terms to register.');
      return;
    }
    onLoginSuccess(regRole, regName.trim() || 'New Partner', regEmail.trim() || 'partner@amhglobal.com');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-slate-200">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-6 flex items-center justify-between border-b border-emerald-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-300 border border-emerald-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">AMH Global Traders</h3>
              <p className="text-xs text-emerald-300/90">Secure Enterprise & Outgrower Access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switch */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 p-1.5 gap-1">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
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
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              tab === 'register'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Register Account</span>
          </button>
        </div>

        <div className="p-6">
          {/* Quick Demo Access (1-Click Login) */}
          {tab === 'login' && (
            <div className="mb-5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  ⚡ 1-Click Instant Demo Login (Choose Role)
                </span>
                <span className="text-[10px] text-emerald-800 font-bold">Auto-fills credentials</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {[
                  { name: 'Admin', role: 'admin' as AuthRole, email: 'admin@amhglobal.com', pass: 'Admin2026', label: 'Executive Admin' },
                  { name: 'David (Farmer)', role: 'farmer' as AuthRole, email: 'david@vaalriver.co.za', pass: 'Farmer2026', label: 'Outgrower' },
                  { name: 'Marcelle (B2B)', role: 'manufacturer' as AuthRole, email: 'marcelle@capebotanicals.co.za', pass: 'Cape2026', label: 'Wholesale Buyer' },
                  { name: 'Thabo (Student)', role: 'student' as AuthRole, email: 'thabo@gmail.com', pass: 'Student2026', label: 'Student Portal' },
                  { name: 'Gogo Nomvula', role: 'community' as AuthRole, email: 'gogo@sanctuary.org', pass: 'Elder2026', label: 'IKS Lore' },
                ].map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => {
                      setLoginEmail(acc.email);
                      setLoginPass(acc.pass);
                      onLoginSuccess(acc.role, acc.name, acc.email);
                      onClose();
                    }}
                    className="p-2 text-left rounded-lg bg-white border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all text-xs group"
                  >
                    <div className="font-bold text-slate-900 group-hover:text-emerald-900 text-[11px] truncate">
                      {acc.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">{acc.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {loginError}
            </div>
          )}

          {resetSent && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200">
              Password reset link has been dispatched to {loginEmail || 'your email'}.
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Account Email or ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. partner@amhglobal.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:border-emerald-600 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setResetSent(true)}
                    className="text-[11px] text-emerald-800 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter account password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:border-emerald-600 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Portal Workspace Routing */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Portal Destination:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { role: 'farmer' as AuthRole, label: 'Outgrower Farmer', icon: <Tractor className="w-3.5 h-3.5" /> },
                    { role: 'manufacturer' as AuthRole, label: 'Wholesale Buyer', icon: <Factory className="w-3.5 h-3.5" /> },
                    { role: 'community' as AuthRole, label: 'Elder / IKS', icon: <Heart className="w-3.5 h-3.5" /> },
                    { role: 'student' as AuthRole, label: 'Academy Student', icon: <GraduationCap className="w-3.5 h-3.5" /> }
                  ].map((item) => (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setSelectedRoleType(item.role)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-2 text-left transition-all ${
                        selectedRoleType === item.role
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-emerald-700">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-600">Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:translate-y-[-1px]"
              >
                <span>Sign In to Secure Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <span className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-bit encrypted agro-processing portal</span>
                </span>
              </div>
            </form>
          ) : (
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
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:border-emerald-600 focus:outline-hidden"
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
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Registering As
                </label>
                <select
                  value={regRole || 'farmer'}
                  onChange={(e) => setRegRole(e.target.value as AuthRole)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold bg-white focus:border-emerald-600 focus:outline-hidden"
                >
                  <option value="farmer">Outgrower Farmer (Guaranteed Off-take)</option>
                  <option value="manufacturer">Commercial Wholesale Buyer / Brand</option>
                  <option value="student">Academy Trainee / Student</option>
                  <option value="community">Community Elder / IKS Knowledge Keeper</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={regPass}
                  onChange={(e) => setRegPass(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={regConsent}
                    onChange={(e) => setRegConsent(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 border-slate-300 mt-0.5"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I agree to the AMH Global Traders partner terms, Barkly West collection protocols, and POPIA privacy policy.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-colors"
              >
                Create Partner Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
