import './Label.css';

import React from 'react'


const Label = ({ text }) => {
  return (
    <label>
      <div className='label'>
        {text}
      </div>
      
    </label>
  )
}

export default Label;