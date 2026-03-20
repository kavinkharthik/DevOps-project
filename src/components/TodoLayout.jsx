import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './TodoLayout.css';

const TodoLayout = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design the sleek UI', completed: true },
    { id: 2, text: 'Implement glassmorphism', completed: false },
    { id: 3, text: 'Add smooth animations', completed: false },
  ]);

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

  return (
    <div className="todo-layout">
      <header className="todo-header">
        <h1 className="title">Tasks</h1>
        <p className="subtitle">You have {tasks.filter(t => !t.completed).length} pending tasks</p>
      </header>
      <TodoForm addTask={addTask} />
      <TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
};

export default TodoLayout;
