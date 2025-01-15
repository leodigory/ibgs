import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '10px' }}>
      <h3>Menu</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/members">Membros</Link>
        </li>
        <li>
          <Link to="/services">Serviços</Link>
        </li>
      </ul>
    </div>
  );
}