import React, { useState } from 'react';
import {
  Award,
  Play,
  Video,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Ticket,
  MapPin,
  Calendar,
  Sparkles
} from 'lucide-react';
import { CourseModule, ScheduledEvent, UserProgress } from '../types';

interface AcademySectionProps {
  modules: CourseModule[];
  events: ScheduledEvent[];
  progress: UserProgress;
  onOpenPlayer: () => void;
  onJoinEvent: (event: ScheduledEvent) => void;
  onOpenCertificate: () => void;
  onBookEventTicket?: (event: ScheduledEvent) => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({
  modules,
  events,
  progress,
  onOpenPlayer,
  onJoinEvent,
  onOpenCertificate,
  onBookEventTicket
}) => {
  const [selectedEventCat, setSelectedEventCat] = useState<string>('All');

  const eventCategories = ['All', 'Live Training', 'Bootcamp', 'Industry Summit'];

  const filteredEvents = events.filter((ev) => {
    if (selectedEventCat === 'All') return true;
    if (selectedEventCat === 'Industry Summit') {
      return ev.category === 'Industry Summit' || (ev.category as string) === 'Summit';
    }
    return ev.category === selectedEventCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Continuous Agronomic Education & Industry Forums
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          AMH Academy, Masterclasses & Summits
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Interactive xAPI video curriculum, live processing broadcasts, intensive multi-day farmer bootcamps, and registered industry summit ticketing.
        </p>
      </div>

      {/* Featured Masterclass Flagship Card */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-10 shadow-xl overflow-hidden relative border border-emerald-800/40">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            Flagship Course · 5 Modules
          </span>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Intensive Moringa Agro-Processing Masterclass
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Master the complete value chain from dawn dew point harvesting and soil pH calibration to GMP-compliant hydraulic cold-pressing (&lt;40°C) and European cosmetic regulatory documentation.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenPlayer}
              className="px-6 py-3 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-emerald-950 text-emerald-950" />
              <span>
                {progress.progressPercent > 0 ? `Resume (${progress.progressPercent}%)` : 'Start Masterclass'}
              </span>
            </button>

            {progress.completed ? (
              <button
                onClick={onOpenCertificate}
                className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center gap-2 border border-emerald-500/40"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Claim Verified Certificate</span>
              </button>
            ) : (
              <span className="text-xs text-emerald-300/80 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Complete 5 checkpoints to claim certificate</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Events, Bootcamps & Summits Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-200 gap-4">
          <div>
            <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <span>Live Training, Bootcamps & Industry Summits</span>
            </h3>
            <p className="text-xs text-slate-500">
              Register for upcoming broadcast sessions, hands-on field workshops, and regional trade summits
            </p>
          </div>

          {/* Event Category Filters */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {eventCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedEventCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedEventCat === cat
                    ? 'bg-emerald-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const hasMultipleTiers = event.ticketTiers && event.ticketTiers.length > 1;
            const minPrice = event.ticketTiers && event.ticketTiers.length > 0
              ? Math.min(...event.ticketTiers.map((t) => t.price))
              : (event.price || 0);

            return (
              <div
                key={event.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                      event.category === 'Industry Summit' || (event.category as string) === 'Summit'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : event.category === 'Bootcamp'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-blue-100 text-blue-900 border border-blue-300'
                    }`}>
                      {event.category || 'Live Training'}
                    </span>
                    <span className="font-mono text-slate-500 font-medium">
                      {event.date} · {event.time}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {event.desc}
                  </p>

                  <div className="pt-2 space-y-1.5 text-xs text-slate-500 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="truncate max-w-[180px]">{event.location || event.platform}</span>
                      </span>
                      <span className="flex items-center gap-1 font-mono font-bold text-emerald-900">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{event.durationMinutes}m</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.seats} Max Capacity</span>
                      </span>
                      <span className="font-bold text-xs text-emerald-900">
                        {minPrice === 0 ? 'Complimentary' : `From R ${minPrice.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 space-y-2">
                  {onBookEventTicket && (
                    <button
                      onClick={() => onBookEventTicket(event)}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Ticket className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Register / Book Ticket</span>
                    </button>
                  )}

                  {event.platform === 'Jitsi' && (
                    <button
                      onClick={() => onJoinEvent(event)}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Video className="w-3.5 h-3.5 text-red-600" />
                      <span>Join Live Room Stream</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Module Cards Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-900">
          5 Core Calibration Modules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m, idx) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-800">Module {idx + 1}</span>
                  <span className="text-slate-400 font-mono">{m.duration || '20 min'}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{m.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {m.description}
                </p>
              </div>

              <button
                onClick={onOpenPlayer}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center justify-between"
              >
                <span>Launch Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
