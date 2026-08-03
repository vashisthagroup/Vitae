'use client';

import { MainLayout } from '@/app/components/MainLayout';
import { useState } from 'react';

export default function CandidateScreenerPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>(['', '', '']);
  const [showResults, setShowResults] = useState(false);

  const jobRole = {
    title: 'Senior Full Stack Engineer',
    company: 'Vitae AI',
    location: 'San Francisco, CA (Hybrid)',
  };

  const questions = [
    {
      id: 1,
      question: 'Describe your most challenging technical project and how you overcame obstacles.',
      type: 'text',
      timeLimit: 5,
    },
    {
      id: 2,
      question: 'What motivated you to apply for this role and what attracts you to our company?',
      type: 'text',
      timeLimit: 5,
    },
    {
      id: 3,
      question: 'How do you stay updated with the latest technology trends in your field?',
      type: 'text',
      timeLimit: 5,
    },
  ];

  const handleResponseChange = (text: string) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = text;
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitted responses:', responses);
  };

  if (showResults) {
    return (
      <MainLayout>
        <div className="p-8 space-y-6 max-w-2xl mx-auto">
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-green-900 mb-2">Screening Complete! 🎉</h2>
            <p className="text-green-700 mb-4">Your responses have been submitted for AI evaluation</p>

            <div className="bg-white p-6 rounded-lg mt-6 mb-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Your AI Fit Score</p>
                <p className="text-5xl font-bold text-blue-600">87%</p>
                <p className="text-gray-600 mt-2">Excellent match for this role</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg text-left">
                <h3 className="font-bold text-gray-900 mb-2">What's Next?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Your application has been submitted</li>
                  <li>✓ AI screening is in progress</li>
                  <li>⏳ Interview invitation will be sent if your fit score qualifies</li>
                  <li>📧 Check your email for updates</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold">
                ← Back to Jobs
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                View Other Roles →
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <MainLayout>
      <div className="p-8 space-y-6 max-w-2xl mx-auto">
        {/* Job Info */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900">{jobRole.title}</h2>
          <p className="text-gray-600 mt-1">{jobRole.company} • {jobRole.location}</p>
          <p className="text-gray-600 mt-3">
            Answer screening questions to assess your fit for this role. Your answers will be evaluated by our AI system.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-700">Question {currentQuestion + 1} of {questions.length}</p>
            <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{questions[currentQuestion].question}</h3>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Response</label>
            <textarea
              value={responses[currentQuestion]}
              onChange={e => handleResponseChange(e.target.value)}
              placeholder="Type your response here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
              rows={6}
            />
            <p className="text-xs text-gray-500 mt-2">
              Tip: Be specific and concise. Provide concrete examples when possible.
            </p>
          </div>

          {/* Response Tips */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-6">
            <p className="text-sm text-yellow-900">
              💡 <span className="font-semibold">Tip:</span> The AI evaluates depth of knowledge, communication clarity, and relevance to the role.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            {currentQuestion === questions.length - 1 ? 'Submit & Get Results →' : 'Next Question →'}
          </button>
        </div>

        {/* Answered Indicator */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2">Question Status</p>
          <div className="flex gap-2">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  idx === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : responses[idx]
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {responses[idx] ? '✓' : idx + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
