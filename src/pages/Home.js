import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { getUserRole, getUserData } from '../auth';
import SideMenu from '../components/SideMenu';
import './Home.css';

function Home() {
  const [role, setRole] = useState('guest');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRole = await getUserRole(user.uid);
        const userData = await getUserData(user.uid);
        setRole(userRole);
        setUserName(userData.name);
        setUserPhoto(userData.photoURL || '/default-profile.png');
        setUserId(user.uid);
      }
    };

    // Se houver dados no estado de navegação, use-os
    if (location.state) {
      setRole(location.state.role);
      setUserName(location.state.userName);
      setUserPhoto(location.state.userPhoto || '/default-profile.png');
      setUserId(location.state.userId);
    } else {
      // Caso contrário, busque os dados do Firestore
      fetchUserData();
    }
  }, [location.state]);

  return (
    <div className="home-container">
      {/* Passa as informações para o SideMenu */}
      <SideMenu role={role} userName={userName} userPhoto={userPhoto} userId={userId} />
      <h1>Bem-vindo à página inicial, <strong>{userName}</strong>!</h1>
      <p>Você está logado como: <strong>{role}</strong></p>
      {role === 'admin' && <p>Acesso total ao sistema.</p>}
      {role === 'pastor' && <p>Acesso total ao sistema.</p>}
      {role === 'financeiro' && <p>Acesso ao setor financeiro.</p>}
      {role === 'lideranca' && <p>Acesso às ferramentas de liderança.</p>}
      {role === 'membro' && <p>Acesso membro liberado.</p>}
      {role === 'visitante' && <p>Acesso limitado.</p>}
    </div>
  );
}

export default Home;