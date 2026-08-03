'use client';

import { MainLayout } from '@/app/components/MainLayout';
import { useState } from 'react';

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState('2026-08-04');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const interviews = [
    { id: 1, candidate: 'Alex Rivera', role: 'Senior Full Stack Engineer', time: '10:00 AM', duration: 45, status: 'scheduled', type: 'Phone Screen' },
    { id: 2, candidate: 'Marcus Vance', role: 'AI Product Manager', time: '11:00 AM', duration: 60, status: 'scheduled', type: 'Technical' },
    { id: 3, candidate: 'David Kim', role: 'AI Product Manager', time: '2:00 PM', duration: 60, status: 'confirmed', type: 'Final Round' },
    { id: 4, candidate: 'Sarah Chen', role: 'Senior Full Stack Engineer', time: '3:30 PM', duration: 45, status: 'pending_confirmation', type: 'Phone Screen' },
  ];

  const getStatusColor = (status: string) => {
    const styles: Record<string, string> = {
      scheduled: 'bg-blue-50 border-blue-200 text-blue-900',
      confirmed: 'bg-green-50 border-green-200 text-green-900',
      pending_confirmation: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    };
    return styles[status] || styles.scheduled;
  };

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <MainLayout>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Interview Schedule</h1>
            <p className="text-gray-600">Manage interview slots and candidate confirmations</p>
          </div>
          <button
            onClick={() => setShowBookingModal(true)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            + Create Slot
          </button>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Create Interview Slot</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Start Time</label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Duration (minutes)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>30</option>
                    <option>45</option>
                    <option>60</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Interview Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Phone Screen</option>
                    <option>Technical Round</option>
                    <option>Final Round</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Calendar View */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <h2 className="text-2xl font-bold mt-4 text-gray-900">
              {getDayOfWeek(selectedDate)}, {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </h2>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {interviews.map(interview => (
              <div
                key={interview.id}
                className={`p-4 rounded-lg border-2 ${getStatusColor(interview.status)}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{interview.candidate}</h4>
                    <p className="text-sm opacity-75">{interview.role}</p>
                    <p className="text-sm font-semibold mt-2">{interview.type} • {interview.duration} min</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{interview.time}</p>
                    <span className="inline-block px-3 py-1 bg-white rounded text-sm font-semibold mt-2 opacity-75">
                      {interview.status === 'confirmed' ? '✓ Confirmed' : interview.status === 'pending_confirmation' ? '⏳ Pending' : '📅 Scheduled'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="text-sm px-3 py-1 bg-white rounded hover:bg-gray-100 font-semibold">
                    Send Reminder
                  </button>
                  <button className="text-sm px-3 py-1 bg-white rounded hover:bg-gray-100 font-semibold">
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Total Scheduled</p>
            <p className="text-2xl font-bold mt-1">{interviews.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Confirmed</p>
            <p className="text-2xl font-bold mt-1">{interviews.filter(i => i.status === 'confirmed').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Pending Confirmation</p>
            <p className="text-2xl font-bold mt-1">{interviews.filter(i => i.status === 'pending_confirmation').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm">Hours Booked</p>
            <p className="text-2xl font-bold mt-1">{Math.round(interviews.reduce((sum, i) => sum + i.duration, 0) / 60)}h 50m</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
