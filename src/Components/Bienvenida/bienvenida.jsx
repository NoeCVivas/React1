import React from "react";
import './bienvenida.css';

function Bienvenida() {
    return (
        <div className="contenedor-general">
                <header className="topbar">
                    <div className="logo">&lt;/&gt; ConPila</div>
                </header>

                <main className="container">
                    <section className="hero">
                    <h1>Bienvenido a <span className="gradient">ConPila</span></h1>
                    <p>Al administrador de tu sistema.</p>
                    </section>

                    <section className="card-login">
                    <h2>Ingresá a tu cuenta</h2>
                    <p>Accedé con tu cuenta ADMIN.</p>

                    <div className="buttons">
                        <a className="btn btn-primary" href="/login">Iniciar sesión</a>
                    </div>
                    </section>
                </main>
        </div>
    )
}

export default Bienvenida;