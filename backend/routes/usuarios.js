const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.get('/', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json({ ok: true, mensaje: 'Usuario creado' });
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('ID del usuario a actualizar:', id);
  const usuario = await Usuario.findById(id);
  if (!usuario) {
    return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
  }
  try {
    if (usuario.nombreUsuario === 'admin') {
      return res.status(403).json({ ok: false, mensaje: 'No se puede actualizar el usuario admin' });
    }
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
    if (!usuarioActualizado) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
    }
    res.json({ ok: true, mensaje: 'Usuario actualizado', usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('ID del usuario a eliminar:', id);
  try {
    const usuario = await Usuario.findById(id);
    if (usuario.nombreUsuario === 'admin') {
      return res.status(403).json({ ok: false, mensaje: 'No se puede eliminar el usuario admin' });
    }
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
    }
    res.json({ ok: true, mensaje: 'Usuario eliminado', usuario: usuarioEliminado });
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
