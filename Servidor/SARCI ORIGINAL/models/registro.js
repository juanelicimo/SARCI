var mongoose = require('mongoose'),
	Schema=mongoose.Schema;

var registro =new Schema({
	idTipo:{
		type:String,
		enum: ['dia','semana','año']
	},
	dia: String,
	mes: String,
	año: String,
	hora: String,
	porcentaje: Number
});
module.exports= mongoose.model('Registro', registro);
