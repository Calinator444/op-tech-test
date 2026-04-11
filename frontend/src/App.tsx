import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { StakeholdersPage } from './pages/StakeholdersPage';
import { ToastContainer } from 'react-toastify';
import './App.css';
import NewStakeholdersPage from './pages/NewStakeholderPage';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <span className="nav-brand">Stakeholder Manager</span>
        <div className="nav-links">
          <NavLink to="/" end>Stakeholders</NavLink>
          <NavLink to="/stakeholders/new">Add Stakeholder</NavLink>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<StakeholdersPage />} />
          <Route path="/stakeholders/new" element={<NewStakeholdersPage />} />
        </Routes>
      </main>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
