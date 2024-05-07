import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Hệ thống quản lý Đối tác</h1>
    </div>
  );
}

export default Home;