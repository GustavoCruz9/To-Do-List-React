import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, toggleDone, deleteTask }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleDone={toggleDone}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}
