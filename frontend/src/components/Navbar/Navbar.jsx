import React, { Component } from 'react';
import './Navbar.scss';
import Icon from '../icon/icon.jsx';
import menuItems from './conf/menuItems';

export default class Navbar extends Component {
  render() {
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
              <li key={menuItem.name}>
                <a href={menuItem.link}>
                  <Icon
                    icon={menuItem.icon}
                    width={"20"}
                    height={"20"}
                  />
                  <span className="nav-link">{menuItem.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}
