import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import FerramentasADM from './pages/FerramentasADM';
import FerramentasLider from './pages/FerramentasLider';
import PrivateRoute from './components/PrivateRoute';
import { lerTitulosDaPagina } from './services/lerTitulosDaPagina'; // Importe o serviço

function App() {
  const executado = useRef(false); // Variável de controle

  // Executa a função para ler títulos da página após o render
  useEffect(() => {
    if (!executado.current) { // Verifica se já foi executado
      lerTitulosDaPagina(FerramentasLider); // Passa o componente como parâmetro
      executado.current = true; // Marca como executado
    }
  }, []); // Executa apenas uma vez após o render inicial

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

        {/* Rota "catch-all": Redireciona para /home */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;