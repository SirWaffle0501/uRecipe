import React from 'react';

function Settings() {
  const handleDeleteAccount = () => {
    // Call a service to delete the user's account
    alert('Delete account functionality to be implemented');
  };

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <button>Toggle Theme</button>
    </div>
  );
}

export default Settings;
