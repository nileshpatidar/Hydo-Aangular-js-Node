var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	UserId: String ,
	FirstName: String,
	LastName:String,
	PhoneNumber:Number,
	Date:{
		type: String
	}
}),
user = mongoose.model('user', userSchema);

module.exports = user;