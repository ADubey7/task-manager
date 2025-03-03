import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage'; // Import the RegisterPage
import './styles/global.css';

function App() {
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
          <Route
            path="/dashboard"
            element={<DashboardPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
          <Route
            path="/register"
            element={<RegisterPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
          <Route path="/" element={<LoginPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;