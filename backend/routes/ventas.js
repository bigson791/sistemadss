const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');

// Todas las ventas
router.get('/', async (req, res) => {
  const ventas = await Venta.find();
  res.json(ventas);
});

// Productos más vendidos
router.get('/top-productos', async (req, res) => {
  const top = await Venta.aggregate([
    { $group: { _id: "$producto", total: { $sum: "$cantidad" } } },
    { $sort: { total: -1 } },
    { $limit: 5 }
  ]);
  res.json(top);
});

// Clientes principales
router.get('/top-clientes', async (req, res) => {
  const top = await Venta.aggregate([
    { $group: { _id: "$cliente", total: { $sum: "$total" } } },
    { $sort: { total: -1 } },
    { $limit: 5 }
  ]);
  res.json(top);
});

// Ventas mensuales
router.get('/ventas-mensuales', async (req, res) => {
  const datos = await Venta.aggregate([
    {
      $group: {
        _id: { $month: "$fecha" },
        total: { $sum: "$total" }
      }
    },
    { $sort: { "_id": 1 } }
  ]);
  res.json(datos);
});

// Total de ventas por canal (origen)
router.get('/origenes', async (req, res) => {
  try {
    const resultado = await Venta.aggregate([
      {
        $group: {
          _id: "$origen",
          total: { $sum: "$total" }
        }
      },
      { $sort: { total: -1 } }
    ]);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Total por tipo de pago
router.get('/metodos-pago', async (req, res) => {
  try {
    const resultado = await Venta.aggregate([
      {
        $group: {
          _id: "$tipoPago",
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;