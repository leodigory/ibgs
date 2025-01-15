import { useAuth } from '../context/AuthContext'; // Supondo que você tenha um contexto de autenticação

export default function UserInfo() {
  const { user } = useAuth(); // Obtém o usuário do contexto

  return (
    <div>
      <h3>Informações do Usuário</h3>
      {user ? (
        <div>
          <p>Nome: {user.name}</p>
          <p>E-mail: {user.email}</p>
        </div>
      ) : (
        <p>Nenhum usuário logado.</p>
      )}
    </div>
  );
}