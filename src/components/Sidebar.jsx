import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/', icon: 'bi-house-door', label: 'Home' },
    { path: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/orders', icon: 'bi-table', label: 'Orders' },
    { path: '/analytics', icon: 'bi-graph-up', label: 'Analytics' },
    { path: '/settings', icon: 'bi-gear', label: 'Settings' }
  ];

  return (
    <div className={`sidebar bg-light border-end ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="d-flex flex-column p-3">
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          {!isCollapsed && <span className="fs-4">Your App Name</span>}
          <button
            className="btn btn-link p-0 text-dark"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : 'link-dark'}`
                }
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
