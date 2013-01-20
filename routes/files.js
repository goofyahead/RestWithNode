var fs = require('fs');

exports.uploadPhoto = function(req, res) {
    console.log('Uploading file');
    console.log(req.files);
    var fileName = req.files.uploadingFile.name.split(' ').join('_');
    var tmp_path = req.files.uploadingFile.path;
    var target_path = './public/images/' + fileName;

    fs.rename(tmp_path, target_path, function (err){
      if (err) throw err;
      res.contentType('json');
      res.send(JSON.stringify({ name: fileName }));
  });
};

exports.uploadVideo = function(req, res) {


    console.log('uploading video0');
    var fileName = req.files.uploadingVideo.name.split(' ').join('_');
    var fileNameWirhoutExt = fileName.split('.')[0];
    console.log(fileNameWirhoutExt);
    var tmp_path = req.files.uploadingVideo.path;
    var target_path = './public/videos/' + fileName;
    var extern_path = __dirname + '/../public/videos/' + fileName;

    

    fs.rename(tmp_path, target_path, function (err){
        if (err) throw err;
        res.contentType('json');
        var thumbnailFile = 'thumbnail' + fileNameWirhoutExt + '.jpg';

        res.send(JSON.stringify({ name: fileName, thumbnail: thumbnailFile} ));   

        createThumbnail(target_path, '640x480', __dirname + '/../public/videos/thumbnail' + fileNameWirhoutExt + '.jpg');
    }); 
}

function createThumbnail (origin, size, filename) {
    var childProcess = require('child_process'),ffmpeg;

    ffmpeg = childProcess.exec(
        'ffmpeg  -itsoffset -4  -i ' + origin + 
        ' -vcodec mjpeg -vframes 1 -an -f rawvideo -s ' + size + ' ' + filename, 
        function (error, stdout, stderr) {
           if (error) {
             console.log(error.stack);
             console.log('Error code: '+error.code);
             console.log('Signal received: '+error.signal);
         }
         console.log('Child Process STDOUT: '+stdout);
         console.log('Child Process STDERR: '+stderr);
     });

    ffmpeg.on('exit', function (code) {
       console.log('Child process exited with exit code '+ code);
   });
}