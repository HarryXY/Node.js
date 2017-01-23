var http = require('http')
var fs = require('fs')
var request = require('request')

http
.createServer(function(req, res){
	// fs.readFile('../buffer/1.jpg', function(err, data){
	// 	if(err){
	// 		res.end('file not exist')
	// 	}else{
	// 		res.writeHeader(200, {'Context-Type': 'text/html'})
	// 		res.end(data)
	// 	}
	// })
	// 
	
	//replace above code 
	//fs.createReadStream('../buffer/1.jpg').pipe(res)
	
	//request online resources
	request('http://www.baidu.com/img/bd_logo1.png').pipe(res)
})
.listen(8090)