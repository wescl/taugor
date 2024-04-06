import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Row, Col } from './ui/Grid';
import Sidebar from './ui/Sidebar';

const App = () => {
  return (
    <Router>
      <>
        <Row>
          <Col size={2}>
            <Sidebar />
          </Col>
          <Col size={10}>
            <p style={{ margin: '.5em 0', color: 'transparent' }}>.</p>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <p style={{ margin: '1em 0', color: 'transparent' }}>.</p>
          </Col>
        </Row>
      </>
    </Router>
  );
}

export default App;
