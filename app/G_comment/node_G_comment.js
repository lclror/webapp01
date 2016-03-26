var mongoskin=require('mongoskin')
var ObjectId=mongoskin.ObjectId

var mongodb_array=require('../mongodb/mongodb_array')
var populate=require('../tools/node_populate7')

//var coll_comment=mongodb_array.collection('comment')
var coll_admin=mongodb_array.collection('admin')

var html='\
	<div id="comment">\
		<span>1</span>\
		<h1>评论区</h1>\
		<ul class="ul1">\
			<li>\
				<img src="../../img/user/user.jpg"/>\
				<h4>user01 <span> 删除</span></h4>\
				<p>content! content! content!</p>\
				<a href="#textarea" name="oid">回复</a>\
				<div>\
					<img src="../../img/user/user.jpg"/>\
					<h4>user01 <span> 删除</span></h4>\
					<p> <span>回复-user2 : </span>content! </p>\
					<a href="#textarea" name="oid">回复</a>\
				</div>\
			</li>\
			<li>\
				<img src="../../img/user/user.jpg"/>\
				<h4>user01</h4>\
				<p>nice!</p>\
				<a href="#textarea" name="oid">回复</a>\
			</li>\
		</ul>\
		<textarea id="textarea"  cols="60" rows="4"></textarea><br/>\
		<button class="btn-opacity" type="button">submit</button>\
	</div>\
';

//var query={movie_id:index} //查询字段格式
function process($,collN_comment,query){
	var pro=function(req,res,next){
//~~~~~~~~~~~~~~~评论区路由过程~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			//var index=parseInt(req.params.id)
			var movie_id=req.params.id
			var admin=req.session.adminlogin
			//if(movie_id!=24){next()}else{
			for(var i in query){ //此处为灵活定义查询那个字段用，并不现定于电影的评论
				//query[i]=index	
				query[i]=ObjectId(movie_id)
			}
			collN_comment.find(query/*{movie_id:index}*/).sort({time:1}).toArray(function(err,result){
				var opt={
					P_result:result,
					key:['form_user_id'],
					ref:[coll_admin],
					//ref_query_key:[{_id:null},0],
					coll_find:function(find){
						find(0)	
					}	
				}
				populate.populateN(opt,function(comment_res){
					//console.log('=========限定返回第一条评论内容=============================')
					//console.log(comment_res[0])
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
					$("div#comment>span").text(/*index*/movie_id)
					$("div#comment>ul.ul1").html(ul)
					//html=$.html()
					//res.send(html)	
					next()
				})	
			})
			//}// top else use
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~			
	}
	return pro	
}

//comment ajax part~~~~~~~~~~~~~~
function ajax_comment(app1,ajaxURL,collN_comment){
	app1.post(ajaxURL,function(req,res){
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
				//movie_id:parseInt(movie_id),
				movie_id:ObjectId(movie_id),
				form_user_id:form_user_id,//此处用到填充方法.
				content:content,
				time:time,
				reply:[]
				}
				collN_comment.save(doc,function(err,result){
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
				collN_comment.findAndModify({_id:ObjectId(comment_id)},[],{$push:{reply:replyObj}},function(err,result){
				
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
function ajax_comment_del(app1,ajaxURL,collN_comment){
	app1.post(ajaxURL,function(req,res){
		var comment_id=req.body.comment_id
		var time=req.body.time
		//console.log(comment_id+' : '+time)
		if(time==0){
			collN_comment.remove({_id:ObjectId(comment_id)},function(err){
				if(err){
					res.send({status:'error'})	
				}else{
					res.send({status:'success'})	
				}	
			})	
		}else{
			collN_comment.findAndModify({_id:ObjectId(comment_id)},[],{$pull:{reply:{time:time}}},function(err,result){
				//console.log('=======>', error, result);
				if(!err){
					res.send({status:'success'})	
				}
			}); 
		}	
	})	
}
//~~~~~~~
exports.html=html
exports.process=process
exports.ajax1=ajax_comment
exports.ajax2=ajax_comment_del

