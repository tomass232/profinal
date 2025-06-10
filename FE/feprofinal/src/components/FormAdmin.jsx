import React from 'react';
import '../styles/admin.css';

const FormAdmin = () => {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <div className="logo">AdminPanel</div>
        <div className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#">My List</a>
          
        </div>
      </nav>

      <div className="admin-content">
        <h1 className="admin-title">Dashboard</h1>
        <p className="admin-subtitle">Refine your search</p>

        <div className="search-section">
          <h3 className="search-title">Business Details</h3>
          <p className="search-description">Search for the person</p>

          <div className="search-filters">
            <label>Name</label>
            <input type="text" placeholder="Enter name" className="search-input" />

            <label>Category</label>
            <select className="search-select">
              <option value="">Select category</option>
              <option value="finance">Limpieza de parques</option>
              <option value="technology">Mantenimiento de calles</option>
              <option value="health"></option>
            </select>

            <label>Location</label>
            <input type="text" placeholder="Enter location" className="search-input" />

            <button class="btn">Apply</button>
          </div>
        </div>

        <div className="admin-body">
          <div className="admin-results">
            <a href="#">450 results found</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAdmin;



