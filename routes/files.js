var fs = require('fs');
// var ffmpeg = require('lib/ffmpeg');

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
    // var childProcess = require('child_process'),ffmpeg;
    console.log('uploading video0');
    var fileName = req.files.uploadingVideo.name.split(' ').join('_');
    var tmp_path = req.files.uploadingVideo.path;
    var target_path = './public/videos/' + fileName;

    // ffmpeg = childProcess.exec(
    //     'ffmpeg  -itsoffset -4  -i ' + tmp_path + ' -vcodec mjpeg -vframes 1 -an -f rawvideo -s 640x480 /public/videos/thumbnail' + fileName , 
    //     function (error, stdout, stderr) {
    //    if (error) {
    //      console.log(error.stack);
    //      console.log('Error code: '+error.code);
    //      console.log('Signal received: '+error.signal);
    //    }
    //    console.log('Child Process STDOUT: '+stdout);
    //    console.log('Child Process STDERR: '+stderr);
    //  });

    //  ffmpeg.on('exit', function (code) {
    //    console.log('Child process exited with exit code '+code);
    //  });

    // var proc = new ffmpeg({ source: tmp_path, nolog: true })
    // .withSize('320x240')
    // .takeScreenshots({ count: 1, timemarks: [ '00:00:02.000', '6' ] }, 
    // '/public/videos/thumbnail' + fileName, function(err) {
    //     console.log('screenshots were saved');
    // });

    fs.rename(tmp_path, target_path, function (err){
        if (err) throw err;
        res.contentType('json');
        var thumbnailFile = 'thumbnail' + fileName;
        res.send(JSON.stringify({ name: fileName, thumbnail: thumbnailFile} ));
    });
}