var mongoose = require('mongoose');
var Schema = mongoose.Schema;

albumSchema = new Schema( {
    AlbumId: String,
    UserId: String,
    Name: String,
	Date:{
		type: String
	}
}),
album = mongoose.model('album', albumSchema);

module.exports = album;