function Pet(words) {
	this.words = words
	this.speak = function(){
		console.log(this.words)
	}
}

function Dog(words){
	//将Pet中的this变成Dog
	//Pet.call(this, words)
	Pet.apply(this, arguments)
}

//创建Dog实例，调用方法
var dog = new Dog('Wang')
dog.speak();