var mongodb_array=require('../mongodb/mongodb_array')
var coll_admin=mongodb_array.collection('admin')

var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>无标题文档</title>\
<link rel="stylesheet" href="../lib/xxxbase.css">\
<link rel="stylesheet" href="../P_movie/P_admin.css">\
<script src="../lib/jquery.js"></script>\
</head>\
<body>\
<section id="login">\
<h1>movie 后台管理登陆</h1>\
<form>\
	<label for="">账号:</label><input type="text" placeholder="username" class="form-input"/><br/>\
	<label for="">密码:</label><input type="password" placeholder="password" class="form-input"/><br/>\
	<button class="btn-opacity" type="button">login</button>\
</form>\
</section>\
</body>\
<script src="../lib/require.js" data-main="../P_movie/P_admin.js"></script>\
</html>\
';


function ajax(app1){
	app1.post('/ajax/movie/adminlogin',function(req,res){
		var name=req.body.name	
		var pass=req.body.pass
		coll_admin.find({username:name,password:pass}).toArray(function(err,result){
			console.log(result)
			if(result[0]==null){
				res.send([{status:'error'}])	
			}else{
				req.session.adminlogin=result[0].username
				res.send([{status:'success',path:'http://localhost:3000/movie/admin01/nav'}])
				console.log(req.session.adminlogin+' :is logined ')
				//res.redirect('http://localhost:3000/movie/admin01/save')	 //由ajax发起的请求此方法无效			
			}	
		})
	})	
}


function routerall(app1){
	//此处是后台管理的阻拦中间件，没有登陆的session就无法进入管理页面
	app1.use('/movie/admin01/*',function(req,res,next){
		var admin=req.session.adminlogin
		if(admin){next()}else{res.redirect('/movie/admin01')}		
	})
	
	app1.get('/movie/admin01',function(req,res){
		res.send(html)	
	})
	
	ajax(app1)	
}
exports.routerall=routerall
