import React, { Component } from 'react';
import './Navbar.scss';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            selected: 'Home'
        };
    }

    toggleMenu = () => {
        this.setState({ open: !this.state.open });
    };

    selectOption = (option) => {
        this.setState({ selected: option, open: false });
    };

    render() {
        const { open, selected } = this.state;
        return (
            <div className="app">
                <div className="header">
                    <h2>{selected}</h2>
                    <button onClick={this.toggleMenu}>
                        {open ? 'Close' : 'Open'} Menu
                    </button>
                </div>
                {open && (
                    <div className="menu">
                        <div
                            className={`menu-option ${selected === 'Home' ? 'selected' : ''}`}
                            onClick={() => this.selectOption('Home')}
                        >
                            Home
                        </div>
                        <div
                            className={`menu-option ${selected === 'About' ? 'selected' : ''}`}
                            onClick={() => this.selectOption('About')}
                        >
                            About
                        </div>
                        <div
                            className={`menu-option ${selected === 'Services' ? 'selected' : ''}`}
                            onClick={() => this.selectOption('Services')}
                        >
                            Services
                        </div>
                        <div
                            className={`menu-option ${selected === 'Contact' ? 'selected' : ''}`}
                            onClick={() => this.selectOption('Contact')}
                        >
                            Contact
                        </div>
                        <div
                            className={`menu-option ${selected === 'Settings' ? 'selected' : ''}`}
                            onClick={() => this.selectOption('Settings')}
                        >
                            Settings
                        </div>
                        <div className="menu-option has-submenu">
                            <div
                                className={`submenu-option ${selected === 'Submenu 1' ? 'selected' : ''}`}
                                onClick={() => this.selectOption('Submenu 1')}
                            >
                                Submenu 1
                            </div>
                            <div
                                className={`submenu-option ${selected === 'Submenu 2' ? 'selected' : ''}`}
                                onClick={() => this.selectOption('Submenu 2')}
                            >
                                Submenu 2
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}