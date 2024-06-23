import React, { useState, useEffect } from 'react';
import './Task.css';
import axios from 'axios';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [incompleteTasks, setIncompleteTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
        fetchIncompleteTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8081/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchIncompleteTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8081/tasks/incomplete');
            setIncompleteTasks(response.data);
        } catch (error) {
            console.error('Error fetching incomplete tasks:', error);
        }
    };

    const handleAddTask = async () => {
        if (newTask.trim()) {
            try {
                const response = await axios.post('http://localhost:8081/add-task', { task: newTask });
                setTasks([...tasks, response.data]);
                setNewTask('');
                fetchIncompleteTasks();
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const updateTaskStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:8081/update-task/${id}`, { status });
            fetchTasks();
            fetchIncompleteTasks();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div className="app">
            <h1>Task Manager</h1>
            <input
                type="text"
                placeholder="Enter a task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>

            <h2>All Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.task}</td>
                            <td>{task.status}</td>
                            <td>
                                <button onClick={() => updateTaskStatus(task._id, 'completed')}>✔️</button>
                                <button onClick={() => updateTaskStatus(task._id, 'incomplete')}>❌</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Incomplete Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {incompleteTasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.task}</td>
                            <td>{task.status}</td>
                            <td>
                                <button onClick={() => updateTaskStatus(task._id, 'completed')}>✔️</button>
                                <button onClick={() => updateTaskStatus(task._id, 'incomplete')}>❌</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
