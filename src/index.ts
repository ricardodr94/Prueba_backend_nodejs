import MySQL from "./mysql/mysql";
import router from "./router/router";
import Server from "./server/server";

const server = Server.init( 3000 );

//rutas
server.app.use( router );

//MySQL instancia
//MySQL.instance;

server.start( ()=>{
    console.log("servidor corriendo en el puerto 3000");
});

