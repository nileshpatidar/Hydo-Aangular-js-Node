var express = require('express');
router = express.Router();
var user = require('../model/user');
var album = require('../model/album');
var photo = require('../model/photos');
  
var multer = require('multer');
var upload = multer({dest:'./public/uploads/'});
var fs = require('fs');
// save data  
router.post('/adduser',function(req,res){
    // console.log(req.body);
    user.create(req.body,function(err,docs){
        if(err) res.json(err);
        else{ 
           res.send(docs);
         }
    });
});

// // get all data from database
router.get('/getusers', function(req,res){
    user.find(function(err,doc){
    res.json(doc);

    })
})

router.get('/getusers', function(req,res){
    user.find(function(err,doc){
    res.json(doc);

    })
})

router.get('/getalbumuser', function(req,res){
    user.find(function(err,doc){
    res.json(doc);

    })
})

// // edit function for update value
router.get('/getbyuserid/:UserId', function (req, res) {
    var id = req.params.UserId;
    user.findOne({UserId: id}, function (err, doc) {
      res.json(doc);
    });
  });

 // data update 
router.post('/updateuser/:UserId' ,function(req,res){
    // console.log(req.body)
    var updatedata = {$set:{FirstName:req.body.FirstName,LastName:req.body.LastName,PhoneNumber:req.body.PhoneNumber}}
    user.updateOne({UserId: req.body.UserId},updatedata, function(err,docs){
        if(err) res.json(err);
        else{ 
           res.send(docs);
         }
    });
});
// data delete
router.delete('/deleteuserdata/:UserId', function(req,res){
        user.deleteOne({UserId:req.params.UserId}, function(data) {
            res.send(data);
        })
});



//********/ALBUM DATA APIs******* */
//********/ALBUM DATA APIs******* */
//********/ALBUM DATA APIs******* */

router.post('/addalbum/:User',function(req,res){
    // console.log(req.body,req.params.User);
    var album1 = new album({
        AlbumId : req.body.AlbumId ,
        Name: req.body.Name,
        Date : req.body.Date,
        UserId : req.params.User    
      });
    album1.save(function(err,docs){
        if(err) res.json(err);
        else{ 
           res.send(docs);
         }
    });
});

// // get all data from database
router.get('/getalbum', function(req,res){
    album.find(function(err,doc){
    res.json(doc);

    })
})
// // edit function for update value
router.get('/getbyalbumid/:AlbumId', function (req, res) {
    var id = req.params.AlbumId;
    album.findOne({AlbumId: id}, function (err, doc) {
      res.json(doc);
    });
  });

 // data update 
router.post('/updatealbum/:AlbumId' ,function(req,res){
    console.log(req.body)
    var myalbumdata = {$set:{Name:req.body.Name,Date:req.body.Date}}
    album.updateOne({AlbumId: req.body.AlbumId},myalbumdata, function(err,docs){
        if(err) res.json(err);
        else{ 
           res.send(docs);
         }
    });
});
// data delete
router.delete('/deletealbumdata/:AlbumId', function(req,res){
    // console.log(req.body.AlbumId);
        album.deleteOne({AlbumId:req.params.AlbumId}, function(data) {
            res.send(data);
        })
});

//*****save photos */
//*****save photos */
//*****save photos */


router.post('/image&details',upload.any(), function(req, res, next){
    console.log(req.body);
    if(req.files){
      var filename = [];
      req.files.forEach(function(file){
        filename.push((new Date).valueOf()+"-"+file.originalname);
        var filePath = (new Date).valueOf()+"-"+file.originalname;
        fs.rename(file.path, './public/uploads/' + filePath, function(err){
          if(err)throw err;
            });
      }
    );
           var product = new photo({
            UserId: req.body.User,
            AlbumId: req.body.Album,
            PhotosId: req.body.PhotosId,
            Name: req.body.Name,
                image1: filename[0],
                image2: filename[1],
                image3: filename[2],
                image4: filename[3],
                image5: filename[4],
                image6: filename[5]
           })

            product.save(function(err, result){
              if(err){
                console.log(err);
              }else{
              res.json(result);
              }
            });
          }
        });
        
        router.get('/getphotos', function(req,res){
            photo.find(function(err,doc){
            res.json(doc);
        
            })
        })

        router.get('/Photos/:AlbumId', function (req, res) {
            var id = req.params.AlbumId;
            photo.find({AlbumId:id}, function (err, doc) {
             if (err) throw err;
              res.json(doc);
            });
           })


        // // edit function for update value
        router.get('/getbyphotosid/:PhotosId', function (req, res) {
            var id = req.params.PhotosId;
            photo.findOne({PhotosId: id}, function (err, doc) {
              res.json(doc);
            });
          });
        
         // data update 
        router.post('/updatephoto/:PhotosId' ,function(req,res){
            console.log(req.body)
            var myalbumdata = {$set:{Name:req.body.Name,image1:req.body.image}}
            photo.updateOne({PhotosId: req.body.PhotosId},myalbumdata, function(err,docs){
                if(err) res.json(err);
                else{ 
                   res.send(docs);
                 }
            });
        });
        // data delete
        router.delete('/deletephotosdata/:PhotosId', function(req,res){
            // console.log(req.body.AlbumId);
            photo.deleteOne({PhotosId:req.params.PhotosId}, function(data) {
                    res.send(data);
                })
        });
        
module.exports = router;