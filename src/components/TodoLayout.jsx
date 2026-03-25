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
      { id: 1, text: 'Design the sleek UI', completed: true, priority: 'high', dueDate: '2026-03-30' },
      { id: 2, text: 'Implement glassmorphism', completed: false, priority: 'medium', dueDate: '' },
      { id: 3, text: 'Add smooth animations', completed: false, priority: 'low', dueDate: '' }
    ];
  });

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority = 'low', dueDate = '') => {
    const newTask = { id: Date.now(), text, completed: false, priority, dueDate };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const toggleStar = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, starred: !t.starred } : t));
  };

  const editTask = (id, newText, newPriority, newDueDate) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText, priority: newPriority, dueDate: newDueDate } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  // 1. Search filter
  const searchedTasks = tasks.filter(task => 
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Status filter
  const filteredTasks = searchedTasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // 3. Sort
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const p = { high: 3, medium: 2, low: 1 };
      return (p[b.priority || 'low'] || 0) - (p[a.priority || 'low'] || 0);
    }
    if (sortBy === 'date-asc') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'name') {
      return a.text.localeCompare(b.text);
    }
    return 0; // default order (creation order)
  });

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="todo-layout">
      <header className="todo-header">
        <h1 className="title">Tasks</h1>
        <p className="subtitle">You have {pendingCount} pending task{pendingCount !== 1 ? 's' : ''}</p>
      </header>
      
      <div className="toolbar">
        <div className="search-bar">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort by Default</option>
          <option value="priority">Sort by Priority</option>
          <option value="date-asc">Sort by Due Date</option>
          <option value="name">Sort Alphabetically</option>
        </select>
      </div>

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

      <TodoList tasks={sortedTasks} toggleTask={toggleTask} toggleStar={toggleStar} editTask={editTask} deleteTask={deleteTask} filterType={filter} />
    </div>
  );
};

export default TodoLayout;
