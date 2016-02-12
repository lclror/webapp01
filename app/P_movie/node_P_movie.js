var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var cheerio=require('cheerio')
var cache=require('memory-cache')

var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>电影首页</title>\
<link rel="stylesheet" href="../lib/xxxbase.css">\
<link rel="stylesheet" href="../P_movie/P_movie.css">\
</head>\
<body>\
<section id="movie">\
	<h1>MOVIE 首页</h1>\
	<p>科幻类</p>\
	<ul class="rows-count-7-gap-2 inFLeft rowsMbottom-2">\
	</ul>\
</section>\
</body>\
</html>\
'
//每个电影的小块组成如下
//<li><img src="../P_movie/img/yr.jpg" alt=""/><h3>蚁人</h3><a>观看预告片</a></li>\

var $=cheerio.load(html,{decodeEntities: false})



function routerall(app1){
var count=0	
app1.get('/movie',function(req,res,next){
	
	var P_movie=cache.get('P_movie')
	if(P_movie==null){
		next()
	}else if(P_movie!=null){
		count+=1
		console.log('use cache '+count)
		res.send(P_movie)	
	}
},function(req,res){
	
	coll_movie.find().limit(7).toArray(function(err,result){
		
		var ul=''
		for(var i in result){
			var title=result[i].title
			var posters=result[i].posters
			var id=result[i]._id
			
			var h3='<h3>'+title+'</h3>'
			var img='<img src="'+posters+'"/>'
			//movie 详情页链接参数用id出传递区分
			var a='<a target="_blank" href="/movie/details/'+id+'">观看预告片</a>'
			var li='<li>'+img+h3+a+'</li>'
			
			ul+=li
		}
		$("#movie>ul").html(ul)
		html=$.html()
		cache.put('P_movie',html,5000)
		count+=1
		console.log('no use cache '+count)
		res.send(html)	
		
	})
})
}

		

exports.routerall=routerall

/*	coll_movie.find().limit(7).toArray(function(err,result){
		var ul=''
		for(var i in result){
			var h3='<h3>'+result[i].title+'</h3>'
			var posters=result[i].posters	
			var img='<img src="'+posters+'"/>'
					
			//movie 详情页链接参数用id出传递区分
			var id=result[i]._id
			var a='<a target="_blank" href="/movie/details/'+id+'">观看预告片</a>'
			var li='<li>'+img+h3+a+'</li>'
			ul+=li
		}
		$("#movie>ul").html(ul)
		html=$.html()
		cache.put('P_movie',html,5000)
		res.send(html)	
	})
*/
			



			
