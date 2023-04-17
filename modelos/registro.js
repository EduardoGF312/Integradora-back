const mongoose = require('mongoose')

const registroSchema = new mongoose.Schema({
    fecha: String,
    nombre: String,
    apellido: String,
    oximetria: Number,
    frecuencia: Number,
    // temperatura: Number,
    observaciones: String
})

module.exports =  mongoose.model("registro", registroSchema)