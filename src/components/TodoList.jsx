import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, toggleTask, deleteTask, filterType }) => {
  if (tasks.length === 0) {
    let emptyEmoji = '🎉';
    let emptyMessage = 'All caught up!';
    
    if (filterType === 'active') {
      emptyEmoji = '☕';
      emptyMessage = 'No active tasks. Take a break!';
    } else if (filterType === 'completed') {
      emptyEmoji = '🚀';
      emptyMessage = "You haven't completed any tasks yet.";
    }

    return (
      <div className="empty-state">
        <div className="empty-emoji">{emptyEmoji}</div>
        <span>{emptyMessage}</span>
      </div>
    );
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
