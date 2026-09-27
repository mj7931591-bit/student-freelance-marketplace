import React, { useState, useEffect } from 'react';
import {
  UserRole,
  StudentProfile,
  Job,
  Contract,
  Proposal,
  ChatMessage,
  WalletTransaction,
  NotificationItem,
  ProposalMilestone,
} from './types';
import {
  INITIAL_STUDENTS,
  INITIAL_JOBS,
  INITIAL_CONTRACTS,
  INITIAL_PROPOSALS,
  INITIAL_MESSAGES,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
  STORAGE_KEYS,
  loadStoredData,
  saveStoredData,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { JobList } from './components/JobList';
import { JobDetailModal } from './components/JobDetailModal';
import { ProposalModal } from './components/ProposalModal';
import { PostJobModal } from './components/PostJobModal';
import { TalentDirectory } from './components/TalentDirectory';
import { StudentProfileModal } from './components/StudentProfileModal';
import { ContractsView } from './components/ContractsView';
import { WalletView } from './components/WalletView';
import { MessagesView } from './components/MessagesView';
import {
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';

export default function App() {
  // Persistent States
  const [userRole, setUserRole] = useState<UserRole>(() =>
    loadStoredData(STORAGE_KEYS.CURRENT_USER_ROLE, 'student')
  );
  const [students] = useState<StudentProfile[]>(() =>
    loadStoredData(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS)
  );
  const [jobs, setJobs] = useState<Job[]>(() =>
    loadStoredData(STORAGE_KEYS.JOBS, INITIAL_JOBS)
  );
  const [contracts, setContracts] = useState<Contract[]>(() =>
    loadStoredData(STORAGE_KEYS.CONTRACTS, INITIAL_CONTRACTS)
  );
  const [proposals, setProposals] = useState<Proposal[]>(() =>
    loadStoredData(STORAGE_KEYS.PROPOSALS, INITIAL_PROPOSALS)
  );
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadStoredData(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES)
  );
  const [transactions, setTransactions] = useState<WalletTransaction[]>(() =>
    loadStoredData(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS)
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadStoredData(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS)
  );

  // Active current student (Sarah Lin by default)
  const currentStudent = students[0];

  // UI Navigation & View State
  const [currentTab, setCurrentTab] = useState<'jobs' | 'talent' | 'contracts' | 'wallet' | 'messages'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<StudentProfile | null>(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type?: 'success' | 'info' } | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Sync to LocalStorage on updates
  useEffect(() => {
    saveStoredData(STORAGE_KEYS.CURRENT_USER_ROLE, userRole);
  }, [userRole]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.JOBS, jobs);
  }, [jobs]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.CONTRACTS, contracts);
  }, [contracts]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.PROPOSALS, proposals);
  }, [proposals]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.MESSAGES, messages);
  }, [messages]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  // Financial Calculations
  const availableBalance = transactions.reduce((acc, tx) => {
    if (tx.type === 'milestone_release' || tx.type === 'bonus') return acc + tx.amount;
    if (tx.type === 'withdrawal') return acc - tx.amount;
    return acc;
  }, 1450); // Initial baseline

  const inEscrowBalance = contracts.reduce((acc, c) => acc + (c.escrowFunded - c.amountReleased), 0);
  const lifetimeEarnings = currentStudent.totalEarned + (availableBalance > 0 ? availableBalance : 0);

  // Handlers
  const handleToggleRole = () => {
    const nextRole: UserRole = userRole === 'student' ? 'client' : 'student';
    setUserRole(nextRole);
    showToast(
      `Switched to ${nextRole === 'student' ? 'Student Freelancer' : 'Campus Recruiter / Client'} Workspace`,
      nextRole === 'student'
        ? 'Browse gigs, apply with AI proposal assistant, and track escrow earnings.'
        : 'Post project briefs, browse verified collegiate talent, and release milestone escrows.',
      'info'
    );
  };

  const handleApplyToJob = (job: Job) => {
    setApplyingJob(job);
  };

  const handleSubmitProposal = (proposalData: {
    coverLetter: string;
    bidAmount: number;
    estimatedDeliveryWeeks: number;
    milestones: ProposalMilestone[];
  }) => {
    if (!applyingJob) return;

    const newProposal: Proposal = {
      id: `prop-${Date.now()}`,
      jobId: applyingJob.id,
      jobTitle: applyingJob.title,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      studentAvatar: currentStudent.avatar,
      studentUniversity: currentStudent.university,
      studentMajor: currentStudent.major,
      coverLetter: proposalData.coverLetter,
      bidAmount: proposalData.bidAmount,
      estimatedDeliveryWeeks: proposalData.estimatedDeliveryWeeks,
      milestones: proposalData.milestones,
      status: 'submitted',
      submittedAt: 'Just now',
    };

    setProposals([newProposal, ...proposals]);

    // Update job proposal count
    setJobs((prevJobs) =>
      prevJobs.map((j) =>
        j.id === applyingJob.id ? { ...j, proposalsCount: j.proposalsCount + 1 } : j
      )
    );

    setApplyingJob(null);
    showToast(
      'Collegiate Proposal Submitted!',
      `Your verified proposal for "${applyingJob.title}" has been sent to ${applyingJob.clientCompany}.`
    );
  };

  const handlePostJob = (newJobData: Omit<Job, 'id' | 'postedAt' | 'proposalsCount' | 'status'>) => {
    const newJob: Job = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedAt: 'Just now',
      proposalsCount: 0,
      status: 'open',
    };

    setJobs([newJob, ...jobs]);
    setIsPostJobOpen(false);
    setCurrentTab('jobs');
    showToast(
      'Gig Published to QuadWork!',
      `"${newJob.title}" is now live and accepting applications from verified university students.`
    );
  };

  const handleApproveMilestone = (contractId: string, milestoneId: string, amount: number) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const updatedMilestones = c.milestones.map((m) =>
          m.id === milestoneId ? { ...m, status: 'approved' as const } : m
        );
        const updatedReleased = c.amountReleased + amount;
        return {
          ...c,
          amountReleased: updatedReleased,
          milestones: updatedMilestones,
          status: updatedReleased >= c.totalBudget ? ('completed' as const) : c.status,
        };
      })
    );

    // Record transaction
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'milestone_release',
      amount,
      date: 'Today',
      description: `Milestone Release Payout (${contracts.find((c) => c.id === contractId)?.jobTitle || 'Gig'})`,
      status: 'completed',
      referenceId: milestoneId,
    };
    setTransactions([newTx, ...transactions]);

    showToast(
      'Milestone Approved & Funds Released!',
      `$${amount.toLocaleString()} has been unlocked from escrow and credited to the student wallet.`
    );
  };

  const handleSubmitDeliverable = (
    contractId: string,
    milestoneId: string,
    url: string,
    notes: string
  ) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const updatedMilestones = c.milestones.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                status: 'submitted' as const,
                submissionUrl: url,
                submissionNotes: notes,
              }
            : m
        );
        return { ...c, milestones: updatedMilestones };
      })
    );

    showToast(
      'Deliverable Submitted for Client Review',
      'The client has been notified. Funds remain safely in escrow until client approval.'
    );
  };

  const handleRequestRevision = (
    contractId: string,
    milestoneId: string,
    feedback: string
  ) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const updatedMilestones = c.milestones.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                status: 'revision_requested' as const,
                revisionFeedback: feedback,
              }
            : m
        );
        return { ...c, milestones: updatedMilestones };
      })
    );

    showToast(
      'Revision Request Sent',
      'The student freelancer has been notified with your feedback notes.',
      'info'
    );
  };

  const handleFundMilestone = (contractId: string, milestoneId: string) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id !== contractId) return c;
        const updatedMilestones = c.milestones.map((m) =>
          m.id === milestoneId ? { ...m, status: 'funded' as const } : m
        );
        return { ...c, milestones: updatedMilestones };
      })
    );

    showToast(
      'Milestone Escrow Funded!',
      'Funds are now secured in collegiate escrow. The student has been notified to begin.'
    );
  };

  const handleWithdrawFunds = (amount: number, method: string, accountDetails: string) => {
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: 'withdrawal',
      amount,
      date: 'Today',
      description: `Transfer via ${method.toUpperCase()} to ${accountDetails}`,
      status: 'completed',
    };

    setTransactions([newTx, ...transactions]);
    showToast(
      'Payout Initiated!',
      `$${amount.toFixed(2)} has been queued for payout to ${accountDetails}. Zero platform fees applied.`
    );
  };

  const handleSendMessage = (content: string, recipientId: string, recipientName: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: userRole === 'student' ? currentStudent.id : 'client-apex',
      senderName: userRole === 'student' ? currentStudent.name : 'Julian Rivera',
      senderRole: userRole,
      recipientId,
      recipientName,
      content,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulated friendly async response after 1.2 seconds if sending as student
    if (userRole === 'student') {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          senderId: recipientId,
          senderName: recipientName,
          senderRole: 'client',
          recipientId: currentStudent.id,
          recipientName: currentStudent.name,
          content: `Thanks for the update, ${currentStudent.name}! Reviewing this against our sprint goals now. Looking forward to the next milestone checkpoint!`,
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, reply]);
      }, 1200);
    }
  };

  const hasStudentAppliedToJob = (jobId: string) => {
    return proposals.some((p) => p.jobId === jobId && p.studentId === currentStudent.id);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-neutral-900 selection:text-white">
      {/* Strict 3-zone Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        userRole={userRole}
        onToggleRole={handleToggleRole}
        currentStudent={currentStudent}
        unreadCount={messages.length > 0 ? 1 : 0}
        onOpenPostJob={() => setIsPostJobOpen(true)}
        activeContractsCount={contracts.filter((c) => c.status === 'active').length}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'jobs' && (
          <>
            <HeroBanner
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onPostJob={() => setIsPostJobOpen(true)}
              userRole={userRole}
            />

            <JobList
              jobs={jobs.filter((j) => {
                if (!searchQuery) return true;
                const q = searchQuery.toLowerCase();
                return (
                  j.title.toLowerCase().includes(q) ||
                  j.description.toLowerCase().includes(q) ||
                  j.requiredSkills.some((s) => s.toLowerCase().includes(q))
                );
              })}
              onSelectJob={(job) => setSelectedJob(job)}
              onApplyJob={handleApplyToJob}
              userRole={userRole}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onPostJob={() => setIsPostJobOpen(true)}
            />
          </>
        )}

        {currentTab === 'talent' && (
          <TalentDirectory
            students={students}
            onSelectStudent={(student) => setSelectedStudentForProfile(student)}
            onMessageStudent={(student) => {
              setCurrentTab('messages');
            }}
            onInviteToGig={(student) => {
              setIsPostJobOpen(true);
            }}
          />
        )}

        {currentTab === 'contracts' && (
          <ContractsView
            contracts={contracts}
            userRole={userRole}
            onApproveMilestone={handleApproveMilestone}
            onSubmitDeliverable={handleSubmitDeliverable}
            onRequestRevision={handleRequestRevision}
            onFundMilestone={handleFundMilestone}
          />
        )}

        {currentTab === 'wallet' && (
          <WalletView
            availableBalance={availableBalance}
            inEscrowBalance={inEscrowBalance}
            lifetimeEarnings={lifetimeEarnings}
            transactions={transactions}
            onWithdraw={handleWithdrawFunds}
            student={currentStudent}
          />
        )}

        {currentTab === 'messages' && (
          <MessagesView
            messages={messages}
            onSendMessage={handleSendMessage}
            userRole={userRole}
            currentStudent={currentStudent}
            proposals={proposals}
          />
        )}
      </main>

      {/* Modals */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={handleApplyToJob}
          userRole={userRole}
          hasApplied={hasStudentAppliedToJob(selectedJob.id)}
        />
      )}

      {applyingJob && (
        <ProposalModal
          job={applyingJob}
          student={currentStudent}
          onClose={() => setApplyingJob(null)}
          onSubmit={handleSubmitProposal}
        />
      )}

      {isPostJobOpen && (
        <PostJobModal
          onClose={() => setIsPostJobOpen(false)}
          onPostJob={handlePostJob}
        />
      )}

      {selectedStudentForProfile && (
        <StudentProfileModal
          student={selectedStudentForProfile}
          onClose={() => setSelectedStudentForProfile(null)}
          onMessage={(student) => {
            setSelectedStudentForProfile(null);
            setCurrentTab('messages');
          }}
          onOfferGig={(student) => {
            setSelectedStudentForProfile(null);
            setIsPostJobOpen(true);
          }}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-neutral-900 text-white p-4 rounded-xl shadow-2xl border border-neutral-700 animate-in slide-in-from-bottom-3 duration-200 flex items-start gap-3">
          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {toastMessage.title}
            </h4>
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
              {toastMessage.desc}
            </p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Minimal collegiate footer */}
      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-neutral-900">QuadWork</span>
            <span aria-hidden="true">·</span>
            <span>The Verified Student Freelance Marketplace</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-medium">100% Escrow Backed</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-600">
            <button
              onClick={() => setCurrentTab('jobs')}
              className="hover:text-neutral-900 transition-colors"
            >
              Find Gigs
            </button>
            <button
              onClick={() => setCurrentTab('talent')}
              className="hover:text-neutral-900 transition-colors"
            >
              Collegiate Talent
            </button>
            <button
              onClick={() => setCurrentTab('contracts')}
              className="hover:text-neutral-900 transition-colors"
            >
              Milestone Escrow
            </button>
            <button
              onClick={() => setCurrentTab('wallet')}
              className="hover:text-neutral-900 transition-colors"
            >
              Student Wallet
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
