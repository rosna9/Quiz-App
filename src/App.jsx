import './App.css';
import React, { useEffect, useState } from "react";
import Question from "./Question.jsx";
import Feedback from "./Feedback.jsx";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  useEffect(() => {
    fetch("src/data/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.data.questions.map((q) => ({
          ...q,
          blanks: q.correctAnswer.length,
        }));
        setQuestions(formatted);
      });
  }, []);

  useEffect(() => {
    if (questions.length === 0 || showFeedback) return;
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, questions, showFeedback]);

  const handleSelect = (index, word) => {
    setSelectedAnswers((prev) => ({ ...prev, [index]: word }));
  };

  const handleUnselect = (index) => {
    const copy = { ...selectedAnswers };
    delete copy[index];
    setSelectedAnswers(copy);
  };

  const handleNext = () => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = Object.values(selectedAnswers);
    setUserAnswers(newUserAnswers);
    setSelectedAnswers({});
    setTimeLeft(30);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowFeedback(true);
    }
  };

  if (questions.length === 0) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (showFeedback) return <Feedback userAnswers={userAnswers} questions={questions} />;

  const currentQuestion = questions[currentIndex];
  const allFilled = Object.keys(selectedAnswers).length === currentQuestion.blanks;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-4">
      <div className="w-[975px] h-[642px] bg-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center gap-4">
        {/* Header */}
        <div className=" flex flex-col sm:flex-row justify-between items-center mb-6 gap-3 sm:gap-0">
          <div >
            <h1 className="text-2xl font-extrabold text-blue-700">✨ Make the sentence shine!</h1>
            <p className="text-sm text-gray-600 mt-1">Place the words in the correct order to build a beautiful sentence.</p>
          </div>
          {/* Timer */}
          <div className="bg-blue-100 px-4 py-2 rounded-lg text-blue-800 font-semibold shadow">
            ⏳ Time Left: {timeLeft}s
          </div>
        </div>

       {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6 shadow-inner">
  <div
    className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full shadow-lg transition-all duration-700 ease-in-out"
    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}>

    </div>
</div>


        {/* Question */}
        <Question
          question={currentQuestion}
          selectedAnswers={selectedAnswers}
          onSelect={handleSelect}
          onUnselect={handleUnselect}
        />
      
        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
          <button
            disabled={!allFilled}
            onClick={handleNext}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition ${
              allFilled
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
          <button
            onClick={() => setShowQuitConfirm(true)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Quit
          </button>
        </div>
      </div>

      {/* Quit Confirmation Modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-indigo-3000 bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Quit Confirmation</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to quit? Your progress will be lost. 💔</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowQuitConfirm(false);
                  window.location.href = "/quit";
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Quit
              </button>
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No, Stay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
