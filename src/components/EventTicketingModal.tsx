import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Ticket,
  QrCode,
  Download,
  Share2,
  Users,
  ShieldCheck,
  Video
} from 'lucide-react';
import { ScheduledEvent, EventTicket } from '../types';

interface EventTicketingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ScheduledEvent | null;
  userName?: string;
  userEmail?: string;
  onIssueTicket: (ticket: EventTicket) => void;
  onShowToast: (msg: string) => void;
}

export const EventTicketingModal: React.FC<EventTicketingModalProps> = ({
  isOpen,
  onClose,
  event,
  userName = '',
  userEmail = '',
  onIssueTicket,
  onShowToast
}) => {
  const [attendeeName, setAttendeeName] = useState(userName || '');
  const [attendeeEmail, setAttendeeEmail] = useState(userEmail || '');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [issuedTicket, setIssuedTicket] = useState<EventTicket | null>(null);

  if (!isOpen || !event) return null;

  const tiers = event.ticketTiers && event.ticketTiers.length > 0
    ? event.ticketTiers
    : [
        {
          name: 'General Admission',
          price: event.price || 0,
          description: event.platform === 'Jitsi' ? 'Access to live interactive stream and chat' : 'Full event entry and standard seating',
          availableSeats: event.seats
        }
      ];

  const currentTier = tiers[selectedTierIndex] || tiers[0];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName.trim() || !attendeeEmail.trim()) {
      onShowToast('Please provide your name and email to issue the ticket.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newTicket: EventTicket = {
      ticketId: `AMH-TKT-2026-${randomSuffix}`,
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      time: event.time,
      platformOrLocation: event.location || (event.platform === 'Jitsi' ? 'Virtual Broadcast Room' : 'Barkly West Facility'),
      tier: currentTier.name,
      price: currentTier.price,
      attendeeName: attendeeName.trim(),
      attendeeEmail: attendeeEmail.trim(),
      organization: organization.trim() || undefined,
      phone: phone.trim() || undefined,
      issuedAt: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };

    setIssuedTicket(newTicket);
    onIssueTicket(newTicket);
    onShowToast(`Ticket confirmed! Pass ${newTicket.ticketId} issued to ${newTicket.attendeeName}`);
  };

  const handleDownloadIcs = () => {
    if (!issuedTicket) return;
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AMH Global Traders//Event Ticketing//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${issuedTicket.eventTitle}`,
      `DESCRIPTION:Verified AMH Event Ticket: ${issuedTicket.ticketId}. Tier: ${issuedTicket.tier}. Attendee: ${issuedTicket.attendeeName}`,
      `LOCATION:${issuedTicket.platformOrLocation}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${issuedTicket.ticketId}_AMH_Event.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('Calendar event downloaded (.ics)');
  };

  const handleReset = () => {
    setIssuedTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={handleReset} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-slate-200">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-6 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-300 border border-emerald-700/50">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                {event.category || 'Official AMH Event'}
              </span>
              <h3 className="font-bold text-base text-white leading-tight">
                Event Registration & Ticketing
              </h3>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {issuedTicket ? (
          /* Ticket Pass Confirmation Card */
          <div className="p-6 space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-dashed border-emerald-300 relative space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                    Official Ticket Pass · {issuedTicket.status}
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1 leading-snug">
                    {issuedTicket.eventTitle}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ticket ID: <span className="font-mono font-bold text-emerald-900">{issuedTicket.ticketId}</span>
                  </p>
                </div>
                <div className="p-2 bg-white rounded-xl border border-emerald-200 shadow-2xs shrink-0 flex flex-col items-center">
                  <QrCode className="w-12 h-12 text-slate-800" />
                  <span className="text-[8px] font-mono text-slate-500 mt-0.5">Scan to Verify</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-emerald-200/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">Attendee Name:</span>
                  <strong className="text-slate-900 font-bold">{issuedTicket.attendeeName}</strong>
                  {issuedTicket.organization && (
                    <span className="text-slate-500 block text-[10px] truncate">{issuedTicket.organization}</span>
                  )}
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Ticket Tier:</span>
                  <strong className="text-emerald-900 font-bold">{issuedTicket.tier}</strong>
                  <span className="text-slate-600 block text-[10px]">
                    {issuedTicket.price === 0 ? 'Complimentary Pass' : `R ${issuedTicket.price.toFixed(2)}`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Date & Time:</span>
                  <strong className="text-slate-900">{issuedTicket.date} · {issuedTicket.time}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Location / Format:</span>
                  <strong className="text-slate-900 truncate block">{issuedTicket.platformOrLocation}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ticket registered in AMH Student Portal & sent to {issuedTicket.attendeeEmail}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadIcs}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegister} className="p-6 space-y-5">
            {/* Event Summary Banner */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-2">
              <h4 className="font-bold text-sm text-slate-900">{event.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{event.desc}</p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{event.date}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{event.time} ({event.durationMinutes} min)</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{event.location || event.platform}</span>
                </span>
              </div>
            </div>

            {/* Ticket Tier Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Ticket Tier:
              </label>
              <div className="space-y-2">
                {tiers.map((tier, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedTierIndex(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                      selectedTierIndex === idx
                        ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-500 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-bold text-slate-900">{tier.name}</strong>
                        {tier.availableSeats && (
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                            {tier.availableSeats} seats left
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">{tier.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-black text-emerald-900 block">
                        {tier.price === 0 ? 'FREE' : `R ${tier.price.toFixed(2)}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Attendee Form Fields */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Attendee Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Nomvula Sithole"
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nomvula@agri-innovation.org"
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organization / Farm Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kalahari Outgrowers Co-op"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+27 82 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>
                  Confirm Registration & Issue Ticket Pass ({currentTier.price === 0 ? 'Complimentary' : `R ${currentTier.price.toFixed(2)}`})
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
