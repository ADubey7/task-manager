import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../api';
import '../styles/LoginPage.css'; // Reuse the same styles as LoginPage

const RegisterPage = ({ darkMode, toggleDarkMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await api.post('/auth/register', { name, email, password });
      console.log('Registration response:', response.data);
      setSuccess('Registration successful! Redirecting to login...');
      setError('');

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className={`login-page ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container>
        <Card className="login-card">
          <Card.Body>
            <Card.Title className="text-center mb-4">Register</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
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
                Register
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Button variant="outline-secondary" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
            <div className="text-center mt-3">
              <p>
                Already have an account?{' '}
                <Button variant="link" onClick={() => navigate('/login')}>
                  Login here
                </Button>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterPage;