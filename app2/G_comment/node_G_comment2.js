var mongoskin=require('mongoskin')
var ObjectId=mongoskin.ObjectId
//var mongodb_array=require('../mongodb/mongodb_array')

var html='\
	<div id="comment">\
		<span></span>\
		<h1>评论区</h1>\
		<ul class="ul1">\
			<li>\
				<img src="../../../img/user/user.jpg"/>\
				<h4>test01 <span> 删除</span></h4>\
				<p>content! content! content!</p>\
				<a href="#textarea" name="oid">回复</a>\
				<div>\
					<img src="../../../img/user/user.jpg"/>\
					<h4>test01 <span> 删除</span></h4>\
					<p> <span>回复-user2 : </span>content! </p>\
					<a href="#textarea" name="oid">回复</a>\
				</div>\
			</li>\
			<li>\
				<img src="../../../img/user/user.jpg"/>\
				<h4>user01</h4>\
				<p>nice!</p>\
				<a href="#textarea" name="oid">回复</a>\
			</li>\
		</ul>\
		<textarea id="textarea"  cols="60" rows="4"></textarea><br/>\
		<button class="btn-opacity" type="button">submit</button>\
	</div>\
';

function process($,/*$parent,*/collN_comment,query){
	var pro=function(req,res,next){
			var book_id=req.params.id
			$("div#comment>span").text(book_id)
			var admin=req.session.adminlogin
			for(var i in query){ 
				query[i]=ObjectId(book_id)
			}
			collN_comment.find(query/*{movie_id:index}*/).sort({time:1}).toArray(function(err,result){
					var ul=''
					for(var i in result){
							var $img='<img src="../../../img/user/user.jpg"/>'
							var $content1='<p>'+result[i].content+'</p>'
							var _id=result[i]._id 
							var $a1='<a  name="'+_id+'">回复</a>'

							var from_user=result[i].form_user
							var $del01=''
							if(admin && admin.username==from_user){
								$del01='<span id="'+_id+'" name="0"> 删除</span>'	
								$a1=''
							}
							var $form_user='<h4>'+from_user+' '+$del01+'</h4>'

							var reply=result[i].reply
							var li_reply=''
							for(var j in reply){
								var $to='<span>回复-'+reply[j].to+' : </span>'
								var from_name=reply[j].from

								
								var $content2='<p>'+$to+reply[j].content+'</p>'
								var $a2='<a  name="'+_id+'">回复</a>'
								

								var time=reply[j].time
								var $del02=''
								if(admin && admin.username==from_name){
									$del02='<span id="'+_id+'" name="'+time+'"> 删除</span>'	
									$a2=''
								}
								var $from='<h4>'+from_name+' '+$del02+'</h4>'
								//~~~~~~~~~~~~~~~
								var $div='<div>'+$img+$from+$content2+$a2+'</div>'
								li_reply+=$div
							}
							//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
							var $li='<li>'+$img+$form_user+$content1+$a1+li_reply+'</li>'
							ul+=$li
					}
					
					$("div#comment>ul.ul1").html(ul)
					next()
				})	

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~			
	}
	return pro	
}

//comment ajax part~~~~~~~~~~~~~~
function ajax_comment(app1,ajaxURL,collN_comment){
	app1.post(ajaxURL,function(req,res){
		var book_id=req.body.book_id 
		var content=req.body.content
		var time=new Date().toLocaleString()
		var comment_id=req.body.comment_id  
		var to=req.body.to  
		
		var admin=req.session.adminlogin
		if(admin){
			var form_user=admin.username
			
			if(comment_id==0){
				var doc={
				book_id:ObjectId(book_id),
				form_user:form_user,
				content:content,
				time:time,
				reply:[]
				}
				collN_comment.save(doc,function(err,result){
					if(err){

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

