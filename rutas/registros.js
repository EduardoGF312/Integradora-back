const express = require('express')
const Registro = require('../modelos/registro')
const router = express.Router()

router.post('/', async(req, res) =>{

    const {fecha, nombre, apellido, oximetria, frecuencia,  temperatura, observaciones} = req.body

    const registro = new Registro({
        fecha: fecha,
        nombre: nombre,
        apellido: apellido,
        oximetria: oximetria,
        frecuencia: frecuencia,
        temperatura: temperatura,
        observaciones: observaciones
    })
    try {
        const nuevoRegistro = await registro.save()
        res.status(201).json(nuevoRegistro)
    }catch (err){
        res.status(400).json({mensaje: err.mensaje})
    }
})

router.get('/', async(req,res) =>{
    try {
        const registros = await Registro.find().sort('-1')
        res.json(registros)
        
    } catch (err) {
        res.status(500).json({mensaje: err.message})
        
    }

})

router.get('/ver/:id', getRegistro, (req, res) =>{
    res.json(res.registro)
})

router.delete('/eliminar/:id', async(req, res) =>{
    const {id} = req.params
    try{
        const eliminarRegistro = await Registro.deleteOne({_id: id})
        res.json(eliminarRegistro)
    }catch (err){
        res.status(500).json({mensaje: err.message})
    }
})

//Función media para obtener registro por id
async function getRegistro(req, res, next){
    let registro
    try {
        registro = await Registro.findById(req.params.id)
        if (registro == null){
            return res.status(404).json({mensaje: 'No se pudo encontrar el registro'})
        }
    } catch (error) {
        return res.status(500).json({mensaje: error.message})
    }

    res.registro = registro
    next()
}

module.exports = router