var html='\
<section id="login">\
	<div class="myleft inFLeft">\
		<a href="/book/admin01/save" target="_blank" class="a5 hide">录入新图书</a>\
		<a href="/book/admin01/booktable" target="_blank" class="a5 hide">图书管理</a>\
	</div>\
	<div class="myright inFLeft marright1">\
		<a  class="a1">登录</a>\
		<a  class="a2">注册</a>\
		<a  class="a3 hide">欢迎</a>\
		<a  class="a4 hide">注销</a>\
	</div>\
	<div id="login_block" class="hide">\
	<h1>movie 后台管理登陆</h1>\
	<form>\
		<label for="">账号:</label><input type="text" placeholder="username" class="form-input"/><br/>\
		<label for="">密码:</label><input type="password" placeholder="password" class="form-input"/><br/>\
		<button class="btn-opacity" type="button">登录</button>\
	</form>\
	</div>\
	<div id="sign_block" class="hide">\
	<h1>用户注册</h1>\
	<form>\
		<label for="">账号:</label><input type="text" placeholder="username" class="form-input"/><br/>\
		<label for="">密码:</label><input type="password" placeholder="password" class="form-input"/><br/>\
		<label for="">密码:</label><input type="password" placeholder="password" class="form-input"/><br/>\
		<button class="btn-opacity" type="button">注册</button>\
	</form>\
	</div>\
</section>\
';

function process($,parent){
	parent.html(html)
	var pro=function(req,res,next){
		var user=req.session.adminlogin
		if(user){
			var username=user.username
			$("#login a.a1 , #login a.a2").addClass('hide')
			$("#login a.a3 , #login a.a4").removeClass('hide')
			$("#login a.a5").removeClass('hide')
			
			$("#login a.a3").text('welcome : '+username)	
		}else if(user==null){
			$("#login a.a1 , #login a.a2").removeClass('hide')
			$("#login a.a3 , #login a.a4").addClass('hide')
			$("#login a.a5").addClass('hide')
			
			$("#login a.a3").text('welcome : ')
		}
		next()
	}
	return pro;
}



function ajax(app1,collection){
	app1.post('/ajax/book/adminlogin',function(req,res){
		var name=req.body.name
		var pass=req.body.pass
		collection.find({username:name,password:pass}).toArray(function(err,result){
			
			if(result[0]==null){
				res.send({status:'err'})	
			}else{
				req.session.adminlogin=result[0]
				res.send({status:'success',href:'/book'})	
			}
		})
	})
	
	app1.post('/ajax/book/logout',function(req,res){
		req.session.adminlogin=null
		res.send({status:'success',href:'/book'})	
	})
	
	app1.post('/ajax/book/sign',function(req,res){
		var name=req.body.name
		var pass=req.body.pass
		collection.find({username:name,password:pass}).toArray(function(err,result){
			if(result[0]!=null){
				res.send({status:'err'})	
			}else{
				var doc={
					username:name,
					password:pass,
					count:0	
				}	
				collection.save(doc,function(err,result){
					if(!err){
						res.send({status:'success',href:'/book'})	
					}	
				})
			}	
		})	
	})
	
	
}
//exports.html=html
exports.ajax=ajax
exports.process=process
