import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Pastikan import ini ada

const Quiz = ({ questions, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      onFinish(correctAnswers);
    }

    return () => clearInterval(timer);
  }, [timeLeft, correctAnswers, onFinish]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      // Show toast if no answer is selected
      toast.error("Please select an answer before proceeding.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        className: "toast-error", // Apply custom class
      });
      return;
    }

    if (questions[currentQuestion].correct_answer === selectedAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setSelectedAnswer("");
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onFinish(correctAnswers);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNextQuestion();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleNextQuestion]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="mb-4 text-lg text-gray-800">
            {questions[currentQuestion].question}
          </p>
          <div className="grid grid-cols-1 gap-4">
            {questions[currentQuestion].incorrect_answers
              .concat(questions[currentQuestion].correct_answer)
              .sort()
              .map((answer) => (
                <button
                  key={answer}
                  onClick={() => handleAnswerSelect(answer)}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
                    selectedAnswer === answer
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  } hover:bg-blue-100`}
                >
                  {answer}
                </button>
              ))}
          </div>
        </div>
        <button
          onClick={handleNextQuestion}
          className="w-full px-3 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
        <div className="mt-4 text-right">
          <span>Time Left: {timeLeft} seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
