var http = require('http');


var server = http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Node.JS\n');
});

server.listen(1337, "127.0.0.1", function(){
  console.log('Server running at http:127.0.0.1:1337');
});