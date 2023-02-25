import React, { useState, useRef } from 'react';
import './User.scss';
import Icon from '../icon/icon';
import userNavItems from './conf/userNavItems';

const User = (props) => {
    const { dropdown } = props;
    const [showDropdown, setShowDropdown] = useState(false);
    const timerRef = useRef(null);

    const handleMouseEnter = () => {
        setShowDropdown(true);
        clearTimeout(timerRef.current);
    };

    const handleMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 300);
    };

    if (dropdown) {
        return (
            <>
                <div className="nav-link has-dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <a className="link-user" href="#">
                        <img className="avatar" src="user.jpg" alt="Imagen de tu perfil" />
                        <span>Sara Rodriguez</span>
                        <Icon icon={'caret-down'} className={'caret-down'} />
                    </a>
                    {showDropdown && (
                        <div className="dropdown">
                            {userNavItems.map((userNavItem) => (
                                <a
                                    className={'link-dropdown'}
                                    href={userNavItem.link}
                                    key={userNavItem.name}
                                >
                                    <Icon icon={userNavItem.icon} className={'icon-dropdown'} />
                                    {userNavItem.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="nav-link has-dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <a className="link-user" href="/account">
                        <img className="avatar" src="user.jpg" alt="Imagen de tu perfil" />
                        <span>Sara Rodriguez</span>
                    </a>
                </div>
            </>
        );
    }
};

export default User;
