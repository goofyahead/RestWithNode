var fs = require('fs');

exports.uploadFile = function(req, res) {
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