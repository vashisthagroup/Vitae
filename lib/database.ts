// Database Service Layer
// This is currently using in-memory storage (mock).
// Replace with your database client (Prisma, TypeORM, raw queries, etc.)
// for production use.

import { User, JobRole, Candidate, Application, InterviewSlot } from '@/types';

class DatabaseService {
  // Mock data storage
  private users: Map<string, User> = new Map();
  private jobs: Map<string, JobRole> = new Map();
  private candidates: Map<string, Candidate> = new Map();
  private applications: Map<string, Application> = new Map();
  private interviews: Map<string, InterviewSlot> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with demo data
    console.log('Database Service initialized with mock data');
  }

  // User operations
  async getUser(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  async createUser(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  // Job operations
  async getJobs(filters?: any): Promise<JobRole[]> {
    let jobs = Array.from(this.jobs.values());

    if (filters?.status) {
      jobs = jobs.filter(j => j.status === filters.status);
    }
    if (filters?.department) {
      jobs = jobs.filter(j => j.department === filters.department);
    }

    return jobs;
  }

  async getJob(id: string): Promise<JobRole | null> {
    return this.jobs.get(id) || null;
  }

  async createJob(job: JobRole): Promise<JobRole> {
    this.jobs.set(job.id, job);
    return job;
  }

  async updateJob(id: string, updates: Partial<JobRole>): Promise<JobRole | null> {
    const job = this.jobs.get(id);
    if (!job) return null;

    const updated = { ...job, ...updates };
    this.jobs.set(id, updated);
    return updated;
  }

  // Candidate operations
  async getCandidates(filters?: any): Promise<Candidate[]> {
    let candidates = Array.from(this.candidates.values());

    if (filters?.role) {
      candidates = candidates.filter(c => c.appliedRoles.includes(filters.role));
    }
    if (filters?.location) {
      candidates = candidates.filter(c => c.location === filters.location);
    }

    return candidates;
  }

  async getCandidate(id: string): Promise<Candidate | null> {
    return this.candidates.get(id) || null;
  }

  async createCandidate(candidate: Candidate): Promise<Candidate> {
    this.candidates.set(candidate.id, candidate);
    return candidate;
  }

  // Application operations
  async getApplications(filters?: any): Promise<Application[]> {
    let applications = Array.from(this.applications.values());

    if (filters?.candidateId) {
      applications = applications.filter(a => a.candidateId === filters.candidateId);
    }
    if (filters?.jobRoleId) {
      applications = applications.filter(a => a.jobRoleId === filters.jobRoleId);
    }
    if (filters?.status) {
      applications = applications.filter(a => a.status === filters.status);
    }

    return applications;
  }

  async getApplication(id: string): Promise<Application | null> {
    return this.applications.get(id) || null;
  }

  async createApplication(application: Application): Promise<Application> {
    this.applications.set(application.id, application);
    return application;
  }

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application | null> {
    const app = this.applications.get(id);
    if (!app) return null;

    const updated = { ...app, ...updates };
    this.applications.set(id, updated);
    return updated;
  }

  // Interview operations
  async getInterviews(filters?: any): Promise<InterviewSlot[]> {
    let interviews = Array.from(this.interviews.values());

    if (filters?.status) {
      interviews = interviews.filter(i => i.isBooked === (filters.status === 'booked'));
    }
    if (filters?.jobRoleId) {
      interviews = interviews.filter(i => i.jobRoleId === filters.jobRoleId);
    }

    return interviews;
  }

  async getInterview(id: string): Promise<InterviewSlot | null> {
    return this.interviews.get(id) || null;
  }

  async createInterview(interview: InterviewSlot): Promise<InterviewSlot> {
    this.interviews.set(interview.id, interview);
    return interview;
  }

  async updateInterview(id: string, updates: Partial<InterviewSlot>): Promise<InterviewSlot | null> {
    const interview = this.interviews.get(id);
    if (!interview) return null;

    const updated = { ...interview, ...updates };
    this.interviews.set(id, updated);
    return updated;
  }

  // Statistics
  async getDashboardMetrics() {
    return {
      totalApplicants: this.applications.size,
      applicantsThisWeek: 0, // Would be calculated from dates
      aiScreenedCount: Array.from(this.applications.values())
        .filter(a => a.aiScreeningScore > 0).length,
      averageFitScore: this.calculateAverageFitScore(),
      autoScheduledCount: Array.from(this.applications.values())
        .filter(a => a.status === 'interview_scheduled').length,
      recruiterHoursSaved: 8,
    };
  }

  private calculateAverageFitScore(): number {
    const scores = Array.from(this.applications.values())
      .filter(a => a.aiScreeningScore > 0)
      .map(a => a.aiScreeningScore);

    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }
}

// Export singleton instance
export const db = new DatabaseService();

/*
  TO MIGRATE TO REAL DATABASE:

  1. Install Prisma: npm install @prisma/client
  2. Create schema.prisma with models for User, Job, Candidate, etc.
  3. Run migrations: npx prisma migrate dev
  4. Replace this service with Prisma client:

  import { PrismaClient } from '@prisma/client';

  class PrismaDatabaseService extends DatabaseService {
    private prisma = new PrismaClient();

    async getUser(id: string) {
      return this.prisma.user.findUnique({ where: { id } });
    }
    // ... implement other methods
  }
*/
