var mongoose = require('mongoose'),
	Schema=mongoose.Schema;

var serietv =new Schema({
	titulo: String,
	temporadas: Number,
	pais: String,
	genero:{
		type:String,
		enum: ['comedia','fantacia','drama']
	}
});
module.exports= mongoose.model('Serietv', serietv);
