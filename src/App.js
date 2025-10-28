import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import styled from 'styled-components';
import { LogOut } from 'lucide-react'; // ícone de logout

const API = 'http://localhost:3001';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ded4fcff, #9462ffff);
  font-family: 'Poppins', sans-serif;
`;

const Card = styled.div`
  position: relative;
  background: #fff;
  padding: 40px;
  border-radius: 32px;
  width: 400px;
  box-shadow: 0 20px 35px rgba(0,0,0,0.2);
  border: 8px solid #ffe6c0ff;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: #ff5959;
  border: none;
  border-radius: 100%;
  padding: 10px;
  cursor: pointer;
  transition: 0.5s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  
  &:hover {
    background: #d83c3c;
    transform: scale(1.1);
  }

  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  margin-bottom: 25px;
  color: #4b0082;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border-radius: 12px 0 0 12px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 18px;
  border: none;
  border-radius: 0 12px 12px 0;
  background: #21ad28ff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover { background: #218026ff; }
`;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('token') ? 'Logado' : null);
  const [showRegister, setShowRegister] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  async function fetchTasks() {
    setLoading(true);
    const res = await fetch(`${API}/tasks`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title })
    });
    const newTask = await res.json();
    setTasks(prev => [newTask, ...prev]);
    setTitle('');
  }

  async function toggleDone(task) {
    const res = await fetch(`${API}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ completed: task.completed ? 0 : 1 })
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  }

  async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    setTasks([]);
  }

  if (!user) {
    return showRegister
      ? <Register switchToLogin={() => setShowRegister(false)} />
      : <Login onLogin={setUser} switchToRegister={() => setShowRegister(true)} />;
  }

  return (
    <Page>
      <Card>
        <LogoutButton onClick={handleLogout}>
          <LogOut />
        </LogoutButton>
        <Title>Lista de {user}</Title>
        <Form onSubmit={addTask}>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nova tarefa" />
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
