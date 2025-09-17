import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../components/Home';
import Syllabus from '../components/Syllabus';
import Footer from '../components/Footer';
import Exam from '../components/Exam';
import Chatbot from '../components/Chatbot';
import Result from '../components/Exampages/Result';  

// MainLayout component to wrap Header, Home, Syllabus, and Footer
function MainLayout() {
  return (
    <div className='overflow-x-hidden'>
      <Header />
      <Home />
      <Syllabus />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} /> {/* Root route uses MainLayout */}
        <Route path="/exam" element={<Exam />} /> {/* Exam route only renders Exam */}
        <Route path="/result/:resultId" element={<Result />} />
      </Routes>
    </Router>
  );
}