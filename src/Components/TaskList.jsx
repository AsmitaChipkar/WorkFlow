import React, { useState } from 'react'

export default function TaskList({ tasks, updateTask, deleteTask }) {

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDate, setEditDate] = useState("");

  const toggleComplete = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updatedTask, index);
  }

  // Extra
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#888" }}>
        No tasks yet… time to conquer the day 💪
      </p>
    );
  }

  return (
    <ul className='task-list'>
      {tasks.map((task, index) => (
        <li key={index} className={task.completed ? "Completed" : ""}>

          {/* LEFT SIDE */}
          <div className="task-left">

            {editIndex === index ? (
              <div className="edit-container">

                {/* Row 1 → Task name */}
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Edit task..."
                  autoFocus
                  className="edit-input"
                />

                {/* Row 2 → Other fields */}
                <div className="edit-row">
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>

                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option value="general">General</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                  </select>

                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                </div>

              </div>
            ) : (
              <>
                <span>{task.text}</span>

                <small className={`priority ${task.priority}`}>
                  ({task.priority}, {task.category})
                  {task.dueDate && <div>Due: {task.dueDate}</div>}
                </small>
              </>
            )}

          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div>

            {editIndex !== index && (
              <button onClick={() => toggleComplete(index)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
            )}

            {/* Hide Edit while editing */}
            {editIndex !== index && (
              <button onClick={() => {
                setEditIndex(index);
                setEditText(task.text);
                setEditPriority(task.priority);
                setEditCategory(task.category);
                setEditDate(task.dueDate || "");
              }}>
                Edit
              </button>
            )}

            {/* Edit mode buttons */}
            {editIndex === index && (
              <>
                <button onClick={() => {
                  if (!editText.trim()) return;

                  updateTask({
                    ...task,
                    text: editText,
                    priority: editPriority,
                    category: editCategory,
                    dueDate: editDate
                  }, index);

                  setEditIndex(null);
                }}>
                  Save
                </button>

                <button onClick={() => setEditIndex(null)}>
                  Cancel
                </button>
              </>
            )}

            {editIndex !== index && (
              <button onClick={() => deleteTask(index)}>
                Delete
              </button>
            )}

          </div>

        </li>
      ))}
    </ul>
  )
}