import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import api from '../api';
import ProjectFooter from '../components/ProjectFooter';
import '../styles/LoginPage.css';

const LoginPage = ({ darkMode, toggleDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Attempting to login with:', { email, password });

    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container>
        <Card className="login-card">
          <Card.Body>
            <Card.Title className="text-center mb-4">Login</Card.Title>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Button variant="outline-secondary" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
            <div className="text-center mt-3">
              <p>
                Don't have an account?{' '}
                <Button variant="link" onClick={() => navigate('/register')}>
                  Register here
                </Button>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <ProjectFooter />
    </div>
  );
};

export default LoginPage;