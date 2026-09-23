import React, { useState, useEffect } from 'react';
import { X, Video, Users, MessageSquare, Send, CheckCircle2, CircleDot, Radio, HardDrive, Share2 } from 'lucide-react';
import { ScheduledEvent } from '../types';

interface LiveClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ScheduledEvent | null;
  userName: string;
  onConfirmAttendance: (eventTitle: string) => void;
}

export const LiveClassroomModal: React.FC<LiveClassroomModalProps> = ({
  isOpen,
  onClose,
  event,
  userName,
  onConfirmAttendance
}) => {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: 'Dr. K. Dlamini (Host)',
      text: 'Welcome to the AMH Live Processing Masterclass broadcast from Barkly West.',
      time: '14:01'
    },
    {
      sender: 'Agronomy Tech',
      text: 'Please submit screw-press temperature calibration questions here in real-time.',
      time: '14:02'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [attendanceLogged, setAttendanceLogged] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingArchived, setRecordingArchived] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  if (!isOpen || !event) return null;

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingArchived(false);
    } else {
      setIsRecording(false);
      setRecordingArchived(true);
    }
  };

  const formatRecordingTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: userName || 'Student',
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatInput('');
  };

  const handleRecordAttendance = () => {
    setAttendanceLogged(true);
    onConfirmAttendance(event.title);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-5xl h-[88vh] bg-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col border border-slate-800">
        {/* Top Control Bar */}
        <div className="bg-slate-950 p-4 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 animate-pulse">
              <Video className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">
                Live Broadcast Session · Room: {event.room}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-white truncate">{event.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cloud Recording Controls for Session Moderator */}
            {isRecording ? (
              <button
                onClick={handleToggleRecording}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 animate-pulse shadow-md"
                title="Click to stop cloud recording"
              >
                <CircleDot className="w-3.5 h-3.5 text-white" />
                <span>REC {formatRecordingTime(recordingSeconds)}</span>
              </button>
            ) : (
              <button
                onClick={handleToggleRecording}
                className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 border border-slate-700"
                title="Start cloud recording to Academy Archive"
              >
                <Radio className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Record Summit</span>
                <span className="sm:hidden">Rec</span>
              </button>
            )}

            {!attendanceLogged ? (
              <button
                onClick={handleRecordAttendance}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Confirm Attendance</span>
                <span className="sm:hidden">Attended</span>
              </button>
            ) : (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas & Live Chat Grid */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Virtual Stage */}
          <div className="flex-1 bg-black relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Embedded Live Video Simulation */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />

            <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-2xl">
              <Video className="w-8 h-8" />
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white z-20">
              Interactive Jitsi Classroom Feed Active
            </h4>
            <p className="text-xs text-slate-400 max-w-md z-20 mt-1">
              Agronomists presenting from Barkly West Agro-Processing Facility. Audio and high-definition telemetry stream synchronized.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4 z-20">
              <span className="px-3 py-1 rounded-full bg-red-900/60 text-red-300 text-xs font-bold border border-red-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>LIVE ON-AIR</span>
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                <Users className="w-3.5 h-3.5 text-slate-500" /> 38 Enrolled Attendees
              </span>
              {isRecording && (
                <span className="text-xs text-red-300 bg-red-950/80 px-2.5 py-1 rounded-full border border-red-700/60 flex items-center gap-1.5 font-mono">
                  <HardDrive className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  JaaS S3 Cloud Recording Active ({formatRecordingTime(recordingSeconds)})
                </span>
              )}
            </div>

            {recordingArchived && (
              <div className="mt-3 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs z-20 flex items-center gap-2 max-w-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Masterclass recording finalized & archived to Academy LMS Replay Vault!</span>
              </div>
            )}
          </div>

          {/* Right Live Chat Stream */}
          <div className="w-full md:w-80 bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col shrink-0">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-400" /> Live Q&A Stream
              </span>
              <span className="text-[10px] text-slate-500">Moderated</span>
            </div>

            {/* Message stream */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-bold text-emerald-400">{m.sender}</span>
                    <span>{m.time}</span>
                  </div>
                  <p className="text-slate-200 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask agronomist..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
