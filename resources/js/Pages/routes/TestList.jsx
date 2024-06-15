import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestDetail from './TestDetails';
import CreateTest from './CreateTest';

export default function TestsList({ auth }) {
    const [tests, setTests] = useState([]);
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        const response = await axios.get('/tests');
        setTests(response.data);
    };

    const handleTestClick = (testId) => {
        setSelectedTestId(testId);
    };

    const handleCloseDetail = () => {
        setSelectedTestId(null);
    };

    const handleDeleteTest = async (testId) => {
        if (confirm("Are you sure you want to delete this test?")) {
            try {
                await axios.delete(`/tests/${testId}`);
                fetchTests();
            } catch (error) {
                console.error("There was an error deleting the test!", error);
            }
        }
    };

    const handleEditTest = (testId) => {
        setSelectedTestId(testId);
        setIsEditing(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Test List</h2>}
        >
            <Head title="Test List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {selectedTestId && isEditing ? (
                                <CreateTest auth={auth} testId={selectedTestId} closeDetail={handleCloseDetail} />
                            ) : selectedTestId ? (
                                <TestDetail testId={selectedTestId} closeDetail={handleCloseDetail} />
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Here is Test List</h2>
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="px-4 py-2 text-left">Test</th>
                                                <th className="px-4 py-2 text-left">Created By</th>
                                                <th className="px-4 py-2 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tests.map((t) => (
                                                <tr 
                                                    key={t.id} 
                                                    className={`border-t ${t.done ? 'line-through' : ''} hover:bg-gray-50`}
                                                >
                                                    <td 
                                                        className="px-4 py-2 cursor-pointer"
                                                        onClick={() => handleTestClick(t.id)}
                                                    >
                                                        {t.test}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {t.user.email}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <button
                                                            onClick={() => handleEditTest(t.id)}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteTest(t.id)}
                                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
