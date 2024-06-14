import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function TicTacToe({ auth }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index) => {
        const newBoard = [...board];
        if (calculateWinner(board) || board[index]) {
            return;
        }
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const renderSquare = (index) => {
        return (
            <button
                className="w-24 h-24 bg-gray-200 border border-gray-300 flex items-center justify-center text-4xl font-bold text-blue-600 hover:bg-gray-300 transition duration-200"
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </button>
        );
    };

    const winner = calculateWinner(board);
    const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tic Tac Toe</h2>}
        >
            <Head title="Tic Tac Toe" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm m-auto text-indigo-500 font-semibold mb-4">{status}</div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {renderSquare(0)}
                                        {renderSquare(1)}
                                        {renderSquare(2)}
                                        {renderSquare(3)}
                                        {renderSquare(4)}
                                        {renderSquare(5)}
                                        {renderSquare(6)}
                                        {renderSquare(7)}
                                        {renderSquare(8)}
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            className="w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                                            onClick={() => { setBoard(Array(9).fill(null)); setIsXNext(true); }}
                                        >
                                            Reset Game
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}