import React, { useRef } from 'react';
import './Navbar.css'

const Navbar = () => {
    const navbarLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Calendario', href: '/calendario' },
        { name: 'Tareas', href: '/tareas' },
        { name: 'Contact', href: '/contacto' },
        { name: 'Registro', href: '/registro' },
        { name: 'Mi cuenta', href: '/cuenta' },
    ];

    const navLinks = useRef(null);
    const links = useRef([]);

    const toggleNav = () => {
        links.current.forEach(link => {
            link.classList.toggle("fade");
        });
        navLinks.current.classList.toggle("open");
    };

    return (
        <nav className='main-nav'>
            <div className="logo">
                <img src="/logo.png" alt="Logo Image" />
            </div>
            <div className="hamburger" onClick={toggleNav}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
            <ul className="nav-links" ref={navLinks}>
                {navbarLinks.map((link, item) => (
                    <li key={link.name} ref={el => (links.current[item - 1] = el)}>
                        <a href={link.href}>{link.name}
                            <span className="border border-top"></span>
                            <span className="border border-right"></span>
                            <span className="border border-bottom"></span>
                            <span className="border border-left"></span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;