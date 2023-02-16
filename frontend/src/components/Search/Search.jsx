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

    const highlightSearchTerm = (name, searchTerm) => {
        const lowerCaseName = name.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const startIndex = lowerCaseName.indexOf(lowerCaseSearchTerm);
        if (startIndex === -1) {
            return name;
        }

        const endIndex = startIndex + lowerCaseSearchTerm.length;

        return (
            <>
                {name.slice(0, startIndex)}
                <span style={{ color: 'white' }}>
                    {name.slice(startIndex, endIndex)}
                </span>
                {name.slice(endIndex)}
            </>
        );
    };

    return (
        <div className='search'>
            <div className='border'>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit"> <Icon icon={'magnifying-glass'} className={'search-icon'} /></button>
            </div>

            {searchTerm && (
                <ul>
                    {filteredItems.map((item, i) => (
                        // Eliminar todas las etiquetal del bucle, dejar solo los <a> y cambiar estilos
                        <div key={item.name}>
                            <li className="list-group-results" key={i}>
                                <a className="nav-results" href={item.link}>
                                    {highlightSearchTerm(item.name, searchTerm)}
                                </a>
                            </li>
                            {item.subItems && item.subItems.map((subItem, j) => (
                                <li className='list-group-results' key={j}>
                                    <a className="nav-results" href={subItem.link}>
                                        {subItem.name}
                                    </a>
                                </li>
                            ))}
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Menu;
