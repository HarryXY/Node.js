var fs= require("fs")
var source = fs.readFileSync('../buffer/Letter of Authorization.jpg')
fs.writeFileSync('stream_copy_letter.jpg', source)