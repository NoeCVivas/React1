import React, { useEffect, useState } from "react";
import Button from '../Button/Button';
import Table from '../Table/Table';
import Paginador from "../Paginador/Paginador";
import Layout from '../Layout/Layout';
import './Admin.css';
import { showDeleteConfirmAlert, showSuccessAlert, showErrorAlert } from '../Alert/Alert';
import { api } from "../../Services/Api"; 

function Admin() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const find = (evt) => {
        const { value } = evt.target;
        setQuery(value);
        setPageNumber(1);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await api.getUsers(pageNumber, 5);
            
            let listaUsuarios = data.payload?.users || [];
            
            if (query) {
                const q = query.toLowerCase();
                listaUsuarios = listaUsuarios.filter(user => 
                    (user.username && user.username.toLowerCase().includes(q)) ||
                    (user.email && user.email.toLowerCase().includes(q))
                );
            }

            setUsers(listaUsuarios);
            setTotalPages(data.payload.totalPages || 1); 
        } catch (err) {
            showErrorAlert(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Función para armar la URL de la imagen correctamente
    const getImageUrl = (user) => {
        const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5059";
        
        if (user.avatarUrl) {
            return user.avatarUrl.startsWith("http") 
                ? user.avatarUrl 
                : `${baseUrl}/${user.avatarUrl}`;
        }
        return "https://via.placeholder.com/40";
    };

    const deleteUser = async (userId, username) => {
        try {
            await api.deleteUser(userId); 
            showSuccessAlert(`Usuario ${username} eliminado correctamente`); 
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (err) {
            showErrorAlert(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageNumber, query]);

    return (
        <div className="conteiner-primary">
            <Layout 
                title="Administradores" 
                searchValue={query} 
                searchFunc={find}
                placeholder="Buscar Administrador"
            >
                {loading ? (
                    <p style={{ padding: "20px" }}>Cargando usuarios de la base de datos...</p>
                ) : (
                    <Table>
                        <tbody>
                            {users.map((user) => {
                                // Mapeamos los datos de tu JSON
                                const username = user.username || "Sin Usuario";
                                const email = user.email || "Sin email";
                                
                                // Formateamos la fecha (ignorando el 0001 de C#)
                                let fechaFormateada = "Sin fecha";
                                if (user.createdAt && user.createdAt !== "0001-01-01T00:00:00") {
                                    fechaFormateada = new Date(user.createdAt).toLocaleDateString('es-AR');
                                }

                                return (
                                    <tr key={user.id}>
                                        {/* 1. Id */}
                                        <td scope="row">{user.id}</td>
                                        
                                        {/* 2. Avatar */}
                                        <td>
                                            <img 
                                                src={getImageUrl(user)} 
                                                alt={`Avatar de ${username}`} 
                                                style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} 
                                                onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }}
                                            />
                                        </td>

                                        {/* 3. Username */}
                                        <td>{username}</td>

                                        {/* 4. Email */}
                                        <td>{email}</td>

                                        {/* 5. Creado el */}
                                        <td>{fechaFormateada}</td>

                                        {/* 6. Estado (Falso por ahora, porque no tienes campo banned) */}
                                        <td>Activo</td>

                                        {/* 7. Acciones */}
                                        <td className="acciones-btn">
                                            <Button 
                                                className="delete" 
                                                text="ELIMINAR" 
                                                callback={() => 
                                                    showDeleteConfirmAlert(
                                                        () => deleteUser(user.id, username), 
                                                        `¿Borrar a ${username}?`, 
                                                        "Esta acción es irreversible."
                                                    )
                                                }
                                            />
                                            <a href={`/ban?userId=${user.id}`}>
                                                <Button text="BAN"/>
                                            </a>
                                            <a href={`/edit?userId=${user.id}`}>
                                                <Button text="EDITAR"/>
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                )}
                
                <Paginador pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages}></Paginador>
            </Layout>
        </div>
    );
}

export default Admin;