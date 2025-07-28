const mongoose = require('mongoose');

const detalleCompraSchema = new mongoose.Schema({
    idProducto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    nombreProducto: String,
    precioCompra: { type: Number, required: true },
    cantidad: { type: Number, required: true },
}, { _id: false });

const compraSchema = new mongoose.Schema({
    idProveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
    nombreProveedor: String,
    serieFactura: String,
    numeroFactura: String,
    fechaFactura: Date,
    pago: { type: String, enum: ['efectivo', 'Credito',], required: true },
    retencionIsr: { type: Number, enum: [0, 5, 7], required: true },
    impuesto: { type: Number, enum: [0, 12], required: true },
    diasCredito: { type: Number, enum: [0, 15, 45, 60, 75, 90], required: true },
    fechaCompra: { type: Date, default: Date.now },
    observacion: String,
    tipoCompra: { type: String, enum: ['articulo', 'servicio'], required: true },
    detalleCompra: [detalleCompraSchema]
})

module.exports = mongoose.model('Compra', compraSchema);
