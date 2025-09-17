import React from 'react';

const ExamHeader = ({
  timeRemaining,
  currentPage,
  totalPages,
  answeredCount,
  totalQuestions
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <header className="sticky top-0 w-full z-50 bg-[#29292c]/95 backdrop-blur-md shadow-lg px-4 py-2 sm:py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        {/* Left Section - Exam Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-1 sm:gap-0">
          <div className="flex items-center">
            <h1 className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap ml-2 sm:ml-4">
              ExamNest
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-300 whitespace-nowrap">
              Roll No: NEC/2024/12345
            </span>
          </div>
        </div>
        
        {/* Right Section - Progress & Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2 sm:gap-0">
          {/* Progress & Page Info */}
          <div className="flex items-center justify-between sm:justify-start sm:space-x-3">
            <div className="text-left">
              <div className="text-[10px] sm:text-xs text-gray-400">Progress</div>
              <div className="w-16 sm:w-20 bg-[#3a3a3d] rounded-full h-1.5 sm:h-2">
                <div 
                  className="bg-[#3E8562] h-1.5 sm:h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] sm:text-xs text-gray-400">Page</div>
              <div className="text-xs sm:text-sm font-bold text-white">
                {currentPage}/{totalPages}
              </div>
            </div>
          </div>
          
          {/* Timer */}
          <div className="flex items-center space-x-2 bg-[#3E8562] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md">
            <div className="text-left">
              <div className="text-[10px] sm:text-xs text-white/90">Time Left</div>
              <div className="text-xs sm:text-sm font-bold text-white">
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;