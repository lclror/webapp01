var mongodb_array=require('../mongodb/mongodb_array')
var populate=require('../tools/node_populate')

var coll_movie=mongodb_array.collection('movie')
var coll_comment=mongodb_array.collection('comment')
var coll_admin=mongodb_array.collection('admin')
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
		<embed class="width-8" src="../test.swf" allowFullScreen="true" quality="high" width="720" height="500" align="middle" type="application/x-shockwave-flash">\
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
			<li><img src="../../img/user/user.jpg"/><h4>user01</h4><p>content!</p></li>\
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

function populate1(coll_oneToN,query_oneToN,populate_key01,ref_coll01,callback){
	coll_oneToN.find(query_oneToN).toArray(function(err,oneToN_result){
		var populate_key01_allId=[]  //要填充字段的id收集到这里
		for(var i in oneToN_result){
			var ref_coll01_query_id=oneToN_result[i][populate_key01] //那个字段要填充就把哪个字段的id全部收集起来(通过遍历).
			populate_key01_allId.push(ref_coll01_query_id) //id收集中
		}
		var coll01_query={_id:{$in:populate_key01_allId}}  //把收集到的id进行包含查询 前的格式化
		ref_coll01.find(coll01_query).toArray(function(err,coll01_result){   //到 ref 的 集01中进行查询
		
			var coll01=[]
			for(var i in populate_key01_allId){
				var id_o=populate_key01_allId[i]
				for(var j in coll01_result){
					var coll01_Obj=coll01_result[j]
					var  id_coll01=coll01_Obj._id
					if(id_o==id_coll01){
						coll01.push(coll01_Obj)	
						oneToN_result[i][populate_key01]=coll01_Obj
					}
				}
			}
			callback(oneToN_result/*,coll01*/)
		})
	})
}

function routerall(app1){
	app1.get('/movie/test01',function(req,res){
		populate.populate2(coll_comment,{movie_id:3},'movie_id',coll_movie,'form_user_id',coll_admin,function(comment_res){
			console.log('======================================')
			console.log(comment_res)	
			res.send('<h1>populate testing...</h1>')
		})	
	})
	
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
			console.log('test')
			//html=$.html()
			//res.send(html)
			//comment part test~~~~~~~~~~~~~~~~~~~~~~~~~~~
			populate1(coll_comment,{movie_id:index},'form_user_id',coll_admin,function(comment_res/*,admin_res*/){
				console.log(comment_res)
				//console.log(admin_res) 
				var ul=''
				for(var i in comment_res){
						var img='<img src="../../img/user/user.jpg"/>'
						var form_user_id='<h4>'+comment_res[i].form_user_id.username+'</h4>'
						var content='<p>'+comment_res[i].content+'</p>'
						var li='<li>'+img+form_user_id+content+'</li>'
						ul+=li
				}
				$("div#comment>span").text(index)
				$("div#comment>ul.ul1").html(ul)
				html=$.html()
				res.send(html)	
			})
			
			//comment part~~~~~~~~~~~~~~~~~~~~~~~~~~~
			//没有任何填充，常规方法。
			/*coll_comment.find({movie_id:index}).toArray(function(err,result){
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
			})*/
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~
			//用包含搜索方法，但数据量与原本的数量容易不符，一般都会小于原来的数量，造成遍历数量不够，而且顺序也匹配不上，无法满足业务。
			//需要进行顺序的比照，并且从新生成数组，需要用到多维数组遍历才能实现。
			//那么就直接写了一个封装方法.下面是错误的例子.
			/*coll_comment.find({movie_id:index}).toArray(function(err,comment){
				var user_id=[]
				for(var i in comment){
					var form_user_id=comment[i].form_user_id
					user_id.push(form_user_id)	
				}
				var query={_id:{$in:user_id}}
				coll_admin.find(query).toArray(function(err,admin){
					//console.log(err)
					var length=admin.length	
					console.log(admin)
					var ul=''
					for(var i=0;i<length;i++){
						var img='<img src="../../img/user/user.jpg"/>'	
						var form_user_id='<h4>'+admin[i].username+'</h4>'
						var content='<p>'+comment[i].content+'</p>'
						var li='<li>'+img+form_user_id+content+'</li>'
						ul+=li
					}
					$("div#comment>span").text(index)
					$("div#comment>ul.ul1").html(ul)
					html=$.html()
					res.send(html)
				})
			})*/
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~
		})
	})	
	
	ajax_comment(app1)
}
exports.routerall=routerall




