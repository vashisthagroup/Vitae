'use client';

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

export function PortalSwitcher() {
  const { mode, switchMode, user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            Vitae
          </Link>

          {/* Portal Indicator - Show only current mode */}
          <div className="flex items-center gap-4">
            {mode === 'recruiter' && (
              <span className="px-4 py-2 rounded-md font-medium text-blue-400 bg-blue-900">
                Recruiter Portal
              </span>
            )}
            {mode === 'candidate' && (
              <span className="px-4 py-2 rounded-md font-medium text-blue-400 bg-blue-900">
                Candidate Portal
              </span>
            )}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user.name}</span>
            <Link
              href="/logout"
              className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
