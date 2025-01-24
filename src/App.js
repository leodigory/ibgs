import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import FerramentasADM from './pages/FerramentasADM';
import FerramentasLider from './pages/FerramentasLider';
import PrivateRoute from './components/PrivateRoute';


function App() {
  

  return (
    <Router>
      <Routes>
        {/* Rota Pública: Login */}
        <Route path="/" element={<Login />} />

        {/* Rota Pública: Cadastro */}
        <Route path="/signup" element={<SignUp />} />

        {/* Rota Privada: Home */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Rota Privada: Ferramentas ADM */}
        <Route
          path="/ferramentas-adm"
          element={
            <PrivateRoute>
              <FerramentasADM />
            </PrivateRoute>
          }
        />

        {/* Rota Privada: Ferramentas de Liderança */}
        <Route
          path="/ferramentas-lideranca"
          element={
            <PrivateRoute>
              <FerramentasLider />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;