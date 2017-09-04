module.exports= function(app){
var Registros =require ('./registro');
/*
  var io = require('socket.io')(server);
  io.sockets.on('connection', function(socket) {
    setInterval(function(){
        var date = new Date().getTime();
        var temp = Math.random()*20;
        if((temp>=10 && temp <=20) && temp!=aux){
          socket.emit('temperatureUpdate', date, temp);
        }
    }, 2000);
  });*/

	//Get
	findAllregistos =function(req,res){
		Registros.find(function(err,registroS){
			if(!err)res.send(registroS);
			else console.log('error'+err);
			var str=""+registroS+"";
			var ress = str.split(",");
			console.log("variable str  "+ress[2]);
		});
	};

	//GET
	findByID =function(req, res){
		Registros.findById(req.params.id,function(err, registroS){
			if(!err) res.send(registroS);
			else console.log('error'+err);
		});
	};

	//post
	addRegistroTv =function(req,res){
		console.log('POST');
		console.log(req.body);
		var registroS=new Registros({
			idTipo: req.body.idTipo,
			dia: req.body.dia,
			mes: req.body.mes,
			año: req.body.año,
			hora: req.body.hora,
			porcentaje: req.body.porcentaje
		});

		registroS.save(function(err){
			if(!err) console.log('series guardada');
			else console.log('error'+err);
		});
		res.send(registroS);
	};


	//rutas API
	app.get('/VER', findAllregistos);
	app.get('/seriestv/:id',findByID);
	app.post('/AGREGAR', addRegistroTv);

}
