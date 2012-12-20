var http = require('http');

http.createServer(function (req, res){
	res.writeHead(200,{'Content-type' : 'text/plain'});
	res.end('Hello there\n');
}).listen(3000, '127.0.0.1');

console.log('server running at localhost');
