import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!userName.trim() || !password.trim()) {
      setError('Usuario y contraseña son obligatorios');
      setLoading(false);
      return;
    }

    try {
      // --- TRUCO PARA ENTRAR SIN BACKEND ---
      // (Ya no hay fetch, creamos un usuario falso)
      const fakeUser = {
        id: 1,
        userName: userName,
        role: 'admin',
        token: 'token-de-prueba-123'
      };

      localStorage.setItem('user', JSON.stringify(fakeUser));
      localStorage.setItem('token', 'token-de-prueba-123'); 
      
      // Redirigir al dashboard
      navigate('/users'); 

    } catch (err) {
      setError(err.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contenedor-general">
      <header className="topbar">
        <div className="logo">&lt;/&gt; ConPila</div>
      </header>
      <Container fluid className="login-container">
        <div className="login-wrapper">
          <Card className="login-card">
            <Card.Body>
              <h2 className="login-title">Dashboard Admin</h2>
              <p className="login-subtitle">Inicia sesión para continuar</p>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu usuario"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Login;