import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Tractor,
  Factory,
  Heart,
  GraduationCap,
  X,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { DEMO_ACCOUNTS } from '../data/seedData';
import { AuthRole } from '../types';

interface RoleDemoBannerProps {
  currentRole: AuthRole;
  currentName: string;
  onSelectRole: (role: AuthRole, name: string, email: string) => void;
}

export const RoleDemoBanner: React.FC<RoleDemoBannerProps> = ({
  currentRole,
  currentName,
  onSelectRole
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Security Hardening: Perspective switching is strictly restricted to authenticated Admin users
  if (currentRole !== 'admin' || isDismissed) {
    return null;
  }

  const getRoleIcon = (role: AuthRole) => {
    switch (role) {
      case 'farmer':
      case 'supplier':
        return <Tractor className="w-3.5 h-3.5 text-emerald-600" />;
      case 'manufacturer':
        return <Factory className="w-3.5 h-3.5 text-amber-600" />;
      case 'community':
        return <Heart className="w-3.5 h-3.5 text-rose-600" />;
      case 'student':
        return <GraduationCap className="w-3.5 h-3.5 text-sky-600" />;
      case 'admin':
        return <ShieldCheck className="w-3.5 h-3.5 text-red-600" />;
      default:
        return <Users className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <aside aria-label="Portal Perspective Switcher" className="fixed bottom-4 right-4 z-40">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 w-72 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-xs font-bold text-slate-800">Preview Portal Views</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                title="Collapse"
              >
                <ChevronUp className="w-3.5 h-3.5 rotate-180" />
              </button>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
                title="Hide completely"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {DEMO_ACCOUNTS.map((acc) => {
              const isActive = currentRole === acc.role;
              return (
                <button
                  key={acc.role}
                  onClick={() => {
                    onSelectRole(acc.role, acc.name, acc.email);
                    setIsOpen(false);
                  }}
                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-300'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {getRoleIcon(acc.role)}
                    <span>{acc.roleLabel}</span>
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900/90 hover:bg-slate-900 text-white px-3 py-2 rounded-full shadow-lg backdrop-blur-xs border border-slate-700 text-xs font-semibold flex items-center gap-2 hover:scale-102 transition-all cursor-pointer"
          title="Switch perspective to test different roles (Farmer, Buyer, Elder, Student, Admin)"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Switch Perspective</span>
        </button>
      )}
    </aside>
  );
};
