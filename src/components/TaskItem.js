import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';

const Item = styled(motion.li)`
  padding: 12px 16px;
  margin-bottom: 12px;
  background: #ffe6c0ff;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  margin-left: 12px;
  font-size: 15px;
  font-weight: 500;
  color: ${props => (props.completed ? '#aaa' : 'black')};
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff6b81;
  font-size: 20px;
  &:hover {
    color: #e0556f;
  }
`;

export default function TaskItem({ task, toggleDone, deleteTask }) {
  return (
    <Item
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <Left>
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => toggleDone(task)}
        />
        <Title completed={task.completed}>{task.title}</Title>
      </Left>
      <RemoveButton onClick={() => deleteTask(task.id)}>
        <FiTrash2 />
      </RemoveButton>
    </Item>
  );
}
