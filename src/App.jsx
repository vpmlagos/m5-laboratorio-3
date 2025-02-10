import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MedicalTeam from './pages/MedicalTeam';
import Appointments from './pages/Appointments';
import ContactForm from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import DoctorPanel from './components/DoctorPanel';
import AdminPanel  from './PrivatePages/AdminPanel';
import DoctorsManagement from './PrivatePages/DoctorsManagement.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<ContactForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/equipo" element={<MedicalTeam />} />
            <Route path="/cita" element={<Appointments />} />
            <Route
              path="/admin-panel"
              element={
                <PrivateRoute requiredRoles={['Admin']}>
                  <AdminPanel />
                </PrivateRoute>
              }
            />
             <Route
              path="/admin-panel/gestion/medicos"
              element={
                <PrivateRoute requiredRoles={['Admin']}>
                  <DoctorsManagement />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
