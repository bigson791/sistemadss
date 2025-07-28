const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');
const Cliente = require('../models/Cliente');
const movimientoInventario = require('../models/Inventario');

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

router.get('/:id', async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id);
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la venta' });
  }
});

// POST: Crear nueva venta
router.post('/', async (req, res) => {
  try {
    const nuevaVenta = new Venta(req.body);
    ventaRealizada = await nuevaVenta.save();
    await Cliente.updateOne(
      { _id: nuevaVenta.clienteid }, // asegúrate que cliente sea un ID
      { $inc: { totalPedidos: 1 } } // incrementar en 1
    );
    ventaRealizada.detalles.forEach(async (element) => {
      const movimiento = new movimientoInventario({
        producto: element.idProducto,
        tipo: 'salida',
        cantidad: element.cantidad,
        observacion: 'Venta registrada'
      });
      await movimiento.save();
    })
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear venta', detalle: error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const ventaActualizada = await Venta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!ventaActualizada) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(ventaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar venta', detalle: error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const ventaEliminada = await Venta.findByIdAndDelete(req.params.id);
    if (!ventaEliminada) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json({ mensaje: 'Venta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
});


module.exports = router;