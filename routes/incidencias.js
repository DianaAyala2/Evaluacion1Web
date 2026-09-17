const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasController')

router.post('/incidencias', controller.registrar);
router.get('/incidencias', controller.listar);
router.get('/incidencias', controller.buscarPorId);
router.put('incidencias/:id/estado', controller.cambiarEstado);
router.delete('/incidencias/:id', controller.eliminar);

router.get('/incidencias/:id/clasificacion', controller.clasificacion);
router.get('/estadisticas', controller.estadisticas);

module.exports = router;