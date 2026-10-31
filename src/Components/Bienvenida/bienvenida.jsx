import React from "react";
import { Link } from 'react-router-dom'; // Importamos Link por si quieres volver al inicio al hacer clic
import './bienvenida.css';

function Bienvenida() {
    return (
        <div className="contenedor-general">
                <header className="topbar">
                    {/* Contenedor del logo con la imagen y el texto */}
                    <Link to="/" className="logo d-flex align-items-center text-decoration-none gap-2" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                        <img 
                            src="/iconoconpila.ico" 
                            alt="ConPila Logo" 
                            style={{ height: '35px', width: 'auto', objectFit: 'contain' }} 
                        />
                        <span>ConPila</span>
                    </Link>
                </header>

                <main className="container">
                    <section className="hero">
                    <h1>Bienvenido a <span className="gradient">ConPila</span></h1>
                    <p>Al administrador de tu sistema.</p>
                    </section>

                    <section className="card-login">
                    <h2>Ingresá a tu cuenta</h2>
                
                    <div className="buttons">
                        {/* Recomiendo cambiar el <a> por <Link> para que no recargue la página */}
                        <Link className="btn btn-primary" to="/login">Iniciar sesión</Link>
                    </div>
                    </section>
                </main>
        </div>
    )
}

export default Bienvenida;