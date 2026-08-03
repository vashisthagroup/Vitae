import { NextRequest, NextResponse } from 'next/server';

let approvalRequests: any[] = [
  {
    id: '1',
    type: 'job_posting',
    title: 'Staff Software Engineer',
    requestedBy: 'John Recruiter',
    requestedByEmail: 'recruiter@vitae.com',
    department: 'Engineering',
    location: 'San Francisco, CA',
    salary: '$200k - $250k',
    status: 'pending',
    description: 'We are looking for an experienced Staff Software Engineer...',
    submittedAt: new Date('2026-08-03T14:30:00'),
  },
  {
    id: '2',
    type: 'screening_rules',
    title: 'AI Product Manager - Updated Screening Rules',
    requestedBy: 'Sarah Product',
    requestedByEmail: 'product@vitae.com',
    status: 'pending',
    description: 'Updated screening criteria to include AI/ML experience',
    changes: ['Added 2 new technical questions', 'Increased auto-schedule cutoff to 78%', 'Added LinkedIn verification'],
    submittedAt: new Date('2026-08-03T13:15:00'),
  },
  {
    id: '3',
    type: 'job_posting',
    title: 'Senior Data Scientist',
    requestedBy: 'Mike Data',
    requestedByEmail: 'data@vitae.com',
    department: 'Data',
    location: 'Remote',
    salary: '$180k - $220k',
    status: 'pending',
    description: 'Seeking a Senior Data Scientist to build ML models...',
    submittedAt: new Date('2026-08-02T16:00:00'),
  },
];

let approvalHistory: any[] = [
  {
    id: '4',
    type: 'job_posting',
    title: 'Senior Full Stack Engineer',
    approvedBy: 'Admin',
    approvedAt: new Date('2026-08-01T10:00:00'),
    status: 'approved',
  },
  {
    id: '5',
    type: 'job_posting',
    title: 'AI Product Manager',
    approvedBy: 'Admin',
    approvedAt: new Date('2026-07-30T11:30:00'),
    status: 'approved',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');

  if (filter === 'approved') {
    return NextResponse.json({
      pending: [],
      approved: approvalHistory,
    });
  }

  return NextResponse.json({
    pending: approvalRequests,
    approved: approvalHistory,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { approvalId, action, feedback } = await request.json();

    const request_ = approvalRequests.find(r => r.id === approvalId);
    if (!request_) {
      return NextResponse.json(
        { error: 'Approval request not found' },
        { status: 404 }
      );
    }

    if (action === 'approve') {
      request_.status = 'approved';
      request_.approvedAt = new Date();
      approvalHistory.push({
        ...request_,
        approvedBy: 'Admin',
      });
      approvalRequests = approvalRequests.filter(r => r.id !== approvalId);
    } else if (action === 'reject') {
      request_.status = 'rejected';
      request_.rejectionFeedback = feedback;
      request_.rejectedAt = new Date();
      approvalHistory.push({
        ...request_,
        rejectedBy: 'Admin',
      });
      approvalRequests = approvalRequests.filter(r => r.id !== approvalId);
    }

    return NextResponse.json(request_);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process approval' },
      { status: 400 }
    );
  }
}
