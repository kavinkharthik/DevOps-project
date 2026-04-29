import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ addTask }) => {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTask(value.trim(), priority, dueDate, category);
    setValue('');
    setPriority('low');
    setDueDate('');
    setCategory('Personal');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="form-controls">
          <select 
            className="todo-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <select 
            className="todo-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
          <input 
            type="date" 
            className="todo-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="todo-submit">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </form>
  );
};

export default TodoForm;
