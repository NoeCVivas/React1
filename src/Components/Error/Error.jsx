import React from "react";
import './Error.css';

function Error() {
    return (
        <div className="errorContainer">
            <h1 className="errorMessage">Tranqui, solo es un error...</h1>
            <div className="imageConteiner">
                <img src="/Error 404_ Batería sin pila.png" alt="Error" />
            </div>
        </div>
    )
}

export default Error;