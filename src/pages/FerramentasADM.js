import React, { useState } from 'react';
import SideMenu from '../components/SideMenu'; // Importe o SideMenu
import Classes from '../components/Classes'; // Importe o componente Classes
import UserClasses from '../components/userClasses'; // Importe o componente UserClasses
import './FerramentasADM.css'; // Importe os estilos da página

function FerramentasADM() {
  // Exemplo de dados do usuário (substitua pelos dados reais do usuário autenticado)
  const role = 'administrador'; // Role do usuário
  const userName = 'Admin'; // Nome do usuário
  const userPhoto = '/default-profile.png'; // Foto do usuário
  const userId = '123'; // ID do usuário

  const [showClasses, setShowClasses] = useState(false); // Controla a exibição do modal Classes
  const [showUserClasses, setShowUserClasses] = useState(false); // Controla a exibição do modal UserClasses

  return (
    <div className="ferramentas-adm-container">
      {/* Inclua o SideMenu */}
      <SideMenu role={role} userName={userName} userPhoto={userPhoto} userId={userId} />

      {/* Conteúdo da página Ferramentas ADM */}
      <div className="ferramentas-adm-content">
        <h1>Ferramentas Administrativas</h1>

        {/* Lista de grupos de botões */}
        <div className="button-groups">
          {/* Grupo 1 */}
          <div className="button-group">
            <h2>Gerenciamento de Classes</h2>
            <button onClick={() => setShowClasses(true)}>Classes</button>
            <button onClick={() => setShowUserClasses(true)}>Alterar Classes de Usuarios</button>
          </div>

          {/* Grupo 2 */}
          <div className="button-group">
            <h2>Outras Ferramentas</h2>
            <button onClick={() => alert('Botão 1 clicado!')}>Botão 1</button>
            <button onClick={() => alert('Botão 2 clicado!')}>Botão 2</button>
          </div>

          {/* Adicione mais grupos conforme necessário */}
        </div>

        {/* Exibe o modal Classes se showClasses for true */}
        {showClasses && <Classes onClose={() => setShowClasses(false)} />}

        {/* Exibe o modal UserClasses se showUserClasses for true */}
        {showUserClasses && <UserClasses onClose={() => setShowUserClasses(false)} />}
      </div>
    </div>
  );
}

export default FerramentasADM;