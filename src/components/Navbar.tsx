import React from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  User,
  LogOut,
  Menu,
  X,
  Tractor,
  Factory,
  Heart,
  GraduationCap
} from 'lucide-react';
import { AuthRole } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  currRole: AuthRole;
  userName: string;
  openAuth: (tab?: 'login' | 'register') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  cartCount,
  openCart,
  currRole,
  userName,
  openAuth,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'store', label: 'Products & Wholesale' },
    { id: 'academy', label: 'Academy' },
    { id: 'iks', label: 'IKS Sanctuary' },
    { id: 'ecosystem', label: 'Outgrower Network' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get user-friendly dashboard link based on role
  const getRoleDashboardInfo = () => {
    switch (currRole) {
      case 'farmer':
      case 'supplier':
        return { id: 'farmer', label: 'My Farm Harvests', icon: <Tractor className="w-4 h-4 text-emerald-600" /> };
      case 'manufacturer':
        return { id: 'manufacturer', label: 'Wholesale & Orders', icon: <Factory className="w-4 h-4 text-amber-600" /> };
      case 'community':
        return { id: 'community', label: 'Elder & IKS Portal', icon: <Heart className="w-4 h-4 text-rose-600" /> };
      case 'admin':
        return { id: 'admin', label: 'Admin ERP Console', icon: <ShieldCheck className="w-4 h-4 text-red-600" /> };
      case 'student':
      default:
        return { id: 'student', label: 'My Academy Learning', icon: <GraduationCap className="w-4 h-4 text-emerald-600" /> };
    }
  };

  const roleDash = getRoleDashboardInfo();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Wordmark: AMH Global Traders */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/10 group-hover:scale-102 transition-transform">
              <span className="font-black text-xl tracking-wider">A</span>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-emerald-950 block leading-tight">
                AMH Global Traders
              </span>
              <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                Agro-Processing · Academy · IKS
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-semibold transition-colors pb-1 border-b-2 ${
                  currentTab === link.id
                    ? 'border-emerald-600 text-emerald-950 font-bold'
                    : 'border-transparent text-slate-600 hover:text-emerald-800 hover:border-slate-300'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Role-specific Workspace Link */}
            {currRole && (
              <button
                onClick={() => handleNavClick(roleDash.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                  currentTab === roleDash.id
                    ? 'bg-emerald-900 text-white border-emerald-950 shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-200/80 hover:bg-emerald-100'
                }`}
              >
                {roleDash.icon}
                <span>{roleDash.label}</span>
              </button>
            )}
          </nav>

          {/* Actions: Cart & Auth */}
          <div className="flex items-center gap-3">
            {/* Shopping Basket Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-emerald-800 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all flex items-center gap-2"
              aria-label="Open shopping basket"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <span className="hidden sm:inline text-xs font-bold text-slate-800">
                Basket
              </span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center -ml-0.5 shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Action */}
            {currRole ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick(roleDash.id)}
                  className="hidden sm:flex items-center gap-2 text-xs font-bold bg-slate-100 text-slate-800 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="truncate max-w-[120px]">{userName}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-red-700 hover:border-red-200 hover:bg-red-50/50 transition-all"
                  title="Sign out of account"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuth('login')}
                className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-800 rounded-xl hover:bg-emerald-900 transition-colors shadow-xs"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
                  currentTab === link.id
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {currRole && (
              <button
                onClick={() => handleNavClick(roleDash.id)}
                className="text-left px-4 py-2.5 rounded-lg text-sm font-bold text-emerald-900 bg-emerald-100 flex items-center gap-2"
              >
                {roleDash.icon}
                <span>{roleDash.label}</span>
              </button>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2">
              <span className="text-xs text-slate-500">
                {currRole ? `Signed in as ${userName}` : 'Guest Visitor'}
              </span>
              {!currRole && (
                <button
                  onClick={() => {
                    openAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-emerald-700 underline"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
