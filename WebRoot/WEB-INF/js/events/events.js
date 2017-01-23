var EventEmitter = require('events').EventEmitter

var life = new EventEmitter()

//the default max listeners we can set is 10, and it can be cunstomed
life.setMaxListeners(11)

//.on or .addListener
life.on('service', function(who){
	console.log("help " + who + " wash cloth")
})

life.on('service', function(who){
	console.log("help " + who + " cook")
})

life.on('service', function(who){
	console.log("help " + who + " massaji")
})

life.on('service', function(who){
	console.log("help " + who + " event4...")
})

life.on('service', function(who){
	console.log("help " + who + " event5...")
})

function cook(dish){
	console.log("cook " + dish)
}

life.addListener('cook', cook)

//emit method to set parameters
life.emit('service','Harry')
life.emit('cook', " chicken")

//to remove a event
life.removeListener('cook', cook)

//to check if a event has been listened or not
var hasConsoleListener = life.emit('service','Harry')
var hasCookListener = life.emit('cook', " chicken")
var hasLoveListener = life.emit('love','Harry')

console.log(hasConsoleListener)
console.log(hasCookListener)
console.log(hasLoveListener)

//to see how many listeners remain
console.log(life.listeners("service").length)
console.log(life.listeners().length)
console.log(EventEmitter.listenerCount(life,'service'))

//to remove some events
life.removeAllListeners('cook')
console.log(EventEmitter.listenerCount(life,'cook'))
console.log(EventEmitter.listenerCount(life,'service'))

//to remove all events
life.removeAllListeners()
console.log(EventEmitter.listenerCount(life,'cook'))
console.log(EventEmitter.listenerCount(life,'service'))









