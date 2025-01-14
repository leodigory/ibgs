import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import MembersPage from './pages/MembersPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute roles={['Pastor', 'Liderança', 'Membro']}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={['Pastor', 'Liderança']}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/members"
            element={
              <PrivateRoute roles={['Pastor', 'Liderança', 'Membro']}>
                <MembersPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;