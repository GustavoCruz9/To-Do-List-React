// components/TaskItem.js
import React from 'react';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

export default function TaskItem({ task, toggleDone, deleteTask }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 15px',
        marginBottom: 10,
        borderRadius: 12,
        background: '#f9f6ff',
        alignItems: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="checkbox" checked={!!task.completed} onChange={() => toggleDone(task)} />
        <span style={{
          marginLeft: 10,
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#aaa' : '#4b0082',
        }}>
          {task.title}
        </span>
      </div>
      <button onClick={() => deleteTask(task.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ff6b81', fontSize: 20 }}>
        <FiTrash2 />
      </button>
    </motion.li>
  );
}
