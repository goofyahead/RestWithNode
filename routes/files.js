var fs = require('fs');
var util = require('util');
var execSync = require('execSync');

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

    var childProcess = require('child_process'),ffmpegImage;
    console.log('uploading video0');
    var fileName = req.files.uploadingVideo.name.split(' ').join('_');
    var fileNameWirhoutExt = fileName.split('.')[0];
    console.log(fileNameWirhoutExt);
    var tmp_path = './' + req.files.uploadingVideo.path;
    var target_path = './public/videos/' + fileNameWirhoutExt + '.mp4';
    var final_target_path = './public/videos/' + fileNameWirhoutExt + '_final' + '.mp4';

    console.log('temp path is ' + tmp_path);

    var currentDifference;
    var minimunDiference = Number.MAX_VALUE;
    var minimunValueFileName;
    //pick the first file of the list or any image
    var firstFile;
    var keepGoing = true;

    ffmpegImage = childProcess.exec('ffmpeg -i ' + tmp_path + ' -y -f image2 -r 25 ./public/generatedImages/thumb%05d.gif', 
        function (error, stdout, stderr) {
            if (error) {
               console.log(error.stack);
               console.log('Error code: '+error.code);
               console.log('Signal received: '+error.signal);
            }
           console.log('Child Process STDOUT: '+stdout);
           console.log('Child Process STDERR: '+stderr);
        });

    ffmpegImage.on('exit', function (code) {
     console.log('Child process exited with exit code '+code);

     fs.readdir('./public/generatedImages/', function (err, files) {
        files = files.sort();
        firstFile = files [0];
        console.log('first file is ' + firstFile);
        for (var i = 90; i < files.length; i++) {

            if (keepGoing) {
                var result = execSync.stdout("convert ./public/generatedImages/" + firstFile + " ./public/generatedImages/" + files[i] + " -compose Difference -composite -colorspace gray -format '%[mean]' info:");
                result = parseFloat(result);
            }

            console.log(files[i] + ' with result ' + result);

            if (result < minimunDiference && keepGoing) {
                if (result < 900) keepGoing = false;
                minimunDiference = result;
                minimunValueFileName = files[i];
                console.log('the minimun value was: ' + minimunDiference + ' for the file ' + minimunValueFileName);
            }
        }

        var imageNumber = minimunValueFileName.split('.')[0];
        imageNumber = imageNumber.substr(imageNumber.length - 4, imageNumber.length);
        console.log('video should be cutted on second ' + parseFloat(imageNumber / 25).toFixed(1) + ' with a value ' + minimunDiference + ' with the file ' + minimunValueFileName);

        var convertResult = execSync.code('ffmpeg -i ' + tmp_path + ' -y -an -s 480x360 -b 500k -vcodec libx264 -t ' + 
        parseFloat(imageNumber / 25).toFixed(1) + ' ' + final_target_path);
        console.log('converting and cutting video with result: ' + convertResult);

        fs.unlinkSync(tmp_path);
        
        var thumbnailFile = 'thumbnail' + fileNameWirhoutExt;

        fs.readdir('./public/generatedImages/', function (err, files) {
            files = files.sort();
            firstFile = files [0];
            console.log('first file is ' + firstFile);
            for (var i = 0; i < files.length; i++) {
                fs.unlinkSync('./public/generatedImages/' + files[i]);
            }    
        });

        var snapshotResult = execSync.code('ffmpeg -i ' + final_target_path + ' -vf fps=fps=1/3 -vframes 3 -s 640x480 -y ./public/images/' + thumbnailFile +'%02d.jpg');
        console.log('Child process ffmpeg snpshots exited with exit code '+ snapshotResult);
 
        res.contentType('json');
        res.send(JSON.stringify({ name: fileNameWirhoutExt + '_final' + '.mp4', thumbnail: thumbnailFile}));           
        });   
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