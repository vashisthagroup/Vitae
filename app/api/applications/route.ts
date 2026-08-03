import { NextRequest, NextResponse } from 'next/server';

let applications: any[] = [
  {
    id: '1',
    candidateId: '1',
    candidateName: 'Alex Rivera',
    jobRoleId: '1',
    jobTitle: 'Senior Full Stack Engineer',
    status: 'interview_scheduled',
    aiScreeningScore: 92,
    screeningResponses: [
      'Built a real-time trading platform handling 10M+ transactions daily...',
      'Follow dev.to, conferences, and open source contributions',
      'Your engineering culture and mission align with my values',
    ],
    interviewScheduledAt: new Date('2026-08-05T14:00:00'),
    interviewNotes: 'Strong technical background. Ask about leadership experience.',
    createdAt: new Date('2026-08-01T09:00:00'),
    updatedAt: new Date('2026-08-03T10:30:00'),
  },
  {
    id: '2',
    candidateId: '2',
    candidateName: 'Priya Sharma',
    jobRoleId: '1',
    jobTitle: 'Senior Full Stack Engineer',
    status: 'screened',
    aiScreeningScore: 81,
    screeningResponses: [
      'Developed microservices architecture for e-commerce platform',
      'Regular Hackathons and tech meetups',
      'Strong engineering team and growth opportunities',
    ],
    createdAt: new Date('2026-08-02T10:00:00'),
    updatedAt: new Date('2026-08-02T14:30:00'),
  },
  {
    id: '3',
    candidateId: '3',
    candidateName: 'Marcus Vance',
    jobRoleId: '2',
    jobTitle: 'AI Product Manager',
    status: 'interview_scheduled',
    aiScreeningScore: 89,
    screeningResponses: [
      'Led the AI features launch at my previous company, 40% user growth',
      'Data-driven approach combined with customer insights for prioritization',
    ],
    interviewScheduledAt: new Date('2026-08-04T11:00:00'),
    createdAt: new Date('2026-08-02T11:00:00'),
    updatedAt: new Date('2026-08-02T15:45:00'),
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobRoleId = searchParams.get('jobRoleId');
  const candidateId = searchParams.get('candidateId');
  const status = searchParams.get('status');

  let filtered = applications;

  if (jobRoleId) {
    filtered = filtered.filter(app => app.jobRoleId === jobRoleId);
  }
  if (candidateId) {
    filtered = filtered.filter(app => app.candidateId === candidateId);
  }
  if (status) {
    filtered = filtered.filter(app => app.status === status);
  }

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json();

    const newApplication = {
      id: String(applications.length + 1),
      ...applicationData,
      status: 'applied',
      aiScreeningScore: 0,
      screeningResponses: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    applications.push(newApplication);

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 400 }
    );
  }
}
