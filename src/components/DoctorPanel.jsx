import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Suponiendo que estás usando React Router

const DoctorPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Log out el usuario
    navigate('/login'); // Redirigir a la pantalla de login
  };

  if (user?.role !== 'doctor') {
    // Si el usuario no está logueado o no tiene el rol de doctor, redirigir al login
    navigate('/login');
    return null;
  }

  return (
    <div className="container text-center">
      <h2>Bienvenido, Doctor {user?.name}</h2>
      <p>Este es tu panel de control.</p>
      <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default DoctorPanel;
