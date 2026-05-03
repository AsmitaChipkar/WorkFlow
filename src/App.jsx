import React, { useEffect, useState } from 'react'
import Taskform from './Components/Taskform'
import TaskList from './Components/TaskList'
import ProgressTracker from './Components/ProgressTracker'

export default function App() {

  const [tasks, setTasks] = useState([]);
  const [sortType, setSortType] = useState("none");

  // 🔹 Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  // 🔹 Add task (with ID for sorting)
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now() // important for sorting
    };
    setTasks([...tasks, newTask]);
  }

  // 🔹 Update task
  const updateTask = (updatedTask, index) => {
    const newtask = [...tasks];
    newtask[index] = updatedTask;
    setTasks(newtask);
  }

  // 🔹 Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  // 🔹 Clear all
  const clearTasks = () => {
    setTasks([]);
  }

  // 🔹 Sorting logic
  const sortedTasks = [...tasks];

  if (sortType === "priority") {
    const order = { high: 1, medium: 2, low: 3 };
    sortedTasks.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  if (sortType === "latest") {
    sortedTasks.sort((a, b) => b.id - a.id);
  }

  return (
    <div className="app-container">
      <h1>WorkFlow</h1>
      <p><i>Your tasks, under control...(finally)</i></p>

      <Taskform addTask={addTask} />

      {/* 🔹 Sort buttons (only if tasks exist) */}
      {tasks.length > 1 && (
        <div className="sort-buttons">
          <button onClick={() => setSortType("latest")}>
            Sort by Latest
          </button>

          <button onClick={() => setSortType("priority")}>
            Sort by Priority
          </button>
        </div>
      )}

      <TaskList
        tasks={sortedTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      <ProgressTracker tasks={tasks} />

      {/* Extra */}
      {tasks.length > 0 && tasks.every(t => t.completed) && (
        <h3 style={{ textAlign: "center", color: "#4caf50" }}>
          🎉 All tasks completed!
        </h3>
      )}

      {tasks.length > 0 && (
        <button onClick={clearTasks} className='clear-btn'>
          Clear All
        </button>
      )}
    </div>
  )
}