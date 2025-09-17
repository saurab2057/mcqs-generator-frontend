import React from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

const ReviewModal = ({
  isOpen,
  onClose,
  totalQuestions,
  answers,
  onPageSelect
}) => {
  if (!isOpen) return null;

  const questionsPerPage = 12;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const answeredQuestions = answers.map(a => a.questionId);
  const unansweredQuestions = Array.from({ length: totalQuestions }, (_, i) => i + 1)
    .filter(q => !answeredQuestions.includes(q));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#151614] rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border-2 border-[#3a3a3d]">
        <div className="flex items-center justify-between p-6 border-b border-[#3a3a3d]">
          <h2 className="text-lg sm:text-xl font-bold text-white">Exam Review</h2>
          <button
            onClick={onClose}
            className="text-gray-300 bg-[#151614] border-2 border-[#3a3a3d] hover:bg-[#1a1a1c] rounded-lg px-2 py-1 transition-colors cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#29292c] rounded-lg p-4 border border-[#3a3a3d]">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h3 className="font-medium text-white">Answered Questions</h3>
              </div>
              <p className="text-2xl font-bold text-green-400 mb-2">{answers.length}</p>
              <div className="grid grid-cols-8 gap-1">
                {answeredQuestions.map(questionId => (
                  <button
                    key={questionId}
                    onClick={() => {
                      onPageSelect(Math.ceil(questionId / questionsPerPage));
                      onClose();
                    }}
                    className="w-8 h-8 bg-green-400/20 text-green-400 rounded text-sm font-medium hover:bg-green-400/30 transition-colors cursor-pointer"
                  >
                    {questionId}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-[#29292c] rounded-lg p-4 border border-[#3a3a3d]">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <h3 className="font-medium text-white">Unanswered Questions</h3>
              </div>
              <p className="text-2xl font-bold text-red-400 mb-2">{unansweredQuestions.length}</p>
              <div className="grid grid-cols-8 gap-1">
                {unansweredQuestions.map(questionId => (
                  <button
                    key={questionId}
                    onClick={() => {
                      onPageSelect(Math.ceil(questionId / questionsPerPage));
                      onClose();
                    }}
                    className="w-8 h-8 bg-red-400/20 text-red-400 rounded text-sm font-medium hover:bg-red-400/30 transition-colors cursor-pointer"
                  >
                    {questionId}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {unansweredQuestions.length > 0 && (
            <div className="bg-[#29292c] border border-[#3a3a3d] rounded p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium">
                    You have {unansweredQuestions.length} unanswered question{unansweredQuestions.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-red-400 text-sm mt-1">
                    Make sure to answer all questions before submitting your exam.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;