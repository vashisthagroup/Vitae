'use client';

import { MainLayout } from '@/app/components/MainLayout';
import { useAuth } from '@/app/context/AuthContext';

export default function CandidateJobs() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-2">Global Job Search</h1>
        <p className="text-gray-600 mb-8">
          Discover opportunities matched to your skills and experience
        </p>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex gap-4 flex-col md:flex-row">
            <input
              type="text"
              placeholder="Search by job title, company, or skills..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>

          <div className="mt-4 flex gap-3 flex-wrap">
            <button className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Remote
            </button>
            <button className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Full-time
            </button>
            <button className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Mid-level
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {[
            {
              title: 'Senior Full Stack Engineer',
              company: 'Vitae AI',
              location: 'San Francisco, CA',
              type: 'Full-time',
              salary: '$180k - $220k',
            },
            {
              title: 'AI Product Manager',
              company: 'Vitae AI',
              location: 'Remote',
              type: 'Full-time',
              salary: '$150k - $200k',
            },
            {
              title: 'Talent Acquisition Partner',
              company: 'Vitae AI',
              location: 'New York, NY',
              type: 'Full-time',
              salary: '$90k - $120k',
            },
          ].map((job, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Apply
                </button>
              </div>

              <div className="flex gap-4 text-sm text-gray-600">
                <span>📍 {job.location}</span>
                <span>🕐 {job.type}</span>
                <span>💰 {job.salary}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-center py-8 mt-8">
          More job listings and advanced features coming soon...
        </p>
      </div>
    </MainLayout>
  );
}
