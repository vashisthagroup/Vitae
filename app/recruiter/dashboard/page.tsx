'use client';

import { MainLayout } from '@/app/components/MainLayout';
import Link from 'next/link';

export default function RecruiterDashboard() {
  const candidates = [
    { id: 1, name: 'Alex Rivera', role: 'Senior Full Stack Engineer', score: 92, status: 'Interview Scheduled' },
    { id: 2, name: 'Priya Sharma', role: 'Senior Full Stack Engineer', score: 81, status: 'AI Screened' },
    { id: 3, name: 'Marcus Vance', role: 'AI Product Manager', score: 89, status: 'Interview Scheduled' },
  ];

  return (
    <MainLayout>
      <div className="p-8 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-lg">
          <p className="text-amber-400 font-semibold text-sm">AUTOMATED TALENT ACQUISITION AGENT</p>
          <h1 className="text-4xl font-bold mt-2">Recruitment Automation Control</h1>
          <p className="text-gray-300 mt-2 max-w-2xl">AI-powered screening, instant scheduling, and candidate evaluation</p>
          <div className="flex gap-3 mt-6">
            <button className="px-6 py-2 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition-colors">
              ▶ Simulate Candidate
            </button>
            <button className="px-6 py-2 border border-white text-white font-semibold rounded hover:bg-white hover:text-gray-900 transition-colors">
              ⚡ Run AI Evaluation
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm font-semibold">APPLICANTS</p>
            <p className="text-3xl font-bold mt-2">100</p>
            <p className="text-xs text-gray-400 mt-1">3 Active Roles</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm font-semibold">AI SCREENED</p>
            <p className="text-3xl font-bold mt-2">100%</p>
            <p className="text-xs text-gray-400 mt-1">Avg Score: 76%</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm font-semibold">INTERVIEWS</p>
            <p className="text-3xl font-bold mt-2">6</p>
            <p className="text-xs text-gray-400 mt-1">Scheduled</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm font-semibold">TIME SAVED</p>
            <p className="text-3xl font-bold mt-2">35h</p>
            <p className="text-xs text-gray-400 mt-1">This Month</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/recruiter/pipeline" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <p className="text-sm text-gray-500 font-semibold">MANAGE</p>
            <h3 className="text-xl font-bold text-gray-900 mt-2">Candidate Pipeline</h3>
            <p className="text-gray-600 text-sm mt-1">View & filter candidates</p>
            <div className="mt-4 text-blue-600 font-semibold text-sm">→ Open</div>
          </Link>

          <Link href="/recruiter/roles" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <p className="text-sm text-gray-500 font-semibold">CREATE</p>
            <h3 className="text-xl font-bold text-gray-900 mt-2">Post New Role</h3>
            <p className="text-gray-600 text-sm mt-1">Add job posting</p>
            <div className="mt-4 text-blue-600 font-semibold text-sm">→ Open</div>
          </Link>

          <Link href="/recruiter/schedule" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <p className="text-sm text-gray-500 font-semibold">SCHEDULE</p>
            <h3 className="text-xl font-bold text-gray-900 mt-2">Interview Slots</h3>
            <p className="text-gray-600 text-sm mt-1">Manage calendar</p>
            <div className="mt-4 text-blue-600 font-semibold text-sm">→ Open</div>
          </Link>
        </div>

        {/* Top Candidates */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Top Candidates</h2>
            </div>
            <Link href="/recruiter/pipeline" className="text-blue-600 font-semibold text-sm">View All →</Link>
          </div>
          <div className="divide-y divide-gray-200">
            {candidates.map(c => (
              <div key={c.id} className="p-6 flex justify-between items-center hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <p className="text-sm text-gray-600">{c.role}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-lg font-bold ${c.score >= 80 ? 'text-green-600' : 'text-blue-600'}`}>{c.score}%</span>
                  <span className="text-sm px-3 py-1 bg-gray-100 rounded">{c.status}</span>
                  <button className="text-blue-600 font-semibold text-sm hover:underline">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
