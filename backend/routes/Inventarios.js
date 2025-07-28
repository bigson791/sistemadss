const express = require('express');
const router = express.Router();
const MovimientoInventario = require('../models/Inventario');
const mongoose = require('mongoose');

// Obtener stock actual por producto
// router.get('/inventario/:idProducto', async (req, res) => {
//     const { idProducto } = req.params;

//     const resultado = await MovimientoInventario.aggregate([
//         { $match: { producto: new mongoose.Types.ObjectId(idProducto) } },
//         {
//             $group: {
//                 _id: '$producto',
//                 totalEntradas: {
//                     $sum: {
//                         $cond: [{ $eq: ['$tipo', 'entrada'] }, '$cantidad', 0]
//                     }
//                 },
//                 totalSalidas: {
//                     $sum: {
//                         $cond: [{ $eq: ['$tipo', 'salida'] }, '$cantidad', 0]
//                     }
//                 },
//                 totalAjustes: {
//                     $sum: {
//                         $cond: [{ $eq: ['$tipo', 'ajuste'] }, '$cantidad', 0]
//                     }
//                 }
//             }
//         },
//         {
//             $project: {
//                 stock: {
//                     $add: [
//                         '$totalEntradas',
//                         '$totalAjustes',
//                         { $multiply: ['$totalSalidas', -1] }
//                     ]
//                 }
//             }
//         }
//     ]);

//     res.json(resultado[0] || { stock: 0 });
// });

// routes/inventario.js
router.post('/movimientos', async (req, res) => {
    const movimiento = new MovimientoInventario(req.body);
    await movimiento.save();
    res.json({ ok: true, movimiento });
});


router.get('/inventario/:idProducto', async (req, res) => {
    const { idProducto } = req.params;
    const { inicio, fin } = req.query;

    // Filtro base por producto
    const match = {
        producto: new mongoose.Types.ObjectId(idProducto)
    };

    // Agregar filtro por rango de fechas si vienen los parámetros
    if (inicio || fin) {
        match.fecha = {};
        if (inicio) match.fecha.$gte = new Date(inicio + 'T00:00:00.000Z');

        if (fin) match.fecha.$lte = new Date(fin + 'T23:59:59.999Z');
    }

    console.log(inicio);
    console.log(fin);
    console.log(match);
    try {
        const resultado = await MovimientoInventario.aggregate([
            { $match: match },
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
        console.log(resultado);
        res.json(resultado[0] || { stock: 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al consultar inventario' });
    }
});

router.get('/movimientos/:idProducto', async (req, res) => {
  const { idProducto } = req.params;
  const { inicio, fin } = req.query;

  const filtro = { producto: idProducto };

  if (inicio || fin) {
    filtro.fecha = {};
    if (inicio) filtro.fecha.$gte = new Date(inicio + 'T00:00:00.000Z');
    if (fin) filtro.fecha.$lte = new Date(fin + 'T23:59:59.999Z');
  }

  try {
    const movimientos = await MovimientoInventario.find(filtro).populate('producto');
    res.json(movimientos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
});
    
module.exports = router;