import { NextRequest, NextResponse } from 'next/server';

const mockUsers = [
  {
    id: '1',
    email: 'recruiter@vitae.com',
    password: 'demo123',
    name: 'John Recruiter',
    role: 'recruiter',
  },
  {
    id: '2',
    email: 'candidate@vitae.com',
    password: 'demo123',
    name: 'Jane Candidate',
    role: 'candidate',
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json();

    const user = mockUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
