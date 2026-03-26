import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { StakeholdersPage } from './pages/StakeholdersPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <span className="nav-brand">Stakeholder Manager</span>
        <div className="nav-links">
          <NavLink to="/" end>Stakeholders</NavLink>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<StakeholdersPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
