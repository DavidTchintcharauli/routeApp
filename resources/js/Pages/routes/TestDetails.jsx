import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestDetail({ testId, closeDetail }) {
    const [testDetails, setTestDetails] = useState(null);

    useEffect(() => {
        if (testId) {
            fetchTestDetails();
        }
    }, [testId]);

    const fetchTestDetails = async () => {
        try {
            const response = await axios.get(`/tests/${testId}`);
            setTestDetails(response.data);
        } catch (error) {
            console.error("Error fetching test details", error);
        }
    };

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
            <ul className="space-y-4">
                {testDetails.questions.map(question => (
                    <li key={question.id} className="border-b pb-4">
                        <strong className="block text-lg">{question.question}</strong>
                        <ul className="mt-2 space-y-2">
                            {question.answers.map(answer => (
                                <li 
                                    key={answer.id} 
                                    className={`px-3 py-2 rounded ${answer.is_correct ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                                >
                                    {answer.answer}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
