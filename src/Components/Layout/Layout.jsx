import React from 'react';
import NavBar from '../NavBar/NavBar'; 
import Input from '../Input/Input';
import './Layout.css';

const Layout = ({ title, searchValue, searchFunc, placeholder, children }) => {
    return (
        <>
            <NavBar />
            <h2 className='title-page'>{title}</h2>
            <div className="search">
                <Input value={searchValue} onChange={searchFunc} placeholder={placeholder}/>
            </div>
            
            {children}
        </>
    );
};

export default Layout;