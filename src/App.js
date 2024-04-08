import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Historico from './pages/Historico';
import { Row, Col } from './ui/Grid';
import Sidebar from './ui/Sidebar';
import Tabs from './ui/Tabs';
import Observacoes from './pages/Observacoes';
import Painel from './pages/Painel';
import './App.scss';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      <Row>
        {!isLoginPage && (
          <div className="oct-sidebar">
            <Col size="col-2">
              <Sidebar />
            </Col>
          </div>
        )}
        <Col>
          <p style={{ margin: '.3em 0', color: 'transparent' }}>.</p>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/observacoes" element={<Observacoes />} />
            <Route path="/painel" element={<Painel />} />
          </Routes>
        </Col>
      </Row>
      {!isLoginPage && (
        <div className="oct-tabs">
          <Col size="col-2">
            <Tabs />
          </Col>
        </div>
      )}
    </>
  );
}

export default App;
