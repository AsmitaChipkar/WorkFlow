import React, { useState } from 'react'

export default function Taskform({ addTask }) {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('General');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // addTask({ text: task, priority, category, completed: false });

        if (!task.trim()) {
            alert("Task cannot be empty!");
            return;
        }
        addTask({
            text: task,
            priority,
            category,
            dueDate,
            completed: false
        });
        // Reset
        setTask('');
        setPriority('medium');
        setCategory('General');
        setDueDate('');
    }

    return (
        <form action="" className='task-form' onSubmit={handleSubmit}>
            <div>
                <input type='text' placeholder='Enter the task' onChange={(e) => setTask(e.target.value)} value={task} />
                <button type='submit'>Add Task</button>
                {/* <h2>{task} {priority} {category}</h2> */}
            </div>

            <div>
                {/* Task priority */}
                <select onChange={(e) => setPriority(e.target.value)} value={priority}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                {/* typa work */}
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="general">General</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                </select>

                {/* Due Date */}
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
        </form>
    )
}
