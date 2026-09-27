import { GoogleGenAI } from '@google/genai';

interface DraftProposalParams {
  jobTitle: string;
  jobDescription: string;
  deliverables?: string[];
  studentName: string;
  studentUniversity: string;
  studentMajor: string;
  studentSkills: string[];
  studentCoursework: string[];
}

interface ProposalDraftResponse {
  coverLetter: string;
  suggestedBid: number;
  estimatedWeeks: number;
  milestones: { title: string; amount: number; estimatedDays: number }[];
  highlightQuote: string;
}

interface EnhanceJobParams {
  rawTitle: string;
  rawDescription: string;
  category: string;
  budgetEstimate: number;
}

interface EnhancedJobResponse {
  refinedTitle: string;
  structuredDescription: string;
  deliverables: string[];
  suggestedMilestones: { title: string; amount: number }[];
  recommendedMajors: string[];
  recommendedBudget: number;
}

// Initialise GoogleGenAI safely with client/env key
function getGenAIClient(): GoogleGenAI | null {
  try {
    const key = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
      (import.meta as unknown as { env: { VITE_GEMINI_API_KEY?: string } }).env?.VITE_GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY') {
      return null;
    }
    return new GoogleGenAI({ apiKey: key });
  } catch {
    return null;
  }
}

