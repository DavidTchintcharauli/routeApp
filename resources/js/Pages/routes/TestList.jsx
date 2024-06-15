import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestDetail from './TestDetails';

export default function TestsList({ auth }) {
    const [tests, setTests] = useState([]);
    const [selectedTestId, setSelectedTestId] = useState(null);

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
                            {selectedTestId ? (
                                <TestDetail testId={selectedTestId} closeDetail={handleCloseDetail} />
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Here is Test List</h2>
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="px-4 py-2 text-left">Test</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tests.map((t) => (
                                                <tr 
                                                    key={t.id} 
                                                    className={`border-t ${t.done ? 'line-through' : ''} hover:bg-gray-50 cursor-pointer`} 
                                                    onClick={() => handleTestClick(t.id)}
                                                >
                                                    <td className="px-4 py-2">{t.test}</td>
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
