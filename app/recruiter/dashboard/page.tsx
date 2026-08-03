'use client';

import { MainLayout } from '@/app/components/MainLayout';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

export default function RecruiterDashboard() {
  const { user } = useAuth();

  const candidates = [
    { id: 1, name: 'Alex Rivera', email: 'alex.rivera@example.com', role: 'Senior Full Stack Engineer', score: 92, status: 'Interview Scheduled' },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'Senior Full Stack Engineer', score: 81, status: 'AI Screened' },
    { id: 3, name: 'Marcus Vance', email: 'marcus.vance@example.com', role: 'AI Product Manager', score: 89, status: 'Interview Scheduled' },
    { id: 4, name: 'Jordan Miller', email: 'jordan.m@example.com', role: 'Senior Full Stack Engineer', score: 42, status: 'Rejected' },
  ];

  const activities = [
    { candidate: 'Jordan Miller', action: 'AI Agent dispatched automated polite feedback email.', time: '2026-08-03 08:14 AM', role: 'Senior Full Stack Engineer' },
    { candidate: 'Jordan Miller', action: 'AI Screening score: 42% (below 75% threshold). Automatically categorized as Reject.', time: '2026-08-03 08:13 AM', role: 'Senior Full Stack Engineer' },
    { candidate: 'Priya Sharma', action: 'AI Screening completed with 81% fit score.', time: '2026-08-02 02:35 PM', role: 'Senior Full Stack Engineer' },
    { candidate: 'Marcus Vance', action: 'AI Screening score: 89%. Auto-scheduled interview.', time: '2026-08-02 11:05 AM', role: 'AI Product Manager' },
  ];

  const jobs = [
    { title: 'Senior Full Stack Engineer', dept: 'Engineering', location: 'San Francisco, CA', cutoff: '75%', applicants: 4, questions: 3 },
    { title: 'AI Product Manager', dept: 'Product Management', location: 'Remote', cutoff: '78%', applicants: 3, questions: 3 },
    { title: 'Talent Acquisition Partner', dept: 'Human Resources', location: 'New York, NY', cutoff: '70%', applicants: 2, questions: 2 },
  ];

  return (
    <MainLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Recruitment Automation Control</h1>
          <p className="text-gray-600">
            Automating candidate evaluation, qualification scoring against technical benchmarks, and instant scheduling
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-xs font-semibold">TOTAL APPLICANTS</p>
            <p className="text-3xl font-bold mt-1">100</p>
            <p className="text-gray-500 text-xs mt-2">100% Active Across 3 active job postings</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-xs font-semibold">AI SCREENED</p>
            <p className="text-3xl font-bold mt-1">100%</p>
            <p className="text-gray-500 text-xs mt-2">Processed</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-xs font-semibold">AVG FIT SCORE</p>
            <p className="text-3xl font-bold mt-1">76%</p>
            <p className="text-gray-500 text-xs mt-2">Average</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-xs font-semibold">AUTO-SCHEDULED</p>
            <p className="text-3xl font-bold mt-1">75%</p>
            <p className="text-gray-500 text-xs mt-2">Conversion Instant interview slots booked</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-xs font-semibold">RECRUITER HOURS SAVED</p>
            <p className="text-3xl font-bold mt-1">~8h</p>
            <p className="text-gray-500 text-xs mt-2">This Week</p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-xs font-semibold">SYSTEM STATUS</p>
            <p className="text-2xl font-bold text-green-600 mt-1">Active</p>
            <p className="text-gray-500 text-xs mt-2">Continuous Screening Active...</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Simulate Candidate Portal
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Run Batch AI Evaluation
          </button>
        </div>

        {/* Screened Candidates Pipeline */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">Screened Candidates Pipeline</h2>
              <p className="text-gray-600 text-sm">Top screened applicants evaluated by AI Agent</p>
            </div>
            <Link href="/recruiter/pipeline" className="text-blue-600 font-semibold hover:underline">
              View Full Pipeline
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Candidate</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Applied Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fit Score</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {candidates.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{c.name}</div>
                      <div className="text-sm text-gray-500">{c.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.role}</td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      <span className={c.score >= 80 ? 'text-green-600' : c.score >= 70 ? 'text-blue-600' : c.score >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                        {c.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.status}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-blue-600 hover:underline">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agent Insights Feed */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Agent Insights Feed</h2>
          <div className="space-y-3">
            {activities.map((activity, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900">{activity.candidate}</div>
                    <div className="text-sm text-gray-600 mt-1">{activity.action}</div>
                    <div className="text-xs text-gray-500 mt-2">{activity.role}</div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Job Roles */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">Active Job Roles & Criteria</h2>
              <p className="text-gray-600 text-sm">Roles currently accepting applications and automated screening</p>
            </div>
            <Link href="/recruiter/roles" className="text-blue-600 font-semibold hover:underline">
              Manage Roles
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.dept} • {job.location}</p>
                <div className="mt-3 text-sm text-gray-600">
                  <p>Auto-Schedule Cutoff: <span className="font-semibold">{job.cutoff} Fit Score</span></p>
                  <p>{job.applicants} Applicants</p>
                  <p>{job.questions} Screening Qs</p>
                </div>
                <button className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  View Role
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 grid grid-cols-4 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Avg Time to Hire</p>
            <p className="text-2xl font-bold mt-1">14 Days</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Screening Cost / Lead</p>
            <p className="text-2xl font-bold mt-1">$0.42</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Auto-Schedule Cutoff</p>
            <p className="text-2xl font-bold mt-1">75%</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">System Load</p>
            <p className="text-2xl font-bold mt-1">12%</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
