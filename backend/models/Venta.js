const mongoose = require('mongoose');

const DetalleSchema = new mongoose.Schema({
  idProducto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subtotal: { type: Number, required: true }
}, { _id: false });

const ventaSchema = new mongoose.Schema({
  clienteid: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  producto: String,
  cliente: String,
  cantidad: Number,
  total: Number,
  fecha: { type: Date, default: Date.now },
  origen: String,
  tipoPago: String,
  cuotas: Number,
  detalles: [DetalleSchema]
});

module.exports = mongoose.model('Venta', ventaSchema);