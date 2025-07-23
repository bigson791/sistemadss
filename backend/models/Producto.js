const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    codigo: String,
    nombre: String,
    precioCompra: Number,
    precioVenta: Number,
    fechaCompra: Date,
    fechaIngreso: { type: Date, default: Date.now },
    proveedor: String
});

module.exports = mongoose.model('Producto', productoSchema);
