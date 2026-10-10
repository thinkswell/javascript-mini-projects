import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the User Registration App</h1>
          <p>
            A powerful platform that allows users to securely register, verify their email, and manage their accounts. Whether you're a new user or an administrator, we provide the tools you need to get started and maintain a seamless experience.
          </p>
          <div className="action-buttons">
            <a href="/signup" className="btn btn-primary">Get Started</a>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2025 Powered by Node.js, Express, and React. Ensuring a smooth and secure user experience.</p>
      </footer>
    </div>
  );
}

export default Home;