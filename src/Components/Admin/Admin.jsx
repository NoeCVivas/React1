import React, { useEffect, useState } from "react";
import Button from '../Button/Button';
import Table from '../Table/Table';
import Paginador from "../Paginador/Paginador";
import Layout from '../Layout/Layout';
import './Admin.css';
import { showDeleteConfirmAlert, showSuccessAlert, showErrorAlert } from '../Alert/Alert';

function Admin() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Arreglo de usuarios falsos para simular la base de datos
    const mockUsers = [
        { id: 1, fullName: "Noelia Admin", userName: "noelia@refr", banned: false },
        { id: 2, fullName: "Juan Pérez", userName: "juanp", banned: false },
        { id: 3, fullName: "Usuario Baneado", userName: "banned_user", banned: true },
        { id: 4, fullName: "Admin de Prueba", userName: "admin_test", banned: false },
        { id: 5, fullName: "Carlos Gomez", userName: "cgomez", banned: false },
        { id: 6, fullName: "Maria Lopez", userName: "mlopez", banned: false },
    ];

    const find = (evt) => {
        const { value } = evt.target;
        setQuery(value);
        setPageNumber(1);
    }

    const fetchData = async () => {
        // --- SIMULACIÓN DE CARGA DE DATOS ---
        // Filtramos los datos falsos según lo que se escriba en el buscador
        const filteredUsers = mockUsers.filter(user =>
            user.fullName.toLowerCase().includes(query.toLowerCase()) ||
            user.userName.toLowerCase().includes(query.toLowerCase())
        );

        setUsers(filteredUsers);
        setTotalPages(1); // Simulamos que todo cabe en 1 sola página
    }

    const deleteUser = async (userId) => {
        // --- SIMULACIÓN DE ELIMINACIÓN ---
        // Mostramos la alerta de éxito
        showSuccessAlert("Usuario eliminado exitosamente (Simulado)"); 
        
        // Actualizamos la tabla quitando el usuario seleccionado
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }

    useEffect(() => {
        fetchData();
    }, [pageNumber, query]);
    
    return (
        <div className="conteiner-primary">
            <Layout 
                title="Administadores" 
                searchValue={query} 
                searchFunc={find}
                placeholder="Buscar Administrador"
            >
                <Table>
                    <tbody>
                        {
                            users.map((user) => {
                                return(
                                    <tr key={user.id}>
                                        <td scope="row">{user.id}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.banned ? "Baneado" : "Activo"}</td>
                                        <td className="acciones-btn">
                                            <Button 
                                                className="delete" 
                                                text="ELIMINAR" 
                                                callback={() => 
                                                    showDeleteConfirmAlert(
                                                        () => deleteUser(user.id), 
                                                        '¿Borrar a ' + user.fullName + '?', 
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
                                )
                            })
                        }
                    </tbody>
                </Table>
                
                <Paginador pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages}></Paginador>
            </Layout>
        </div>
    )
}

export default Admin;