import React from 'react';
import { ChevronLeft, ChevronRight, Eye, Send } from 'lucide-react';

const ExamControls = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onReview,
  onSubmit
}) => {
  return (
    <div className="bg-[#29292c] border-t border-[#3a3a3d] px-3 sm:px-6 py-3 sticky bottom-0 z-40">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Navigation Controls */}
        <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
          <button
            onClick={onPreviousPage}
            disabled={currentPage <= 1}
            className={`inline-flex items-center px-3 py-2 sm:px-4 sm:py-2.5 border rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              currentPage > 1 
                ? 'text-white bg-[#3a3a3d] border-[#3E8562] hover:bg-[#3E8562] hover:text-white' 
                : 'text-gray-500 bg-[#29292c] border-[#3a3a3d] cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Previous</span>
          </button>
          
          <span className="text-xs sm:text-sm text-gray-300 font-medium px-3 py-1.5 sm:px-4 sm:py-2 bg-[#3a3a3d] rounded border border-[#3a3a3d] whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={onNextPage}
            disabled={currentPage >= totalPages}
            className={`inline-flex items-center px-3 py-2 sm:px-4 sm:py-2.5 border rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              currentPage < totalPages 
                ? 'text-white bg-[#3a3a3d] border-[#3E8562] hover:bg-[#3E8562] hover:text-white' 
                : 'text-gray-500 bg-[#29292c] border-[#3a3a3d] cursor-not-allowed'
            }`}
          >
            <span className="hidden xs:inline">Next</span>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
          </button>
        </div>

        {/* Action Buttons - Review & Submit */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3">
          <button
            onClick={onReview}
            className="inline-flex items-center justify-center px-2.5 py-2 sm:px-4 sm:py-2.5 border rounded-lg text-xs sm:text-sm font-medium text-gray-300 bg-[#3a3a3d] hover:bg-[#4a4a4d] transition-all duration-200 whitespace-nowrap"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Review</span>
          </button>
          
          <button
            onClick={onSubmit}
            className="inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 border border-transparent rounded-lg text-xs sm:text-sm font-bold text-[#29292c] bg-[#3E8562] hover:bg-[#2d6147] transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamControls;