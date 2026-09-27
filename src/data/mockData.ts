import {
  StudentProfile,
  Job,
  Contract,
  Proposal,
  ChatMessage,
  WalletTransaction,
  NotificationItem,
} from '../types';

import sarahAvatar from '../assets/images/avatar_student_sarah_1790494822542.jpg';
import marcusAvatar from '../assets/images/avatar_student_marcus_1790494836601.jpg';
import elenaAvatar from '../assets/images/avatar_student_elena_1790494848070.jpg';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'student-sarah',
    name: 'Sarah Lin',
    email: 'sarah.lin@berkeley.edu',
    avatar: sarahAvatar,
    university: 'UC Berkeley',
    major: 'Cognitive Science & Human-Computer Interaction',
    graduationYear: 2026,
    gpaOrHonors: '3.94 GPA · Dean\'s Honors List',
    verifiedCoursework: ['CS 160: User Interfaces', 'INFO 213: User Experience Research', 'DES INV 15: Design Methodology'],
    hourlyRate: 48,
    isEduVerified: true,
    headline: 'Product & Design Systems Specialist | Figma & React Prototyping',
    bio: 'Senior at Cal specializing in digital product design, web applications, and intuitive student-focused interfaces. Former lead designer for Berkeley Mobile App and freelance partner for 12+ student startups and campus research initiatives.',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'React', 'Tailwind CSS', 'User Research', 'Wireframing'],
    portfolio: [
      {
        id: 'port-1',
        title: 'CalDining Mobile Redesign',
        description: 'Revamped the mobile food ordering and allergen tracking experience for 14,000+ campus students with high WCAG accessibility standards.',
        category: 'UI/UX Design',
        completionDate: 'Fall 2025',
        link: 'https://github.com/quadwork-showcase/cal-dining-case-study',
      },
      {
        id: 'port-2',
        title: 'CampusRide Shuttle Booking',
        description: 'End-to-end design system and prototype for the collegiate late-night safety ride dispatch system.',
        category: 'Product Design',
        completionDate: 'Spring 2025',
        link: 'https://figma.com/@sarahlin/campusride',
      },
    ],
    rating: 4.96,
    reviewCount: 19,
    completedJobsCount: 14,
    totalEarned: 8420,
    availability: '10-15 hrs/week',
    location: 'Berkeley, CA (Remote or Bay Area)',
  },
  {
    id: 'student-marcus',
    name: 'Marcus Vance',
    email: 'mvance@mit.edu',
    avatar: marcusAvatar,
    university: 'MIT',
    major: 'Computer Science & Artificial Intelligence (6-3)',
    graduationYear: 2026,
    gpaOrHonors: '3.91 GPA · Tau Beta Pi',
    verifiedCoursework: ['6.036: Machine Learning', '6.033: Computer System Engineering', '6.006: Intro to Algorithms'],
    hourlyRate: 65,
    isEduVerified: true,
    headline: 'Full-Stack Developer & LLM Engineer | TypeScript, Python & Next.js',
    bio: 'Junior at MIT passionate about engineering high-speed web apps and integrating LLM workflows. 4x hackathon winner, open-source contributor, and experienced building full-stack platforms for research laboratories and seed startups.',
    skills: ['TypeScript', 'Python', 'Next.js', 'PostgreSQL', 'FastAPI', 'Node.js', 'Vector DBs', 'Docker'],
    portfolio: [
      {
        id: 'port-3',
        title: 'LabMetric Real-time Bio Telemetry',
        description: 'Built high-throughput WebSocket dashboard to monitor microfluidic bioreactor telemetry with automated anomaly detection.',
        category: 'Full-Stack Web',
        completionDate: 'Winter 2025',
        link: 'https://github.com/mvance-mit/bioreactor-metrics',
      },
      {
        id: 'port-4',
        title: 'PaperSynthesizer Research Assistant',
        description: 'Academic PDF query engine utilizing hybrid semantic chunking and local vector search for rapid literature reviews.',
        category: 'AI & Data',
        completionDate: 'Fall 2025',
        link: 'https://github.com/mvance-mit/academic-synthesizer',
      },
    ],
    rating: 5.0,
    reviewCount: 22,
    completedJobsCount: 18,
    totalEarned: 13950,
    availability: '10-15 hrs/week',
    location: 'Cambridge, MA (Remote)',
  },
  {
    id: 'student-elena',
    name: 'Elena Rostova',
    email: 'erostova@nyu.edu',
    avatar: elenaAvatar,
    university: 'NYU Stern',
    major: 'Marketing & Data Analytics',
    graduationYear: 2026,
    gpaOrHonors: '3.88 GPA · Dean\'s Scholar',
    verifiedCoursework: ['MKTG-UB 1: Marketing Concepts', 'STAT-UB 14: Data-Driven Decision Making', 'MKTG-UB 40: Digital Marketing'],
    hourlyRate: 42,
    isEduVerified: true,
    headline: 'Growth Marketer & Content Strategist | Campus Ambassador Campaign Lead',
    bio: 'Senior at NYU Stern with a track record of driving organic brand adoption on TikTok, LinkedIn, and student Discord networks. Managed product launches for 3 venture-backed consumer apps with over 80k user acquisitions.',
    skills: ['Content Strategy', 'Growth Marketing', 'TikTok & Reels', 'SEO Copywriting', 'Google Analytics', 'A/B Testing'],
    portfolio: [
      {
        id: 'port-5',
        title: 'KitePay Campus Launch Campaign',
        description: 'Designed guerrilla student marketing campaign across 8 East Coast universities, generating 24,000 waitlist signups in 3 weeks.',
        category: 'Growth Marketing',
        completionDate: 'Spring 2025',
        link: 'https://notion.so/kitepay-case-study',
      },
    ],
    rating: 4.92,
    reviewCount: 15,
    completedJobsCount: 11,
    totalEarned: 5800,
    availability: '5-10 hrs/week',
    location: 'New York, NY (Remote)',
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-101',
    title: 'Design Complete Web Application UI for Campus Coffee Subscription Startup',
    clientId: 'client-apex',
    clientName: 'Julian Rivera',
    clientCompany: 'BeanRoast Campus Co.',
    clientAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JulianRivera&backgroundColor=0d9488&textColor=ffffff',
    category: 'Design & Creative',
    description: 'We are two college founders building a student coffee subscription app where students order weekly beans and cold brew concentrate to campus dorms. We need an experienced student UI/UX designer to craft responsive web screens in Figma including onboarding, bean selection questionnaire, checkout, and account subscription management.',
    deliverables: [
      'Comprehensive Figma design system (typography, neutral palette, atomic components)',
      'High-fidelity mobile and desktop responsive views (8 screens)',
      'Clickable prototype ready for developer handoff'
    ],
    requiredSkills: ['Figma', 'UI/UX Design', 'Design Systems', 'Responsive Web'],
    budget: 850,
    budgetType: 'fixed',
    estimatedHoursPerWeek: 10,
    deadline: 'In 3 weeks',
    experienceLevel: 'All Undergrads',
    campusScope: 'Remote (Any Campus)',
    postedAt: '2 hours ago',
    proposalsCount: 3,
    status: 'open',
    suggestedMilestones: [
      { title: 'Milestone 1: Wireframes & Visual Architecture', amount: 300 },
      { title: 'Milestone 2: High-Fidelity UI Screens & Component Library', amount: 350 },
      { title: 'Milestone 3: Interactive Prototype & Developer Spec', amount: 200 }
    ]
  },
  {
    id: 'job-102',
    title: 'Build React & Tailwind Dashboard for University Laboratory Sensor Readings',
    clientId: 'client-mit-lab',
    clientName: 'Dr. Aris Thorne',
    clientCompany: 'MIT Energy Innovation Lab',
    clientAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ArisThorne&backgroundColor=4f46e5&textColor=ffffff',
    category: 'Software & Web',
    description: 'Our departmental laboratory collects solar cell telemetry every 10 seconds. We have an existing REST API and need a computer science student developer to build a modern React SPA using Tailwind CSS to visualize temperature, voltage, and battery degradation graphs with CSV export capabilities.',
    deliverables: [
      'React + Vite + Tailwind CSS frontend connected to mock REST endpoint',
      'Interactive time-series charts using Recharts or Chart.js',
      'Filterable data table with tabular numeric values and CSV export'
    ],
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Charts'],
    budget: 1200,
    budgetType: 'fixed',
    estimatedHoursPerWeek: 12,
    deadline: 'In 4 weeks',
    experienceLevel: 'Upperclassman / Senior',
    campusScope: 'Remote (Any Campus)',
    postedAt: '5 hours ago',
    proposalsCount: 5,
    status: 'open',
    suggestedMilestones: [
      { title: 'Milestone 1: Project Setup & API Integration Layer', amount: 400 },
      { title: 'Milestone 2: Interactive Real-Time Charting & Filtering Views', amount: 500 },
      { title: 'Milestone 3: CSV Export, Testing & Deployment Handoff', amount: 300 }
    ]
  },
  {
    id: 'job-103',
    title: 'Campus Ambassador Growth Strategy & Short-Form Content Creation',
    clientId: 'client-study-ai',
    clientName: 'Claire Vance',
    clientCompany: 'ExamForge AI',
    clientAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ClaireVance&backgroundColor=d97706&textColor=ffffff',
    category: 'Marketing & Social',
    description: 'ExamForge is an AI study flashcard generator built for STEM undergraduates. We need a savvy student marketer to plan a 4-week collegiate TikTok/Reels campaign, script 10 engaging video hooks demonstrating exam prep workflows, and establish contacts with 5 campus STEM club leads.',
    deliverables: [
      'Collegiate content calendar with 10 completed short-form video drafts/scripts',
      'Outreach playbook targeting university pre-med and engineering student associations',
      'Weekly performance report tracking link clicks and student feedback'
    ],
    requiredSkills: ['Content Strategy', 'TikTok & Reels', 'Campus Marketing', 'Copywriting'],
    budget: 650,
    budgetType: 'fixed',
    estimatedHoursPerWeek: 8,
    deadline: 'In 2 weeks',
    experienceLevel: 'All Undergrads',
    campusScope: 'Remote (Any Campus)',
    postedAt: '1 day ago',
    proposalsCount: 7,
    status: 'open',
    suggestedMilestones: [
      { title: 'Milestone 1: 10 Video Scripts & Brand Asset Brief', amount: 250 },
      { title: 'Milestone 2: Club Outreach List & Campaign Rollout', amount: 250 },
      { title: 'Milestone 3: Final Analytics Review & Optimization Playbook', amount: 150 }
    ]
  },
  {
    id: 'job-104',
    title: 'Python Scripting for Academic Survey Data Cleaning & Statistical Analysis',
    clientId: 'client-stanford-econ',
    clientName: 'Prof. David Lin',
    clientCompany: 'Stanford Economics Dept',
    clientAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DavidLin&backgroundColor=dc2626&textColor=ffffff',
    category: 'Data & AI',
    description: 'Looking for a student proficient in Python (Pandas, NumPy, SciPy) or R to clean and standardize a dataset of 8,500 household survey responses regarding public transit usage, handle missing values, and produce regression tables for academic publication.',
    deliverables: [
      'Documented Jupyter notebook with cleaning and imputation pipeline',
      'Summary statistics tables formatted for LaTeX/Overleaf',
      'Cleaned CSV and Stata-compatible export files'
    ],
    requiredSkills: ['Python', 'Pandas', 'Data Cleaning', 'Statistics', 'LaTeX'],
    budget: 750,
    budgetType: 'fixed',
    estimatedHoursPerWeek: 10,
    deadline: 'In 10 days',
    experienceLevel: 'Upperclassman / Senior',
    campusScope: 'Remote (Any Campus)',
    postedAt: '1 day ago',
    proposalsCount: 4,
    status: 'open',
    suggestedMilestones: [
      { title: 'Milestone 1: Data Cleaning Script & Summary QA', amount: 350 },
      { title: 'Milestone 2: Regression Modeling & Publication Tables', amount: 400 }
    ]
  },
  {
    id: 'job-105',
    title: 'Technical Documentation & API Guide Writing for Developer SDK',
    clientId: 'client-cloudflow',
    clientName: 'Nadia Patel',
    clientCompany: 'CloudFlow Tech',
    clientAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NadiaPatel&backgroundColor=2563eb&textColor=ffffff',
    category: 'Writing & Content',
    description: 'We are seeking a technical writer or computer engineering student to write comprehensive, student-friendly quickstart guides and API reference tutorials for our open-source TypeScript SDK. Perfect gig for someone building their technical writing credentials.',
    deliverables: [
      '10-minute Quickstart tutorial with executable code snippets',
      'Authentication and error handling reference guide',
      '3 real-world implementation sample recipes'
    ],
    requiredSkills: ['Technical Writing', 'TypeScript', 'API Documentation', 'Markdown'],
    budget: 500,
    budgetType: 'fixed',
    estimatedHoursPerWeek: 6,
    deadline: 'In 2 weeks',
    experienceLevel: 'All Undergrads',
    campusScope: 'Remote (Any Campus)',
    postedAt: '2 days ago',
    proposalsCount: 2,
    status: 'open',
    suggestedMilestones: [
      { title: 'Milestone 1: Quickstart Tutorial & Setup Guide', amount: 250 },
      { title: 'Milestone 2: Reference Recipes & Final Review', amount: 250 }
    ]
  },
  {
    id: 'job-106',
    title: 'Pre-Calculus & Intro to Computer Science Peer Tutor for Freshman Cohort',
    clientId: 'client-stem-tutor',
    clientName: 'Marcus Aurelius Foundation',
    clientCompany: 'Bay Area STEM Initiative',
    clientAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=STEMInit&backgroundColor=16a34a&textColor=ffffff',
    category: 'Academic & Tutoring',
    description: 'Seeking a patient university student with an A in Calc I/II and Intro to Python to provide 4 weekly remote 1-on-1 tutoring sessions for incoming engineering freshmen who need reinforcement before midterms.',
    deliverables: [
      'Four 75-minute interactive Zoom tutoring sessions with screen-share coding',
      'Curated practice problem sheet with step-by-step solution keys',
      'Weekly progress summary'
    ],
    requiredSkills: ['Calculus', 'Python', 'Tutoring', 'Patience', 'Explaining Concepts'],
    budget: 400,
    budgetType: 'fixed',
    estimatedHoursPerWeek: 4,
    deadline: 'Flexible (over 4 weeks)',
    experienceLevel: 'All Undergrads',
    campusScope: 'Remote (Any Campus)',
    postedAt: '3 days ago',
    proposalsCount: 6,
    status: 'open',
    suggestedMilestones: [
      { title: 'Milestone 1: Sessions 1 & 2 Completed + Practice Worksheet', amount: 200 },
      { title: 'Milestone 2: Sessions 3 & 4 Completed + Final Midterm Prep', amount: 200 }
    ]
  }
];

