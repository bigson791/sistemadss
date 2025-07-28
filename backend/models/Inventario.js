const mongoose = require('mongoose');

const MovimientoInventarioSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    tipo: { type: String, enum: ['creacion','entrada', 'salida', 'ajuste'], required: true },
    cantidad: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    observacion: String
});

module.exports = mongoose.model('MovimientoInventario', MovimientoInventarioSchema);
