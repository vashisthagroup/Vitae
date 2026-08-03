'use client';

import { MainLayout } from '@/app/components/MainLayout';
import { useState } from 'react';

export default function RolesPage() {
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);
  const [newRole, setNewRole] = useState({ title: '', department: '', location: '', cutoff: 75 });

  const roles = [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'active',
      cutoff: 75,
      applicants: 4,
      screened: 3,
      questions: 3,
      createdAt: '2026-07-28',
    },
    {
      id: 2,
      title: 'AI Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      status: 'active',
      cutoff: 78,
      applicants: 3,
      screened: 2,
      questions: 3,
      createdAt: '2026-07-30',
    },
    {
      id: 3,
      title: 'Talent Acquisition Partner',
      department: 'HR',
      location: 'New York, NY',
      type: 'Full-time',
      status: 'paused',
      cutoff: 70,
      applicants: 2,
      screened: 1,
      questions: 2,
      createdAt: '2026-08-01',
    },
  ];

  return (
    <MainLayout>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Roles & Screening Rules</h1>
            <p className="text-gray-600">Manage active job postings and configure AI screening criteria</p>
          </div>
          <button
            onClick={() => setShowNewRoleModal(true)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            + Post New Role
          </button>
        </div>

        {/* New Role Modal */}
        {showNewRoleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Post New Role</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Job Title *</label>
                  <input
                    type="text"
                    value={newRole.title}
                    onChange={e => setNewRole({ ...newRole, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Senior Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Department *</label>
                  <input
                    type="text"
                    value={newRole.department}
                    onChange={e => setNewRole({ ...newRole, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Location *</label>
                  <input
                    type="text"
                    value={newRole.location}
                    onChange={e => setNewRole({ ...newRole, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Auto-Schedule Cutoff (%)</label>
                  <input
                    type="number"
                    value={newRole.cutoff}
                    onChange={e => setNewRole({ ...newRole, cutoff: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum fit score to auto-schedule interviews</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowNewRoleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Role
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Roles Grid */}
        <div className="grid grid-cols-1 gap-6">
          {roles.map(role => (
            <div key={role.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{role.title}</h3>
                  <p className="text-gray-600">{role.department} • {role.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  role.status === 'active'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                  {role.status === 'active' ? 'Active' : 'Paused'}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-gray-600 text-sm">Total Applicants</p>
                  <p className="text-2xl font-bold mt-1">{role.applicants}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">AI Screened</p>
                  <p className="text-2xl font-bold mt-1">{role.screened}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Screening Qs</p>
                  <p className="text-2xl font-bold mt-1">{role.questions}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Auto-Schedule</p>
                  <p className="text-2xl font-bold mt-1">{role.cutoff}%</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold transition-colors">
                  Manage Questions
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold transition-colors">
                  View Applicants
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold transition-colors">
                  ⋮
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Screening Questions Template */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Default Screening Questions</h2>
          <p className="text-gray-600 mb-4">These questions are asked to all candidates applying for roles</p>

          <div className="space-y-3">
            {[
              '1. Describe your most challenging technical project and how you overcame obstacles.',
              '2. What motivated you to apply for this role and what attracts you to our company?',
              '3. How do you stay updated with the latest technology trends in your field?',
            ].map((q, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{q}</p>
                <button className="text-red-600 hover:text-red-700 font-semibold">Remove</button>
              </div>
            ))}
          </div>

          <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
            + Add Question
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
