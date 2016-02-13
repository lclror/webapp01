var cheerio=require('cheerio')

var html='\
<!doctype html>\
<html>\
<head>\
<meta charset="utf-8">\
<title>无标题文档</title>\
<link rel="stylesheet" href="../../lib/xxxbase.css">\
<link rel="stylesheet" href="../../P_movie/P_adminNav.css">\
<script src="../../lib/jquery.js"></script>\
</head>\
<body>\
<section id="adminNav">\
	<h1>movie 后台管理</h1>\
	<p class="myleft p1">welcome : <span>null</span></p>\
	<a href="/movie/admin01Logout" class="myright btn-opacity">logout</a>\
	<div>\
		<a  class="btn-bg " href="/movie/admin01/save">new movies</a>\
		<a class="btn-bg " href="/movie/admin01/list">movies list</a>\
	</div>\
</section>\
</body>\
<script src="../../lib/require.js" data-main="../../P_movie/"></script>\
</html>\
';
var $=cheerio.load(html,{decodeEntities:false})

function routerall(app1){
	app1.get('/movie/admin01/nav',function(req,res){
		var admin=req.session.adminlogin	
		if(admin){
			$("#adminNav .p1 span").text(admin)	
		}
		html=$.html()
		res.send(html)
	})	
	
	app1.get('/movie/admin01Logout',function(req,res){
		req.session.adminlogin=null
		$("#adminNav .p1 span").text('null')
		//console.log(req.session.adminlogin)	
		res.redirect('/movie/admin01')	
	})
}

exports.routerall=routerall