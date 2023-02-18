import React, { useState, useEffect, useRef } from 'react';
import './Navbar.scss';
import Icon from '../icon/icon.jsx';
import menuItems from './conf/menuItems';
import Search from '../Search/Search.jsx'

const Navbar = () => {
    const [open, setOpen] = useState({});
    const [menuHidden, setMenuHidden] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const ulRef = useRef(null);
    const isLogged = true;

    const handleFullScreenChange = () => {
        setIsFullScreen(document.fullscreenElement !== null);
    };

    const handleClick = (e, menuItem) => {
        e.preventDefault();
        setOpen({
            ...open,
            [menuItem]: !open[menuItem],
        });
        if (open[menuItem]) {
            setTimeout(() => {
                ulRef.current.classList.add('closed');
            }, 500);
        } else {
            ulRef.current.classList.remove('closed');
        }
    };

    const handleHideMenu = () => {
        setMenuHidden(!menuHidden);
        if (document.body.classList.contains('nav-expanded-NT')) {
            document.body.classList.remove('nav-expanded-NT')
        }
        if (!menuHidden) {
            document.body.classList.remove('nav-expanded');
            document.body.classList.add('nav-collapsed');
        } else {
            document.body.classList.remove('nav-collapsed');
            document.body.classList.add('nav-expanded');
        }
    };

    useEffect(() => {
        if (isLogged) {
            document.body.classList.add('nav-expanded-NT');
        }
    }, [isLogged]);

    useEffect(() => {
        const handleTransitionEnd = (e) => {
            if (e.propertyName === 'height' && !open) {
                setIsClosing(false);
            }
        };
        const ulElement = ulRef.current;
        if (ulElement) {
            ulElement.addEventListener('transitionend', handleTransitionEnd);
            return () => {
                ulElement.removeEventListener('transitionend', handleTransitionEnd);
            };
        }
    }, [open]);

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    const handleMouseEnter = () => {
        if (document.body.classList.contains('nav-collapsed')) {
            document.body.classList.remove('nav-collapsed');
            document.body.classList.add('nav-expanded');
            setIsHovering(true);
        }
    };

    const handleMouseLeave = () => {
        if (isHovering) {
            document.body.classList.remove('nav-expanded');
            document.body.classList.add('nav-collapsed');
            setIsHovering(false);
        }
    };

    const handleFullScreen = () => {
        if (document.fullscreenEnabled) {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
    };

    return (
        <>
            {isLogged ? (
                <>
                    <nav className='navbar-primary' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <Search />
                        <ul className='primary-nav'>
                            {menuItems.map((menuItem) => (
                                <li className={menuItem.subItems ? 'has-dropdown' : ''} key={menuItem.name}>
                                    {menuItem.subItems ? (
                                        <a href={menuItem.link} onClick={(e) => handleClick(e, menuItem.name)}>
                                            <Icon icon={menuItem.icon} width="20" height="20" />
                                            <span className="nav-link">{menuItem.name}</span>
                                            <Icon icon={'angle-left'} width="20" height="20" className={open[menuItem.name] ? 'dropdown down' : 'dropdown'} />
                                        </a>
                                    ) : (
                                        <a href={menuItem.link}>
                                            <Icon icon={menuItem.icon} width="20" height="20" />
                                            <span className="nav-link">{menuItem.name}</span>
                                        </a>
                                    )}
                                    {menuItem.subItems && (
                                        <ul
                                            className={`subitem-dropdown ${open[menuItem.name] ? 'open' : 'closed'}`}
                                            ref={ulRef}
                                        >
                                            {menuItem.subItems.map((subItem) => (
                                                <li key={subItem.name}>
                                                    <a href={subItem.link}>
                                                        <Icon icon={'circle'} width="20" height="20" />
                                                        <span className="nav-link">{subItem.name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav className='navbar-secondary'>
                        <ul className='nav-list-left'>
                            <li>
                                <a className='toggle-menu nav-link' href="#" onClick={handleHideMenu}>
                                    <Icon icon="bars" width="20" height="20" className={'icon-menu'} />
                                </a>
                            </li>
                            <li>
                                <a className='nav-link' href="/">Inicio</a>
                            </li>
                        </ul>
                        <ul className='nav-list-notification'>
                            <li>
                                <a className='nav-link' href="#">
                                    <Icon icon="bell" width="20" height="20" className={'icon-menu'} />
                                    <span className='notification-counter'>12</span>
                                </a>
                            </li>
                            <li>
                                <a className='nav-link' href="#" onClick={handleFullScreen}>
                                    <Icon icon={isFullScreen ? 'compress-arrows' : 'expand-arrows'} width="20" height="20" className={'icon-menu'} />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <>
                    <nav className='navbar'>
                        <ul className='nav-list-left'>
                          
                        </ul>
                    </nav>
                </>
            )}
        </>
    );
};

export default Navbar;
