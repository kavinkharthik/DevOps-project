import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './TodoLayout.css';

const TodoLayout = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todo_tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      { id: 1, text: 'Design the sleek UI', completed: true },
      { id: 2, text: 'Implement glassmorphism', completed: false },
      { id: 3, text: 'Add smooth animations', completed: false }
    ];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="todo-layout">
      <header className="todo-header">
        <h1 className="title">Tasks</h1>
        <p className="subtitle">You have {pendingCount} pending task{pendingCount !== 1 ? 's' : ''}</p>
      </header>

      <TodoForm addTask={addTask} />

      <div className="filter-controls">
        <div className="tab-group">
          <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`tab-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`tab-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        {tasks.some(t => t.completed) && (
          <button className="clear-btn" onClick={clearCompleted}>Clear Completed</button>
        )}
      </div>

      <TodoList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} filterType={filter} />
    </div>
  );
};

export default TodoLayout;
