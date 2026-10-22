import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showDeleteConfirmAlert = (onConfirm, title = '¿Estás seguro?', text = '¡No podrás revertir esta acción!') => {
    MySwal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33', 
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, ¡Eliminar!',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
            MySwal.fire(
                '¡Eliminado!',
                'El usuario ha sido borrado con éxito.',
                'success'
            );
        } 
    });
};

export const showSuccessAlert = (text) => {
    MySwal.fire({
        title: '¡Operación Exitosa!',
        text: text,
        icon: 'success',
        confirmButtonText: 'Genial'
    });
};

export const showErrorAlert = (text, icon = 'error') => {
    MySwal.fire({
        title: '¡Atención!',
        text: text,
        icon: icon,
        confirmButtonText: 'Entendido'
    });
};

export const showLogoutConfirmAlert = (onConfirm) => {
    MySwal.fire({
        title: '¿Cerrar Sesión?',
        text: "¿Estás seguro de que quieres salir? Asegúrate de haber guardado tu trabajo.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, Cerrar Sesión',
        cancelButtonText: 'Permanecer',
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm(); 
        } 
    });
};