'use client';

import { MainLayout } from '@/app/components/MainLayout';
import { useState } from 'react';

export default function ApprovalsPage() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const pendingApprovals = [
    {
      id: 1,
      type: 'job_posting',
      title: 'Staff Software Engineer',
      requestedBy: 'John Smith',
      department: 'Engineering',
      location: 'San Francisco, CA',
      salary: '$200k - $250k',
      status: 'pending',
      submittedAt: '2026-08-03 2:30 PM',
      description: 'We are looking for an experienced Staff Software Engineer to lead backend infrastructure...',
      requirements: ['10+ years experience', 'System design expertise', 'Leadership skills'],
    },
    {
      id: 2,
      type: 'screening_rules',
      title: 'AI Product Manager - Updated Screening Rules',
      requestedBy: 'Sarah Johnson',
      department: 'Product',
      status: 'pending',
      submittedAt: '2026-08-03 1:15 PM',
      description: 'Updated screening criteria to include AI/ML experience and product strategy questions',
      changes: ['Added 2 new technical questions', 'Increased auto-schedule cutoff to 78%', 'Added LinkedIn verification requirement'],
    },
    {
      id: 3,
      type: 'job_posting',
      title: 'Senior Data Scientist',
      requestedBy: 'Mike Chen',
      department: 'Data',
      location: 'Remote',
      salary: '$180k - $220k',
      status: 'pending',
      submittedAt: '2026-08-02 4:00 PM',
      description: 'Seeking a Senior Data Scientist to build and optimize ML models for our platform...',
      requirements: ['PhD or Masters in relevant field', 'ML production experience', 'Python & SQL expertise'],
    },
  ];

  const approvedItems = [
    { id: 4, type: 'job_posting', title: 'Senior Full Stack Engineer', approvedBy: 'Admin', approvedAt: '2026-08-01' },
    { id: 5, type: 'job_posting', title: 'AI Product Manager', approvedBy: 'Admin', approvedAt: '2026-07-30' },
    { id: 6, type: 'screening_rules', title: 'Default Screening Questions - Updated', approvedBy: 'Admin', approvedAt: '2026-07-28' },
  ];

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleApprove = () => {
    console.log('Approved:', selectedRequest.id);
    setShowDetailsModal(false);
  };

  const handleReject = () => {
    if (!feedbackText.trim()) {
      alert('Please provide feedback for rejection');
      return;
    }
    console.log('Rejected:', selectedRequest.id, 'Feedback:', feedbackText);
    setShowDetailsModal(false);
  };

  return (
    <MainLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Approvals</h1>
          <p className="text-gray-600">Review and approve job postings and screening rule changes</p>
        </div>

        {/* Details Modal */}
        {showDetailsModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                <h3 className="text-2xl font-bold">{selectedRequest.title}</h3>
                <p className="text-gray-600 text-sm mt-1">Requested by {selectedRequest.requestedBy} on {selectedRequest.submittedAt}</p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700">{selectedRequest.description}</p>
                </div>

                {selectedRequest.type === 'job_posting' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-semibold text-gray-900">{selectedRequest.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-semibold text-gray-900">{selectedRequest.location}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">Salary Range</p>
                        <p className="font-semibold text-gray-900">{selectedRequest.salary}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Requirements</h4>
                      <ul className="space-y-1">
                        {selectedRequest.requirements?.map((req: string, idx: number) => (
                          <li key={idx} className="text-gray-700">• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {selectedRequest.type === 'screening_rules' && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Changes</h4>
                    <ul className="space-y-1">
                      {selectedRequest.changes?.map((change: string, idx: number) => (
                        <li key={idx} className="text-gray-700">• {change}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Rejection Feedback */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Feedback (for rejection)</label>
                  <textarea
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    placeholder="Provide detailed feedback if rejecting this request..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3 justify-end sticky bottom-0 bg-white">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-semibold"
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  ✓ Approve
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pending Approvals */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold">Pending Approvals</h2>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">{pendingApprovals.length}</span>
          </div>

          <div className="space-y-4">
            {pendingApprovals.map(request => (
              <div key={request.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        request.type === 'job_posting' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {request.type === 'job_posting' ? 'JOB POSTING' : 'SCREENING RULES'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mt-2">{request.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">By {request.requestedBy} • {request.submittedAt}</p>
                  </div>
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Review
                  </button>
                </div>

                {request.type === 'job_posting' && (
                  <div className="flex gap-6 text-sm text-gray-600">
                    <span>{request.department}</span>
                    <span>📍 {request.location}</span>
                    <span>💰 {request.salary}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Approved Items */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recently Approved</h2>
          <div className="space-y-3">
            {approvedItems.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-lg border border-green-200 bg-green-50">
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-bold mr-2 ${
                      item.type === 'job_posting' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {item.type === 'job_posting' ? 'JOB' : 'RULES'}
                    </span>
                    <span className="font-semibold text-gray-900">{item.title}</span>
                  </div>
                  <p className="text-sm text-gray-600">Approved by {item.approvedBy} on {item.approvedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
