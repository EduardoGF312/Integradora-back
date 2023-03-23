const express = require('express')
const Paciente = require('../modelos/paciente')
const router = express.Router()

router.post('/', async(req, res) =>{

    const {fecha, nombre, apellido, genero, edad, carrera, cuatrimestre, grupo, padecimiento, medicamento, observaciones} = req.body

    const paciente = new Paciente({
        fecha: fecha,
        nombre: nombre,
        apellido: apellido,
        genero: genero,
        edad: edad,
        carrera: carrera,
        cuatrimestre: cuatrimestre,
        grupo: grupo,
        padecimiento: padecimiento,
        medicamento: medicamento,
        observaciones: observaciones  
    })
    try {
        const nuevoPaciente = await paciente.save()
        res.status(201).json(nuevoPaciente)
    }catch (err){
        res.status(400).json({mensaje: err.mensaje})
    }
})

router.get('/', async(req,res) =>{
    try {
        const pacientes = await Paciente.find().sort('-1')
        res.json(pacientes)
        
    } catch (err) {
        res.status(500).json({mensaje: err.message})
        
    }

})

module.exports = router