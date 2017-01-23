var fs = require('fs')

var readStream = fs.createReadStream('1.jpg')
var writeStream = fs.createWriteStream('1-stream.jpg')

readStream.on('data', function(chunk){
	//judge the speed of writing
	if(writeStream.write(chunk) === false){
		console.log('still cached')
		//pause
		readStream.pause()
	}

})

readStream.on('end', function(){
	writeStream.end()
})

writeStream.on('drain', function(){
	console.log('data drains')
	//resume
	readStream.resume()
})