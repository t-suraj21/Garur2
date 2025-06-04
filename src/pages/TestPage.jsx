// src/pages/TestPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TestPage = () => {
  const { classId, subject, chapterId } = useParams();
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/api/test/start/${classId}/${subject}/${chapterId}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching test:', error);
        setIsLoading(false);
      });
  }, [classId, subject, chapterId]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { 
      q: questions[questionIndex].question, 
      a: answer,
      timestamp: new Date().toISOString()
    }];
    setAnswers(newAnswers);
    
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
    } else {
      handleTestCompletion();
    }
  };

  const handleTestCompletion = () => {
    setTestCompleted(true);
    
    // Simulate score calculation
    setTimeout(() => {
      const calculatedScore = Math.floor(Math.random() * 100);
      setScore(calculatedScore);
    }, 2000);
  };

  const handleRetakeTest = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setTestCompleted(false);
    setScore(null);
  };

  const handleBackToReader = () => {
    navigate(`/reader/${classId}/${subject}/${chapterId}`);
  };

  return (
    <div className="app-container bg-surface">
      <main className="main-content">
        <div className="flex flex-col gap-lg">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Chapter Test</h1>
              <p className="text-lg text-secondary">
                Class {classId} {subject.charAt(0).toUpperCase() + subject.slice(1)} - Chapter {chapterId}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleBackToReader}
                className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Back to Reader
              </button>
              {testCompleted && (
                <button
                  onClick={handleRetakeTest}
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Retake Test
                </button>
              )}
            </div>
          </div>

          {/* Test Content */}
          <div className="card">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="loading-spinner"></div>
              </div>
            ) : testCompleted ? (
              <div className="flex flex-col items-center gap-lg py-8">
                <div className="text-6xl font-bold text-primary">{score}</div>
                <div className="text-2xl text-secondary">out of 100</div>
                <div className="w-full max-w-md h-4 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <div className="text-center text-secondary">
                  <p className="mb-2">Test completed successfully!</p>
                  <p>You can review your answers or retake the test.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-lg">
                {/* Progress */}
                <div className="flex items-center justify-between text-sm text-secondary">
                  <span>Question {questionIndex + 1} of {questions.length}</span>
                  <div className="w-48 h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Current Question */}
                <div className="p-6 bg-background rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Question {questionIndex + 1}</h2>
                  <p className="text-lg">{questions[questionIndex]?.question}</p>
                </div>

                {/* Answer Section */}
                <div className="flex flex-col items-center gap-4">
                  <textarea
                    className="w-full p-4 border rounded-lg"
                    placeholder="Type your answer here..."
                    rows={4}
                  />
                  <button
                    onClick={() => handleAnswer(document.querySelector('textarea').value)}
                    className="px-8 py-4 rounded-full text-lg font-semibold transition-all bg-primary text-white hover:bg-primary-dark"
                  >
                    Submit Answer
                  </button>
                </div>

                {/* Previous Answers */}
                {answers.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Your Answers</h3>
                    <div className="space-y-4">
                      {answers.map((answer, index) => (
                        <div key={index} className="p-4 bg-background rounded-lg">
                          <p className="font-semibold mb-2">Q: {answer.q}</p>
                          <p className="text-secondary">A: {answer.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-lg">
                <h3 className="font-semibold mb-2">Tips</h3>
                <ul className="text-sm text-secondary space-y-2">
                  <li>Take your time to think before answering</li>
                  <li>You can review your previous answers</li>
                  <li>Make sure to complete all questions</li>
                  <li>You can retake the test if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestPage;