import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/adminDashboard.css';

// Accept onLogout prop to match sidebar footer logout action
function AtletaNavbar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/home', icon: 'home.png' },
    { name: 'Progreso', path: '/progreso', icon: 'progreso.png' },
    { name: 'Nutrición', path: '/nutricion', icon: 'nutricion.png' },
    { name: 'Rutina', path: '/rutina', icon: 'rutina.png' },
    { name: 'Calendario', path: '/calendario', icon: 'calendario.png' },
    { name: 'Asistencia', path: '/asistencia', icon: 'asistencia.png' }
  ];

  return (
    <nav className="admin-sidebar atleta-sidebar">
      
      <div className="sidebar-logo-container">
        <img
          src="/logo.png"
          alt="Lifting Up"
          className="admin-logo"
        />
      </div>

      <div className="sidebar-menu">
        {navItems.map((item) => (
          <button
            key={item.name}
            type="button"
            className={`sidebar-item ${location.pathname === item.path ? 'activo' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <img
              src={`/icons/atleta/${item.icon}`}
              alt={item.name}
              className="sidebar-icon-img"
            />
            <span className="sidebar-text">{item.name}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-item logout-btn"
          onClick={onLogout}
        >
          <img
            src="/icons/admin/cerrar-sesion.png"
            alt=""
            className="sidebar-icon-img"
          />
          <span className="sidebar-text">
            Cerrar sesión
          </span>
        </button>
      </div>

    </nav>
  );
}

export default AtletaNavbar;
