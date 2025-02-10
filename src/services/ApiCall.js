// src/api.js
export const fetchServicios = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve([
          { id: 1, nombre: 'Emergencias 24/7' },
          { id: 2, nombre: 'Cirugías especializadas' },
          { id: 3, nombre: 'Consultas médicas' },
        ]);
      }, 1000)
    );
  };
  
  export const fetchEquipoMedico = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve([
          { id: 1, imagen: '/img/especialidad4.jpg', nombre: 'Dr. Juan Pérez', especialidad: 'Cardiología' },
          { id: 2, imagen: '/img/especialidad1.jpg', nombre: 'Dra. María Gómez', especialidad: 'Neurología' },
          { id: 3, imagen: '/img/especialidad2.jpg',nombre: 'Dr. Carlos Ruiz', especialidad: 'Pediatría' },
        ]);
      }, 1000)
    );
  };
  