import React from 'react';

const QuestionDisplay = ({
  questions,        // Now: flat array of questions WITH section: "Section A"
  answers,
  onAnswerSelect,
  pageNumber
}) => {
  const questionsPerPage = 16;
  const startIdx = (pageNumber - 1) * questionsPerPage;
  const pageQuestions = questions.slice(startIdx, startIdx + questionsPerPage);

  // Group by section — now section is defined!
  const sections = {};
  pageQuestions.forEach(q => {
    if (!sections[q.section]) sections[q.section] = [];
    sections[q.section].push(q);
  });

  return (
    <div className="bg-white shadow-lg mx-4 my-4 min-h-[800px]">
      {/* Header and Metadata — Only on Page 1 */}
      {pageNumber === 1 && (
        <>
          <div className="bg-white px-6 py-4 border-b-2 border-gray-300">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                  Nepal Engineering Council<br />
                  License Registration Examination
                </h2>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">Page {pageNumber}</p>
              </div>
            </div>

            <div className="flex flex-col items-start text-sm text-gray-600 mt-2 gap-1">
              <span>Time: 2Hrs</span>
              <span>Total Marks: 100</span>
              <span>Roll No: _____________</span>
            </div>

            <div className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400">
              <p className="text-xs text-blue-800">
                <strong>Instructions:</strong> Choose the most appropriate answer for each question. Click again to untick your selection. Negative marking applies!
              </p>
            </div>
          </div>
        </>
      )}

      {/* Questions Section — Always Render */}
      {Object.entries(sections).map(([sectionName, sectionQuestions], index) => (
        <div key={index} className="px-6 py-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{sectionName}</h3>
          {sectionQuestions.map((question) => {
            const questionAnswer = answers.find(a => a.questionId === question.id);
            return (
              <div key={question.id} className="mb-5">
                <div className="flex items-start space-x-2 mb-2">
                  <span className="text-sm font-bold text-gray-800 flex-shrink-0 mt-0.5">
                    {question.id}.
                  </span>
                  <p className="text-sm text-gray-800 leading-5 font-medium">
                    {question.text}
                  </p>
                </div>
                <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                  {question.choices.map((option, optionIdx) => (
                    <div key={optionIdx} className="flex items-center space-x-2">
                      <div
                        className="relative cursor-pointer flex-shrink-0"
                        onClick={() => onAnswerSelect(question.id, optionIdx)}
                      >
                        <div className={`w-4 h-4 border-2 border-gray-600 rounded-sm flex items-center justify-center transition-all ${questionAnswer?.selectedOption === optionIdx
                            ? 'bg-green-600 border-green-600'
                            : 'bg-white hover:border-green-500'
                          }`}>
                          {questionAnswer?.selectedOption === optionIdx && (
                            <svg className="w-3 h-3 text-white font-bold" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div
                        className="cursor-pointer flex-1"
                        onClick={() => onAnswerSelect(question.id, optionIdx)}
                      >
                        <span className="text-sm text-gray-700">
                          <span className="font-semibold mr-1">({option.option})</span>
                          {option.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Footer — Always shown */}
      <div className="border-t border-gray-300 px-6 py-3 bg-gray-50 mt-8">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-600">© Saurab Khatiwoda</p>
          <p className="text-xs text-gray-600">
            Page {pageNumber} of {Math.ceil(questions.length / questionsPerPage)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;