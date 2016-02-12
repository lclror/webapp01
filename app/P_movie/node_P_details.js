var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var cheerio=require('cheerio')


var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>电影详情页</title>\
<link rel="stylesheet" href="../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../P_movie/P_details.css">\
</head>\
<body>\
<section id="details">\
	<h1>movie </h1>\
	<p>科幻类</p>\
	<div class="inFLeft">\
		<embed class="width-8" src="" allowFullScreen="true" quality="high" width="720" height="500" align="middle" type="application/x-shockwave-flash">\
		<ul class="width-1">\
			<li>电影名字</li>\
			<li>导演</li>\
			<li>国家</li>\
			<li>语言</li>\
			<li>上映年份</li>\
			<li>简介</li>\
		</ul>\
		<ul class="width-3"></ul>\
	</div>\
</section>\
</body>\
</html>\
';
var $=cheerio.load(html,{decodeEntities:false})


function routerall(app1){
	app1.get('/movie/details/:id',function(req,res){
		var index=parseInt(req.params.id)
		//console.log(index)
		//var query={_id:index}
		coll_movie.find({_id:index}).toArray(function(err,result){
			//console.log(result)
			var title='<li>'+result[0].title+'</li>'
			var director='<li>'+result[0].director+'</li>'
			var country='<li>'+result[0].country+'</li>'
			var language='<li>'+result[0].language+'</li>'
			var year='<li>'+result[0].year+'</li>'
			var descrtion='<li>'+result[0].descrtion+'</li>'
			
			var ul=title+director+country+language+year+descrtion
			$("#details ul.width-3").html(ul)
			
			$("h1").text('movie '+'《'+result[0].title+'》')
			$("title").text(result[0].title)
			html=$.html()
			res.send(html)
		})
	})	
}

exports.routerall=routerall