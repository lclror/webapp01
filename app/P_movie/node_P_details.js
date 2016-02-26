var mongoskin=require('mongoskin')
var ObjectId=mongoskin.ObjectId
var populate=require('../tools/node_populate7')
var mongodb_array=require('../mongodb/mongodb_array')


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
	<section id="insert_comment">\
		<div id="comment">\
			<span>1</span>\
			<h1>评论区</h1>\
			<ul class="ul1">\
				<li><img src="../../img/user/user.jpg"/><h4>user01</h4><p>content!</p></li>\
				<li><img src="../../img/user/user.jpg"/><h4>user01</h4><p>nice!</p></li>\
			</ul>\
			<textarea id="textarea"  cols="60" rows="4"></textarea><br/>\
			<button class="btn-opacity">submit</button>\
		</div>\
	</section>\
</section>\
</body>\
<script src="../../lib/require.js" data-main="../../P_movie/P_details.js"></script>\
</html>\
';


var $=cheerio.load(html,{decodeEntities:false})


function ajax_comment(app1){
	app1.post('/ajax/movie/comment',function(req,res){
		var movie_id=req.body.movie_id
		var content=req.body.content
		var time=new Date().toLocaleString()
		var comment_id=req.body.comment_id
		var to=req.body.to
		var admin=req.session.adminlogin
		
		
		if(admin){
			var form_user_id=admin._id
			
			if(comment_id==0){
				var doc={
				movie_id:parseInt(movie_id),
				form_user_id:form_user_id,//此处用到填充方法.
				content:content,
				time:time,
				reply:[]
				}
				coll_comment.save(doc,function(err,result){
					if(err){
						console.log(err)	
						res.send({status:'error'})
					}else{
						console.log('评论提交成功：'+result)
						res.send({status:'comment',form:admin.username})	
					}
				})
			}else{
				var replyObj={
					from:admin.username,
					to:to,
					content:content,
					time:time
				}
				coll_comment.findAndModify({_id:ObjectId(comment_id)},[],{$push:{reply:replyObj}},function(err,result){
				
   				if(err){
						console.log(err)	
						res.send({status:'error'})
					}else{
						console.log('回复提交成功：')
						res.send({status:'reply',form:admin.username})	
					}
				});
			}
			
			
		}else{
			console.log(comment_id)
			res.send({status:'noSession'})	
		}
	})	
}

//~~comment delete part~~~~~
function ajax_comment_del(app1){
	app1.post('/ajax/movie/comment/del',function(req,res){
		var comment_id=req.body.comment_id
		var time=req.body.time
		//console.log(comment_id+' : '+time)
		if(time==0){
			coll_comment.remove({_id:ObjectId(comment_id)},function(err){
				if(err){
					res.send({status:'error'})	
				}else{
					res.send({status:'success'})	
				}	
			})	
		}else{
			coll_comment.findAndModify({_id:ObjectId(comment_id)},[],{$pull:{reply:{time:time}}},function(err,result){
				//console.log('=======>', error, result);
				if(!err){
					res.send({status:'success'})	
				}
			}); 
		}	
	})	
}
//~~~~~~~
function routerall(app1){
/*	app1.get('/movie/test01',function(req,res){		
		coll_comment.find({movie_id:3}).sort({time:1}).toArray(function(err,result){
			var opt={
				P_result:result,
				key:['form_user_id','movie_id'],	
				ref:[coll_admin,coll_movie],
				//ref_query_key:[0,{title:null}],
				coll_find:function(find){
					find(0,function(){
						find(1)	
					})
				}
			}
			populate.populateN(opt,function(comment_res){
				console.log('======================================')
				console.log(comment_res)
				res.send('<h1>populate testing...</h1>')
			})
		})
	})
*/	
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
			//html=$.html()
			//res.send(html)
			//~~~~~~~~~~~~~~~评论区路由过程~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			var admin=req.session.adminlogin
			coll_comment.find({movie_id:index}).sort({time:1}).toArray(function(err,result){
				var opt={
					P_result:result,
					key:['form_user_id'],
					ref:[coll_admin],
					//ref_query_key:[0],
					coll_find:function(find){
						find(0)	
					}	
				}
				populate.populateN(opt,function(comment_res){
					console.log('=========限定返回第一条评论内容=============================')
					console.log(comment_res[0])
					var ul=''
					for(var i in comment_res){
							var img='<img src="../../img/user/user.jpg"/>'
							//var form_user_id='<h4>'+comment_res[i].form_user_id.username+'</h4>'
							var content1='<p>'+comment_res[i].content+'</p>'
							var _id=comment_res[i]._id
							var a1='<a href="#textarea" name="'+_id+'">回复</a>'
							//~~~~~~~~增加删除按钮~~~~~~~~~~~~~~~~
							var from_user=comment_res[i].form_user_id.username
							var del01=''
							if(admin && admin.username==from_user){
								del01='<span id="'+_id+'" name="0"> 删除</span>'	
								a1=''
							}
							var form_user_id='<h4>'+from_user+' '+del01+'</h4>'
							//~~~~~~~~~reply part~~~~~~~~~~~~~
							var reply=comment_res[i].reply
							var li_reply=''
							for(var j in reply){
								var to='<span>回复-'+reply[j].to+' : </span>'
								var from_name=reply[j].from
								//var from='<h4>'+from_name+'</h4>'
								
								var content2='<p>'+to+reply[j].content+'</p>'
								var a2='<a href="#textarea" name="'+_id+'">回复</a>'
								
								//~~~~增加删除按钮~~~~~~~~~
								var time=reply[j].time
								var del02=''
								if(admin && admin.username==from_name){
									del02='<span id="'+_id+'" name="'+time+'"> 删除</span>'	
									a2=''
								}
								var from='<h4>'+from_name+' '+del02+'</h4>'
								//~~~~~~~~~~~~~~~
								var div='<div>'+img+from+content2+a2+'</div>'
								li_reply+=div
							}
							//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
							var li='<li>'+img+form_user_id+content1+a1+li_reply+'</li>'
							ul+=li
					}
					$("div#comment>span").text(index)
					$("div#comment>ul.ul1").html(ul)
					html=$.html()
					res.send(html)	
				})	
			})
			
			//comment part test~未经过优化的版本，不会自动增加find的数量~~~~~~~~~~~~~~~~~~~~~~~~~~
/*			populate1(coll_comment,{movie_id:index},'form_user_id',coll_admin,function(comment_res,admin_res){
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
			})*/
			
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
	ajax_comment_del(app1)
}
exports.routerall=routerall




