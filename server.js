var express=require('express');
var path=require('path')
var app=express();
var server=require('http').Server(app);
var io=require('socket.io')(server);



var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB0', {
	baudRate: 9600
});



var mensajes = [{
	text: "Hola soy un mensaje",
}];

app.use(express.static('public'));
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'plantillas','/index.html')))

io.on('connection', function(socket) {
	console.log('Alguien se ha conectado con Sockets');
	socket.emit('mensajes', mensajes);

	
port.on('data', function (data) {
	console.log('Data:', data.toString()  );
	socket.emit('mensajes', [{text:data.toString()}]);
});



});

//port.on('data', function (data) {
//	console.log('Data:', data);
//	socket.emit('mensajes', mensajes);
//});



server.listen(3000, function() {
	console.log("Servidor corriendo en http://localhost:3000");
});
