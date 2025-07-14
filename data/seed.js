const mongoose = require('mongoose');
const Venta = require('../backend/models/Venta');
mongoose.connect('mongodb://localhost:27017/dss_ventas');

const ventas = [
  { producto: 'Laptop', cliente: 'Ana', cantidad: 2, total: 2000, fecha: new Date('2024-01-05') },
  { producto: 'Mouse', cliente: 'Luis', cantidad: 5, total: 100, fecha: new Date('2024-01-10') },
  { producto: 'Teclado', cliente: 'Ana', cantidad: 3, total: 150, fecha: new Date('2024-02-15') },
  { producto: 'Monitor', cliente: 'Carlos', cantidad: 1, total: 300, fecha: new Date('2024-03-20') },
  { producto: 'Laptop', cliente: 'Luis', cantidad: 1, total: 1000, fecha: new Date('2024-04-01') },
  { producto: 'Laptop', cliente: 'Mario', cantidad: 5, total: 5000, fecha: new Date('2024-05-01') },
];

Venta.insertMany(ventas).then(() => {
  console.log('Datos insertados');
  process.exit();
}); 