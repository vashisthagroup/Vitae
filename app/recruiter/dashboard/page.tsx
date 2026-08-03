'use client';

import { MainLayout } from '@/app/components/MainLayout';
import { useAuth } from '@/app/context/AuthContext';

export default function RecruiterDashboard() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-2">Recruitment Automation Control</h1>
        <p className="text-gray-600 mb-8">
          Automated talent acquisition agent managing screening, qualification, and scheduling
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Total Applicants</p>
            <p className="text-4xl font-bold">100</p>
            <p className="text-gray-500 text-sm mt-2">100% Active</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">AI Screened</p>
            <p className="text-4xl font-bold">100%</p>
            <p className="text-gray-500 text-sm mt-2">Processed</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Avg Fit Score</p>
            <p className="text-4xl font-bold">76%</p>
            <p className="text-gray-500 text-sm mt-2">Average</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Auto-Scheduled</p>
            <p className="text-4xl font-bold">75%</p>
            <p className="text-gray-500 text-sm mt-2">Conversion</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Recruiter Hours Saved</p>
            <p className="text-4xl font-bold">~8h</p>
            <p className="text-gray-500 text-sm mt-2">This Week</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">System Status</p>
            <p className="text-2xl font-bold text-green-600">Active</p>
            <p className="text-gray-500 text-sm mt-2">Running normally</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Simulate Candidate Portal
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
            Run Batch AI Evaluation
          </button>
        </div>

        <p className="text-gray-600 text-center py-8">
          More dashboard features coming soon...
        </p>
      </div>
    </MainLayout>
  );
}
