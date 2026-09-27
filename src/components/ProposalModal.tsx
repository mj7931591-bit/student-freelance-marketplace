import React, { useState } from 'react';
import { Job, StudentProfile, ProposalMilestone } from '../types';
import { generateStudentProposal } from '../services/ai';
import {
  X,
  Sparkles,
  Send,
  Plus,
  Trash2,
  GraduationCap,
  DollarSign,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Loader2,
} from 'lucide-react';

interface ProposalModalProps {
  job: Job | null;
  student: StudentProfile;
  onClose: () => void;
  onSubmit: (proposalData: {
    coverLetter: string;
    bidAmount: number;
    estimatedDeliveryWeeks: number;
    milestones: ProposalMilestone[];
  }) => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  job,
  student,
  onClose,
  onSubmit,
}) => {
  if (!job) return null;

  const [coverLetter, setCoverLetter] = useState<string>(
    `Hi ${job.clientName},\n\nI am a ${student.major} student at ${student.university} (${student.gpaOrHonors}). I saw your project "${job.title}" and would love to deliver this for you.\n\nI have extensive experience with ${job.requiredSkills.slice(0, 3).join(', ')} and have delivered similar projects for campus initiatives. I propose breaking this down into the milestones below to ensure high transparency.\n\nLooking forward to working together!`
  );

  const [bidAmount, setBidAmount] = useState<number>(job.budget);
  const [estimatedWeeks, setEstimatedWeeks] = useState<number>(3);
  const [milestones, setMilestones] = useState<ProposalMilestone[]>(
    job.suggestedMilestones && job.suggestedMilestones.length > 0
      ? job.suggestedMilestones.map((m, idx) => ({
          title: m.title,
          amount: m.amount,
          estimatedDays: (idx + 1) * 5,
        }))
      : [
          { title: 'Milestone 1: Discovery & Architecture', amount: Math.round(job.budget * 0.4), estimatedDays: 5 },
          { title: 'Milestone 2: Core Build & Revisions', amount: Math.round(job.budget * 0.4), estimatedDays: 8 },
          { title: 'Milestone 3: Final Testing & Delivery', amount: Math.round(job.budget * 0.2), estimatedDays: 4 },
        ]
  );

  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState<boolean>(false);

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const result = await generateStudentProposal({
        jobTitle: job.title,
        jobDescription: job.description,
        deliverables: job.deliverables,
        studentName: student.name,
        studentUniversity: student.university,
        studentMajor: student.major,
        studentSkills: student.skills,
        studentCoursework: student.verifiedCoursework,
      });

      setCoverLetter(result.coverLetter);
      if (result.suggestedBid) setBidAmount(result.suggestedBid);
      if (result.estimatedWeeks) setEstimatedWeeks(result.estimatedWeeks);
      if (result.milestones && result.milestones.length > 0) {
        setMilestones(result.milestones);
      }
      setAiGeneratedSuccess(true);
      setTimeout(() => setAiGeneratedSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate AI proposal:', err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleUpdateMilestone = (index: number, field: keyof ProposalMilestone, value: any) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      {
        title: `Milestone ${milestones.length + 1}: Final Polish & Handoff`,
        amount: 150,
        estimatedDays: 4,
      },
    ]);
  };

  const handleRemoveMilestone = (index: number) => {
    if (milestones.length <= 1) return;
    setMilestones(milestones.filter((_, idx) => idx !== index));
  };

  const milestonesTotal = milestones.reduce((sum, m) => sum + (Number(m.amount) || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      coverLetter,
      bidAmount,
      estimatedDeliveryWeeks: estimatedWeeks,
      milestones,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-start justify-between gap-4 bg-neutral-50/70">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <span>Submitting Proposal for</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-neutral-800">{job.clientCompany}</span>
            </div>
            <h2 className="text-xl font-display font-bold text-neutral-900 leading-snug">
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {/* Applying As card */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80">
            <div className="flex items-center gap-3">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-11 h-11 rounded-full object-cover border border-neutral-300"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                  <span>{student.name}</span>
                  <span className="text-xs px-2 py-0.2 bg-emerald-100 text-emerald-800 rounded font-medium">
                    Verified .edu
                  </span>
                </div>
                <div className="text-xs text-neutral-600">
                  {student.university} · {student.major} ({student.graduationYear})
                </div>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <div className="text-xs text-neutral-500">Standard Rate</div>
              <div className="font-mono text-sm font-bold text-neutral-900 tabular-nums">
                ${student.hourlyRate}/hr
              </div>
            </div>
          </div>

          {/* AI Generator Banner */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Gemini Collegiate Proposal Drafter</span>
              </div>
              <p className="text-xs text-indigo-700 mt-0.5 max-w-lg">
                Synthesizes your coursework ({student.verifiedCoursework[0]}), student project portfolio, and matching skills into a tailored pitch.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGeneratingAI}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              {isGeneratingAI ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Drafting Pitch...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Pitch with AI</span>
                </>
              )}
            </button>
          </div>

          {aiGeneratedSuccess && (
            <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Tailored pitch and milestone structure successfully generated! You can edit any details below.</span>
            </div>
          )}

          {/* Cover Letter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Cover Pitch & Project Approach
              </label>
              <span className="text-[11px] text-neutral-400">
                Highlight relevant coursework & past student builds
              </span>
            </div>
            <textarea
              rows={6}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
              className="w-full text-sm p-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-800 leading-relaxed font-sans"
              placeholder="Explain how your academic coursework and portfolio directly fulfill the project deliverables..."
            />
          </div>

          {/* Pricing & Timeline Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Total Proposed Bid ($ USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-neutral-400 text-sm font-mono">$</span>
                <input
                  type="number"
                  min={50}
                  step={25}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2 border border-neutral-300 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 tabular-nums"
                  required
                />
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                Client's posted budget: ${job.budget.toLocaleString()}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Estimated Delivery (Weeks)
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={estimatedWeeks}
                onChange={(e) => setEstimatedWeeks(Number(e.target.value))}
                className="w-full px-4 py-2 border border-neutral-300 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 tabular-nums"
                required
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Paced around university classes & exam schedules
              </p>
            </div>
          </div>

          {/* Milestones Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  Milestone Escrow Breakdown
                </label>
                <p className="text-[11px] text-neutral-500">
                  Client funds each milestone in escrow; payout released upon your deliverable approval.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddMilestone}
                className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {milestones.map((ms, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                >
                  <span className="font-mono text-xs font-bold text-neutral-400 w-6 shrink-0">
                    #{idx + 1}
                  </span>

                  <input
                    type="text"
                    value={ms.title}
                    onChange={(e) => handleUpdateMilestone(idx, 'title', e.target.value)}
                    placeholder="Milestone description..."
                    className="flex-1 text-xs sm:text-sm px-2.5 py-1.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    required
                  />

                  <div className="flex items-center gap-2">
                    <div className="relative w-28 shrink-0">
                      <span className="absolute left-2.5 top-1.5 text-neutral-400 text-xs font-mono">$</span>
                      <input
                        type="number"
                        min={10}
                        step={10}
                        value={ms.amount}
                        onChange={(e) => handleUpdateMilestone(idx, 'amount', Number(e.target.value))}
                        className="w-full pl-6 pr-2 py-1.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 tabular-nums"
                        required
                      />
                    </div>

                    <div className="relative w-24 shrink-0">
                      <input
                        type="number"
                        min={1}
                        max={60}
                        value={ms.estimatedDays}
                        onChange={(e) => handleUpdateMilestone(idx, 'estimatedDays', Number(e.target.value))}
                        className="w-full px-2 py-1.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 tabular-nums text-center"
                        title="Estimated days to deliver"
                        placeholder="Days"
                        required
                      />
                      <span className="text-[10px] text-neutral-400 absolute right-2 top-2">days</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(idx)}
                      disabled={milestones.length <= 1}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 disabled:opacity-30 rounded transition-colors"
                      title="Remove milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-600 pt-2 px-1">
              <span>Total milestones sum:</span>
              <span className={`font-mono font-bold tabular-nums ${milestonesTotal !== bidAmount ? 'text-amber-600' : 'text-neutral-900'}`}>
                ${milestonesTotal.toLocaleString()} {milestonesTotal !== bidAmount && `(Differs from bid of $${bidAmount})`}
              </span>
            </div>
          </div>

          {/* Escrow Guarantee Note */}
          <div className="p-3 bg-neutral-100 rounded-xl text-xs text-neutral-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
            <span>
              <strong>QuadWork Student Protection:</strong> Client funds are deposited into verified escrow before work commences. Once you submit each milestone deliverable, funds are directly released to your QuadWork wallet upon client sign-off.
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Application & Proposal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
