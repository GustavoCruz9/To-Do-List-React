// components/Register.js
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

const InfoText = styled.p`
  font-size: 14px;
  color: ${props => props.color || 'red'};
`;

export default function Register({ switchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('Conta criada! Faça login.');
      setError('');
    } else {
      setError(data.error);
      setSuccess('');
    }
  }

  return (
    <Container>
      <Card>
        <Title>Registrar</Title>
        <Form onSubmit={handleRegister}>
          <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" required />
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
          <Button type="submit">Registrar</Button>
        </Form>
        {error && <InfoText color="red">{error}</InfoText>}
        {success && <InfoText color="green">{success}</InfoText>}
        <SwitchText>
          Já tem conta? <button onClick={switchToLogin}>Login</button>
        </SwitchText>
      </Card>
    </Container>
  );
}
