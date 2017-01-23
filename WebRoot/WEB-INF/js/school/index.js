var klass = require('./klass')

klass.add('1', ['2','3'])

exports.add = function(klasses){
	klasses.forEach(function(item, index){
		var _klass = item
		var teacherName = item.tracherName
		var students = item.students

		klass.add(teacherName, students)
	})
}

