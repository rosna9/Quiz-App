// src/components/Question.js
import React from "react";

const Question = ({ question, selectedAnswers, onSelect, onUnselect }) => {
  const renderSentence = () => {
    const parts = question.question.split(/_+/);
    const sentence = [];

    for (let i = 0; i < question.correctAnswer.length; i++) {
      sentence.push(<span key={`text-${i}`}>{parts[i]}</span>);
      sentence.push(
        <span
          key={`blank-${i}`}
          className={`inline-block min-w-[60px] px-2 py-1 border-b border-black text-center mx-1 cursor-pointer whitespace-nowrap${
            selectedAnswers[i] ? "bg-blue-100 text-blue-700" : "bg-white"}`}
          onClick={() => selectedAnswers[i] && onUnselect(i)}
        >
          {selectedAnswers[i] || ""}
        </span>
      );
    }
    sentence.push(<span key={`text-end`}>{parts[question.correctAnswer.length]}</span>);
    return sentence;
  };

  const usedWords = Object.values(selectedAnswers);
  const remainingOptions = question.options.filter((word) => !usedWords.includes(word));
  // const blanksFilled = Object.keys(selectedAnswers).length;
  // const totalBlanks = question.correctAnswer.length;
  //  const progressPercent = (blanksFilled / totalBlanks) * 100;

  return (
    <div className="space-y-6">
      <div className="text-lg sm:text-xl font-semibold flex flex-wrap items-center gap-2">
        {renderSentence()}
        </div>
        {/* <div className="w-full h-2 bg-gray-200 rounded-full"> */}
      {/* <div className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
      style={{ width: `${progressPercent}%` }}
      >
      </div> */}
      <div className="flex flex-wrap gap-3 justify-start">
        {remainingOptions.map((word, idx) => (
          <button
            key={idx}
            className="bg-gray-200 text-black px-3 py-1 grid place-items-center rounded-md gap-2 hover:bg-pink"
            onClick={() => {
              const emptyIndex = [...Array(question.correctAnswer.length).keys()].find(
                (i) => !selectedAnswers[i]
              );
              if (emptyIndex !== undefined) onSelect(emptyIndex, word);
            }}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
   
  );
};

export default Question;
