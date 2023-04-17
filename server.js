require('dotenv').config()
let cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')

mongoose.set('strictQuery', false) //Evitar el mensaje de deprecación
mongoose.connect(process.env.CONNECTION_STRING)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conectado a la base de datos'))

app.use(express.json())

app.use(cors())

const pacientesRouter = require('./rutas/pacientes')
app.use('/pacientes', pacientesRouter)

const registrosRouter = require('./rutas/registros')
app.use('/registros', registrosRouter)

app.listen(port, () => console.log('Servidor iniciado en el puerto', port))