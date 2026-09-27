import React from 'react';
import { UserRole, StudentProfile } from '../types';
import {
  GraduationCap,
  Briefcase,
  Users,
  FileCheck2,
  Wallet,
  MessageSquare,
  PlusCircle,
  ArrowLeftRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'jobs' | 'talent' | 'contracts' | 'wallet' | 'messages';
  onSelectTab: (tab: 'jobs' | 'talent' | 'contracts' | 'wallet' | 'messages') => void;
  userRole: UserRole;
  onToggleRole: () => void;
  currentStudent: StudentProfile;
  unreadCount: number;
  onOpenPostJob: () => void;
  activeContractsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  userRole,
  onToggleRole,
  currentStudent,
  unreadCount,
  onOpenPostJob,
  activeContractsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('jobs')}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-display font-black text-lg transition-transform group-hover:scale-105">
                Q
              </div>
              <div>
                <span className="font-display font-extrabold text-xl text-neutral-900 tracking-tight block">
                  QuadWork
                </span>
              </div>
            </button>

            {/* Quiet role indicator tag */}
            <span className="hidden sm:inline-flex items-center gap-1 ml-3 px-2 py-0.5 text-xs font-medium text-neutral-600 bg-neutral-100 rounded-md">
              <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
              {userRole === 'student' ? 'Student Freelancer' : 'Campus Recruiter / Client'}
            </span>
          </div>

          {/* Zone 2: 4-5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectTab('jobs')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'jobs'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Gigs & Projects</span>
            </button>

            <button
              onClick={() => onSelectTab('talent')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'talent'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Collegiate Talent</span>
            </button>

            <button
              onClick={() => onSelectTab('contracts')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 relative ${
                currentTab === 'contracts'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Milestones & Escrow</span>
              {activeContractsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-mono rounded bg-emerald-100 text-emerald-800 font-semibold">
                  {activeContractsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('wallet')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'wallet'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Wallet</span>
            </button>

            <button
              onClick={() => onSelectTab('messages')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 relative ${
                currentTab === 'messages'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              )}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Role switch toggle */}
            <button
              onClick={onToggleRole}
              title={`Switch mode to ${userRole === 'student' ? 'Client' : 'Student'}`}
              className="px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Role:</span>
              <strong className="text-neutral-900">{userRole === 'student' ? 'Student' : 'Client'}</strong>
            </button>

            {/* Action button based on role */}
            {userRole === 'client' ? (
              <button
                onClick={onOpenPostJob}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Gig</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectTab('jobs')}
                className="hidden sm:flex px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors items-center gap-1.5 whitespace-nowrap shadow-sm"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Find Gigs</span>
              </button>
            )}

            {/* Current user avatar preview */}
            <div className="flex items-center gap-2 pl-1 border-l border-neutral-200">
              <div className="relative">
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  className="w-8 h-8 rounded-full object-cover border border-neutral-300"
                  referrerPolicy="no-referrer"
                />
                {currentStudent.isEduVerified && (
                  <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 border border-white" title="Verified .edu Student">
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-neutral-200 py-2 bg-white px-2 overflow-x-auto text-xs">
        <button
          onClick={() => onSelectTab('jobs')}
          className={`px-2.5 py-1 rounded font-medium ${currentTab === 'jobs' ? 'text-indigo-600 font-semibold' : 'text-neutral-600'}`}
        >
          Gigs
        </button>
        <button
          onClick={() => onSelectTab('talent')}
          className={`px-2.5 py-1 rounded font-medium ${currentTab === 'talent' ? 'text-indigo-600 font-semibold' : 'text-neutral-600'}`}
        >
          Talent
        </button>
        <button
          onClick={() => onSelectTab('contracts')}
          className={`px-2.5 py-1 rounded font-medium ${currentTab === 'contracts' ? 'text-indigo-600 font-semibold' : 'text-neutral-600'}`}
        >
          Escrow ({activeContractsCount})
        </button>
        <button
          onClick={() => onSelectTab('wallet')}
          className={`px-2.5 py-1 rounded font-medium ${currentTab === 'wallet' ? 'text-indigo-600 font-semibold' : 'text-neutral-600'}`}
        >
          Wallet
        </button>
        <button
          onClick={() => onSelectTab('messages')}
          className={`px-2.5 py-1 rounded font-medium ${currentTab === 'messages' ? 'text-indigo-600 font-semibold' : 'text-neutral-600'}`}
        >
          Messages
        </button>
      </div>
    </header>
  );
};
