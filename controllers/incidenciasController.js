const { validarCadena } = require('../utils/helpers');

const incidencias = [];
let nextId = 1;

const registrarIncidencia = (req, res) => {
    const {empleado, area, descripcion, prioridad} = req.body;
    const nuevaIncidencia = {
        id: nextId,
        empleado: empleado,
        area: area,
        descripcion: descripcion,
        prioridad: prioridad,
        estado: "Pendiente" // Estado por defecto según el PDF
    };
    incidencias.push(nuevaIncidencia);
    nextId++;
    res.status(201).json({mensaje: "Incidencia registrada"});
};

const listarIncidencias = (req, res) => {
    res.json(incidencias);
};

const buscarIncidencia = (req, res) => {
    const id = parseInt(req.params.id);
    //ayuda a buscar el objeto creado
    const incidencia = incidencias.find(i => i.id === id);
    
    if(incidencia){
        res.json(incidencia);
    }else{
        res.status(404).json({mensaje: "Incidencia no encontrada"});
    
    }
};

const cambiarEstado = (req, res) => {
    const id = parseInt(req.params.id);
    const {estado} = req.body;
    const incidencia = incidencias.find(i => i.id === id);

    if(!incidencia){
        return res.status(404).json({mensaje: "Incidencia no encontrada"});

    }

    let estadoValido = false;
    let nuevoEstado = estado.trim();

    switch( nuevoEstado.toLowerCase()){
        case 'pendiente':
        case 'en proceso':
        case 'resuelta':
        case  'cancelada':
            estadoValido = true;
            break;
            default:
            estadoValido = false;
    }

    if (estadoValido){
        incidencia.estado = nuevoEstado;
        res.json({ mensaje: "Estado actualizado", incidencia});
    } else {
        res.status(400).json({ mensaje: "Estado inválido" });
    }

};

const eliminarIncidencia = (req, res) => {
    const id = parseInt(req.params.id);
    const index = incidencias.findIndex(i => i.id === id);

    if(index != -1){
        incidencias.splice(index, 1);
        res.json({ mensaje: "Incidencia eliminada correctamente"});
    } else {
        res.status(404).json({ mensaje: "Incidenci no encontrada"});
    }
};

const obtenerEstadisticas = (req, res) => {
    res.json({
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter( i => i.estado.toLowerCase() === 'pendiente').length,
        enProceso: incidencias.filter(i => i.estado.toLowerCase() === 'en proceso').length,
        resueltas: incidencias.filter(i => i.estado.toLowerCase() === 'resuelta').length,
        canceladas: incidencias.filter(i => i.estado.toLowerCase() === 'cancelada').length
    });
};

const clasificarPrioridad = (req, res) => {
    const id = parseInt(req.params.id);
    const incidencia = incidencias.find( i => i.id === id);

    if (!incidencia){
        return res.status(404).json({ mensaje: "Incidencia no encontrada"});
    }

    let clasificacion = "";
    switch (incidencia.prioridad.toLowerCase()) {
        case 'alta':
            clasificacion = "Crítica";
            break;
        case 'media':
            clasificacion = "Importante";
            break;
        case 'baja':
            clasificacion = "Normal";
            break;
        default: 
        clasificacion = "Desconocida";  
    }
    res.json({
        id: incidencia.id,
        clasificacion: clasificacion
    });
};

module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidencia,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarPrioridad
};