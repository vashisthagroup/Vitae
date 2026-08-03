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

          {/* Portal Switcher */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => switchMode('recruiter')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                mode === 'recruiter'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Recruiter Mode
            </button>
            <button
              onClick={() => switchMode('candidate')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                mode === 'candidate'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Candidate Mode
            </button>
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
