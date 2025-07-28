const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombres: String,
  apellidos: String,
  direccion: String,
  nit: String,
  correo: String,
  telefono: String,
  fechaIngreso: { type: Date, default: Date.now },
  fechaActualizacion: Date,
  estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
  totalPedidos: { type: Number, default: 0 }
});

module.exports = mongoose.model('Cliente', clienteSchema);
