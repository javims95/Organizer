import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import LoggedIn from './LoggedIn/LoggedIn';
import LoggedOut from './LogeedOut/LogeedOut';

const Navbar = () => {
    const isLogged = false;
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // useEffect(() => {
    //     const handleResize = () => setWindowWidth(window.innerWidth);
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

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
