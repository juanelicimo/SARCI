/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib');
/*codigo de mongoDB y variables*/
var mongoose=require('mongoose'); // variable de mongo
var app = express();//variable de express
var server = require('http').Server(app);
var io = require('socket.io')(server);
mongoose.connect('mongodb://localhost/seriestv',function(err,res){
  if(err) console.log('error'+err);
  else console.log('conexion BD realizada');
});

/************use y set************/
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.set('views', __dirname + '/controlles/views');//vistas
app.set('view engine', 'jade');//tecnologia de vistas
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/assets'));//vistas
// socket
//Cuando abramos el navegador estableceremos una conexión con socket.io.
//Cada 5 segundos mandaremos a la gráfica un nuevo valor.
io.sockets.on('connection', function(socket) {
  setInterval(function(){
      var date = new Date().getTime();
      var temp = Math.random()*20/1000;
      socket.emit('temperatureUpdate', date, temp);
    }, 2000);
});



//Getters
app.get('/', function (req, res) {
  res.render('index',
{title:'casadelarbol'}
  );
});
require('./models/routes')(app);
//escuchador
server.listen(80, function() {
    console.log('Servidor corriendo en http://localhost:80');
});
