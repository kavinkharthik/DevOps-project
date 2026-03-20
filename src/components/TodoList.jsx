import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, toggleTask, deleteTask }) => {
  if (tasks.length === 0) {
    return <div className="empty-state">All caught up! ✨</div>;
  }

  return (
    <div className="todo-list">
      {tasks.map(task => (
        <TodoItem 
          key={task.id} 
          task={task} 
          toggleTask={toggleTask} 
          deleteTask={deleteTask} 
        />
      ))}
    </div>
  );
};

export default TodoList;
