import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

export default function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Barra lateral */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Informações do usuário */}
        <UserInfo />

        {/* Conteúdo dinâmico (rotas) */}
        <Outlet />
      </div>
    </div>
  );
}