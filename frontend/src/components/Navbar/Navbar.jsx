import React, { Component } from 'react';
import './Navbar.scss';

export default class Navbar extends Component {


    render() {
        return (
            <div className='page-header'>
                <nav>
                    <a href=""></a>
                    <button></button>
                    <ul className='admin-menu'>
                        <li className="menu-heading"><h3>Admin</h3></li>
                        <li><a href="">Texto de Pruebas</a></li>
                        <li><a href="">Texto de Pruebas</a></li>
                        <li><a href="">Texto de Pruebas</a></li>
                        <li><a href="">Texto de Pruebas</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}