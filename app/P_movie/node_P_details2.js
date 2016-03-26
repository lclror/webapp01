var mongoskin=require('mongoskin')
var ObjectId=mongoskin.ObjectId
var mongodb_array=require('../mongodb/mongodb_array')
var coll_movie=mongodb_array.collection('movie')
var cheerio=require('cheerio')
//~~~~~~~add modules~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var coll_comment=mongodb_array.collection('comment')
var G_comment=require('../G_comment/node_G_comment')
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
	<p class="p1">科幻类</p>\
	<div class="div1 inFLeft">\
		<embed class="width-8" src="../../P_movie/video/test.swf" allowFullScreen="true" quality="high" width="720" height="500" align="middle" type="application/x-shockwave-flash">\
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
	<section id="insert_comment">\
	</section>\
</section>\
</body>\
<script src="../../lib/require.js" data-main="../../P_movie/P_details.js"></script>\
</html>\
';

var $=cheerio.load(html,{decodeEntities:false})

$("section#insert_comment").html(G_comment.html)
//{movie_id:null} 为自定义的评论查询字段，可以查其他库中的字段.
var G_commentProcess=G_comment.process($,coll_comment,{movie_id:null})


function routerall(app1){
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	app1.get('/movie/details/:id',
	function(req,res,next){
	//此处为了去掉ObjectId() 处理非特定Id时的报错,正常的id是24个字符长度.	
		var movie_id=req.params.id
		if(movie_id.length !=24){
			res.redirect('/movie')	
		}else{next()}	
	},
	G_commentProcess,//评论路由过程
	function(req,res){
		//var index=parseInt(req.params.id)
		var _id=req.params.id
		//~~~~~详情页单个电影数据~~~~~~~~~~~~~
		//if(_id.length!=24){res.redirect('/movie')}else{
		coll_movie.find({_id:/*index*/ObjectId(_id)}).toArray(function(err,result){
			//把id减一位报错是因为 ObjectId(_id) 不符合算法,但不停止服务
			//变更id值但length不变，报错是因为查不到值 ，但却引入未定义变量引起.停止了nodejs服务
			//(因为有未识别的变量-二级变量也不行 例如aa.bb.cc 或 aa[i].bb 这里的 cc 与 bb都算是二级变量，服务是启动不起来的)
			//所以当查询结果为空时，要判断与跳转处理等，否则接下来的就是报错.
			if(result[0]==null){res.redirect('/movie')}else{
			//~~~~~~加入访问量统计~~~~~~~~~~~~
			coll_movie.update({_id:ObjectId(_id)},{$inc:{pv:1}},function(err){
				if(err){console.log(err)}	
			})			
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			var title='<li>'+result[0].title+'</li>'
			var director='<li>'+result[0].director+'</li>'
			var country='<li>'+result[0].country+'</li>'
			var language='<li>'+result[0].language+'</li>'
			var year='<li>'+result[0].year+'</li>'
			var descrtion='<li>'+result[0].descrtion+'</li>'

			var ul=title+director+country+language+year+descrtion
			$("#details ul.width-3").html(ul)
			
			$(".h1").html('movie '+'《'+result[0].title+'》'+'<br/>-test-未获得豆瓣电影api高级权限，无法播放')
			$("title").text(result[0].title)
			//~~~~增加电影所属类型标签~~~~~~~~
			var category=result[0].category
			var p=''
			for(var i in category){
				var span='<span>'+category[i]+' </span>'
				p+=span	
			}
			$("#details>p.p1").html('<strong>所属类型标签 ：</strong>'+p)
			//~~~~~~~~~~~~~~~~~~~~~~~~~~
			html=$.html()
			res.send(html)
			}
		})
		//}
	})		
	//~~~~~~~~~~~~~~~~~~~~
	G_comment.ajax1(app1,'/ajax/movie/comment',coll_comment)
	G_comment.ajax2(app1,'/ajax/movie/comment/del',coll_comment)
	//~~~~~~~~~~~~~~~~~~~~
	
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
exports.routerall=routerall




