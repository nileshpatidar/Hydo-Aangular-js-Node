var mongoose = require('mongoose');
var Schema = mongoose.Schema;

PhotoSchema = new Schema( {
    UserId: String,
    AlbumId: String,
    PhotosId: String,
    Name: String,
	image1:String,
	image2:String,
	image3:String,
	image4:String,
	image5:String,
	image6:String,
	
}),
Photos = mongoose.model('Photos', PhotoSchema);

module.exports = Photos;