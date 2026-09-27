import React, { useState } from 'react';
import { Contract, Milestone, UserRole } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  DollarSign,
  AlertCircle,
  FileCheck,
  Send,
  RotateCcw,
  Sparkles,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ContractsViewProps {
  contracts: Contract[];
  userRole: UserRole;
  onApproveMilestone: (contractId: string, milestoneId: string, amount: number) => void;
  onSubmitDeliverable: (contractId: string, milestoneId: string, url: string, notes: string) => void;
  onRequestRevision: (contractId: string, milestoneId: string, feedback: string) => void;
  onFundMilestone: (contractId: string, milestoneId: string) => void;
}

export const ContractsView: React.FC<ContractsViewProps> = ({
  contracts,
  userRole,
  onApproveMilestone,
  onSubmitDeliverable,
  onRequestRevision,
  onFundMilestone,
}) => {
  // Active deliverable submission modal state
  const [submittingMilestone, setSubmittingMilestone] = useState<{
    contractId: string;
    milestoneId: string;
    milestoneTitle: string;
  } | null>(null);
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [deliverableNotes, setDeliverableNotes] = useState('');

  // Revision modal state
  const [revisingMilestone, setRevisingMilestone] = useState<{
    contractId: string;
    milestoneId: string;
    milestoneTitle: string;
  } | null>(null);
  const [revisionNotes, setRevisionNotes] = useState('');

  const handleOpenSubmit = (contractId: string, milestone: Milestone) => {
    setSubmittingMilestone({
      contractId,
      milestoneId: milestone.id,
      milestoneTitle: milestone.title,
    });
    setDeliverableUrl(milestone.submissionUrl || '');
    setDeliverableNotes(milestone.submissionNotes || '');
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingMilestone) return;
    onSubmitDeliverable(
      submittingMilestone.contractId,
      submittingMilestone.milestoneId,
      deliverableUrl,
      deliverableNotes
    );
    setSubmittingMilestone(null);
    setDeliverableUrl('');
    setDeliverableNotes('');
  };

  const handleOpenRevision = (contractId: string, milestone: Milestone) => {
    setRevisingMilestone({
      contractId,
      milestoneId: milestone.id,
      milestoneTitle: milestone.title,
    });
    setRevisionNotes('');
  };

  const handleConfirmRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisingMilestone) return;
    onRequestRevision(
      revisingMilestone.contractId,
      revisingMilestone.milestoneId,
      revisionNotes
    );
    setRevisingMilestone(null);
    setRevisionNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Milestone Escrow Protection Engine</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-neutral-900 tracking-tight">
              Active Contracts & Milestone Releases
            </h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              Funds are held securely in collegiate escrow. When student deliverables are approved, payouts are instantaneously credited.
            </p>
          </div>

          <div className="p-3 bg-neutral-100 rounded-xl border border-neutral-200 flex items-center gap-3">
            <div>
              <div className="text-[11px] text-neutral-500 font-medium">Active Escrow Secured</div>
              <div className="font-mono text-lg font-bold text-neutral-900 tabular-nums">
                $
                {contracts
                  .reduce((sum, c) => sum + (c.escrowFunded - c.amountReleased), 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Cards */}
      <div className="mt-8 space-y-8">
        {contracts.map((contract) => {
          const percentComplete = Math.round(
            (contract.amountReleased / (contract.totalBudget || 1)) * 100
          );

          return (
            <div
              key={contract.id}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs"
            >
              {/* Top Banner */}
              <div className="p-6 border-b border-neutral-200 bg-neutral-50/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-1.5">
                    <span className="font-semibold text-neutral-800">{contract.clientCompany}</span>
                    <span aria-hidden="true">·</span>
                    <span>Started {contract.startDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">100% Escrow Funded</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-neutral-900">
                    {contract.jobTitle}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-neutral-600">
                    <span>Student: <strong>{contract.studentName}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Client: <strong>{contract.clientName}</strong></span>
                  </div>
                </div>

                {/* Progress & Financials */}
                <div className="flex items-center gap-6 self-start lg:self-auto">
                  <div className="text-right">
                    <span className="text-xs text-neutral-500 block">Released / Total</span>
                    <div className="font-mono text-lg font-bold text-neutral-900 tabular-nums">
                      ${contract.amountReleased.toLocaleString()} / ${contract.totalBudget.toLocaleString()}
                    </div>
                  </div>

                  {/* Visual progress bar */}
                  <div className="w-32 bg-neutral-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full transition-all duration-300"
                      style={{ width: `${percentComplete}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Milestones Table */}
              <div className="divide-y divide-neutral-200">
                {contract.milestones.map((ms, idx) => (
                  <div
                    key={ms.id}
                    className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/40 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-neutral-400 w-6">
                          0{idx + 1}.
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                            <span>{ms.title}</span>
                            {/* Status label */}
                            {ms.status === 'approved' && (
                              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Approved & Paid
                              </span>
                            )}
                            {ms.status === 'submitted' && (
                              <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded flex items-center gap-1">
                                <Clock className="w-3 h-3 text-indigo-600 animate-pulse" />
                                Ready for Client Review
                              </span>
                            )}
                            {ms.status === 'funded' && (
                              <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                                <Lock className="w-3 h-3 text-amber-600" />
                                In Progress (Escrow Funded)
                              </span>
                            )}
                            {ms.status === 'revision_requested' && (
                              <span className="text-xs font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
                                <RotateCcw className="w-3 h-3 text-rose-600" />
                                Revision Requested
                              </span>
                            )}
                            {ms.status === 'pending' && (
                              <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                                Up Next
                              </span>
                            )}
                          </h4>
                          {ms.description && (
                            <p className="text-xs text-neutral-500 mt-1 max-w-xl">
                              {ms.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Submitted deliverable details preview */}
                      {(ms.submissionUrl || ms.submissionNotes) && (
                        <div className="mt-3 ml-9 p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs">
                          <div className="font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                            <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Submitted Student Work</span>
                          </div>
                          {ms.submissionNotes && (
                            <p className="text-neutral-600 mb-1.5">{ms.submissionNotes}</p>
                          )}
                          {ms.submissionUrl && (
                            <a
                              href={ms.submissionUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                            >
                              <span>{ms.submissionUrl}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* Revision feedback preview */}
                      {ms.revisionFeedback && (
                        <div className="mt-3 ml-9 p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-800">
                          <strong>Revision Notes from Client:</strong> {ms.revisionFeedback}
                        </div>
                      )}
                    </div>

                      {/* Right: Milestone Amount & Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pl-9 md:pl-0">
                      <div className="text-left md:text-right">
                        <span className="text-[11px] text-neutral-400 block">Milestone Escrow</span>
                        <span className="font-mono text-base font-bold text-neutral-900 tabular-nums">
                          ${ms.amount.toLocaleString()}
                        </span>
                      </div>

                      {/* Action buttons based on status and user role */}
                      <div className="flex items-center gap-2">
                        {/* Student actions */}
                        {(ms.status === 'funded' || ms.status === 'revision_requested') && (
                          <button
                            onClick={() => handleOpenSubmit(contract.id, ms)}
                            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Work</span>
                          </button>
                        )}

                        {/* Client actions for submitted work */}
                        {ms.status === 'submitted' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenRevision(contract.id, ms)}
                              className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                            >
                              Request Revision
                            </button>
                            <button
                              onClick={() => onApproveMilestone(contract.id, ms.id, ms.amount)}
                              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Release ${ms.amount}</span>
                            </button>
                          </div>
                        )}

                        {/* Pending milestone: client can fund early if desired */}
                        {ms.status === 'pending' && userRole === 'client' && (
                          <button
                            onClick={() => onFundMilestone(contract.id, ms.id)}
                            className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Lock className="w-3 h-3 text-neutral-500" />
                            <span>Fund Escrow</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deliverable Submission Modal */}
      {submittingMilestone && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div>
              <div className="text-xs text-neutral-500 uppercase font-semibold">Student Deliverable Handoff</div>
              <h3 className="text-lg font-display font-bold text-neutral-900 mt-0.5">
                {submittingMilestone.milestoneTitle}
              </h3>
            </div>

            <form onSubmit={handleConfirmSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Deliverable Link / URL (Figma, GitHub, Loom, Google Drive)
                </label>
                <input
                  type="url"
                  required
                  value={deliverableUrl}
                  onChange={(e) => setDeliverableUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Summary Notes for Client Review
                </label>
                <textarea
                  rows={4}
                  required
                  value={deliverableNotes}
                  onChange={(e) => setDeliverableNotes(e.target.value)}
                  placeholder="Summarize what was completed, key highlights, and how test criteria were satisfied..."
                  className="w-full p-3 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittingMilestone(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revision Modal */}
      {revisingMilestone && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div>
              <div className="text-xs text-neutral-500 uppercase font-semibold">Client Revision Request</div>
              <h3 className="text-lg font-display font-bold text-neutral-900 mt-0.5">
                {revisingMilestone.milestoneTitle}
              </h3>
            </div>

            <form onSubmit={handleConfirmRevision} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Specific Revision Guidance
                </label>
                <textarea
                  rows={4}
                  required
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="Explain exactly what adjustments or fixes are needed before this milestone is approved..."
                  className="w-full p-3 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRevisingMilestone(null)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Send Revision Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
