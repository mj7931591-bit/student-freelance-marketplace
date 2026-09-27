import React, { useState } from 'react';
import { Job } from '../types';
import { enhanceJobPosting } from '../services/ai';
import {
  X,
  Sparkles,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  Building,
} from 'lucide-react';

interface PostJobModalProps {
  onClose: () => void;
  onPostJob: (job: Omit<Job, 'id' | 'postedAt' | 'proposalsCount' | 'status'>) => void;
}

const CATEGORIES = [
  'Software & Web',
  'Design & Creative',
  'Data & AI',
  'Marketing & Social',
  'Writing & Content',
  'Academic & Tutoring',
] as const;

export const PostJobModal: React.FC<PostJobModalProps> = ({ onClose, onPostJob }) => {
  const [title, setTitle] = useState('');
  const [clientCompany, setClientCompany] = useState('Campus Founder Lab');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Software & Web');
  const [description, setDescription] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Initial wireframe or system architecture walkthrough',
    'Core functional deliverables with source code / design assets',
    '30-day post-delivery bug fixes and deployment handoff',
  ]);
  const [skillsString, setSkillsString] = useState('React, TypeScript, Tailwind CSS');
  const [budget, setBudget] = useState(800);
  const [estimatedHours, setEstimatedHours] = useState(10);
  const [deadline, setDeadline] = useState('In 3 weeks');
  const [experienceLevel, setExperienceLevel] = useState<'All Undergrads' | 'Upperclassman / Senior' | 'Graduate / Masters'>('All Undergrads');

  const [milestones, setMilestones] = useState<{ title: string; amount: number }[]>([
    { title: 'Milestone 1: Project Setup & Prototype', amount: 300 },
    { title: 'Milestone 2: Main Production Build', amount: 350 },
    { title: 'Milestone 3: Final Testing & Delivery', amount: 150 },
  ]);

  const [isEnhancingAI, setIsEnhancingAI] = useState(false);
  const [enhancedSuccess, setEnhancedSuccess] = useState(false);

  const handleAddDeliverable = () => {
    setDeliverables([...deliverables, '']);
  };

  const handleUpdateDeliverable = (idx: number, val: string) => {
    const updated = [...deliverables];
    updated[idx] = val;
    setDeliverables(updated);
  };

  const handleRemoveDeliverable = (idx: number) => {
    if (deliverables.length <= 1) return;
    setDeliverables(deliverables.filter((_, i) => i !== idx));
  };

  const handleEnhanceWithAI = async () => {
    if (!title && !description) return;
    setIsEnhancingAI(true);
    try {
      const result = await enhanceJobPosting({
        rawTitle: title,
        rawDescription: description,
        category,
        budgetEstimate: budget,
      });

      if (result.refinedTitle) setTitle(result.refinedTitle);
      if (result.structuredDescription) setDescription(result.structuredDescription);
      if (result.deliverables && result.deliverables.length > 0) setDeliverables(result.deliverables);
      if (result.suggestedMilestones && result.suggestedMilestones.length > 0) {
        setMilestones(result.suggestedMilestones);
      }
      if (result.recommendedBudget) setBudget(result.recommendedBudget);
      setEnhancedSuccess(true);
      setTimeout(() => setEnhancedSuccess(false), 4000);
    } catch (err) {
      console.error('Enhance job error:', err);
    } finally {
      setIsEnhancingAI(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredSkills = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onPostJob({
      title,
      clientId: 'client-user',
      clientName: 'Julian Rivera',
      clientCompany: clientCompany || 'Collegiate Venture',
      clientAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JulianRivera&backgroundColor=0d9488&textColor=ffffff',
      category,
      description,
      deliverables: deliverables.filter(Boolean),
      requiredSkills: requiredSkills.length > 0 ? requiredSkills : ['General'],
      budget,
      budgetType: 'fixed',
      estimatedHoursPerWeek: estimatedHours,
      deadline,
      experienceLevel,
      campusScope: 'Remote (Any Campus)',
      suggestedMilestones: milestones,
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
            <div className="text-xs font-semibold text-indigo-600 mb-1">
              Campus Recruiter / Client Workspace
            </div>
            <h2 className="text-xl font-display font-bold text-neutral-900">
              Post a Student Freelance Project
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
          {/* AI Brief Enhancer Callout */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>AI Job Brief Enhancer</span>
              </div>
              <p className="text-xs text-indigo-700 mt-0.5 max-w-lg">
                Type your rough project idea, and Gemini will structure it into student-friendly deliverables, milestone prices, and required university skills.
              </p>
            </div>

            <button
              type="button"
              onClick={handleEnhanceWithAI}
              disabled={isEnhancingAI || (!title && !description)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              {isEnhancingAI ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Structuring Brief...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enhance Brief with AI</span>
                </>
              )}
            </button>
          </div>

          {enhancedSuccess && (
            <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Job brief enhanced with clear deliverables and recommended milestones!</span>
            </div>
          )}

          {/* Project Title */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
              Project Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build Interactive React Dashboard for Solar Cell Readings"
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
            />
          </div>

          {/* Company & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Organization / Venture Name
              </label>
              <input
                type="text"
                required
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
                placeholder="e.g. MIT Energy Innovation Lab"
                className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900 bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Scope Description */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
              Detailed Scope & Context
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want built or delivered, the context of your startup or research, and expectations..."
              className="w-full p-3 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900 leading-relaxed font-sans"
            />
          </div>

          {/* Deliverables Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Concrete Deliverables
              </label>
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Deliverable</span>
              </button>
            </div>

            <div className="space-y-2">
              {deliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-400 w-5">0{idx + 1}.</span>
                  <input
                    type="text"
                    required
                    value={deliv}
                    onChange={(e) => handleUpdateDeliverable(idx, e.target.value)}
                    placeholder="e.g. 8 Figma screens with responsive mobile auto-layout"
                    className="flex-1 px-3 py-1.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    disabled={deliverables.length <= 1}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 disabled:opacity-20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              value={skillsString}
              onChange={(e) => setSkillsString(e.target.value)}
              placeholder="e.g. React, Tailwind CSS, TypeScript, Figma"
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
            />
          </div>

          {/* Budget, Hours & Target Level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Total Escrow Budget ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-neutral-400 font-mono text-sm">$</span>
                <input
                  type="number"
                  min={50}
                  step={25}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-neutral-300 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 tabular-nums"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Hours / Week
              </label>
              <input
                type="number"
                min={2}
                max={30}
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 tabular-nums"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Target Student Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
              >
                <option value="All Undergrads">All Undergrads</option>
                <option value="Upperclassman / Senior">Upperclassman / Senior</option>
                <option value="Graduate / Masters">Graduate / Masters</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
              Project Deadline / Timeframe
            </label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g. In 3 weeks, or Flexible before finals"
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 text-neutral-900"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Publish Gig to QuadWork</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
