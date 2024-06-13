import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { useState } from 'react';

export default function Todo({ auth }) {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [editing, setEditing] = useState(null);
    const [taskEdit, setTaskEdit] = useState('');

    const addTask = () => {
        if (task) {
            setTasks([...tasks, { id: Date.now(), task, creator: 'currentUser', done: false }]);
            setTask('');
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const editTask = (id) => {
        setEditing(id);
        setTaskEdit(tasks.find(t => t.id === id).task);
    };

    const updateTask = (id) => {
        setTasks(tasks.map(t => (t.id === id ? { ...t, task: taskEdit } : t)));
        setEditing(null);
        setTaskEdit('');
    };

    const markDone = (id) => {
        setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Todo</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">here is Toto</div>
                        <div className="max-w-prose mx-auto p-4 bg-gray-100 rounded-md mb-10 shadow-md">
                            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-md"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    placeholder="Add a new task"
                                />
                                <button className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md" onClick={addTask}>
                                    Add Task
                                </button>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Creator</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((t) => (
                                        <tr key={t.id} className={t.done ? 'line-through' : ''}>
                                            <td>{editing === t.id ? (
                                                <input
                                                    type="text"
                                                    value={taskEdit}
                                                    onChange={(e) => setTaskEdit(e.target.value)}
                                                    className="px-3 py-2 border rounded-md"
                                                />
                                            ) : (
                                                t.task
                                            )}</td>
                                            <td>{t.creator}</td>
                                            <td>
                                                {editing === t.id ? (
                                                    <button className="px-3 py-2 bg-green-500 text-white rounded-md" onClick={() => updateTask(t.id)}>Update</button>
                                                ) : (
                                                    <>
                                                        <button className="px-3 py-2 bg-yellow-500 text-white rounded-md" onClick={() => editTask(t.id)}>Edit</button>
                                                        <button className="px-3 py-2 bg-red-500 text-white rounded-md" onClick={() => deleteTask(t.id)}>Delete</button>
                                                        <button className="px-3 py-2 bg-gray-500 text-white rounded-md" onClick={() => markDone(t.id)}>{t.done ? 'Undo' : 'Done'}</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
