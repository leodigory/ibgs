import React from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/AuthContext'; // Importe o AuthProvider

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
