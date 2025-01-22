import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, collection, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { fetchAllowedTabs } from '../services/roleService';
import { convertToBase64, uploadPhoto } from '../services/imageService';
import { renderMenu } from './tabsConfig';
import { fetchUserData } from '../services/userService'; // Importe o serviço
import './SideMenu.css';

function SideMenu({ role, userName, userPhoto, userId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [photoURL, setPhotoURL] = useState(userPhoto || '/default-profile.png');
  const [allowedTabs, setAllowedTabs] = useState([]); // Abas permitidas para o usuário
  const [acessos, setAcessos] = useState(''); // Estado para armazenar o campo 'acessos'
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Busca os dados do usuário, incluindo 'acessos', ao carregar o componente ou quando o userId mudar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(); // Busca os dados do usuário
        if (userData) {
          setPhotoURL(userData.userPhoto); // Atualiza a foto do perfil
          setAcessos(userData.acessos); // Atualiza o campo 'acessos'
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    };

    fetchData();
  }, [userId]);

  // Função para sincronizar as abas com o Firebase
  const syncTabsWithFirebase = async (tabs) => {
    const tabsCollectionRef = collection(db, 'tabs'); // Coleção correta: 'tabs'

    try {
      // Busca as abas já existentes no Firebase
      const querySnapshot = await getDocs(tabsCollectionRef);
      const existingTabs = new Set(querySnapshot.docs.map(doc => doc.id)); // Usamos doc.id para verificar duplicação

      // Adiciona as novas abas ao Firebase, evitando duplicação
      for (const tab of tabs) {
        if (!existingTabs.has(tab)) {
          // Usamos setDoc com o nome da aba como ID
          await setDoc(doc(tabsCollectionRef, tab), { name: tab });
          console.log(`Aba "${tab}" adicionada ao Firebase.`);
        }
      }
    } catch (error) {
      console.error('Erro ao sincronizar abas com o Firebase:', error);
    }
  };

  // Função para extrair as abas dinamicamente do tabsConfig.js
  const extractTabsFromConfig = (renderMenu) => {
    const tabs = new Set();

    // Converte a função renderMenu para string
    const renderMenuString = renderMenu.toString();

    // Usa uma expressão regular para encontrar todas as ocorrências de allowedTabs.includes('...')
    const regex = /allowedTabs\.includes\('([^']+)'/g;
    let match;

    // Itera sobre todas as correspondências e adiciona as abas ao Set
    while ((match = regex.exec(renderMenuString)) !== null) {
      tabs.add(match[1]);
    }

    // Retorna as abas como um array
    return Array.from(tabs);
  };

  // Extrai as abas dinamicamente do arquivo tabsConfig.js
  const allTabs = extractTabsFromConfig(renderMenu);

  // Busca as abas permitidas para o role do usuário
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const tabs = await fetchAllowedTabs(role); // Busca as abas permitidas
        setAllowedTabs(tabs); // Atualiza o estado com as abas permitidas

        // Sincroniza todas as abas com o Firebase
        await syncTabsWithFirebase(allTabs);
      } catch (error) {
        console.error('Erro ao buscar abas permitidas:', error);
        setAllowedTabs([]); // Em caso de erro, define as abas permitidas como uma lista vazia
      }
    };

    fetchTabs(); // Chama a função para buscar as abas permitidas
  }, [role]); // Executa sempre que o role mudar

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  // Função para lidar com o upload da foto
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    try {
      // Usa o serviço para fazer upload da foto
      const base64 = await uploadPhoto(file, userId);

      // Atualiza o estado local com a nova URL da foto
      setPhotoURL(base64);

      // Limpa o valor do input de arquivo para permitir a seleção da mesma imagem novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      alert(error.message); // Exibe mensagem de erro (ex: "A imagem deve ter no máximo 1 MB.")
    }
  };

  // Extrai o primeiro nome do usuário
  const firstName = userName ? userName.split(' ')[0] : '';

  return (
    <div className={`side-menu ${isExpanded ? 'expanded' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      {/* Perfil do usuário (exibido apenas quando o menu está expandido) */}
      <div className="user-profile">
        <div className="profile-picture" onClick={() => fileInputRef.current.click()}>
          <img src={photoURL} alt="Profile" onError={(e) => { e.target.src = '/default-profile.png'; }} />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handlePhotoUpload}
            accept="image/*"
          />
        </div>
        <div className="profile-info">
          <h3>{userName}</h3>
          <div className="role-tag">
            <p>Classe: {role}</p>
          </div>
          <p className="role-info">{role} {acessos} liberado!</p>
      
        </div>
      </div>
      {/* Renderiza o menu usando a função importada */}
      {renderMenu(allowedTabs, navigate, isExpanded, photoURL, firstName, fileInputRef, handleLogout)}
    </div>
  );
}

export default SideMenu;