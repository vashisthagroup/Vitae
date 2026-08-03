import { NextRequest, NextResponse } from 'next/server';

let jobs: any[] = [
  {
    id: '1',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'active',
    description: 'We are seeking an experienced Senior Full Stack Engineer...',
    requirements: ['10+ years experience', 'React & Node.js', 'System design'],
    autoScheduleCutoff: 75,
    screeningQuestions: [
      'Describe your most challenging technical project',
      'How do you stay updated with tech trends?',
      'What attracts you to our company?',
    ],
    applicants: 4,
    screened: 3,
    createdAt: new Date('2026-07-28'),
    createdBy: '1',
  },
  {
    id: '2',
    title: 'AI Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    description: 'Looking for a visionary AI Product Manager...',
    requirements: ['8+ years PM experience', 'AI/ML knowledge', 'Leadership'],
    autoScheduleCutoff: 78,
    screeningQuestions: [
      'Tell us about your AI product experience',
      'How do you prioritize features?',
    ],
    applicants: 3,
    screened: 2,
    createdAt: new Date('2026-07-30'),
    createdBy: '1',
  },
];

export async function GET() {
  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json();

    const newJob = {
      id: String(jobs.length + 1),
      ...jobData,
      applicants: 0,
      screened: 0,
      createdAt: new Date(),
    };

    jobs.push(newJob);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 400 }
    );
  }
}
