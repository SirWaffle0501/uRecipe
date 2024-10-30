import React from 'react';

function Header() {
  const userRole = localStorage.getItem('userRole');

  return (
    <nav>
      <a href="/">Home</a>
      <a href="/profile">Profile</a>
      {userRole === 'admin' && <a href="/admin">Admin Panel</a>}
    </nav>
  );
}

export default Header;
