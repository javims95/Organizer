import React, { useState, useRef } from 'react';
import './Navbar.css'

const Navbar = () => {
    const navbarLinks = [
        { name: 'Home', href: '/home' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
    ];

    const [navOpen, setNavOpen] = useState(false);
    const navLinks = useRef(null);
    const links = useRef([]);

    const toggleNav = () => {
        setNavOpen(prevState => !prevState);
        links.current.forEach(link => {
            link.classList.toggle("fade");
        });
        navLinks.current.classList.toggle("open");
    };

    return (
        <nav>
            <div className="logo">
                <img src="logo.svg" alt="Logo Image" />
            </div>
            <div className="hamburger" onClick={toggleNav}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
            <ul className="nav-links" ref={navLinks}>
                {navbarLinks.map((link, item) => (
                    <li key={link.name} ref={el => (links.current[item - 1] = el)}>
                        <a href={link.href}>{link.name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
