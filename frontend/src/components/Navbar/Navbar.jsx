import React, { useState } from 'react';
import './Navbar.scss';
import Icon from '../icon/icon.jsx';
import menuItems from './conf/menuItems';

const Navbar = () => {
    const [open, setOpen] = useState({});

    const handleClick = (e, menuItem) => {
        e.preventDefault();
        setOpen({
            ...open,
            [menuItem]: !open[menuItem],
        });
    };

    return (
        <div className="page-header">
            <nav>
                <a href=""></a>
                <button></button>
                <ul className="main-menu">
                    <li className="menu-heading">
                        <h3>Admin</h3>
                    </li>
                    {menuItems.map((menuItem) => (
                        <li className={menuItem.subItems ? 'has-dropdown' : ''} key={menuItem.name}>
                            {menuItem.subItems ? (
                                <a href={menuItem.link} onClick={(e) => handleClick(e, menuItem.name)}>
                                    <Icon
                                        icon={menuItem.icon}
                                        width={"20"}
                                        height={"20"}
                                    />
                                    <span className="nav-link">{menuItem.name}</span>
                                    <Icon
                                        icon={'angle-left'}
                                        width={"20"}
                                        height={"20"}
                                        className={open[menuItem.name] ? 'dropdown down' : 'dropdown'}
                                    />
                                </a>
                            ) : (
                                <a href={menuItem.link} >
                                    <Icon
                                        icon={menuItem.icon}
                                        width={"20"}
                                        height={"20"}
                                    />
                                    <span className="nav-link">{menuItem.name}</span>                                   
                                </a>
                            )}
                            {menuItem.subItems && (
                                <ul className={open[menuItem.name] ? 'subitem-dropdown open' : 'subitem-dropdown close'} >
                                    {menuItem.subItems.map((subItem) => (
                                        <li key={subItem.name}>
                                            <a href={subItem.link}>
                                                <Icon
                                                    icon={'circle'}
                                                    width={"20"}
                                                    height={"20"}
                                                />
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
        </div>
    );
};

export default Navbar;
