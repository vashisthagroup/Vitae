'use client';

import { MainLayout } from '@/app/components/MainLayout';
import { useState } from 'react';

export default function PipelinePage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCandidates, setSelectedCandidates] = useState<Set<number>>(new Set());
  const [showBulkModal, setShowBulkModal] = useState(false);

  const candidates = [
    { id: 1, name: 'Alex Rivera', email: 'alex.rivera@example.com', role: 'Senior Full Stack Engineer', score: 92, status: 'interview_scheduled', appliedAt: '2026-08-01', rounds: 2 },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'Senior Full Stack Engineer', score: 81, status: 'screened', appliedAt: '2026-08-02', rounds: 1 },
    { id: 3, name: 'Marcus Vance', email: 'marcus.vance@example.com', role: 'AI Product Manager', score: 89, status: 'interview_scheduled', appliedAt: '2026-08-02', rounds: 1 },
    { id: 4, name: 'Jordan Miller', email: 'jordan.m@example.com', role: 'Senior Full Stack Engineer', score: 42, status: 'rejected', appliedAt: '2026-08-03', rounds: 1 },
    { id: 5, name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Senior Full Stack Engineer', score: 78, status: 'screening', appliedAt: '2026-08-03', rounds: 1 },
    { id: 6, name: 'David Kim', email: 'david.kim@example.com', role: 'AI Product Manager', score: 85, status: 'interview_scheduled', appliedAt: '2026-07-28', rounds: 1 },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Candidates', count: candidates.length },
    { value: 'screening', label: 'Screening', count: candidates.filter(c => c.status === 'screening').length },
    { value: 'screened', label: 'AI Screened', count: candidates.filter(c => c.status === 'screened').length },
    { value: 'interview_scheduled', label: 'Interview Scheduled', count: candidates.filter(c => c.status === 'interview_scheduled').length },
    { value: 'rejected', label: 'Rejected', count: candidates.filter(c => c.status === 'rejected').length },
  ];

  const filtered = selectedStatus === 'all' ? candidates : candidates.filter(c => c.status === selectedStatus);

  const toggleCandidate = (id: number) => {
    const newSelected = new Set(selectedCandidates);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCandidates(newSelected);
  };

  const toggleAll = () => {
    if (selectedCandidates.size === filtered.length) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(filtered.map(c => c.id)));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      screening: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      screened: 'bg-blue-50 text-blue-700 border-blue-200',
      interview_scheduled: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
    };
    const labels: Record<string, string> = {
      screening: 'Screening',
      screened: 'AI Screened',
      interview_scheduled: 'Interview Scheduled',
      rejected: 'Rejected',
    };
    return <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${styles[status]}`}>{labels[status]}</span>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <MainLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Candidate Pipeline</h1>
          <p className="text-gray-600">Manage and track all screened candidates across the hiring funnel</p>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedStatus === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label} <span className="ml-1 text-sm">({option.count})</span>
            </button>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedCandidates.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex justify-between items-center">
            <p className="text-blue-900 font-semibold">{selectedCandidates.size} candidate(s) selected</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowBulkModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Schedule Interviews
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showBulkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md">
              <h3 className="text-xl font-bold mb-4">Schedule Interviews</h3>
              <p className="text-gray-600 mb-4">
                You are about to schedule interviews for <span className="font-bold">{selectedCandidates.size} candidate(s)</span>.
              </p>
              <p className="text-gray-600 mb-6 text-sm">
                Calendar invites will be sent to all selected candidates automatically.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowBulkModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Confirm & Schedule
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pipeline Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Candidate</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fit Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Applied</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.has(c.id)}
                      onChange={() => toggleCandidate(c.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{c.name}</div>
                    <div className="text-sm text-gray-500">{c.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.role}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${getScoreColor(c.score)}`}>{c.score}%</span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.appliedAt}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:underline font-semibold">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">In Screening</p>
            <p className="text-2xl font-bold mt-1">{candidates.filter(c => c.status === 'screening').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Ready for Interview</p>
            <p className="text-2xl font-bold mt-1">{candidates.filter(c => c.status === 'screened').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Interviews Scheduled</p>
            <p className="text-2xl font-bold mt-1">{candidates.filter(c => c.status === 'interview_scheduled').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Avg Fit Score</p>
            <p className="text-2xl font-bold mt-1">{Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length)}%</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
