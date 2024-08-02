import React from 'react';

const Question = ({ question, options, onAnswer }) => {
    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">{question}</h2>
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onAnswer(option)}
                    className="block w-full p-2 mb-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Question;
