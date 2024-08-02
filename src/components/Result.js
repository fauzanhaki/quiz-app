import React from "react";

const Result = ({ correctAnswers, totalQuestions }) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-green-600 overflow-hidden">

      {/* Result Card */}
      <div className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
        <h2 className="mb-6 text-4xl font-bold text-center text-gray-800">
          Quiz Results
        </h2>
        <div className="flex flex-col items-center mb-8">
          <div className="text-center">
            <p className="text-6xl font-bold text-gray-800 mb-2">
              {correctAnswers} / {totalQuestions}
            </p>
            <p className="text-lg font-semibold text-gray-600">
              Correct Answers
            </p>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-bold text-gray-800 mb-2">
              {percentage}%
            </p>
            <p className="text-lg font-semibold text-gray-600">Your Score</p>
          </div>
        </div>
        <div className="flex flex-col items-center mb-8">
          <p className="text-lg font-semibold text-gray-600">
            Wrong Answers: {totalQuestions - correctAnswers}
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
