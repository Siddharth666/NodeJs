var mysqlconn = require('../mySqlConnection');
var fileUpload = require('express-fileupload');

module.exports.myimages = (req, res)=>{
    console.log(req.body.value)
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
                
    //var imgpath = req.body.imgpath;
    var file = req.files.uploaded_image;
	var img_name=file.name;
   
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
        file.mv('../Assets/ImageUpload'+file.name, function(err) {
                       
            if (err)

              return res.status(500).send(err);
                    var sql = "INSERT INTO `ImageUpload`(`ImagePath`) VALUES ('" + img_name + "')";

                      var query = mysqlconn.query(sql, function(err, result) {
                          // res.redirect('profile/'+result.insertId);
                      });
                 });
    } else {
      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render('index.ejs',{message: message});
    }
    
}