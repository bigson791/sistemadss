const express = require('express');
const router = express.Router();
const MovimientoInventario = require('../models/Inventario');

// Obtener stock actual por producto
router.get('/inventario/:idProducto', async (req, res) => {
    const { idProducto } = req.params;

    const resultado = await MovimientoInventario.aggregate([
        { $match: { producto: new mongoose.Types.ObjectId(idProducto) } },
        {
            $group: {
                _id: '$producto',
                totalEntradas: {
                    $sum: {
                        $cond: [{ $eq: ['$tipo', 'entrada'] }, '$cantidad', 0]
                    }
                },
                totalSalidas: {
                    $sum: {
                        $cond: [{ $eq: ['$tipo', 'salida'] }, '$cantidad', 0]
                    }
                },
                totalAjustes: {
                    $sum: {
                        $cond: [{ $eq: ['$tipo', 'ajuste'] }, '$cantidad', 0]
                    }
                }
            }
        },
        {
            $project: {
                stock: {
                    $add: [
                        '$totalEntradas',
                        '$totalAjustes',
                        { $multiply: ['$totalSalidas', -1] }
                    ]
                }
            }
        }
    ]);

    res.json(resultado[0] || { stock: 0 });
});

// routes/inventario.js
router.post('/movimientos', async (req, res) => {
    const movimiento = new MovimientoInventario(req.body);
    await movimiento.save();
    res.json({ ok: true, movimiento });
});

module.exports = router;