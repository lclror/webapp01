var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var coll_comment=mongodb_array.collection('comment')
var cheerio=require('cheerio')


var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>电影详情页</title>\
<link rel="stylesheet" href="../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../P_movie/P_details.css">\
<script src="../../lib/jquery.js"></script>\
</head>\
<body>\
<section id="details">\
	<h1 class="h1">movie </h1>\
	<p>科幻类</p>\
	<div class="div1 inFLeft">\
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
	<div id="comment">\
		<span>1</span>\
		<h1>评论区</h1>\
		<ul class="ul1">\
			<li><img src="../../img/user/user.jpg"/><h4>user01</h4><p>content! content! content!</p></li>\
			<li><img src="../../img/user/user.jpg"/><h4>user01</h4><p>nice!</p></li>\
		</ul>\
		<textarea  cols="60" rows="4"></textarea><br/>\
		<button class="btn-opacity">submit</button>\
	</div>\
</section>\
</body>\
<script src="../../lib/require.js" data-main="../../P_movie/P_details.js"></script>\
</html>\
';
var $=cheerio.load(html,{decodeEntities:false})


function ajax_comment(app1){
	app1.post('/ajax/movie/comment',function(req,res){
		var admin=req.session.adminlogin
		if(admin){
			var movie_id=req.body.movie_id
			var content=req.body.content
			var form_user_id=admin._id
			var time=new Date().toLocaleString()
			
			var doc={movie_id:parseInt(movie_id),form_user_id:form_user_id,content:content,time:time}
			coll_comment.save(doc,function(err,result){
				if(err){
					console.log(err)	
					res.send({status:'error'})
				}else{
					console.log('评论提交成功：'+result)
					res.send({status:'success',form_user_id:admin._id})	
				}
			})
		}else{
			res.send({status:'noSession'})	
		}
		
			
	})	
}

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
			
			$(".h1").text('movie '+'《'+result[0].title+'》')
			$("title").text(result[0].title)
			
			coll_comment.find({movie_id:index}).toArray(function(err,result){
				if(err){
					html=$.html()
					res.send(html)
				}else{
					var ul=''
					for(var i in result){
						var img='<img src="../../img/user/user.jpg"/>'
						var form_user_id='<h4>'+result[i].form_user_id+'</h4>'
						var content='<p>'+result[i].content+'</p>'
						var li='<li>'+img+form_user_id+content+'</li>'
						ul+=li
					}	
					$("div#comment>span").text(index)
					$("div#comment>ul.ul1").html(ul)
					html=$.html()
					res.send(html)
				}	
			})

		})
	})	
	
	ajax_comment(app1)
}

exports.routerall=routerall