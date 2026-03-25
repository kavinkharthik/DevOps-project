import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ task, toggleTask, toggleStar, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority || 'low');
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const handleEditSubmit = () => {
    if (editText.trim()) {
      editTask(task.id, editText, editPriority, editDueDate);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSubmit();
  };

  const priorityColors = {
    low: '#10b981', // green
    medium: '#f59e0b', // yellow
    high: '#ef4444' // red
  };

  const priorityColor = priorityColors[task.priority] || priorityColors.low;

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className="checkmark" style={{ borderColor: task.completed ? '' : priorityColor }}>
          {task.completed && (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </span>
      </label>
      
      <div className="task-content">
        {isEditing ? (
          <div className="edit-mode">
            <input 
              autoFocus
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="edit-controls">
              <select 
                value={editPriority} 
                onChange={(e) => setEditPriority(e.target.value)}
                className="edit-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input 
                type="date" 
                value={editDueDate} 
                onChange={(e) => setEditDueDate(e.target.value)}
                className="edit-date"
              />
              <button className="save-btn" onClick={handleEditSubmit}>Save</button>
            </div>
          </div>
        ) : (
          <div className="task-info" onDoubleClick={() => setIsEditing(true)}>
            <span className="task-text">{task.text}</span>
            <div className="task-meta">
              <span className="priority-badge" style={{ backgroundColor: `${priorityColor}20`, color: priorityColor }}>
                {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Low'}
              </span>
              {task.dueDate && (
                <span className="due-date-badge">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '12px', height: '12px', marginRight: '4px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={`task-actions ${task.starred ? 'has-star' : ''}`}>
        <button 
          className={`action-btn star-btn ${task.starred ? 'starred' : ''}`} 
          onClick={() => toggleStar(task.id)}
          title="Star Task"
        >
          <svg fill={task.starred ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
        </button>
        <button 
          className="action-btn edit-btn" 
          onClick={() => setIsEditing(true)}
          title="Edit Task"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
        <button 
          className="action-btn delete-btn" 
          onClick={() => deleteTask(task.id)}
          title="Delete Task"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
