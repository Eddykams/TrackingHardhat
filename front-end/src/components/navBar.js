import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const NavBar = () => {
  return (
    <nav>
      <ul>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/addProduct">Add Product</Link>
        </li>
        <li>
          <Link to="/transferProduct">Transfer Product</Link>
        </li>
        <li>
          <Link to="/verifyProduct">Verify Product</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
