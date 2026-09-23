import React from 'react';
import { Award, Play, Video, Users, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CourseModule, ScheduledEvent, UserProgress } from '../types';

interface AcademySectionProps {
  modules: CourseModule[];
  events: ScheduledEvent[];
  progress: UserProgress;
  onOpenPlayer: () => void;
  onJoinEvent: (event: ScheduledEvent) => void;
  onOpenCertificate: () => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({
  modules,
  events,
  progress,
  onOpenPlayer,
  onJoinEvent,
  onOpenCertificate
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Continuous Agronomic Education
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          AMH H5P Academy
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Interactive xAPI video curriculum, live Jitsi agro-processing broadcasts, and verifiable academic credentialing.
        </p>
      </div>

      {/* Featured Masterclass Flagship Card */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-10 shadow-xl overflow-hidden relative">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            Flagship Course · 5 Modules
          </span>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Intensive Moringa Agro-Processing Masterclass
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
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

      {/* Live Masterclasses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-red-600 animate-pulse" />
              <span>Live Interactive Jitsi Broadcasts</span>
            </h3>
            <p className="text-xs text-slate-500">Connect with Barkly West field agronomists in real-time</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {events.length} Sessions Scheduled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[10px]">
                    {event.platform} Live Room
                  </span>
                  <span className="font-mono text-slate-500">{event.date} · {event.time}</span>
                </div>

                <h4 className="font-bold text-base text-slate-900 leading-snug">{event.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{event.desc}</p>

                <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.durationMinutes} Minutes</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Max {event.seats} Seats</span>
                  </span>
                </div>
              </div>

              <div className="pt-5">
                <button
                  onClick={() => onJoinEvent(event)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Video className="w-3.5 h-3.5 text-red-400" />
                  <span>Join Live Classroom Feed</span>
                </button>
              </div>
            </div>
          ))}
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
