import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Calculator({ auth }) {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (/[\d.+\-*/=]|Backspace|Delete|Enter/.test(key)) {
                event.preventDefault();
                if (key === 'Delete' || key === 'Backspace') {
                    setInput(input.slice(0, -1));
                } else if (key === '=' || key === 'Enter') {
                    calculateResult();
                } else {
                    setInput(input + key);
                }
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [input]);
    

    const handleButtonClick = (value) => {
        setInput(input + value);
    };

    const calculateResult = () => {
        try {
            setResult(eval(input));
        } catch (error) {
            setResult('Error');
        }
    };

    const clearInput = () => {
        setInput('');
        setResult('');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Calculator</h2>}
        >
            <Head title="Calculator" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="max-w-md mx-auto p-4 bg-gray-300 rounded-md mb-10 mt-10 shadow-md">
                            <h1 className="text-2xl font-bold mb-4">Calculator</h1>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={input}
                                    readOnly
                                />
                                <button
                                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                                    onClick={clearInput}
                                >
                                    C
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {[...Array(10).keys()].map((num) => (
                                    <button
                                        key={num}
                                        className="px-3 py-2 border rounded-md hover:bg-gray-200"
                                        onClick={() => handleButtonClick(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button
                                    className="px-3 py-2 border rounded-md hover:bg-gray-200"
                                    onClick={() => handleButtonClick('.')}
                                >
                                    .
                                </button>
                                <button
                                    className="px-3 py-2 border rounded-md hover:bg-gray-200"
                                    onClick={calculateResult}
                                >
                                    =
                                </button>
                                <button
                                    className="px-3 py-2 border rounded-md hover:bg-gray-200"
                                    onClick={() => handleButtonClick('+')}
                                >
                                    +
                                </button>
                                <button
                                    className="px-3 py-2 border rounded-md hover:bg-gray-200"
                                    onClick={() => handleButtonClick('-')}
                                >
                                    -
                                </button>
                                <button
                                    className="px-3 py-2 border rounded-md hover:bg-gray-200"
                                    onClick={() => handleButtonClick('*')}
                                >
                                    *
                                </button>
                                <button
                                    className="px-3 py-2 border rounded-md hover:bg-gray-200"
                                    onClick={() => handleButtonClick('/')}
                                >
                                    /
                                </button>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold">Result: {result}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}