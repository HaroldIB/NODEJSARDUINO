//cheking correct usage of application
/*if(process.argv[2]==undefined){
    global.console.log("Usage: node aplication.js <COM#>");
    process.exit(1);
}
let portCom = process.argv[2];*/
//Dependencias de los modulos
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(__dirname + '/public'));

server.listen(4000, () => {
    console.log('servidor en el puerto 4000')
})

//Serial Port
const { SerialPort } = require('serialport');

const { ReadlineParser } = require('@serialport/parser-readline');

const serialPort = new SerialPort({ 
    path: "COM3",
    baudRate: 115200
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))

parser.on('open', function(){
    console.log('La conección está abierta');
})

parser.on('data', function(data){
    console.log(data);
    io.emit('arduinoMessage',data.toString());
})
//Errores
parser.on('error',(err)=>console.log(err));
serialPort.on('error',(err)=>console.log(err));
