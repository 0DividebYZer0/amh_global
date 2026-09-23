import React, { useState } from 'react';
import { X, BookOpen, Send } from 'lucide-react';

interface ContributorApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitContributor: (data: {
    name: string;
    contact: string;
    region: string;
    area: string;
    experience: string;
    proposal: string;
    consentNotes: string;
  }) => void;
}

export const ContributorApplyModal: React.FC<ContributorApplyModalProps> = ({
  isOpen,
  onClose,
  onSubmitContributor
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [region, setRegion] = useState('');
  const [area, setArea] = useState('Traditional Agriculture');
  const [experience, setExperience] = useState('');
  const [proposal, setProposal] = useState('');
  const [consentNotes, setConsentNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitContributor({
      name: name.trim(),
      contact: contact.trim(),
      region: region.trim(),
      area,
      experience: experience.trim(),
      proposal: proposal.trim(),
      consentNotes: consentNotes.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        <div className="bg-amber-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-200" />
            <div>
              <h3 className="font-bold text-base">Contribute Indigenous Knowledge</h3>
              <p className="text-[11px] text-amber-200">Preserving Traditional African Botanical Wisdom</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-amber-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name / Elder *</label>
              <input
                type="text"
                required
                placeholder="e.g. Nomsa Khumalo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email / Phone *</label>
              <input
                type="text"
                required
                placeholder="nomsa@community.org"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Province / Community</label>
              <input
                type="text"
                required
                placeholder="e.g. Vhembe District, Limpopo"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Knowledge Area</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option>Traditional Agriculture & Soil</option>
                <option>Botanical Water Purification</option>
                <option>Nutritional Food Heritage</option>
                <option>Herbal Preparation & Drying</option>
                <option>Oral Ecology & History</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Community Background & Experience</label>
            <textarea
              rows={2}
              required
              placeholder="Tell us about your community connection, generational practices, and farming background..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Proposed Contribution Topic</label>
            <textarea
              rows={2}
              required
              placeholder="What specific technique, traditional harvesting guide, or soil remediation practice would you like to document?"
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Attribution & Consent Notes</label>
            <textarea
              rows={2}
              placeholder="Describe any community permissions, customary attribution requests, or oral lore boundaries..."
              value={consentNotes}
              onChange={(e) => setConsentNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-amber-800 text-white font-bold text-xs hover:bg-amber-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Send className="w-4 h-4 text-amber-200" />
            <span>Submit Contributor Application to IKS Review Board</span>
          </button>
        </form>
      </div>
    </div>
  );
};
