import React from 'react';
import { CheckCircle, Clock, FileText, RotateCcw } from 'lucide-react';

const ExamComplete = ({
  answeredCount,
  totalQuestions,
  timeUsed,
  onRestart
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completionRate = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 border-2 border-green-500">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
            EXAM SUBMITTED SUCCESSFULLY!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for completing the Nepal Engineering Council Registration Examination Simulation.
          </p>
          <div className="bg-green-50 p-4 rounded border border-green-200 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-800">Questions Answered</span>
              </div>
              <span className="text-sm font-semibold text-green-800">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-800">Completion Rate</span>
              </div>
              <span className="text-sm font-semibold text-green-800">
                {completionRate}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-800">Time Used</span>
              </div>
              <span className="text-sm font-semibold text-green-800">
                {formatTime(timeUsed)}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-sm text-green-800">
              Exam ID: NEC-2024-{Date.now().toString().slice(-6)}
            </div>
            <button
              onClick={onRestart}
              className="w-full inline-flex items-center justify-center px-4 py-3 border-2 border-blue-600 rounded-lg text-sm font-bold text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Take Another Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamComplete;