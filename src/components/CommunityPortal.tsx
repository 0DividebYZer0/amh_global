import React, { useState } from 'react';
import {
  Heart,
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Sprout,
  Users,
  Send,
  CheckCircle2,
  Phone,
  FileText,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { IksArticle } from '../types';
import { usePlainLanguage } from '../context/PlainLanguageContext';

interface CommunityPortalProps {
  elderName: string;
  region: string;
  articles: IksArticle[];
  onOpenArticle: (article: IksArticle) => void;
  onSubmitWisdom: (data: {
    name: string;
    contact: string;
    region: string;
    area: string;
    experience: string;
    proposal: string;
    consentNotes: string;
  }) => void;
  onShowToast: (msg: string) => void;
}

export const CommunityPortal: React.FC<CommunityPortalProps> = ({
  elderName,
  region,
  articles,
  onOpenArticle,
  onSubmitWisdom,
  onShowToast
}) => {
  const { isPlainLanguage, simplify } = usePlainLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [traditionalName, setTraditionalName] = useState('Crushed Seed Flocculation for Murky Water');
  const [elderSpeaker, setElderSpeaker] = useState(elderName);
  const [village, setVillage] = useState(region);
  const [plantUse, setPlantUse] = useState(
    'Crushing dry moringa seeds into powder and stirring into river water causes mud to settle in 40 minutes, making water clear and drinkable.'
  );
  const [consentAgreed, setConsentAgreed] = useState(true);
  const [seedlingsRequested, setSeedlingsRequested] = useState(50);
  const [seedlingPurpose, setSeedlingPurpose] = useState('Community School Garden & Nutrition');

  // Read aloud helper for older elders / community members
  const handleReadAloud = (customText?: string) => {
    if (!('speechSynthesis' in window)) {
      onShowToast('Audio voice is not supported on this browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const text =
      customText ||
      (isPlainLanguage
        ? `Dumelang and welcome ${elderName}. This is the traditional plant wisdom home of AMH Global Traders. Here, our African elders' plant knowledge is preserved with deep respect and tribal consent. You can listen to recorded teachings from wise elders, share traditional recipes, or request free young moringa trees for your community school garden.`
        : `Dumelang and welcome ${elderName}. This is the Indigenous Knowledge Systems sanctuary of AMH Global Traders. Here, our traditional African plant wisdom is preserved with honor and community consent. You can listen to recorded oral teachings, submit traditional preparation knowledge, or request free planting seedlings for your community garden.`);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88; // calm, clear pace
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleWisdomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAgreed) {
      onShowToast('Please confirm community elder consent.');
      return;
    }
    onSubmitWisdom({
      name: elderSpeaker,
      contact: 'Village Elder Council Liaison',
      region: village,
      area: traditionalName,
      experience: 'Generational Oral Lore & Traditional Herbalism',
      proposal: plantUse,
      consentNotes: 'Prior Informed Consent (PIC) verified by Community Trust.'
    });
    onShowToast('Generational plant wisdom submitted to the Elder Advisory Council for preservation!');
  };

  const handleSeedlingRequest = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(`Requested ${seedlingsRequested} free certified seedlings for ${seedlingPurpose}. Our nursery team will contact the tribal office.`);
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header Card - Warm, respectful, traditional elder welcome */}
        <div className="bg-gradient-to-r from-amber-950 via-emerald-950 to-amber-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/40">
                  {simplify('Indigenous Knowledge Systems (IKS) Sanctuary', 'Traditional Plant Wisdom & Natural Heritage')}
                </span>
                <span className="text-xs text-amber-200 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {region}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, {elderName}
              </h1>
              <p className="text-amber-100 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
                {simplify(
                  'Thank you for guarding the botanical heritage of our elders. Here, traditional knowledge is respected, recorded with Prior Informed Consent (PIC), and protected under the Nagoya Protocol.',
                  'Thank you for protecting the plant wisdom of our elders. Here, traditional medicine and nature knowledge is respected, recorded with elder consent, and protected under fair community benefit sharing.'
                )}
              </p>
            </div>

            {/* Read Aloud Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleReadAloud()}
                className="px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-2xl text-sm font-extrabold flex items-center gap-2 shadow-lg transition-transform hover:scale-102"
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                <span>{isSpeaking ? 'Stop Voice' : '🔊 Listen (Read Aloud)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left is Submit Traditional Wisdom, Right is Community Seed Bank & Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Share Plant Lore with Elder Council */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-md space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <Heart className="w-6 h-6 text-amber-800" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {simplify('Record Traditional Plant Knowledge', 'Share Elder Plant Wisdom & Remedies')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {simplify(
                    'Preserve traditional preparation, dawn harvesting, or natural healing methods for future generations.',
                    'Keep safe our traditional remedies, dawn harvesting, and natural healing methods for our children.'
                  )}
                </p>
              </div>
            </div>

            <form onSubmit={handleWisdomSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">
                  Traditional Practice / Topic Title:
                </label>
                <input
                  type="text"
                  value={traditionalName}
                  onChange={(e) => setTraditionalName(e.target.value)}
                  className="w-full px-4 py-3 bg-amber-50/50 border-2 border-amber-200 rounded-xl font-semibold text-slate-900 text-sm focus:border-amber-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Elder / Keeper Name:
                  </label>
                  <input
                    type="text"
                    value={elderSpeaker}
                    onChange={(e) => setElderSpeaker(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Village / Clan Region:
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">
                  Traditional Knowledge & Preparation Details:
                </label>
                <textarea
                  rows={4}
                  value={plantUse}
                  onChange={(e) => setPlantUse(e.target.value)}
                  className="w-full px-4 py-3 bg-amber-50/30 border-2 border-amber-200 rounded-xl text-sm font-medium text-slate-800 focus:border-amber-600 focus:outline-hidden leading-relaxed"
                />
              </div>

              {/* Consent Box with Nagoya Protocol acknowledgement */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="w-5 h-5 rounded border-amber-400 text-amber-700 mt-0.5"
                  />
                  <span className="text-xs text-slate-800 font-medium leading-snug">
                    {simplify(
                      'I confirm that this knowledge is shared with free, prior, and informed consent (PIC) on behalf of our community elders. AMH Global Traders pledges to attribute the knowledge and direct fair-share benefits back to rural communities.',
                      'I confirm that this plant knowledge is shared with full permission from our community elders. AMH Global Traders pledges to give credit to our elders and direct fair financial benefits back to our rural community.'
                    )}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-amber-800 hover:bg-amber-700 text-white font-extrabold text-base rounded-2xl shadow-md transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>{simplify('Submit to Elder Advisory Council', 'Submit to Elder Advisory Council')}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Community Seed Bank Request & Preservation Library */}
          <div className="lg:col-span-5 space-y-6">

            {/* Free Community Seed Bank & Nursery Request */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-emerald-800">
                <Sprout className="w-6 h-6 text-emerald-600" />
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {simplify('Free Community Seedling Grant', 'Free Young Moringa Trees for Community')}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {simplify('Provided free by AMH for community schools and clinics', 'Given free by AMH for village schools, clinics, and family gardens')}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSeedlingRequest} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Number of Seedlings Needed:
                  </label>
                  <div className="flex gap-2">
                    {[25, 50, 100, 200].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSeedlingsRequested(num)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                          seedlingsRequested === num
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Beneficiary / Purpose:
                  </label>
                  <input
                    type="text"
                    value={seedlingPurpose}
                    onChange={(e) => setSeedlingPurpose(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sprout className="w-4 h-4" />
                  <span>Request Free Seedling Pack ({seedlingsRequested} Plants)</span>
                </button>
              </form>
            </div>

            {/* Approved IKS Articles with 1-click Audio Listen */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Preserved Teachings (Click to Read or Listen)</span>
              </h4>

              <div className="space-y-2.5">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/60 transition-all flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <h5 className="font-bold text-xs text-slate-900 line-clamp-1">
                        {art.title}
                      </h5>
                      <span className="text-[11px] text-slate-500 block">
                        Source: {art.author} · {art.category || 'Traditional Lore'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleReadAloud(art.excerpt || art.title)}
                        className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold"
                        title="Listen to this teaching"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onOpenArticle(art)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold"
                      >
                        Read
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fair-Share Benefit Transparency */}
            <div className="bg-amber-950 text-white rounded-3xl p-5 border border-amber-900/60 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Community Royalty & Benefit Fund</span>
              </div>
              <p className="text-xs text-amber-100 leading-relaxed">
                5% of all commercial seed profits at AMH Global Traders are pooled into the Northern Cape & Limpopo Community Agro-Trust to support borehole solar pumps, school nursery shade nets, and elder stipend grants.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
