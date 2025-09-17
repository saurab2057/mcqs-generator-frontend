import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { syllabusData } from './syllabusData';

const Syllabus = () => {
  const [expandedChapters, setExpandedChapters] = useState([]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Nepal Engineering Council
            <br />
            <span className="text-emerald-600">Registration Examination</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-4"
          >
            Computer Engineering Syllabus (ACE)
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 max-w-4xl mx-auto"
          >
            Chapters 1-2 cover fundamentals; chapters 3-9 focus on applications; chapter 10 addresses project planning and implementation.
          </motion.p>
        </div>

        <div className="space-y-6">
          {syllabusData.map(chapter => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: chapter.id * 0.1 }}
              className="bg-gray-900 rounded-2xl overflow-hidden"
            >
              <button
                className="p-6 w-full flex items-center justify-between hover:bg-gray-800 transition-colors duration-300"
                onClick={() => toggleChapter(chapter.id)}
                aria-expanded={expandedChapters.includes(chapter.id)}
                aria-controls={`chapter-${chapter.id}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={clsx(
                      'p-3 rounded-xl transition-transform duration-300',
                      chapter.bgColor,
                      chapter.color,
                      'group-hover:scale-110'
                    )}
                  >
                    {React.cloneElement(chapter.icon, { 'aria-hidden': true })}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white hover:text-emerald-600">
                      {chapter.id}. {chapter.title}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">{chapter.code}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedChapters.includes(chapter.id) ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedChapters.includes(chapter.id) ? (
                    <ChevronDown className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-gray-400" aria-hidden="true" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedChapters.includes(chapter.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-l-2 border-emerald-600 pl-6 space-y-6">
                      {chapter.topics.map((topic, topicIndex) => (
                        <motion.div
                          key={topicIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: topicIndex * 0.05 }}
                          className="bg-gray-950 rounded-xl p-6 hover:bg-gray-900 transition-colors duration-300"
                        >
                          <h3 className="text-lg font-semibold text-emerald-600 mb-3">
                            {topic.section} {topic.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">{topic.content}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Preparation?</h3>
            <p className="text-gray-300 mb-6">
              Master all these topics with our comprehensive learning platform and expert guidance.
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-700 hover:scale-105 transition-all duration-300 px-8 py-3 rounded-xl font-semibold text-white shadow-lg">
              Begin Learning Journey
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Syllabus;