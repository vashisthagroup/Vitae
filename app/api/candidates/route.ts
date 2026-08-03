import { NextRequest, NextResponse } from 'next/server';

let candidates: any[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    resumeUrl: 'https://example.com/alex-rivera-resume.pdf',
    linkedinUrl: 'https://linkedin.com/in/alexrivera',
    profileCompleteness: 95,
    skills: ['React', 'Node.js', 'TypeScript', 'System Design'],
    appliedRoles: ['1'],
    createdAt: new Date('2026-08-01'),
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '(555) 234-5678',
    location: 'New York, NY',
    resumeUrl: 'https://example.com/priya-sharma-resume.pdf',
    linkedinUrl: 'https://linkedin.com/in/priyasharma',
    profileCompleteness: 85,
    skills: ['Backend Development', 'Database Design', 'Python'],
    appliedRoles: ['1'],
    createdAt: new Date('2026-08-02'),
  },
  {
    id: '3',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '(555) 345-6789',
    location: 'Austin, TX',
    resumeUrl: 'https://example.com/marcus-vance-resume.pdf',
    linkedinUrl: 'https://linkedin.com/in/marcusvance',
    profileCompleteness: 90,
    skills: ['Product Management', 'Strategy', 'Analytics', 'AI/ML'],
    appliedRoles: ['2'],
    createdAt: new Date('2026-08-02'),
  },
];

export async function GET() {
  return NextResponse.json(candidates);
}

export async function POST(request: NextRequest) {
  try {
    const candidateData = await request.json();

    const newCandidate = {
      id: String(candidates.length + 1),
      ...candidateData,
      profileCompleteness: 60,
      appliedRoles: [],
      createdAt: new Date(),
    };

    candidates.push(newCandidate);

    return NextResponse.json(newCandidate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create candidate' },
      { status: 400 }
    );
  }
}
