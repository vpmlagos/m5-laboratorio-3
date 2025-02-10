import React, { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar el estado desde localStorage cuando la página se recarga
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedUser && storedToken && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
    
    setLoading(false);
  }, []);

  // Función para manejar el login
  const login = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role);
    
    setIsAuthenticated(true);
    setRole(user.role);
  };

  // Función para manejar el logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    setIsAuthenticated(false);
    setRole(null);
  };

  if (loading) {
    return <div className="loading-container">Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
