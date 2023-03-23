const mongoose = require('mongoose')

const pacienteSchema = new mongoose.Schema({
    fecha: String,
    nombre: String,
    apellido: String,
    genero: String,
    edad: Number,
    carrera: String,
    cuatrimestre: Number,
    grupo: String,
    padecimiento: String,
    medicamento: String,
    observaciones: String
})

module.exports =  mongoose.model("paciente", pacienteSchema)