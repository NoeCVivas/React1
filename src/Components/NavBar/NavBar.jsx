import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { showLogoutConfirmAlert } from '../Alert/Alert';

function NavBar() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isAuthenticated = !!user;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3 border-bottom border-secondary">
      <Container fluid>
        
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-white fw-bold">
          <img 
            src="/iconoconpila.ico" 
            alt="ConPila Logo" 
            style={{ height: '35px', width: 'auto', objectFit: 'contain' }} 
          />
          <span>ConPila</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* ENLACES DE NAVEGACIÓN: Agregamos fw-bold para negrita y text-white para que se lean */}
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/users" className="text-white fw-bold">User</Nav.Link>
                <Nav.Link as={Link} to="/admin" className="text-white fw-bold">Admin</Nav.Link>
              </>
            )}
          </Nav>

          {/* SECCIÓN DERECHA */}
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-light">
                  Bienvenido, <strong className="text-white">{user?.userName}</strong>
                </span>
                <Button variant="danger" onClick={() => showLogoutConfirmAlert(handleLogout)}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-white fw-bold">Login</Nav.Link>
            )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;