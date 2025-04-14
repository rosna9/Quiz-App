// import React from "react";

// const Feedback = ({ userAnswers, questions }) => {
//   let score = 0;

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Test Feedback</h2>

//       {questions.map((q, i) => {
//         const correct = q.correctAnswer || [];
//         const user = Array.isArray(userAnswers[i]) ? userAnswers[i] : [];
//         const isCorrect = JSON.stringify(correct) === JSON.stringify(user);
//         if (isCorrect) score++;

//         return (
//           <div key={i} className="mb-6 border-b pb-4">
//             <p className="font-semibold text-lg mb-2">
//               Q{i + 1}: {q.question.replace(/___/g, "____________")}
//             </p>
//             <p>
//               <span className="font-medium">Your Answer:</span>{" "}
//               {user.length > 0 ? user.join(", ") : <span className="italic text-gray-500">No answer given</span>}
//             </p>
//             {isCorrect ? (
//               <p className="text-green-600 font-medium">Correct ✅</p>
//             ) : (
//               <>
//                 <p className="text-red-600 font-medium">Incorrect ❌</p>
//                 <p>
//                   <span className="font-medium">Correct Answer:</span> {correct.join(", ")}
//                 </p>
//               </>
//             )}
//           </div>
//         );
//       })}

//       <div className="mt-6 text-2xl font-bold text-center">
//         Your Score: <span className="text-blue-700">{score}</span> / {questions.length}
//       </div>
//     </div>
//   );
// };

// export default Feedback;
// src/Feedback.jsx
import React from 'react';

const Feedback = ({ userAnswers, questions }) => {
  const getAnswerStatus = (userAnswer, correctAnswer) => {
    return (
      JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-indigo-300 bg-opacity-50 z-50">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-600">
        Your Feedback
      </h1>

      {questions.map((question, index) => {
        const userAnswer = userAnswers[index] || [];
        const correctAnswer = question.correctAnswer;
        const isCorrect = getAnswerStatus(userAnswer, correctAnswer);

        return (
          <div
            key={index}
            className={`mb-6 p-4 rounded-md shadow-md ${
              isCorrect ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <h2 className="text-lg font-semibold mb-2">
              Q{index + 1}:{" "}
              <span className="text-gray-800">{question.question}</span>
            </h2>

            <p className="text-base sm:text-lg mb-1">
              <span className="font-semibold">Your Answer:</span>{" "}
              {userAnswer.join(" ")}
            </p>
            <p className="text-base sm:text-lg">
              <span className="font-semibold">Correct Answer:</span>{" "}
              {correctAnswer.join(" ")}
            </p>

            <p
              className={`mt-2 text-sm sm:text-base font-semibold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
            </p>
          </div>
        );
      })}

      <div className="text-center mt-10">
        <a
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-all duration-200"
        >
          Try Again
        </a>
      </div>
    </div>
  );
};

export default Feedback;
