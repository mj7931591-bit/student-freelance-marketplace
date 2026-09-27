import React, { useState } from 'react';
import { Job, UserRole } from '../types';
import {
  Clock,
  DollarSign,
  Building,
  GraduationCap,
  Calendar,
  Send,
  Eye,
  Filter,
  CheckCircle,
  Briefcase,
  Sparkles,
} from 'lucide-react';

interface JobListProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  userRole: UserRole;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onPostJob: () => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  onSelectJob,
  onApplyJob,
  userRole,
  selectedCategory,
  onSelectCategory,
  onPostJob,
}) => {
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [budgetTypeFilter, setBudgetTypeFilter] = useState<string>('all');

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    if (selectedCategory !== 'All' && job.category !== selectedCategory) return false;
    if (experienceFilter !== 'all' && job.experienceLevel !== experienceFilter) return false;
    if (budgetTypeFilter !== 'all' && job.budgetType !== budgetTypeFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top section with title and quick filter switches */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-neutral-900 tracking-tight">
            {selectedCategory === 'All' ? 'All Active Student Gigs' : `${selectedCategory} Gigs`}
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Browse verified campus and business contracts ready for student talent.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Experience level filter */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs">
            <button
              onClick={() => setExperienceFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                experienceFilter === 'all'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Levels
            </button>
            <button
              onClick={() => setExperienceFilter('All Undergrads')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                experienceFilter === 'All Undergrads'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Undergrad
            </button>
            <button
              onClick={() => setExperienceFilter('Upperclassman / Senior')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                experienceFilter === 'Upperclassman / Senior'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Senior / Capstone
            </button>
          </div>

          {/* Budget type filter */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg text-xs">
            <button
              onClick={() => setBudgetTypeFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                budgetTypeFilter === 'all'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Budgets
            </button>
            <button
              onClick={() => setBudgetTypeFilter('fixed')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                budgetTypeFilter === 'fixed'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Fixed Price
            </button>
          </div>
        </div>
      </div>

      {/* Job list grid / rows */}
      {filteredJobs.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-neutral-300 rounded-2xl mt-6 bg-white p-8">
          <Briefcase className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-neutral-800">No gigs match this filter</h3>
          <p className="text-sm text-neutral-500 mt-1 max-w-md mx-auto">
            Try resetting your category or experience level filter, or post a new campus project.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                onSelectCategory('All');
                setExperienceFilter('all');
                setBudgetTypeFilter('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              Reset All Filters
            </button>
            {userRole === 'client' && (
              <button
                onClick={onPostJob}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Post This Gig
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="divide-y divide-neutral-200 mt-2 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="p-5 sm:p-6 hover:bg-neutral-50/70 transition-colors group cursor-pointer"
              onClick={() => onSelectJob(job)}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-2">
                    <span className="font-semibold text-neutral-700">{job.clientCompany}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.postedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">Milestone Escrow Ready</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
                    {job.title}
                  </h3>

                  {/* Description preview */}
                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Skills required - rendered as clean subtle pills or inline tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {job.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs text-neutral-700 bg-neutral-100 rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Details row: Unboxed stats with separators */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{job.experienceLevel}</span>
                    </div>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>~{job.estimatedHoursPerWeek} hrs/week</span>
                    </div>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{job.deadline}</span>
                    </div>
                    <span aria-hidden="true">·</span>
                    <span>{job.proposalsCount} proposals submitted</span>
                  </div>
                </div>

                {/* Right side: Budget and primary action */}
                <div className="lg:text-right shrink-0 flex lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-neutral-100 gap-3">
                  <div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                      {job.budgetType === 'fixed' ? 'Fixed Escrow Budget' : 'Hourly Rate'}
                    </div>
                    <div className="font-mono text-2xl font-bold text-neutral-900 tabular-nums">
                      ${job.budget.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {job.suggestedMilestones?.length || 3} verified milestones
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectJob(job)}
                      className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Brief</span>
                    </button>

                    {userRole === 'student' && (
                      <button
                        onClick={() => onApplyJob(job)}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Apply</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
