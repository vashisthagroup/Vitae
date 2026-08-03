import { NextRequest, NextResponse } from 'next/server';

let users: any[] = [
  {
    id: '1',
    email: 'recruiter@vitae.com',
    password: 'demo123',
    name: 'John Recruiter',
    role: 'recruiter',
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (users.find(u => u.email === email)) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    const newUser = {
      id: String(users.length + 1),
      email,
      password,
      name,
      role,
    };

    users.push(newUser);

    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
