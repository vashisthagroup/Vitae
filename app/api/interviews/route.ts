import { NextRequest, NextResponse } from 'next/server';

let interviews: any[] = [
  {
    id: '1',
    candidateId: '1',
    candidateName: 'Alex Rivera',
    jobRoleId: '1',
    jobTitle: 'Senior Full Stack Engineer',
    type: 'phone_screen',
    startTime: new Date('2026-08-05T14:00:00'),
    endTime: new Date('2026-08-05T14:45:00'),
    status: 'scheduled',
    recruiterNotes: 'Strong technical background. Ask about leadership experience.',
    candidateConfirmed: true,
    createdAt: new Date('2026-08-03T10:30:00'),
  },
  {
    id: '2',
    candidateId: '3',
    candidateName: 'Marcus Vance',
    jobRoleId: '2',
    jobTitle: 'AI Product Manager',
    type: 'technical_round',
    startTime: new Date('2026-08-04T11:00:00'),
    endTime: new Date('2026-08-04T12:00:00'),
    status: 'scheduled',
    recruiterNotes: 'Focus on AI/ML feature prioritization',
    candidateConfirmed: true,
    createdAt: new Date('2026-08-02T15:45:00'),
  },
  {
    id: '3',
    candidateId: '2',
    candidateName: 'Priya Sharma',
    jobRoleId: '1',
    jobTitle: 'Senior Full Stack Engineer',
    type: 'phone_screen',
    startTime: new Date('2026-08-06T10:00:00'),
    endTime: new Date('2026-08-06T10:45:00'),
    status: 'pending_confirmation',
    recruiterNotes: 'Excellent microservices experience',
    candidateConfirmed: false,
    createdAt: new Date('2026-08-04T09:00:00'),
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const recruiterId = searchParams.get('recruiterId');
  const status = searchParams.get('status');

  let filtered = interviews;

  if (status) {
    filtered = filtered.filter(i => i.status === status);
  }

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  try {
    const interviewData = await request.json();

    const newInterview = {
      id: String(interviews.length + 1),
      ...interviewData,
      status: 'scheduled',
      candidateConfirmed: false,
      createdAt: new Date(),
    };

    interviews.push(newInterview);

    return NextResponse.json(newInterview, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create interview' },
      { status: 400 }
    );
  }
}
