// User Roles & Permissions
export type UserRole = 'recruiter' | 'admin' | 'candidate';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  mode: 'recruiter' | 'candidate';
}

// Jobs & Roles
export interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Part-time';
  status: 'active' | 'paused' | 'closed';
  description: string;
  requirements: string[];
  screeningQuestions: ScreeningQuestion[];
  autoScheduleCutoff: number; // Percentage (e.g., 75)
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Candidates & Applications
export interface Candidate {
  id: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  profileCompleteness: number; // 0-100
  appliedRoles: string[]; // JobRole IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  candidateId: string;
  candidate?: Candidate;
  jobRoleId: string;
  jobRole?: JobRole;
  status: 'applied' | 'screening' | 'screened' | 'interview_scheduled' | 'interview_completed' | 'rejected' | 'rejected_post_interview' | 'offer_extended' | 'hired';
  aiScreeningScore: number; // 0-100
  screeningResponses: ScreeningResponse[];
  interviewScheduledAt?: Date;
  interviewNotes?: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// AI Screening
export interface ScreeningQuestion {
  id: string;
  jobRoleId: string;
  question: string;
  type: 'text' | 'voice' | 'video';
  order: number;
}

export interface ScreeningResponse {
  id: string;
  screeningQuestionId: string;
  applicationId: string;
  response: string;
  aiScore?: number;
  feedback?: string;
  createdAt: Date;
}

// Interview Scheduling
export interface InterviewSlot {
  id: string;
  recruiterId: string;
  jobRoleId: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  applicationId?: string;
  candidate?: Candidate;
  notes?: string;
  createdAt: Date;
}

// Dashboard Metrics
export interface DashboardMetrics {
  totalApplicants: number;
  applicantsThisWeek: number;
  activePercentage: number;
  activeJobRoles: number;
  aiScreenedCount: number;
  aiScreenedPercentage: number;
  averageFitScore: number;
  autoScheduledCount: number;
  autoScheduledPercentage: number;
  recruiterHoursSaved: number;
  averageTimeToHire: number;
  screeningCostPerLead: number;
}

// Insights & Activity Feed
export interface InsightEvent {
  id: string;
  type: 'application' | 'screening_completed' | 'interview_scheduled' | 'rejection' | 'offer_extended';
  candidateName: string;
  candidateId: string;
  roleTitle: string;
  jobRoleId: string;
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
