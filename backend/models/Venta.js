const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  producto: String,
  cliente: String,
  cantidad: Number,
  total: Number,
  fecha: Date
});

module.exports = mongoose.model('Venta', ventaSchema);