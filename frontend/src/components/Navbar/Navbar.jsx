import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import LoggedIn from './LoggedIn/LoggedIn';
import LoggedOut from './LogeedOut/LogeedOut';

const Navbar = () => {
    const isLogged = true;

    useEffect(() => {
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
