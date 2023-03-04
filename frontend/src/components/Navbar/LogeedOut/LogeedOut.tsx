import React, { useState, useEffect } from 'react';
import './LogeedOut.scss';
import Icon from '@components/Icon/Icon';
import { navItemsNoLogged } from '../conf/navbarItems';

const LogeedOut = () => {
    const [isMenuMobOpen, setIsMenuMobOpen] = useState(false);

    const handleMenuMobClick = () => {
        setIsMenuMobOpen(!isMenuMobOpen);
    };

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <nav>
                <div className={`navbar ${isMenuMobOpen ? 'border' : ''}`}>
                    <a className="logo" href="/">
                        Organizator
                    </a>
                    <div className={`toggle-mobile ${isMenuMobOpen ? 'open' : ''}`} onClick={handleMenuMobClick}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className="nav-list">
                        {navItemsNoLogged[0].map((menuItem) => (
                            <a className="nav-link" href={menuItem.link} key={menuItem.name}>
                                {menuItem.name}
                            </a>
                        ))}
                    </div>
                    <div className="nav-list login">
                        {navItemsNoLogged[1].map((menuItem) => (
                            <a className={menuItem.className ? 'nav-buttons ' + menuItem.className : 'nav-buttons'} href={menuItem.link} key={menuItem.name}>
                                {menuItem.name}
                            </a>
                        ))}
                    </div>
                </div>
                <div className={`navbar-content ${isMenuMobOpen ? 'open' : ''}`}>
                    {navItemsNoLogged[0].map((menuItem) => (
                        <a className="nav-link" href={menuItem.link} key={menuItem.name}>
                            {menuItem.name}
                        </a>
                    ))}
                    <div className="nav-list login">
                        {navItemsNoLogged[1].map((menuItem) => (
                            <a className={menuItem.className ? 'nav-buttons ' + menuItem.className : 'nav-buttons'} href={menuItem.link} key={menuItem.name}>
                                {menuItem.name}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default LogeedOut;
