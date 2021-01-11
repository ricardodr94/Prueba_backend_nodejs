"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
        // Configurar cabeceras y cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }
    static init(port) {
        return new Server(port);
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
    start(callback) {
        this.app.listen(this.port, callback());
        this.publicFolder();
    }
}
exports.default = Server;
