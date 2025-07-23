const express = require('express');
const mongoose = require('mongoose');
const ventasRoutes = require('./routes/ventas');
const clientesRoutes = require('./routes/Clientes');
const productosRoutes = require('./routes/Productos'); 
const proveedoresRoutes = require('./routes/Proveedores');
const usuarios = require('./routes/usuarios');
const authRoutes = require('./routes/auth'); // Importar rutas de autenticación
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'));

app.use('/api/ventas', ventasRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/usuarios', usuarios);
app.use('/api/login', authRoutes); 

app.listen(3000, () => {
  console.log('Servidor DSS en http://localhost:3000');
});