const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  correo: String,
  direccion: String,
  contacto: String,
  fechaIngreso: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proveedor', proveedorSchema);