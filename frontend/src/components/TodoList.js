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
    // setErrorMessage('');
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
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
    setEditedTask(tasks[index]);
    setEditIndex(index);
  };

  const handleSaveTask = () => {
    if (editedTask.trim() !== '') {
      const updatedTasks = tasks.map((t, i) => (i === editIndex ? editedTask : t));
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
    // Implement your logout logic here.
    // For example, clear local storage, remove tokens, etc.
    // Then redirect to the login page using React Router's navigate function:
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task}</td>
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
