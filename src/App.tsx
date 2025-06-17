import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { documents, sections, APP_PASSWORD } from './data';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // const handleLogin = (password: string, username :string) => {
  //   if (password === APP_PASSWORD && username === "asd") {
  //     setIsAuthenticated(true);
  //     setLoginError('');
  //   } else {
  //     setLoginError('Invalid password. Please try again.');
  //   }
  // };

  const handleLogin = async (password: string, username: string) => {
  try {
    const response = await fetch(
      `https://outreach-sqy8.onrender.com/users/auth?linkedin_username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    );

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const userData = await response.json();

    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    // Mark user as authenticated
    setIsAuthenticated(true);
    setLoginError('');
  } catch (error: any) {
    console.error('Login error:', error);
    setLoginError('Invalid username or password. Please try again.');
  }
};

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginError('');
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen 
        onLogin={handleLogin}
        error={loginError}
      />
    );
  }

  return (
    <Dashboard
      documents={documents}
      sections={sections}
      onLogout={handleLogout}
    />
  );
}

export default App;