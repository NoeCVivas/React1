import './Button.css';

import React from 'react'


const Button = ({text, callback}) => {    
    return (
        <button className='button' onClick={callback}>
            {text}
        </button>
    )
}

export default Button;