import { useEffect, useState } from "react";
import Button from '../Button/Button';
import Table from '../Table/Table';
import Paginador from "../Paginador/Paginador";
import Layout from '../Layout/Layout'; 
import './Users.css';
import { showDeleteConfirmAlert, showSuccessAlert, showErrorAlert } from '../Alert/Alert';
import { api } from "../../Services/Api";

function Users() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const find = (evt) => {
        const { value } = evt.target;
        setQuery(value);
        setPageNumber(1);
    }

    const fetchData = async () => {
        try {
            const data = await api.getUsers();
            let listaUsuarios = data.payload || [];
            
            if (query) {
                const q = query.toLowerCase();
                listaUsuarios = listaUsuarios.filter(user => 
                    (user.username && user.username.toLowerCase().includes(q)) ||
                    (user.email && user.email.toLowerCase().includes(q))
                );
            }

            setUsers(listaUsuarios);
            setTotalPages(1); 
        } catch (error) {
            showErrorAlert("Error al traer los usuarios: " + error.message);
            console.error(error);
        }
    }

    const deleteUser = async (userId, username) => {
        try {

            await api.deleteUser(userId);
            showSuccessAlert(`Usuario ${username} eliminado correctamente`);
            fetchData();
        } catch (error) {
            showErrorAlert("Error de conexión.");
        }
    }

    useEffect(() => {
        fetchData();
    }, [pageNumber, query]); 
    
    return (
        <div className="conteiner-primary">
            <Layout 
                title="Usuarios" 
                searchValue={query} 
                searchFunc={find}
                placeholder="Buscar Usuario"
            >
                <Table>
                    <tbody>
                        {users.map((user) => {
                            // Extraemos los datos reales
                            const username = user.username || "Sin Usuario";
                            const email = user.email || "Sin email";
                            
                            let fechaFormateada = "Sin fecha";
                            if (user.createdAt && user.createdAt !== "0001-01-01T00:00:00") {
                                fechaFormateada = new Date(user.createdAt).toLocaleDateString('es-AR');
                            }

                            const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5059";
                            const urlImagen = user.avatarUrl ? `${baseUrl}/${user.avatarUrl}` : "https://via.placeholder.com/40";

                            return(
                                <tr key={user.id}>
                                    <td scope="row">{user.id}</td>
                                    <td>
                                        <img 
                                            src={urlImagen} 
                                            alt={`Avatar de ${username}`} 
                                            style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} 
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }}
                                        />
                                    </td>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{fechaFormateada}</td>
                                    <td>Activo</td>
                                    <td className="acciones-btn">
                                        <Button 
                                            className="delete" 
                                            text="ELIMINAR" 
                                            callback={() => 
                                                showDeleteConfirmAlert(() => deleteUser(user.id, username), 
                                                    `¿Borrar a ${username}?`, 
                                                    "Esta acción es irreversible.")
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
                        })}
                    </tbody>
                </Table>
                
                <Paginador pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages}></Paginador>
            </Layout>
        </div>
    )
}

export default Users;