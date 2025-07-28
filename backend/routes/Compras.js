const express = require('express');
const router = express.Router();
const compra = require('../models/Compra');
const MovimientoInventario = require('../models/Inventario');

router.post('/', async (req, res) => {
    try {
        const nuevaCompra = new compra(req.body);
        let compraGuardada = await nuevaCompra.save();
        if (compraGuardada.tipoCompra === 'articulo') {
            compraGuardada.detalleCompra.forEach(async (element) => {
                const movimiento = new MovimientoInventario({
                    producto: element.idProducto,
                    tipo: 'entrada',
                    cantidad: element.cantidad,
                    observacion: 'Compra registrada'
                });
                movimiento.save();
            });
        }
        res.status(201).json(nuevaCompra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const compras = await compra.find();
        res.status(200).json(compras);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const compraActualizada = await compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!compraActualizada) return res.status(404).json({ error: 'Compra no encontrada' });
        res.json(compraActualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const compraEliminada = await compra.findByIdAndDelete(req.params.id);
        if (!compraEliminada) return res.status(404).json({ error: 'Compra no encontrada' });
        res.json({ mensaje: 'Compra eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar compra' });
    }
});
module.exports = router;