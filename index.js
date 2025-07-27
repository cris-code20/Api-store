const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000


//middlewares
app.use(express.json());
app.use(cors())

// imporacion de las rutas

const usersRouter = require('./routes/routerUser')
const catergoriaRouter = require('./routes/catergoriaRouter')


//rutas
app.use('/api/users', require('./routes/routerUser'));
app.use('/api/category', require('./routes/catergoriaRouter'))
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/addresses', require('./routes/addresses'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
