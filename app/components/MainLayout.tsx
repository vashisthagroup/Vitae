'use client';

import { useAuth } from '@/app/context/AuthContext';
import { PortalSwitcher } from './PortalSwitcher';
import Link from 'next/link';
import { ReactNode } from 'react';

const recruiterNavItems = [
  { label: 'Dashboard', href: '/recruiter/dashboard' },
  { label: 'Pipeline', href: '/recruiter/pipeline' },
  { label: 'AI Screener', href: '/recruiter/screener' },
  { label: 'Roles & Rules', href: '/recruiter/roles' },
  { label: 'Schedule', href: '/recruiter/schedule' },
];

const candidateNavItems = [
  { label: 'Job Search', href: '/candidate/jobs' },
  { label: 'Applications', href: '/candidate/applications' },
  { label: 'AI Screener', href: '/candidate/screener' },
  { label: 'Profile', href: '/candidate/profile' },
];

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { mode, user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  const navItems = mode === 'recruiter' ? recruiterNavItems : candidateNavItems;

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalSwitcher />

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
