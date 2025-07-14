import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Signup from './assets/Signup';
import Login from './assets/Login';
import Home from './pages/Home';
import PublicRoute from './assets/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
