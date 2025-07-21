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

module.exports = router;
