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
router.get('/ver/:id', getPaciente, (req, res) =>{
    res.json(res.paciente)
})

router.delete('/eliminar/:id', async(req, res) =>{
    const {id} = req.params
    try{
        const eliminarPaciente = await Paciente.deleteOne({_id: id})
        res.json(eliminarPaciente)
    }catch (err){
        res.status(500).json({mensaje: err.message})
    }
})

router.patch('/modificar/:id', getPaciente, async(req, res) =>{ 
    const {fecha, nombre, apellido, genero, edad, carrera, cuatrimestre, grupo, padecimiento, medicamento, observaciones} = req.body

    res.paciente.fecha = fecha
    res.paciente.nombre = nombre
    res.paciente.apellido = apellido
    res.paciente.genero = genero
    res.paciente.edad = edad
    res.paciente.carrera = carrera
    res.paciente.cuatrimestre = cuatrimestre
    res.paciente.grupo = grupo
    res.paciente.padecimiento = padecimiento
    res.paciente.medicamento = medicamento
    res.paciente.observaciones = observaciones

    res.json(res.paciente)

    res.paciente.save()
})

//Función media para obtener paciente por id
async function getPaciente(req, res, next){
    let paciente
    try {
        paciente = await Paciente.findById(req.params.id)
        if (paciente == null){
            return res.status(404).json({mensaje: 'No se pudo encontrar al paciente'})
        }
    } catch (error) {
        return res.status(500).json({mensaje: error.message})
    }

    res.paciente = paciente
    next()
}

module.exports = router