import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExamHeader from '../components/Exampages/ExamHeader';
import QuestionDisplay from '../components/Exampages/QuestionDisplay';
import ExamControls from '../components/Exampages/ExamControls';
import SubmitModal from '../components/Exampages/SubmitModal';
import ReviewModal from '../components/Exampages/ReviewModal';
import ExamComplete from '../components/Exampages/ExamComplete';
import apiClient from './communication/api';

const Exam = () => {
  const [availableSets, setAvailableSets] = useState([]);
  const [currentSetId, setCurrentSetId] = useState(null);
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(7200);
  const [examStarted, setExamStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isExamComplete, setIsExamComplete] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);
  const navigate = useNavigate();
  const questionsPerPage = 16;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  // Fetch available sets
  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await apiClient.get('/api/exams');
        setAvailableSets(response.data);
      } catch (error) {
        console.error('Error fetching sets:', error);
        setAvailableSets([]);
      }
    };
    fetchSets();
  }, []);

  // Load exam set when user clicks a set
  const loadSet = async (setId) => {
    setLoading(true);
    setCurrentSetId(setId);
    try {
      const response = await apiClient.get(`/api/exams/${setId}`);
      const data = response.data;
      setExamData(data);
      const allQuestions = data.sections.flatMap(section =>
        section.questions.map(q => ({
          id: q.id,
          text: q.text,
          choices: q.choices,
          answer: q.answer,
          section: section.name
        }))
      );
      setQuestions(allQuestions);
      setTimeRemaining(data.duration);
      setAnswers([]);
      setCurrentPage(1);
      setExamStarted(true);
      setIsExamComplete(false);
      setTimeUsed(0);
    } catch (error) {
      console.error('Error loading set:', error);
      alert(`Failed to load Set ${setId}. Please try again.`);
      setExamStarted(false);
    }
    setLoading(false);
  };

  // Timer
  useEffect(() => {
    if (examStarted && timeRemaining > 0 && !isExamComplete) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
        setTimeUsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [examStarted, timeRemaining, isExamComplete]);

  const handleAnswerSelect = (questionId, optionIdx) => {
    console.log('handleAnswerSelect called with questionId:', questionId, 'optionIdx:', optionIdx);
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        if (existing.selectedOption === optionIdx) {
          return prev.filter(a => a.questionId !== questionId); // Untick
        }
        return prev.map(a =>
          a.questionId === questionId ? { ...a, selectedOption: optionIdx } : a
        );
      }
      return [...prev, { questionId, selectedOption: optionIdx }];
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePageSelect = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleReview = () => {
    setIsReviewModalOpen(true);
  };

  const handleSubmit = () => {
    setIsSubmitModalOpen(true);
  };

  const confirmSubmit = async () => {
    try {
      // Map all questions to include unanswered ones with null
      const mappedAnswers = questions.map(question => {
        const userAnswer = answers.find(a => a.questionId === question.id);
        if (!userAnswer) {
          return { questionId: question.id, selectedOption: null };
        }
        const selectedIndex = userAnswer.selectedOption;
        if (selectedIndex === undefined || selectedIndex === null || selectedIndex < 0 || selectedIndex >= question.choices.length) {
          console.warn(`Invalid selection index ${selectedIndex} for question ${question.id} (choices length: ${question.choices.length})`);
          return { questionId: question.id, selectedOption: null };
        }
        const choice = question.choices[selectedIndex];
        if (!choice || !choice.option || !['A', 'B', 'C', 'D'].includes(choice.option)) {
          console.warn(`Invalid choice for question ${question.id}: ${JSON.stringify(choice)} (expected A-D)`);
          return { questionId: question.id, selectedOption: null };
        }
        return { questionId: question.id, selectedOption: choice.option };
      });

      // Validate payload
      if (!currentSetId || !Number.isInteger(currentSetId) || mappedAnswers.length === 0 || !Number.isInteger(timeUsed)) {
        throw new Error('Invalid submission data');
      }

      // Log the payload for debugging
      const payload = { setId: currentSetId, answers: mappedAnswers, timeUsed };
      console.log('Submitting payload:', JSON.stringify(payload, null, 2));

      // Send request to backend without local score
      const response = await apiClient.post('/api/exams/submit-exam', payload);
      navigate(`/result/${response.data.resultId}`);
      setIsExamComplete(true);
      setExamStarted(false);
      setIsSubmitModalOpen(false);
    } catch (error) {
      console.error('Error submitting exam:', error.response?.data || error.message);
      alert('Failed to submit exam. Please check the console for details.');
    }
  };

  const handleRestart = () => {
    navigate('/exam');
    setExamStarted(false);
    setIsExamComplete(false);
  };

  // Keyboard navigation for pages
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentPage < totalPages) handleNextPage();
      if (e.key === 'ArrowLeft' && currentPage > 1) handlePreviousPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-100 flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-800 text-lg">Loading questions for Set {currentSetId}...</p>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-black pt-[80px] flex flex-col">
        <section className="max-w-4xl mx-auto px-6 py-12 flex-grow">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Select an Exam Set</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {availableSets.map(setId => (
              <button
                key={setId}
                onClick={() => loadSet(setId)}
                className="px-6 py-3 bg-[#2d6147] text-white rounded-lg hover:bg-[#185b29] transition-colors font-semibold text-sm sm:text-base"
              >
                Set {setId}
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (isExamComplete) {
    return (
      <ExamComplete
        answeredCount={answers.length}
        totalQuestions={questions.length}
        timeUsed={timeUsed}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
      <ExamHeader
        timeRemaining={timeRemaining}
        currentPage={currentPage}
        totalPages={totalPages}
        answeredCount={answers.length}
        totalQuestions={questions.length}
      />
      <div className="flex-1 bg-blue-50">
        <QuestionDisplay
          questions={questions}
          answers={answers}
          onAnswerSelect={handleAnswerSelect}
          pageNumber={currentPage}
        />
      </div>
      <ExamControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        onReview={handleReview}
        onSubmit={handleSubmit}
      />
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={confirmSubmit}
        answeredCount={answers.length}
        totalQuestions={questions.length}
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        totalQuestions={questions.length}
        answers={answers}
        onPageSelect={handlePageSelect}
      />
    </div>
  );
};

export default Exam;
