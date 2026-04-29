import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, toggleTask, toggleStar, editTask, deleteTask, filterType }) => {
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
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="empty-state"
      >
        <div className="empty-emoji">{emptyEmoji}</div>
        <span>{emptyMessage}</span>
      </motion.div>
    );
  }

  return (
    <div className="todo-list">
      <AnimatePresence mode="popLayout">
        {tasks.map(task => (
          <motion.div 
            key={task.id}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem
              task={task}
              toggleTask={toggleTask}
              toggleStar={toggleStar}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
