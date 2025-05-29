import React from 'react';
import FormAdmin from '../components/FormAdmin';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <div className="logo">AdminPanel</div>
        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">My list</a>
          <a href="#">Exports</a>
        </div>
      </nav>

      <div className="admin-content">
        <h1 className="admin-title">Dashboard</h1>
        <p className="admin-subtitle">Refine your search</p>

        <div className="admin-body">
          <FormAdmin />

          <div className="admin-results">
            <a href="#">450 results found</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
