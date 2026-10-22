import './Paginador.css';
import Button from '../Button/Button';
import Label from '../Label/Label'

import React from 'react'

const Paginador = ({pageNumber, setPageNumber, totalPages}) => {

    const anterior = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    const siguiente = () => {
        if (pageNumber < totalPages) {
            setPageNumber(pageNumber + 1);
        }
    }

    return (
        <div className="container-pager">
            <Button text="Anterior" callback={anterior}/>
            <Label text={pageNumber}/>
            <Button text="Siguiente" callback={siguiente}/>
        </div>
    )
}

export default Paginador;