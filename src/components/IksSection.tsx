import React, { useState } from 'react';
import { BookOpen, Search, Calendar, User, ArrowRight, UserPlus } from 'lucide-react';
import { IksArticle } from '../types';

interface IksSectionProps {
  articles: IksArticle[];
  onOpenArticle: (article: IksArticle) => void;
  onOpenContributorModal: () => void;
}

export const IksSection: React.FC<IksSectionProps> = ({
  articles,
  onOpenArticle,
  onOpenContributorModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white p-8 sm:p-12 text-center shadow-xl space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-800 text-amber-200 text-xs font-bold uppercase tracking-wider">
          Open-Access Knowledge Platform
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Indigenous Knowledge Systems (IKS)
        </h2>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-amber-100/90 leading-relaxed">
          Preserving and validating centuries of traditional African botanical cultivation, water clarification flocculation, and soil stewardship.
        </p>

        <div className="max-w-md mx-auto pt-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-amber-300" />
            <input
              type="text"
              placeholder="Search botanical harvest guides, flocculants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-amber-900/60 border border-amber-600/40 text-white placeholder-amber-300/60 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Contributor Action Card */}
      <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-amber-950">Share Generational Botanical Knowledge</h3>
          <p className="text-xs text-amber-800/80 mt-0.5">
            Elders, smallholders, and community researchers can apply separately to become approved IKS contributors.
          </p>
        </div>
        <button
          onClick={onOpenContributorModal}
          className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Apply as IKS Contributor</span>
        </button>
      </div>

      {/* Article Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No botanical articles matched your search query. Try another search term.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {art.img && (
                  <div className="aspect-16/9 bg-slate-100 overflow-hidden">
                    <img
                      src={art.img}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-amber-800 font-semibold">
                    <Calendar className="w-3 h-3" />
                    <span>{art.date}</span>
                    <span>·</span>
                    <span>{art.category || 'Botanical'}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-900 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>

                  <span className="text-[11px] text-slate-400 block pt-1">
                    By {art.author}
                  </span>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenArticle(art)}
                  className="w-full py-2 px-4 rounded-xl border border-slate-200 hover:border-amber-700 hover:bg-amber-50/50 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Read Full Documentation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
