import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  CheckCircle2,
  Lock,
  Bookmark,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Award,
  Save,
  Search,
  Sparkles,
  HelpCircle,
  Activity,
  Layers,
  Thermometer,
  Gauge,
  Droplets,
  Sun,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { CourseModule, UserProgress } from '../types';

interface LmsPlayerProps {
  modules: CourseModule[];
  progress: UserProgress;
  onBackToPortal: () => void;
  onCompleteModule: (moduleIndex: number) => void;
  onOpenCertificate: () => void;
  onShowToast: (msg: string) => void;
}

export const LmsPlayer: React.FC<LmsPlayerProps> = ({
  modules,
  progress,
  onBackToPortal,
  onCompleteModule,
  onOpenCertificate,
  onShowToast
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    // Default to first incomplete or highest unlocked
    for (let i = 0; i < modules.length; i++) {
      if (!progress.completedModules.includes(i)) return i;
    }
    return 0;
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(145); // start 2:25 into lesson
  const [duration] = useState(1080); // 18 minutes in seconds
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playerMode, setPlayerMode] = useState<'simulation' | 'video'>('simulation');
  const [h5pOpen, setH5pOpen] = useState(false);
  const [h5pFeedback, setH5pFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const [notes, setNotes] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('amh_lesson_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('amh_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchFilter, setSearchFilter] = useState('');
  const [theaterMode, setTheaterMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentMod = modules[currentIdx] || modules[0];
  const isCurrentCompleted = progress.completedModules.includes(currentIdx);

  // Timer simulation for playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            setH5pOpen(true);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackRate]);

  // Reset timer on module change
  useEffect(() => {
    setCurrentTime(35);
    setIsPlaying(true);
  }, [currentIdx]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCurrentTime(Math.floor(pos * duration));
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    onShowToast(`Playback speed set to ${rate}×`);
  };

  const toggleBookmark = () => {
    setBookmarks((prev) => {
      const next = prev.includes(currentIdx)
        ? prev.filter((i) => i !== currentIdx)
        : [...prev, currentIdx];
      localStorage.setItem('amh_bookmarks', JSON.stringify(next));
      onShowToast(prev.includes(currentIdx) ? 'Bookmark removed' : 'Module bookmarked');
      return next;
    });
  };

  const saveNotes = () => {
    localStorage.setItem('amh_lesson_notes', JSON.stringify(notes));
    onShowToast('Notes saved successfully');
  };

  const handleH5pChoice = (choiceIndex: number) => {
    if (choiceIndex === currentMod.h5p.correctIndex) {
      setH5pFeedback({
        isCorrect: true,
        message: currentMod.h5p.successFeedback
      });
      setTimeout(() => {
        setH5pOpen(false);
        setH5pFeedback(null);
        onCompleteModule(currentIdx);
      }, 1400);
    } else {
      setH5pFeedback({
        isCorrect: false,
        message: currentMod.h5p.guidance
      });
    }
  };

  const handleNextLesson = () => {
    if (!isCurrentCompleted) {
      onShowToast('Please complete the calibration checkpoint before advancing.');
      setH5pOpen(true);
      return;
    }
    if (currentIdx < modules.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onShowToast('All modules complete! Certificate is ready.');
      onOpenCertificate();
    }
  };

  const handlePrevLesson = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement?.tagName.toLowerCase();
      if (activeEl === 'input' || activeEl === 'textarea') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === 'n') {
        handleNextLesson();
      } else if (e.key.toLowerCase() === 'p') {
        handlePrevLesson();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, isCurrentCompleted, isPlaying]);

  const filteredModules = modules.filter((m) =>
    m.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Workspace</span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                AMH Masterclass Studio
              </span>
              <span className="inline-block px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 text-[10px] font-mono border border-emerald-800/60">
                1080p Telemetry
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              Module {currentIdx + 1}: {currentMod.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
            <button
              onClick={() => setPlayerMode('simulation')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                playerMode === 'simulation'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>Technical Simulation</span>
            </button>
            <button
              onClick={() => setPlayerMode('video')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                playerMode === 'video'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>Video Feed</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {progress.progressPercent}%
            </span>
          </div>

          {progress.completed && (
            <button
              onClick={onOpenCertificate}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main LMS Stage & Sidebar Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Stage & Controls */}
        <div className={`flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 ${theaterMode ? 'max-w-none' : ''}`}>
          {/* Video Container with Overlays */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-16/9 shadow-2xl border border-slate-800/90 group flex flex-col justify-between">
            {/* Visualizer Stage: Simulation or Video */}
            {playerMode === 'simulation' ? (
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-6 flex flex-col justify-between overflow-hidden">
                {/* Stage Header Info Overlay */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                      Barkly West Facility · Interactive Technical Visualizer
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                      Step {currentIdx + 1} of 5
                    </span>
                    <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                      Telemetry Synced
                    </span>
                  </div>
                </div>

                {/* Animated Graphic Center Area Based on Module */}
                <div className="relative flex-1 flex items-center justify-center py-4 z-10">
                  {currentIdx === 0 && (
                    /* Module 1: Agronomy Spacing & Soil */
                    <div className="w-full max-w-xl grid grid-cols-2 gap-4 text-left">
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 shadow-lg space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                          PKM-1 High-Density Leaf Hedgerow
                        </span>
                        <div className="text-xl font-extrabold text-white font-mono">1.0m × 1.0m</div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Dense canopy geometry maximizing foliage biomass per hectare. Frequent 45-day coppicing cycle.
                        </p>
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                          <span>Soil pH: 6.8 (Neutral)</span>
                          <span className="text-emerald-300">Moisture: 42%</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-lg space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                          PKM-2 Perennial Seed Orchard
                        </span>
                        <div className="text-xl font-extrabold text-white font-mono">2.5m × 2.5m</div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Permanent orchard spacing calibrated for heavy pod development and cold-press oil seed harvest.
                        </p>
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-amber-400 font-mono">
                          <span>Root Depth: 2.8m</span>
                          <span>Yield: 4.5 T/Ha</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentIdx === 1 && (
                    /* Module 2: Dew Point & Harvest Timing */
                    <div className="w-full max-w-lg bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-2xl text-left space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <Sun className="w-4 h-4 text-amber-400" />
                          <span>Solar Photo-Oxidation Spectrograph</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          Dawn Window: 05:30 - 08:00 SAST
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center py-2">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block uppercase">Ambient Temp</span>
                          <span className="text-base font-bold text-white font-mono">18.4 °C</span>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block uppercase">Relative Humidity</span>
                          <span className="text-base font-bold text-emerald-400 font-mono">84 % RH</span>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block uppercase">Vit-C Retention</span>
                          <span className="text-base font-bold text-emerald-400 font-mono">98.6 %</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        Dawn harvesting captures peak osmotic pressure and protects ascorbic acid from photodegradation before midday UV photolysis.
                      </p>
                    </div>
                  )}

                  {currentIdx === 2 && (
                    /* Module 3: Cold Press & Pressure Control */
                    <div className="w-full max-w-xl bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-2xl text-left space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                          <Gauge className="w-4 h-4 text-emerald-400" />
                          <span>Screw-Press Hydraulic Extraction Monitor</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          Target: &lt; 40.0°C (True Cold-Press)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Hydraulic Cylinder Pressure</span>
                            <span className="text-emerald-400 font-bold font-mono">35.2 Bar</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-emerald-500 h-full w-[78%]" />
                          </div>
                          <span className="text-[10px] text-slate-500 block pt-1">
                            Calibrated within operating band (30–45 Bar)
                          </span>
                        </div>

                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Friction Thermal Sensor</span>
                            <span className="text-emerald-300 font-bold font-mono">37.6 °C</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-emerald-400 h-full w-[65%]" />
                          </div>
                          <span className="text-[10px] text-emerald-400 block pt-1">
                            ✓ Virgin Grade: 2.4°C below safety threshold
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentIdx === 3 && (
                    /* Module 4: Clarification & Quality Assurance */
                    <div className="w-full max-w-xl bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-2xl text-left space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <Droplets className="w-4 h-4 text-emerald-400" />
                          <span>Sub-Micron Membrane & Purity Verification</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          Batch: AMH-OIL-2026-B4
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase block">Clarity (NTU)</span>
                          <span className="text-base font-bold text-white font-mono">0.38 NTU</span>
                          <span className="text-[9px] text-emerald-400 block">Specular Clear</span>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase block">Free Fatty Acids</span>
                          <span className="text-base font-bold text-white font-mono">0.42 %</span>
                          <span className="text-[9px] text-emerald-400 block">Target &lt; 1.0%</span>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase block">Oleic / Behenic</span>
                          <span className="text-base font-bold text-white font-mono">72.4 %</span>
                          <span className="text-[9px] text-emerald-400 block">Cosmetic Standard</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentIdx === 4 && (
                    /* Module 5: Capstone Certification */
                    <div className="w-full max-w-lg bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-5 shadow-2xl text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-900/80 border border-emerald-500 text-emerald-300 flex items-center justify-center mx-auto">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-white">
                        Capstone Accreditation & Verification Node
                      </h4>
                      <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                        Completing the final checkpoint issues an immutable digital credential encoded with a cryptographically signed QR verification matrix.
                      </p>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 flex items-center justify-center gap-2">
                        <span>Verification Endpoint:</span>
                        <span className="text-white underline">amhglobal.com/verify?cert=AMH-CERT-84920</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Simulated Audio Spectrum & State Footer */}
                <div className="flex items-center justify-between text-xs text-slate-400 z-10 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-emerald-400">Audio Narration:</span>
                    <div className="flex items-end gap-1 h-3.5">
                      {[12, 18, 8, 22, 14, 20, 10, 16].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-xs transition-all ${
                            isPlaying && !isMuted ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'
                          }`}
                          style={{ height: isPlaying && !isMuted ? `${h}px` : '4px' }}
                        />
                      ))}
                    </div>
                  </div>

                  <span className="font-mono text-emerald-400 text-[11px]">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
            ) : (
              /* Fallback Safe Video Element with Error Handling */
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls={false}
                playsInline
                onError={() => {
                  setPlayerMode('simulation');
                  onShowToast('Direct video stream restricted in iframe sandbox. Switched to Interactive Simulation.');
                }}
              >
                <source src={currentMod.videoSrc} type="video/mp4" />
                Your browser does not support HTML5 video streaming.
              </video>
            )}

            {/* Play Overlay Button if Paused */}
            {!isPlaying && !h5pOpen && (
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center cursor-pointer transition-opacity z-20"
                onClick={togglePlay}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform">
                  <Play className="w-7 h-7 ml-1" />
                </div>
              </div>
            )}

            {/* Interactive H5P Checkpoint Overlay */}
            {h5pOpen && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 flex items-center justify-center p-4 sm:p-6">
                <div className="max-w-lg w-full bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl text-left space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <Sparkles className="w-4 h-4" />
                      <span>H5P Knowledge Checkpoint · Module {currentIdx + 1}</span>
                    </div>
                    <button
                      onClick={() => setH5pOpen(false)}
                      className="text-slate-400 hover:text-white text-xs font-semibold"
                    >
                      Dismiss
                    </button>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-white leading-snug">
                    {currentMod.h5p.question}
                  </h3>

                  <div className="space-y-2 pt-1">
                    {currentMod.h5p.choices.map((choice, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleH5pChoice(cIdx)}
                        className="w-full p-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-emerald-950 hover:border-emerald-600 text-left text-xs font-medium text-slate-200 transition-all flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {String.fromCharCode(65 + cIdx)}
                        </span>
                        <span>{choice}</span>
                      </button>
                    ))}
                  </div>

                  {h5pFeedback && (
                    <div
                      className={`p-3 rounded-xl text-xs font-semibold ${
                        h5pFeedback.isCorrect
                          ? 'bg-emerald-900/80 border border-emerald-500 text-emerald-200'
                          : 'bg-red-900/80 border border-red-500 text-red-200'
                      }`}
                    >
                      {h5pFeedback.message}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Scrubber Timeline */}
          <div className="mt-3 space-y-1">
            <div
              className="w-full bg-slate-800 hover:bg-slate-700 h-2.5 rounded-full cursor-pointer overflow-hidden relative group/timeline"
              onClick={handleSeek}
            >
              <div
                className="bg-emerald-500 h-full transition-all duration-150 relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md opacity-0 group-hover/timeline:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Utility Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 py-2 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Rewind 10s"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentTime((t) => Math.min(duration, t + 10))}
                className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Forward 10s"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[11px] font-mono">
                {[0.75, 1, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handleRateChange(rate)}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      playbackRate === rate
                        ? 'bg-emerald-800 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {rate}×
                  </button>
                ))}
              </div>

              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg border transition-colors ${
                  bookmarks.includes(currentIdx)
                    ? 'border-amber-500 text-amber-400 bg-amber-950/40'
                    : 'border-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Bookmark module"
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setTheaterMode(!theaterMode)}
                className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Theater focus"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setH5pOpen(true)}
                className="px-3 py-1.5 rounded-lg border border-emerald-500/50 text-emerald-400 hover:bg-emerald-950 transition-colors font-semibold flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Knowledge Check</span>
              </button>

              <button
                onClick={handlePrevLesson}
                disabled={currentIdx === 0}
                className="p-1.5 rounded-lg border border-slate-800 disabled:opacity-40 hover:bg-slate-800 transition-colors"
                title="Previous module"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextLesson}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 transition-colors"
              >
                <span>{currentIdx === modules.length - 1 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Lesson Details & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-emerald-400 text-xs font-semibold block mb-1">
                  Module {currentIdx + 1} of {modules.length} · {currentMod.duration || 'Self-Paced'}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {currentMod.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {currentMod.description}
                </p>
              </div>

              {/* Status and Resources */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Checkpoint Status:</span>
                  <span
                    className={`font-bold flex items-center gap-1 ${
                      isCurrentCompleted ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {isCurrentCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed & Verified
                      </>
                    ) : (
                      'Required to Advance'
                    )}
                  </span>
                </div>

                {currentMod.resource && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Technical Document:</span>
                    <button
                      onClick={() => onShowToast(`Initiated download: ${currentMod.resource}`)}
                      className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{currentMod.resource}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Notes Panel */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span className="text-xs font-bold text-slate-300">My Module Notes</span>
                <button
                  onClick={saveNotes}
                  className="text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  <span>Save</span>
                </button>
              </div>
              <textarea
                value={notes[currentIdx] || ''}
                onChange={(e) => setNotes({ ...notes, [currentIdx]: e.target.value })}
                placeholder="Jot down key takeaways, hydraulic settings, or questions..."
                className="flex-1 w-full bg-slate-950/60 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-hidden focus:border-emerald-500 resize-none min-h-[140px]"
              />
              <span className="text-[10px] text-slate-500 mt-2 block text-right">
                Saved locally on your device
              </span>
            </div>
          </div>
        </div>

        {/* Right: Syllabus Playlist Sidebar */}
        <div className="w-full lg:w-80 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white uppercase tracking-wider">
                Course Syllabus
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {progress.completedModules.length}/{modules.length} Completed
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredModules.map((mod) => {
              const originalIdx = modules.findIndex((m) => m.id === mod.id);
              const isDone = progress.completedModules.includes(originalIdx);
              const isActive = originalIdx === currentIdx;
              const isLocked = !isDone && originalIdx > progress.highestUnlockedIndex;

              return (
                <button
                  key={mod.id}
                  disabled={isLocked}
                  onClick={() => {
                    setCurrentIdx(originalIdx);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-950/40 text-white'
                      : isLocked
                      ? 'border-slate-800/40 bg-slate-950/40 text-slate-600 opacity-60 cursor-not-allowed'
                      : 'border-slate-800 bg-slate-950/80 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 text-slate-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-emerald-500/60 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
                        {originalIdx + 1}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold leading-snug truncate">
                      {originalIdx + 1}. {mod.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                      <span>{mod.duration || 'Video'}</span>
                      <span>·</span>
                      <span>Checkpoint</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Shortcuts: Space (play), N (next), P (prev)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
