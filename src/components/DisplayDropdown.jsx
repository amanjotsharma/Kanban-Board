import React, { useState } from 'react';

const DisplayDropdown = ({ onGroupingChange, onOrderingChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="display-dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Display
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <label htmlFor="grouping-select">Grouping:</label>
            <select
              id="grouping-select"
              onChange={(e) => onGroupingChange(e.target.value)}
              className="dropdown-select"
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-section">
            <label htmlFor="ordering-select">Ordering:</label>
            <select
              id="ordering-select"
              onChange={(e) => onOrderingChange(e.target.value)}
              className="dropdown-select"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDropdown;
