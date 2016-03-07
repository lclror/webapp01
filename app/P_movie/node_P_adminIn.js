var mongoskin=require('mongoskin')
var ObjectId=mongoskin.ObjectId

var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var cheerio=require('cheerio')

var G_islogin=require('./node_G_islogin')

var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>电影录入</title>\
<link rel="stylesheet" href="../../../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../../../P_movie/P_adminIn.css">\
<script src="../../../../lib/jquery.js"></script>\
</head>\
<body>\
<section id="adminIn">\
	<nav></nav>\
	<h3 class="islogin"></h3>\
	<h1>movie 后台录入页</h1>\
	<label class="marright3">豆瓣电影 id:</label><input type="text" class="input1 form-input marright2"/>\
	<button class="btn1 btn-opacity ">获取jsonp</button>\
	<ul>\
		<li>科幻</li><li>喜剧</li><li>惊悚</li><li>剧情</li><li>励志</li>\
		<li>武侠</li><li>动画</li><li>悬疑</li><li>动作</li><li>爱情</li>\
	</ul>\
	<p></p>\
	<form>\
		<label for="">标题 </label><input type="text"><br/>\
		<label for="">海报 </label><input type="text"><br/>\
		<label for="">海报上传 </label><input type="file"><br/>\
		<label for="">导演 </label><input type="text"><br/>\
		<label for="">国家 </label><input type="text"><br/>\
		<label for="">语种 </label><input type="text" value="英语"><br/>\
		<label for="">年份 </label><input type="text"><br/>\
		<label for="">片源 </label><input type="text"><br/>\
		<label for="">简介 </label><textarea name="" id="" cols="45" rows="4"></textarea><br/>\
		<button type="button">录入</button>\
	</form>\
</section>\
</body>\
<script src="../../../../lib/require.js" data-main="../../../../P_movie/P_adminIn.js"></script>\
</html>\
'

var multer=require('multer')
var upload=multer({dest:'./P_movie/img'}) //此步是配置上传文件的存放位置，然后在路由过程中调用upload下面的一些方法.

//关于文件上传，它已经相当于是一个写好的中间件了，哪个接口有要上传的文件就把它放在哪里，然后上传的文件的Key名写入到方法的参数中去，
//在后面的路由过程中通过req.file来查看接收到的上传文件的具体信息，包括路径，文件名等。


function ajax(app1){
	app1.post('/ajax/movie/admin/save',upload.single('posters_file'),function(req,res){
		
		var nav_movieId=req.body.nav  //ajax从页面中传递过来的 用来判断是否更新的条件值 用Id 来表示。

		var title=req.body.title
		var posters=req.body.posters  //没有文件上传的话就使用外链路径
		console.log('上传的图片大小 : '+req.file.size)
		if(req.file){ //不能用req.file.fieldname  因为有二级对象调用，框架不支持检索二级对象层.
			posters='../'+req.file.path	 //有文件上传过来，就使用内部的文件存放路径
		}
		var director=req.body.director
		var country=req.body.country
		var language=req.body.language
		var year=req.body.year
		var sourse=req.body.sourse
		var descrtion=req.body.descrtion	
		var category=req.body.category //增加电影标签，此数据是一个数组.通过formdata后就不是一个数组了.
		var category_arr=category.split(',')  //转化为数组.
		//console.log(category_arr)
		
		var doc={
				//_id:nav_movieId,  //主要是用它来决定是新插入还是更新原有的数据,
				title:title,
				posters:posters,
				director:director,
				country:country,
				language:language,
				year:year,
				sourse:sourse,
				descrtion:descrtion,
				category:category_arr,
				pv:0
		}
		if(nav_movieId!=''){ //如果里面有id ，则把_id 值加入到doc中，以便覆盖原数据内容，否则就不加_id  那就是新建一条数据了。
			doc._id=ObjectId(nav_movieId)
		}
		coll_movie.save(doc,function(err,result){
				console.log(result.result)
				if(err){
					res.send({status:'error'})	
				}else{
					res.send({status:'success'})
				}	
		})
		
		//~~~~~~再往电影类别库中存它的信息~~~movie_id  但此id在电影还未存储之前是不会生成的，也就没有，但电影名有，~~~~~~~~
		
		/*coll_movie.find({},{_id:1}).limit(1).sort({_id:-1}).toArray(function(err,result){
			//如果nav为空说明不是通过修改按钮点击进来的，这时为插入数据，有值就说明是点击的修改按钮，那就要把这个Id save到数据库中了，
			//因为用save，id如果相同的话就会自动更新覆盖数据，用insert的话，id相同会报错，所以save具有更新和插入这两种功能
			var index='' 
			if(nav_movieId==''){ //如果nav为空，插入一条新数据
				index=result[0]._id+1
			}else{ //如果nav为一个电影的id，那就更新这条数据
				index=parseInt(nav_movieId)	
			}
			console.log('nav ='+index)
			var doc={
				_id:index,  //主要是用它来决定是新插入还是更新原有的数据,
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
		})*/
	})	

}



