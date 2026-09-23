import React, { useState } from 'react';
import { X, Calendar, User, BookOpen, Share2, CheckCircle2 } from 'lucide-react';
import { IksArticle } from '../types';

interface ArticleReaderModalProps {
  article: IksArticle | null;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Top bar */}
        <div className="bg-amber-900 text-white p-4 px-6 flex items-center justify-between border-b border-amber-800">
          <div className="flex items-center gap-2 text-xs text-amber-200">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>AMH Indigenous Knowledge Systems Archive</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-amber-200 hover:text-white hover:bg-amber-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                {article.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <User className="w-3.5 h-3.5 text-amber-700" />
                {article.author}
              </span>
              {article.category && (
                <>
                  <span>·</span>
                  <span className="text-amber-800 font-semibold">{article.category}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {article.title}
            </h1>
          </div>

          {article.img && (
            <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-100 shadow-xs">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <span>Preserved under the AMH Open-Access Indigenous Stewardship Policy.</span>
            <button
              onClick={handleShare}
              className={`px-3.5 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                copied
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Reference</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
