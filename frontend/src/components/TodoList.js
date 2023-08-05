import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ToDo.css';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setTask(e.target.value);
    setErrorMessage('');
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const newTask = {
        text: task,
        date: new Date().toISOString(), // Store the current date in ISO format
      };
      setTasks([...tasks, newTask]);
      setTask('');
    } else {
      alert('Task field cannot be empty.');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditMode(true);
    setEditedTask(tasks[index].text);
    setEditIndex(index);
  };

  const handleSaveTask = () => {
    if (editedTask.trim() !== '') {
      const updatedTasks = tasks.map((t, i) => (i === editIndex ? { ...t, text: editedTask } : t));
      setTasks(updatedTasks);
      setEditMode(false);
      setEditedTask('');
      setEditIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedTask('');
    setEditIndex(null);
  };

  const handleLogout = () => {
    
    navigate('/login');
  };

  return (
    <div>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <h2>To-Do List</h2>
      <div>
        {editMode ? (
          <>
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <button onClick={handleSaveTask}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={task}
              onChange={handleInputChange}
              placeholder="Enter a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        )}
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.text}</td>
              <td>{new Date(task.date).toLocaleString()}</td> {/* Display date in readable format */}
              <td>
                <button className="edit-button" onClick={() => handleEditTask(index)}>
                  Edit
                </button>
                <button className="remove-button" onClick={() => handleRemoveTask(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