//var G_isloginProcess1=G_islogin.process($01)

function routerall(app1){
	ajax(app1)
//修改页路由以及配置.
	var $1=cheerio.load(html,{decodeEntities:false})  //单独/save 用
	app1.get('/movie/admin01/save',G_islogin.process($1),function(req,res){
		//var html=$.html()  //这里只所以还是干净的，是因为下面的例子有从新开了一个新的$去调用,这此之内的$不是同一个.
		//在路由过程中往全局中传递变量，是传递到最顶层的，只要在系统内任何一个封装方法内有同名变量，就会覆盖那个全局的变量，所以不容易使用。
		//所以如果这次路由过程中传递html为全局变量，就接收不到，因为它被开头部分的html给覆盖了。
		html=$1.html()
		res.send(html)	  
	})
	
//修改页	带参数路由\
	var $=cheerio.load(html,{decodeEntities:false})  //save/:id 用 如果同一个html页面字符串，被多个页面接口使用的话，为了不冲突就这样使用.
	app1.get('/movie/admin01/save/:id',G_islogin.process($),function(req,res){
		
		//var index=parseInt(req.params.id)
		var movie_id=req.params.id
		coll_movie.find({_id:/*index*/ObjectId(movie_id)}).toArray(function(err,result){
		var 	title=result[0].title,
				posters=result[0].posters,
				director=result[0].director,
				country=result[0].country,
				language=result[0].language,
				year=result[0].year,
				sourse=result[0].sourse,
				descrtion=result[0].descrtion	
				category=result[0].category	 //电影标签数组对象
				//console.log(category)
		var $input=$("#adminIn>form>input")
		$input.eq(0).val(title)
		$input.eq(1).val(posters)
		$input.eq(3).val(director)
		$input.eq(4).val(country)
		$input.eq(5).val(language)
		$input.eq(6).val(year)
		$input.eq(7).val(sourse)
		$("#adminIn>form>textarea").val(descrtion)
		$("#adminIn>nav").text(/*index*/movie_id) //这时把此电影的id 存入 nav容器中，因为index与id相同，所以这里为了快速就用了index 
		//点提交时脚本就会把此值一并提交给ajax接口，然后ajax接口用此值来判断是否为更新.
		//~~~再从电影信息库中查它的类别数据~~~~~~~~~~~~
		$("#adminIn>ul>li").each(function(i, elm) {
			var $this_li=$(this)
			var li_text=$this_li.text()
			for(var i in category){
				var tag_text=	category[i]
				if(li_text==tag_text){
					$this_li.addClass("selected")	
				}else{
					$this_li.removeClass('selected')	
				}
			}
		});	
		//~~~~~~~~~~~~~~~
		//$("#adminIn>span").text()
		html=$.html()
		res.send(html)	
		})	
	})
	
}

exports.routerall=routerall