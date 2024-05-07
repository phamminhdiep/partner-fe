import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Import CSS file

function Navbar() {
  return (
    <nav className='nav'>
      <ul className='nav-ul'>
        <li className='nav-li'>
          <Link className='nav-a' to="/">Home</Link>
        </li>
        <li className='nav-li'>
          <Link className='nav-a' to="/partner/list">Manage Partner</Link>
        </li>
        <li className='nav-li'>
          <Link className='nav-a' to="/service-registration">Service Using Registration</Link>
        </li>
        <li className='nav-li'>
          <Link className='nav-a' to="/pay-invoice">Pay Service Fee</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
