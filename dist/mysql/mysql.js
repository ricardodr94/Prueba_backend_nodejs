"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log("Clase inicializada");
        this.conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "prueba_angular_kubbox"
        });
        this.conectarDB();
    }
    //metodo para obtener la instancia de clase
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    //metodo de consulta a base de datos
    static ejecutarQuery(query, callback) {
        this.instance.conn.query(query, (err, results, fields) => {
            if (err) {
                console.log("Error en query");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback("El registro solicitado no existe");
            }
            else {
                callback(null, results);
            }
        });
    }
    //Metodo de validacion de conexion a base de datos
    conectarDB() {
        this.conn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log("conexion exitosa a Base de datos");
        });
    }
}
exports.default = MySQL;
