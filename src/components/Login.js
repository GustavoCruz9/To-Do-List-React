// components/Login.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ded4fcff, #9462ffff);
  font-family: 'Poppins', sans-serif;
`;

const Card = styled.div`
  background: #fff;
  padding: 50px 40px;
  border-radius: 32px;
  width: 400px;
  box-shadow: 0 20px 35px rgba(0,0,0,0.2);
  border: 6px solid #ffe6c0ff;
  text-align: center;
`;

const Title = styled.h2`
  color: #4b0082;
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px 15px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 16px;
  &:focus { outline: none; border-color: #9462ff; }
`;

const Button = styled.button`
  padding: 12px 0;
  background: #21ad28ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  &:hover { background: #218026ff; }
`;

const SwitchText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  button {
    background: none;
    border: none;
    color: #9462ff;
    cursor: pointer;
    font-weight: bold;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

export default function Login({ onLogin, switchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      onLogin(data.username);
    } else {
      setError(data.error);
    }
  }

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" required />
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
          <Button type="submit">Entrar</Button>
        </Form>
        {error && <ErrorText>{error}</ErrorText>}
        <SwitchText>
          Não tem conta? <button onClick={switchToRegister}>Registrar</button>
        </SwitchText>
      </Card>
    </Container>
  );
}
