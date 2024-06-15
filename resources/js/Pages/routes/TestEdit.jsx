import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function TestEdit({ test }) {
    const { data, setData, patch, errors } = useForm({
        testName: test.testName || '',
        questions: test.questions || [],
    });

    const handleTestChange = (e) => {
        setData('testName', e.target.value);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...data.questions];
        newQuestions[index].question = value;
        setData('questions', newQuestions);
    };

    const handleAnswerChange = (qIndex, aIndex, value) => {
        const newQuestions = [...data.questions];
        newQuestions[qIndex].answers[aIndex].answer = value;
        setData('questions', newQuestions);
    };

    const handleCorrectChange = (qIndex, aIndex) => {
        const newQuestions = [...data.questions];
        newQuestions[qIndex].answers[aIndex].isCorrect = !newQuestions[qIndex].answers[aIndex].isCorrect;
        setData('questions', newQuestions);
    };

    const addQuestion = () => {
        setData('questions', [...data.questions, { question: '', answers: [{ answer: '', isCorrect: false }] }]);
    };

    const addAnswer = (qIndex) => {
        const newQuestions = [...data.questions];
        newQuestions[qIndex].answers.push({ answer: '', isCorrect: false });
        setData('questions', newQuestions);
    };

    const removeAnswer = (qIndex, aIndex) => {
        const newQuestions = [...data.questions];
        newQuestions[qIndex].answers.splice(aIndex, 1);
        setData('questions', newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('tests.update', test.id));
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div className="max-w-2xl mx-auto">
                            <h1 className="text-2xl font-bold mb-4">Edit Test</h1>
                            {errors.message && <div className="mb-4 text-red-500">{errors.message}</div>}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testName">
                                    Test Name
                                </label>
                                <input
                                    id="testName"
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={data.testName}
                                    onChange={handleTestChange}
                                />
                            </div>
                            {data.questions.map((q, qIndex) => (
                                <div key={qIndex} className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`question-${qIndex}`}>
                                        Question {qIndex + 1}
                                    </label>
                                    <input
                                        id={`question-${qIndex}`}
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={q.question}
                                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                    />
                                    {q.answers.map((a, aIndex) => (
                                        <div key={aIndex} className="flex items-center mt-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border rounded-md"
                                                value={a.answer}
                                                onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                            />
                                            <label className="ml-2">
                                                <input
                                                    type="checkbox"
                                                    checked={a.isCorrect}
                                                    onChange={() => handleCorrectChange(qIndex, aIndex)}
                                                />
                                                Correct
                                            </label>
                                            <button
                                                className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                                                onClick={() => removeAnswer(qIndex, aIndex)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                                        onClick={() => addAnswer(qIndex)}
                                    >
                                        Add Answer
                                    </button>
                                </div>
                            ))}
                            <button
                                className="mt-4 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                                onClick={addQuestion}
                            >
                                Add Question
                            </button>
                            <button
                                className="mt-4 ml-4 px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200"
                                onClick={handleSubmit}
                            >
                                Update Test
                            </button>
                            <NavLink className="ml-4 px-3 py-2 pt-2 bg-gray-500 text-white rounded-md hover:bg-gray-400 transition duration-200"
                                href={route('routes/testList')} active={route().current('routes/testList')}>
                                <button>Go to Test List</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
