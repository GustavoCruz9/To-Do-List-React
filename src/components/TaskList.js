import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, toggleDone, deleteTask }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <AnimatePresence>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleDone={toggleDone}
            deleteTask={deleteTask}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
