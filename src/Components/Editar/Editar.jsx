import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";
import "./Editar.css";
import { showSuccessAlert, showErrorAlert } from "../Alert/Alert";
import { useSearchParams } from "react-router-dom";



function Editar() {
    const [searchParams] = useSearchParams();
    const [userId, setUserId] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        const idFromUrl = searchParams.get("userId");
        if (idFromUrl) {
            setUserId(idFromUrl);
        }
    }, [searchParams]);

    const body = {
        id: parseInt(userId),
        role: role
    };

    const handleEditRole = async () => {
    if (!userId || !role) {
        showErrorAlert("Debes completar ambos campos para actualizar el rol.", 'warning');
        return;
    }

    try {
        let response = await fetch(`http://localhost:5052/User/updateUserRole`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            showSuccessAlert("El rol del usuario fue actualizado correctamente.");
        } else {
            showErrorAlert("Error al actualizar el rol. Verifica los datos e intenta de nuevo.");
        }

    } catch (error) {
        showErrorAlert("Error de conexión. No se pudo completar la solicitud.");
    }
};

    return (
        <div>
            <NavBar />

            <div className="edit-container">
                <div className="edit-card">
                    <h2 className="edit-title">Editar Rol del Usuario</h2>

                    <label>ID del Usuario:</label>
                    <input
                        className="edit-input"
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <label>Rol:</label>
                    <input
                        className="edit-input"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />

                    <button className="edit-btn" onClick={handleEditRole}>
                        Actualizar Rol
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Editar;