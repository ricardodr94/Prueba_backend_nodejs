import mysql = require('mysql');


export default class MySQL {

    //metodo singleton para una unica instancia
    private static _instance: MySQL;

    conn: mysql.Connection;
    conectado: boolean = false;

    constructor(){
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
    public static get instance(){
       return this._instance || ( this._instance = new this());

    }


    //metodo de consulta a base de datos
    static ejecutarQuery( query:string, callback:Function ){
       
        this.instance.conn.query( query, ( err, results:Object[], fields )=>{
           
            if( err ){
                console.log("Error en query");
                console.log(err);
                return callback( err );
            }

            if( results.length === 0 ){
              callback("El registro solicitado no existe");
            }else{
                callback( null, results );
            }
        });
    }


    //Metodo de validacion de conexion a base de datos
    private conectarDB(){
        this.conn.connect((err: mysql.MysqlError )=>{

            if (err) {
                console.log(err.message);
                return;
            }

            this.conectado = true;
            console.log("conexion exitosa a Base de datos");
        });
    }

    


}