const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  nombreUsuario: { type: String, unique: true, required: true },
  contrasena: String,
  correo: String,
  telefono: String,
  tipoUsuario: String,
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
