import React, { useState } from 'react';
import './Search.scss'
import { navItemsLogged } from '@utils/navbarItems';
import Icon from '../icon/icon';

const Menu = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = navItemsLogged.filter((item) => {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }

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

    const handleClearSearch = () => {
        setSearchTerm('');
    }

    return (
        <div className='search'>
            <div className='border'>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm ? (
                    <button type="button" onClick={handleClearSearch}>
                        <Icon icon={'xmark'} className={'close-icon'} />
                    </button>
                ) : (
                    <button type="submit">
                        <Icon icon={'magnifying-glass'} className={'search-icon'} />
                    </button>
                )}
            </div>

            {searchTerm && (
                <div className='list-group'>
                    {filteredItems.map((item) => {
                        const highlightedItemName = highlightSearchTerm(item.name, searchTerm);
                        return (
                            <React.Fragment key={item.name}>
                                <a className="list-group-item" href={item.link}>
                                    {highlightedItemName}
                                </a>
                                {item.subItems && item.subItems.map((subItem) => {
                                    const highlightedSubItemName = highlightSearchTerm(subItem.name, searchTerm);
                                    return (
                                        <a className="list-group-item" href={subItem.link} key={subItem.name}>
                                            {highlightedSubItemName}
                                            <div className='search-path'>
                                                <span>{highlightedItemName} {'->'} {highlightedSubItemName}</span>
                                            </div>
                                        </a>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </div>
            )}

        </div>
    );
};

export default Menu;
