module.exports= function(app){
var Seriestv =require ('./serietv');
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
	findAllSeries =function(req,res){
		Seriestv.find(function(err,seriestv){
			if(!err)res.send(seriestv);
			else console.log('error'+err);
			var str=""+seriestv+"";
			var ress = str.split(",");
			console.log("variable str  "+ress[2]);
		});
	};

	//GET
	findByID =function(req, res){
		Seriestv.findById(req.params.id,function(err, serietv){
			if(!err) res.send(serietv);
			else console.log('error'+err);
		});
	};

	//post
	addSeriesTv =function(req,res){
		console.log('POST');
		console.log(req.body);
		var serietv=new Seriestv({
			titulo: req.body.titulo,
			temporadas: req.body.temporadas,
			pais: req.body.pais,
			genero: req.body.genero
		});

		serietv.save(function(err){
			if(!err) console.log('series guardada');
			else console.log('error'+err);
		});
		res.send(serietv);
	};



	//PUT UPDATE
	updateSeries= function(req,res){
		Seriestv.findById(req.params.id,function(err,serietv){
			serietv.titulo=req.body.titulo;
			serietv.temporadas=req.body.temporadas;
			serietv.pais=req.body.pais;
			serietv.genero=req.body.genero;
				serietv.save(function(err){
				if(!err) console.log('series Actualizada');
				else console.log('error'+err);
			})
		});
	};
	//DELETE
	deleteSeries=function(req,res){
		Seriestv.findById(req.params.id, function(err,serietv){
			serietv.remove(function(err){
				if(!err) console.log('series borrada');
				else console.log('error'+err);
			})
		});
	}

	//rutas API
	app.get('/VER', findAllSeries);
	app.get('/seriestv/:id',findByID);


	app.post('/AGREGAR', addSeriesTv);



	app.put('/seriestv/:id',updateSeries);
	app.delete('/seriestv/:id',deleteSeries);
}
