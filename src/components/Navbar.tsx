import React, { useState } from 'react';
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
  GraduationCap,
  Leaf,
  ChevronDown
} from 'lucide-react';
import { AuthRole, CurrencyCode } from '../types';
import { useCurrency } from '../context/CurrencyContext';

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
  const { currency, setCurrency, allCurrencies } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'store', label: 'Products & Store' },
    { id: 'academy', label: 'Academy & Summits' },
    { id: 'iks', label: 'IKS Sanctuary' },
    { id: 'ecosystem', label: 'Affiliates & Network' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get user-friendly dashboard link based on role
  const getRoleDashboardInfo = () => {
    switch (currRole) {
      case 'farmer':
      case 'supplier':
        return {
          id: 'farmer',
          label: 'Outgrower Portal',
          badge: 'Farmer',
          icon: <Tractor className="w-4 h-4 text-emerald-600" />
        };
      case 'manufacturer':
        return {
          id: 'manufacturer',
          label: 'Manufacturer Portal',
          badge: 'Buyer',
          icon: <Factory className="w-4 h-4 text-amber-600" />
        };
      case 'community':
        return {
          id: 'community',
          label: 'Elder & IKS Portal',
          badge: 'Elder',
          icon: <Heart className="w-4 h-4 text-rose-600" />
        };
      case 'admin':
        return {
          id: 'admin',
          label: 'Admin ERP Console',
          badge: 'Admin',
          icon: <ShieldCheck className="w-4 h-4 text-red-600" />
        };
      case 'student':
      default:
        return {
          id: 'student',
          label: 'My Academy Learning',
          badge: 'Student',
          icon: <GraduationCap className="w-4 h-4 text-emerald-600" />
        };
    }
  };

  const roleDash = getRoleDashboardInfo();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 flex items-center justify-center text-emerald-300 shadow-md shadow-emerald-950/15 border border-emerald-600/30 group-hover:scale-102 transition-transform">
              <Leaf className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-950 leading-tight">
                  AMH
                </span>
                <span className="text-lg sm:text-xl font-black tracking-tight text-emerald-800 leading-tight">
                  GLOBAL TRADERS
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase hidden sm:block">
                Pan-African Agro-Processing · Ghana & SA Hubs · 44 Nations
              </span>
              <span className="text-[9px] font-semibold text-slate-500 tracking-wider uppercase block sm:hidden">
                Accra &amp; SA Hubs · 44 Nations
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-emerald-900 font-bold'
                      : 'text-slate-600 hover:text-emerald-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Portal Workspace Link (when authenticated) */}
            {currRole && (
              <button
                onClick={() => handleNavClick(roleDash.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
                  currentTab === roleDash.id
                    ? 'bg-emerald-900 text-white border-emerald-950 shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-200/90 hover:bg-emerald-100'
                }`}
              >
                {roleDash.icon}
                <span>{roleDash.label}</span>
              </button>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Pan-African Regional Currency Switcher */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="appearance-none bg-slate-50 hover:bg-white text-xs font-bold text-slate-800 border border-slate-200 hover:border-emerald-300 py-1.5 px-2.5 rounded-lg cursor-pointer transition-all shadow-2xs focus:ring-1 focus:ring-emerald-600 focus:outline-hidden"
                title={`Active Currency: ${allCurrencies[currency].name} (${currency})`}
                aria-label="Select store currency"
              >
                <option value="GHS">🇬🇭 GHS (GH₵)</option>
                <option value="ZAR">🇿🇦 ZAR (R)</option>
                <option value="USD">🌐 USD ($)</option>
              </select>
            </div>

            {/* Shopping Basket */}
            <button
              onClick={openCart}
              className="relative p-2 sm:px-3 sm:py-2 rounded-lg border border-slate-200 text-slate-700 hover:text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all flex items-center gap-1.5"
              aria-label="Open shopping basket"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-800" />
              <span className="hidden sm:inline text-xs font-bold text-slate-800">
                Basket
              </span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-emerald-700 text-white text-[10px] font-black shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / Account Profile */}
            {currRole ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 bg-slate-50 hover:bg-white transition-all text-left"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:block text-left min-w-0 max-w-[100px] truncate">
                    <span className="text-xs font-bold text-slate-900 block truncate leading-tight">
                      {userName.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider block">
                      {roleDash.badge}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
                      <p className="text-[10px] text-emerald-700 font-semibold uppercase">{roleDash.badge} Account</p>
                    </div>
                    <button
                      onClick={() => handleNavClick(roleDash.id)}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-900 flex items-center gap-2"
                    >
                      {roleDash.icon}
                      <span>{roleDash.label}</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuth('login')}
                className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold ${
                  currentTab === link.id
                    ? 'bg-emerald-50 text-emerald-950 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {currRole && (
              <button
                onClick={() => handleNavClick(roleDash.id)}
                className="text-left px-3.5 py-2.5 rounded-lg text-sm font-bold text-emerald-950 bg-emerald-100/70 flex items-center gap-2"
              >
                {roleDash.icon}
                <span>{roleDash.label}</span>
              </button>
            )}

            {/* Mobile Currency Selector */}
            <div className="pt-2 px-1">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Currency:</span>
                <div className="flex gap-1">
                  {(Object.keys(allCurrencies) as CurrencyCode[]).map((cCode) => (
                    <button
                      key={cCode}
                      onClick={() => setCurrency(cCode)}
                      className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                        currency === cCode
                          ? 'bg-emerald-900 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-emerald-900'
                      }`}
                    >
                      {allCurrencies[cCode].flag} {cCode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2">
              <span className="text-xs text-slate-500">
                {currRole ? `Signed in: ${userName}` : 'Guest Visitor'}
              </span>
              {currRole ? (
                <button
                  onClick={onLogout}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    openAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-emerald-800 underline"
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
