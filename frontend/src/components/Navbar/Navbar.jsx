import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import LoggedIn from './LoggedIn/LoggedIn';
import LoggedOut from './LogeedOut/LogeedOut';

const Navbar = () => {
    const isLogged = true;

    useEffect(() => {
        // Arreglar classicNameResolver, en móviles el menú debe estar collapsado y mas pequeño
        if (isLogged) {
            document.body.classList.add('nav-expanded-NT');
        } else {
            document.body.classList.add('nav-expanded-NL');
        }
    }, [isLogged]);

    if (isLogged) {
        return (<LoggedIn />);
    } else {
        return (<LoggedOut />)
    }
};

export default Navbar;
