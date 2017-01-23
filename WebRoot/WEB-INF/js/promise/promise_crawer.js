//引入http模块
var http = require('http')

var  Promise = require('bluebird')

//引入npm的cheerio模块，用于解析html的DOM结构，需要先install cheerio模块
var cheerio = require('cheerio')

var baseUrl = 'http://www.imooc.com/learn/'

var videoIds = [348, 259, 197, 134, 75]

function filterChapters(html){
	var $ = cheerio.load(html)
	var chapters = $('.chapter')

	var title = $('#main .path span').text()
	var number = parseInt($(".statics clearfix .static-item l .meta-value js-learn-num").text().trim(), 10)

/*	数组结构
	courseData = {
		title: title,
		number:number,
		videos:[{
			chapterTitle:'',
			videos:[
				title:'',
				id:''
			]
		}]
	}
*/

	//JSON形式
	var courseData = {
		title: title,
		number: number,
		videos:[] 
	}
	                  
	chapters.each(function(item){
		var chapter = $(this)
		var chapterTitle = chapter.find("strong").text
		var videos = chapter.find('.video').children('li')
		var chapterData = {
			chapterTitle:chapterTitle,
			videos: []
		}
		
		videos.each(function(item){
			var video = $(this).find('.J-media-item')
			var videoTitle = video.text()
			var id = video.attr('href').split('/video')[1]
			                                            
            chapterData.videos.push({
            	title: videoTitle,
            	id: id
            })
		})
		
		courseData.videos.push(chapterData)
	})
	return courseData;
}

function printCourseInfo(coursesData){
	coursesData.forEach(function(courseData){
		console.log(courseData.number + '人学过' + courseData.title + '/n')
	})

	coursesData.forEach(function(courseData){
		console.log('###' + courseData.title + '/n')
		courseData.videos.forEach(function(item){
		var chapterTitle = item.chapterTitle		
		console.log(chapterTitle + '\n')
		
		item.videos.forEach(function(video){
			console.log(' 【'+ video.id +'】 ' + video.title + '\n')
		}) 
	})
	})

	
}
	
//获取html页面代码
function getPageAsync(url){
	return new Promise(function(resolve, reject){
		console.log('正在爬取' + url)

		http.get(url, function(res){
			var html = ''
			
			res.on('data', function(data){
				html += data
			})
			res.on('end', function(){
				//Promise.resolve(value)方法返回一个以给定值解析后的Promise对象
				resolve(html)

			})
		}).on('error', function(e){
			reject(e)
			console.log('get data error')
		})
	})
}


var fetchCourseArray = []

videoIds.forEach(function(id){
	fetchCourseArray.push(getPageAsync(baseUrl + id))
})

//Promise数组
Promise.all(fetchCourseArray).then(function(pages){
	var coursesData = []

	pages.forEach(function(html){
		var courses = filterChapters(html)
		coursesData.push(courses)
	})

	coursesData.sort(function(a,b){
		return a.number < b.number
	})

	printCourseInfo(coursesData)
})
