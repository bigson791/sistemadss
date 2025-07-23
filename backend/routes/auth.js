// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/Usuario'); // tu modelo usuarios
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { nombreUsuario, contrasena } = req.body;
  const user = await User.findOne({ nombreUsuario });

  if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

  // Aquí comparas contraseñas (ideal: usar bcrypt)
  if (user.contrasena !== contrasena) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  const datosUsuario = user.nombres+' '+ user.apellidos;
  // Crear token JWT (usa una secret en variables de entorno)
  const token = jwt.sign(
    { id: user._id, nombreUsuario: user.nombreUsuario, tipoUsuario: user.tipoUsuario },
    'hWH48ER1AST2SD',
    { expiresIn: '2h' }
  );

  res.json({ token, nombre: datosUsuario });
});

module.exports = router;
