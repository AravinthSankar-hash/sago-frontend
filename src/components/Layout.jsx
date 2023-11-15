import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
const Layout = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div>
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
