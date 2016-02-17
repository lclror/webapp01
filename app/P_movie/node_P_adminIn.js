var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var cheerio=require('cheerio')
var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>无标题文档</title>\
<link rel="stylesheet" href="../../../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../../../P_movie/P_adminIn.css">\
<script src="../../../../lib/jquery.js"></script>\
</head>\
<body>\
<section id="adminIn">\
	<h1>movie 后台录入页</h1>\
	<p>科幻类</p>\
	<form>\
		<label for="">标题 </label><input type="text"><br/>\
		<label for="">海报 </label><input type="text"><br/>\
		<label for="">导演 </label><input type="text"><br/>\
		<label for="">国家 </label><input type="text"><br/>\
		<label for="">语种 </label><input type="text"><br/>\
		<label for="">年份 </label><input type="text"><br/>\
		<label for="">片源 </label><input type="text"><br/>\
		<label for="">简介 </label><textarea name="" id="" cols="45" rows="4"></textarea><br/>\
		<button type="button">录入</button>\
	</form>\
	<nav></nav>\
</section>\
</body>\
<script src="../../../../lib/require.js" data-main="../../../../P_movie/P_adminIn.js"></script>\
</html>\
'
var $=cheerio.load(html,{decodeEntities:false})

var G_islogin=require('./node_G_islogin')
var G_isloginProcess=G_islogin.process($)

function ajax(app1){
	app1.post('/ajax/movie/admin/save',function(req,res){
		var title=req.body.title
		var posters=req.body.posters
		var director=req.body.director
		var country=req.body.country
		var language=req.body.language
		var year=req.body.year
		var sourse=req.body.sourse
		var descrtion=req.body.descrtion	
		var nav=req.body.nav  //ajax从页面中传递过来的 用来判断是否更新的条件值 用Id 来表示。
		
		coll_movie.find({},{_id:1}).limit(1).sort({_id:-1}).toArray(function(err,result){
			//如果nav为空说明不是通过修改按钮点击进来的，这时为插入数据，有值就说明是点击的修改按钮，那就要把这个Id save到数据库中了，
			//因为用save，id如果相同的话就会自动更新覆盖数据，用insert的话，id相同会报错，所以save具有更新和插入这两种功能
			var index='' 
			if(nav==''){
				index=result[0]._id+1
			}else{
				index=parseInt(nav)	
			}
			console.log('nav ='+index)
			var doc={
				_id:index,
				title:title,
				posters:posters,
				director:director,
				country:country,
				language:language,
				year:year,
				sourse:sourse,
				descrtion:descrtion
			}
			coll_movie.save(doc,function(err,result){
				console.log(result.result)
				if(err){
					res.send([{status:'error'}])	
				}else{
					res.send([{status:'success'}])
				}	
			})
		})
	})	

}



function routerall(app1){
	ajax(app1)
//修改页路由以及配置.
	
	
	app1.get('/movie/admin01/save',G_isloginProcess,function(req,res){
		var html1=$.html()
		res.send(html1)	
	})
	
//修改页	带参数路由
	app1.get('/movie/admin01/save/:id',G_isloginProcess,function(req,res){
		var index=parseInt(req.params.id)
		coll_movie.find({_id:index}).toArray(function(err,result){
		var 	title=result[0].title,
				posters=result[0].posters,
				director=result[0].director,
				country=result[0].country,
				language=result[0].language,
				year=result[0].year,
				sourse=result[0].sourse,
				descrtion=result[0].descrtion	
		var $input=$("#adminIn>form>input")
		$input.eq(0).val(title)
		$input.eq(1).val(posters)
		$input.eq(2).val(director)
		$input.eq(3).val(country)
		$input.eq(4).val(language)
		$input.eq(5).val(year)
		$input.eq(6).val(sourse)
		$("#adminIn>form>textarea").val(descrtion)
		$("#adminIn>nav").text(index) //这时把此电影的id 存入 nav容器中，因为index与id相同，所以这里为了快速就用了index 
		//点提交时脚本就会把此值一并提交给ajax接口，然后ajax接口用此值来判断是否为更新.
		var html2=$.html()
		res.send(html2)	
		})	
	})
	
}

exports.routerall=routerall