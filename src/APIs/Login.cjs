require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();

const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('12345', 10), role: 'Admin' },
  { id: 2, username: 'user', password: bcrypt.hashSync('12345', 10), role: 'User' }
];

const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key';

// Middleware de seguridad
app.use(helmet());  // Protege con encabezados de seguridad
app.use(xss());  // Limpia las entradas para prevenir XSS
app.use(cors({
  origin: '*', 
  //origin: 'http://localhost:5174',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Limitar solicitudes para prevenir DoS
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // 100 solicitudes por IP
  message: 'Demasiadas solicitudes, por favor intente nuevamente más tarde.'
});

app.use(limiter);

app.use(express.json());

// Endpoint de login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // Comparar la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // Crear el JWT
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2m' });

  res.json({ access_token: token });
});

// Endpoint protegido
app.get('/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Acceso autorizado', user: decoded });
  } catch (err) {
    return res.status(401).json({ message: 'Token no válido o expirado' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});