import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import styled from 'styled-components';

const API = 'http://localhost:3001';

// Container centralizado com fundo roxo
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ded4fcff, #9462ffff);
  font-family: 'Poppins', sans-serif;
`;

// Card branco com sombra
const Card = styled.div`
  background: #fff;
  padding: 60px;
  border-radius: 32px;
  width: 400px;
  box-shadow: 0 20px 35px rgba(0,0,0,0.2);
  border: 8px solid #ffe6c0ff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 25px;
  color: black;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 25px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border-radius: 12px 0 0 12px;
  border: 1px solid #ddd;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 18px;
  border: none;
  border-radius: 0 12px 12px 0;
  background: #21ad28ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #218026ff;
  }
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchTasks(); }, []);

  async function fetchTasks() {
    setLoading(true);
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();
    setTasks(sortTasks(data));
    setLoading(false);
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const newTask = await res.json();
    setTasks(prev => sortTasks([newTask, ...prev]));
    setTitle('');
  }

  async function toggleDone(task) {
    const res = await fetch(`${API}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: task.completed ? 0 : 1 })
    });
    const updated = await res.json();
    setTasks(prev => sortTasks(prev.map(t => (t.id === updated.id ? updated : t))));
  }

  async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  // Função para ordenar tarefas: pendentes primeiro, concluídas depois
  function sortTasks(taskArray) {
    const pending = taskArray.filter(t => !t.completed);
    const completed = taskArray.filter(t => t.completed);
    return [...pending, ...completed];
  }

  return (
    <Page>
      <Card>
        <Title>Lista de Tarefas</Title>
        <Form onSubmit={addTask}>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Nova tarefa"
          />
          <Button type="submit">Adicionar</Button>
        </Form>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#7b5fcf' }}>Carregando...</p>
        ) : (
          <TaskList tasks={tasks} toggleDone={toggleDone} deleteTask={deleteTask} />
        )}
      </Card>
    </Page>
  );
}

export default App;
