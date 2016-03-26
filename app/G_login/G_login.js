;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' ,
			}	
		});		
		define( ["add",], factory );		
	} else {factory( jQuery )}
}(function( add ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function G_login(opts){
this.html='\
<section id="login">\
	<div class="myleft inFLeft">\
		<a href="" class="a5 ">回到首页</a>\
		<a href="" class="a5 hide">录入新图书</a>\
		<a href="" class="a5 hide">图书管理</a>\
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
		<button class="btn-opacity" type="button">login</button>\
	</form>\
	</div>\
	<div id="sign_block" class="hide">\
	<h1>用户注册</h1>\
	<form>\
		<label for="">账号:</label><input type="text" placeholder="username" class="form-input"/><br/>\
		<label for="">密码:</label><input type="password" placeholder="password" class="form-input"/><br/>\
		<label for="">密码:</label><input type="password" placeholder="password" class="form-input"/><br/>\
		<button class="btn-opacity" type="button">login</button>\
	</form>\
	</div>\
</section>\
';


this.id='#login' 				
this.opts=$.extend({},G_login.STATE,opts)
}

G_login.STATE={
	//state : 'off',
}

G_login.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
$("#login a.a1").click(function(e) {
	e.stopPropagation()
	$("#login>#login_block").removeClass("hide")
});
$("#login a.a2").click(function(e) {
	e.stopPropagation()
	$("#login>#sign_block").removeClass("hide")
});

$("body").click(function(e) {
	$("#login>#login_block,#login>#sign_block").addClass("hide")
});

$("#login>#login_block,#login>#sign_block").click(function(e) {
	e.stopPropagation()
});


$("#login>#login_block>form>button").click(function(e) {
	
	var $input=$(this).siblings('input')
	var name=$input.eq(0).val()
	var pass=$input.eq(1).val()
	
	$.post('/ajax/book/adminlogin',{name:name,pass:pass},function(result){
		//alert(name)
		if(result.status=='err'){
			alert('账号或密码错误')	
		}else{
			var href=result.href
			//alert('success')
			//alert(href)	
			//window.location.href='http://120.25.97.121/book';
			window.location.reload();
		}
	},'json')
});

//~~~~logout~~~~
$("#login a.a4").click(function(e) {
	$.post('/ajax/book/logout',[],function(result){
		if(result.status=='success'){
			var href=result.href
			//window.location='http://120.25.97.121/book';
			window.location.reload();
		}	
	},'json')
});


$(window).scroll(function(e) {
	var scrolltop=$(window).scrollTop()
	if(scrolltop>50){
		$("#login").addClass("test")
	}else{
		$("#login").removeClass("test")	
	}
});

//~~~~sign~~~~~~~~~~~~~~~~
$("#login>#sign_block>form>button").click(function(e) {
	
	var $input=$(this).siblings('input')
	var name=$input.eq(0).val()
	var pass1=$input.eq(1).val()
	var pass2=$input.eq(2).val()
	if(pass1!=pass2){alert('两次密码不一致')}else if(name==''||pass1==''||pass2==''){alert('不能留空')}else{
		$.post('/ajax/book/sign',{name:name,pass:pass2},function(result){
			//alert(name)
			if(result.status=='err'){
				alert('账号已经注册')	
			}else{
				var href=result.href
				alert('注册成功，请重新登陆')
				//alert(href)	
				//window.location.href=href
				window.location.reload();
			}
		},'json')
	}
});
//~~~~~~~~~~~~~~~~~~~~~~
}


G_login.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
//$.fn.addModule($('body'),'G_login',G_login) 
return G_login;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))