/*	var doc={
			movie_id:ObjectId(movie_id),
			from:username,
			content:content,
			time:time,
			reply:[]
			}	
			
		var reply={
			from:username,
			to:to,
			content:content,
			time:time,		
			}*/	


var ObjectId=
function process($,coll_comment){
	var pro=function(req,res,next){
		var movie_id=req.query.movie_id
		if(movie_id){ //当get中有movie_id时，才进行数据库的查询，否则node服务就会报错停止。
			$("#comment>movie_id").html(movie_id)
			coll_comment.find({_id:ObjectId(movie_id)}).toArray(function(err,result){
				for(var i in result){
					var comment_id=result[i]._id
					var from=result[i].from
					var content=result[i].content
					var reply=result[i].reply	
					
					var ul=''
					var img='<img src="../../img/user/user.jpg" />'
					var p='<p>'+content+'</p>'
					//~~加入回复按钮/删除按钮~~~~~~~~~~
					//~功能性的按钮，它标签的属性中尽量完备必要的参数值，例如某条数据的id，否则就给自己带来不必要的麻烦~
					var a='<a href="#textarea"  comment_id="'+comment_id+'">回复</a>'
					var del=''  //主评论删除时，用comment_id
					//~~~让回复不能回复自己、无法删除别人的评论~~~~~~~~~
					var admin=req.session.islogin
					if(admin && admin.username==from){
						a=''
						del='<span  comment_id="'+comment_id+'">删除</span>'	
					}
					//~~~~~~~~~~~~~~~~~~~~~
					var h4='<h4>'+from+' '+del+'</h4>'
					//~~~~reply part~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					var div=''
					for(var j in reply){
						var _from=reply[j].from	
						var _to=reply[j].to	
						var _content=reply[j].content	
						var _time=reply[j].time	
						
						var _img='<img src="../../img/user/user.jpg" />'
						var _p='<p>回复'+to+' : '+_content+'</p>'
						var _a='<a href="#textarea"  comment_id="'+comment_id+'">回复</a>'
						var _del='' 
						if(admin && admin.username==_from){
							_a=''
							_del='<span  comment_id="'+comment_id+'" time="'+_time+'">删除</span>'	
						}
						//单条回复删除时，用time，因为只有time 和 content是唯一的，但后者数据量比较打，就用time来完成删除
						
						var _h4='<h4>'+_from+''+_del+'</h4>'

						var _li='<li>'+_img+_h4+_p+_a+'</li>'
						div+=_li
					}
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					var li='<li>'+img+h4+p+a+div+'</li>'
					ul+=li
				}	
				$("#comment>ul.ul1").html(ul)
				//req.G_comment_ok='ok' 
				//此处是并行运算用，因为下面的next() 没有在查库结果完成后就条到下一步了，然后在最后的路由过程中请求到这些complete的状态
				//都为完成时，才进行最后的res.send()
			})
		}
	next();
	}
	return pro;	
}


function ajax_comment_save(app1){
	app1.post('/ajax/movie/comment/save',function(req,res){
		var admin=req.session.islogin
		if(admin){/*saveing*/
			var movie_id=req.body.movie_id
			var from=admin.username
			var content=req.body.content
			var time=new Date().toLocaleString()
			var to=req.body.to
			var coll_comment_id=req.body.comment_id
			
			if(coll_comment_id){/*存入reply*/
				var reply={
					from:username,
					to:to,
					content:content,
					time:time,		
				}
				coll_comment.update({_id:ObjectId(coll_comment_id)},{ $push:{reply:reply} },function(err,result){})
			}else{/*存入doc*/
				var doc={
					movie_id:ObjectId(movie_id),
					from:from,
					content:content,
					time:time,
					reply:[]
				}
				coll_comment.save(doc,function(err,result){})
			}
		}else{/*err*/}
		
		
		
		
	
	})	
}



