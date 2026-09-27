export type UserRole = 'student' | 'client';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  link?: string;
  image?: string;
  completionDate: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university: string;
  major: string;
  graduationYear: number;
  gpaOrHonors: string;
  verifiedCoursework: string[];
  hourlyRate: number;
  isEduVerified: boolean;
  headline: string;
  bio: string;
  skills: string[];
  portfolio: PortfolioItem[];
  rating: number;
  reviewCount: number;
  completedJobsCount: number;
  totalEarned: number;
  availability: '10-15 hrs/week' | '5-10 hrs/week' | 'Full-time Summer' | 'Flexible around exams';
  location: string;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'funded' | 'submitted' | 'approved' | 'revision_requested';
  submissionNotes?: string;
  submissionUrl?: string;
  revisionFeedback?: string;
}

export interface Job {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  clientAvatar: string;
  category: 'Software & Web' | 'Design & Creative' | 'Data & AI' | 'Marketing & Social' | 'Writing & Content' | 'Academic & Tutoring';
  description: string;
  deliverables: string[];
  requiredSkills: string[];
  budget: number;
  budgetType: 'fixed' | 'hourly';
  estimatedHoursPerWeek: number;
  deadline: string;
  experienceLevel: 'All Undergrads' | 'Upperclassman / Senior' | 'Graduate / Masters';
  campusScope: string;
  postedAt: string;
  proposalsCount: number;
  status: 'open' | 'in_progress' | 'completed';
  suggestedMilestones?: { title: string; amount: number }[];
}

export interface ProposalMilestone {
  title: string;
  amount: number;
  estimatedDays: number;
}

export interface Proposal {
  id: string;
  jobId: string;
  jobTitle: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentUniversity: string;
  studentMajor: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDeliveryWeeks: number;
  milestones: ProposalMilestone[];
  status: 'submitted' | 'shortlisted' | 'accepted' | 'declined';
  submittedAt: string;
}

export interface Contract {
  id: string;
  jobId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  totalBudget: number;
  escrowFunded: number;
  amountReleased: number;
  milestones: Milestone[];
  status: 'active' | 'completed' | 'paused';
  startDate: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  jobId?: string;
  jobTitle?: string;
  content: string;
  timestamp: string;
  attachmentName?: string;
}

export interface WalletTransaction {
  id: string;
  type: 'milestone_release' | 'escrow_deposit' | 'withdrawal' | 'bonus';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'processing';
  referenceId?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'proposal' | 'milestone' | 'payment' | 'message';
}
