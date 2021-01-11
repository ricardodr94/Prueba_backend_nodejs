"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
//ruta de consulta de tabla usuarios
router.get('/usuarios', (req, res) => {
    const query = `
         SELECT nombre, cedula
         FROM usuario
    `;
    mysql_1.default.ejecutarQuery(query, (err, usuario) => {
        if (err) {
            res.status(400).json({
                err: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                usuario: usuario
            });
        }
    });
});
//ruta de consulta de tabla puntos de ventas
router.get('/puntos_venta', (req, res) => {
    const query = `
         SELECT nombre, ciudad
         FROM puntos_venta
    `;
    mysql_1.default.ejecutarQuery(query, (err, puntos_venta) => {
        if (err) {
            res.status(400).json({
                err: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                puntos_venta: puntos_venta
            });
        }
    });
});
//ruta de consulta de tabla asignacion
router.get('/asignacion', (req, res) => {
    const query = `
         SELECT porcentaje
         FROM asignacion 
    `;
    mysql_1.default.ejecutarQuery(query, (err, asignacion) => {
        if (err) {
            res.status(400).json({
                err: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                asignacion: asignacion
            });
        }
    });
});
router.get('/usuariosPtventa', (req, res) => {
    const query = `
    SELECT usu.nombre nombre_usuario, usu.cedula cedula_usuario, pven.nombre nombre_pventa, pven.ciudad ciudad_pventa, asig.porcentaje porcentaje
    FROM usuario usu, puntos_venta pven, asignacion asig 
    WHERE usu.id=asig.id_cedula AND pven.id=asig.id_ptventa
    `;
    mysql_1.default.ejecutarQuery(query, (err, results) => {
        if (err) {
            res.status(400).json({
                err: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                results: results
            });
        }
    });
});
exports.default = router;
