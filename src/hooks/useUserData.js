import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchUserData } from '../services/userService'; // Importe o serviço

export const useUserData = () => {
  const [role, setRole] = useState('guest');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('/default-profile.png');
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const loadUserData = async () => {
      if (location.state) {
        // Se houver dados no estado de navegação, use-os
        setRole(location.state.role);
        setUserName(location.state.userName);
        setUserPhoto(location.state.userPhoto || '/default-profile.png');
        setUserId(location.state.userId);
      } else {
        // Caso contrário, busque os dados do Firestore
        const userData = await fetchUserData();
        if (userData) {
          setRole(userData.role);
          setUserName(userData.userName);
          setUserPhoto(userData.userPhoto);
          setUserId(userData.userId);
        }
      }
    };

    loadUserData(); // Executa a função para carregar os dados
  }, [location.state]); // Dependência: executa quando location.state muda

  return { role, userName, userPhoto, userId }; // Retorna os dados do usuário
};