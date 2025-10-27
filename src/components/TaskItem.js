import React from 'react';
import styled from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';

const Item = styled.li`
  padding: 12px 16px;
  margin-bottom: 16px;
  background: #ffe6c0ff;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.8s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  margin-left: 12px;
  font-size: 16px;
  color: ${props => (props.completed ? '#aaa' : 'black')};
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff6b81;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  &:hover {
    color: #e0556f;
  }
`;

export default function TaskItem({ task, toggleDone, deleteTask }) {
  return (
    <Item>
      <Left>
        <input type="checkbox" checked={!!task.completed} onChange={() => toggleDone(task)} />
        <Title completed={task.completed}>{task.title}</Title>
      </Left>
      <RemoveButton onClick={() => deleteTask(task.id)}>
        <FiTrash2 />
      </RemoveButton>
    </Item>
  );
}
