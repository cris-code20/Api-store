const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Importación de rutas
const usersRouter = require('./routes/routerUser');
const categoriaRouter = require('./routes/catergoriaRouter');
const productRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const invoicesRouter = require('./routes/invoices');
const addressesRouter = require('./routes/addresses');
const authRouter = require('./routes/authRoutes');

// Usar rutas
app.use('/api/users', usersRouter);
app.use('/api/category', categoriaRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/addresses', addressesRouter);
app.use('/api/auth', authRouter);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
