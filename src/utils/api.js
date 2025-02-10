
const isTokenExpired = (token) => {
    if (!token) return true; 
  
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const currentTime = Date.now() / 1000; 
    return payload.exp < currentTime;
  };
  
  
  export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    if (!token || isTokenExpired(token)) {
      throw new Error('Token no válido o ha expirado'); 
    }
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
      ...options.headers,
    };
  
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Hubo un error con la solicitud');
    }
  };
  