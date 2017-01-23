var fs = require('fs')

var readStream = fs.createReadStream('stream_copy_letter.jpg')
var n = 0;

readStream
.on('data', function(chunk){
	n++
	console.log('data emits')
	console.log(Buffer.isBuffer(chunk))
	//console.log(chunk.toString('utf8'))
	
	//pause
	readStream.pause()
	console.log('data pause')

	setTimeout(function(){
		console.log('data pause end')
		//go on
		readStream.resume()
	}, 10)
})
.on('readable', function(){
	console.log('data readable')
})
.on('end', function(){
	console.log(n)
	console.log('data ends')
})
.on('close',function(){
	console.log('data close')
})
.on('error', function(e){
	console.log('data read error' + e)
})