export const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 'contract-901',
    jobId: 'job-101',
    jobTitle: 'Design Complete Web Application UI for Campus Coffee Subscription',
    clientId: 'client-apex',
    clientName: 'Julian Rivera',
    clientCompany: 'BeanRoast Campus Co.',
    studentId: 'student-sarah',
    studentName: 'Sarah Lin',
    studentAvatar: sarahAvatar,
    totalBudget: 850,
    escrowFunded: 850,
    amountReleased: 300,
    startDate: 'Sep 18, 2026',
    status: 'active',
    milestones: [
      {
        id: 'ms-1',
        title: 'Milestone 1: Wireframes & Visual Architecture',
        description: 'Low-fidelity layout blueprints for mobile and desktop screens.',
        amount: 300,
        dueDate: 'Sep 22, 2026',
        status: 'approved',
        submissionNotes: 'All 8 wireframe flows submitted on Figma. Verified with user journey map.',
        submissionUrl: 'https://figma.com/@sarahlin/beanroast-wireframes',
      },
      {
        id: 'ms-2',
        title: 'Milestone 2: High-Fidelity UI Screens & Component Library',
        description: 'Complete polished UI screens with responsive variations and typography system.',
        amount: 350,
        dueDate: 'Oct 02, 2026',
        status: 'submitted',
        submissionNotes: 'Finished all 8 high-fidelity screens, added dark mode toggle tokens, and structured auto-layout components.',
        submissionUrl: 'https://figma.com/@sarahlin/beanroast-hifi-v1',
      },
      {
        id: 'ms-3',
        title: 'Milestone 3: Interactive Prototype & Developer Spec',
        description: 'Clickable prototype transitions and annotated developer handoff specs.',
        amount: 200,
        dueDate: 'Oct 10, 2026',
        status: 'funded',
      },
    ],
  },
  {
    id: 'contract-902',
    jobId: 'job-102',
    jobTitle: 'Build React & Tailwind Dashboard for University Laboratory',
    clientId: 'client-mit-lab',
    clientName: 'Dr. Aris Thorne',
    clientCompany: 'MIT Energy Innovation Lab',
    studentId: 'student-marcus',
    studentName: 'Marcus Vance',
    studentAvatar: marcusAvatar,
    totalBudget: 1200,
    escrowFunded: 1200,
    amountReleased: 400,
    startDate: 'Sep 14, 2026',
    status: 'active',
    milestones: [
      {
        id: 'ms-201',
        title: 'Milestone 1: Project Setup & API Integration Layer',
        description: 'Vite React TypeScript repository connected to live websocket proxy.',
        amount: 400,
        dueDate: 'Sep 20, 2026',
        status: 'approved',
        submissionNotes: 'GitHub repository configured with clean TypeScript definitions and test coverage.',
        submissionUrl: 'https://github.com/mit-energy-lab/solar-telemetry-frontend',
      },
      {
        id: 'ms-202',
        title: 'Milestone 2: Interactive Real-Time Charting & Filtering',
        description: 'Recharts integration with tabular metrics and zoom controls.',
        amount: 500,
        dueDate: 'Oct 04, 2026',
        status: 'funded',
      },
      {
        id: 'ms-203',
        title: 'Milestone 3: CSV Export, Testing & Deployment Handoff',
        description: 'Production build configuration and automated data export scripts.',
        amount: 300,
        dueDate: 'Oct 14, 2026',
        status: 'pending',
      },
    ],
  },
];

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop-301',
    jobId: 'job-101',
    jobTitle: 'Design Complete Web Application UI for Campus Coffee Subscription',
    studentId: 'student-sarah',
    studentName: 'Sarah Lin',
    studentAvatar: sarahAvatar,
    studentUniversity: 'UC Berkeley',
    studentMajor: 'Cognitive Science & HCI',
    coverLetter: 'Hi Julian! As a senior in HCI at Berkeley who redesigned the CalDining mobile experience, I have deep firsthand knowledge of how collegiate consumers navigate digital food ordering. I would love to build a vibrant, modern Figma design system tailored for BeanRoast that converts student visitors into recurring weekly subscribers.',
    bidAmount: 850,
    estimatedDeliveryWeeks: 3,
    milestones: [
      { title: 'Milestone 1: Wireframes & Visual Architecture', amount: 300, estimatedDays: 5 },
      { title: 'Milestone 2: High-Fidelity UI Screens & Component Library', amount: 350, estimatedDays: 8 },
      { title: 'Milestone 3: Interactive Prototype & Developer Spec', amount: 200, estimatedDays: 4 },
    ],
    status: 'accepted',
    submittedAt: 'Sep 17, 2026',
  },
  {
    id: 'prop-302',
    jobId: 'job-103',
    jobTitle: 'Campus Ambassador Growth Strategy & Short-Form Content Creation',
    studentId: 'student-elena',
    studentName: 'Elena Rostova',
    studentAvatar: elenaAvatar,
    studentUniversity: 'NYU Stern',
    studentMajor: 'Marketing & Data Analytics',
    coverLetter: 'Hello Claire! I have spearheaded campus launches for 3 consumer student apps, acquiring 80k+ users via organic TikTok formats. I have structured a 4-week cadence of 10 high-converting hooks that tap directly into midterms anxiety and smart flashcard study hacks.',
    bidAmount: 650,
    estimatedDeliveryWeeks: 2,
    milestones: [
      { title: 'Milestone 1: 10 Video Scripts & Brand Asset Brief', amount: 250, estimatedDays: 4 },
      { title: 'Milestone 2: Club Outreach List & Campaign Rollout', amount: 250, estimatedDays: 6 },
      { title: 'Milestone 3: Final Analytics Review & Optimization Playbook', amount: 150, estimatedDays: 4 },
    ],
    status: 'submitted',
    submittedAt: '1 day ago',
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'client-apex',
    senderName: 'Julian Rivera',
    senderRole: 'client',
    recipientId: 'student-sarah',
    recipientName: 'Sarah Lin',
    jobTitle: 'Design Complete Web Application UI for Campus Coffee',
    content: 'Hi Sarah! Loved your CalDining case study on your portfolio. We just funded the escrow for Milestone 2. How are the responsive components coming along?',
    timestamp: 'Yesterday at 3:15 PM',
  },
  {
    id: 'msg-2',
    senderId: 'student-sarah',
    senderName: 'Sarah Lin',
    senderRole: 'student',
    recipientId: 'client-apex',
    recipientName: 'Julian Rivera',
    jobTitle: 'Design Complete Web Application UI for Campus Coffee',
    content: 'Hi Julian! Thanks so much. I have completed the mobile and desktop screens for the bean selection questionnaire and checkout. I just submitted Milestone 2 for your review with the Figma link attached!',
    timestamp: 'Yesterday at 4:40 PM',
  },
  {
    id: 'msg-3',
    senderId: 'client-apex',
    senderName: 'Julian Rivera',
    senderRole: 'client',
    recipientId: 'student-sarah',
    recipientName: 'Sarah Lin',
    jobTitle: 'Design Complete Web Application UI for Campus Coffee',
    content: 'Checking it out right now on Figma! The subscription toggle interactions look super clean.',
    timestamp: 'Today at 9:12 AM',
  },
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-1',
    type: 'milestone_release',
    amount: 300,
    date: 'Sep 22, 2026',
    description: 'Milestone 1 Release: Wireframes & Visual Architecture (BeanRoast)',
    status: 'completed',
    referenceId: 'ms-1',
  },
  {
    id: 'tx-2',
    type: 'withdrawal',
    amount: 500,
    date: 'Sep 15, 2026',
    description: 'Direct Deposit Transfer to Chase College Checking (*4821)',
    status: 'completed',
  },
  {
    id: 'tx-3',
    type: 'milestone_release',
    amount: 450,
    date: 'Sep 10, 2026',
    description: 'Milestone Release: UI Redesign for Berkeley AI Club',
    status: 'completed',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Milestone Submitted for Review',
    message: 'Sarah Lin submitted Milestone 2: High-Fidelity UI Screens for BeanRoast.',
    timestamp: '18 min ago',
    read: false,
    type: 'milestone',
  },
  {
    id: 'notif-2',
    title: 'New Proposal Received',
    message: 'Elena Rostova submitted a proposal for Campus Ambassador Growth Strategy.',
    timestamp: '1 hour ago',
    read: false,
    type: 'proposal',
  },
  {
    id: 'notif-3',
    title: 'Escrow Payment Protected',
    message: '$350.00 is safely locked in escrow until you approve the deliverable.',
    timestamp: '2 days ago',
    read: true,
    type: 'payment',
  },
];

const STORAGE_KEYS = {
  JOBS: 'quadwork_jobs_v1',
  STUDENTS: 'quadwork_students_v1',
  CONTRACTS: 'quadwork_contracts_v1',
  PROPOSALS: 'quadwork_proposals_v1',
  MESSAGES: 'quadwork_messages_v1',
  TRANSACTIONS: 'quadwork_transactions_v1',
  NOTIFICATIONS: 'quadwork_notifications_v1',
  CURRENT_USER_ROLE: 'quadwork_user_role_v1',
};

export const loadStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
};

export const saveStoredData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
};

export { STORAGE_KEYS };