export async function generateStudentProposal(params: DraftProposalParams): Promise<ProposalDraftResponse> {
  const ai = getGenAIClient();

  if (ai) {
    try {
      const prompt = `You are an expert collegiate freelance advisor helping a talented university student apply for a freelance gig.
The student details:
- Name: ${params.studentName}
- University: ${params.studentUniversity}
- Major: ${params.studentMajor}
- Skills: ${params.studentSkills.join(', ')}
- Relevant Coursework: ${params.studentCoursework.join(', ')}

The Job details:
- Title: ${params.jobTitle}
- Description: ${params.jobDescription}
- Required Deliverables: ${(params.deliverables || []).join('; ')}

Generate a compelling, concise, and professional proposal response strictly formatted in JSON with the following keys:
{
  "coverLetter": "A high-impact 2-3 paragraph pitch demonstrating domain understanding, referencing relevant university coursework and hands-on projects, proposing clean collaboration, and avoiding generic buzzwords.",
  "suggestedBid": 750,
  "estimatedWeeks": 3,
  "milestones": [
    { "title": "Milestone 1: [Scope]", "amount": 250, "estimatedDays": 5 },
    { "title": "Milestone 2: [Scope]", "amount": 300, "estimatedDays": 8 },
    { "title": "Milestone 3: [Final Delivery & Polish]", "amount": 200, "estimatedDays": 5 }
  ],
  "highlightQuote": "One punchy sentence summarizing why this student is the ideal match."
}

Do not include markdown triple backticks. Return valid JSON only.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text?.trim() || '';
      const parsed = JSON.parse(text) as ProposalDraftResponse;
      if (parsed.coverLetter && parsed.milestones) {
        return parsed;
      }
    } catch (err) {
      console.warn('Gemini API call failed or unconfigured, utilizing collegiate proposal engine fallback:', err);
    }
  }

  // Graceful smart fallback
  return getFallbackProposal(params);
}

function getFallbackProposal(params: DraftProposalParams): ProposalDraftResponse {
  const courseworkMention = params.studentCoursework.length > 0
    ? `Through my coursework in ${params.studentCoursework[0]} and practical campus projects, `
    : `As a ${params.studentMajor} student at ${params.studentUniversity}, `;

  const skillsMention = params.studentSkills.slice(0, 3).join(', ');

  const coverLetter = `Hi there,\n\n${courseworkMention}I have built robust hands-on experience in ${skillsMention}. I read your brief for "${params.jobTitle}" and immediately saw how my project background directly maps to your requirements.\n\nI treat client freelance work with rigorous accountability: I maintain transparent milestone checkpoints, clear documentation, and proactive weekly communication around exam periods. I have previously delivered production-grade work for student ventures and university initiatives with consistent five-star satisfaction.\n\nI have broken down the scope below into 3 clear, verifiable milestones so you can review each deliverable before escrow funds are released. Excited to collaborate and bring this to life!`;

  return {
    coverLetter,
    suggestedBid: 850,
    estimatedWeeks: 3,
    milestones: [
      { title: 'Milestone 1: Architecture, Discovery & Initial Prototype', amount: 300, estimatedDays: 5 },
      { title: 'Milestone 2: Core Implementation & Feature Delivery', amount: 350, estimatedDays: 8 },
      { title: 'Milestone 3: QA Review, Revisions & Final Handoff', amount: 200, estimatedDays: 5 },
    ],
    highlightQuote: `${params.studentMajor} specialist at ${params.studentUniversity} with verified course honors and production portfolio.`,
  };
}

export async function enhanceJobPosting(params: EnhanceJobParams): Promise<EnhancedJobResponse> {
  const ai = getGenAIClient();

  if (ai) {
    try {
      const prompt = `You are a collegiate talent recruitment specialist helping a client post a clear, high-quality freelance gig for university students.
Raw Job Idea:
- Title: ${params.rawTitle}
- Description: ${params.rawDescription}
- Category: ${params.category}
- Estimated Budget: $${params.budgetEstimate}

Create an enhanced, student-friendly job post that will attract top university applicants. Structure the response strictly in JSON:
{
  "refinedTitle": "Crisp, professional title clearly naming the output",
  "structuredDescription": "Clear, contextual 2-paragraph overview describing the project objective and why student talent is a great fit",
  "deliverables": [
    "Specific deliverable 1 with clear format requirement",
    "Specific deliverable 2 with clear format requirement",
    "Specific deliverable 3 with clear format requirement"
  ],
  "suggestedMilestones": [
    { "title": "Milestone 1: [Early deliverable]", "amount": 200 },
    { "title": "Milestone 2: [Core work]", "amount": 250 },
    { "title": "Milestone 3: [Final polish]", "amount": 150 }
  ],
  "recommendedMajors": ["Computer Science", "Cognitive Science", "Design"],
  "recommendedBudget": 600
}

Do not include markdown formatting or backticks. Return raw JSON only.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text?.trim() || '';
      const parsed = JSON.parse(text) as EnhancedJobResponse;
      if (parsed.refinedTitle && parsed.deliverables) {
        return parsed;
      }
    } catch (err) {
      console.warn('Gemini job enhancer fallback invoked:', err);
    }
  }

  // Fallback
  return {
    refinedTitle: params.rawTitle.length > 10 ? params.rawTitle : `Build & Deliver: ${params.rawTitle || 'Student Freelance Project'}`,
    structuredDescription: `${params.rawDescription || 'We are looking for a motivated university student to collaborate with our team.'}\n\nThis project is scoped for flexible student schedules with transparent milestones, dedicated async communication, and prompt escrow releases upon milestone verification.`,
    deliverables: [
      'Comprehensive specification and initial design/architecture review',
      'Production-ready deliverables meeting test criteria and accessibility standards',
      'Clean documentation and 30-day post-delivery bugfix warranty',
    ],
    suggestedMilestones: [
      { title: 'Milestone 1: Initial Discovery & Architecture Spec', amount: Math.round(params.budgetEstimate * 0.35) || 200 },
      { title: 'Milestone 2: Main Production Build & Assets', amount: Math.round(params.budgetEstimate * 0.45) || 300 },
      { title: 'Milestone 3: Final Review, QA & Delivery', amount: Math.round(params.budgetEstimate * 0.20) || 150 },
    ],
    recommendedMajors: ['Computer Science', 'Design & HCI', 'Business Analytics'],
    recommendedBudget: params.budgetEstimate || 650,
  };
}
