import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  return (
    <div className="sidebar bg-light border-end">
      <div className="d-flex flex-column p-3" style={{ width: '280px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <span className="fs-4">Your App Name</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              <i className="bi bi-house-door me-2"></i>
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              <i className="bi bi-table me-2"></i>
              Orders
            </a>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
