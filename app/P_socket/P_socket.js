;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		requirejs.config({
			paths:{				 
				add:'../tools/addmodule' 
			}	
		});		
		define( ["add",], factory );		
	} else {factory( jQuery )}
}(function(  ) { 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
function P_socket(opts){
this.html='';

this.id='#xxx' 				
this.opts=$.extend({},P_socket.STATE,opts)
}

P_socket.STATE={
	//islogin : 'no',
	loginName:'',
}

P_socket.prototype.main=function(){var state=this.opts; var $this=this	
//~~~~~~~~~~~~~~~~~~~~~~
	var socket=io.connect()
	//与服务器进行连接,这里的io能够穿透requirejs的封装外壳，不影响对socket.io.js脚本的调用
	/*//~~~先判断是否登陆，解决刷新问题~~~~~~~~~~~
	var name=''
	socket.emit('islogin','islogin')
	socket.on('islogin',function(status){
		if(status=='yes'){
			$("div.div1").hide()	
		}	
	})*/
	
	$("button.btn1").click(function(e) {
		var val=$("input.input1").val()
		if(val.length==0){
			alert('is not null')
		}else{
			socket.emit('userLogin',val)	
		}
	});
	socket.on('userLogin',function(data){
		if(data=='error'){
			$("div.div1>ul>p").html('用户名已经存在')	
		}else if(data=='success'){
			$("div.div1>ul>p").html('登陆成功')
			state.loginName=$("input.input1").val()
			setTimeout(function(){
				$("div.div1").hide()	
			},500)
		}
		
	})
	socket.on('userLogin_g',function(username,count){
		$("#socket>h1").html('CHAR '+' 当前在线人数：'+(count+1))
		var span='<span>system : </span>'
		var li=span+'<li style="color:red">'+username+'</li>'	
		$("#socket>.div2").append(li)
	})
	
	
	
	$(".btn2").click(function(e) {
		var msg=$("textarea").val()
		//发送一个名为foo的事件，并且传递一个字符串数据‘hel
		var color=$(".input3").val()
		socket.emit('char', msg, color);
	});
	socket.on('char_g',function(name, msg, color){
		//var li='<li style="color:'+color+'">'+username+' : '+data+'</li>'
		var span='<span>'+name+' : </span>'
		var li=span+'<li style="color:'+color+'">'+msg+color+'</li>'
		$("#socket>.div2").append(li)
	})
	

//~~~~~~~~~~~~~~~~~~~~~~
}


P_socket.prototype.render=function(){var state=this.opts
//~~~~~~~~~~~~~~~~~~~~~~
//var str='<li>hellow world <img src="#" alt="flower"/></li>'
//$("div").html(str)
//var strdiv=$("div").html() //尤其是以隐式的表情添加时,即用实时表情替代表情编号，以整个html字符传递，是最好的方法.
//alert(strdiv)

/*var str='hellow world <img src="#" alt="flower"/>'
$("textarea").append(str)*/
//~~~~~~~~~~~~~~~~~~~~~~
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
$.fn.addModule($('body'),'P_socket',P_socket) 
//return P_socket;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}))