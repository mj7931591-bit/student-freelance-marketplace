import React from 'react';
import { Search, ShieldCheck, GraduationCap, Sparkles, Building2, Briefcase } from 'lucide-react';
import heroCampusImg from '../assets/images/hero_campus_workspace_1790494859228.jpg';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onPostJob: () => void;
  userRole: 'student' | 'client';
}

const CATEGORIES = [
  'All',
  'Software & Web',
  'Design & Creative',
  'Data & AI',
  'Marketing & Social',
  'Writing & Content',
  'Academic & Tutoring',
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onPostJob,
  userRole,
}) => {
  return (
    <div className="relative border-b border-neutral-200 bg-neutral-900 text-white overflow-hidden">
      {/* Background with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCampusImg}
          alt="University students collaborating in modern campus commons"
          className="w-full h-full object-cover object-center opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-900/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-3xl">
          {/* Unboxed collegiate kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-300 uppercase mb-3">
            <span>Verified Collegiate Talent Network</span>
            <span aria-hidden="true">·</span>
            <span>Zero Agency Overhead</span>
            <span aria-hidden="true">·</span>
            <span>Milestone Escrow</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white mb-4 text-balance">
            Where ambitious university minds build real-world products.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Hire vetted students from top colleges for high-impact software, product design, AI research, and growth sprints. Every contract is secured by milestone escrow.
          </p>

          {/* Search bar */}
          <div className="bg-white p-2 rounded-xl shadow-lg border border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl mb-6">
            <div className="flex items-center gap-2 px-3 flex-1 text-neutral-800">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                type="text"
                placeholder="Search gigs by skill, major, or keywords (e.g. React, Figma, Python, Marketing)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full py-1 text-sm bg-transparent border-none focus:outline-none text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
            {userRole === 'client' ? (
              <button
                onClick={onPostJob}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5"
              >
                <Briefcase className="w-4 h-4" />
                <span>Post a New Gig</span>
              </button>
            ) : (
              <button
                onClick={() => {}}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Search Gigs
              </button>
            )}
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                    : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Claim to proof metrics row */}
        <div className="mt-10 pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
          <div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
              4,800+
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              Verified .edu Students
            </div>
          </div>
          <div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
              $1.4M+
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              Paid Towards Tuition
            </div>
          </div>
          <div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
              100%
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              Escrow Milestone Protection
            </div>
          </div>
          <div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
              45+
            </div>
            <div className="text-xs text-neutral-400 mt-0.5">
              Partner Universities
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
