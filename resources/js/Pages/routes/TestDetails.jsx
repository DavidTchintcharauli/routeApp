import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestDetail({ testId, closeDetail }) {
    const [testDetails, setTestDetails] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (testId) {
            fetchTestDetails();
            const start = Date.now();
            setStartTime(start);
            const id = setInterval(() => {
                if (startTime && !submitted) {
                    setElapsedTime(Math.round((Date.now() - start) / 1000));
                }
            }, 1000);
            setIntervalId(id);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [testId, startTime]);

    const fetchTestDetails = async () => {
        try {
            setEndTime(Date.now());
            clearInterval(intervalId);
            const response = await axios.get(`/tests/${testId}`);
            setTestDetails(response.data);
        } catch (error) {
            console.error("Error fetching test details", error);
        }
    };

    const handleAnswerSelect = (questionId, answerId) => {
        if (!submitted) {
            setSelectedAnswers(prev => ({
                ...prev,
                [questionId]: answerId
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            setEndTime(Date.now());
            const response = await axios.post(`/tests/${testId}/submit`, { selectedAnswers });
            setScore(Math.round(response.data.score));
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting test answers", error);
        }
    };

    const timeTaken = startTime && endTime ? Math.round((endTime - startTime) / 1000) : 0;

    if (!testDetails) {
        return <div className="text-center mt-6 text-lg">Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <button 
                onClick={closeDetail} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
            >
                Back to List
            </button>
            <h2 className="text-2xl font-bold mb-4">{testDetails.test}</h2>
            {!submitted && (
                <div className="text-gray-600 mb-4">
                    <strong>Time Elapsed: {elapsedTime} seconds</strong>
                </div>
            )}
            <ul className="space-y-4">
                {testDetails.questions.map(question => (
                    <li key={question.id} className="border-b pb-4">
                        <strong className="block text-lg">{question.question}</strong>
                        <ul className="mt-2 space-y-2">
                            {question.answers.map(answer => (
                                <li 
                                    key={answer.id}
                                    onClick={() => handleAnswerSelect(question.id, answer.id)}
                                    className={`px-3 py-2 rounded cursor-pointer 
                                        ${selectedAnswers[question.id] === answer.id ? 'bg-blue-200' : 'bg-gray-100'} 
                                        ${submitted && answer.is_correct ? 'bg-green-100 text-green-800' : ''} 
                                        ${submitted && selectedAnswers[question.id] === answer.id && !answer.is_correct ? 'bg-red-100 text-red-800' : ''}`}
                                >
                                    {answer.answer}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            {!submitted && (
                <button 
                    onClick={handleSubmit} 
                    className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600"
                    disabled={submitted}
                >
                    Submit
                </button>
            )}
            {submitted && (
                <div className="mt-4 text-lg">
                    <strong>Score: {score}%</strong>
                    <strong>Time Taken: {timeTaken} seconds</strong>
                </div>
            )}
        </div>
    );
}
