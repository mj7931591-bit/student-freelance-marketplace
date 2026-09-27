import React from 'react';
import { Job, UserRole } from '../types';
import {
  X,
  Building,
  GraduationCap,
  Clock,
  Calendar,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Send,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onApply: (job: Job) => void;
  userRole: UserRole;
  hasApplied?: boolean;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
  userRole,
  hasApplied = false,
}) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-start justify-between gap-4 bg-neutral-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <span className="font-semibold text-neutral-800">{job.clientCompany}</span>
              <span aria-hidden="true">·</span>
              <span>{job.category}</span>
              <span aria-hidden="true">·</span>
              <span>Posted {job.postedAt}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 leading-snug">
              {job.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200/80">
            <div>
              <div className="text-xs text-neutral-500 font-medium">Budget (Escrow)</div>
              <div className="font-mono text-xl font-bold text-neutral-900 tabular-nums">
                ${job.budget.toLocaleString()}
              </div>
              <div className="text-[11px] text-neutral-400 capitalize">{job.budgetType} Price</div>
            </div>

            <div>
              <div className="text-xs text-neutral-500 font-medium">Time Commitment</div>
              <div className="text-sm font-semibold text-neutral-900 mt-1">
                ~{job.estimatedHoursPerWeek} hrs/week
              </div>
              <div className="text-[11px] text-neutral-400">Flexible around exams</div>
            </div>

            <div>
              <div className="text-xs text-neutral-500 font-medium">Education Target</div>
              <div className="text-sm font-semibold text-neutral-900 mt-1">
                {job.experienceLevel}
              </div>
              <div className="text-[11px] text-neutral-400">Verified .edu required</div>
            </div>

            <div>
              <div className="text-xs text-neutral-500 font-medium">Target Delivery</div>
              <div className="text-sm font-semibold text-neutral-900 mt-1">
                {job.deadline}
              </div>
              <div className="text-[11px] text-neutral-400">{job.proposalsCount} proposals</div>
            </div>
          </div>

          {/* Client profile preview */}
          <div className="flex items-center justify-between p-3.5 bg-white border border-neutral-200 rounded-xl">
            <div className="flex items-center gap-3">
              <img
                src={job.clientAvatar}
                alt={job.clientName}
                className="w-10 h-10 rounded-full border border-neutral-300"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-sm font-semibold text-neutral-900 flex items-center gap-1.5">
                  <span>{job.clientName}</span>
                  <span className="text-xs font-normal text-neutral-500">at {job.clientCompany}</span>
                </div>
                <div className="text-xs text-neutral-500 flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Campus Employer
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>100% Escrow Funded</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-2">Project Overview</h4>
            <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Deliverables */}
          {job.deliverables && job.deliverables.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-2.5">Key Deliverables</h4>
              <ul className="space-y-2">
                {job.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Milestones */}
          {job.suggestedMilestones && job.suggestedMilestones.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-2.5">
                Suggested Milestone Escrow Structure
              </h4>
              <div className="divide-y divide-neutral-200 border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/50">
                {job.suggestedMilestones.map((ms, idx) => (
                  <div key={idx} className="p-3 sm:px-4 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-neutral-500 w-5">0{idx + 1}.</span>
                      <span className="text-neutral-800 font-medium">{ms.title}</span>
                    </div>
                    <span className="font-mono font-bold text-neutral-900 tabular-nums">
                      ${ms.amount}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-neutral-500 mt-2">
                * Milestones can be adjusted when you submit your proposal. Funds remain safely in escrow until you deliver each phase.
              </p>
            </div>
          )}

          {/* Required skills */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-2">Required Skills & Tools</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs text-neutral-800 bg-neutral-100 rounded-md font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="text-xs text-neutral-500 hidden sm:block">
            Milestone Escrow guarantees payment release upon approved submission.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 rounded-lg transition-colors"
            >
              Close
            </button>

            {userRole === 'student' ? (
              hasApplied ? (
                <span className="px-4 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Proposal Submitted
                </span>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onApply(job);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Draft Proposal with AI</span>
                </button>
              )
            ) : (
              <span className="text-xs text-neutral-500 font-medium">
                (Viewing in Recruiter Mode)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
