import React, { useState } from 'react';
import './Search.scss'
import menuItems from '../Navbar/conf/menuItems';
import Icon from '../icon/icon.jsx';

const Menu = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = menuItems.filter((item) => {
        // Buscar en el item principal
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }

        // Buscar en los subitems
        if (item.subItems) {
            return item.subItems.some((subItem) =>
                subItem.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return false;
    });

    return (
        <>
            <div className='border'>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit"> <Icon icon={'magnifying-glass'} className={'svg-search'} /></button>
            </div>

            {searchTerm && (
                <ul>
                    {filteredItems.map((item) => (
                        <li key={item.name}>
                            <a href={item.link}>
                                <i className={`fa fa-${item.icon}`} /> {item.name}
                            </a>
                            {item.subItems && (
                                <ul>
                                    {item.subItems.map((subItem) => (
                                        <li key={subItem.name}>
                                            <a href={subItem.link}>
                                                <i className={`fa fa-${subItem.icon}`} /> {subItem.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Menu;
