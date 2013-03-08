var fs = require('fs');
var util = require('util');

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
    var childProcess = require('child_process'),ffmpeg;
    console.log('uploading video0');
    var fileName = req.files.uploadingVideo.name.split(' ').join('_');
    var fileNameWirhoutExt = fileName.split('.')[0];
    console.log(fileNameWirhoutExt);
    var tmp_path = './' + req.files.uploadingVideo.path;
    var target_path = './public/videos/' + fileNameWirhoutExt + '.mp4';

    //THIS SOULD BE ADAPTED USING PROMISES
    ffmpeg = childProcess.exec(
        'ffmpeg -i ' + tmp_path + ' -s 480x360 -b 500k -vcodec libx264 -y ' + target_path, 
        function (error, stdout, stderr) {
           if (error) {
             console.log(error.stack);
             console.log('Error code: ' + error.code);
             console.log('Signal received: ' + error.signal);
            }
         console.log('Child Process STDOUT: ' + stdout);
         console.log('Child Process STDERR: ' + stderr);
     });

    ffmpeg.on('exit', function (code) {
       console.log('Child process exited with exit code '+ code);
       fs.unlinkSync(tmp_path);
        res.contentType('json');
        var thumbnailFile = 'thumbnail' + fileNameWirhoutExt;
        createThumbnails(target_path, '640x480', __dirname + 
            '/../public/images/thumbnail' + fileNameWirhoutExt, res, thumbnailFile, fileName);
    });
}

function createThumbnails (origin, size, filename, res, thumbName, videoName) {
    var childProcess = require('child_process'),ffmpeg;

    ffmpeg = childProcess.exec(
        'ffmpeg -i ' + origin + ' -vf fps=fps=1/3 -vframes 3 -s ' + size + ' ' + filename +'%02d.jpg', 
        function (error, stdout, stderr) {
           if (error) {
             console.log(error.stack);
             console.log('Error code: ' + error.code);
             console.log('Signal received: ' + error.signal);
            }
         console.log('Child Process STDOUT: ' + stdout);
         console.log('Child Process STDERR: ' + stderr);
     });

    ffmpeg.on('exit', function (code) {
       console.log('Child process exited with exit code '+ code);
       res.send(JSON.stringify({ name: videoName, thumbnail: thumbName}));
   });
}

exports.clearImagelist = function(req, res) {
    var filename = req.body.fileName;
    console.log('filename: ' + filename);
    var fileNameWithoutExt = filename.split('.')[0];
    console.log('name with no ext: ' + fileNameWithoutExt);
    var nameWithoutNumber = fileNameWithoutExt.substring(0, fileNameWithoutExt.length - 1);
    console.log('name without the las number ' + nameWithoutNumber);

    for (var x=1; x<=3; x++) {
        if (nameWithoutNumber + x == fileNameWithoutExt) {
            console.log('file to keep');
        } else {
            fs.unlink( __dirname + '/../public/images/' + nameWithoutNumber + x + '.jpg', function (err) {
                if (err) throw err;
                console.log('deleted unnecesary file');
            });
        }
    }
    res.send({response : 'ok'});
}