import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Roadmap from './components/Roadmap';
import ToppingCourier from './components/ToppingCourier';
import Minimal from './components/Minimal';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/topping" element={<ToppingCourier />} />
            <Route path="/minimal" element={<Minimal />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

