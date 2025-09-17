import React, { useState, useRef, useEffect } from 'react';
import apiClient from './communication/api';

import {
  MessageCircle,
  Send,
  X,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Search,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react';

const HelpChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Welcome to ExamNest Support! I\'m your AI assistant powered by Hugging Face. How can I help you with your exam preparation today? You can also search for help articles above.',
      timestamp: new Date(),
      suggestions: null
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'connected', 'error'
  const [selectedArticle, setSelectedArticle] = useState(null);
  const messagesEndRef = useRef(null);

  // New ExamNest articles
  const suggestedArticles = [
    {
      title: 'How to Prepare for the Nepal Engineering Council Exam',
      description: 'Effective strategies to ace your exam',
      keywords: ['exam', 'preparation', 'study', 'strategy'],
      content: `Preparing for the Nepal Engineering Council registration exam requires a strategic approach to maximize your performance:
1. Focus on Your Strengths First**: Identify the subjects or topics you are most confident in and master them thoroughly to secure a strong foundation.
2. Tackle Weaker Areas Next**: Gradually shift your focus to areas where you need improvement, dedicating extra time to practice and review.
3. Practice with Simulations**: Use ExamNest’s simulation tools to familiarize yourself with the exam format and time constraints.
4. Create a Study Schedule**: Plan your study sessions to cover all topics systematically, ensuring you balance revision and practice.
5. Stay Consistent**: Study regularly and avoid cramming to retain information effectively.`
    },
    {
      title: 'About ExamNest',
      description: 'Learn about our platform and its features',
      keywords: ['examnest', 'platform', 'features', 'simulation'],
      content: `ExamNest is a dedicated platform designed to help candidates prepare for the Nepal Engineering Council registration examination. Our website offers:
1. Realistic exam simulations to mimic the actual test environment.
2. Comprehensive practice questions covering all relevant topics.
3. Detailed performance analytics to track your progress.

Join thousands of aspiring engineers in boosting your confidence and readiness with ExamNest!`
    },
    {
      title: 'How to Use ExamNest Simulations',
      description: 'Guide to navigating our exam practice tools',
      keywords: ['simulation', 'practice', 'tools', 'examnest'],
      content: `ExamNest’s simulation tools are designed to help you prepare effectively:
1. Access Simulations: Log in to your ExamNest account and navigate to the "Simulations" section.
2. Select a Test: Choose a practice exam that matches your target subject or difficulty level.
3. Simulate Real Conditions: Take the test under timed conditions to mimic the actual exam.
4. Review Results: Analyze your performance with detailed feedback on correct and incorrect answers.
5. Repeat and Improve: Use the insights to focus on weak areas and retake simulations to track progress.`
    },
    {
      title: 'Tips for Managing Exam Stress',
      description: 'Stay calm and confident during preparation',
      keywords: ['stress', 'anxiety', 'exam', 'mental health'],
      content: `Managing stress is key to performing well in the Nepal Engineering Council exam:
1. Practice Mindfulness: Use techniques like deep breathing or meditation to stay calm.
2. Take Breaks: Schedule short breaks during study sessions to avoid burnout.
3. Stay Organized: Keep your study materials and schedule organized to reduce anxiety.
4. Get Enough Sleep: Prioritize rest to ensure your mind is sharp on exam day.
5. Use ExamNest Tools: Our simulations help build familiarity, reducing exam-day nerves.`
    }
  ];

  // Check API status only when chatbot is opened
  useEffect(() => {
    if (isOpen) {
      checkApiStatus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkApiStatus = async () => {
    if (!navigator.onLine) {
      setApiStatus('error');
      return;
    }

    try {
      await apiClient.post('/api/chat', { message: "status check" }, { timeout: 30000 });
      setApiStatus('connected');
    } catch (error) {
      console.error('Backend status check failed:', error);
      setApiStatus('error');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!selectedArticle && !searchQuery) {
      scrollToBottom();
    }
  }, [messages, selectedArticle, searchQuery]);

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setSelectedArticle(null);
    if (searchQuery) {
      setSearchQuery('');
    }

    setConversationHistory(prev => [...prev, { role: 'user', content: messageText }]);

    try {
      const response = await apiClient.post('api/chat', { message: messageText });
      const botReplyContent = response.data?.reply || 'Received an empty reply.';

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botReplyContent,
        timestamp: new Date(),
        suggestions: null,
        error: false
      };

      setMessages(prev => [...prev, botMessage]);
      setConversationHistory(prev => [...prev, { role: 'assistant', content: botReplyContent }]);

    } catch (error) {
      console.error("Error sending message to backend:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: `I apologize, but I'm having trouble processing your request right now.${!isOnline ? ' You appear to be offline.' : apiStatus === 'error' ? ' The AI service might be unavailable.' : ''} Please try again or contact our support team for immediate assistance.`,
        timestamp: new Date(),
        suggestions: ['Try again later', 'Check FAQ', 'Contact Support Team'],
        error: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion === 'Check FAQ') {
      setSearchQuery('');
      setSelectedArticle(null);
    } else {
      handleSendMessage(suggestion);
    }
    if (selectedArticle) {
      setSelectedArticle(null);
    }
    if (searchQuery && suggestion !== 'Check FAQ') {
      setSearchQuery('');
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setSearchQuery('');
  };

  const handleBackToChat = () => {
    setSelectedArticle(null);
    setSearchQuery('');
  };

  const handleFeedback = (messageId, isHelpful) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId
        ? { ...msg, feedback: isHelpful ? 'helpful' : 'not-helpful' }
        : msg
    ));
    console.log(`Feedback for message ${messageId}: ${isHelpful ? 'helpful' : 'not helpful'}`);
  };

  const filteredArticles = suggestedArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="w-4 h-4 text-red-500" />;

    switch (apiStatus) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse" />;
    }
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';

    switch (apiStatus) {
      case 'connected':
        return 'Active';
      case 'error':
        return 'Closed';
      default:
        return 'Connecting...';
    }
  };

  const renderContent = () => {
    if (selectedArticle) {
      // --- Article View ---
      return (
        <div className="flex-1 overflow-y-auto p-4">
          <button
            onClick={handleBackToChat}
            className="flex items-center text-green-600 dark:text-green-400 hover:underline mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Chat
          </button>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{selectedArticle.title}</h4>
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
            {selectedArticle.content}
          </div>
        </div>
      );
    } else if (searchQuery) {
      // --- Search Results View ---
      return (
        <div className="flex-1 overflow-y-auto p-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Suggested Articles
          </h4>
          <div className="space-y-2">
            {filteredArticles.map((article, index) => (
              <button
                key={index}
                onClick={() => handleArticleClick(article)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                      {article.title}
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {article.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
            {filteredArticles.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
                No articles found matching "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      );
    } else {
      // --- Chat Messages View ---
      return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-3 rounded-2xl ${message.type === 'user'
                      ? 'bg-green-600 text-white rounded-br-md'
                      : message.error
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-bl-md border border-red-200 dark:border-red-800'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
                    } transition-colors duration-300`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                </div>

                {/* Suggestions - Only render if present in the message object */}
                {message.suggestions && message.suggestions.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left p-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}

                {/* Feedback for bot messages */}
                {message.type === 'bot' && message.id !== 1 && !message.error && (
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Was this helpful?</span>
                    <button
                      onClick={() => handleFeedback(message.id, true)}
                      className={`p-1 rounded ${message.feedback === 'helpful'
                          ? 'text-green-600 bg-green-100 dark:bg-green-900/20'
                          : 'text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                        } transition-colors duration-200`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleFeedback(message.id, false)}
                      className={`p-1 rounded ${message.feedback === 'not-helpful'
                          ? 'text-red-600 bg-red-100 dark:bg-red-900/20'
                          : 'text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                        } transition-colors duration-200`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md p-3 transition-colors duration-300">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      );
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label='Open Chat'
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-50"
      >
        <MessageCircle className="w-10 h-10" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px] bg-white dark:bg-gray-900 sm:rounded-2xl shadow-2xl border-gray-200 dark:border-gray-700 sm:border flex flex-col z-50 transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 sm:rounded-t-2xl flex items-center justify-between flex-shrink-0">
        <div>
          <h3 className="font-semibold">Hi,</h3>
          <p className="text-sm text-green-100">How can we help?</p>
          <div className="mt-1">
            <div className="flex items-center space-x-2 text-sm text-green-100">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Bar - Hide if viewing an article */}
      {!selectedArticle && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for Articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
            />
          </div>
        </div>
      )}

      {/* Content Area - Render based on state (article, search, or chat) */}
      <div className="flex-1 flex flex-col min-h-0">
        {renderContent()}
      </div>

      {/* Input Area - Only show input in chat view */}
      {!selectedArticle && !searchQuery && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isOnline ? "Ask me anything..." : "You're offline"}
              disabled={!isOnline || apiStatus === 'error'}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || !isOnline || apiStatus === 'error'}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Contact Support button always shown at the bottom */}
      <div className="mt-auto p-3 text-center border-t border-gray-200 dark:border-gray-700">
        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
          Contact Support Team
        </button>
      </div>
    </div>
  );
};

export default HelpChatbot;