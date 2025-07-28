const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const MovimientoInventario  = require('../models/Inventario');

router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

router.post('/', async (req, res) => {
  try {
    const nuevo = new Producto(req.body);
    const productoGuardado = await nuevo.save();
    const movimiento = new MovimientoInventario({
      producto: productoGuardado._id,
      tipo: 'creacion',
      cantidad: 0,
      observacion: 'Producto creado'
    });
    await movimiento.save();
    res.json({ ok: true, id: productoGuardado._id, producto: productoGuardado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      req.body,
      { new: true });
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ ok: true, producto: productoActualizado });

  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
  // console.log(id);
  // const productoActualizado = await Producto.find({ _id: id });
  // console.log(productoActualizado);
  // if (productoActualizado.length === 0) {
  //   return res.status(404).json({ error: 'Producto no encontrado' });
  // }
  // await Producto.updateOne({_id: id }, req.body);
  // res.json({ ok: true });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const productoEliminado = await Producto.findByIdAndDelete(id);
  if (!productoEliminado) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json({ ok: true });
});


module.exports = router;
