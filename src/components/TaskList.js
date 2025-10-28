// components/TaskList.js
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, toggleDone, deleteTask }) {
  // Reordenar: concluídas vão para o fim
  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <AnimatePresence>
        {sortedTasks.map(task => (
          <TaskItem key={task.id} task={task} toggleDone={toggleDone} deleteTask={deleteTask} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
