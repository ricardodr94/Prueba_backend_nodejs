import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

//ruta de consulta de tabla usuarios
router.get('/usuarios', ( req:Request, res:Response) =>{
    
    const query = `
         SELECT nombre, cedula
         FROM usuario
    `;

    MySQL.ejecutarQuery( query, (err:any, usuario:Object[] )=>{
        if(err){
           res.status(400).json({
               err: false,
               error: err
           });
        }else{
            res.json({
                ok: true,
                usuario: usuario
            });
        }
    });
    
   
});


//ruta de consulta de tabla puntos de ventas
router.get('/puntos_venta', ( req:Request, res:Response) =>{
    
    const query = `
         SELECT nombre, ciudad
         FROM puntos_venta
    `;

    MySQL.ejecutarQuery( query, (err:any, puntos_venta:Object[] )=>{
        if(err){
           res.status(400).json({
               err: false,
               error: err
           });
        }else{
            res.json({
                ok: true,
                puntos_venta: puntos_venta
            });
        }
    });
    
   
});

//ruta de consulta de tabla asignacion
router.get('/asignacion', ( req:Request, res:Response) =>{
    
    const query = `
         SELECT porcentaje
         FROM asignacion 
    `;

    MySQL.ejecutarQuery( query, (err:any, asignacion:Object[] )=>{
        if(err){
           res.status(400).json({
               err: false,
               error: err
           });
        }else{
            res.json({
                ok: true,
                asignacion: asignacion
            });
        }
    });
    
   
});



router.get('/usuariosPtventa', ( req:Request, res:Response) =>{
    
    const query = `
    SELECT usu.nombre nombre_usuario, usu.cedula cedula_usuario, pven.nombre nombre_pventa, pven.ciudad ciudad_pventa, asig.porcentaje porcentaje
    FROM usuario usu, puntos_venta pven, asignacion asig 
    WHERE usu.id=asig.id_cedula AND pven.id=asig.id_ptventa
    `;

    MySQL.ejecutarQuery( query, (err:any, results:Object[] )=>{
        if(err){
           res.status(400).json({
               err: false,
               error: err
           });
        }else{
            res.json({
                ok: true,
                results: results
            });
        }
    });
    
   
});

export default router;
