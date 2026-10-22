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

  const handleLogout = async () => {
    if (!user || !user.id) {
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
    try { 
      let response = await fetch(`http://localhost:5052/Session/${user.id}`, {
        method: 'POST'
      });

    } catch (error) {
      alert(`Error al intentar cerrar sesión: ${error}`);
    } finally {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <Navbar expand="lg" className="topbar">
      <div className="logo">&lt;/&gt; ConPila</div>

      <Navbar.Toggle aria-controls="nav" />
      <Navbar.Collapse id="nav">
        
        <div className="nav-links me-auto">
          {isAuthenticated && (
            <>
              <Link className= "title" to="/users">User</Link>
              <Link className= "title" to="/admin">Admin</Link>
            </>
          )}
        </div>

        <div className="right-section ms-auto">
          {isAuthenticated ? (
              <>
                <span>Bienvenido, {user?.userName}</span>
                <button 
                    className="logout-btn" 
                    onClick={() => showLogoutConfirmAlert(handleLogout)}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
        </div>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;