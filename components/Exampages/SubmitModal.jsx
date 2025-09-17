import React from 'react';
import { AlertTriangle, Send } from 'lucide-react';

const SubmitModal = ({
  isOpen,
  onClose,
  onConfirm,
  answeredCount,
  totalQuestions
}) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#151614] rounded-lg shadow-xl max-w-md w-full mx-4 border-2 border-[#3a3a3d]">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-400" />
            <h3 className="text-lg font-bold text-white">CONFIRM SUBMISSION</h3>
          </div>
          <p className="text-gray-300 mb-4 font-medium">
            Are you sure you want to submit your exam? This action cannot be undone.
          </p>
          <div className="bg-[#29292c] border border-[#3a3a3d] rounded p-3 mb-4">
            <p className="text-sm text-gray-300">
              <strong>Total Questions:</strong> {totalQuestions}<br/>
              <strong>Answered:</strong> {answeredCount}<br/>
              <strong>Unanswered:</strong> {unansweredCount}
            </p>
          </div>
          {unansweredCount > 0 && (
            <div className="mt-4 p-3 bg-[#29292c] border border-[#3a3a3d] rounded">
              <p className="text-sm text-red-400">
                <strong>Warning:</strong> You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}. 
                These will be marked as incorrect.
              </p>
            </div>
          )}
          <div className="flex space-x-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-[#3a3a3d] rounded-lg text-sm font-bold text-gray-300 bg-[#151614] hover:bg-[#1a1a1c] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border-2 border-transparent rounded-lg text-sm font-bold text-white bg-[#3E8562] hover:bg-[#2d6147] transition-colors"
            >
              <Send className="h-4 w-4 mr-2" />
              SUBMIT NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;