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
  estado: String,
  totalPedidos: Number
});

module.exports = mongoose.model('Cliente', clienteSchema);
