const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController')

router.post('/incidencias', controller.registrarIncidencia);
router.get('/incidencias', controller.listarIncidencias);
router.get('/incidencias/:id', controller.buscarIncidencia);
router.put('/incidencias/:id/estado', controller.cambiarEstado);
router.delete('/incidencias/:id', controller.eliminarIncidencia);

router.get('/incidencias/:id/clasificacion', controller.clasificarPrioridad);
router.get('/estadisticas', controller.obtenerEstadisticas);

module.exports = router;