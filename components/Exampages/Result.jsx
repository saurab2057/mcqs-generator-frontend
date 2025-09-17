// frontend/components/Exampages/Result.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Eye, RotateCcw } from 'lucide-react';
import apiClient from '../communication/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// Sound effect URLs (using free sound effects)
const SOUND_EFFECTS = {
  pass: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  fail: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav'
};

const Result = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [chartConfig, setChartConfig] = useState(null);

  // Play sound effect based on score
  const playSound = (isPassed) => {
    try {
      const audio = new Audio();
      if (isPassed) {
        audio.src = SOUND_EFFECTS.pass;
      } else {
        audio.src = SOUND_EFFECTS.fail;
      }
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Sound play failed:', e));
    } catch (error) {
      console.log('Sound effect not available:', error);
    }
  };

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await apiClient.get(`/api/exams/result/${resultId}`);
        setResultData(response.data);

        // 👇 FETCH CHART DATA
        const statsResponse = await apiClient.get(`/api/exams/result/${resultId}/stats`);
        setChartConfig(statsResponse.data.chart);

      } catch (error) {
        console.error('Error fetching result:', error);
        alert('Failed to load result. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [resultId]);

  // Play sound and animation when result loads
  useEffect(() => {
    if (resultData && !animationPlayed) {
      const isPassed = resultData.score >= 50;
      setTimeout(() => {
        playSound(isPassed);
        setAnimationPlayed(true);
      }, 500);
    }
  }, [resultData, animationPlayed]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 80) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 90) return 'from-emerald-500/20 to-emerald-600/10';
    if (score >= 80) return 'from-green-500/20 to-green-600/10';
    if (score >= 70) return 'from-yellow-500/20 to-yellow-600/10';
    if (score >= 60) return 'from-orange-500/20 to-orange-600/10';
    return 'from-red-500/20 to-red-600/10';
  };

  const getResultMessage = (score) => {
    if (score >= 50) {
      return {
        title: "Congratulations! 🎉",
        message: "You passed the exam!",
        animation: "animate-bounce"
      };
    } else {
      return {
        title: "Better luck next time 😔",
        message: "You didn't pass this time, but keep trying!",
        animation: "animate-pulse"
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-white/20 rounded-full"></div>
            <div className="w-32 h-4 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-red-500/50 text-center">
          <p className="text-white text-lg mb-6">Result not found</p>
          <button
            onClick={() => navigate('/exam')}
            className="px-6 py-3 bg-[#2D6147] text-white rounded-xl font-semibold hover:bg-[#245239] transition-all duration-200 transform hover:scale-105"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { score, timeUsed, sectionAStats, sectionBStats, comparison, submittedAt } = resultData;
  const resultMessage = getResultMessage(score);
  const isPassed = score >= 50;

  // Filter comparison to show only WRONG answers
  const wrongAnswers = comparison.filter(item => {
    const yourAnswer = item.yourAnswer || {};
    return !yourAnswer.isCorrect;
  });

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`${resultMessage.animation} ${animationPlayed ? '' : 'animate-none'}`}>
            <h1 className="text-3xl font-bold text-white mb-2">Exam Complete!</h1>
            <h2 className={`text-2xl font-semibold mb-2 ${isPassed ? 'text-green-400' : 'text-red-400'}`}>
              {resultMessage.title}
            </h2>
            <p className="text-slate-300">{resultMessage.message}</p>
          </div>
        </div>

        {/* Main Result Card */}
        <div className={`bg-white/10 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-1000 ${isPassed ? 'border-green-500/50 shadow-green-500/20' : 'border-red-500/50 shadow-red-500/20'
          } ${animationPlayed ? 'shadow-2xl' : ''}`}>

          {/* Score Section */}
          <div className="p-8 text-center border-b border-white/10">
            <div className={`text-6xl font-bold mb-2 transition-all duration-1000 ${getScoreColor(score)} ${animationPlayed ? (isPassed ? 'animate-pulse' : 'animate-bounce') : ''
              }`}>
              {score}
            </div>
            <div className="text-white text-lg mb-4">
              out of 100
              <span className={`ml-2 text-sm ${isPassed ? 'text-green-400' : 'text-red-400'}`}>
                ({isPassed ? 'PASSED' : 'FAILED'})
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{formatTime(timeUsed)}</div>
                <div className="text-slate-400 text-sm">Time Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{sectionAStats.marks}/{sectionAStats.total}</div>
                <div className="text-slate-400 text-sm">Section A</div>
              </div>
              <div className="text-center md:col-span-1 col-span-2">
                <div className="text-2xl font-bold text-white mb-1">{sectionBStats.marks}/{sectionBStats.total * 2}</div>
                <div className="text-slate-400 text-sm">Section B</div>
              </div>
            </div>
          </div>

          {chartConfig && (
            <div className="flex justify-center items-center mt-12">
              <div className="w-full max-w-3xl p-8 rounded-2xl border border-white/10 bg-white/5 shadow-xl">
                <h3 className="text-white text-xl font-bold mb-6 text-center tracking-wide">
                  Your Performance
                </h3>
                <div className="h-[400px] w-full">
                  <Bar
                    data={chartConfig.data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: '#e2e8f0',
                            font: { size: 15, weight: '500' }
                          }
                        },
                        title: {
                          display: false // optional, since you already have "Your Performance" above
                        }
                      },
                      scales: {
                        x: {
                          ticks: { color: '#94a3b8', font: { size: 13 } },
                          grid: { color: 'rgba(255,255,255,0.1)' }
                        },
                        y: {
                          min: 0,
                          max: 60,
                          ticks: { color: '#94a3b8', stepSize: 5, font: { size: 13 } },
                          grid: { color: 'rgba(255,255,255,0.1)' }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}


          {/* Actions */}
          <div className="p-6 flex flex-col sm:flex-row gap-4 justify-center">
            {wrongAnswers.length > 0 && (
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20 transform hover:scale-105"
              >
                {showComparison ? 'Hide' : 'Review'} Mistakes
              </button>
            )}
            <button
              onClick={() => navigate('/exam')}
              className="px-6 py-3 bg-[#2D6147] text-white rounded-xl font-semibold hover:bg-[#245239] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Take Another Exam
            </button>
          </div>

          {/* Answer Comparison — ONLY FOR WRONG ANSWERS */}
          {showComparison && wrongAnswers.length > 0 && (
            <div className="border-t border-white/10 bg-black/20">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  Review Your Mistakes ({wrongAnswers.length})
                </h3>

                <div className="space-y-4">
                  {wrongAnswers.map((item, index) => {
                    const questionText = item.yourAnswer?.questionText || item.correctAnswer?.questionText || `Question ${index + 1}`;
                    const yourAnswer = item.yourAnswer || {};
                    const correctAnswer = item.correctAnswer || {};

                    return (
                      <div key={item.questionId || index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-white font-medium mb-4 leading-relaxed text-sm">{questionText}</div>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="text-slate-400 text-sm">Your Answer</div>
                            <div className="text-red-400 font-medium">
                              {yourAnswer.option && yourAnswer.optionText
                                ? `${yourAnswer.option}. ${yourAnswer.optionText}`
                                : "No Answer"}
                              <span className="ml-2">✗</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-slate-400 text-sm">Correct Answer</div>
                            <div className="text-green-400 font-medium">
                              {correctAnswer.option && correctAnswer.optionText
                                ? `${correctAnswer.option}. ${correctAnswer.optionText}`
                                : "N/A"}
                              <span className="ml-2">✓</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Message if no wrong answers */}
          {showComparison && wrongAnswers.length === 0 && (
            <div className="border-t border-white/10 bg-black/20 p-6 text-center">
              <p className="text-green-400 font-medium text-lg">🎉 Perfect score! No mistakes to review.</p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            Submitted on {new Date(submittedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;