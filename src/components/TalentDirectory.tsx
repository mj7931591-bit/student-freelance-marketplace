import React, { useState } from 'react';
import { StudentProfile } from '../types';
import {
  Search,
  GraduationCap,
  Star,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Briefcase,
  DollarSign,
  Clock,
  Sparkles,
} from 'lucide-react';

interface TalentDirectoryProps {
  students: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
  onMessageStudent: (student: StudentProfile) => void;
  onInviteToGig: (student: StudentProfile) => void;
}

const UNIVERSITIES = ['All Colleges', 'UC Berkeley', 'MIT', 'NYU Stern'];

export const TalentDirectory: React.FC<TalentDirectoryProps> = ({
  students,
  onSelectStudent,
  onMessageStudent,
  onInviteToGig,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUni, setSelectedUni] = useState('All Colleges');

  const filteredStudents = students.filter((s) => {
    if (selectedUni !== 'All Colleges' && !s.university.includes(selectedUni)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchMajor = s.major.toLowerCase().includes(q);
      const matchSkills = s.skills.some((sk) => sk.toLowerCase().includes(q));
      if (!matchName && !matchMajor && !matchSkills) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header and filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            <span>Verified Student Network</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700">Strict .edu Domain Authentication</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-neutral-900 tracking-tight">
            Collegiate Talent Directory
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Partner directly with exceptional undergraduates, master's students, and lab researchers.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs">
            {UNIVERSITIES.map((uni) => (
              <button
                key={uni}
                onClick={() => setSelectedUni(uni)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                  selectedUni === uni
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {uni}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="my-6">
        <div className="relative max-w-lg">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search students by skill (Figma, Python, React), major, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between hover:border-neutral-300 hover:shadow-md transition-all group"
          >
            <div>
              {/* Profile Top Row */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-neutral-200"
                    referrerPolicy="no-referrer"
                  />
                  {student.isEduVerified && (
                    <span
                      className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-white"
                      title="Verified .edu Student"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-display font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors truncate">
                      {student.name}
                    </h3>
                  </div>

                  <div className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{student.university}</span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span className="text-neutral-500">{student.graduationYear}</span>
                  </div>

                  <div className="text-xs text-neutral-500 truncate mt-0.5">
                    {student.major}
                  </div>

                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <span className="flex items-center gap-1 font-semibold text-neutral-800">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span className="font-mono tabular-nums">{student.rating}</span>
                    </span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span className="text-neutral-500">{student.completedJobsCount} gigs done</span>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <p className="text-xs font-medium text-neutral-700 mt-4 leading-relaxed">
                {student.headline}
              </p>

              {/* Verified Coursework / Honors snippet */}
              <div className="mt-3 py-2 px-2.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200/60">
                <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Honors & Coursework
                </div>
                <div className="text-neutral-800 font-medium truncate mt-0.5">
                  {student.gpaOrHonors}
                </div>
                <div className="text-neutral-600 text-[11px] truncate mt-0.5">
                  {student.verifiedCoursework.slice(0, 2).join(' · ')}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {student.skills.slice(0, 4).map((sk) => (
                  <span
                    key={sk}
                    className="px-2 py-0.5 text-xs text-neutral-700 bg-neutral-100 rounded-md font-medium"
                  >
                    {sk}
                  </span>
                ))}
                {student.skills.length > 4 && (
                  <span className="text-xs text-neutral-400 self-center">
                    +{student.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-400 block">Rate</span>
                <span className="font-mono text-base font-bold text-neutral-900 tabular-nums">
                  ${student.hourlyRate}/hr
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onMessageStudent(student)}
                  className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="Message Freelancer"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectStudent(student)}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>View Portfolio</span>
                </button>

                <button
                  onClick={() => onInviteToGig(student)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Hire</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
