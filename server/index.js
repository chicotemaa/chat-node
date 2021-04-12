let express = require('express');
let app = express();
let server = require('http').Server(app);
const io = require ( "socket.io" ) (server, { 
    cors: { 
      origen: 'http://192.168.1.67:6677' , 
      métodos: [ "GET" , "POST" ] 
    } 
  });
 
app.use(express.static('client'));
 
app.get('/home', function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
});
 
let message = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS ',
    nickname: 'Bot :'
}];
 
io.on('connection', function(socket){
    console.log("El cliente con IP: "+socket.handshake.address+" se ha conectado...");
 
    socket.emit('message', message);
 
    socket.on('add-message', function(data){
        message.push(data);
 
        io.sockets.emit('message', message);
    });
 
});
 
server.listen(6677, function(){
    console.log('Servidor está funcionando en http://localhost:6677');
});