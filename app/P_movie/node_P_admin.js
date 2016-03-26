var mongodb_array=require('../mongodb/mongodb_array')
var coll_admin=mongodb_array.collection('admin')

var coll_test01=mongodb_array.collection('test01')
var coll_test02=mongodb_array.collection('test02')

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
			//console.log(result)
			if(result[0]==null){
				res.send([{status:'error'}])	
			}else{
				req.session.adminlogin=result[0]
				//res.send([{status:'success',path:'http://192.168.36.117/movie/admin01/nav'}]) //这句地址别的机器就无法访问了，因为不是本地.
				res.send([{status:'success',href:'/movie/admin01/nav'}])
				console.log(req.session.adminlogin+' :is logined ')
				//res.redirect('/movie/admin01/nav')	 //由ajax发起的请求此方法无效	
			}	
		})
	})	
}


function routerall(app1){
	app1.get('/join/test01/:value',function(req,res){
		var value=req.params.value
		coll_test01.save({name:value,age:30},function(err,result){
			console.log(result.result)
		})
		res.send('<h1>mongodb dbref testing :'+value+'</h1>')	
	})
	
	app1.get('/join/test02/:value',function(req,res){
		var value=req.params.value
		coll_test01.find({name:'kiti'}).toArray(function(err,result){
			var id=result[0]._id	
			console.log(id)
			coll_test02.save({title:value,form:{$ref:'test01',$id:id}},function(err,result){
				console.log(result.result)
			})
		})
		
		res.send('<h1>mongodb dbref testing :'+value+'</h1>')	
	})
	
	
	//此处是后台管理的阻拦中间件，没有登陆的session就无法进入管理页面
	app1.use(['/movie/admin01/*'],function(req,res,next){
		var admin=req.session.adminlogin
		if(admin){
//			var islogin='<p class="myleft p1">welcome : <span>'+admin+'</span></p>'
//			$("body h2").html(islogin)
			next()
		}else{
			//$("body h2").html(null)
			res.redirect('/movie/admin01')
		}		
	})

	app1.get('/movie/admin01',function(req,res){
		res.send(html)	
	})
	
	ajax(app1)	
}
exports.routerall=routerall
