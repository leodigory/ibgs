import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchUserData } from '../services/userService'; // Importe o serviço

export const useUserData = () => {
  const [role, setRole] = useState('guest');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('/default-profile.png');
  const [userId, setUserId] = useState(null);
  const [acessos, setAcessos] = useState([]); // Estado para armazenar os acessos
  const location = useLocation();

  useEffect(() => {
    const loadUserData = async () => {
      if (location.state) {
        // Se houver dados no estado de navegação, use-os
        setRole(location.state.role);
        setUserName(location.state.userName);
        setUserPhoto(location.state.userPhoto || '/default-profile.png');
        setUserId(location.state.userId);
        setAcessos(location.state.acessos || []); // Define os acessos (padrão: array vazio)
      } else {
        // Caso contrário, busque os dados do Firestore
        const userData = await fetchUserData();
        if (userData) {
          setRole(userData.role);
          setUserName(userData.userName);
          setUserPhoto(userData.userPhoto);
          setUserId(userData.userId);
          setAcessos(userData.acessos || []); // Define os acessos (padrão: array vazio)
        }
      }
    };

    loadUserData(); // Executa a função para carregar os dados
  }, [location.state]); // Dependência: executa quando location.state muda

  return { role, userName, userPhoto, userId, acessos }; // Retorna os dados do usuário, incluindo acessos
};