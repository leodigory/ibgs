import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Atualiza a hora e data a cada 1 segundo
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        // Aqui você pode implementar o envio da foto para o servidor, se necessário
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">IBGS</div>
      
      {!isLoggedIn && (
        <ul className="navbar-links">
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}

      {isLoggedIn && (
        <>
          <ul className="navbar-links">
            <li><Link to="/home">Home</Link></li> {/* Link para a Home */}
            <li><Link to="/doacoes">Doações</Link></li>
            <li><Link to="/frequencia">Frequência</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
          </ul>

          <div className="navbar-profile">
            <div className="profile-photo">
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label htmlFor="file-input">
                <div
                  className="profile-circle"
                  style={{
                    backgroundImage: profileImage ? `url(${profileImage})` : 'none',
                  }}
                >
                  {!profileImage && <span>{user?.email[0].toUpperCase()}</span>} {/* Exibe inicial do nome */}
                </div>
              </label>
            </div>
            <div className="profile-info">
              <p>{user?.email.split('@')[0]}</p> {/* Nome do usuário (parte antes do @) */}
              <small>{currentTime.toLocaleString()}</small> {/* Hora e data do login */}
            </div>
            <button className="logout-btn" onClick={logout}>Sair</button> {/* Botão de logout */}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
